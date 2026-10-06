import { t, getLocalizedDevice, CATEGORY_LABELS, SPECIFICATION_LABELS } from '../utils/i18n.js';
import { HARDWARE_DETAILS } from '../data/hardwareDetails.js';

export function renderVirtualLab3D(devices = [], activeDeviceIndex = 0, selectedHotspot = null, lang = 'en') {
  if (devices.length === 0) {
    return `
      <div class="bezel-shell">
        <div class="bezel-core min-h-[400px] sm:min-h-[480px] flex flex-col items-center justify-center p-6 text-center" role="status" aria-live="polite">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mb-4" aria-hidden="true"></span>
          <h3 class="text-lg font-bold text-white">${t('dashboard.loadingDevices', lang)}</h3>
          <p class="mt-2 max-w-md text-sm text-slate-400">${t('dashboard.loadingDesc', lang)}</p>
        </div>
      </div>
    `;
  }

  // Localize devices list
  const localizedDevices = devices.map(d => getLocalizedDevice(d, lang));
  const current = localizedDevices[activeDeviceIndex] || localizedDevices[0];
  const deepDetail = HARDWARE_DETAILS[current.kode] || null;

  const specs = typeof current.spesifikasi === 'string' 
    ? JSON.parse(current.spesifikasi) 
    : (current.spesifikasi || {});

  const hotspots = Array.isArray(current.hotspots) 
    ? current.hotspots 
    : (typeof current.hotspots === 'string' ? JSON.parse(current.hotspots) : []);

  const activeHotspotInfo = selectedHotspot !== null ? hotspots[selectedHotspot] : hotspots[0];
  
  const categoryLabel = CATEGORY_LABELS[current.kategori]?.[lang] || 
    CATEGORY_LABELS[current.kategori]?.id || 
    current.kategori?.replaceAll('_', ' ') || '';

  return `
    <div class="space-y-6">
      
      <!-- Device selector -->
      <div class="flex items-center justify-center">
        <div class="flex w-full sm:w-auto flex-col sm:flex-row sm:items-center gap-2 max-w-full">
          <label for="device-selector" class="text-xs text-slate-400 shrink-0 font-medium">${t('dashboard.selectDevice', lang)}</label>
          <select
            id="device-selector"
            data-select-device
            class="min-h-11 w-full sm:w-auto sm:min-w-56 min-w-0 max-w-full px-3.5 pr-9 rounded-lg bg-[#0d121f] border border-white/[0.15] text-sm text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/70 focus:border-amber-400 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem_1rem] bg-[right_0.75rem_center] bg-no-repeat shadow-inner"
          >
          ${localizedDevices.map((d, idx) => {
            const isActive = idx === activeDeviceIndex;
            return `
              <option value="${idx}" data-select-device class="bg-[#0d121f] text-slate-100 py-1.5" style="background-color: #0d121f; color: #f1f5f9;" ${isActive ? 'selected' : ''}>${d.nama}</option>
            `;
          }).join('')}
          </select>
        </div>
      </div>

      <!-- Main Spatial Stage (Double-Bezel Architecture) -->
      <div class="bezel-shell">
        <div class="bezel-core p-5 sm:p-8 relative overflow-hidden">
          
          <!-- Background Radial Pedestal Aura -->
          <div class="absolute inset-0 pedestal-shadow pointer-events-none"></div>

          <!-- Device title and metadata banner -->
          <div class="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  ${categoryLabel}
                </span>
                ${deepDetail?.osiLayer ? `
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-white/[0.05] text-slate-300 border border-white/10">
                    ${deepDetail.osiLayer}
                  </span>
                ` : ''}
              </div>
              <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">${current.nama}</h2>
            </div>

            ${current.embed_url ? `
              <div class="flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-md bg-white/[0.05] border border-white/[0.08] backdrop-blur-md text-xs text-slate-300">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>${t('dashboard.modelSource', lang)}</span>
                ${current.source_url ? `
                  <a
                    href="${current.source_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-amber-300 hover:text-amber-200 underline underline-offset-2"
                    aria-label="${lang === 'en' ? `Open ${current.nama} by ${current.source_author || 'Sketchfab creator'} on Sketchfab` : (lang === 'jp' ? `Sketchfabで${current.source_author || '制作者'}の${current.nama}を開く` : (lang === 'cn' ? `在Sketchfab中打开由${current.source_author || '创作者'}制作的${current.nama}` : `Buka model ${current.nama} karya ${current.source_author || 'kreator Sketchfab'} di Sketchfab`))}"
                  >
                    ${current.source_author ? `${lang === 'en' ? 'By' : (lang === 'jp' ? '作者:' : (lang === 'cn' ? '作者:' : 'Oleh'))} ${current.source_author}` : t('dashboard.view3D', lang)} ↗
                  </a>
                ` : ''}
                ${current.downloadable === false ? `<span class="text-slate-500">${t('dashboard.noDownload', lang)}</span>` : ''}
              </div>
            ` : `
              <!-- Camera View Recovery -->
              <div class="flex items-center">
                <button id="cam-reset" class="min-h-11 px-3 rounded-lg border border-white/[0.1] text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer">
                  ${t('dashboard.resetView', lang)}
                </button>
              </div>
            `}
          </div>

          <!-- 3D Canvas Stage -->
          <div class="relative z-10 w-full h-[400px] sm:h-[480px] flex items-center justify-center">
            
            ${current.embed_url ? `
              <div class="w-full h-full rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-black/60 relative">
                <iframe 
                  title="${current.nama}" 
                  class="w-full h-full border-0"
                  frameborder="0" 
                  allowfullscreen 
                  mozallowfullscreen="true" 
                  webkitallowfullscreen="true" 
                  allow="autoplay; fullscreen; xr-spatial-tracking" 
                  xr-spatial-tracking 
                  execution-while-out-of-viewport 
                  execution-while-not-rendered 
                  web-share 
                  src="${current.embed_url}?autostart=1&internal=1&ui_theme=dark&dnt=1"
                ></iframe>
              </div>
            ` : `
            <model-viewer
              id="tkj-model-viewer"
              src="${current.model_path}"
              alt="${current.nama}"
              auto-rotate
              rotation-per-second="10deg"
              camera-controls
              touch-action="pan-y"
              shadow-intensity="1.8"
              shadow-softness="0.4"
              environment-image="neutral"
              tone-mapping="aces"
              exposure="1.0"
              camera-orbit="40deg 75deg 105%"
              min-camera-orbit="auto auto 40%"
              max-camera-orbit="auto auto 300%"
              interaction-prompt="none"
              class="w-full h-full"
            >
              ${hotspots.map((hs, i) => `
                <button
                  class="hotspot-chip"
                  slot="hotspot-${i}"
                  data-position="${hs.position || '0 0 0'}"
                  data-normal="0 1 0"
                  data-hotspot-idx="${i}"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>${hs.name.split(' ')[0]}</span>
                </button>
              `).join('')}

              <!-- Fallback Visual while GLB loads -->
              <div slot="poster" class="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <div class="w-16 h-16 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-2xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-xl">
                  3D
                </div>
                <h3 class="text-lg font-bold text-white mb-2">${current.nama}</h3>
                <p class="text-slate-400 text-xs max-w-md leading-relaxed mb-6">
                  ${current.deskripsi}
                </p>

                <div class="flex items-center gap-2 p-1.5 px-3 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>${t('dashboard.rotateHint', lang)}</span>
                </div>
              </div>
            </model-viewer>
            `}

          </div>

          <!-- Active Port Hotspot Callout & Basic Specs Banner -->
          <div class="relative z-10 mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <!-- Active Port Hotspot Callout (5 cols) -->
            <div class="md:col-span-5 p-3.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <div class="text-[11px] text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>${activeHotspotInfo ? activeHotspotInfo.name : t('dashboard.defaultHotspotTitle', lang)}</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${activeHotspotInfo ? activeHotspotInfo.deskripsi : t('dashboard.defaultHotspotDesc', lang)}
              </p>
            </div>

            <!-- Quick Specs Badges (7 cols) -->
            <div class="md:col-span-7 flex flex-wrap gap-2">
              ${Object.entries(specs).map(([k, v]) => {
                const label = SPECIFICATION_LABELS[k.toLowerCase()]?.[lang] || 
                  SPECIFICATION_LABELS[k.toLowerCase()]?.id || 
                  k.replaceAll('_', ' ');
                return `
                  <div class="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-xs">
                    <span class="text-slate-500 block text-[10px] font-medium">${label}</span>
                    <span class="text-white font-semibold">${v}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Deep Hardware Technical Documentation (Detailed Overview, Specs, SOP, Troubleshooting) -->
          ${deepDetail ? `
            <div class="relative z-10 mt-6 pt-6 border-t border-white/[0.08] space-y-6">
              
              <!-- Section Header -->
              <div class="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>
                  <h3 class="text-xs font-bold text-white uppercase tracking-wider">
                    ${t('virtualLab.specsTitle', lang)}
                  </h3>
                </div>
                <span class="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  TKJ Engineering Verified
                </span>
              </div>

              <!-- Architecture Paragraph -->
              <div class="p-4 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10 space-y-2">
                <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>⚙️</span>
                  <span>${t('virtualLab.architectureTitle', lang)}</span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  ${deepDetail.arsitektur[lang] || deepDetail.arsitektur.en || deepDetail.arsitektur.id}
                </p>
              </div>

              <!-- Two Column Grid: Deep Specs Matrix & Core Features -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                <!-- Left: Full Specs Table (6 cols) -->
                <div class="md:col-span-6 space-y-2.5">
                  <h4 class="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <span class="text-amber-400">📊</span>
                    <span>${t('virtualLab.metricsTitle', lang)}</span>
                  </h4>
                  <div class="rounded-xl border border-white/[0.08] bg-black/40 overflow-hidden divide-y divide-white/[0.04]">
                    ${deepDetail.spesifikasiDetail.map(s => `
                      <div class="p-2.5 px-3 flex items-start justify-between gap-3 text-xs">
                        <span class="text-slate-400 font-medium shrink-0">${s.label[lang] || s.label.en || s.label.id}</span>
                        <span class="text-white font-mono font-semibold text-right">${s.value}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Right: Core Capabilities & Practical Features (6 cols) -->
                <div class="md:col-span-6 space-y-2.5">
                  <h4 class="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <span class="text-emerald-400">⚡</span>
                    <span>${t('virtualLab.capabilitiesTitle', lang)}</span>
                  </h4>
                  <div class="space-y-2">
                    ${(deepDetail.fiturUtama[lang] || deepDetail.fiturUtama.en || deepDetail.fiturUtama.id).map(feat => `
                      <div class="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 flex items-start gap-2">
                        <span class="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                        <span class="leading-relaxed">${feat}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

              </div>

              <!-- Two Column Grid: SOP & Field Troubleshooting -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
                
                <!-- Left: Lab SOP Guide (6 cols) -->
                <div class="md:col-span-6 p-4 rounded-xl bg-blue-500/[0.03] border border-blue-500/20 space-y-2">
                  <div class="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <span>📋</span>
                    <span>${t('virtualLab.sopTitle', lang)}</span>
                  </div>
                  <p class="text-xs text-slate-300 leading-relaxed">
                    ${deepDetail.panduanPraktis[lang] || deepDetail.panduanPraktis.en || deepDetail.panduanPraktis.id}
                  </p>
                </div>

                <!-- Right: Field Troubleshooting (6 cols) -->
                <div class="md:col-span-6 p-4 rounded-xl bg-amber-500/[0.03] border border-amber-500/20 space-y-2">
                  <div class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <span>🛠️</span>
                    <span>${t('virtualLab.troubleshootingTitle', lang)}</span>
                  </div>
                  <p class="text-xs text-slate-300 leading-relaxed">
                    ${deepDetail.troubleshooting[lang] || deepDetail.troubleshooting.en || deepDetail.troubleshooting.id}
                  </p>
                </div>

              </div>

            </div>
          ` : ''}

        </div>
      </div>

    </div>
  `;
}
