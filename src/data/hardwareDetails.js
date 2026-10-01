/**
 * NetVerse - Hardware 3D Deep Technical Specifications & Pedagogical Guides
 * Detailed architecture, port breakdowns, practical lab steps, and troubleshooting.
 */

export const HARDWARE_DETAILS = {
  'switch-manageable': {
    osiLayer: 'Layer 2 (Data Link) / Layer 2+',
    kategoriBadge: {
      id: 'Pusat Distribusi LAN Enterprise',
      en: 'Enterprise LAN Distribution Center',
      jp: 'エンタープライズ LAN 分割・集約',
      cn: '企业级局域网接入与汇聚交换机'
    },
    arsitektur: {
      id: 'Arsitektur Store-and-Forward dengan switching fabric non-blocking berkapasitas 48 Gbps. Dilengkapi packet buffer memory 4.1 Mbit untuk menampung burst traffic tanpa frame drop, serta hardware table CAM berkapasitas 8.000 entri MAC address.',
      en: 'Store-and-forward architecture with a 48 Gbps non-blocking switching fabric. Features 4.1 Mbit packet buffer memory preventing frame drops during burst periods, and an 8K-entry hardware CAM MAC address table.',
      jp: '48Gbpsノンブロッキングスイッチングファブリックによるストア＆フォワード方式。バーストトラフィックを吸収する4.1Mbitパケットバッファと、8,000エントリのハードウェアCAM（MACテーブル）を内蔵。',
      cn: '采用存储转发（Store-and-Forward）线速交换架构，背板无阻塞交换容量达48 Gbps。搭载4.1 Mbit大容量动态包缓存防止突发拥塞丢包，具备8K容量的硬件CAM MAC地址映射表。'
    },
    spesifikasiDetail: [
      { label: { id: 'Kapasitas Switching', en: 'Switching Capacity', jp: 'スイッチング容量', cn: '交换容量' }, value: '48 Gbps Non-Blocking' },
      { label: { id: 'Tingkat Penerusan (Forwarding Rate)', en: 'Packet Forwarding Rate', jp: 'パケット転送レート', cn: '包转发率' }, value: '35.71 Mpps (Million packets/s)' },
      { label: { id: 'Tabel Alamat MAC', en: 'MAC Address Table', jp: 'MACアドレステーブル', cn: 'MAC地址表容量' }, value: '8.000 (8K) Entri Auto-learning' },
      { label: { id: 'Dukungan Standar IEEE', en: 'IEEE Standards', jp: '準拠規格', cn: '遵循网络标准' }, value: 'IEEE 802.3u, 802.3ab, 802.3x, 802.1Q, 802.1D STP, 802.1w RSTP' },
      { label: { id: 'Fitur Manajemen', en: 'Management Interfaces', jp: '管理インターフェース', cn: '设备管理方式' }, value: 'Web GUI HTTPS, CLI Serial Console (RJ-45), Telnet/SSH, SNMP v1/v2c/v3' },
      { label: { id: 'Port Uplink Khusus', en: 'Dedicated Uplink Ports', jp: 'アップリンクポート', cn: '上联端口' }, value: '2x 1.25 Gbps SFP Fiber Optical Slots' },
      { label: { id: 'Konsumsi Daya Maksimal', en: 'Max Power Consumption', jp: '最大消費電力', cn: '最大工作功耗' }, value: '18.4 Watt (Active Energy Saving IEEE 802.3az)' },
      { label: { id: 'MTBF (Ketahanan Operasional)', en: 'MTBF Rating', jp: '平均故障間隔 (MTBF)', cn: '平均无故障运行时间' }, value: '> 500.000 Jam (~57 Tahun nonstop)' }
    ],
    fiturUtama: {
      id: [
        'VLAN 802.1Q: Membagi jaringan fisik menjadi 4.094 segmen virtual terisolasi untuk lab komputer, guru, dan staf.',
        'Spanning Tree Protocol (STP 802.1D & RSTP 802.1w): Mengamankan jaringan dari bahaya broadcast storm akibat kabel looping.',
        'Port Mirroring / SPAN: Menggandakan lalu lintas dari port target ke port penganalisis (Wireshark) untuk investigasi keamanan.',
        'QoS (Quality of Service) 802.1p: Memberi prioritas tinggi untuk paket video streaming edukasi dan audio VoIP agar tidak lag.'
      ],
      en: [
        'IEEE 802.1Q VLANs: Segregates physical infrastructure into up to 4,094 isolated subnets for labs and faculty.',
        'Spanning Tree Protocol (STP/RSTP): Eliminates catastrophic broadcast storms caused by accidental redundant loops.',
        'Port Mirroring / SPAN: Replicates egress/ingress traffic to an analysis workstation running Wireshark.',
        'Hardware QoS 802.1p: Prioritizes latency-sensitive educational video feeds and VoIP packets over file transfers.'
      ],
      jp: [
        'IEEE 802.1Q VLAN: 物理配線を変更せず、最大4094の独立した仮想LANに論理分割可能。',
        'スパニングツリー（STP/RSTP）: 冗長配線時のループを自動検知・遮断し、ブロードキャストストームを未然に防止。',
        'ポートミラーリング: パケットキャプチャ（Wireshark等）用に指定ポートの全トラフィックを複製出力。',
        '802.1p QoS優先度制御: ビデオ授業や音声通話のパケットを優先転送し通信の遅延・ジッターを防止。'
      ],
      cn: [
        '802.1Q VLAN虚拟局域网：支持划分多达4094个隔离子网，严格隔离学生机房与教师办公网络。',
        '生成树协议（STP/RSTP）：毫秒级自动收敛物理冗余拓扑，彻底杜绝意外环路造成的广播风暴瘫痪。',
        '端口镜像（Port Mirroring/SPAN）：将指定端口收发的数据完整克隆到抓包监控端口供Wireshark网络分析。',
        '硬件QoS（802.1p优先级队列）：为实时远程教学视频流与VoIP语音分配最高转发权重，杜绝卡顿丢包。'
      ]
    },
    panduanPraktis: {
      id: 'Langkah Operasional Laboratorium: 1. Pasang switch pada unit rackmount 19 inci dengan sekrup cage-nut M6. 2. Sambungkan port Console ke laptop menggunakan kabel USB-to-RJ45 Serial (115200 baud). 3. Konfigurasikan IP Management (contoh: 192.168.1.254/24). 4. Buat VLAN 10 (Siswa) dan VLAN 20 (Guru). 5. Set port 1-20 sebagai Access Mode VLAN 10, dan port 24 sebagai Trunk Mode 802.1Q menuju Router Gateway.',
      en: 'Field Lab Operational Procedure: 1. Secure switch into 19-inch rack rail using M6 cage nuts. 2. Connect Console port to workstation via USB-to-RJ45 rollover cable (115200 baud). 3. Assign management IP (e.g. 192.168.1.254/24). 4. Provision VLAN 10 (Students) and VLAN 20 (Faculty). 5. Define ports 1-20 as Access Mode on VLAN 10, and port 24 as 802.1Q Trunk towards upstream router.',
      jp: '実習室での運用手順: 1. 19インチラックにM6ケージナットで水平に固定。 2. コンソールポートをPCとUSB-シリアルケーブルで接続（115200bps）。 3. 管理用IP（例: 192.168.1.254/24）を設定。 4. VLAN 10（生徒用）およびVLAN 20（教員用）を作成。 5. 1〜20番ポートをアクセスポート（VLAN 10）に割り当て、24番ポートをルーター接続用トランクに設定。',
      cn: '机房实训上架与调试规范：1. 使用M6浮动螺母将交换机平稳锁固于19英寸机柜导轨。2. 通过USB转RJ-45控制台线连接Console口并打开终端（波特率115200）。3. 配置管理IP（如192.168.1.254/24）。4. 创建VLAN 10（学生）与VLAN 20（教师）。5. 将1-20口设为Access并加入VLAN 10，24口配置为802.1Q Trunk对接上级汇聚路由器。'
    },
    troubleshooting: {
      id: 'Masalah Umum: 1. Lampu Link Oranye Kedip Cepat = Terdeteksi collision atau kabel UTP terkelupas/hanya negosiasi 100 Mbps (periksa pin crimping). 2. Seluruh LED berkedip serentak tanpa henti = Terjadi loop fisik kabel (aktifkan spanning-tree mode rstp). 3. Host tidak dapat ping = Periksa apakah port host berada dalam VLAN yang sama dengan target atau port trunk router telah mengizinkan VLAN tersebut.',
      en: 'Troubleshooting: 1. Amber blinking LED = Duplex mismatch or degraded cable link operating at 100M instead of 1G (validate RJ-45 crimp). 2. All port LEDs flashing synchronously = Loop broadcast storm in progress (enable spanning-tree rstp). 3. Host ping timeout = Verify untagged access VLAN assignment matches target subnet, or router trunk permits tagged VID.',
      jp: 'トラブルシューティング: 1. ポートLEDが橙色で点滅 = 半二重不整合またはケーブル不良による100Mbpsへの速度低下（結線を再確認）。 2. 全ポートが一斉に高速点滅 = ループ発生によるブロードキャストストーム（RSTPを有効化）。 3. Ping不通 = ポートの所属VLAN設定およびトランクのVLAN通過許可を確認。',
      cn: '常见故障排查：1. 端口指示灯呈橙色闪烁 = 双工协商不匹配或网线断芯降速为100M（需检查RJ-45压接质量）。2. 全面板LED指示灯同步狂闪且失联 = 局域网存在物理环路风暴（必须启用STP/RSTP）。3. 主机无法Ping通 = 检查对应端口VLAN所属是否正确，或检查Trunk链路是否允许该VLAN通过。'
    }
  },

  'router-wifi': {
    osiLayer: 'Layer 3 (Network Layer) & Layer 2 Nirkabel (802.11ax)',
    kategoriBadge: {
      id: 'Gerbang Internet & Router Nirkabel Wi-Fi 6',
      en: 'Internet Gateway & Wi-Fi 6 Wireless Router',
      jp: 'インターネットゲートウェイ & Wi-Fi 6 ルーター',
      cn: '互联网网关与Wi-Fi 6双频千兆无线路由器'
    },
    arsitektur: {
      id: 'Ditenagai prosesor dual-core 1.5 GHz dengan memori RAM 256 MB. Mengadopsi arsitektur radio dual-band simultan Wi-Fi 6 (IEEE 802.11ax) dengan modulasi 1024-QAM, teknologi OFDMA multi-klien, dan 4 antena omni-directional berkekuatan tinggi (5 dBi).',
      en: 'Powered by a 1.5 GHz dual-core CPU with 256 MB RAM. Employs simultaneous dual-band Wi-Fi 6 (802.11ax) radio architecture featuring 1024-QAM modulation, multi-client OFDMA sub-carriers, and four 5 dBi high-gain omnidirectional antennas.',
      jp: '1.5GHzデュアルコアCPUと256MB RAMを搭載。1024-QAM高密度変調、マルチユーザーOFDMA、および4本の5dBi高利得無指向性アンテナを備えた同時デュアルバンドWi-Fi 6アーキテクチャ。',
      cn: '搭载1.5 GHz双核高速处理器与256 MB运存。采用同步双频Wi-Fi 6（802.11ax）射频架构，配备1024-QAM超高阶调制解调技术、OFDMA多设备并发子载波及4根5 dBi高增益全向天线。'
    },
    spesifikasiDetail: [
      { label: { id: 'Kecepatan Nirkabel 5 GHz', en: '5 GHz Wireless Throughput', jp: '5GHz 無線通信速度', cn: '5 GHz 无线速率' }, value: '1201 Mbps (802.11ax, 80 MHz, 2x2 MIMO)' },
      { label: { id: 'Kecepatan Nirkabel 2.4 GHz', en: '2.4 GHz Wireless Throughput', jp: '2.4GHz 無線通信速度', cn: '2.4 GHz 无线速率' }, value: '574 Mbps (802.11ax, 40 MHz, 2x2 MIMO)' },
      { label: { id: 'Port WAN Fisik', en: 'WAN Uplink Interface', jp: 'WANインターフェース', cn: 'WAN上联接口' }, value: '1x RJ-45 Gigabit 10/100/1000 Mbps (Warna Biru)' },
      { label: { id: 'Port LAN Fisik', en: 'LAN Switch Interfaces', jp: 'LANインターフェース', cn: 'LAN千兆接口' }, value: '4x RJ-45 Gigabit 10/100/1000 Mbps (Warna Kuning)' },
      { label: { id: 'Protokol Keamanan Nirkabel', en: 'Security Encryption', jp: 'セキュリティ暗号化', cn: '无线安全加密' }, value: 'WPA3-Personal, WPA2-Enterprise, SPI Firewall, DoS Protection' },
      { label: { id: 'Teknologi Antena', en: 'Antenna Array', jp: 'アンテナ仕様', cn: '天线规格' }, value: '4x Fixed High-Gain Omnidirectional Antennas (Beamforming)' },
      { label: { id: 'Layanan Jaringan Terintegrasi', en: 'Integrated Network Services', jp: '内蔵ネットワーク機能', cn: '内置网络服务' }, value: 'DHCP Server, NAT/NAPT, Port Forwarding, DDNS, VPN Passthrough' },
      { label: { id: 'Konsumsi Daya Operasional', en: 'Operating Power Draw', jp: '動作電力', cn: '运行电源功耗' }, value: 'DC 12V / 1.5A (~12 Watt)' }
    ],
    fiturUtama: {
      id: [
        'OFDMA (Orthogonal Frequency Division Multiple Access): Memecah kanal menjadi unit-unit frekuensi kecil sehingga dapat berkomunikasi dengan 10+ ponsel/laptop secara simultan tanpa antrean.',
        'Beamforming Technology: Memfokuskan sinyal radio langsung ke arah posisi laptop siswa untuk jangkauan sinyal yang lebih kuat dan stabil.',
        'WPA3 Next-Gen Security: Protokol enkripsi terbaru yang melindungi jaringan nirkabel dari serangan brute-force dictionary attack.',
        'Target Wake Time (TWT): Mengatur jadwal transmisi perangkat sehingga baterai ponsel atau laptop siswa jauh lebih hemat.'
      ],
      en: [
        'OFDMA Sub-channeling: Slices wireless channels into granular Resource Units (RUs) to serve multiple devices concurrently without queue latency.',
        'Intelligent Beamforming: Focuses radio RF energy directly toward the spatial coordinates of connected student laptops.',
        'WPA3 Robust Security: Modern cryptographic handshake immune to offline dictionary and brute-force eavesdropping attacks.',
        'Target Wake Time (TWT): Negotiates sleep-wake cycles with clients, dramatically conserving mobile device battery life.'
      ],
      jp: [
        'OFDMA技術: 周波数帯を細分化し、教室内の多数のスマホ・PCと同時に双方向通信を行って混雑を解消。',
        'ビームフォーミング: 電波を全方位に散らさず、端末の存在する方向へ集中的に放射して安定通信を実現。',
        'WPA3最新セキュリティ: 強固な暗号化ハンドシェイクにより、辞書攻撃やパスワード推測攻撃を防御。',
        'TWT（ターゲットウェイクタイム）: 端末の通信待機時間を同期制御し、生徒端末のバッテリー消費を大幅削減。'
      ],
      cn: [
        'OFDMA多设备并发调度：将信道划分为多个资源单元（RU），单次信标同时与十余台终端并行交互，消灭排队延迟。',
        'Beamforming波束成形技术：智能计算终端空间相位，将无线射频电磁波集中指向学生设备，显著提升边缘穿墙信号。',
        'WPA3新一代高强加密：采用更具抗破解强度的对等实体认证（SAE），彻底免疫传统字典嗅探与暴力破解。',
        'TWT目标唤醒时间：智能协同终端休眠与唤醒周期，大幅延长机房平板与学生笔记本电池续航。'
      ]
    },
    panduanPraktis: {
      id: 'Langkah Instalasi Gateway: 1. Sambungkan modem ISP ke Port WAN (biru) dengan kabel UTP Cat 6 straight. 2. Hubungkan Port LAN 1 (kuning) ke Switch Manageable untuk mendistribusikan internet ke seluruh lab. 3. Masuk ke halaman admin router (192.168.0.1) via browser. 4. Konfigurasi SSID lab (contoh: "Lab_TKJ_NetVerse_5G") dengan kata sandi WPA3. 5. Tentukan DHCP IP Pool (192.168.0.100 s/d 192.168.0.250).',
      en: 'Gateway Deployment: 1. Connect broadband ONT to Blue WAN port via Cat 6 straight cable. 2. Patch Yellow LAN 1 into core switch. 3. Navigate to admin console (192.168.0.1) in web browser. 4. Broadcast dedicated SSID (e.g. "NetVerse_Lab_5G") using WPA3 security. 5. Configure DHCP address pool (192.168.0.100 - 192.168.0.250).',
      jp: '設置・設定手順: 1. 光回線ONUを青色のWANポートへCat 6ケーブルで接続。 2. 黄色のLAN 1ポートから主幹スイッチへ配線。 3. ブラウザから管理画面（192.168.0.1）を開く。 4. SSID（例: "Lab_NetVerse_5G"）とWPA3パスワードを設定。 5. DHCP配布範囲（192.168.0.100〜192.168.0.250）を指定。',
      cn: '网关实训部署指南：1. 使用Cat 6标准直通跳线将光猫连接至蓝色千兆WAN口。2. 用黄色LAN 1口跳接至机房核心交换机。3. 在PC端通过浏览器访问网关地址（192.168.0.1）。4. 配置独立SSID（如"NetVerse_Lab_5G"）并开启WPA3-Personal加密。5. 规划DHCP动态地址池（192.168.0.100 - 192.168.0.250）。'
    },
    troubleshooting: {
      id: 'Masalah Umum: 1. Lampu Internet Oranye Tetap Menyala = Port WAN tidak mendapatkan alamat IP dari ISP (periksa kabel WAN atau status DHCP client). 2. Konflik IP Subnet = Jika modem ISP juga menggunakan 192.168.1.1, ubah LAN IP router menjadi 192.168.10.1 agar tidak terjadi IP overlap. 3. Koneksi sering putus di 2.4 GHz = Terjadi interferensi microwave atau frekuensi padat, alihkan perangkat ke kanal 5 GHz yang lebih lengang.',
      en: 'Troubleshooting: 1. Solid Amber Internet LED = WAN port failed to receive IP from upstream gateway (check WAN link or DHCP client mode). 2. Subnet IP overlap = If upstream ISP ONT uses 192.168.1.1, change router LAN subnet to 192.168.10.1/24. 3. Severe 2.4 GHz packet drop = Heavy RF noise; migrate workstations to high-throughput 5 GHz band.',
      jp: 'トラブルシューティング: 1. Internetランプが橙色点灯 = WAN側でIPが取得できていません（ONU接続またはPPPoE/DHCP設定を確認）。 2. サブネット競合 = ONU側も192.168.1.1の場合、ルーターのLAN側IPを192.168.10.1等に変更して重複を解消。 3. 2.4GHzの頻繁な切断 = 電波干渉が原因のため、端末を5GHz帯へ誘導。',
      cn: '常见故障排查：1. 互联网指示灯常亮橙色 = WAN口未能从光猫获取IP（需核查WAN连接线或拨号/动态DHCP模式）。2. IP网段冲突 = 上级光猫网段同为192.168.1.1时，必须将路由器LAN修改为192.168.10.1以消除掩码重叠。3. 2.4G频段频繁掉线 = 存在微波炉或同频严重干扰，应引导终端接入纯净高速的5G频段。'
    }
  },

  'crimping-tool': {
    osiLayer: 'Layer 1 (Physical Layer Equipment)',
    kategoriBadge: {
      id: 'Peralatan Presisi Terminasi Kabel LAN',
      en: 'Precision Network Termination Hand Tool',
      jp: 'LANケーブル 精密圧着・成端専用工具',
      cn: '高碳钢多功能棘轮式网络线缆压接钳'
    },
    arsitektur: {
      id: 'Dibuat dari baja perkakas karbon tinggi (High-Carbon Hardened Steel) dengan mekanisme ratchet bergigi presisi. Dilengkapi cetakan pres 8P8C untuk konektor RJ-45, cetakan 6P4C/6P6C untuk RJ-11 telepon, pisau pengupas jaket kabel terkalibrasi, dan bilah pemotong kawat rata.',
      en: 'Forged from hardened high-carbon steel with a precision ratcheting stroke mechanism. Equipped with dual 8P8C (RJ-45) and 6P4C/6P6C (RJ-11) crimping dies, a calibrated outer jacket stripper notch, and a heavy-duty flush wire cutter blade.',
      jp: '高硬度炭素鋼を採用し、精密ラチェット機構を搭載。RJ-45用の8P8Cダイス、電話用の6Pダイス、外被ストリッパー刃、および芯線を均等に切断するフラッシュカッターを一体化。',
      cn: '采用高碳合金工具钢精铸而成，内置省力棘轮连动结构。集成了用于RJ-45的8P8C压模口、RJ-11的6P模口、外护套定深剥线刀刃及水平齐平剪线刀片。'
    },
    spesifikasiDetail: [
      { label: { id: 'Material Rangka', en: 'Frame Material', jp: '本体材質', cn: '钳体材质' }, value: 'High-Carbon Cold-Rolled Tool Steel' },
      { label: { id: 'Mekanisme Penguncian', en: 'Locking Mechanism', jp: 'ラチェット機構', cn: '手柄锁止机制' }, value: 'Full-Cycle Ratchet Release (Mencegah kendor sebelum pres penuh)' },
      { label: { id: 'Kavitas Cetakan Konektor', en: 'Connector Cavities', jp: '対応コネクタ', cn: '支持压接接头' }, value: '8P8C (RJ-45 Cat 5e/Cat 6) & 6P6C/6P4C (RJ-11/RJ-12)' },
      { label: { id: 'Fitur Pemotong & Pengupas', en: 'Cutting & Stripping', jp: '切断・皮剥き機能', cn: '裁线与剥皮结构' }, value: 'Integrated Flush Cutters & Round Cable Stripper' },
      { label: { id: 'Material Pegangan', en: 'Handle Grip', jp: 'グリップ素材', cn: '把手包裹材料' }, value: 'Ergonomic Non-Slip TPR (Thermoplastic Rubber)' },
      { label: { id: 'Toleransi Gigi Pres', en: 'Die Tooth Tolerance', jp: 'ダイス加工精度', cn: '压接齿距公差' }, value: '± 0.02 mm (Standar TIA-968-A)' }
    ],
    fiturUtama: {
      id: [
        'Mata Pres Gigi Tembaga 8P: Menekan 8 bilah kontak emas pada konektor RJ-45 agar menembus jaket insulasi kawat tembaga secara serentak.',
        'Mekanisme Ratchet: Menjamin tuas tidak bisa dibuka sebelum penekanan mencapai kedalaman sempurna, mencegah sambungan kendor.',
        'Pisau Stripper Terkalibrasi: Mengupas kulit luar kabel UTP tanpa melukai lapisan insulasi tipis kawat tembaga di dalamnya.',
        'Klip Penjepit Pengaman (Strain Relief Wedge): Menekan baji plastik konektor agar mengunci kuat kulit luar kabel UTP.'
      ],
      en: [
        '8P Precision Drive Teeth: Simultaneously drives all 8 gold contacts through conductor jackets into the copper cores.',
        'Full-Stroke Ratchet: Prevents tool release until full terminal insertion depth is reached, guaranteeing consistent contact pressure.',
        'Calibrated Jacket Stripper: Strips outer PVC sheath cleanly without nicking delicate interior conductor insulation.',
        'Strain Relief Wedge Driver: Compresses the internal plug wedge over the cable jacket for robust pull-out resistance.'
      ],
      jp: [
        '8P8C精密圧着歯: RJ-45の8本の金メッキ端子を均一に押し込み、芯線被覆を正確に貫通させて導通を確立。',
        'ラチェット機構: 規定の深さまで完全に握り込まないと開かない安全構造で、圧着不足による接触不良を撲滅。',
        '専用ストリッパー刃: 芯線の絶縁体を傷つけることなく、外側のPVCジャケットのみを綺麗に剥離。',
        'ストレインリリーフ固定ウェッジ: コネクタの樹脂爪をケーブル外被に強力に食い込ませ、抜け落ちを防止。'
      ],
      cn: [
        '8P高精顶针齿模：同步将RJ-45水晶头的8个镀金铜片精准压入绝缘层，与铜导体紧密刺破咬合。',
        '省力自锁棘轮机制：未彻底压接到底之前把手绝不回弹解锁，从物理上杜绝虚接与压接不实缺陷。',
        '定深旋转剥线刃口：只剥除外层PVC绝缘保护皮，绝不伤及内部8根彩色导线的薄绝缘层。',
        '防拉固定块压入槽：将水晶头后部的塑料楔形卡扣深压在线缆外皮上，形成极强的抗拉扯应力消除。'
      ]
    },
    panduanPraktis: {
      id: 'Langkah Praktik Standar Industri: 1. Masukkan kabel UTP ke lubang pengupas tang crimping, putar 1 kali, tarik jaket luar sepanjang 2.5 cm. 2. Buka lilitan kawat dan luruskan secara sejajar. 3. Susun urutan warna T568B: Putih-Oranye, Oranye, Putih-Hijau, Biru, Putih-Biru, Hijau, Putih-Cokelat, Cokelat. 4. Potong kawat menggunakan pisau pemotong tang crimping hingga rata tersisa 1.2 cm. 5. Dorong kawat ke dalam soket RJ-45 hingga semua ujung tembaga mentok ke kaca depan konektor. 6. Masukkan konektor ke lubang 8P tang crimping dan tekan kuat hingga ratchet berbunyi "klik".',
      en: 'SOP Termination Procedure: 1. Insert cable into stripper notch, rotate once, strip 2.5cm of outer jacket. 2. Untwist and straighten wire cores. 3. Sequence to T568B: WO, O, WG, B, WB, G, WBr, Br. 4. Trim flush with cutter blade to exactly 1.2cm. 5. Slide wires into RJ-45 plug until conductors hit the front face. 6. Insert into 8P die and squeeze handle firmly until ratchet clicks.',
      jp: '標準圧着作業手順: 1. ストリッパー穴にケーブルを挟み1回転させて外被を約2.5cm剥離。 2. 芯線の撚りを解き真っ直ぐ伸ばす。 3. T568B（白橙・橙・白緑・青・白青・緑・白茶・茶）の順に整線。 4. カッター部で長さを揃えて約1.2cmに水平切断。 5. RJ-45コネクタの最奥部まで芯線を確実に押し込む。 6. 圧着工具の8P穴に挿入し、ラチェットが解除されるまでしっかり握り込む。',
      cn: '标准压接工艺SOP：1. 将双绞线放入剥线刀口轻轻旋转一圈，剥除外护套2.5厘米。2. 解开各对导线并逐一捋直理顺。3. 严格按T568B线序排列：白橙、橙、白绿、蓝、白蓝、绿、白棕、棕。4. 用压线钳剪刀口水平齐平裁切，导线裸露长度精确保留1.2厘米。5. 将线芯平推入RJ-45水晶头直至8根铜芯完全顶到前端顶面。6. 插入8P压线槽，双手均匀用力握紧手柄直至棘轮发出解锁声。'
    },
    troubleshooting: {
      id: 'Masalah Umum: 1. Kabel terlepas dari konektor = Jaket luar kabel tidak masuk ke dalam badan konektor saat di-crimp sehingga baji penahan regangan tidak terjepit. 2. Pin 1 atau Pin 8 tidak terhubung = Kawat dipotong miring sehingga ujung tembaga paling luar tidak menyentuh pin emas depan. 3. Tang terasa macet = Lepaskan tuas darurat kecil di pangkal pegangan (ratchet release pin).',
      en: 'Troubleshooting: 1. Cable pulls loose = Outer jacket was not inserted far enough under the internal wedge before crimping. 2. Pin 1 or 8 open circuit = Uneven cut caused outer conductors to fall short of front contacts. 3. Tool locked shut = Engage the manual emergency release toggle near the inner pivot.',
      jp: 'トラブルシューティング: 1. ケーブルが抜ける = 外被がコネクタ内部まで達しておらず、固定ウェッジが外被を挟んでいない。 2. 1番または8番ピンの導通不良 = 切断が斜めになり外側の芯線が奥まで届いていない。 3. 工具が開かなくなった = ハンドル内側の緊急解除レバー（ラチェット解除）を操作。',
      cn: '常见故障排查：1. 网线轻易被拔出脱落 = 剥线过长，外护套未推入水晶头夹线槽内部导致抗拉卡扣未咬住外皮。2. 第1或第8引脚断路 = 剪线时切口倾斜，边缘铜芯未推到底与前端铜片接触。3. 压线钳卡住无法复位 = 拨动手柄内侧的紧急脱扣拨片（Emergency Release）即可强制弹开。'
    }
  },

  'konektor-rj45': {
    osiLayer: 'Layer 1 (Physical Connector Standard TIA-968-A)',
    kategoriBadge: {
      id: 'Konektor Modular 8P8C & Kabel UTP Cat 6',
      en: '8P8C Modular Connector & Cat 6 UTP Cable',
      jp: '8P8C モジュラープラグ & Cat 6 UTPケーブル',
      cn: '8P8C镀金以太网水晶头与超六类高频双绞线'
    },
    arsitektur: {
      id: 'Konektor modular berstandar 8P8C (8 Position, 8 Contact) dengan perumahan polikarbonat transparan kelas optik dan pin kontak fosfor-perunggu berlapis emas 50 mikron. Dipadukan dengan kabel UTP Category 6 dengan penyekat silang tengah (cross-filler spline) berkapasitas frekuensi 250 MHz.',
      en: '8P8C (8 Position, 8 Contact) modular interface manufactured from optical-grade polycarbonate with 50-micron gold-plated phosphor bronze contacts. Paired with Cat 6 UTP featuring an internal cross-filler separator spline rated up to 250 MHz.',
      jp: '光学的透明度を持つポリカーボネート樹脂と50マイクロインチ金メッキリン青銅端子で構成された8P8Cモジュラーコネクタ。中心に十字セパレータ（十字介在）を持つ250MHz対応Cat 6 UTPケーブル。',
      cn: '符合TIA-968-A标准的8P8C工业级水晶头，外壳采用阻燃高透聚碳酸酯（PC），内部触点为50微英寸厚镀金磷青铜接触片。线缆配套内置“十字骨架（Cross-filler）”物理分隔的250 MHz超六类高频网线。'
    },
    spesifikasiDetail: [
      { label: { id: 'Format Konektor', en: 'Connector Format', jp: 'コネクタ規格', cn: '接口标准类型' }, value: 'RJ-45 (8P8C) Modular Plug IEC 60603-7' },
      { label: { id: 'Lapisan Kontak Pin', en: 'Contact Plating', jp: '接点メッキ', cn: '引脚触点镀层' }, value: '50 µ-inch Pure Gold over Phosphor Bronze (Anti-Oksidasi)' },
      { label: { id: 'Kategori Kabel', en: 'Cable Category', jp: 'ケーブルカテゴリ', cn: '支持线缆规格' }, value: 'UTP Category 6 (250 MHz) & Category 5e (100 MHz)' },
      { label: { id: 'Diameter Kawat Konduktor', en: 'Conductor Gauge', jp: '芯線導体径', cn: '适用线芯线规' }, value: '23 AWG Solid Copper / 24 AWG Stranded' },
      { label: { id: 'Resistansi Kontak Maksimal', en: 'Contact Resistance', jp: '接触抵抗', cn: '端子接触阻抗' }, value: '< 20 mΩ (Mili-Ohm)' },
      { label: { id: 'Daya Tahan Sambungan', en: 'Mating Durability', jp: '挿抜耐久回数', cn: '插拔使用寿命' }, value: '> 1.000 Siklus Colok-Cabut Tanpa Penurunan Sinyal' }
    ],
    fiturUtama: {
      id: [
        'Gold Plating 50µ: Melindungi kontak dari korosi oksidasi udara serta menjamin transfer sinyal data gigabit dengan hambatan ultra-rendah.',
        'Klip Pengunci Fleksibel (Locking Latch): Memastikan konektor terkunci kokoh pada soket switch dan tidak akan lepas karena getaran.',
        'Cross-Filler Spline (Pada Cat 6): Penyekat plastik berbentuk silang di dalam kabel yang memisahkan 4 pasang kawat agar terbebas dari Near-End Crosstalk (NEXT).',
        'Strain Relief Boot: Selongsong karet pelindung yang mencegah kabel tertekuk tajam melebihi batas radius tekuk 4x diameter kabel.'
      ],
      en: [
        '50µ Gold Contacts: Prevents galvanic oxidation while assuring low-resistance gigabit data transfer.',
        'Resilient Locking Clip: Secures the plug into switch jacks against vibration and accidental dislodging.',
        'Internal Cross-Filler Spline: Continuous plastic cruciform core isolating all 4 wire pairs to mitigate NEXT.',
        'Protective Snagless Boot: Prevents sharp bends exceeding the 4x cable outer-diameter minimum bend radius.'
      ],
      jp: [
        '50マイクロインチ金メッキ: 経年劣化による酸化・腐食を防止し、極めて低い接触抵抗で安定したギガビット伝送を維持。',
        '高耐久ラッチ（ツメ）: スイッチのポートにカチッと確実にロックし、振動による意図しない脱落を防止。',
        'Cat 6十字介在: 内部の十字型プラスチックセパレータが4つのペア線を物理的に隔離し、ペア間ノイズ（NEXT）を大幅低減。',
        '保護ブーツ: 許容曲げ半径（外径の4倍以上）を超えて急峻に折れ曲がるのを防ぐ保護ゴムカバー。'
      ],
      cn: [
        '50微英寸厚镀金触点：彻底隔绝空气氧化锈蚀，提供低于20毫欧的极低接触电阻，保障千兆高速信号无损通过。',
        '高韧性按压防折弹片：与设备端口母座卡扣严密咬合，防止在机房日常维护振动中松脱或意外断连。',
        '内置十字骨架隔离条：在双绞线轴心物理隔绝4个绞对，有效压制高频运行时的内部近端串扰（NEXT）。',
        '抗拉防折护套保护套（Boot）：缓冲机械应力，确保跳线不会超过线缆外径4倍的最小极限弯曲半径。'
      ]
    },
    panduanPraktis: {
      id: 'Tips Praktis Pemasangan: 1. Jangan membuka pilinan kawat melebihi 1.2 cm (0.5 inci) untuk mempertahankan efektivitas isolasi crosstalk. 2. Pastikan urutan kawat dilihat dari sisi tembaga konektor menghadap ke atas (Pin 1 berada di sebelah kiri). 3. Kawat harus dipotong benar-benar rata 90 derajat agar seluruh ujung kawat bersentuhan penuh dengan pin emas.',
      en: 'Field Best Practices: 1. Never untwist pairs beyond 1.2cm (0.5 inch) to preserve high-frequency cancellation. 2. Verify wire sequencing with the plug copper contacts facing up (Pin 1 is leftmost). 3. Cut wire ends cleanly at a 90-degree angle so all conductors seat fully against the front bulkhead.',
      jp: '現場施工の鉄則: 1. 芯線の撚り戻しは1.2cm（約0.5インチ）以内に抑え、ノイズ耐性を維持すること。 2. コネクタの金端子面を手前に向けた時、左端が1番ピンとなる配列であることを必ず確認。 3. 8本の芯線を直角（90度）に均一に切断し、コネクタ先端に確実に接触させること。',
      cn: '关键施工工艺要领：1. 严禁解绞长度超过1.2厘米（半英寸），以完整维持双绞电磁抵消特性。2. 校验线序时，将水晶头金属弹片朝上面向自己，此时最左侧引脚定义为第1引脚。3. 剪切8芯线头必须保持90度绝对平齐，确保推到底时每根铜芯均紧贴水晶头顶端。'
    },
    troubleshooting: {
      id: 'Masalah Umum: 1. Koneksi hanya 100 Mbps di port Gigabit = Salah satu kawat pin 4, 5, 7, atau 8 tidak menancap sempurna ke pin emas konektor. 2. Klip pengunci patah = Gunakan konektor dengan boot pelindung "snagless" agar klip tidak tersangkut saat ditarik di antara kabel lain.',
      en: 'Troubleshooting: 1. Gigabit link negotiates at only 100 Mbps = Faulty contact on pins 4, 5, 7, or 8 (all 8 wires required for 1000BASE-T). 2. Broken latch clip = Always use snagless protective boots to prevent tabs from snapping when pulled through cable bundles.',
      jp: 'トラブルシューティング: 1. ギガビット対応ポートで100Mbpsしか出ない = 4, 5, 7, 8番ピンのいずれかが接触不良（1Gbps通信には8本全芯線が必須）。 2. ラッチのツメ折れ = 配線引き回し時にツメが引っかからないようツメ折れ防止ブーツを採用すること。',
      cn: '常见故障排查：1. 千兆接口协商降速为百兆（100M） = 检查4/5/7/8号引脚触点，千兆以太网必须依赖全部8芯全通。2. 水晶头塑料弹片折断 = 更换带防拉保护套（Snagless）的水晶头，防止在密集束线拖拽时卡断。'
    }
  },

  'server-rack': {
    osiLayer: 'Infrastruktur Fisik Data Center (EIA-310-D)',
    kategoriBadge: {
      id: 'Rak Enclosure Standar 19 Inci Enterprise',
      en: 'Enterprise 19-Inch Equipment Enclosure',
      jp: 'エンタープライズ 19インチ サーバーラック',
      cn: '19英寸标准数据中心机房机架与设备机柜'
    },
    arsitektur: {
      id: 'Rangka baja padat berstandar EIA-310-D / IEC 60297 dengan lebar interior 19 inci (482.6 mm). Dilengkapi pintu jaring heksagonal (perforated mesh) dengan rasio ventilasi aliran udara 75%+, rel vertikal berlubang persegi dengan penanda unit U terukir laser, serta kapasitas beban statis hingga 1.000 kg.',
      en: 'Standard EIA-310-D / IEC 60297 steel enclosure featuring a standardized 19-inch (482.6 mm) interior mounting span. Boasts 75%+ hexagonal mesh ventilation airflow ratio, laser-etched vertical mounting rails with square cage-nut slots, and a static load rating of 1,000 kg.',
      jp: 'EIA-310-D規格に準拠した19インチ（482.6mm）幅の堅牢なスチール製筐体。開口率75%以上のハニカムメッシュドアによる高効率エアフロー、M6ケージナット用のレーザー刻印付きレール、静止耐荷重1,000kgを備える。',
      cn: '符合EIA-310-D与IEC 60297国际标准的重型冷轧钢机柜，标准内宽19英寸（482.6毫米）。前后门采用通风率达75%以上的高密蜂窝网孔门，垂直立柱激光雕刻U数标尺配M6方形孔，静态承重高达1000公斤。'
    },
    spesifikasiDetail: [
      { label: { id: 'Tinggi Satuan Unit (U)', en: 'Rack Unit Height (U)', jp: 'ラックユニット (U)', cn: '单机架高度单位 (U)' }, value: '1U = 1.75 Inci (44.45 mm)' },
      { label: { id: 'Lebar Standar Pemasangan', en: 'Mounting Width Span', jp: 'マウント有効幅', cn: '标准安装跨距' }, value: '19 Inci (482.6 mm) Antar Rel' },
      { label: { id: 'Kapasitas Beban Statis', en: 'Static Weight Capacity', jp: '静止耐荷重', cn: '静态额定承重' }, value: '1.000 kg (1 Ton Peralatan Server)' },
      { label: { id: 'Rasio Ventilasi Pintu', en: 'Door Ventilation Ratio', jp: 'ドア通気口開口率', cn: '网孔门通风率' }, value: '> 75% Hexagonal Perforated Mesh' },
      { label: { id: 'Sistem Pentanahan Listrik', en: 'Grounding Busbar', jp: '接地（アース）機構', cn: '防静电接地母排' }, value: 'Copper Grounding Bar integrated to main earth' },
      { label: { id: 'Kedalaman Rel Internal', en: 'Adjustable Rail Depth', jp: 'マウント有効奥行', cn: '立柱可调安装深度' }, value: '600 mm s/d 1000 mm (Dapat disesuaikan)' }
    ],
    fiturUtama: {
      id: [
        'Organisasi Sentral 19": Mengumpulkan router, switch, firewall, server, dan patch panel dalam satu lemari terkunci yang aman.',
        'Desain Termal Hot-Aisle / Cold-Aisle: Aliran udara dingin dihisap dari depan rack (lorong dingin) dan dibuang ke belakang rack (lorong panas).',
        'Pentanahan Statis (Earthing Bar): Menghubungkan bodi seluruh switch dan server ke tanah untuk membuang listrik statis dan melindungi hardware.',
        'Manajemen Kabel Vertikal & Horizontal: Kanal perapi kabel (cable duct) yang menjaga kerapian dan mencegah kabel tertarik putus.'
      ],
      en: [
        'Centralized 19-Inch Enclosure: Consolidates distribution switches, edge routers, enterprise servers, and patch panels safely under lock.',
        'Hot-Aisle / Cold-Aisle Thermal Flow: Intakes air through cold front aisles (20-22°C) and exhausts heat out rear perforated panels.',
        'Systemic Grounding Busbar: Drains chassis electrostatic discharge (ESD) and ground loops safely to the facility earth ground.',
        'Vertical/Horizontal Cable Organizers: Cable raceways and D-rings preventing cable stress and airflow blockages.'
      ],
      jp: [
        '集中マウント管理: スイッチ、ルーター、サーバー、パッチパネルを1台の施錠可能な耐震ラックに整然と収容。',
        'コールドアイル／ホットアイル設計: 前面の冷気エリアから吸気し、後方の排熱エリアへ効率よく熱を排出する冷却構造。',
        '静電気接地（アースバー）: 各機器のフレームグランドを統合接地し、静電気破壊（ESD）や漏電から機材を保護。',
        'ケーブルマネジメント: 縦横のケーブルダクトにより、配線の整理と通気路の確保、ケーブルへの負荷分散を実現。',
      ],
      cn: [
        '19英寸集约收纳：将核心交换机、企业路由器、机架式服务器及配线架集中锁入安全机柜中统一运维。',
        '冷热通道隔离散热：遵循前冷后热（Cold-Aisle/Hot-Aisle）工业气流循环，冷风前吸后部高温强排。',
        '整体铜排防静电接地：将所有设备外壳静电与浪涌泄放到大地接地极，彻底保护芯片免受ESD静电击穿。',
        '立体理线环与走线槽：横向理线架与纵向走线通道确保成百上千根跳线井然有序，保障通风道畅通。'
      ]
    },
    panduanPraktis: {
      id: 'Aturan Pemasangan di Data Center: 1. Pasang perangkat berat (UPS baterai dan Storage Server) di bagian paling bawah (U1 - U8) untuk menurunkan titik berat gravitasi agar rak tidak mudah roboh saat gempa. 2. Pasang Patch Panel dan Switch di bagian tengah (U20 - U25) agar panjang kabel jumper ke server atas dan bawah tetap efisien dan pendek. 3. Pasang PDU (Power Distribution Unit) vertikal di sisi samping belakang.',
      en: 'Data Center Best Practices: 1. Heavy items (UPS battery banks and storage arrays) must be mounted at the lowest positions (U1-U8) to maintain a low center of gravity against seismic tipping. 2. Mount Patch Panels and Core Switches in the middle tiers (U20-U25) to equalize jumper lengths up and down. 3. Install vertical PDUs along the rear cable brackets.',
      jp: 'データセンター設置基準: 1. 重い機器（UPS無停電電源装置やストレージ）は最下段（U1〜U8）に配置して重心を下げ、地震時の転倒を防止。 2. パッチパネルとスイッチは中央段（U20〜U25）に設置し、上下の機器への配線距離を最短・均等化。 3. PDU（電源タップ）は背面の垂直スペースに設置。',
      cn: '机柜设备布局工业级规范：1. 最重的设备（大容量UPS蓄电池组、存储磁盘阵列）必须安装在机柜最底层（1U-8U），降低重心防倾覆。2. 配线架与汇聚交换机应布置在机柜中段黄金区域（20U-25U），使上下跳线长度最短对称。3. 垂直PDU电源分配单元布置在机柜后侧立柱旁。'
    },
    troubleshooting: {
      id: 'Masalah Umum: 1. Server overheat = Pintu rak terhalang tumpukan kabel yang tidak terorganisir (gunakan kabel ducting horizontal). 2. Suara getaran keras = Cage nut pada rel tidak dikencangkan sempurna dengan obeng torsi.',
      en: 'Troubleshooting: 1. Server thermal alarms = Dense unmanaged cable bundles obstructing rear mesh door airflow (install horizontal organizers). 2. Loud harmonic vibration = Cage nuts loosened on vertical rails; torque-tighten all M6 fasteners.',
      jp: 'トラブルシューティング: 1. サーバーの熱暴走 = 乱雑な配線束が通気を塞いでいる（水平ケーブルマネージャーで整線）。 2. 異音・共振 = レールのケージナットの締め付け不足。',
      cn: '常见故障排查：1. 服务器过温报警 = 背板杂乱跳线堵死排风网孔（必须加装理线器梳理）。2. 机柜共振噪音大 = 检查M6浮动螺母是否未旋紧到位，调整前后脚杯水平度。'
    }
  },

  'lan-tester': {
    osiLayer: 'Layer 1 (Physical Layer Diagnostics)',
    kategoriBadge: {
      id: 'Alat Uji Kontinuitas & Polaritas Kabel Jaringan',
      en: 'Network Continuity & Polarity Diagnostic Meter',
      jp: 'LANケーブル 導通・極性・結線診断テスター',
      cn: '数字式双绞线导通寻线与线序极性故障诊断仪'
    },
    arsitektur: {
      id: 'Instrumen diagnostik elektronik dengan dua modul terpisah: Unit Master (pembangkit pulsa sinyal sekuensial) dan Unit Remote (terminator pembaca loop). Memiliki pengatur kecepatan pemindaian (Normal dan Slow Scan) dengan 8 indikator LED pin plus LED Ground (G).',
      en: 'Dual-module electronic diagnostic tester consisting of a Master pulsed transmitter and a Remote loop-back terminator. Features a dual-speed clock scanner (Normal & Slow Scan) with 8 discrete pin LEDs plus an auxiliary Ground (G) shield LED.',
      jp: 'マスター親機（順次パルス信号発生回路）とリモート子機（受信LED回路）のセパレート構造。通常速度およびスロー（Slow）切り替えスイッチを備え、1〜8番ピン＋シールドG用LEDランプを搭載。',
      cn: '分体式结构的网络检测仪表，包含主发射机（生成周期性步进电脉冲）与远端接收回路。具备快速/慢速（S档）两档时钟扫描模式，拥有8颗独立双绞线引脚LED灯及1颗金属屏蔽层（G）检测灯。'
    },
    spesifikasiDetail: [
      { label: { id: 'Tipe Kabel yang Didukung', en: 'Supported Cable Types', jp: '対応ケーブル規格', cn: '支持检测线缆' }, value: 'RJ-45 (UTP / STP Cat 5e, 6, 6A) & RJ-11/12 (Telepon)' },
      { label: { id: 'Kecepatan Pindai (Scan Speed)', en: 'Scanning Clock Rates', jp: 'スキャン速度切替', cn: '扫描时钟频率' }, value: 'Normal Scan (~1 Hz) & Slow Scan (~0.5 Hz untuk visual detail)' },
      { label: { id: 'Deteksi Jenis Kerusakan', en: 'Fault Detection Modes', jp: '検出可能障害', cn: '可诊断物理故障' }, value: 'Open Circuit (Putus), Short Circuit (Korsleting), Crossed (Silang), Reversed (Terbalik)' },
      { label: { id: 'Catu Daya Operasional', en: 'Power Source', jp: '電源仕様', cn: '供电电池规格' }, value: 'Baterai Kotak 9V 6F22 / Alkaline' },
      { label: { id: 'Jarak Pengujian Maksimal', en: 'Max Test Distance', jp: '最大測定ケーブル長', cn: '最大有效测试长度' }, value: 'Hingga 300 Meter Jalur Kabel Horizontal' }
    ],
    fiturUtama: {
      id: [
        'Pengujian Otomatis Sekuensial: Mengalirkan arus uji pada pin 1 hingga 8 secara berurutan untuk memverifikasi kesesuaian pinout kedua ujung.',
        'Unit Remote Lepas-Pasang (Detachable): Memungkinkan pengujian kabel permanen yang sudah tertanam di dinding antara ruang lab dan ruang server.',
        'Mode Slow (S): Memperlambat kedipan lampu indikator agar teknisi dapat melihat kesalahan urutan kawat dengan sangat teliti.',
        'Indikator Ground (G): Menguji apakah pelindung logam (foil shield) pada kabel STP dan konektor berpelindung terpasang sempurna.'
      ],
      en: [
        'Automatic Sequential Stepping: Sequentially pulses pins 1 through 8 to verify end-to-end pinout symmetry.',
        'Detachable Remote Receiver: Enables testing of long structured in-wall cables spanning across separate rooms.',
        'Slow Scan (S) Mode: Reduces step frequency so technicians can observe pin sequence order precisely.',
        'Shield Ground (G) LED: Confirms continuity of the outer metal ground shield on STP/FTP installations.'
      ],
      jp: [
        '自動シーケンシャル走査: 1〜8番ピンにパルス電流を順次流し、両端の結線整合性を自動診断。',
        '着脱式リモート子機: 壁内や天井裏に配線された離れた部屋同士のケーブルを1人で検査可能。',
        'スロー（S）モード: LEDの点灯スピードを落とし、ピンの入れ替わりを目視で確実に確認。',
        'G（グランド）LED: シールド付きSTPケーブルの金属外皮が確実に接地・通電しているかを検査。'
      ],
      cn: [
        '步进式全引脚自动巡检：依序向第1至第8引脚注入低压脉冲，自动校验两端接线拓扑的对称性。',
        '分体式可拆卸结构：远端子机可分离携带，便于单人跨房间排查预埋在墙体内或穿线管中的长距综合布线。',
        'S档慢速视觉确认模式：将扫描周期延长一倍，便于工程人员逐个引脚精密核对错线。',
        '屏蔽接地G指示灯：一键检测工业STP屏蔽网线的金属屏蔽层与水晶头金属外壳是否形成完整回路。'
      ]
    },
    panduanPraktis: {
      id: 'Cara Membaca Hasil Diagnostik: 1. Kabel Straight Benar: Lampu 1 sampai 8 menyala berurutan secara serempak di Master dan Remote (1-1, 2-2, 3-3, 4-4, 5-5, 6-6, 7-7, 8-8). 2. Kabel Crossover Benar: Saat Master menyala 1-2-3-4-5-6-7-8, Remote akan menyala dengan urutan 3-6-1-4-5-2-7-8. 3. Kawat Putus (Open): Lampu pada pin yang putus mati di Remote. 4. Kawat Konslet (Short): Dua lampu menyala bersamaan di Remote saat satu pin diuji. 5. Kawat Tertukar (Reversed): Lampu Remote melompat tidak sesuai urutan.',
      en: 'Interpreting Diagnostics: 1. Good Straight-Through: LEDs 1 through 8 flash in lockstep on both units (1-1, 2-2, ..., 8-8). 2. Good Crossover: As Master scans 1-2-3-4-5-6-7-8, Remote sequences 3-6-1-4-5-2-7-8. 3. Open Pin: Remote LED remains dark. 4. Short Circuit: Two or more Remote LEDs illuminate simultaneously. 5. Crossed Pairs: Remote LEDs flash out of numerical sequence.',
      jp: '診断結果の読み解き方: 1. 正常なストレートケーブル: 親機と子機のLEDが1から8まで全く同じ順序で同時に点灯（1-1、2-2…8-8）。 2. 正常なクロスケーブル: 親機が1-2-3-4-5-6-7-8の時、子機は3-6-1-4-5-2-7-8の順で点灯。 3. 断線（Open）: 該当ピンで子機のランプが点灯しない。 4. ショート（Short）: 2つ以上のLEDが同時に点灯。 5. 配線逆転（Crossed）: 子機のLEDが順番通りに点灯せずスキップまたは逆行する。',
      cn: '诊断指示灯判读指南：1. 正常直通网线：主从两端1至8号灯完全同频、按序从1点亮至8（1-1、2-2...8-8）。2. 正常交叉跳线：主机为1-2-3-4-5-6-7-8时，远端对应呈现3-6-1-4-5-2-7-8时序。3. 断路故障（Open）：对应芯线号灯在远端完全不亮。4. 短路故障（Short）：测试某根线时远端有两颗以上指示灯同时微亮。5. 线序错接（Reversed）：远端指示灯跳跃点亮，顺序紊乱。'
    },
    troubleshooting: {
      id: 'Masalah Umum: 1. Seluruh lampu menyala sangat redup = Baterai 9V mulai habis (ganti baterai agar hasil akurat). 2. Lampu master berjalan tetapi remote mati total = Kabel putus total di banyak kawat atau jack RJ-45 kotor oleh debu.',
      en: 'Troubleshooting: 1. Very dim LEDs = 9V battery depleted; replace immediately to prevent false short-circuit readings. 2. Master cycles but Remote stays completely dark = Complete open circuit across all pins or severely oxidized RJ-45 jack contacts.',
      jp: 'トラブルシューティング: 1. LED全体が薄暗い = 9V電池の残量不足（誤判定を防ぐため即座に電池交換）。 2. 親機は走査しているが子機が全く点灯しない = 全芯線の破断、または端子のひどい酸化・ホコリ詰まり。',
      cn: '常见故障排查：1. 指示灯亮度极度微弱 = 9V方型叠层电池电量耗尽（需立即更换新电池防止电压不足误报）。2. 主机正常巡检而远端彻底不亮 = 线缆内部存在全断路或水晶头接触不良。'
    }
  }
};
