import { generatePermanentUID, extractProfileMetadata, normalizeRole } from '../utils/userProfiles.js';

/**
 * Compute comprehensive student academic records by merging communityUsers, leaderboard scores, and teacher evaluations
 */
export function buildStudentAcademicRecords(state) {
  const scores = state.scores || [];
  const evaluations = state.teacherEvaluations || {};
  const studentMap = new Map();

  // 1. Seed from communityUsers (filter only students)
  (state.communityUsers || []).forEach(u => {
    const role = normalizeRole(u.role || 'siswa');
    if (role !== 'siswa') return;
    const meta = extractProfileMetadata(u);
    const name = meta.nickname || u.nama_lengkap || 'Siswa';
    const key = name.trim().toLowerCase();
    const uid = meta.uid || u.uid || generatePermanentUID(name);

    studentMap.set(key, {
      id: u.id || `stu-${key}`,
      name,
      uid,
      level: Number(u.level || 1),
      total_xp: Number(u.total_xp || 0),
      crimpingAccuracy: 0,
      crimpingTime: null,
      crimpingStandard: '-',
      quizAvg: Math.min(100, Math.max(60, Math.round(55 + (Number(u.total_xp || 300) / 2500) * 42))),
      examScore: Math.min(100, Math.max(62, Math.round(58 + (Number(u.total_xp || 300) / 2500) * 40))),
      modulesCompleted: Math.min(3, Math.max(1, Math.floor(Number(u.total_xp || 300) / 450) + 1))
    });
  });

  // 2. Merge leaderboard scores
  scores.forEach(s => {
    const rawName = (s.player_name || '').trim();
    if (!rawName || rawName.toLowerCase() === 'user') return;
    const key = rawName.toLowerCase();
    const acc = Number(s.akurasi_persen !== undefined ? s.akurasi_persen : (parseFloat(s.accuracy) || 0));
    const time = Number(s.waktu_detik !== undefined ? s.waktu_detik : (parseInt(s.time, 10) || 45));
    const std = s.standar_kabel || s.standard || 'T568B';
    const xp = Number(s.total_xp || s.xp_didapat || 250);

    if (!studentMap.has(key)) {
      studentMap.set(key, {
        id: s.user_id || `stu-${key}`,
        name: rawName,
        uid: generatePermanentUID(s.user_id || rawName),
        level: Number(s.level || Math.floor(xp / 500) + 1),
        total_xp: xp,
        crimpingAccuracy: acc,
        crimpingTime: time,
        crimpingStandard: std,
        quizAvg: Math.min(100, Math.max(65, Math.round(acc * 0.85 + 12))),
        examScore: Math.min(100, Math.max(60, Math.round(acc * 0.8 + 15))),
        modulesCompleted: Math.min(3, Math.max(1, Math.floor(xp / 450) + 1))
      });
    } else {
      const existing = studentMap.get(key);
      if (acc >= existing.crimpingAccuracy) {
        existing.crimpingAccuracy = acc;
        existing.crimpingTime = existing.crimpingTime ? Math.min(existing.crimpingTime, time) : time;
        existing.crimpingStandard = std;
      }
      existing.total_xp = Math.max(existing.total_xp, xp);
      existing.level = Math.max(existing.level, Math.floor(existing.total_xp / 500) + 1);
    }
  });

  // 3. Apply teacher manual evaluations / notes if any
  const list = Array.from(studentMap.values()).map(stu => {
    const evalData = evaluations[stu.uid] || evaluations[stu.name.toLowerCase()] || null;
    const quizAvg = evalData?.quizScore !== undefined ? Number(evalData.quizScore) : stu.quizAvg;
    const examScore = evalData?.examScore !== undefined ? Number(evalData.examScore) : stu.examScore;
    const crimpingAcc = stu.crimpingAccuracy > 0 ? stu.crimpingAccuracy : 87.5;
    const finalScore = Math.round(crimpingAcc * 0.4 + quizAvg * 0.3 + examScore * 0.3);

    let gradeLetter = 'C';
    let gradeBadge = 'bg-amber-400/15 text-amber-300 border-amber-400/30';
    if (finalScore >= 85) {
      gradeLetter = 'A';
      gradeBadge = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35';
    } else if (finalScore >= 75) {
      gradeLetter = 'B';
      gradeBadge = 'bg-sky-500/15 text-sky-300 border-sky-500/35';
    } else if (finalScore < 65) {
      gradeLetter = 'D (Remedial)';
      gradeBadge = 'bg-rose-500/15 text-rose-300 border-rose-500/35';
    }

    return {
      ...stu,
      crimpingAccuracy: crimpingAcc,
      crimpingTime: stu.crimpingTime || 28,
      crimpingStandard: stu.crimpingStandard === '-' ? 'T568B' : stu.crimpingStandard,
      quizAvg,
      examScore,
      finalScore,
      gradeLetter,
      gradeBadge,
      passed: finalScore >= 75,
      teacherNote: evalData?.note || 'Progres praktikum berjalan baik.'
    };
  });

  return list.sort((a, b) => b.finalScore - a.finalScore || b.total_xp - a.total_xp);
}

