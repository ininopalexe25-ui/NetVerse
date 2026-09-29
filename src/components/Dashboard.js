import { renderVirtualLab3D } from './VirtualLab3D.js';
import { t, getLocalizedModule } from '../utils/i18n.js';

export function renderDashboard(moduls = [], devices = [], activeDeviceIdx = 0, selectedHotspot = null, learningProgress = {}, lang = 'id') {
  const firstIncompleteIndex = moduls.findIndex(modul => learningProgress[modul.id]?.status !== 'selesai');
  const nextModuleIndex = firstIncompleteIndex >= 0 ? firstIncompleteIndex : 0;
  const rawNextModule = moduls[nextModuleIndex];
  const nextModule = rawNextModule ? getLocalizedModule(rawNextModule, lang) : null;
  const moduleProgress = nextModule ? learningProgress[nextModule.id] : null;
  const hasStarted = moduleProgress?.status === 'sedang_belajar';
  const allModulesComplete = moduls.length > 0 && firstIncompleteIndex === -1;
  const startLabel = allModulesComplete
    ? t('dashboard.btnRepeat', lang)
    : hasStarted
      ? t('dashboard.btnContinue', lang)
      : nextModule ? t('dashboard.btnStart', lang) : t('nav.materi', lang);

  const moduleCountText = nextModule 
    ? t('dashboard.moduleCount', lang, {
        current: nextModuleIndex + 1,
        total: moduls.length,
        title: nextModule.judul,
        time: nextModule.estimasi_menit || 10
      })
    : '';

  return `
    <div class="space-y-10 pt-24 pb-12 animate-fadeIn">
      <section class="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-white/10 pb-6">
        <div class="max-w-2xl space-y-2">
          <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            ${t('dashboard.heroTitle', lang)}
          </h1>
          <p class="text-sm text-slate-300 leading-relaxed">
            ${t('dashboard.heroDesc', lang)}
          </p>
          ${nextModule ? `
            <p class="text-xs text-slate-400">
              ${moduleCountText}
            </p>
          ` : ''}
        </div>

        <button
          data-nav="materi"
          ${nextModule ? `data-select-modul="${nextModuleIndex}"` : ''}
          class="min-h-11 px-4 rounded-lg bg-white text-black hover:bg-slate-200 font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          ${startLabel}<span aria-hidden="true">→</span>
        </button>
      </section>

      <section class="space-y-4">
        <div>
          <h2 class="text-xl font-semibold text-white">${t('dashboard.devicesTitle', lang)}</h2>
          <p class="text-sm text-slate-400 mt-1">${t('dashboard.devicesSubtitle', lang)}</p>
        </div>

        ${renderVirtualLab3D(devices, activeDeviceIdx, selectedHotspot, lang)}
      </section>
    </div>
  `;
}
