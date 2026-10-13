import { t } from '../utils/i18n.js';
import { sanitizePublicProfile, extractProfileMetadata, computeAchievements } from '../utils/userProfiles.js';

/**
 * NetVerse - User Profile Modal Component
 * Renders user profile in either Public Mode (other users) or Private Mode (current user).
 * Adheres strictly to Anti-Rounded Rules (max 12px containers, 8px buttons, 6px badges).
 *
 * Privacy Enforcement:
 * Public profiles ONLY expose Nickname, UID, Level, XP, and Achievements.
 * Username and Tagname are STRICTLY HIDDEN from public view!
 */
export function renderUserProfileModal(state) {
  if (!state.viewingProfileUser) return '';

  const lang = state.lang || 'id';
  const targetUser = state.viewingProfileUser;
  const isSelf = Boolean(
    state.session && (
      (targetUser.id && state.session.user?.id === targetUser.id) ||
      (targetUser.user_id && state.session.user?.id === targetUser.user_id) ||
      (targetUser.nama_lengkap && state.userProfile?.nama_lengkap === targetUser.nama_lengkap)
    )
  );

  const meta = extractProfileMetadata(targetUser);
  const nickname = meta.nickname || targetUser.nama_lengkap || targetUser.player_name || 'Mahasiswa';
  const uid = meta.uid;
  const totalXp = Number(targetUser.total_xp || targetUser.xp || 0);
  const level = Number(targetUser.level || Math.floor(totalXp / 500) + 1);

  // Compute Achievements
  const achievements = computeAchievements(targetUser, state.scores || []);

  // Performance stats
  const userScores = (state.scores || []).filter(s => 
    (targetUser.id && s.user_id === targetUser.id) ||
    (s.player_name || '').trim().toLowerCase() === nickname.trim().toLowerCase()
  );

  const bestAccuracy = userScores.length > 0 
    ? Math.max(...userScores.map(s => Number(s.akurasi_persen !== undefined ? s.akurasi_persen : (parseFloat(s.accuracy) || 0))))
    : 0;

  const bestTime = userScores.length > 0
    ? Math.min(...userScores.map(s => Number(s.waktu_detik !== undefined ? s.waktu_detik : (parseInt(s.time, 10) || 999))))
    : 0;

  return `
    <div id="user-profile-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div class="max-w-md w-full bezel-shell bg-[#090a0f] border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.85)] animate-fadeIn">
        <div class="bezel-core p-6 relative">
          
          <!-- Close Button -->
          <button 
            id="btn-close-user-profile-modal" 
            class="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer" 
            aria-label="${t('authModal.closeWindow', lang)}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Profile Header -->
          <div class="flex items-center space-x-3.5 pb-4 border-b border-white/[0.08]">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/30 flex items-center justify-center text-xl font-bold text-amber-400 shadow-sm shrink-0">
              ${nickname.charAt(0).toUpperCase()}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="text-base font-bold text-white truncate" id="profile-modal-nickname">${nickname}</h3>
                ${isSelf ? `
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    ${t('leaderboard.youTag', lang)}
                  </span>
                ` : ''}
              </div>

              <!-- Permanent UID Badge (Publicly Visible) -->
              <div class="flex items-center gap-2 mt-1">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[11px] font-bold text-amber-400 tracking-wide select-all" id="profile-modal-uid">
                  <span>🆔</span>
                  <span>${uid}</span>
                </span>
                <span class="text-[10px] text-slate-500 font-mono">UID Permanen</span>
              </div>
            </div>
          </div>

          <!-- LEVEL & XP CARD -->
          <div class="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-xs font-bold text-amber-300">
                L${level}
              </div>
              <div>
                <div class="text-xs font-semibold text-white">${t('leaderboard.level', lang)} ${level}</div>
                <div class="text-[10px] text-slate-400">NetVerse Academy Student</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-mono font-bold text-amber-400">${totalXp} XP</div>
              <div class="text-[10px] text-slate-500">Total Perolehan</div>
            </div>
          </div>

          <!-- IF SELF: Display Private Credentials (Username & Tagname) -->
          ${isSelf ? `
            <div class="mt-3.5 p-3 rounded-xl bg-blue-500/[0.06] border border-blue-500/20 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-blue-300 flex items-center gap-1.5">
                  <span>🔒</span> Kredensial Login Privat (Hanya Anda)
                </span>
                <span class="text-[9px] font-mono text-blue-400/80 uppercase">Disembunyikan dari Publik</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div class="p-2 rounded-lg bg-black/40 border border-white/10">
                  <div class="text-[10px] text-slate-400 font-sans">Username</div>
                  <div class="font-bold text-white mt-0.5 truncate">@${state.userProfile?.username || meta.nickname.toLowerCase()}</div>
                </div>
                <div class="p-2 rounded-lg bg-black/40 border border-white/10">
                  <div class="text-[10px] text-slate-400 font-sans">Tagname (5 Digit)</div>
                  <div class="font-bold text-amber-400 mt-0.5 tracking-wider">#${state.userProfile?.tagname || meta.tagname}</div>
                </div>
              </div>
            </div>
          ` : `
            <!-- IF PUBLIC: Explicit Notice of Strict Privacy Protection -->
            <div class="mt-3 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-[11px] text-slate-400">
              <span class="flex items-center gap-1.5">
                <span class="text-emerald-400">🛡️</span> Privasi Terlindungi
              </span>
              <span class="text-[10px] text-slate-500">Username & Tagname dirahasiakan</span>
            </div>
          `}

          <!-- Performance Bento Grid -->
          <div class="mt-3.5 grid grid-cols-2 gap-2">
            <div class="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Akurasi Terbaik</div>
              <div class="text-sm font-bold text-white mt-0.5 font-mono">${bestAccuracy > 0 ? `${bestAccuracy.toFixed(0)}%` : '-'}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Waktu Tercepat</div>
              <div class="text-sm font-bold text-emerald-400 mt-0.5 font-mono">${bestTime > 0 && bestTime < 999 ? `${bestTime}s` : '-'}</div>
            </div>
          </div>

          <!-- RAIHAN & PENCAPAIAN (ACHIEVEMENTS) -->
          <div class="mt-4 space-y-2">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>🏆</span> Raihan & Pencapaian
              </h4>
              <span class="text-[10px] font-mono text-amber-400 font-semibold">
                ${achievements.filter(a => a.unlocked).length} / ${achievements.length} Terbuka
              </span>
            </div>

            <div class="max-h-44 overflow-y-auto custom-scrollbar space-y-1.5 pr-0.5">
              ${achievements.map(ach => `
                <div class="p-2.5 rounded-lg border flex items-center gap-2.5 transition-all ${
                  ach.unlocked 
                    ? `${ach.badgeColor}` 
                    : 'bg-white/[0.02] border-white/5 opacity-40 text-slate-500'
                }">
                  <span class="text-base shrink-0">${ach.icon}</span>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold truncate flex items-center gap-1.5">
                      <span>${ach.title}</span>
                      ${ach.unlocked ? '<span class="text-[10px] text-emerald-400">✓</span>' : ''}
                    </div>
                    <div class="text-[10px] text-slate-400 line-clamp-1">${ach.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- ACTIONS -->
          <div class="mt-5 pt-3 border-t border-white/[0.08] flex items-center gap-2">
            ${!isSelf ? `
              <button 
                type="button" 
                id="btn-profile-start-chat" 
                data-chat-target="${nickname}"
                data-chat-uid="${uid}"
                class="flex-1 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>💬</span>
                <span>Kirim Pesan Obrolan</span>
              </button>
            ` : ''}

            <button 
              type="button" 
              id="btn-close-profile-view" 
              class="${isSelf ? 'w-full' : ''} py-2 px-4 rounded-lg bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}
