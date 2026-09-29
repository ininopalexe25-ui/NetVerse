import { t } from '../utils/i18n.js';

/**
 * NetVerse - FloatingAiTutor Component
 * Asisten Dosen Sokratik Berbasis Supabase Edge Function & Gemini Engine
 * Strictly adheres to Anti-Rounded Rules (max 12px container, 8px inputs/buttons, 6px tags/badges).
 */

const CHIPS_BY_LANG = {
  id: {
    crimping: [
      { label: 'Cara kerja LAN tester', q: 'Bagaimana cara membaca hasil LAN tester?' },
      { label: 'Kabel tidak terbaca', q: 'Apa yang perlu diperiksa jika LAN tester tidak mendeteksi sambungan?' },
      { label: 'Fungsi pilinan kawat', q: 'Kenapa kawat di dalam kabel UTP dipilin berpasangan?' }
    ],
    materi: [
      { label: 'Apa itu CAM overflow?', q: 'Apa yang terjadi jika tabel CAM pada switch penuh?' },
      { label: 'Kenapa kabel dipilin?', q: 'Kenapa kawat di dalam kabel UTP dipilin berpasangan?' },
      { label: 'Kapan perlu kabel console?', q: 'Kapan teknisi perlu memakai kabel console, bukan kabel LAN?' }
    ],
    default: [
      { label: 'Port SFP', q: 'Apa kelebihan port SFP dibanding port RJ-45?' },
      { label: 'VLAN 802.1Q', q: 'Untuk apa VLAN digunakan pada switch?' },
      { label: 'Port WAN', q: 'Apa fungsi port WAN pada router?' }
    ]
  },
  en: {
    crimping: [
      { label: 'How LAN tester works', q: 'How do you read results on a network cable tester?' },
      { label: 'Cable not detected', q: 'What should I troubleshoot if the LAN tester shows no connection?' },
      { label: 'Why wires are twisted', q: 'Why are wire pairs inside UTP cables twisted together?' }
    ],
    materi: [
      { label: 'What is CAM overflow?', q: 'What happens when a switch CAM table overflows?' },
      { label: 'Why are wires twisted?', q: 'Why are wire pairs inside UTP cables twisted together?' },
      { label: 'When to use console cable?', q: 'When should a technician use a console rollover cable instead of Ethernet?' }
    ],
    default: [
      { label: 'SFP Ports', q: 'What is the advantage of SFP optical ports over standard RJ-45?' },
      { label: 'VLAN 802.1Q', q: 'Why do network switches use VLAN tagging?' },
      { label: 'WAN Port', q: 'What is the role of a WAN port on an enterprise router?' }
    ]
  },
  jp: {
    crimping: [
      { label: 'LANテスターの仕組み', q: 'LANテスターのランプ表示はどう読み取りますか？' },
      { label: 'ケーブル未検出', q: 'LANテスターで導通が確認できない場合のトラブルシューティングは？' },
      { label: 'ツイストペアの役割', q: 'UTPケーブルの芯線がツイストされている理由は何ですか？' }
    ],
    materi: [
      { label: 'CAM溢れとは', q: 'スイッチのCAMテーブルが一杯になると何が起きますか？' },
      { label: 'より線の理由', q: 'LANケーブルがツイストペア構造になっている理由を教えてください。' },
      { label: 'コンソールケーブル用途', q: 'LANケーブルではなくコンソールケーブルが必要な場面は？' }
    ],
    default: [
      { label: 'SFPポート', q: 'RJ-45ポートとSFPポートの違いとメリットは何ですか？' },
      { label: 'VLAN 802.1Q', q: 'スイッチでVLANを設定する目的は何ですか？' },
      { label: 'WANポート', q: 'ルーターのWANポートの役割は何ですか？' }
    ]
  },
  cn: {
    crimping: [
      { label: '测线仪工作原理', q: '如何根据测线仪指示灯判断线序连通性？' },
      { label: '网线未连通排查', q: '若测线仪指示灯不亮，应排查哪些接触不良问题？' },
      { label: '双绞线对绞作用', q: '为什么双绞线内部的芯线要成对扭绞？' }
    ],
    materi: [
      { label: 'CAM溢出机制', q: '交换机CAM转发表溢出时会引发什么现象？' },
      { label: '双绞线抗干扰', q: '双绞线是如何通过平衡差分抵消电磁干扰的？' },
      { label: 'Console线使用场景', q: '网络管理员在何种情况下必须使用Console线进行配置？' }
    ],
    default: [
      { label: 'SFP光口优势', q: 'SFP光模块接口与RJ-45电口相比有哪些优势？' },
      { label: 'VLAN 802.1Q', q: '交换机配置VLAN的主要作用是什么？' },
      { label: 'WAN口功能', q: '路由器WAN接口的主要作用与LAN有何区别？' }
    ]
  }
};

