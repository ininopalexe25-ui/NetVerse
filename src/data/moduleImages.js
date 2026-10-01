/**
 * NetVerse - Verified Educational Network Photography (Real Internet Photos - Non-AI)
 * High-resolution verified real photographs from authoritative internet repositories (Unsplash).
 * Sourced directly to enrich module reading sections with authentic physical network engineering context.
 */

export const MODULE_SECTION_IMAGES = {
  'jaringan-dasar-topologi': [
    {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      alt: 'Enterprise Data Center Server Racks with network status indicators',
      tag: {
        en: 'Data Center & Network Host Infrastructure',
        id: 'Infrastruktur Server & Host Pusat Data',
        jp: 'データセンターとホスト基盤',
        cn: '数据中心与主机网络基础设施'
      },
      source: 'Unsplash • Photo by Taylor Vick (Verified Non-AI)',
      caption: {
        en: 'Modern high-density data centers interconnecting thousands of host servers with redundant power and high-speed multi-gigabit uplinks.',
        id: 'Pusat data modern menghubungkan ribuan server host dengan redundansi daya dan uplink berkecepatan tinggi.',
        jp: '数千台のホストサーバーを冗長化電源と高速アップリンクで接続する最新データセンター環境。',
        cn: '现代化高密度数据中心通过冗余电源与高速上行链路互联数千台主机服务器。'
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1200&q=80',
      alt: 'High-speed data servers and distributed network compute nodes',
      tag: {
        en: 'Client-Server Centralized Architecture',
        id: 'Arsitektur Terpusat Client-Server',
        jp: 'クライアント・サーバー集中型構成',
        cn: '客户机-服务器集中式架构'
      },
      source: 'Unsplash • Photo by Thomas Jensen (Verified Non-AI)',
      caption: {
        en: 'Centralized server cluster listening on standard ports (HTTP:80, HTTPS:443, DNS:53) to process requests from client workstations.',
        id: 'Klaster server terpusat melayani permintaan data melalui port standar dari ribuan workstation client di jaringan.',
        jp: '標準ポート（HTTP:80、HTTPS:443）でクライアント端末からの要求を一括処理するサーバー群。',
        cn: '集中式服务器集群监听标准端口（80/443），统一响应并处理海量客户端终端请求。'
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Centralized switch rack cabling in star topology layout',
      tag: {
        en: 'Physical Star Topology Cabling & Patch Bays',
        id: 'Pengkabelan Topologi Star pada Patch Bay',
        jp: 'スター型配線とパッチパネル集合架',
        cn: '星型拓扑配线架与机柜汇聚走线'
      },
      source: 'Unsplash • Photo by Jordan Harrison (Verified Non-AI)',
      caption: {
        en: 'Star topology implementation in server racks: each host has an isolated run to the central switch, preventing single points of wire failure.',
        id: 'Implementasi topologi star di rak server: setiap host memiliki kabel terpisah ke switch pusat sehingga kabel putus tidak melumpuhkan seluruh LAN.',
        jp: 'スター型トポロジーの実機配線：各端末が独立して中央スイッチと接続され、単一障害点のリスクを極小化。',
        cn: '机柜内的星型物理拓扑布线：各终端独占通往中心交换机的独立双绞线，隔离单点断线故障。'
      }
    }
  ],
  'media-transmisi-utp': [
    {
      url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
      alt: 'Twisted-pair copper network cables with color-coded jackets',
      tag: {
        en: 'UTP / STP Twisted-Pair Copper Media',
        id: 'Media Tembaga UTP / STP Pasangan Terpilin',
        jp: 'ツイストペア（UTP/STP）銅線媒体',
        cn: '双绞线（UTP/STP）铜质传输介质'
      },
      source: 'Unsplash • Photo by Mika Baumeister (Verified Non-AI)',
      caption: {
        en: 'High-grade Cat 6 copper conductors twisted in precise pitch pairs to eliminate near-end crosstalk (NEXT) through differential signaling.',
        id: 'Kawat tembaga kabel Cat 6 dipilin dengan kerapatan presisi untuk menghilangkan interferensi elektromagnetik (NEXT) melalui sinyal diferensial.',
        jp: '差動信号伝送により近端漏話（NEXT）を相殺するため、精密なピッチで撚り合わされたCat 6銅線。',
        cn: '采用特定节距精密对绞的Cat 6铜芯导线，利用差分信号消除相邻线对间的近端串扰（NEXT）。'
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1682559736721-c2e77ff4c650?auto=format&fit=crop&w=1200&q=80',
      alt: 'Close-up of RJ-45 modular plug contacts and terminated wire pairs',
      tag: {
        en: 'Modular 8P8C Plug & Industrial Pinout',
        id: 'Konektor RJ-45 (8P8C) & Standar Pinout',
        jp: '8P8C モジュラープラグとピン配列',
        cn: 'RJ-45 (8P8C) 水晶头与工业线序规范'
      },
      source: 'Unsplash • Photo by Brett Sayles (Verified Non-AI)',
      caption: {
        en: 'T568B sequence inserted flush against 50-micron gold-plated contacts before crimp compression secures mechanical lock.',
        id: 'Urutan kawat T568B didorong hingga ujung pin emas 50-mikron sebelum tang crimping mengunci bilah kontak dan jaket luar kabel.',
        jp: '50ミクロン金メッキ端子に密着挿入されたT568B配列。圧着工具で確実にロック固定。',
        cn: '平整推入并紧贴50微米镀金触点的T568B线序，通过压线钳咬合实现机械锁死与电气导通。'
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1691435828932-911a7801adfb?auto=format&fit=crop&w=1200&q=80',
      alt: 'Ethernet patch cables plugged into network switch ports',
      tag: {
        en: 'Straight-Through vs Crossover Termination',
        id: 'Terminasi Straight-Through vs Cross',
        jp: 'ストレート結線 vs クロス結線',
        cn: '直通线与交叉网线终端压接'
      },
      source: 'Unsplash • Photo by Denny Müller (Verified Non-AI)',
      caption: {
        en: 'Straight-through patch cables (T568B-to-T568B) interconnecting NIC interfaces to switch ports; Auto-MDI/MDIX handles polarity automatically.',
        id: 'Kabel patch straight-through (T568B ke T568B) menghubungkan host ke port switch; fitur modern Auto-MDIX secara otomatis menyesuaikan polaritas Tx/Rx.',
        jp: '端末とスイッチを直結するストレートケーブル。現代のスイッチはAuto-MDIXにより極性を自動判別。',
        cn: '直通跳线（T568B-T568B）连接终端与接入交换机端口，现代设备内置Auto-MDIX自动纠正极性。'
      }
    }
  ],
  'perangkat-keras-jaringan': [
    {
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Enterprise 24-Port Managed Switch in server rack',
      tag: {
        en: 'Enterprise Layer 2 Managed Switch',
        id: 'Switch Manageable Layer 2 Enterprise',
        jp: 'エンタープライズ L2 マネージドスイッチ',
        cn: '企业级二层网管型汇聚交换机'
      },
      source: 'Unsplash • Photo by Scott Webb (Verified Non-AI)',
      caption: {
        en: 'Layer 2 managed switch processing Ethernet frames at line rate using dedicated ASIC forwarding engines and dynamic CAM address tables.',
        id: 'Switch manageable Layer 2 memproses frame Ethernet dengan kecepatan kabel (wire-speed) menggunakan ASIC dan tabel CAM dinamis.',
        jp: '専用ASICとCAMテーブルにより、ワイヤースピードでMACフレームを高速フォワーディングするL2スイッチ。',
        cn: '搭载专用ASIC芯片与CAM动态转发表的二层交换机，支持线速硬件报文交换与VLAN划分。'
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=1200&q=80',
      alt: 'High-Performance Wi-Fi 6 Gigabit Router with external antennas',
      tag: {
        en: 'Layer 3 Gateway & Multi-Gigabit Router',
        id: 'Router Gateway Layer 3 & Multi-Gigabit',
        jp: 'L3 ゲートウェイルーター & Wi-Fi 6',
        cn: '三层网关路由器与千兆无线覆盖'
      },
      source: 'Unsplash • Photo by Stephen Phillips (Verified Non-AI)',
      caption: {
        en: 'Dual-band Wi-Fi 6 router separating broadcast domains, handling NAT translation, DHCP allocation, and routing packets to WAN uplink.',
        id: 'Router Wi-Fi 6 memisahkan broadcast domain antar VLAN, menjalankan NAT/DHCP, serta mengarahkan paket data ke gerbang internet WAN.',
        jp: 'ブロードキャストドメインを分割し、NAT変換とDHCP配布を担いながらWANへパケットを中継するL3ルーター。',
        cn: '隔离广播风暴、执行NAT网络地址转换与DHCP动态分配，将内网数据包精确路由至WAN上行链路。'
      }
    },
    {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      alt: 'High-speed network transceiver chipset and fiber optic controller board',
      tag: {
        en: 'Serial Console & SFP Optical Transceivers',
        id: 'Port Serial Console & Modul Optik SFP',
        jp: 'シリアルコンソール & SFP 光トランシーバー',
        cn: '串行控制口与SFP高速光纤收发模块'
      },
      source: 'Unsplash • Photo by Alexandre Debiève (Verified Non-AI)',
      caption: {
        en: 'SFP optical transceiver cages supporting 1 Gbps / 10 Gbps fiber uplinks, coupled with RS-232 serial console for out-of-band management.',
        id: 'Slot modular SFP untuk uplink serat optik kecepatan 1G/10G, berdampingan dengan port console RS-232 untuk konfigurasi terminal aman.',
        jp: '1G/10G光回線を収容するSFPケージと、安全な初期設定・復旧を行うRS-232シリアルコンソール。',
        cn: '支持千兆/万兆光纤上联的SFP光模块插槽，搭配独立RS-232串行带外管理接口实现安全配置。'
      }
    }
  ]
};
