import { generatePermanentUID, extractProfileMetadata, normalizeRole, getRoleBadgeInfo } from '../utils/userProfiles.js';

export function renderAdminDashboard(state) {
  const activeSubTab = state.adminSubTab || 'users'; // 'users' | 'analytics' | 'devices' | 'moderation'
  const searchQuery = (state.adminUserSearch || '').trim().toLowerCase();
  const roleFilter = state.adminRoleFilter || 'all'; // 'all' | 'siswa' | 'guru' | 'admin'
  const lang = state.lang || 'id';

  const adminName = state.userProfile?.nama_lengkap || state.userProfile?.nickname || 'Administrator';
  const adminUid = state.userProfile?.uid || 'NV-ADMN01';

  const allUsers = (state.communityUsers || []).map(u => {
    const meta = extractProfileMetadata(u);
    const normRole = normalizeRole(u.role || meta.role || 'siswa');
    const name = meta.nickname || u.nama_lengkap || 'Pengguna';
    const uid = u.uid || meta.uid || generatePermanentUID(name);
    const username = u.username || name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const tagname = u.tagname || meta.tagname || 'NV001';
    const totalXp = Number(u.total_xp || 0);
    const level = Number(u.level || Math.floor(totalXp / 500) + 1);
    return {
      ...u,
      name,
      uid,
      username,
      tagname,
      role: normRole,
      total_xp: totalXp,
      level,
      status: u.status || 'aktif'
    };
  });

  const countSiswa = allUsers.filter(u => u.role === 'siswa').length;
  const countGuru = allUsers.filter(u => u.role === 'guru').length;
  const countAdmin = allUsers.filter(u => u.role === 'admin').length;

  const filteredUsers = allUsers.filter(u => {
    const matchSearch =
      !searchQuery ||
      u.name.toLowerCase().includes(searchQuery) ||
      u.uid.toLowerCase().includes(searchQuery) ||
      u.username.toLowerCase().includes(searchQuery);
    const matchRole = roleFilter === 'all' ? true : u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const auditLogs = state.systemAuditLogs || [];
  const chatMessages = state.chatMessages || [];
  const leaderboardScores = state.scores || [];
  const devices = state.devices || [];

  const subTabs = [
    { id: 'users', icon: '👥', label: 'Manajemen Pengguna & Role', badge: allUsers.length },
    { id: 'analytics', icon: '📈', label: 'Analitik & Log Audit Sistem', badge: auditLogs.length },
    { id: 'devices', icon: '🛠️', label: 'Katalog Perangkat 3D & Modul', badge: devices.length },
    { id: 'moderation', icon: '🛡️', label: 'Moderasi Chat & Leaderboard', badge: chatMessages.length }
  ];

  return `
    <div id="admin-dashboard-root" class="pt-20 sm:pt-24 pb-16 space-y-6 animate-fadeIn">
      
      <!-- ADMIN SYSTEM CONTROL HEADER -->
      <div class="bezel-shell border border-rose-500/35 bg-gradient-to-br from-rose-950/30 via-[#0d0a14] to-[#090a0f]">
        <div class="bezel-core p-5 sm:p-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="space-y-1.5">
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/15 border border-rose-500/35 text-rose-300 text-[11px] font-bold uppercase tracking-wider">
                <span>🛡️</span>
                <span>Pusat Kendali Administrator Sistem (Root Access)</span>
                <span class="text-rose-400/80 font-mono">• ${adminUid}</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Panel Administrator — ${adminName}
              </h1>
              <p class="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Kelola otorisasi akun pengguna (<strong class="text-amber-300">Siswa</strong>, <strong class="text-emerald-300">Guru</strong>, <strong class="text-rose-300">Admin</strong>), konfigurasi inventaris perangkat keras 3D, moderasi diskusi komunitas, serta pantau stabilitas infrastruktur cloud NetVerse.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                data-nav="guru"
                class="px-3.5 py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>👨‍🏫</span>
                <span>Buka Panel Guru</span>
              </button>
              <button
                type="button"
                id="btn-admin-export-users"
                class="px-3.5 py-2.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>📥</span>
                <span>Export Data User (CSV)</span>
              </button>
            </div>
          </div>

          <!-- 4 KPI System Metrics -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/[0.08]">
            <div class="p-3.5 rounded-xl bg-black/40 border border-white/[0.08]">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total Akun Terdaftar</div>
              <div class="text-xl font-bold text-white font-mono mt-1">${allUsers.length} <span class="text-xs font-sans font-normal text-slate-400">User</span></div>
              <div class="text-[10px] text-slate-400 mt-0.5">${countSiswa} Siswa · ${countGuru} Guru · ${countAdmin} Admin</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-white/[0.08]">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Status Database 3NF</div>
              <div class="text-xl font-bold text-emerald-400 font-mono mt-1 flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
              </div>
              <div class="text-[10px] text-slate-400 mt-0.5">Supabase PostgreSQL + RLS</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-white/[0.08]">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Objek 3D & Modul Lab</div>
              <div class="text-xl font-bold text-amber-400 font-mono mt-1">${devices.length} Objektif · ${state.moduls?.length || 3} Modul</div>
              <div class="text-[10px] text-slate-400 mt-0.5">WebGL PBR & Socratic Engine</div>
            </div>
            <div class="p-3.5 rounded-xl bg-black/40 border border-white/[0.08]">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Trafik Komunitas & Skor</div>
              <div class="text-xl font-bold text-sky-400 font-mono mt-1">${chatMessages.length} Chat · ${leaderboardScores.length} Skor</div>
              <div class="text-[10px] text-slate-400 mt-0.5">Realtime WebSocket Active</div>
            </div>
          </div>
        </div>
      </div>

      ${state.adminNotice ? `
        <div id="admin-action-notice" class="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center justify-between animate-fadeIn">
          <div class="flex items-center gap-2 font-medium">
            <span>🛡️</span>
            <span>${state.adminNotice}</span>
          </div>
          <button type="button" id="btn-close-admin-notice" class="text-slate-400 hover:text-white px-2 cursor-pointer">✕</button>
        </div>
      ` : ''}

      <!-- SUB-NAVIGATION TABS -->
      <div class="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        ${subTabs.map(tab => {
          const isAct = activeSubTab === tab.id;
          return `
            <button
              type="button"
              data-admin-tab="${tab.id}"
              class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isAct
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/50 shadow-sm'
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

      <!-- ==================== TAB 1: MANAJEMEN PENGGUNA & HAK AKSES ROLE ==================== -->
      ${activeSubTab === 'users' ? `
        <div class="space-y-5">
          
          <!-- Form Tambah Akun Baru oleh Admin -->
          <div class="bezel-shell">
            <div class="bezel-core p-5 space-y-3.5">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                  <span>➕</span> Registrasi Akun Baru oleh Administrator (Siswa / Guru / Admin)
                </h3>
                <span class="text-[10px] font-mono text-slate-400">Otomatis menghasilkan UID Permanen</span>
              </div>

              <form id="form-admin-add-user" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <label class="block text-[10px] font-semibold text-slate-400 mb-1">Nickname / Nama Lengkap</label>
                  <input
                    type="text"
                    id="admin-new-nickname"
                    placeholder="cth. Pak Hendra, Siti"
                    required
                    class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-semibold text-slate-400 mb-1">Username Login</label>
                  <input
                    type="text"
                    id="admin-new-username"
                    placeholder="cth. hendra_tkj"
                    required
                    class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-semibold text-slate-400 mb-1">Tagname (5 Digit)</label>
                  <input
                    type="text"
                    id="admin-new-tagname"
                    placeholder="GR001"
                    value="NV999"
                    maxlength="5"
                    required
                    class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white font-mono uppercase focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-semibold text-slate-400 mb-1">Pilih Role Akun</label>
                  <select
                    id="admin-new-role"
                    class="w-full px-3 py-2 rounded-lg bg-[#0d111a] border border-white/15 text-xs text-white focus:outline-none focus:border-rose-400"
                  >
                    <option value="siswa">🎓 Siswa (Mahasiswa)</option>
                    <option value="guru">👨‍🏫 Guru (Dosen Pengampu)</option>
                    <option value="admin">🛡️ Admin (Administrator)</option>
                  </select>
                </div>
                <div class="flex items-end">
                  <button
                    type="submit"
                    id="btn-admin-create-user"
                    class="w-full py-2 px-3 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    + Tambah Akun
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Tabel Daftar Seluruh Pengguna -->
          <div class="bezel-shell">
            <div class="bezel-core p-4 sm:p-5 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="relative flex-1 max-w-md">
                  <input
                    type="text"
                    id="input-admin-search-user"
                    value="${state.adminUserSearch || ''}"
                    placeholder="Cari nama, username, atau UID pengguna..."
                    class="w-full pl-9 pr-4 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                  />
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                </div>

                <div class="flex flex-wrap items-center gap-1.5">
                  ${[
                    { id: 'all', label: `Semua (${allUsers.length})` },
                    { id: 'siswa', label: `🎓 Siswa (${countSiswa})` },
                    { id: 'guru', label: `👨‍🏫 Guru (${countGuru})` },
                    { id: 'admin', label: `🛡️ Admin (${countAdmin})` }
                  ].map(rf => `
                    <button
                      type="button"
                      data-admin-role-filter="${rf.id}"
                      class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        roleFilter === rf.id
                          ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40 font-bold'
                          : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/10'
                      }"
                    >
                      ${rf.label}
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="overflow-x-auto custom-scrollbar">
                <table class="w-full text-left border-collapse min-w-[780px]">
                  <thead>
                    <tr class="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th class="py-3 px-3">Pengguna & UID</th>
                      <th class="py-3 px-3">Kredensial Login (Admin View)</th>
                      <th class="py-3 px-3">Role Saat Ini</th>
                      <th class="py-3 px-3">Ubah Role Akses</th>
                      <th class="py-3 px-3">Level & XP</th>
                      <th class="py-3 px-3 text-right">Manajemen Akun</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/[0.06] text-xs">
                    ${filteredUsers.map(u => {
                      const badge = getRoleBadgeInfo(u.role, lang);
                      return `
                        <tr class="hover:bg-white/[0.03] transition-colors">
                          <td class="py-3 px-3">
                            <div class="flex items-center gap-2.5">
                              <div class="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/15 flex items-center justify-center text-xs font-bold text-amber-300 shrink-0">
                                ${u.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div class="font-bold text-white">${u.name}</div>
                                <div class="text-[10px] font-mono text-amber-400">${u.uid}</div>
                              </div>
                            </div>
                          </td>
                          <td class="py-3 px-3 font-mono text-[11px]">
                            <span class="text-slate-200">@${u.username}</span>
                            <span class="text-amber-400 ml-1">#${u.tagname}</span>
                          </td>
                          <td class="py-3 px-3">
                            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.badgeClass} inline-flex items-center gap-1">
                              <span>${badge.icon}</span>
                              <span>${badge.label}</span>
                            </span>
                          </td>
                          <td class="py-3 px-3">
                            <select
                              data-admin-change-role="${u.uid}"
                              class="px-2.5 py-1 rounded-md bg-[#0d111a] border border-white/15 text-xs text-white cursor-pointer focus:outline-none focus:border-rose-400"
                            >
                              <option value="siswa" ${u.role === 'siswa' ? 'selected' : ''}>🎓 Siswa</option>
                              <option value="guru" ${u.role === 'guru' ? 'selected' : ''}>👨‍🏫 Guru</option>
                              <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>🛡️ Admin</option>
                            </select>
                          </td>
                          <td class="py-3 px-3 font-mono">
                            <span class="font-bold text-white">L${u.level}</span>
                            <span class="text-amber-400 ml-1">(${u.total_xp} XP)</span>
                          </td>
                          <td class="py-3 px-3 text-right whitespace-nowrap space-x-1">
                            <button
                              type="button"
                              data-admin-boost-xp="${u.uid}"
                              class="px-2 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold cursor-pointer"
                              title="Tambah +250 XP"
                            >
                              +250 XP
                            </button>
                            <button
                              type="button"
                              data-admin-reset-xp="${u.uid}"
                              class="px-2 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[10px] font-semibold cursor-pointer"
                              title="Reset XP ke 0"
                            >
                              Reset XP
                            </button>
                            <button
                              type="button"
                              data-admin-delete-user="${u.uid}"
                              class="px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-[10px] font-semibold cursor-pointer"
                              title="Hapus Akun"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      ` : ''}

      <!-- ==================== TAB 2: ANALITIK & LOG AUDIT SISTEM ==================== -->
      ${activeSubTab === 'analytics' ? `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-5 space-y-4">
            <div class="bezel-shell">
              <div class="bezel-core p-5 space-y-3.5">
                <h3 class="text-sm font-bold text-white flex items-center gap-2">
                  <span>🖧</span> Status Infrastruktur & Layanan Sistem
                </h3>
                <div class="space-y-2.5 text-xs">
                  ${[
                    { name: 'Supabase PostgreSQL 3NF Database', status: 'Operational (99.9%)', color: 'text-emerald-400' },
                    { name: 'Supabase Realtime Broadcast WebSocket', status: 'Connected', color: 'text-emerald-400' },
                    { name: 'Google Gemini 2.5 Flash Socratic Engine', status: 'Active & Ready', color: 'text-emerald-400' },
                    { name: 'Three.js / Model-Viewer 3D PBR Pipeline', status: '60 FPS Hardware Accel', color: 'text-sky-400' },
                    { name: 'Row-Level Security (RLS) & Privacy Shield', status: 'Enforced (Strict)', color: 'text-amber-400' }
                  ].map(srv => `
                    <div class="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between">
                      <span class="text-slate-200 font-medium">${srv.name}</span>
                      <span class="font-mono text-[11px] font-bold ${srv.color}">${srv.status}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="bezel-shell">
              <div class="bezel-core p-5 space-y-3.5">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-white flex items-center gap-2">
                    <span>📋</span> System Audit Logs (Rekam Jejak Aktivitas)
                  </h3>
                  <span class="text-[10px] font-mono text-rose-300">Live Security Log</span>
                </div>
                <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                  ${auditLogs.map(log => `
                    <div class="p-3 rounded-lg bg-black/40 border border-white/[0.08] flex items-start justify-between gap-3 text-xs">
                      <div class="space-y-0.5">
                        <div class="flex items-center gap-2">
                          <span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold">${log.type}</span>
                          <span class="font-bold text-white">${log.actor}</span>
                        </div>
                        <p class="text-slate-300 text-[11px]">${log.action}</p>
                      </div>
                      <span class="text-[10px] font-mono text-slate-500 shrink-0">${log.time}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- ==================== TAB 3: KATALOG PERANGKAT 3D & MODUL ==================== -->
      ${activeSubTab === 'devices' ? `
        <div class="bezel-shell">
          <div class="bezel-core p-5 space-y-4">
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 class="text-sm font-bold text-white">Manajemen Katalog Perangkat Keras 3D Virtual Lab</h3>
                <p class="text-xs text-slate-400">Daftar model perangkat jaringan 3D interaktif yang tersedia di Workbench Siswa.</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-amber-400/15 text-amber-300 font-mono text-xs font-bold">${devices.length} Perangkat Aktif</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              ${devices.map((dev, idx) => `
                <div class="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-3">
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between">
                      <span class="px-2 py-0.5 rounded bg-white/[0.06] text-amber-400 font-mono text-[10px] font-bold uppercase">${dev.kode}</span>
                      <span class="text-[10px] text-slate-400 font-mono">${dev.hotspots?.length || 0} Hotspot 3D</span>
                    </div>
                    <h4 class="text-sm font-bold text-white">${dev.nama}</h4>
                    <p class="text-xs text-slate-400 leading-relaxed">${dev.deskripsi}</p>
                  </div>
                  <div class="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                    <span class="text-[10px] font-mono text-emerald-400">Status: Aktif</span>
                    <button
                      type="button"
                      data-nav="workbench"
                      data-device-code="${dev.kode}"
                      class="px-2.5 py-1 rounded bg-white/[0.08] hover:bg-white/15 text-white text-[11px] font-semibold cursor-pointer"
                    >
                      Inspeksi 3D →
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- ==================== TAB 4: MODERASI KOMUNITAS & LEADERBOARD ==================== -->
      ${activeSubTab === 'moderation' ? `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Moderasi Global Chat -->
          <div class="lg:col-span-6">
            <div class="bezel-shell">
              <div class="bezel-core p-5 space-y-3.5">
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 class="text-sm font-bold text-white flex items-center gap-2">
                    <span>💬</span> Moderasi Pesan Diskusi Komunitas (${chatMessages.length})
                  </h3>
                  <button
                    type="button"
                    data-nav="social"
                    class="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    Buka Social Hub →
                  </button>
                </div>

                <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                  ${chatMessages.map(msg => `
                    <div class="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-start justify-between gap-3">
                      <div class="space-y-1 min-w-0">
                        <div class="flex items-center gap-2 text-[11px]">
                          <span class="font-bold text-amber-300">${msg.sender}</span>
                          <span class="font-mono text-slate-500 text-[10px]">${msg.senderUid || ''}</span>
                          <span class="text-slate-500 text-[10px]">• ${msg.time || ''}</span>
                        </div>
                        <p class="text-xs text-slate-200 break-words">${msg.text}</p>
                      </div>
                      <button
                        type="button"
                        data-admin-delete-chat="${msg.id}"
                        class="px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[10px] font-semibold shrink-0 cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Moderasi Skor Leaderboard -->
          <div class="lg:col-span-6">
            <div class="bezel-shell">
              <div class="bezel-core p-5 space-y-3.5">
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 class="text-sm font-bold text-white flex items-center gap-2">
                    <span>🏆</span> Moderasi Skor Papan Peringkat (${leaderboardScores.length})
                  </h3>
                  <button
                    type="button"
                    data-nav="leaderboard"
                    class="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    Buka Leaderboard →
                  </button>
                </div>

                <div class="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                  ${leaderboardScores.map((sc, idx) => `
                    <div class="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <div class="text-xs font-bold text-white">
                          #${idx + 1} ${sc.player_name || 'Siswa'}
                          <span class="ml-1.5 px-1.5 py-0.5 rounded bg-white/[0.06] font-mono text-[10px] text-amber-300">${sc.standar_kabel || sc.standard || 'T568B'}</span>
                        </div>
                        <div class="text-[11px] font-mono text-slate-400 mt-0.5">
                          Akurasi: ${sc.akurasi_persen !== undefined ? sc.akurasi_persen : sc.accuracy}% · Waktu: ${sc.waktu_detik !== undefined ? sc.waktu_detik : sc.time}s · ${sc.total_xp || sc.xp_didapat || 150} XP
                        </div>
                      </div>
                      <button
                        type="button"
                        data-admin-delete-score="${idx}"
                        class="px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[10px] font-semibold shrink-0 cursor-pointer"
                      >
                        Hapus Skor
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

        </div>
      ` : ''}

    </div>
  `;
}
