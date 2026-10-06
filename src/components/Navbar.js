import { renderNetVerseLogo } from './Logo.js';
import { t, SUPPORTED_LANGS, SUPPORTED_THEMES } from '../utils/i18n.js';

export function renderNavbar(activeTab, onNavigate, userProfile, session, theme = 'dark', lang = 'id') {
  const navItems = [
    { id: 'workbench', label: t('nav.workbench', lang) },
    { id: 'crimping', label: t('nav.crimping', lang) },
    { id: 'materi', label: t('nav.materi', lang) },
    { id: 'leaderboard', label: t('nav.leaderboard', lang) }
  ];

  const isAuthenticated = !!(session && userProfile && userProfile.id);
  const currentLangObj = SUPPORTED_LANGS.find(l => l.code === lang) || SUPPORTED_LANGS[0];
  const currentThemeObj = SUPPORTED_THEMES.find(th => th.code === theme) || SUPPORTED_THEMES[1];

  return `
    <header class="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <div class="max-w-4xl mx-auto mt-4 pointer-events-auto">
        <div class="rounded-xl px-4 sm:px-5 py-2.5 bg-black/75 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex items-center justify-between transition-all">
          
          <!-- Brand Mark (Official Bespoke Vector Logo) -->
          <button type="button" class="flex items-center space-x-2.5 cursor-pointer group" data-nav="workbench" title="${t('nav.logoTitle', lang)}" aria-label="${t('nav.logoTitle', lang)}">
            ${renderNetVerseLogo({ size: 32, className: 'w-8 h-8 rounded-lg shadow-md group-hover:scale-105 transition-transform' })}
            <div class="flex items-center gap-1.5">
              <span class="text-sm font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">NetVerse</span>
              <span class="w-1.5 h-1.5 rounded-sm bg-emerald-400 animate-pulse" title="${t('auth.systemActive', lang)}"></span>
            </div>
          </button>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-1" aria-label="${t('nav.ariaLabel', lang)}">
            ${navItems.map(item => {
              const isActive = activeTab === item.id;
              return `
                <button 
                  data-nav="${item.id}"
                  aria-current="${isActive ? 'page' : 'false'}"
                  class="min-h-11 px-3.5 rounded-lg text-xs transition-all ${
                    isActive 
                      ? 'bg-white/15 text-white font-semibold border border-white/15 shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }"
                >
                  ${item.label}
                </button>
              `;
            }).join('')}
          </nav>

          <!-- Account & Controls access -->
          <div class="flex items-center space-x-2">
            
            <!-- Language Switcher Dropdown Trigger -->
            <div class="relative">
              <button 
                id="btn-lang-toggle"
                type="button"
                class="lang-switcher-btn min-h-11 px-2.5 rounded-lg bg-white/[0.06] hover:bg-white/10 border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-200"
                title="${t('lang.label', lang)}"
                aria-label="${t('lang.label', lang)}"
                aria-expanded="false"
              >
                <span class="text-sm leading-none flex items-center gap-0.5 select-none">🌐${currentLangObj.flag}</span>
                <span class="font-mono text-[11px] font-bold tracking-wider">${currentLangObj.short}</span>
                <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Language Dropdown Popover (16 Languages) -->
              <div 
                id="lang-dropdown-menu" 
                class="hidden absolute right-0 mt-2 w-52 max-h-80 overflow-y-auto custom-scrollbar rounded-xl bg-black/95 dark:bg-black/95 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.7)] p-1.5 space-y-1 z-50 text-xs"
              >
                ${SUPPORTED_LANGS.map(l => {
                  const isSelected = l.code === lang;
                  return `
                    <button 
                      type="button"
                      data-select-lang="${l.code}"
                      class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30' 
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }"
                    >
                      <div class="flex items-center gap-2">
                        <span class="text-sm select-none">🌐${l.flag}</span>
                        <span class="text-xs font-medium">${l.label}</span>
                      </div>
                      ${isSelected ? '<span class="text-amber-400 font-bold">✓</span>' : ''}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Theme Dropdown Selector Trigger -->
            <div class="relative">
              <button 
                id="btn-theme-toggle"
                type="button"
                class="theme-toggle-btn min-h-11 px-2.5 rounded-lg bg-white/[0.06] hover:bg-white/10 border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-200"
                title="${t('theme.label', lang)}"
                aria-label="${t('theme.label', lang)}"
                aria-expanded="false"
                data-theme="${theme}"
              >
                <span class="text-sm leading-none">${currentThemeObj.icon}</span>
                <span class="font-medium text-[11px] hidden sm:inline">${t(`theme.${theme}`, lang)}</span>
                <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Theme Dropdown Popover (4 Colors: Light, Dark, Midnight Blue, Dark Emerald) -->
              <div 
                id="theme-dropdown-menu" 
                class="hidden absolute right-0 mt-2 w-52 rounded-xl bg-black/95 dark:bg-black/95 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.7)] p-1.5 space-y-1 z-50 text-xs"
              >
                ${SUPPORTED_THEMES.map(th => {
                  const isSelected = th.code === theme;
                  return `
                    <button 
                      type="button"
                      data-set-theme="${th.code}"
                      class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30' 
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }"
                    >
                      <div class="flex items-center gap-2">
                        <span class="text-base">${th.icon}</span>
                        <span class="text-xs font-medium">${t(`theme.${th.code}`, lang)}</span>
                      </div>
                      ${isSelected ? '<span class="text-amber-400 font-bold">✓</span>' : ''}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Profile / Login Button -->
            ${isAuthenticated ? `
              <button 
                id="btn-open-auth-modal"
                class="min-h-11 flex items-center gap-2 pl-1 pr-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 border border-white/15 transition-colors cursor-pointer group"
                title="${t('auth.profile', lang)}: ${t('auth.level', lang)} ${userProfile?.level || 1}, ${userProfile?.total_xp || 0} XP"
                aria-label="${t('auth.profile', lang)}, ${t('auth.level', lang)} ${userProfile?.level || 1}, ${userProfile?.total_xp || 0} XP"
              >
                <div class="w-6 h-6 rounded-md bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xs font-bold text-amber-400">
                  ${(userProfile?.nama_lengkap || 'U').charAt(0).toUpperCase()}
                </div>
                <span class="hidden sm:flex flex-col items-start leading-tight">
                  <span class="text-xs font-medium text-white max-w-[100px] truncate">
                    ${userProfile?.nama_lengkap?.split(' ')[0] || t('auth.profile', lang)}
                  </span>
                  <span class="text-[10px] text-slate-400">
                    ${t('auth.level', lang)} ${userProfile?.level || 1} · ${userProfile?.total_xp || 0} XP
                  </span>
                </span>
              </button>
            ` : `
              <button 
                id="btn-open-auth-modal"
                class="min-h-11 px-3 rounded-lg bg-white text-black hover:bg-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>${t('auth.login', lang)}</span>
                <span class="w-1.5 h-1.5 rounded-sm bg-amber-400"></span>
              </button>
            `}

            <!-- Mobile Menu Toggle -->
            <button id="mobile-menu-btn" class="md:hidden min-h-11 min-w-11 flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05]" aria-label="${lang === 'en' ? 'Open navigation menu' : (lang === 'jp' ? 'ナビゲーションメニューを開く' : (lang === 'cn' ? '打开导航菜单' : 'Buka menu navigasi'))}" aria-expanded="false" aria-controls="mobile-menu">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

        </div>

        <!-- Mobile Drawer Menu -->
        <div id="mobile-menu" class="hidden md:hidden mt-2 p-2.5 rounded-xl bg-black/95 backdrop-blur-2xl border border-white/10 space-y-2">
          ${navItems.map(item => {
            const isActive = activeTab === item.id;
            return `
              <button 
                data-nav="${item.id}"
                aria-current="${isActive ? 'page' : 'false'}"
                class="min-h-11 w-full text-left px-3.5 py-2 rounded-lg text-xs transition-colors ${
                  isActive 
                    ? 'bg-white/15 text-white font-semibold' 
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }"
              >
                ${item.label}
              </button>
            `;
          }).join('')}

          <!-- Theme Selection in Mobile Menu -->
          <div class="pt-2 border-t border-white/[0.08] space-y-1.5 px-1">
            <span class="text-[11px] font-medium text-slate-400">${t('theme.label', lang)}</span>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              ${SUPPORTED_THEMES.map(th => {
                const isSelected = th.code === theme;
                return `
                  <button 
                    type="button"
                    data-set-theme="${th.code}"
                    class="px-2 py-1.5 rounded-lg text-[11px] font-medium border text-center transition-all flex items-center justify-center gap-1 ${
                      isSelected 
                        ? 'bg-amber-400/20 text-amber-300 font-bold border-amber-400/50' 
                        : 'bg-white/[0.05] text-slate-300 border-white/10 hover:bg-white/10'
                    }"
                  >
                    <span>${th.icon}</span>
                    <span class="truncate">${t(`theme.${th.code}`, lang)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Language Selection in Mobile Menu (16 World Languages) -->
          <div class="pt-2 border-t border-white/[0.08] space-y-1.5 px-1">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-medium text-slate-400">${t('lang.label', lang)}</span>
              <span class="text-[10px] font-mono text-amber-400">16 Languages</span>
            </div>
            <div class="grid grid-cols-4 gap-1.5 max-h-48 overflow-y-auto custom-scrollbar p-0.5">
              ${SUPPORTED_LANGS.map(l => `
                <button 
                  type="button"
                  data-select-lang="${l.code}"
                  class="px-2 py-1.5 rounded-lg text-[11px] font-medium border text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    l.code === lang 
                      ? 'bg-amber-400/20 text-amber-300 font-bold border-amber-400/50' 
                      : 'bg-white/[0.05] text-slate-300 border-white/10 hover:bg-white/10'
                  }"
                >
                  <span class="text-xs select-none">🌐${l.flag}</span>
                  <span class="font-mono text-[10px] font-bold">${l.short}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Mobile Auth Row -->
          <div class="pt-2 border-t border-white/[0.08] flex items-center justify-between px-2">
            <span class="text-xs text-slate-400">${isAuthenticated ? `${t('auth.level', lang)} ${userProfile?.level || 1} · ${userProfile?.total_xp || 0} XP` : t('auth.guestNote', lang)}</span>
            <button 
              id="mobile-auth-trigger"
              class="text-xs font-semibold text-amber-400 hover:underline py-1"
            >
              ${isAuthenticated ? t('auth.profile', lang) : t('auth.login', lang)}
            </button>
          </div>

        </div>
      </div>
    </header>
  `;
}