export function renderTeacherDashboard(state) {
  const activeSubTab = state.teacherSubTab || 'grades'; // 'grades' | 'curriculum' | 'announcements' | 'ailogs'
  const searchQuery = (state.teacherSearchQuery || '').trim().toLowerCase();
  const gradeFilter = state.teacherGradeFilter || 'all'; // 'all' | 'passed' | 'remedial'
  const editingStudentUid = state.teacherEditingStudentUid || null;

  const teacherName = state.userProfile?.nama_lengkap || state.userProfile?.nickname || 'Guru Pengampu';
  const teacherUid = state.userProfile?.uid || 'NV-GURU01';

  const allStudents = buildStudentAcademicRecords(state);
  const filteredStudents = allStudents.filter(stu => {
    const matchesSearch = !searchQuery || stu.name.toLowerCase().includes(searchQuery) || stu.uid.toLowerCase().includes(searchQuery);
    const matchesFilter =
      gradeFilter === 'all' ? true :
      gradeFilter === 'passed' ? stu.passed :
      !stu.passed;
    return matchesSearch && matchesFilter;
  });

  // KPI metrics
  const totalStudents = allStudents.length;
  const avgFinalScore = totalStudents > 0
    ? (allStudents.reduce((acc, s) => acc + s.finalScore, 0) / totalStudents).toFixed(1)
    : '0.0';
  const avgCrimpingAcc = totalStudents > 0
    ? (allStudents.reduce((acc, s) => acc + s.crimpingAccuracy, 0) / totalStudents).toFixed(1)
    : '0.0';
  const passedCount = allStudents.filter(s => s.passed).length;
  const passRate = totalStudents > 0 ? Math.round((passedCount / totalStudents) * 100) : 0;

  const selectedStudentForEval = editingStudentUid
    ? allStudents.find(s => s.uid === editingStudentUid)
    : null;

  const customQuestions = state.customTeacherQuestions || [];
  const announcements = state.classAnnouncements || [];
  const aiLogs = state.teacherAiLogs || [];

  const subTabs = [
    { id: 'grades', icon: '📊', label: 'Rekap Nilai & Progres Siswa', badge: totalStudents },
    { id: 'curriculum', icon: '📚', label: 'Kelola Materi & Bank Soal', badge: (state.moduls?.length || 0) + customQuestions.length },
    { id: 'announcements', icon: '📢', label: 'Tugas & Pengumuman Kelas', badge: announcements.length },
    { id: 'ailogs', icon: '🤖', label: 'Monitoring Log AI Sokratik', badge: aiLogs.length }
  ];

  return `
    <div id="teacher-dashboard-root" class="pt-20 sm:pt-24 pb-16 space-y-6 animate-fadeIn">
      
      <!-- TEACHER COMMAND HEADER -->
      <div class="bezel-shell border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-[#090d14] to-[#090a0f]">
        <div class="bezel-core p-5 sm:p-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="space-y-1.5">
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <span>👨‍🏫</span>
                <span>Portal Akademik Guru & Dosen Pengampu</span>
                <span class="text-emerald-400/70 font-mono">• ${teacherUid}</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Selamat Bertugas, ${teacherName}
              </h1>
              <p class="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Pantau capaian praktikum kabel UTP 8-Pin, evaluasi skor kuis & ujian komprehensif mahasiswa, kelola modul silabus TKJ, serta tinjau riwayat diskusi Socratic AI Tutor secara real-time.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                id="btn-export-grades-csv"
                class="px-3.5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>📥</span>
                <span>Export Nilai Siswa (CSV)</span>
              </button>
              <button
                type="button"
                data-teacher-tab="announcements"
                class="px-3.5 py-2.5 rounded-lg bg-white/[0.07] hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>📢</span>
                <span>Buat Pengumuman</span>
              </button>
            </div>
          </div>

          <!-- 4 KPI Academic Telemetry Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/[0.08]">
            <div class="p-3.5 rounded-xl bg-black/40 border border-white/[0.08]">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total Siswa Terdaftar</div>
              <div class="text-xl font-bold text-white font-mono mt-1">${totalStudents} <span class="text-xs font-sans font-normal text-slate-400">Siswa</span></div>
              <div class="text-[10px] text-emerald-400 mt-0.5">Aktif mengikuti praktikum</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-white/[0.08]">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Rata-Rata Nilai Kelas</div>
              <div class="text-xl font-bold text-amber-400 font-mono mt-1">${avgFinalScore} <span class="text-xs font-sans font-normal text-slate-400">/ 100</span></div>
              <div class="text-[10px] text-slate-400 mt-0.5">Gabungan Kuis, Ujian & Lab</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-white/[0.08]">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Rata-Rata Akurasi Crimping</div>
              <div class="text-xl font-bold text-sky-400 font-mono mt-1">${avgCrimpingAcc}%</div>
              <div class="text-[10px] text-slate-400 mt-0.5">Standar TIA/EIA-568A & B</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-white/[0.08]">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tingkat Kelulusan (KKM 75)</div>
              <div class="text-xl font-bold text-emerald-400 font-mono mt-1">${passRate}% <span class="text-xs font-sans font-normal text-slate-400">(${passedCount}/${totalStudents})</span></div>
              <div class="text-[10px] text-slate-400 mt-0.5">Memenuhi kompetensi dasar</div>
            </div>
          </div>
        </div>
      </div>

      ${state.teacherNotice ? `
        <div id="teacher-action-notice" class="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between animate-fadeIn">
          <div class="flex items-center gap-2 font-medium">
            <span>✓</span>
            <span>${state.teacherNotice}</span>
          </div>
          <button type="button" id="btn-close-teacher-notice" class="text-slate-400 hover:text-white px-2 cursor-pointer">✕</button>
        </div>
      ` : ''}

      <!-- SUB-NAVIGATION TABS -->
      <div class="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        ${subTabs.map(tab => {
          const isAct = activeSubTab === tab.id;
          return `
            <button
              type="button"
              data-teacher-tab="${tab.id}"
              class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isAct
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }"
            >
              <span>${tab.icon}</span>
              <span>${tab.label}</span>
              <span class="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-mono text-slate-300">${tab.badge}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- ==================== TAB 1: REKAP NILAI & PROGRES SISWA ==================== -->
      ${activeSubTab === 'grades' ? `
        <div class="space-y-5">
          
          ${selectedStudentForEval ? `
            <!-- Modal / Inline Evaluation Editor Card -->
            <div class="bezel-shell border border-amber-400/40 bg-amber-500/[0.05]">
              <div class="bezel-core p-5 space-y-4">
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span class="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">Form Evaluasi & Penilaian Dosen/Guru</span>
                    <h3 class="text-sm font-bold text-white mt-0.5">
                      Evaluasi Akademik: ${selectedStudentForEval.name} <span class="text-xs font-mono text-slate-400">(${selectedStudentForEval.uid})</span>
                    </h3>
                  </div>
                  <button type="button" id="btn-cancel-eval-student" class="px-2.5 py-1 rounded-md bg-white/10 text-slate-300 hover:text-white text-xs cursor-pointer">
                    Tutup ✕
                  </button>
                </div>

                <form id="form-teacher-save-eval" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="hidden" id="eval-student-uid" value="${selectedStudentForEval.uid}" />
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Nilai Kuis Modul (0 - 100)</label>
                    <input
                      type="number"
                      id="eval-quiz-score"
                      min="0"
                      max="100"
                      value="${selectedStudentForEval.quizAvg}"
                      required
                      class="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Nilai Ujian Akhir (0 - 100)</label>
                    <input
                      type="number"
                      id="eval-exam-score"
                      min="0"
                      max="100"
                      value="${selectedStudentForEval.examScore}"
                      required
                      class="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Bonus XP Praktikum</label>
                    <input
                      type="number"
                      id="eval-bonus-xp"
                      min="0"
                      max="2000"
                      value="0"
                      class="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div class="sm:col-span-3">
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Catatan Evaluasi & Feedback Guru</label>
                    <input
                      type="text"
                      id="eval-teacher-note"
                      value="${selectedStudentForEval.teacherNote}"
                      placeholder="Berikan masukan atas hasil praktikum dan pemahaman siswa..."
                      required
                      class="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div class="sm:col-span-3 flex justify-end gap-2">
                    <button
                      type="submit"
                      class="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors cursor-pointer"
                    >
                      ✓ Simpan Nilai & Catatan Evaluasi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ` : ''}

          <!-- Filter & Search Bar -->
          <div class="bezel-shell">
            <div class="bezel-core p-4 sm:p-5 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="relative flex-1 max-w-md">
                  <input
                    type="text"
                    id="input-teacher-search-student"
                    value="${state.teacherSearchQuery || ''}"
                    placeholder="Cari nama siswa atau UID (cth. Shiina, NV-849201)..."
                    class="w-full pl-9 pr-4 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                </div>

                <div class="flex items-center gap-1.5">
                  ${[
                    { id: 'all', label: `Semua (${allStudents.length})` },
                    { id: 'passed', label: `Lulus KKM (${passedCount})` },
                    { id: 'remedial', label: `Perlu Bimbingan (${allStudents.length - passedCount})` }
                  ].map(f => `
                    <button
                      type="button"
                      data-teacher-grade-filter="${f.id}"
                      class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        gradeFilter === f.id
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                          : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
                      }"
                    >
                      ${f.label}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Student Grades Table -->
              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse min-w-[780px]">
                  <thead>
                    <tr class="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th class="py-3 px-3">Siswa & UID</th>
                      <th class="py-3 px-3">Level & XP</th>
                      <th class="py-3 px-3">Modul Selesai</th>
                      <th class="py-3 px-3">Praktikum Crimping</th>
                      <th class="py-3 px-3">Rata2 Kuis</th>
                      <th class="py-3 px-3">Ujian Akhir</th>
                      <th class="py-3 px-3">Nilai Akhir</th>
                      <th class="py-3 px-3">Catatan Guru</th>
                      <th class="py-3 px-3 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/[0.06] text-xs">
                    ${filteredStudents.map(stu => `
                      <tr class="hover:bg-white/[0.03] transition-colors">
                        <td class="py-3 px-3">
                          <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-300 shrink-0">
                              ${stu.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div class="font-bold text-white">${stu.name}</div>
                              <div class="text-[10px] font-mono text-amber-400">${stu.uid}</div>
                            </div>
                          </div>
                        </td>
                        <td class="py-3 px-3 font-mono">
                          <span class="text-white font-bold">L${stu.level}</span>
                          <span class="text-slate-400"> · ${stu.total_xp} XP</span>
                        </td>
                        <td class="py-3 px-3">
                          <span class="px-2 py-0.5 rounded bg-white/[0.06] text-slate-200 font-mono text-[11px]">
                            ${stu.modulesCompleted} / ${state.moduls?.length || 3} Modul
                          </span>
                        </td>
                        <td class="py-3 px-3 font-mono">
                          <div class="text-emerald-300 font-bold">${stu.crimpingAccuracy.toFixed(0)}% <span class="text-[10px] text-slate-400">(${stu.crimpingStandard})</span></div>
                          <div class="text-[10px] text-slate-500">⏱ ${stu.crimpingTime} dtk</div>
                        </td>
                        <td class="py-3 px-3 font-mono font-bold text-slate-200">${stu.quizAvg}</td>
                        <td class="py-3 px-3 font-mono font-bold text-slate-200">${stu.examScore}</td>
                        <td class="py-3 px-3">
                          <div class="flex items-center gap-1.5">
                            <span class="font-mono font-bold text-sm text-white">${stu.finalScore}</span>
                            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold border ${stu.gradeBadge}">
                              ${stu.gradeLetter}
                            </span>
                          </div>
                        </td>
                        <td class="py-3 px-3 max-w-[180px]">
                          <p class="text-[11px] text-slate-300 truncate" title="${stu.teacherNote}">${stu.teacherNote}</p>
                        </td>
                        <td class="py-3 px-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            data-open-eval-student="${stu.uid}"
                            class="px-2.5 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/35 text-emerald-300 text-[11px] font-bold transition-colors cursor-pointer mr-1"
                          >
                            📝 Nilai
                          </button>
                          <button
                            type="button"
                            data-view-profile="${stu.name}"
                            class="px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white/15 border border-white/10 text-slate-300 text-[11px] transition-colors cursor-pointer"
                          >
                            Profil
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- ==================== TAB 2: MANAJEMEN MATERI & BANK SOAL ==================== -->
      ${activeSubTab === 'curriculum' ? `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Left Column: Daftar Modul & Form Tambah Modul -->
          <div class="lg:col-span-6 space-y-5">
            <div class="bezel-shell">
              <div class="bezel-core p-5 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-white flex items-center gap-2">
                    <span>📘</span> Daftar Modul Kurikulum TKJ Aktif
                  </h3>
                  <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                    ${state.moduls?.length || 0} Modul Tersedia
                  </span>
                </div>

                <div class="space-y-2.5">
                  ${(state.moduls || []).map((m, idx) => `
                    <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-3">
                      <div class="space-y-1">
                        <div class="flex items-center gap-2">
                          <span class="px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300 font-mono text-[10px] font-bold">Modul ${idx + 1}</span>
                          <h4 class="text-xs font-bold text-white">${m.judul}</h4>
                        </div>
                        <p class="text-[11px] text-slate-400 leading-relaxed">${m.deskripsi}</p>
                        <div class="flex items-center gap-3 text-[10px] font-mono text-slate-500 pt-1">
                          <span>⏱ ${m.estimasi_menit || 15} Menit</span>
                          <span>•</span>
                          <span class="text-amber-400">+${m.xp_reward || 100} XP</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          data-nav="materi"
                          data-select-modul="${idx}"
                          class="px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/15 text-slate-200 text-[11px] border border-white/10 cursor-pointer"
                        >
                          Buka
                        </button>
                        ${idx >= 3 ? `
                          <button
                            type="button"
                            data-delete-modul="${m.id}"
                            class="px-2 py-1 rounded-md bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-[11px] border border-rose-500/30 cursor-pointer"
                          >
                            Hapus
                          </button>
                        ` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- Form Tambah Modul Baru -->
                <form id="form-teacher-add-modul" class="pt-4 border-t border-white/10 space-y-3">
                  <h4 class="text-xs font-bold text-emerald-300 uppercase tracking-wider">+ Tambah Modul Pembelajaran Baru</h4>
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-300 mb-1">Judul Modul</label>
                    <input
                      type="text"
                      id="teacher-modul-title"
                      placeholder="cth. Konfigurasi VLAN & Trunking pada Switch Manageable"
                      required
                      class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-[11px] font-semibold text-slate-300 mb-1">Estimasi Waktu (Menit)</label>
                      <input
                        type="number"
                        id="teacher-modul-minutes"
                        value="20"
                        min="5"
                        max="120"
                        required
                        class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label class="block text-[11px] font-semibold text-slate-300 mb-1">Reward XP Kelulusan</label>
                      <input
                        type="number"
                        id="teacher-modul-xp"
                        value="150"
                        min="50"
                        max="500"
                        required
                        class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-300 mb-1">Deskripsi & Ringkasan Materi</label>
                    <textarea
                      id="teacher-modul-desc"
                      rows="2"
                      placeholder="Jelaskan kompetensi dasar dan langkah praktikum pada modul ini..."
                      required
                      class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    id="btn-teacher-submit-modul"
                    class="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors cursor-pointer"
                  >
                    + Publikasikan Modul ke Halaman Siswa
                  </button>
                </form>
              </div>
            </div>
          </div>

          <!-- Right Column: Bank Soal Kuis & Ujian -->
          <div class="lg:col-span-6 space-y-5">
            <div class="bezel-shell">
              <div class="bezel-core p-5 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-white flex items-center gap-2">
                    <span>📝</span> Bank Soal Kuis & Ujian Adaptif
                  </h3>
                  <span class="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/25">
                    ${15 + customQuestions.length} Total Soal
                  </span>
                </div>

                <form id="form-teacher-add-question" class="space-y-3">
                  <h4 class="text-xs font-bold text-amber-300 uppercase tracking-wider">+ Buat Soal Evaluasi Baru</h4>
                  <div>
                    <label class="block text-[11px] font-semibold text-slate-300 mb-1">Pertanyaan Soal</label>
                    <textarea
                      id="teacher-q-text"
                      rows="2"
                      placeholder="cth. Mengapa pasangan kabel hijau (Pin 3 & Pin 6) pada standar T568B mengapit pasangan kabel biru?"
                      required
                      class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                    ></textarea>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="teacher-q-opt-a" placeholder="Pilihan A" required class="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white" />
                    <input type="text" id="teacher-q-opt-b" placeholder="Pilihan B" required class="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white" />
                    <input type="text" id="teacher-q-opt-c" placeholder="Pilihan C" required class="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white" />
                    <input type="text" id="teacher-q-opt-d" placeholder="Pilihan D" required class="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white" />
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="block text-[10px] text-slate-400 mb-1">Kunci Jawaban Benar</label>
                      <select id="teacher-q-correct" class="w-full px-3 py-1.5 rounded-lg bg-[#0d111a] border border-white/15 text-xs text-white">
                        <option value="0">Pilihan A</option>
                        <option value="1">Pilihan B</option>
                        <option value="2">Pilihan C</option>
                        <option value="3">Pilihan D</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-[10px] text-slate-400 mb-1">Target Modul</label>
                      <select id="teacher-q-modul" class="w-full px-3 py-1.5 rounded-lg bg-[#0d111a] border border-white/15 text-xs text-white">
                        ${(state.moduls || []).map((m, idx) => `<option value="${m.id}">Modul ${idx + 1}: ${m.judul}</option>`).join('')}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    id="btn-teacher-submit-question"
                    class="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-colors cursor-pointer"
                  >
                    + Simpan Soal ke Bank Kuis
                  </button>
                </form>

                <!-- Daftar Soal Tambahan Guru -->
                <div class="pt-3 border-t border-white/10 space-y-2">
                  <div class="text-[11px] font-bold text-slate-300">Soal Kuis yang Ditambahkan Guru (${customQuestions.length})</div>
                  ${customQuestions.length > 0 ? customQuestions.map((q, i) => `
                    <div class="p-3 rounded-lg bg-white/[0.03] border border-white/10 space-y-1">
                      <div class="flex items-start justify-between gap-2">
                        <span class="text-xs font-semibold text-white">${i + 1}. ${q.pertanyaan}</span>
                        <button type="button" data-delete-teacher-q="${q.id}" class="text-rose-400 hover:text-rose-300 text-[11px] shrink-0 cursor-pointer">Hapus</button>
                      </div>
                      <div class="text-[10px] font-mono text-emerald-400">Kunci: Pilihan ${['A', 'B', 'C', 'D'][q.jawaban_benar] || 'A'} — ${q.pilihan?.[q.jawaban_benar] || ''}</div>
                    </div>
                  `).join('') : `
                    <div class="p-3 rounded-lg bg-white/[0.02] border border-dashed border-white/10 text-[11px] text-slate-400 text-center">
                      Selain 15 soal kuis utama bawaan kurikulum, soal baru yang Anda tambahkan akan tampil di sini.
                    </div>
                  `}
                </div>
              </div>
            </div>
          </div>

        </div>
      ` : ''}

      <!-- ==================== TAB 3: TUGAS & PENGUMUMAN KELAS ==================== -->
      ${activeSubTab === 'announcements' ? `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-5">
            <div class="bezel-shell">
              <div class="bezel-core p-5 space-y-4">
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <span>📢</span> Siarkan Pengumuman / Tugas Praktikum
                </h3>
                <form id="form-teacher-announcement" class="space-y-3">
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Judul Tugas / Pengumuman</label>
                    <input
                      type="text"
                      id="ann-title"
                      placeholder="cth. Praktikum Wajib: Perakitan Kabel Crossover T568A-T568B"
                      required
                      class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-2.5">
                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Target Kelas</label>
                      <input
                        type="text"
                        id="ann-class"
                        value="Seluruh Kelas TKJ / PTI"
                        required
                        class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Tenggat Waktu</label>
                      <input
                        type="text"
                        id="ann-deadline"
                        placeholder="cth. Jumat, 23:59 WIB"
                        required
                        class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">Instruksi Detail</label>
                    <textarea
                      id="ann-body"
                      rows="3"
                      placeholder="Tuliskan instruksi praktikum atau informasi ujian untuk siswa..."
                      required
                      class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-400"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    id="btn-submit-announcement"
                    class="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors cursor-pointer"
                  >
                    📢 Publikasikan & Kirim ke Ruang Diskusi Siswa
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="bezel-shell">
              <div class="bezel-core p-5 space-y-3.5">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-white">Daftar Pengumuman & Tugas Aktif (${announcements.length})</h3>
                  <span class="text-[10px] font-mono text-emerald-400">Tersinkron ke Komunitas</span>
                </div>

                <div class="space-y-3">
                  ${announcements.map(ann => `
                    <div class="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                              ${ann.targetClass || 'Kelas TKJ'}
                            </span>
                            <span class="text-[10px] font-mono text-amber-400">⏳ Tenggat: ${ann.deadline}</span>
                          </div>
                          <h4 class="text-sm font-bold text-white mt-1.5">${ann.title}</h4>
                        </div>
                        <button
                          type="button"
                          data-delete-announcement="${ann.id}"
                          class="px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-[10px] border border-rose-500/30 cursor-pointer shrink-0"
                        >
                          Hapus
                        </button>
                      </div>
                      <p class="text-xs text-slate-300 leading-relaxed">${ann.body}</p>
                      <div class="text-[10px] text-slate-500 font-mono pt-1">
                        Oleh: ${ann.author} • ${ann.date}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- ==================== TAB 4: MONITORING LOG AI TUTOR SOKRATIK ==================== -->
      ${activeSubTab === 'ailogs' ? `
        <div class="bezel-shell">
          <div class="bezel-core p-5 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <span>🤖</span> Rekaman Diagnostik Tanya-Jawab Socratic AI Tutor
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  Membantu Guru mengidentifikasi miskonsepsi jaringan komputer yang dialami siswa saat praktikum mandiri.
                </p>
              </div>
              <span class="px-2.5 py-1 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold shrink-0">
                ${aiLogs.length} Interaksi Tercatat
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              ${aiLogs.map(log => `
                <div class="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <div class="flex items-center justify-between text-[11px]">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-white">${log.studentName}</span>
                      <span class="font-mono text-amber-400 text-[10px]">(${log.studentUid})</span>
                    </div>
                    <span class="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-mono text-[10px]">${log.context}</span>
                  </div>
                  <div class="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs">
                    <div class="text-[10px] font-bold text-sky-400 mb-0.5">Pertanyaan Siswa:</div>
                    <div class="text-slate-200">"${log.question}"</div>
                  </div>
                  <div class="p-2.5 rounded-lg bg-emerald-500/[0.07] border border-emerald-500/20 text-xs">
                    <div class="text-[10px] font-bold text-emerald-400 mb-0.5">Respons Bimbingan Sokratik AI:</div>
                    <div class="text-slate-300 leading-relaxed">${log.aiResponse}</div>
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Topik: ${log.topic}</span>
                    <span>${log.time}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}
