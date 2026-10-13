import { renderVirtualLab3D } from './VirtualLab3D.js';
import { t, getLocalizedModule } from '../utils/i18n.js';

export const SWITCH_PORTS_DATA = [
  {
    port: 1,
    name: {
      en: 'Port 01: Core Router WAN Uplink',
      id: 'Port 01: Uplink Router Utama WAN',
      jp: 'ポート 01: コアルーター WAN アップリンク',
      cn: '端口 01: 核心路由器 WAN 上行'
    },
    status: 'ACTIVE_LINK',
    speed: '1000BASE-T Full-Duplex',
    autoMdix: true,
    vlan: 'VLAN 1 (Management Default)',
    vlanType: 'Tagged Trunk',
    poe: 'Disabled (Host Powered)',
    cableType: 'Cat 6 UTP (24 AWG)',
    cableLen: '~ 14.5 m',
    mtu: 1500,
    rxRate: '412.4 Mbps',
    txRate: '389.1 Mbps',
    crcErrors: 0,
    drops: 0,
    deviceDesc: {
      en: 'Direct gigabit fiber transceiver interconnect to the main border router gateway.',
      id: 'Interkoneksi gigabit langsung ke gateway router perbatasan utama kampus/kantor.',
      jp: '境界ルーターゲートウェイへのダイレクトギガビットアップリンク接続。',
      cn: '直连园区/企业核心边界路由网关的千兆高速上联干道。'
    }
  },
  {
    port: 2,
    name: {
      en: 'Port 02: High-Density Server Host',
      id: 'Port 02: Server Host Pusat Data',
      jp: 'ポート 02: データセンター サーバーホスト',
      cn: '端口 02: 数据中心核心计算服务器'
    },
    status: 'ACTIVE_LINK',
    speed: '1000BASE-T Full-Duplex',
    autoMdix: true,
    vlan: 'VLAN 10 (Server Farm)',
    vlanType: 'Untagged Access',
    poe: 'Disabled',
    cableType: 'Cat 6A STP Shielded',
    cableLen: '~ 3.2 m',
    mtu: 9000,
    rxRate: '780.2 Mbps',
    txRate: '694.0 Mbps',
    crcErrors: 0,
    drops: 0,
    deviceDesc: {
      en: 'Enterprise Linux compute node serving HTTP, Database, and DNS cluster workloads with Jumbo Frame support.',
      id: 'Node komputasi Linux melayani HTTP, database, dan DNS dengan dukungan Jumbo Frame 9000 bytes.',
      jp: 'ジャンボフレーム対応でHTTP/DB/DNSを高速処理するLinuxサーバーノード。',
      cn: '承载HTTP/数据库/DNS高并发负载并支持9000字节巨型帧的企业级计算节点。'
    }
  },
  {
    port: 3,
    name: {
      en: 'Port 03: Wi-Fi 6 Access Point (AP-01)',
      id: 'Port 03: Access Point Wi-Fi 6 (AP-01)',
      jp: 'ポート 03: Wi-Fi 6 アクセスポイント (AP-01)',
      cn: '端口 03: Wi-Fi 6 企业级无线AP (AP-01)'
    },
    status: 'ACTIVE_LINK',
    speed: '1000BASE-T Full-Duplex',
    autoMdix: true,
    vlan: 'VLAN 20 (Wireless Campus)',
    vlanType: 'Tagged Trunk (SSID-to-VLAN)',
    poe: '802.3at PoE+ (24.8W Active)',
    cableType: 'Cat 6 UTP Solid',
    cableLen: '~ 42.0 m',
    mtu: 1500,
    rxRate: '245.8 Mbps',
    txRate: '198.3 Mbps',
    crcErrors: 0,
    drops: 0,
    deviceDesc: {
      en: 'Ceiling-mounted 802.11ax dual-band enterprise AP powered directly over Ethernet (PoE+ 30W class).',
      id: 'Access point langit-langit dual-band bertenaga Power over Ethernet (PoE+) untuk ratusan client nirkabel.',
      jp: '天井設置型Wi-Fi 6アクセスポイント。PoE+給電によりLANケーブル1本で駆動。',
      cn: '吸顶部署的双频802.11ax企业级无线AP，通过以太网PoE+单线供电与数据回传。'
    }
  },
  {
    port: 4,
    name: {
      en: 'Port 04: TKJ Computer Lab Workstation 01',
      id: 'Port 04: PC Siswa Laboratorium TKJ 01',
      jp: 'ポート 04: 実習室 PC ワークステーション 01',
      cn: '端口 04: 网络工程实训室学生机 01'
    },
    status: 'ACTIVE_LINK',
    speed: '1000BASE-T Full-Duplex',
    autoMdix: true,
    vlan: 'VLAN 30 (Student Lab)',
    vlanType: 'Untagged Access',
    poe: 'Disabled',
    cableType: 'Cat 5e UTP Patch Cord',
    cableLen: '~ 18.0 m',
    mtu: 1500,
    rxRate: '64.2 Mbps',
    txRate: '28.1 Mbps',
    crcErrors: 0,
    drops: 0,
    deviceDesc: {
      en: 'Practicum desktop host configured with static IP and testing packet crafting scripts.',
      id: 'Workstation lab komputer siswa untuk simulasi routing, packet crafting, dan uji konektivitas.',
      jp: '生徒用実習PC端末。ルーティング演習やパケット解析実験を実施中。',
      cn: '实训台专属学生PC终端，用于路由协议配置、数据包构造与网络实验。'
    }
  },
  {
    port: 5,
    name: {
      en: 'Port 05: TKJ Computer Lab Workstation 02',
      id: 'Port 05: PC Siswa Laboratorium TKJ 02',
      jp: 'ポート 05: 実習室 PC ワークステーション 02',
      cn: '端口 05: 网络工程实训室学生机 02'
    },
    status: 'ACTIVE_LINK',
    speed: '1000BASE-T Full-Duplex',
    autoMdix: true,
    vlan: 'VLAN 30 (Student Lab)',
    vlanType: 'Untagged Access',
    poe: 'Disabled',
    cableType: 'Cat 5e UTP Patch Cord',
    cableLen: '~ 19.5 m',
    mtu: 1500,
    rxRate: '58.7 Mbps',
    txRate: '19.4 Mbps',
    crcErrors: 0,
    drops: 0,
    deviceDesc: {
      en: 'Second client terminal participating in peer-to-peer Wireshark packet capture analysis.',
      id: 'Workstation lab pendamping untuk observasi frame Wireshark dan pengujian kontinuitas ping.',
      jp: 'WiresharkによるパケットキャプチャとPing疎通確認を実施する端末。',
      cn: '参与对等网络抓包分析与连通性验证的第二实训学生终端。'
    }
  },
  {
    port: 6,
    name: {
      en: 'Port 06: VoIP SIP Conference Phone',
      id: 'Port 06: Telepon IP VoIP SIP Ruang Lab',
      jp: 'ポート 06: VoIP SIP IP電話機',
      cn: '端口 06: VoIP SIP 语音会议电话'
    },
    status: 'ACTIVE_LINK',
    speed: '100BASE-TX Full-Duplex',
    autoMdix: true,
    vlan: 'VLAN 40 (Voice QoS Priority)',
    vlanType: 'Voice VLAN (802.1p CoS: 5)',
    poe: '802.3af PoE (6.5W Active)',
    cableType: 'Cat 5e UTP',
    cableLen: '~ 25.0 m',
    mtu: 1500,
    rxRate: '3.2 Mbps',
    txRate: '3.1 Mbps',
    crcErrors: 0,
    drops: 0,
    deviceDesc: {
      en: 'Dedicated IP telephony handset operating on strict DSCP/CoS priority queue to prevent jitter and packet loss.',
      id: 'Pesawat telepon IP berbasis SIP dengan antrean QoS prioritas tinggi untuk panggilan suara jernih tanpa delay.',
      jp: 'ジッターとパケットロスを排除するQoS優先制御付きIP電話機。',
      cn: '启用高优先级QoS语音专用VLAN的SIP话机，确保低时延与零丢包清晰通话。'
    }
  },
  {
    port: 7,
    name: {
      en: 'Port 07: Network Attached Storage (NAS)',
      id: 'Port 07: Penyimpanan Jaringan (NAS Backup)',
      jp: 'ポート 07: ネットワークストレージ (NAS)',
      cn: '端口 07: 网络附属存储 (NAS 备份节点)'
    },
    status: 'ACTIVE_LINK',
    speed: '1000BASE-T Full-Duplex',
    autoMdix: true,
    vlan: 'VLAN 10 (Server Farm)',
    vlanType: 'Untagged Access',
    poe: 'Disabled',
    cableType: 'Cat 6 UTP Stranded',
    cableLen: '~ 5.0 m',
    mtu: 1500,
    rxRate: '124.5 Mbps',
    txRate: '582.1 Mbps',
    crcErrors: 0,
    drops: 0,
    deviceDesc: {
      en: 'RAID 10 network storage unit holding student assignment archives, firmware images, and lab backups.',
      id: 'Unit penyimpanan RAID 10 terpusat untuk arsip praktikum siswa, firmware perangkat, dan berkas cadangan.',
      jp: '実習課題アーカイブやファームウェアを保管するRAID 10ストレージ。',
      cn: 'RAID 10 高可用集中存储阵列，存放学生实训归档与固件镜像。'
    }
  },
  {
    port: 8,
    name: {
      en: 'Port 08: SPAN Port Mirroring & Sniffer',
      id: 'Port 08: Port Mirroring (Analisis IDS / Sniffer)',
      jp: 'ポート 08: SPAN ポートミラーリング・パケット解析',
      cn: '端口 08: SPAN 端口镜像与入侵检测旁路'
    },
    status: 'ACTIVE_LINK',
    speed: '1000BASE-T Full-Duplex',
    autoMdix: true,
    vlan: 'SPAN Mirror (All VLANs Ingress/Egress)',
    vlanType: 'Promiscuous Monitor Mode',
    poe: 'Disabled',
    cableType: 'Cat 6 UTP Patch',
    cableLen: '~ 2.0 m',
    mtu: 9216,
    rxRate: '890.4 Mbps',
    txRate: '0.0 Mbps (Receive Only)',
    crcErrors: 0,
    drops: 0,
    deviceDesc: {
      en: 'Port mirroring target replicating full traffic from Ports 1-7 into an IDS security probe without altering packet payloads.',
      id: 'Port duplikasi cermin (SPAN) untuk mereplikasi seluruh paket dari Port 1-7 ke probe keamanan IDS tanpa mengubah payload.',
      jp: 'ポート1〜7の全トラフィックを複製しIDS/パケット解析装置へ転送するミラーポート。',
      cn: '将端口1-7的双向报文完整镜像复制至旁路IDS入侵检测与协议分析探针。'
    }
  }
];

