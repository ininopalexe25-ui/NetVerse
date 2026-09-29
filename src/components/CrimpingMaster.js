import { t, WIRE_DEFINITIONS_MULTILINGUAL, getLocalizedWire } from '../utils/i18n.js';

export const WIRE_DEFINITIONS = WIRE_DEFINITIONS_MULTILINGUAL.map(w => ({
  ...w,
  name: w.name.id
}));

const PALETTE_ORDER = ['B', 'WBr', 'O', 'WG', 'Br', 'WO', 'G', 'WB'];

export const STANDARDS = {
  T568B: ['WO', 'O', 'WG', 'B', 'WB', 'G', 'WBr', 'Br'],
  T568A: ['WG', 'G', 'WO', 'B', 'WB', 'O', 'WBr', 'Br']
};

export function renderCrimpingMaster(state, lang = state.lang || 'id') {
  const currentStandard = state.crimpingStandard || 'T568B';
  const targetSequence = STANDARDS[currentStandard];
  const userSlots = state.crimpingSlots || [null, null, null, null, null, null, null, null];
  const elapsed = state.crimpingElapsedSeconds || 0;
  const result = state.crimpingResult;

  const placedWireIds = userSlots.filter(Boolean);
  const availableWires = PALETTE_ORDER
    .filter(wireId => !placedWireIds.includes(wireId))
    .map(wireId => getLocalizedWire(wireId, lang))
    .filter(Boolean);

  // Dynamic localized feedback message
  let resultMsg = '';
  if (result) {
    if (result.success) {
      resultMsg = t('crimping.resultSuccessMsg', lang, { xp: result.earnedXp || 150 });
    } else {
      const correctPins = 8 - (result.wrongPins ? result.wrongPins.length : 0);
      resultMsg = t('crimping.resultPartialMsg', lang, {
        correct: correctPins,
        accuracy: (result.accuracy || 0).toFixed(1)
      });
    }
  }

  return `
    <div class="space-y-6 pt-24 sm:pt-20 pb-12 animate-fadeIn">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div class="min-w-0">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${t('crimping.heroTitle', lang)}</h1>
          <p class="text-slate-400 text-sm mt-1">${t('crimping.heroSubtitle', lang)}</p>
        </div>

        <div class="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <div class="p-1 rounded-lg bg-white/[0.04] border border-white/[0.08] grid grid-cols-2 gap-1">
            <button 
              id="set-t568b" 
              type="button"
              aria-pressed="${currentStandard === 'T568B'}"
              class="min-h-11 px-3 rounded-md text-xs font-semibold transition-all ${currentStandard === 'T568B' ? 'bg-white text-black shadow-md' : 'text-slate-400 hover:text-white'}"
            >
              T568B
            </button>
            <button 
              id="set-t568a" 
              type="button"
              aria-pressed="${currentStandard === 'T568A'}"
              class="min-h-11 px-3 rounded-md text-xs font-semibold transition-all ${currentStandard === 'T568A' ? 'bg-white text-black shadow-md' : 'text-slate-400 hover:text-white'}"
            >
              T568A
            </button>
          </div>

          <button 
            type="button"
            data-open-crimping-video
            class="min-h-11 px-3 py-2 rounded-lg bg-red-600/15 hover:bg-red-600/25 border border-red-500/30 text-xs font-semibold text-red-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            title="${t('crimping.videoTutorialTitle', lang)}"
          >
            <span class="text-red-400 font-bold">▶</span>
            <span class="hidden sm:inline">${t('crimping.videoTutorialBtn', lang)}</span>
          </button>

          <div class="min-h-11 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono flex items-center">
            <span class="text-slate-400">${t('crimping.stopwatch', lang)}</span>
            <span id="crimping-timer-display" class="text-emerald-400 font-bold ml-1">${elapsed.toFixed(1)} ${t('crimping.secondUnit', lang)}</span>
          </div>
        </div>
      </div>

      <!-- Main Workshop Canvas -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        
        <!-- Left: Connector Housing & Slots (8 cols) -->
        <div class="min-w-0 lg:col-span-8 bezel-shell">
          <div class="bezel-core p-3 sm:p-6 space-y-5">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
              <div class="min-w-0">
                <h3 class="text-sm font-bold text-white tracking-tight">${t('crimping.title', lang)}</h3>
                <p class="text-xs text-slate-400 mt-1">${t('crimping.subtitle', lang)}</p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  data-open-ai-tutor
                  aria-expanded="${state.aiChatOpen ? 'true' : 'false'}"
                  aria-controls="ai-chat-drawer"
                  class="min-h-11 md:hidden px-3 rounded-lg border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/[0.06]"
                >
                  ${t('crimping.askTutor', lang)}
                </button>
                <button id="btn-reset-crimping" type="button" class="min-h-11 px-3 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer">
                  ${t('crimping.clearPins', lang)}
                </button>
              </div>
            </div>

            <!-- 8 Pin Slots in Modular Plug Housing -->
            <div class="p-3 sm:p-5 rounded-xl bg-black/60 border border-white/[0.08] shadow-inner">
              <div class="crimping-pin-scroll" role="region" tabindex="0" aria-label="${t('crimping.scrollHint', lang)}">
                <div class="crimping-pin-content">
                  <div class="crimping-target-grid crimping-pin-labels">
                    ${userSlots.map((_, idx) => `
                      <div class="crimping-target-cell crimping-pin-label-cell">
                        <span class="crimping-target-pin">${t('crimping.pin', lang)} ${idx + 1}</span>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Interactive Wire Slot Column -->
                  <div class="crimping-pin-grid">
                    ${userSlots.map((wireId, idx) => {
                      const wire = wireId ? getLocalizedWire(wireId, lang) : null;
                      const isWrong = result && result.wrongPins && result.wrongPins.includes(idx);
                      const isSuccess = result && result.success;

                      return `
                        <div 
                          role="group"
                          aria-label="${t('crimping.pin', lang)} ${idx + 1}${wire ? `, ${wire.name}` : `, ${t('crimping.noWire', lang)}`}"
                          class="wire-dropzone crimping-wire-dropzone rounded-lg border-2 border-dashed flex flex-col items-center justify-end p-1 transition-all relative ${
                            wire 
                              ? (isWrong ? 'border-rose-500 bg-rose-500/10' : isSuccess ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-400/60 bg-white/[0.05]')
                              : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                          }"
                          data-slot-idx="${idx}"
                          data-drop-slot="${idx}"
                        >
                          ${wire ? `
                            <div 
                              draggable="true" 
                              data-slot-drag="${idx}" 
                              class="w-full flex-1 min-h-12 rounded-t-sm shadow-md mb-1 relative overflow-hidden cursor-grab active:cursor-grabbing ${wire.stripeClass}"
                              title="${wire.name}"
                              aria-label="${wire.name}, ${t('crimping.pin', lang)} ${idx + 1}"
                            >
                              <div class="absolute inset-0 border border-black/20"></div>
                            </div>
                            <span class="crimping-wire-name">
                              ${wire.name}
                            </span>
                            <button data-remove-pin="${idx}" type="button" class="crimping-remove-wire text-slate-400 hover:text-rose-400" aria-label="${t('crimping.removePin', lang)}" title="${t('crimping.removePin', lang)}">×</button>
                          ` : `
                            <span class="crimping-wire-empty">${t('crimping.noWire', lang)}</span>
                          `}
                        </div>
                      `;
                    }).join('')}
                  </div>

                  <div class="crimping-pin-footprint text-[10px] font-mono text-slate-500">
                    <span>${t('crimping.pin', lang)} 1</span>
                    <span>${t('crimping.contacts8', lang)}</span>
                    <span>${t('crimping.pin', lang)} 8</span>
                  </div>
                </div>
              </div>
              <p class="crimping-scroll-hint" aria-hidden="true">${t('crimping.scrollHint', lang)}</p>
            </div>

            <!-- Verification Action Bar -->
            <div class="space-y-4 pt-1">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                  ${result ? `
                    <div class="text-xs font-semibold ${result.success ? 'text-emerald-400' : 'text-rose-400'}">
                      ${resultMsg}
                    </div>
                  ` : `
                    <div class="text-xs text-slate-400">
                      ${t('crimping.clickHint', lang)}
                    </div>
                  `}
                </div>

                <!-- Button-in-Button Verification CTA -->
                <button 
                  id="btn-verify-crimping" 
                  class="group rounded-lg pl-5 pr-2 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs sm:text-sm flex items-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <span>${t('crimping.btnVerify', lang)}</span>
                  <span class="w-7 h-7 rounded-md bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 text-xs font-bold">
                    ✓
                  </span>
                </button>
              </div>

              <!-- Authentic LAN Cable Tester Signal Continuity Display -->
              ${result ? `
                <div class="p-4 rounded-lg bg-black/40 border border-white/[0.08] space-y-2.5">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-slate-400 font-semibold flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full ${result.success ? 'bg-emerald-400' : 'bg-amber-400'}"></span>
                      ${t('crimping.testerTitle', lang)}
                    </span>
                    <span class="font-mono text-slate-300 font-bold">${t('crimping.accuracy', lang)}: ${result.accuracy.toFixed(1)}%</span>
                  </div>

                  <div class="crimping-tester-scroll">
                    <div class="crimping-tester-grid grid grid-cols-8 gap-2">
                      ${targetSequence.map((targetWire, idx) => {
                        const userWire = userSlots[idx];
                        const isMatch = userWire === targetWire;
                        return `
                          <div class="text-center p-2 rounded-md ${isMatch ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-rose-500/10 border border-rose-500/30'}">
                            <div class="text-[10px] font-mono text-slate-400">${t('crimping.pin', lang)} ${idx + 1}</div>
                            <div class="w-2.5 h-2.5 rounded-full mx-auto my-1.5 ${isMatch ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-rose-500 shadow-sm shadow-rose-500/50'}"></div>
                            <div class="text-[9px] font-bold ${isMatch ? 'text-emerald-400' : 'text-rose-400'}">${isMatch ? t('crimping.resultMatch', lang) : t('crimping.resultWrong', lang)}</div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>

          </div>
        </div>

        <!-- Right: Available Wires Palette (4 cols) -->
        <div class="min-w-0 lg:col-span-4 space-y-5">
          
          <div class="bezel-shell">
            <div class="bezel-core p-4 space-y-3.5">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold text-white uppercase tracking-wider">${t('crimping.paletteTitle', lang)}</h3>
                <span class="text-xs text-slate-500">${t('crimping.wiresRemaining', lang, { count: availableWires.length })}</span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                ${availableWires.map(w => `
                  <button
                    draggable="true"
                    data-pick-wire="${w.id}"
                    data-drag-wire="${w.id}"
                    type="button"
                    aria-label="${w.name}"
                    class="min-h-12 p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/20 transition-all text-left flex items-center gap-2.5 group cursor-grab active:cursor-grabbing select-none"
                    title="${w.name}"
                  >
                    <div class="w-3 h-5 rounded-sm shadow-md ${w.stripeClass} shrink-0 group-hover:scale-105 transition-transform pointer-events-none"></div>
                    <span class="text-xs leading-tight font-semibold text-slate-200 pointer-events-none">${w.name}</span>
                  </button>
                `).join('')}
              </div>

              ${availableWires.length === 0 ? `
                <div class="p-3 text-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  ${t('crimping.allPlaced', lang)}
                </div>
              ` : ''}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}
