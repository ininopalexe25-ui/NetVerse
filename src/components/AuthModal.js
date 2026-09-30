import { renderNetVerseLogo } from './Logo.js';
import { t } from '../utils/i18n.js';

const eyeIconSvg = `
  <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
`;

const eyeOffIconSvg = `
  <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
  </svg>
`;

export function renderAuthModal(state) {
  if (!state.authModalOpen) return '';

  const lang = state.lang || 'id';
  const isProfileMode = state.authMode === 'profile' && state.session;
  const isRegisterMode = state.authMode === 'register';

  // Gamification stats calculation
  const totalXp = state.userProfile?.total_xp || 0;
  const level = state.userProfile?.level || Math.floor(totalXp / 500) + 1;
  const xpCurrentLevel = totalXp % 500;
  const xpNextLevel = 500;
  const xpPercentage = Math.min(100, Math.round((xpCurrentLevel / xpNextLevel) * 100));

  // Best crimping record if any
  const userScores = (state.scores || []).filter(s => 
    (state.session && s.user_id === state.session.user?.id) ||
    s.player_name === state.userProfile?.nama_lengkap
  );
  const bestAccuracy = userScores.length > 0 
    ? Math.max(...userScores.map(s => Number(s.akurasi_persen || 0))) 
    : 0;

  const showPasswordLabel = state.showPassword 
    ? (lang === 'en' ? 'Hide password' : (lang === 'jp' ? 'パスワードを隠す' : (lang === 'cn' ? '隐藏密码' : 'Sembunyikan kata sandi')))
    : (lang === 'en' ? 'Show password' : (lang === 'jp' ? 'パスワードを表示' : (lang === 'cn' ? '显示密码' : 'Lihat kata sandi')));

  const guestLabel = t('authModal.continueGuest', lang);

  return `
    <div id="auth-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div class="max-w-md w-full bezel-shell bg-[#090a0f] border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.85)]">
        <div class="bezel-core p-6 relative">
          
          <!-- Close Button -->
          <button id="btn-close-auth-modal" class="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors" aria-label="${t('authModal.closeWindow', lang)}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          ${isProfileMode ? `
            <!-- ================= PROFILE VIEW ================= -->
            <div class="space-y-5">
              
              <!-- Profile Header Card -->
              <div class="flex items-center space-x-3.5 pb-4 border-b border-white/[0.08]">
                <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-500/30 flex items-center justify-center text-xl font-bold text-amber-400 shadow-sm">
                  ${(state.userProfile?.nama_lengkap || 'U').charAt(0).toUpperCase()}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h3 class="text-sm font-semibold text-white truncate">${state.userProfile?.nama_lengkap || 'Mahasiswa'}</h3>
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20 capitalize">
                      ${state.userProfile?.role || 'mahasiswa'}
                    </span>
                  </div>
                  <p class="text-xs text-slate-400 truncate">@${state.userProfile?.username || 'user'}</p>
                  <p class="text-[11px] text-slate-400 mt-0.5 truncate">${state.session?.user?.email || ''}</p>
                </div>
              </div>

              <!-- XP & Gamification Progress Bar -->
              <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center space-x-1.5">
                    <span class="w-2 h-2 rounded-sm bg-amber-400"></span>
                    <span class="font-semibold text-white">${t('leaderboard.level', lang)} ${level}</span>
                    <span class="text-slate-400">• NetVerse Lab</span>
                  </div>
                  <span class="font-mono text-amber-400 font-semibold">${totalXp} XP</span>
                </div>
                
                <div class="w-full bg-white/[0.06] rounded-md h-2 overflow-hidden border border-white/[0.05]">
                  <div class="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-md transition-all duration-500" style="width: ${xpPercentage}%"></div>
                </div>

                <div class="flex items-center justify-between text-[11px] text-slate-400">
                  <span>XP: ${xpCurrentLevel} / ${xpNextLevel}</span>
                  <span>+${500 - xpCurrentLevel} XP → ${t('leaderboard.level', lang)} ${level + 1}</span>
                </div>
              </div>

              <!-- Learning Stats Bento Grid -->
              <div class="grid grid-cols-2 gap-2.5">
                <div class="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">${t('authModal.bestAccuracy', lang)}</div>
                  <div class="text-base font-bold text-white mt-1 font-mono">${bestAccuracy > 0 ? `${bestAccuracy.toFixed(0)}%` : '-'}</div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${t('authModal.totalAttempts', lang, { count: userScores.length })}</div>
                </div>
                <div class="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">${t('authModal.cloudSync', lang)}</div>
                  <div class="text-base font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-sm bg-emerald-400"></span> ${t('authModal.cloudActive', lang)}
                  </div>
                  <div class="text-[10px] text-slate-400 mt-0.5">${t('authModal.syncReady', lang)}</div>
                </div>
              </div>

              <!-- Profile Update Form -->
              <form id="form-update-profile" class="space-y-3 pt-2">
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1">${t('authModal.fullName', lang)}</label>
                  <input 
                    type="text" 
                    id="profile-nama-lengkap" 
                    value="${state.userProfile?.nama_lengkap || ''}" 
                    required
                    class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1">${t('authModal.username', lang)}</label>
                  <input 
                    type="text" 
                    id="profile-username" 
                    value="${state.userProfile?.username || ''}" 
                    required
                    class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                ${state.authNotice ? `
                  <div class="p-2.5 rounded-lg text-xs ${state.authNotice.type === 'error' ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300' : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'}">
                    ${state.authNotice.message}
                  </div>
                ` : ''}

                <div class="flex items-center gap-2 pt-2">
                  <button 
                    type="submit" 
                    id="btn-save-profile" 
                    class="flex-1 py-2 px-3 rounded-lg bg-white text-black hover:bg-slate-200 text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
                    ${state.authLoading ? 'disabled' : ''}
                  >
                    ${state.authLoading ? '...' : t('authModal.btnSaveProfile', lang)}
                  </button>
                  <button 
                    type="button" 
                    id="btn-signout" 
                    class="py-2 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors"
                  >
                    ${t('authModal.btnSignOut', lang)}
                  </button>
                </div>
              </form>

            </div>
          ` : `
            <!-- ================= LOGIN / REGISTER VIEW ================= -->
            <div class="space-y-5">
              
              <!-- Brand Header -->
              <div class="text-center pt-2">
                <div class="flex justify-center mb-2.5">
                  ${renderNetVerseLogo({ size: 40, className: 'w-10 h-10 rounded-lg shadow-lg' })}
                </div>
                <h3 class="text-base font-bold text-white tracking-tight">${isRegisterMode ? t('authModal.registerTitle', lang) : t('authModal.loginTitle', lang)}</h3>
                <p class="text-xs text-slate-400 mt-1">${t('authModal.loginSubtitle', lang)}</p>
              </div>

              <!-- Auth Mode Switcher -->
              <div class="flex rounded-lg bg-white/[0.04] p-1 border border-white/[0.08]">
                <button 
                  type="button" 
                  id="tab-auth-login" 
                  class="flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                    !isRegisterMode 
                      ? 'bg-white/15 text-white font-semibold shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }"
                >
                  ${t('auth.login', lang)}
                </button>
                <button 
                  type="button" 
                  id="tab-auth-register" 
                  class="flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isRegisterMode 
                      ? 'bg-white/15 text-white font-semibold shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }"
                >
                  ${t('auth.register', lang)}
                </button>
              </div>

              <!-- Error/Success Notice -->
              ${state.authNotice ? `
                <div 
                  id="auth-notice-box" 
                  role="alert" 
                  aria-live="polite"
                  class="p-3 rounded-lg text-xs flex items-start gap-2.5 transition-all animate-fadeIn ${
                    state.authNotice.type === 'error' 
                      ? 'bg-rose-500/15 border border-rose-500/40 text-rose-200' 
                      : state.authNotice.type === 'warning'
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-200'
                      : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-200'
                  }"
                >
                  <span class="text-sm shrink-0 mt-0.5" aria-hidden="true">
                    ${state.authNotice.type === 'error' || state.authNotice.type === 'warning' ? '⚠️' : '✓'}
                  </span>
                  <div class="flex-1 leading-relaxed">
                    <span class="font-bold block mb-0.5 ${
                      state.authNotice.type === 'error' 
                        ? 'text-rose-300' 
                        : state.authNotice.type === 'warning'
                        ? 'text-amber-300'
                        : 'text-emerald-300'
                    }">
                      ${state.authNotice.type === 'error' || state.authNotice.type === 'warning'
                        ? t('authModal.noticeWarningTitle', lang)
                        : t('authModal.noticeSuccessTitle', lang)}
                    </span>
                    <span class="text-slate-200 font-medium">${state.authNotice.message}</span>
                  </div>
                </div>
              ` : ''}

              <!-- Auth Form -->
              <form id="form-auth" class="space-y-3">
                ${isRegisterMode ? `
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1">${t('authModal.fullName', lang)}</label>
                    <input 
                      type="text" 
                      id="auth-nama-lengkap" 
                      placeholder="${t('authModal.namePlaceholder', lang)}" 
                      required 
                      class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1">${t('authModal.username', lang)}</label>
                    <input 
                      type="text" 
                      id="auth-username" 
                      placeholder="${t('authModal.userPlaceholder', lang)}" 
                      required 
                      class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                ` : ''}

                <div>
                  <label class="block text-xs font-semibold text-slate-300 mb-1">${t('authModal.email', lang)}</label>
                  <input 
                    type="email" 
                    id="auth-email" 
                    placeholder="user@example.com" 
                    required 
                    class="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label for="auth-password" class="block text-xs font-semibold text-slate-300 mb-1">${t('authModal.password', lang)}</label>
                  <div class="relative">
                    <input 
                      type="${state.showPassword ? 'text' : 'password'}" 
                      id="auth-password" 
                      placeholder="••••••••" 
                      required 
                      minlength="6"
                      class="w-full pl-3 pr-10 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    <button 
                      type="button" 
                      id="btn-toggle-password" 
                      class="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center justify-center cursor-pointer" 
                      aria-label="${showPasswordLabel}"
                      title="${showPasswordLabel}"
                    >
                      ${state.showPassword ? eyeOffIconSvg : eyeIconSvg}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  id="btn-submit-auth" 
                  class="w-full py-2.5 rounded-lg bg-white text-black hover:bg-slate-200 text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 mt-2"
                  ${state.authLoading ? 'disabled' : ''}
                >
                  ${state.authLoading 
                    ? '...' 
                    : (isRegisterMode ? t('authModal.btnRegister', lang) : t('authModal.btnSignIn', lang))}
                </button>
              </form>

              <!-- Guest Mode Option -->
              <div class="pt-2 border-t border-white/[0.06] text-center">
                <button 
                  type="button" 
                  id="btn-continue-guest" 
                  class="text-xs text-slate-400 hover:text-white transition-colors py-1 inline-flex items-center gap-1"
                >
                  ${guestLabel}
                </button>
              </div>

            </div>
          `}

        </div>
      </div>
    </div>
  `;
}
