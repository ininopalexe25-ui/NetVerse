import { t } from '../utils/i18n.js';

/**
 * NetVerse - Leaderboard Component
 * Realtime Gamification Center & Live Standings Table
 * Strictly adheres to Anti-Rounded Rules (max 12px containers, 8px buttons/tabs, 6px tags/badges).
 */

export function renderLeaderboard(scores = [], currentUser = {}, activeFilter = 'all', realtimeStatus = 'CONNECTED', lang = 'id') {
  const isRealtimeActive = ['CONNECTED', 'SUBSCRIBED'].includes(realtimeStatus);
  // 1. Filter scores by standard if selected and strictly filter out unauthenticated 'User' entries
  const filteredScores = scores.filter(s => {
    const rawName = (s.player_name || s.name || '').trim().toLowerCase();
    if (!rawName || rawName === 'user') return false;
    if (activeFilter === 'all') return true;
    const std = s.standar_kabel || s.standard;
    return std === activeFilter;
  });

  // 2. Deduplicate by user: keep only each user's best score in the filtered category
  const bestScoreByUser = new Map();
  for (const s of filteredScores) {
    if (currentUser?.id && s.user_id === currentUser.id && currentUser.nama_lengkap) {
      s.player_name = currentUser.nama_lengkap;
    }
    const rawName = (s.player_name || s.name || t('leaderboard.participantDefault', lang)).trim();
    if (rawName.toLowerCase() === 'user') continue;
    // Unique key: prefer user_id, fallback to normalized player name
    const userKey = s.user_id ? `uid:${s.user_id}` : `name:${rawName.toLowerCase()}`;
    const acc = Number(s.akurasi_persen !== undefined ? s.akurasi_persen : (parseFloat(s.accuracy) || 0));
    const time = Number(s.waktu_detik !== undefined ? s.waktu_detik : (parseInt(s.time, 10) || 999));
    const xp = Number(s.total_xp !== undefined ? s.total_xp : ((s.xp_didapat || 0) + (s.xp_materi || 0) || s.xp || 0));

    if (!bestScoreByUser.has(userKey)) {
      bestScoreByUser.set(userKey, s);
    } else {
      const currentBest = bestScoreByUser.get(userKey);
      const currAcc = Number(currentBest.akurasi_persen !== undefined ? currentBest.akurasi_persen : (parseFloat(currentBest.accuracy) || 0));
      const currTime = Number(currentBest.waktu_detik !== undefined ? currentBest.waktu_detik : (parseInt(currentBest.time, 10) || 999));
      const currXp = Number(currentBest.total_xp !== undefined ? currentBest.total_xp : ((currentBest.xp_didapat || 0) + (currentBest.xp_materi || 0) || currentBest.xp || 0));

      // Compare: higher accuracy > faster time > higher XP
      const isBetter = (acc > currAcc) ||
        (acc === currAcc && time < currTime) ||
        (acc === currAcc && time === currTime && xp > currXp);

      if (isBetter) {
        bestScoreByUser.set(userKey, s);
      }
    }
  }

  // Ensure authenticated currentUser is displayed on leaderboard if they earned XP
  if (currentUser?.id) {
    const userKey = `uid:${currentUser.id}`;
    const nameKey = `name:${(currentUser.nama_lengkap || '').trim().toLowerCase()}`;
    if (!bestScoreByUser.has(userKey) && !bestScoreByUser.has(nameKey) && (currentUser.total_xp || 0) > 0) {
      const userTotalXp = Number(currentUser.total_xp || 0);
      const userCrimpingXp = Number(currentUser.crimpingXp || 0);
      const userMateriXp = Number(currentUser.materiXp !== undefined ? currentUser.materiXp : Math.max(0, userTotalXp - userCrimpingXp));
      bestScoreByUser.set(userKey, {
        user_id: currentUser.id,
        player_name: currentUser.nama_lengkap || currentUser.username || t('leaderboard.participantDefault', lang),
        standar_kabel: activeFilter !== 'all' ? activeFilter : 'T568B',
        waktu_detik: userCrimpingXp > 0 ? 15 : undefined,
        akurasi_persen: userCrimpingXp > 0 ? 100 : undefined,
        total_xp: userTotalXp,
        crimpingXp: userCrimpingXp,
        materiXp: userMateriXp,
        level: currentUser.level || Math.floor(userTotalXp / 500) + 1,
        selesai_pada: new Date().toISOString(),
        isCurrent: true
      });
    }
  }

  const uniqueScores = Array.from(bestScoreByUser.values());

  // 3. Sort: accuracy desc, time asc, xp desc
  uniqueScores.sort((a, b) => {
    const accA = Number(a.akurasi_persen !== undefined ? a.akurasi_persen : (parseFloat(a.accuracy) || 0));
    const accB = Number(b.akurasi_persen !== undefined ? b.akurasi_persen : (parseFloat(b.accuracy) || 0));
    if (accB !== accA) return accB - accA;

    const timeA = Number(a.waktu_detik !== undefined ? a.waktu_detik : (parseInt(a.time, 10) || 999));
    const timeB = Number(b.waktu_detik !== undefined ? b.waktu_detik : (parseInt(b.time, 10) || 999));
    if (timeA !== timeB) return timeA - timeB;

    const xpA = Number(a.total_xp !== undefined ? a.total_xp : ((a.xp_didapat || 0) + (a.xp_materi || 0) || a.xp || 0));
    const xpB = Number(b.total_xp !== undefined ? b.total_xp : ((b.xp_didapat || 0) + (b.xp_materi || 0) || b.xp || 0));
    return xpB - xpA;
  });

  const displayScores = uniqueScores.length > 0 
    ? uniqueScores.map((s, idx) => {
        const isCurrent = (currentUser.id && s.user_id === currentUser.id) || (currentUser.nama_lengkap && (s.player_name || '').trim().toLowerCase() === currentUser.nama_lengkap.trim().toLowerCase());
        const displayName = (isCurrent && currentUser.nama_lengkap) 
          ? currentUser.nama_lengkap 
          : (s.player_name || s.name || t('leaderboard.participantDefault', lang));
        
        // Calculate combined XP from Crimping + Materi
        const crimpingXp = isCurrent
          ? (currentUser.crimpingXp !== undefined ? currentUser.crimpingXp : Number(s.crimpingXp !== undefined ? s.crimpingXp : (s.xp_didapat || 0)))
          : Number(s.crimpingXp !== undefined ? s.crimpingXp : (s.xp_didapat || 0));
        
        const materiXp = isCurrent
          ? (currentUser.materiXp !== undefined ? currentUser.materiXp : Math.max(0, (currentUser.total_xp || 0) - crimpingXp))
          : Number(s.materiXp !== undefined ? s.materiXp : (s.total_xp ? Math.max(0, s.total_xp - crimpingXp) : 0));
        
        const combinedTotalXp = isCurrent
          ? (currentUser.total_xp !== undefined ? currentUser.total_xp : (crimpingXp + materiXp))
          : (s.total_xp !== undefined ? s.total_xp : (crimpingXp + materiXp));

        const level = isCurrent
          ? (currentUser.level || Math.floor(combinedTotalXp / 500) + 1)
          : (s.level || Math.floor(combinedTotalXp / 500) + 1);

        return {
          rank: idx + 1,
          name: displayName,
          level: level,
          standard: s.standar_kabel || s.standard || 'T568B',
          time: s.waktu_detik !== undefined ? `${s.waktu_detik} ${t('leaderboard.secondUnit', lang)}` : (s.time ? s.time.replace(/detik|s|秒/g, t('leaderboard.secondUnit', lang)) : `15 ${t('leaderboard.secondUnit', lang)}`),
          accuracy: s.akurasi_persen !== undefined ? `${parseFloat(s.akurasi_persen).toFixed(1)}%` : (s.accuracy || '100%'),
          xp: combinedTotalXp,
          crimpingXp: crimpingXp,
          materiXp: materiXp,
          date: s.selesai_pada ? new Date(s.selesai_pada).toLocaleTimeString(lang === 'id' ? 'id-ID' : (lang === 'jp' ? 'ja-JP' : (lang === 'cn' ? 'zh-CN' : 'en-US')), { hour: '2-digit', minute: '2-digit' }) : t('leaderboard.today', lang),
          isCurrent: isCurrent
        };
      })
    : [
        { 
          rank: 1, 
          name: `${currentUser.nama_lengkap || t('leaderboard.participantDefault', lang)} (${t('leaderboard.youTag', lang).toLowerCase()})`, 
          level: currentUser.level || 1, 
          standard: 'T568B', 
          time: `14.2 ${t('leaderboard.secondUnit', lang)}`, 
          accuracy: '100.0%', 
          xp: currentUser.total_xp || 330, 
          crimpingXp: currentUser.crimpingXp || 150,
          materiXp: currentUser.materiXp || Math.max(0, (currentUser.total_xp || 330) - (currentUser.crimpingXp || 150)),
          date: t('leaderboard.today', lang), 
          isCurrent: true 
        },
        { rank: 2, name: 'Rian Pratama', level: 1, standard: 'T568B', time: `18 ${t('leaderboard.secondUnit', lang)}`, accuracy: '100.0%', xp: 330, crimpingXp: 150, materiXp: 180, date: '10.14', isCurrent: false },
        { rank: 3, name: 'Zahra Amalia', level: 1, standard: 'T568A', time: `19 ${t('leaderboard.secondUnit', lang)}`, accuracy: '100.0%', xp: 310, crimpingXp: 150, materiXp: 160, date: '10.18', isCurrent: false },
        { rank: 4, name: 'Dimas Wahyu', level: 1, standard: 'T568A', time: `21 ${t('leaderboard.secondUnit', lang)}`, accuracy: '100.0%', xp: 290, crimpingXp: 150, materiXp: 140, date: '09.42', isCurrent: false },
        { rank: 5, name: 'Aisyah Putri', level: 1, standard: 'T568B', time: `25 ${t('leaderboard.secondUnit', lang)}`, accuracy: '87.5%', xp: 195, crimpingXp: 75, materiXp: 120, date: '09.30', isCurrent: false }
      ];

  const top1 = displayScores[0];
  const top2 = displayScores[1];
  const top3 = displayScores[2];

  return `
    <div class="space-y-8 pt-16 pb-16 animate-fadeIn max-w-5xl mx-auto">
      
      <!-- Header Banner with Realtime Status -->
      <div class="border-b border-white/[0.08] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
              ${t('leaderboard.badge', lang)}
            </span>
            <div class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              <span class="w-1.5 h-1.5 rounded-sm bg-emerald-400 animate-pulse"></span>
              <span>${isRealtimeActive ? t('leaderboard.realtimeActive', lang) : t('leaderboard.realtimeInactive', lang)}</span>
            </div>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${t('leaderboard.title', lang)}</h1>
          <p class="text-slate-400 text-xs sm:text-sm mt-1">${t('leaderboard.subtitle', lang)}</p>
        </div>

        <!-- Filter Tabs & Refresh Button -->
        <div class="flex items-center gap-2 shrink-0">
          <div class="flex rounded-lg bg-white/[0.04] p-1 border border-white/[0.08]">
            <button 
              data-filter-leaderboard="all"
              class="px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeFilter === 'all' 
                  ? 'bg-white/15 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }"
            >
              ${t('leaderboard.filterAll', lang)}
            </button>
            <button 
              data-filter-leaderboard="T568B"
              class="px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeFilter === 'T568B' 
                  ? 'bg-white/15 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }"
            >
              T568B
            </button>
            <button 
              data-filter-leaderboard="T568A"
              class="px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeFilter === 'T568A' 
                  ? 'bg-white/15 text-white font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }"
            >
              T568A
            </button>
          </div>

          <button 
            id="btn-refresh-leaderboard"
            class="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-slate-300 border border-white/10 text-xs transition-colors"
            title="${t('leaderboard.refresh', lang)}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Top 3 Champions Podium (Bento Cards) -->
      ${top1 ? `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          
          <!-- #2 Runner Up -->
          ${top2 ? `
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between order-2 sm:order-1 relative overflow-hidden">
              <div class="flex items-center justify-between mb-3">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-400/10 text-slate-300 border border-slate-400/20">
                  ${t('leaderboard.runnerUpBadge', lang)}
                </span>
                <span class="text-xs font-mono font-semibold text-slate-400">${top2.standard}</span>
              </div>
              <div>
                <div class="text-sm font-bold text-white truncate">${top2.name}</div>
                <div class="flex items-center gap-2 mt-1 text-xs">
                  <span class="text-emerald-400 font-mono font-semibold">${top2.time}</span>
                  <span class="text-slate-600">•</span>
                  <span class="text-slate-300 font-mono">${top2.accuracy}</span>
                </div>
              </div>
              <div class="mt-3 pt-2.5 border-t border-white/[0.06] space-y-1">
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span>${t('leaderboard.totalXpLabel', lang)}</span>
                  <span class="font-mono font-bold text-white">+${top2.xp} XP</span>
                </div>
                <div class="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                  <span>${t('leaderboard.breakdownTitle', lang)}:</span>
                  <span>${top2.crimpingXp} ${t('leaderboard.shortCrimping', lang)} + ${top2.materiXp} ${t('leaderboard.shortMateri', lang)}</span>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- #1 Champion -->
          <div class="p-5 rounded-xl bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent border border-amber-400/30 flex flex-col justify-between order-1 sm:order-2 relative shadow-[0_12px_30px_rgba(245,158,11,0.08)]">
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-400 text-black shadow-sm flex items-center gap-1">
                <span>👑</span>
                <span>${t('leaderboard.top1Badge', lang)}</span>
              </span>
              <span class="text-xs font-mono font-semibold text-amber-400">${top1.standard}</span>
            </div>
            <div>
              <div class="text-base font-bold text-white truncate">${top1.name}</div>
              <div class="flex items-center gap-2 mt-1.5 text-xs">
                <span class="text-emerald-400 font-mono font-bold text-sm">${top1.time}</span>
                <span class="text-slate-600">•</span>
                <span class="text-white font-mono font-semibold">${top1.accuracy}</span>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-amber-400/20 space-y-1">
              <div class="flex items-center justify-between text-xs text-amber-300/80">
                <span class="font-medium">${t('leaderboard.totalXpLabel', lang)}</span>
                <span class="font-mono font-extrabold text-amber-400 text-sm">+${top1.xp} XP</span>
              </div>
              <div class="flex items-center justify-between text-[10px] text-amber-300/70 font-mono">
                <span>${t('leaderboard.breakdownTitle', lang)}:</span>
                <span>${top1.crimpingXp} ${t('leaderboard.shortCrimping', lang)} + ${top1.materiXp} ${t('leaderboard.shortMateri', lang)}</span>
              </div>
            </div>
          </div>

          <!-- #3 Third Place -->
          ${top3 ? `
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between order-3 sm:order-3 relative overflow-hidden">
              <div class="flex items-center justify-between mb-3">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-700/20 text-amber-500 border border-amber-700/30">
                  ${t('leaderboard.thirdBadge', lang)}
                </span>
                <span class="text-xs font-mono font-semibold text-slate-400">${top3.standard}</span>
              </div>
              <div>
                <div class="text-sm font-bold text-white truncate">${top3.name}</div>
                <div class="flex items-center gap-2 mt-1 text-xs">
                  <span class="text-emerald-400 font-mono font-semibold">${top3.time}</span>
                  <span class="text-slate-600">•</span>
                  <span class="text-slate-300 font-mono">${top3.accuracy}</span>
                </div>
              </div>
              <div class="mt-3 pt-2.5 border-t border-white/[0.06] space-y-1">
                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span>${t('leaderboard.totalXpLabel', lang)}</span>
                  <span class="font-mono font-bold text-white">+${top3.xp} XP</span>
                </div>
                <div class="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                  <span>${t('leaderboard.breakdownTitle', lang)}:</span>
                  <span>${top3.crimpingXp} ${t('leaderboard.shortCrimping', lang)} + ${top3.materiXp} ${t('leaderboard.shortMateri', lang)}</span>
                </div>
              </div>
            </div>
          ` : ''}

        </div>
      ` : ''}

      <!-- Leaderboard Full Table (Crisp Double-Bezel) -->
      <div class="bezel-shell">
        <div class="bezel-core p-4 sm:p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="text-slate-500 border-b border-white/[0.06] text-[11px] uppercase tracking-wider font-semibold">
                <tr>
                  <th class="py-3.5 px-4 sm:px-6">${t('leaderboard.rank', lang)}</th>
                  <th class="py-3.5 px-4 sm:px-6">${t('leaderboard.participant', lang)}</th>
                  <th class="py-3.5 px-4 sm:px-6">${t('leaderboard.level', lang)}</th>
                  <th class="py-3.5 px-4 sm:px-6">${t('leaderboard.standard', lang)}</th>
                  <th class="py-3.5 px-4 sm:px-6">${t('leaderboard.time', lang)}</th>
                  <th class="py-3.5 px-4 sm:px-6">${t('leaderboard.accuracy', lang)}</th>
                  <th class="py-3.5 px-4 sm:px-6">${t('leaderboard.completedAt', lang)}</th>
                  <th class="py-3.5 px-4 sm:px-6 text-right">${t('leaderboard.xp', lang)}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/[0.04] text-slate-300">
                ${displayScores.map(s => `
                  <tr class="${s.isCurrent ? 'bg-amber-400/10 font-bold text-white' : 'hover:bg-white/[0.02] transition-colors'}">
                    <td class="py-3.5 px-4 sm:px-6 font-mono font-bold ${
                      s.rank === 1 ? 'text-amber-400' : s.rank === 2 ? 'text-slate-300' : s.rank === 3 ? 'text-amber-600' : 'text-slate-500'
                    }">
                      #${s.rank}
                    </td>
                    <td class="py-3.5 px-4 sm:px-6 font-semibold flex items-center space-x-3">
                      <div class="w-7 h-7 rounded-md ${s.isCurrent ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'} flex items-center justify-center text-xs font-bold">
                        ${s.name.charAt(0)}
                      </div>
                      <div class="flex items-center gap-1.5">
                        <span>${s.name}</span>
                        ${s.isCurrent ? `
                          <span class="px-1.5 py-0.2 rounded-sm text-[9px] font-bold bg-amber-400 text-black">
                            ${t('leaderboard.youTag', lang)}
                          </span>
                        ` : ''}
                      </div>
                    </td>
                    <td class="py-3.5 px-4 sm:px-6 text-amber-400 font-medium font-mono text-xs">${t('leaderboard.level', lang)} ${s.level}</td>
                    <td class="py-3.5 px-4 sm:px-6">
                      <span class="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[11px] font-mono">${s.standard}</span>
                    </td>
                    <td class="py-3.5 px-4 sm:px-6 text-emerald-400 font-mono font-semibold">${s.time}</td>
                    <td class="py-3.5 px-4 sm:px-6 text-slate-200 font-mono">${s.accuracy}</td>
                    <td class="py-3.5 px-4 sm:px-6 text-slate-500 text-xs font-mono">${s.date}</td>
                    <td class="py-3.5 px-4 sm:px-6 text-right font-mono">
                      <div class="font-bold text-white text-xs sm:text-sm">+${s.xp} XP</div>
                      <div class="text-[10px] text-slate-400 font-normal mt-0.5 flex items-center justify-end gap-1">
                        <span class="text-amber-400/90">${s.crimpingXp} ${t('leaderboard.shortCrimping', lang)}</span>
                        <span class="text-slate-600">+</span>
                        <span class="text-emerald-400/90">${s.materiXp} ${t('leaderboard.shortMateri', lang)}</span>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;
}
