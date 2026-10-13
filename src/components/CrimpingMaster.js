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
  const isAuthenticated = !!(state.session && state.userProfile && state.userProfile.id);

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

      ${!isAuthenticated ? `
        <!-- Guest Practice Lock Banner -->
        <div class="rounded-xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 text-lg shrink-0 mt-0.5">
              🔒
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-bold text-white tracking-tight">${t('crimping.guestLockTitle', lang)}</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">${t('crimping.guestBadge', lang)}</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed max-w-2xl">
                ${t('crimping.guestLockDesc', lang)}
              </p>
            </div>
          </div>
          <button
            type="button"
            id="btn-guest-unlock-crimping"
            class="rounded-lg px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>${t('crimping.guestLockBtn', lang)}</span>
            <span>&rarr;</span>
          </button>
        </div>
      ` : ''}

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
                  class="group rounded-lg pl-5 pr-2 py-2 ${
                    isAuthenticated 
                      ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20 text-black' 
                      : 'bg-amber-400 hover:bg-amber-300 shadow-amber-400/20 text-black'
                  } font-semibold text-xs sm:text-sm flex items-center gap-3 transition-all active:scale-[0.98] shadow-lg cursor-pointer"
                  title="${isAuthenticated ? t('crimping.btnVerify', lang) : t('crimping.guestLockTitle', lang)}"
                >
                  <span>${isAuthenticated ? t('crimping.btnVerify', lang) : `🔒 ${t('crimping.guestLockBtn', lang)}`}</span>
                  <span class="w-7 h-7 rounded-md bg-black ${isAuthenticated ? 'text-white' : 'text-amber-400'} flex items-center justify-center transition-transform group-hover:translate-x-0.5 text-xs font-bold">
                    ${isAuthenticated ? '✓' : '→'}
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

                <!-- Wire Sequence Correction & Pedagogical Guide (When Errors Exist) -->
                ${!result.success ? `
                  <div class="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent border border-rose-500/30 space-y-4 animate-fadeIn shadow-lg">
                    
                    <!-- Guide Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-500/20 pb-3">
                      <div class="flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-sm bg-rose-400 animate-pulse"></span>
                        <h4 class="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                          <span>${lang === 'en' ? 'Diagnostic Analysis & Correct Wire Sequence' : (lang === 'jp' ? '結線診断分析 & 正しい芯線配列ガイド' : (lang === 'cn' ? '引脚线序诊断分析与官方标准接线指导' : `Analisis Diagnostik & Pembenaran Urutan Kabel (${currentStandard})`))}</span>
                        </h4>
                      </div>
                      <span class="text-[10px] font-semibold text-rose-300 px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30">
                        ${lang === 'en' ? `${result.wrongPins ? result.wrongPins.length : 0} Pins Need Correction` : (lang === 'jp' ? `${result.wrongPins ? result.wrongPins.length : 0} 本のピン配列に誤りがあります` : (lang === 'cn' ? `${result.wrongPins ? result.wrongPins.length : 0} 个引脚接线错误` : `${result.wrongPins ? result.wrongPins.length : 0} Pin Keliru / Tertukar`))}
                      </span>
                    </div>

                    <!-- Comparison Table of Pins -->
                    <div class="space-y-2">
                      <div class="text-[11px] font-semibold text-slate-300">
                        ${lang === 'en' ? 'Side-by-Side Pinout Comparison (Your Placement vs Standard):' : (lang === 'jp' ? '配列比較（あなたの配線 vs 正しい標準配線）:' : (lang === 'cn' ? '引脚线序逐位对照（实际摆放 vs 标准线序）：' : 'Perbandingan Urutan Kawat (Susunan Anda vs Standar Resmi):'))}
                      </div>

                      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        ${targetSequence.map((targetWireId, idx) => {
                          const targetWire = getLocalizedWire(targetWireId, lang);
                          const userWireId = userSlots[idx];
                          const userWire = userWireId ? getLocalizedWire(userWireId, lang) : null;
                          const isMatch = userWireId === targetWireId;

                          return `
                            <div class="p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                              isMatch 
                                ? 'bg-emerald-500/[0.06] border-emerald-500/30' 
                                : 'bg-rose-500/[0.08] border-rose-500/40'
                            }">
                              <div class="flex items-center justify-between mb-1.5">
                                <span class="font-mono font-bold text-[10px] ${isMatch ? 'text-emerald-400' : 'text-rose-400'}">${t('crimping.pin', lang)} ${idx + 1}</span>
                                <span class="text-[9px] font-semibold px-1.5 py-0.2 rounded ${isMatch ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}">
                                  ${isMatch ? '✓ Benar' : '✗ Keliru'}
                                </span>
                              </div>

                              <div class="space-y-1">
                                <div class="flex items-center gap-1.5">
                                  <div class="w-2.5 h-3.5 rounded-xs shrink-0 ${targetWire.stripeClass}"></div>
                                  <span class="text-[10px] text-white font-semibold truncate">${targetWire.name}</span>
                                </div>
                                
                                ${!isMatch ? `
                                  <div class="text-[9px] text-slate-400 border-t border-white/[0.06] pt-1">
                                    <span>Dipasang: </span>
                                    <span class="text-rose-300 font-medium">${userWire ? userWire.name : 'Kosong'}</span>
                                  </div>
                                ` : ''}
                              </div>
                            </div>
                          `;
                        }).join('')}
                      </div>
                    </div>

                    <!-- Electrical & Signal Transmission Explanation -->
                    <div class="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-2 text-xs">
                      <div class="font-bold text-amber-300 flex items-center gap-1.5 text-[11px]">
                        <span>⚡</span>
                        <span>${lang === 'en' ? 'Why This Sequence is Critical (Physics of Differential Signaling):' : (lang === 'jp' ? 'なぜこの配列順序が重要なのか（差動信号伝送の物理原理）:' : (lang === 'cn' ? '为什么线序必须严格遵守标准（差分高频信号物理机理）：' : `Mengapa Urutan Standar ${currentStandard} Wajib Diikuti:`))}</span>
                      </div>
                      <p class="text-slate-300 leading-relaxed text-[11px]">
                        ${currentStandard === 'T568B' ? `
                          Pada <strong>Standar T568B</strong>, Pin 1 (Putih-Oranye) dan Pin 2 (Oranye) bertindak sebagai pasangan <strong>Transmit (Tx+ dan Tx-)</strong>, sedangkan Pin 3 (Putih-Hijau) dan Pin 6 (Hijau) bertindak sebagai pasangan <strong>Receive (Rx+ dan Rx-)</strong>. 
                          Pasangan kawat pin 3 dan 6 sengaja <em>membelah</em> pasangan kawat biru (pin 4 & 5) untuk mempertahankan simetri elektromagnetik dan membatalkan <strong>Near-End Crosstalk (NEXT)</strong>.
                        ` : `
                          Pada <strong>Standar T568A</strong>, posisi pasangan Hijau dan Oranye saling ditukar. Pin 1 (Putih-Hijau) dan Pin 2 (Hijau) bertindak sebagai Transmit (Tx), sedangkan Pin 3 (Putih-Oranye) dan Pin 6 (Oranye) bertindak sebagai Receive (Rx). 
                          Posisi pasangan kawat Biru (pin 4 & 5) dan Cokelat (pin 7 & 8) tetap sama persis dengan standar T568B.
                        `}
                      </p>
                    </div>

                    <!-- Mnemonic & Quick Tip -->
                    <div class="p-3 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                      <span class="text-amber-400 font-bold shrink-0 text-sm">💡</span>
                      <div class="space-y-0.5 text-[11px]">
                        <span class="font-bold text-emerald-300">Tips Menghafal Cepat (Jembatan Keledai):</span>
                        <p class="text-slate-300 leading-relaxed">
                          ${currentStandard === 'T568B' ? `
                            Pasangan <strong>Cokelat (7 & 8)</strong> selalu di ujung kanan. Pasangan <strong>Biru (4 & 5)</strong> selalu di tengah dengan kawat solid mendahului kawat belang (Biru dulu, baru Putih-Biru). Pasangan <strong>Hijau terbelah</strong> mengapit pasangan Biru (Pin 3 Putih-Hijau, Pin 6 Hijau).
                          ` : `
                            Cukup hafalkan susunan T568B, lalu <strong>tukar setiap warna Oranye dengan warna Hijau</strong>! Kawat Biru (4 & 5) dan Cokelat (7 & 8) posisinya tidak pernah berubah.
                          `}
                        </p>
                      </div>
                    </div>

                    <!-- Interactive Quick Action Buttons -->
                    <div class="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        id="btn-apply-correct-crimping"
                        class="min-h-11 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>✨</span>
                        <span>${lang === 'en' ? 'Apply Correct Sequence (Study Mode)' : (lang === 'jp' ? '正しい配列を適用（学習モード）' : (lang === 'cn' ? '一键填充正确线序（学习模式）' : 'Terapkan Urutan yang Benar (Mode Belajar)'))}</span>
                      </button>

                      <button
                        type="button"
                        id="btn-retry-crimping"
                        class="min-h-11 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>🔄</span>
                        <span>${lang === 'en' ? 'Clear & Practice Again' : (lang === 'jp' ? 'リセットして再挑戦' : (lang === 'cn' ? '清空引脚重新实操' : 'Atur Ulang & Coba Rakit Sendiri'))}</span>
                      </button>
                    </div>

                  </div>
                ` : ''}
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