export function renderDashboard(moduls = [], devices = [], activeDeviceIdx = 0, selectedHotspot = null, learningProgress = {}, lang = 'en', activePort = 1) {
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

  const completedCount = moduls.filter(m => learningProgress[m.id]?.status === 'selesai').length;
  const currPortData = SWITCH_PORTS_DATA.find(p => p.port === Number(activePort)) || SWITCH_PORTS_DATA[0];

  return `
    <div class="space-y-12 pt-24 pb-16 animate-fadeIn max-w-6xl mx-auto">
      
      <!-- HERO SECTION: Engineered Spatial Curriculum (Anti-Slop Technical Substrate) -->
      <section class="relative overflow-hidden rounded-2xl p-6 sm:p-10 lg:p-12 bg-black/60 bg-tech-grid border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        
        <div class="relative z-10 space-y-6">
          
          <!-- Micro Eyebrow Badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>${t('dashboard.eyebrow', lang)}</span>
          </div>

          <!-- Hero Headline -->
          <div class="max-w-3xl space-y-3">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              ${t('dashboard.heroHeadline', lang)}
            </h1>
            <p class="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
              ${t('dashboard.heroDesc', lang)}
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button
              data-nav="materi"
              ${nextModule ? `data-select-modul="${nextModuleIndex}"` : ''}
              class="min-h-12 px-6 rounded-xl bg-white text-black hover:bg-slate-200 font-bold text-sm transition-all shadow-lg active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>${startLabel}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>

            <button
              data-nav="crimping"
              class="min-h-12 px-5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>⚡</span>
              <span>${t('dashboard.btnCrimping', lang)}</span>
            </button>

            <button
              type="button"
              data-open-ai-tutor
              class="min-h-12 px-5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-semibold text-sm border border-amber-400/30 transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>💡</span>
              <span>${t('dashboard.btnAskTutor', lang)}</span>
            </button>
          </div>

          <!-- Live Engineering Badges / Metrics -->
          <div class="pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div class="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
              <div class="font-mono text-amber-400 font-bold text-base">${t('dashboard.metric1Val', lang)}</div>
              <div class="text-slate-400 text-[11px] mt-0.5">${t('dashboard.metric1Label', lang)}</div>
            </div>

            <div class="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
              <div class="font-mono text-emerald-400 font-bold text-base">${t('dashboard.metric2Val', lang)}</div>
              <div class="text-slate-400 text-[11px] mt-0.5">${t('dashboard.metric2Label', lang)}</div>
            </div>

            <div class="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
              <div class="font-mono text-blue-400 font-bold text-base">${t('dashboard.metric3Val', lang)}</div>
              <div class="text-slate-400 text-[11px] mt-0.5">${t('dashboard.metric3Label', lang)}</div>
            </div>

            <div class="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
              <div class="font-mono text-purple-400 font-bold text-base">${t('dashboard.metric4Val', lang)}</div>
              <div class="text-slate-400 text-[11px] mt-0.5">${t('dashboard.metric4Label', lang)}</div>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION: Interactive 8-Port Gigabit Switch & Live Telemetry Strip (Tactile Micro-Interaction) -->
      <section class="rounded-2xl p-5 sm:p-6 bg-black/80 border border-white/15 shadow-2xl space-y-4">
        
        <!-- Mission Control Telemetry Header Ribbon -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08] text-xs">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-sm bg-emerald-400 animate-pulse"></span>
            <span class="font-mono font-bold text-white tracking-wider">MISSION CONTROL TELEMETRY</span>
            <span class="text-slate-500">•</span>
            <span class="font-mono text-emerald-400 font-semibold text-[11px]">IEEE 802.3ab LINK UP</span>
          </div>

          <div class="flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-slate-300">
            <div class="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <span class="text-slate-500">RTT:</span>
              <span class="text-amber-400 font-bold">12.4ms (±1.1ms)</span>
            </div>
            <div class="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <span class="text-slate-500">THROUGHPUT:</span>
              <span class="text-emerald-400 font-bold">1.24 Gbps</span>
            </div>
            <div class="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5">
              <span class="text-slate-500">FCS:</span>
              <span class="text-white font-bold">VALID (0 CRC)</span>
            </div>
          </div>
        </div>

        <!-- 8-Port Managed Switch Faceplate -->
        <div class="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-[#181b24] via-[#10131a] to-[#0b0d13] border border-white/15 shadow-inner">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold text-amber-400 tracking-wider">NETVERSE L2-8G</span>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">MANAGED GIGABIT</span>
              </div>
              <h3 class="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
                ${t('dashboard.switchSubtitle', lang)}
              </h3>
            </div>
            <div class="flex items-center gap-3 text-[10px] font-mono text-slate-400 shrink-0">
              <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> LNK</span>
              <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-amber-400 animate-led-fast"></span> ACT</span>
            </div>
          </div>

          <!-- 8 Physical RJ-45 Port Jacks -->
          <div class="grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3">
            ${SWITCH_PORTS_DATA.map((p, idx) => {
              const isSelected = p.port === Number(activePort);
              return `
                <button
                  type="button"
                  data-interactive-port="${p.port}"
                  class="group flex flex-col items-center p-2.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/15 border-amber-400/70 shadow-[0_0_12px_rgba(245,158,11,0.25)] scale-[1.03]'
                      : 'bg-black/50 border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                  }"
                  title="Click Port ${p.port} to inspect diagnostics"
                >
                  <!-- Dual LED Status Indicators -->
                  <div class="flex items-center gap-1.5 mb-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" title="Link Active"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400 ${idx % 2 === 0 ? 'animate-led-fast' : 'animate-led-activity'} shadow-[0_0_4px_#fbbf24]" title="Packet TX/RX Activity"></span>
                  </div>

                  <!-- RJ-45 Modular Jack Visual (Metal shielded receptacle) -->
                  <div class="w-10 h-8 rounded-md bg-[#0a0c12] border ${isSelected ? 'border-amber-400/80' : 'border-white/20'} flex flex-col items-center justify-between p-1 shadow-inner relative group-hover:border-slate-300">
                    <!-- Top 8 copper pin contacts -->
                    <div class="flex items-center justify-between w-full px-0.5 pt-0.5">
                      <span class="w-0.5 h-1 bg-amber-300"></span>
                      <span class="w-0.5 h-1 bg-amber-300"></span>
                      <span class="w-0.5 h-1 bg-amber-300"></span>
                      <span class="w-0.5 h-1 bg-amber-300"></span>
                      <span class="w-0.5 h-1 bg-amber-300"></span>
                      <span class="w-0.5 h-1 bg-amber-300"></span>
                      <span class="w-0.5 h-1 bg-amber-300"></span>
                      <span class="w-0.5 h-1 bg-amber-300"></span>
                    </div>
                    <!-- Plug notch -->
                    <div class="w-3.5 h-1.5 bg-black rounded-b-sm border border-white/20"></div>
                  </div>

                  <!-- Port Number Label -->
                  <span class="mt-1.5 font-mono text-[11px] font-bold ${isSelected ? 'text-amber-400' : 'text-slate-400 group-hover:text-white'}">
                    0${p.port}
                  </span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Live Port Diagnostics Readout Panel -->
          <div id="switch-port-diagnostics" class="mt-4 p-4 rounded-xl bg-black/70 border border-white/10 space-y-3 font-mono text-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="font-bold text-white text-sm">${currPortData.name[lang] || currPortData.name.en || currPortData.name.id}</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                ${currPortData.speed}
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div>
                <span class="text-slate-500 block">VLAN / Membership:</span>
                <span class="text-slate-200 font-semibold">${currPortData.vlan}</span>
                <span class="text-slate-400 text-[10px] block">${currPortData.vlanType}</span>
              </div>

              <div>
                <span class="text-slate-500 block">Power over Ethernet:</span>
                <span class="text-emerald-400 font-semibold">${currPortData.poe}</span>
              </div>

              <div>
                <span class="text-slate-500 block">Cable Type & Length:</span>
                <span class="text-slate-200">${currPortData.cableType}</span>
                <span class="text-amber-400 text-[10px] block">${currPortData.cableLen} (Auto-MDIX: OK)</span>
              </div>

              <div>
                <span class="text-slate-500 block">Live Traffic Stats:</span>
                <span class="text-slate-200">RX: ${currPortData.rxRate}</span>
                <span class="text-slate-200 block">TX: ${currPortData.txRate}</span>
              </div>
            </div>

            <p class="text-[11px] text-slate-400 font-sans leading-relaxed pt-1 border-t border-white/[0.05]">
              ${currPortData.deviceDesc[lang] || currPortData.deviceDesc.en || currPortData.deviceDesc.id}
            </p>
          </div>

        </div>
      </section>

      <!-- SECTION 2: Bento Grid of Core Pillars (Pilar Keunggulan Pembelajaran) -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div class="text-xs font-semibold text-amber-400 uppercase tracking-wider">${t('dashboard.pillarsTitle', lang)}</div>
            <h2 class="text-2xl font-bold text-white tracking-tight mt-1">${t('dashboard.pillarsSubtitle', lang)}</h2>
          </div>
          <span class="text-xs text-slate-400">${t('dashboard.rotateHint', lang)}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          <!-- Bento 1: 3D Hardware Studio (7 cols) -->
          <div class="md:col-span-7 rounded-2xl p-6 bg-[#0a0d16] border border-white/10 flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-colors shadow-lg">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white tracking-tight">${t('dashboard.card3dTitle', lang)}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t('dashboard.card3dDesc', lang)}
              </p>
            </div>
            
            <div class="pt-2 flex items-center justify-between border-t border-white/[0.06]">
              <span class="text-[11px] text-slate-400 font-mono">6 Model • WebGL 3D</span>
              <a href="#section-3d-lab" class="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                <span>${t('dashboard.card3dAction', lang)}</span>
                <span>&darr;</span>
              </a>
            </div>
          </div>

          <!-- Bento 2: Crimping Master (5 cols) -->
          <div class="md:col-span-5 rounded-2xl p-6 bg-[#09110d] border border-emerald-500/20 flex flex-col justify-between space-y-4 hover:border-emerald-400/40 transition-colors shadow-lg">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white tracking-tight">${t('dashboard.cardCrimpingTitle', lang)}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t('dashboard.cardCrimpingDesc', lang)}
              </p>
            </div>
            
            <div class="pt-2 flex items-center justify-between border-t border-white/[0.06]">
              <span class="text-[11px] text-emerald-400 font-mono">T568A / T568B • +150 XP</span>
              <button data-nav="crimping" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer">
                <span>${t('dashboard.cardCrimpingAction', lang)}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          <!-- Bento 3: Socratic AI Network Tutor (4 cols) -->
          <div class="md:col-span-4 rounded-2xl p-6 bg-[#0a101d] border border-blue-500/20 flex flex-col justify-between space-y-4 hover:border-blue-400/40 transition-colors shadow-lg">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
              </div>
              <h3 class="text-base font-bold text-white tracking-tight">${t('dashboard.cardAiTitle', lang)}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t('dashboard.cardAiDesc', lang)}
              </p>
            </div>
            
            <div class="pt-2 flex items-center justify-between border-t border-white/[0.06]">
              <span class="text-[11px] text-blue-400 font-mono">24/7 AI Engine</span>
              <button type="button" data-open-ai-tutor class="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer">
                <span>${t('dashboard.cardAiAction', lang)}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          <!-- Bento 4: Adaptive Exam & AI Essay Grader (4 cols) -->
          <div class="md:col-span-4 rounded-2xl p-6 bg-[#110c1f] border border-purple-500/20 flex flex-col justify-between space-y-4 hover:border-purple-400/40 transition-colors shadow-lg">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 class="text-base font-bold text-white tracking-tight">${t('dashboard.cardExamTitle', lang)}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t('dashboard.cardExamDesc', lang)}
              </p>
            </div>
            
            <div class="pt-2 flex items-center justify-between border-t border-white/[0.06]">
              <span class="text-[11px] text-purple-400 font-mono">25 PG + 10 Uraian AI</span>
              <button data-nav="materi" data-materi-format="soal" class="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer">
                <span>${t('dashboard.cardExamAction', lang)}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          <!-- Bento 5: Realtime Leaderboard & Gamification (4 cols) -->
          <div class="md:col-span-4 rounded-2xl p-6 bg-[#151009] border border-amber-500/20 flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition-colors shadow-lg">
            <div class="space-y-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h3 class="text-base font-bold text-white tracking-tight">${t('dashboard.cardLeaderboardTitle', lang)}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t('dashboard.cardLeaderboardDesc', lang)}
              </p>
            </div>
            
            <div class="pt-2 flex items-center justify-between border-t border-white/[0.06]">
              <span class="text-[11px] text-amber-400 font-mono">Total XP • Live Sync</span>
              <button data-nav="leaderboard" class="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer">
                <span>${t('dashboard.cardLeaderboardAction', lang)}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION 3: Curriculum Track Roadmap (Alur Belajar Terstruktur) -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div class="text-xs font-semibold text-emerald-400 uppercase tracking-wider">${t('dashboard.roadmapTag', lang)}</div>
            <h2 class="text-2xl font-bold text-white tracking-tight mt-1">${t('dashboard.roadmapTitle', lang)}</h2>
          </div>
          <div class="text-xs font-mono font-semibold text-amber-400">
            ${t('materi.completedOf', lang, { done: completedCount, total: moduls.length })}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${moduls.map((m, idx) => {
            const locM = getLocalizedModule(m, lang);
            const mProg = learningProgress[m.id];
            const isDone = mProg?.status === 'selesai';

            return `
              <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-amber-400 font-mono">${t('materi.module', lang, { num: idx + 1 })}</span>
                    ${isDone ? `
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ${t('materi.completedBadge', lang)}
                      </span>
                    ` : `
                      <span class="text-xs text-slate-500 font-mono">${t('materi.estimatedTime', lang, { min: m.estimasi_menit || 15 })}</span>
                    `}
                  </div>
                  <h3 class="text-base font-bold text-white tracking-tight">${locM.judul}</h3>
                  <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    ${locM.deskripsi || ''}
                  </p>
                </div>

                <div class="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span class="text-xs font-mono text-emerald-400 font-semibold">+${m.xp_reward || 100} XP</span>
                  <button
                    data-nav="materi"
                    data-select-modul="${idx}"
                    class="min-h-10 px-3.5 rounded-lg bg-white/[0.06] hover:bg-white/15 text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>${isDone ? t('dashboard.btnRepeat', lang) : t('dashboard.btnStart', lang)}</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- SECTION 4: Dedicated 3D Hardware Studio (Preserved and Enhanced) -->
      <section id="section-3d-lab" class="space-y-6 pt-4">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div class="text-xs font-semibold text-amber-400 uppercase tracking-wider">${t('dashboard.devicesSubtitle', lang)}</div>
            <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">${t('dashboard.devicesTitle', lang)}</h2>
          </div>
          <span class="text-xs text-slate-400">${t('dashboard.rotateHint', lang)}</span>
        </div>

        ${renderVirtualLab3D(devices, activeDeviceIdx, selectedHotspot, lang)}
      </section>

    </div>
  `;
}
