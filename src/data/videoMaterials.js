/**
 * NetVerse - Video Learning Materials Registry
 * YouTube Practical Guides:
 * 1. Setting Dasar Jaringan & Router MikroTik untuk Distribusi WiFi (NanangMrk) - https://youtu.be/VW28Uqml3nE
 * 2. Tutorial Crimping Kabel UTP LAN RJ45 (mr gion channel) - https://youtu.be/TrqZDU7Ywf4
 * 3. Cara Mudah Setting MikroTik dari Awal Sampai Bisa Online (GAPTEK AMATIR) - https://youtu.be/WKrRWSCXo38
 */

export const VIDEO_MATERIALS = [
  {
    id: 'video-dasar-topologi',
    youtubeId: 'VW28Uqml3nE',
    url: 'https://youtu.be/VW28Uqml3nE?si=U-SUjDe0yEaOSbvx',
    title: {
      id: 'Setting Dasar Jaringan & Router MikroTik untuk Distribusi Internet WiFi',
      en: 'Basic Network & MikroTik Router Setup for WiFi Distribution',
      jp: 'ネットワーク基礎・MikroTikルーターとWiFi配信の基本設定',
      cn: '网络基础与MikroTik路由器WiFi分发实用配置教学'
    },
    channel: 'NanangMrk',
    channelUrl: 'https://www.youtube.com/@NanangMrk',
    modulSlug: 'jaringan-dasar-topologi',
    modulIndex: 0, // 0-indexed: module 1
    category: {
      id: 'Dasar Jaringan & Topologi Distribusi',
      en: 'Network Fundamentals & Distribution Topology',
      jp: 'ネットワーク基礎と配信トポロジー',
      cn: '网络基础与分发拓扑'
    },
    duration: {
      id: '± 54 Menit',
      en: '± 54 Mins',
      jp: '約 54 分',
      cn: '约 54 分钟'
    },
    summary: {
      id: 'Panduan komprehensif implementasi topologi jaringan dan konfigurasi dasar router MikroTik untuk mendistribusikan koneksi internet ke access point dan klien rumah tangga/voucher, mencakup topologi star fisik, pembagian interface, alokasi IP gateway, dan routing dasar.',
      en: 'Comprehensive guide implementing network topology and basic MikroTik router configuration to distribute internet access to APs and client devices, covering physical star topology, interface allocation, gateway IP, and basic routing.',
      jp: '実用的なネットワークトポロジーの構築とMikroTikルーターの基本設定を解説。物理スター型トポロジー、インターフェース設計、デフォルトゲートウェイ、ルーティング基礎からアクセスポイントへのWiFi配信までを実践的に学習します。',
      cn: '全面讲解真实网络拓扑架构与MikroTik路由器基础配置，涵盖物理星型拓扑搭建、接口规划、默认网关与基础路由，为无线AP与终端客户端实现稳定网络分发。'
    },
    keyTakeaways: [
      {
        title: { id: 'Topologi Fisik & Alur Distribusi', en: 'Physical Topology & Flow', jp: '物理トポロジーと配信フロー', cn: '物理拓扑与分发流向' },
        desc: { id: 'Menyusun alur dari modem ISP masuk ke port WAN router, lalu didistribusikan ke access point dan switch menggunakan topologi star.', en: 'Structure network flow from ISP modem into WAN port, distributing to APs and switches via star topology.', jp: 'ISPモデムからルーターのWANポートへ接続し、スター型トポロジーでアクセスポイントやスイッチへ配信します。', cn: '梳理从ISP光猫接入路由器WAN口，再通过星型拓扑分发至无线AP与交换机的网络流向。' }
      },
      {
        title: { id: 'Alokasi Port & IP Gateway', en: 'Port Allocation & Gateway IP', jp: 'ポート割り当てとゲートウェイIP', cn: '接口分配与网关IP规划' },
        desc: { id: 'Menentukan subnet IP lokal terpisah untuk jaringan manajemen, komputer klien kabel, dan hotspot nirkabel.', en: 'Define dedicated subnets for network management, wired client devices, and wireless hotspot networks.', jp: '管理用ネットワーク、有線クライアント、無線ホットスポットごとに独立したIPサブネットを設計します。', cn: '为管理网段、有线客户端与无线热点规划划分独立的局域网IP子网。' }
      },
      {
        title: { id: 'Konfigurasi Akses Internet', en: 'Internet Access Configuration', jp: 'インターネット接続の基本設定', cn: '互联网连接接入配置' },
        desc: { id: 'Menyiapkan DNS resolver, default gateway (IP route), serta masquerade firewall agar setiap host dapat bertukar data ke internet.', en: 'Configure DNS resolver, default gateway route, and firewall NAT masquerade so all local hosts can reach external networks.', jp: 'DNSリゾルバ、デフォルトルート、ファイアウォールNATマスカレードを設定し、各ホストの外部通信を有効化します。', cn: '配置DNS解析、默认路由网关以及NAT伪装规则，确保局域网所有主机具备互联网通信能力。' }
      },
      {
        title: { id: 'Manajemen Jaringan & Klien', en: 'Network & Client Management', jp: '帯域制御とクライアント管理', cn: '带宽控制与客户端管理' },
        desc: { id: 'Membagi alokasi bandwidth secara proporsional dan mengisolasi lalu lintas klien agar performa jaringan tetap stabil.', en: 'Allocate bandwidth fairly across endpoints and isolate client traffic to keep network latency low and stable.', jp: '端末間の公平な帯域配分と通信の分離を行い、ネットワークの混雑と遅延を防止します。', cn: '按需分配合理带宽并做好客户端隔离，保障整体网络运行稳定流畅。' }
      }
    ],
    actionLink: {
      type: 'workbench',
      deviceCode: 'router-mikrotik',
      label: { id: 'Pelajari Komponen Router di Lab 3D', en: 'Explore Router in 3D Lab', jp: '3Dラボでルーターの構造を学ぶ', cn: '在3D实验台探究路由器' }
    }
  },
  {
    id: 'video-crimping-utp',
    youtubeId: 'TrqZDU7Ywf4',
    url: 'https://youtu.be/TrqZDU7Ywf4?si=42OBb6m07rWMhEWB',
    title: {
      id: 'Tutorial Cara Crimping Kabel UTP LAN RJ45',
      en: 'Tutorial: UTP LAN RJ-45 Cable Crimping Guide',
      jp: 'LANケーブル（UTP RJ-45）の圧着・結線チュートリアル',
      cn: 'UTP网线RJ-45水晶头压接教学指南'
    },
    channel: 'mr gion channel',
    channelUrl: 'https://www.youtube.com/@gionchannel',
    modulSlug: 'media-transmisi-utp',
    modulIndex: 1, // 0-indexed: module 2
    category: {
      id: 'Kabel & Media Transmisi',
      en: 'Cables & Transmission Media',
      jp: 'ケーブルと伝送媒体',
      cn: '线缆与传输介质'
    },
    duration: {
      id: '± 8 Menit',
      en: '± 8 Mins',
      jp: '約 8 分',
      cn: '约 8 分钟'
    },
    summary: {
      id: 'Panduan visual langkah demi langkah memotong kabel UTP, mengupas jaket pelindung, meratakan susunan 8 kawat tembaga sesuai standar T568B, memasukkan ke konektor RJ-45, mengunci dengan tang crimping, dan menguji kontinuitas dengan LAN cable tester.',
      en: 'Step-by-step visual demonstration on stripping UTP outer jacket, untwisting and aligning 8 copper pins to T568B standard, inserting into RJ-45 plug, crimping with modular tool, and testing with a LAN tester.',
      jp: 'UTPケーブルの被覆剥き、T568B規格に準拠した8芯の並べ替え、RJ-45コネクタへの挿入、圧着ペンチによる固定、LANテスターでの点灯テストまでを網羅した動画です。',
      cn: '分步直观演示如何剥除UTP网线外皮、按T568B标准排列理顺8根线芯、插入RJ-45水晶头、使用压线钳压接固定并使用网络测线仪检测。'
    },
    keyTakeaways: [
      {
        title: { id: 'Kupas Jaket Luar ±2–3 cm', en: 'Strip Outer Jacket ±2-3 cm', jp: '外被を約2〜3cm剥く', cn: '剥除约2-3厘米外皮' },
        desc: { id: 'Gunakan mata pisau pengupas kabel pada tang crimping dengan putaran halus agar tembaga bagian dalam tidak cacat.', en: 'Use the stripper blade carefully to avoid nicking inner wire insulation.', jp: '芯線の絶縁体を傷つけないよう軽く回して被覆を取り除きます。', cn: '小心使用剥线刀片旋转，避免伤及内部线芯绝缘层。' }
      },
      {
        title: { id: 'Urutan Standar T568B', en: 'T568B Pinout Standard', jp: 'T568B配線規格', cn: 'T568B线序标准' },
        desc: { id: 'Putih-Orange, Orange, Putih-Hijau, Biru, Putih-Biru, Hijau, Putih-Cokelat, Cokelat.', en: 'White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown.', jp: '白橙、橙、白緑、青、白青、緑、白茶、茶の順序で整線します。', cn: '白橙、橙、白绿、蓝、白蓝、绿、白棕、棕。' }
      },
      {
        title: { id: 'Potong Rata & Dorong Mentok', en: 'Cut Flush & Push Fully', jp: '先端を均等に切断して奥まで挿入', cn: '剪齐并推到底部' },
        desc: { id: 'Potong rata kawat tersisa ±1.2 cm, lalu dorong hingga menyentuh ujung pelat tembaga RJ-45.', en: 'Trim evenly to ~1.2 cm and push until all 8 copper wires touch the end of RJ-45 plug.', jp: '約1.2cm残して直角に切り揃え、RJ-45コネクタの先端まで押し込みます。', cn: '平整剪齐剩余约1.2厘米，完全推入RJ-45水晶头顶端。' }
      },
      {
        title: { id: 'Crimping Mantap & Uji Tester', en: 'Firm Crimp & Continuity Test', jp: '圧着固定とLANテスター試験', cn: '压紧固定与测线仪测试' },
        desc: { id: 'Tekan handle tang crimping hingga bunyi klik, lalu uji kedua ujung di LAN tester (LED 1–8 menyala runtut).', en: 'Crimp firmly and test with LAN tester to confirm LEDs 1 to 8 illuminate in correct sequence.', jp: 'カチッと鳴るまで圧着し、テスターのLED 1〜8番が正しく点灯するか確認します。', cn: '用力压紧直至到位，并在测线仪上确认1-8号指示灯顺序点亮。' }
      }
    ],
    actionLink: {
      type: 'crimping',
      label: { id: 'Praktikkan di Simulasi Crimping 3D', en: 'Practice in 3D Crimping Lab', jp: '3D圧着シミュレータで練習する', cn: '前往3D网线压接实训' }
    }
  },
  {
    id: 'video-setting-mikrotik',
    youtubeId: 'WKrRWSCXo38',
    url: 'https://youtu.be/WKrRWSCXo38?si=tA9Y4HcmHu3b_YYQ',
    title: {
      id: 'Cara Mudah Setting MikroTik dari Awal Sampai Bisa Online',
      en: 'How to Configure MikroTik RouterBoard from Scratch to Online',
      jp: '初心者のためのMikroTikルーター初期設定・インターネット開通',
      cn: 'MikroTik路由器从零基础到连网上线配置教学'
    },
    channel: 'GAPTEK AMATIR',
    channelUrl: 'https://www.youtube.com/@GAPTEKAMATIR',
    modulSlug: 'perangkat-keras-jaringan',
    modulIndex: 2, // 0-indexed: module 3
    category: {
      id: 'Router & Gateway Jaringan',
      en: 'Router & Gateway Configuration',
      jp: 'ルーター・ゲートウェイ設定',
      cn: '路由器与网关配置'
    },
    duration: {
      id: '± 15 Menit',
      en: '± 15 Mins',
      jp: '約 15 分',
      cn: '约 15 分钟'
    },
    summary: {
      id: 'Tutorial komprehensif mengonfigurasi router MikroTik RouterBoard dari kondisi kosong/reset sampai dapat menyalurkan internet ke komputer klien menggunakan Winbox, mencakup setup DHCP Client (WAN), IP LAN, DNS, NAT Masquerade, dan DHCP Server.',
      en: 'Comprehensive guide configuring a MikroTik RouterBoard using Winbox from blank/reset state to sharing internet connection, covering DHCP Client WAN, LAN IP, DNS resolver, NAT masquerade, and DHCP Server for clients.',
      jp: 'Winboxを使用してMikroTikルーターを初期化状態から設定し、DHCPクライアント(WAN)、LAN IPアドレス、DNS、NATマスカレード、DHCPサーバーを構築してクライアントにネットを配信する実践解説です。',
      cn: '使用Winbox工具对MikroTik路由器进行从重置到成功联网的全套配置教程，包括WAN口DHCP Client、局域网IP设置、DNS解析、NAT Masquerade伪装以及客户端DHCP Server配置。'
    },
    keyTakeaways: [
      {
        title: { id: 'Akses Winbox via MAC Address', en: 'Access Winbox via MAC Address', jp: 'MACアドレスでWinbox接続', cn: '通过MAC地址连接Winbox' },
        desc: { id: 'Hubungkan kabel PC ke port ether2, buka Winbox, klik tab Neighbors, dan login dengan user admin tanpa password.', en: 'Connect PC to ether2, open Winbox Neighbors tab, and log in with admin credentials.', jp: 'PCをether2に接続し、WinboxのNeighborsタブからMACアドレスを選択してログインします。', cn: '将电脑网线插入ether2口，在Winbox的Neighbors标签页点选MAC地址登录。' }
      },
      {
        title: { id: 'DHCP Client pada ether1 (WAN)', en: 'DHCP Client on ether1 (WAN)', jp: 'ether1にDHCPクライアント設定', cn: '在ether1配置DHCP Client' },
        desc: { id: 'Atur IP > DHCP Client pada interface ether1 (kabel dari modem) agar router mendapat IP publik dan default route internet.', en: 'Set DHCP Client on ether1 connected to upstream modem to receive automatic IP and default gateway.', jp: 'モデムと接続したether1にDHCP Clientを適用し、プロバイダからIPとゲートウェイを取得します。', cn: '对接入光猫的ether1接口配置DHCP客户端，自动获取外网IP和默认路由。' }
      },
      {
        title: { id: 'IP Address LAN ether2 & DNS', en: 'LAN IP on ether2 & DNS Settings', jp: 'LAN IPとDNSサーバー設定', cn: '配置局域网IP与DNS' },
        desc: { id: 'Tambahkan IP lokal (misal: 192.168.10.1/24) pada ether2, lalu atur DNS dengan mengaktifkan "Allow Remote Requests".', en: 'Assign a subnet to ether2 (e.g. 192.168.10.1/24) and configure DNS with Allow Remote Requests enabled.', jp: 'ether2にローカルIP（例: 192.168.10.1/24）を付与し、DNS設定でAllow Remote Requestsを有効化します。', cn: '在ether2配置局域网网段IP（如192.168.10.1/24），在DNS设置勾选Allow Remote Requests。' }
      },
      {
        title: { id: 'Firewall NAT Masquerade & DHCP Server', en: 'NAT Masquerade & DHCP Server Setup', jp: 'NATマスカレードとDHCPサーバー', cn: '防火墙NAT Masquerade与DHCP服务' },
        desc: { id: 'Buat rule NAT (chain=srcnat, out-interface=ether1, action=masquerade), lalu jalankan DHCP Setup pada ether2 agar klien langsung online.', en: 'Add srcnat masquerade rule for ether1 and run DHCP Setup on ether2 so connected devices gain instant internet access.', jp: 'IP > Firewall > NATでether1のマスカレードを設定し、ether2でDHCP Setupを実行してクライアントを即時オンライン化します。', cn: '在防火墙NAT增加ether1外网伪装规则，并在ether2运行DHCP Setup向客户端自动派发IP与网络。' }
      }
    ],
    actionLink: {
      type: 'workbench',
      deviceCode: 'router-wifi',
      label: { id: 'Eksplorasi Router di Lab 3D', en: 'Inspect Router in 3D Lab', jp: '3Dラボでルーターを調べる', cn: '在3D实验台查看路由器' }
    }
  }
];

export function getVideoByModulSlug(slug) {
  return VIDEO_MATERIALS.find(v => v.modulSlug === slug) || null;
}

export function getVideoById(id) {
  return VIDEO_MATERIALS.find(v => v.id === id || v.youtubeId === id) || null;
}