export function renderFloatingAiTutor(isOpen, messages = [], activeContext = 'Lab 3D', isLoading = false, dynamicChips = null, lang = 'id') {
  const isCrimpingContext = activeContext.toLowerCase().includes('crimping');
  const langKey = CHIPS_BY_LANG[lang] ? lang : 'id';
  const langChips = CHIPS_BY_LANG[langKey];

  // Context-aware inquiry chips
  let contextChips = langChips.default;

  if (dynamicChips && Array.isArray(dynamicChips) && dynamicChips.length > 0) {
    contextChips = dynamicChips.map(q => ({
      label: q.length > 25 ? q.substring(0, 22) + '...' : q,
      q: q
    }));
  } else if (isCrimpingContext) {
    contextChips = langChips.crimping;
  } else if (activeContext.includes('Materi') || activeContext.includes('Theory') || activeContext.includes('Syllabus') || activeContext.includes('理论') || activeContext.includes('理論') || activeContext.includes('単元')) {
    contextChips = langChips.materi;
  } else {
    contextChips = langChips.default;
  }

  return `
      <div id="ai-tutor-container" class="ai-tutor-shell ${isCrimpingContext ? 'ai-tutor-shell--crimping' : ''} fixed bottom-6 right-6 z-50">
      
      <!-- Glass Chat Modal Panel (Crisp Technical Radius) -->
      <div 
        id="ai-chat-drawer" 
        class="${isOpen ? 'flex' : 'hidden'} flex-col w-[360px] max-w-[calc(100vw-1.5rem)] sm:w-[430px] h-[min(540px,calc(100dvh-5rem))] rounded-xl bg-black/90 backdrop-blur-3xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden mb-3 transition-all"
        role="dialog"
        aria-label="${t('ai.title', lang)}"
      >
        <!-- Header -->
        <div class="p-3.5 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between">
          <div class="flex items-center space-x-2.5">
            <div class="w-7 h-7 rounded-lg bg-white text-black font-bold text-xs flex items-center justify-center tracking-tight shadow-md">
              AI
            </div>
            <div>
              <div class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>${t('ai.title', lang)}</span>
                <span class="w-1.5 h-1.5 rounded-sm bg-emerald-400"></span>
              </div>
              <div class="text-[10px] text-slate-400">${t('ai.subtitle', lang)}</div>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button 
              id="btn-reset-ai-chat" 
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="${t('ai.newChat', lang)}"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
            <button 
              id="btn-close-ai" 
              class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="${t('ai.close', lang)}"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Active Context Tag -->
        <div class="px-3.5 py-1.5 bg-black/50 border-b border-white/[0.06] text-[11px] text-slate-400 flex items-center justify-between">
          <span class="truncate max-w-[240px] font-mono text-[10px] text-amber-400/90">${t('ai.topicTag', lang, { topic: activeContext })}</span>
          <span class="text-slate-400 text-[10px] font-mono">${t('ai.badgeText', lang)}</span>
        </div>

        <!-- Message History Stream -->
        <div id="ai-message-list" class="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs leading-relaxed">
          ${messages.map(msg => `
            <div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
              <div class="max-w-[88%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-white text-black font-medium shadow-md'
                  : 'bg-white/[0.05] text-slate-200 border border-white/[0.08]'
              }">
                ${msg.concept ? `
                  <div class="mb-1 text-[10px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <span class="w-1 h-1 rounded-sm bg-amber-400"></span>
                    <span>${msg.concept}</span>
                  </div>
                ` : ''}
                <div class="leading-relaxed">${msg.text}</div>
              </div>
            </div>
          `).join('')}

          ${isLoading ? `
            <div class="flex justify-start">
              <div class="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs flex items-center gap-2">
                <span class="w-2 h-2 rounded-sm bg-amber-400 animate-pulse"></span>
                <span>${t('ai.loading', lang)}</span>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Dynamic Context-Aware Suggestion Chips -->
        <div class="px-3 py-2 bg-white/[0.02] border-t border-white/[0.06] flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span class="text-slate-500 shrink-0 text-[10px] font-mono">${t('ai.tryAsking', lang)}</span>
          ${contextChips.map(chip => `
            <button 
              class="ai-quick-chip px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 shrink-0 transition-colors text-[11px] truncate max-w-[200px]" 
              data-q="${chip.q}"
            >
              ${chip.label}
            </button>
          `).join('')}
        </div>

        <!-- Input Box -->
        <form id="ai-input-form" class="p-2.5 bg-black/70 border-t border-white/[0.08] flex items-center space-x-2">
          <input 
            type="text" 
            id="ai-user-query" 
            placeholder="${t('ai.placeholder', lang)}" 
            class="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            autocomplete="off"
            ${isLoading ? 'disabled' : ''}
          />
          <button 
            type="submit" 
            class="px-3.5 py-2 rounded-lg bg-white text-black font-semibold text-xs transition-all hover:bg-slate-200 shrink-0 active:scale-95 disabled:opacity-50"
            ${isLoading ? 'disabled' : ''}
          >
            ${isLoading ? '...' : t('ai.send', lang)}
          </button>
        </form>
      </div>

      <!-- Floating Action Button (Crisp Squircle) -->
      <button 
        id="ai-fab-btn" 
        aria-expanded="${isOpen ? 'true' : 'false'}"
        aria-controls="ai-chat-drawer"
        class="w-12 h-12 rounded-xl bg-white text-black shadow-[0_8px_24px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
        aria-label="${t('ai.open', lang)}"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      </button>

    </div>
  `;
}
