import { t, getLocalizedDevice, CATEGORY_LABELS, SPECIFICATION_LABELS } from '../utils/i18n.js';

export function renderVirtualLab3D(devices = [], activeDeviceIndex = 0, selectedHotspot = null, lang = 'id') {
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
    <div class="space-y-5">
      
      <!-- Device selector -->
      <div class="flex items-center justify-center">
        <div class="flex w-full sm:w-auto flex-col sm:flex-row sm:items-center gap-2 max-w-full">
          <label for="device-selector" class="text-xs text-slate-400 shrink-0">${t('dashboard.selectDevice', lang)}</label>
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

            <!-- Device title and one recovery control -->
          <div class="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <div class="text-xs text-amber-400 font-medium">${categoryLabel}</div>
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

          <!-- Bottom Telemetry Tray (Specifications & Port Details) -->
          <div class="relative z-10 mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <!-- Technical Specs (7 cols) -->
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

            <!-- Active Port Hotspot Callout (5 cols) -->
            <div class="md:col-span-5 p-4 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <div class="text-[11px] text-amber-400 font-semibold mb-1">
                ${activeHotspotInfo ? activeHotspotInfo.name : t('dashboard.defaultHotspotTitle', lang)}
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${activeHotspotInfo ? activeHotspotInfo.deskripsi : t('dashboard.defaultHotspotDesc', lang)}
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  `;
}
