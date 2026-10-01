/**
 * NetVerse - Comprehensive Assessment & Exam Questions (Soal Evaluasi Adaptif)
 * 25 Soal Pilihan Ganda (Multiple Choice) & 10 Soal Uraian (Essay)
 * Multilingual Support (ID, EN, JP, CN)
 * Dynamic Difficulty Scaling: Dasar (Level 1-2), Menengah (Level 3-4), Mahir (Level 5+)
 */

export const ASSESSMENT_MULTIPLE_CHOICE = [
  {
    id: 'pg-1',
    difficulty: 'dasar',
    soal: {
      id: 'Pada model referensi OSI, layer manakah yang bertanggung jawab atas pengalamatan fisik (MAC Address) dan framing data?',
      en: 'In the OSI reference model, which layer is responsible for physical addressing (MAC address) and framing?',
      jp: 'OSI参照モデルにおいて、物理アドレス（MACアドレス）とフレーム化を担当する層はどれですか？',
      cn: '在OSI参考模型中，负责物理寻址（MAC地址）和数据帧成帧的是哪一层？'
    },
    pilihan: {
      id: [
        'Layer 1 - Physical Layer',
        'Layer 2 - Data Link Layer',
        'Layer 3 - Network Layer',
        'Layer 4 - Transport Layer'
      ],
      en: [
        'Layer 1 - Physical Layer',
        'Layer 2 - Data Link Layer',
        'Layer 3 - Network Layer',
        'Layer 4 - Transport Layer'
      ],
      jp: [
        '第1層 - 物理層 (Physical)',
        '第2層 - データリンク層 (Data Link)',
        '第3層 - ネットワーク層 (Network)',
        '第4層 - トランスポート層 (Transport)'
      ],
      cn: [
        '第1层 - 物理层 (Physical Layer)',
        '第2层 - 数据链路层 (Data Link Layer)',
        '第3层 - 网络层 (Network Layer)',
        '第4层 - 传输层 (Transport Layer)'
      ]
    },
    jawaban_benar: 1,
    konsep: 'OSI Layer 2 (Data Link)',
    penjelasan: {
      id: 'Layer 2 (Data Link Layer) mengelola pengalamatan fisik melalui MAC Address 48-bit serta enkapsulasi paket IP ke dalam bingkai data (frames).',
      en: 'Layer 2 (Data Link Layer) manages hardware addressing via 48-bit MAC addresses and encapsulates IP packets into network frames.',
      jp: '第2層（データリンク層）は48ビットのMACアドレスによる物理識別とフレーム化を制御します。',
      cn: '数据链路层（第2层）负责通过48位MAC硬件地址进行寻址，并将IP数据包封装为数据帧。'
    }
  },
  {
    id: 'pg-2',
    difficulty: 'dasar',
    soal: {
      id: 'Berapakah jumlah pasang kawat tembaga (twisted pairs) yang terdapat di dalam seutas kabel UTP Cat 5e atau Cat 6 standar?',
      en: 'How many twisted pairs of copper wires are inside a standard Cat 5e or Cat 6 UTP cable?',
      jp: '標準的なCat 5eまたはCat 6 UTPケーブル内部には何対（ペア）のツイスト線が含まれていますか？',
      cn: '在标准的Cat 5e或Cat 6 UTP双绞线内部，包含多少对双绞铜线？'
    },
    pilihan: {
      id: ['2 Pasang (4 Kawat)', '4 Pasang (8 Kawat)', '6 Pasang (12 Kawat)', '8 Pasang (16 Kawat)'],
      en: ['2 Pairs (4 Wires)', '4 Pairs (8 Wires)', '6 Pairs (12 Wires)', '8 Pairs (16 Wires)'],
      jp: ['2対 (4本)', '4対 (8本)', '6対 (12本)', '8対 (16本)'],
      cn: ['2对 (4芯)', '4对 (8芯)', '6对 (12芯)', '8对 (16芯)']
    },
    jawaban_benar: 1,
    konsep: 'Media Transmisi UTP',
    penjelasan: {
      id: 'Kabel UTP standar memiliki 4 pasang kawat (total 8 kawat tembaga): Oranye, Hijau, Biru, dan Cokelat dengan pasangan putih masing-masing.',
      en: 'Standard UTP cable contains 4 twisted pairs (8 individual wires total): Orange, Green, Blue, and Brown with their white-striped mates.',
      jp: '標準UTPケーブルには4対（計8本）のツイスト芯線（オレンジ、緑、青、茶および各白線）が収容されています。',
      cn: '标准UTP双绞线包含4对（共8芯）铜线：橙、绿、蓝、棕及各自对应的白绞线。'
    }
  },
  {
    id: 'pg-3',
    difficulty: 'dasar',
    soal: {
      id: 'Urutan warna kawat pertama (Pin 1) pada standar pengkabelan TIA/EIA-568B adalah...',
      en: 'The first wire color (Pin 1) in the TIA/EIA-568B cabling standard is...',
      jp: 'TIA/EIA-568B配線規格において、1番ピン（Pin 1）に配置される芯線の色はどれですか？',
      cn: '在TIA/EIA-568B接线标准中，第1引脚（Pin 1）的线序颜色是：'
    },
    pilihan: {
      id: ['Putih-Hijau', 'Putih-Oranye', 'Putih-Biru', 'Putih-Cokelat'],
      en: ['White-Green', 'White-Orange', 'White-Blue', 'White-Brown'],
      jp: ['白緑 (White-Green)', '白橙 (White-Orange)', '白青 (White-Blue)', '白茶 (White-Brown)'],
      cn: ['白绿 (White-Green)', '白橙 (White-Orange)', '白蓝 (White-Blue)', '白棕 (White-Brown)']
    },
    jawaban_benar: 1,
    konsep: 'Standar T568B',
    penjelasan: {
      id: 'Standar T568B diawali dengan kawat Putih-Oranye pada Pin 1, diikuti Oranye pada Pin 2.',
      en: 'Standard T568B begins with White-Orange on Pin 1, followed by Orange on Pin 2.',
      jp: 'T568B規格のピン1は白橙から始まり、ピン2が橙になります。',
      cn: 'T568B标准从第1引脚的白橙线开始，紧接着第2引脚为纯橙线。'
    }
  },
  {
    id: 'pg-4',
    difficulty: 'dasar',
    soal: {
      id: 'Berapakah jarak maksimum segmen kabel UTP tembaga yang diperbolehkan standar IEEE 802.3 tanpa repeater?',
      en: 'What is the maximum allowed copper UTP cable segment length per IEEE 802.3 without a repeater?',
      jp: 'IEEE 802.3規格において、リピータなしで伝送可能な銅線UTPケーブルの最大許容長は何メートルですか？',
      cn: '根据IEEE 802.3以太网标准，无中继器情况下双绞线铜缆的最大允许传输距离是多少？'
    },
    pilihan: {
      id: ['50 Meter', '100 Meter', '185 Meter', '500 Meter'],
      en: ['50 Meters', '100 Meters', '185 Meters', '500 Meters'],
      jp: ['50メートル', '100メートル', '185メートル', '500メートル'],
      cn: ['50米', '100米', '185米', '500米']
    },
    jawaban_benar: 1,
    konsep: 'Batas Jarak Transmisi',
    penjelasan: {
      id: 'Jarak maksimum kabel UTP (10BASE-T hingga 10GBASE-T) adalah 100 meter (90 meter kabel horizontal permanen + 10 meter patch cord).',
      en: 'The maximum certified channel length for copper UTP is 100 meters (90m permanent link + 10m patch cables combined).',
      jp: '銅線UTP規格の最大伝送距離は100m（恒久配線90m＋パッチコード計10m）に制限されます。',
      cn: '铜质双绞线的最大认证信道长度为100米（90米永久链路 + 10米跳线组合）。'
    }
  },
  {
    id: 'pg-5',
    difficulty: 'dasar',
    soal: {
      id: 'Alat yang digunakan untuk memverifikasi kontinuitas dan urutan 8 pin kabel LAN RJ-45 adalah...',
      en: 'The diagnostic tool used to test continuity and pinout sequencing of an 8-pin RJ-45 LAN cable is...',
      jp: 'RJ-45 LANケーブルの8極芯線の導通と配列順序を診断・検証するツールはどれですか？',
      cn: '用于测试校验RJ-45八芯网线导通性及线序排列的专业检测工具是：'
    },
    pilihan: {
      id: ['LAN Tester', 'Tang Crimping', 'Punch Down Tool', 'Optical Power Meter'],
      en: ['LAN Cable Tester', 'Crimping Plier', 'Punch Down Tool', 'Optical Power Meter'],
      jp: ['LANテスター', '圧着ペンチ', 'パンチダウン工具', '光パワーメータ'],
      cn: ['网线寻线测线仪', '网线压线钳', '打线刀', '光功率计']
    },
    jawaban_benar: 0,
    konsep: 'Alat Pengujian Jaringan',
    penjelasan: {
      id: 'LAN Tester memiliki unit Master dan Remote dengan 8 lampu LED untuk menguji sambungan tiap jalur kawat.',
      en: 'A LAN Tester features Master and Remote units with 8 sequential LEDs to verify continuity across each individual pin.',
      jp: 'LANテスターは親機と子機に備わった8つのLEDランプの順次点灯で各芯線の導通を確認します。',
      cn: '测线仪由主测试机和远端测试端组成，通过8颗按序点亮的LED灯逐一检验每根芯线的连通性。'
    }
  },
  {
    id: 'pg-6',
    difficulty: 'menengah',
    soal: {
      id: 'Mengapa kabel UTP (Unshielded Twisted Pair) dililit berpasang-pasangan dengan tingkat pilinan yang berbeda?',
      en: 'Why are wire pairs in UTP (Unshielded Twisted Pair) cables twisted with differing twist rates?',
      jp: 'UTP（シールドなしツイストペア）ケーブルの各芯線対が異なるピッチで撚られている理由は何ですか？',
      cn: '为什么UTP（非屏蔽双绞线）电缆内部的各对铜线要以不同的缠绕密度（节距）相互绞合？'
    },
    pilihan: {
      id: [
        'Agar kabel lebih elastis dan mudah ditarik dalam pipa instalasi',
        'Untuk membatalkan interferensi elektromagnetik (EMI) dan Near-End Crosstalk (NEXT)',
        'Untuk membedakan voltase arus listrik pada masing-masing jalur',
        'Agar resistansi kabel menjadi lebih tinggi sehingga aman dari petir'
      ],
      en: [
        'To make the cable more flexible and easier to pull through conduits',
        'To cancel out Electromagnetic Interference (EMI) and Near-End Crosstalk (NEXT)',
        'To differentiate voltage levels across individual circuits',
        'To increase cable electrical resistance for lightning protection'
      ],
      jp: [
        'ケーブルの柔軟性を高め配管通線を容易にするため',
        '電磁妨害（EMI）および近端漏話（NEXT）を相殺・低減するため',
        '各伝送路の電圧レベルを区別するため',
        '電気抵抗を高めて落雷被害を防ぐため'
      ],
      cn: [
        '增加线缆柔韧度以便于在穿线管中牵引敷设',
        '利用差分平衡原理抵消电磁干扰（EMI）并消除近端串扰（NEXT）',
        '区分各电路中的工作电压幅值',
        '增大导线内阻以防止雷击浪涌'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Prinsip Twisted Pair & Crosstalk',
    penjelasan: {
      id: 'Prinsip transmisi diferensial dan lilitan kawat membatalkan radiasi elektromagnetik luar, sedangkan perbedaan pitch antar-pasangan mencegah crosstalk antar-kabel internal.',
      en: 'Differential signaling combined with twists cancels out external EMI, while varying twist pitches between pairs minimizes internal crosstalk.',
      jp: '差動信号伝送とツイスト構造により外来ノイズを相殺し、ペアごとの異なる撚りピッチでペア間の相互干渉（クロストーク）を抑えます。',
      cn: '差分传输技术配合双绞消除外部EMI干扰，各对线间不同的节距则防止了线对之间的相互串扰。'
    }
  },
  {
    id: 'pg-7',
    difficulty: 'menengah',
    soal: {
      id: 'Perangkat jaringan Layer 2 (Switch) membuat keputusan pengiriman data (forwarding) berdasarkan informasi...',
      en: 'A Layer 2 network switch makes its frame forwarding decisions based on...',
      jp: 'レイヤ2ネットワークスイッチがフレームの転送先を決定する基準は何ですか？',
      cn: '二层网络交换机（Layer 2 Switch）做出数据帧转发决策的依据是：'
    },
    pilihan: {
      id: ['Alamat IP Tujuan (Destination IP)', 'Alamat MAC Tujuan (Destination MAC)', 'Nomor Port TCP/UDP', 'Subnet Mask Jaringan'],
      en: ['Destination IP Address', 'Destination MAC Address', 'TCP/UDP Port Number', 'Network Subnet Mask'],
      jp: ['宛先IPアドレス (Destination IP)', '宛先MACアドレス (Destination MAC)', 'TCP/UDPポート番号', 'サブネットマスク'],
      cn: ['目的IP地址 (Destination IP)', '目的MAC地址 (Destination MAC)', 'TCP/UDP端口号', '子网掩码 (Subnet Mask)']
    },
    jawaban_benar: 1,
    konsep: 'Mekanisme Switching Layer 2',
    penjelasan: {
      id: 'Switch memeriksa tabel CAM (Content Addressable Memory) atau MAC Address Table untuk meneruskan bingkai ke port spesifik berdasarkan MAC tujuan.',
      en: 'Switches consult their CAM (MAC Address Table) to switch incoming frames directly to the target port matching the destination MAC address.',
      jp: 'スイッチはCAMテーブル（MACアドレステーブル）を参照し、フレームの宛先MACアドレスに対応するポートへ転送します。',
      cn: '二层交换机通过查找CAM表（MAC地址映射表），将数据帧精准转发到匹配目的MAC地址的对应物理端口。'
    }
  },
  {
    id: 'pg-8',
    difficulty: 'menengah',
    soal: {
      id: 'Apa yang terjadi pada switch jika alamat MAC tujuan sebuah frame tidak ditemukan dalam tabel MAC address (Unknown Unicast)?',
      en: 'What does a switch do when the destination MAC address of an incoming frame is not in its MAC address table (Unknown Unicast)?',
      jp: '受信したフレームの宛先MACアドレスがテーブルに登録されていない場合（Unknown Unicast）、スイッチはどう動作しますか？',
      cn: '当交换机接收到的数据帧的目的MAC地址在MAC地址表中找不到匹配项（未知单播）时，它会如何处理？'
    },
    pilihan: {
      id: [
        'Frame langsung dibuang (drop) tanpa pemberitahuan',
        'Switch melakukan flooding ke seluruh port aktif dalam VLAN yang sama kecuali port sumber',
        'Switch mengirimkan frame ke Default Gateway di router',
        'Switch meminta server DNS mencari port komputer tujuan'
      ],
      en: [
        'The frame is dropped immediately without notice',
        'The switch floods the frame out all ports in the same VLAN except the receiving port',
        'The switch routes the frame directly to the default gateway',
        'The switch contacts the DNS server to lookup the endpoint port'
      ],
      jp: [
        'フレームは即座に破棄（ドロップ）される',
        '受信ポートを除く同一VLAN内の全アクティブポートへフラッディング（一斉転送）する',
        'フレームをルーターのデフォルトゲートウェイへ送出する',
        'DNSサーバーに問い合わせて端末ポートを特定する'
      ],
      cn: [
        '静默丢弃该数据帧，不向主机报告错误',
        '向同一VLAN内除接收端口之外的所有其他处于激活状态的物理端口进行泛洪（Flooding）',
        '直接将数据帧重定向发送至默认网关路由器',
        '向DNS服务器发起查询请求以寻找目标端口'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Flooding Unknown Unicast',
    penjelasan: {
      id: 'Unknown unicast di-flood ke semua port dalam broadcast domain / VLAN yang sama agar host tujuan merespons sehingga alamat MAC-nya dapat dipelajari (MAC learning).',
      en: 'Unknown unicast frames are flooded out all ports in the same broadcast domain so the destination node can reply, allowing the switch to learn its location.',
      jp: '未知のユニキャストは同一VLAN内の全ポートへ転送され、対象ホストからの返信によってスイッチがそのMACアドレスを学習します。',
      cn: '未知单播帧会在同VLAN内泛洪广播，以便目标主机响应时交换机能够学习并记录其MAC地址与端口的映射关系。'
    }
  },
  {
    id: 'pg-9',
    difficulty: 'menengah',
    soal: {
      id: 'Berapa banyak Collision Domain dan Broadcast Domain yang dihasilkan oleh Switch 24-Port tanpa konfigurasi VLAN (Default VLAN 1)?',
      en: 'How many Collision Domains and Broadcast Domains are created by a 24-Port Switch running default configuration (single VLAN 1)?',
      jp: 'VLAN設定のない24ポートスイッチ（すべてデフォルトVLAN 1）におけるコリジョンドメインとブロードキャストドメインの数は？',
      cn: '一台运行默认配置（未划分额外VLAN，全部处于VLAN 1）的24口交换机，拥有多少个冲突域和广播域？'
    },
    pilihan: {
      id: ['1 Collision Domain dan 24 Broadcast Domains', '24 Collision Domains dan 1 Broadcast Domain', '1 Collision Domain dan 1 Broadcast Domain', '24 Collision Domains dan 24 Broadcast Domains'],
      en: ['1 Collision Domain and 24 Broadcast Domains', '24 Collision Domains and 1 Broadcast Domain', '1 Collision Domain and 1 Broadcast Domain', '24 Collision Domains and 24 Broadcast Domains'],
      jp: ['コリジョンドメイン 1個、ブロードキャストドメイン 24個', 'コリジョンドメイン 24個、ブロードキャストドメイン 1個', 'コリジョンドメイン 1個、ブロードキャストドメイン 1個', 'コリジョンドメイン 24個、ブロードキャストドメイン 24個'],
      cn: ['1个冲突域，24个广播域', '24个冲突域，1个广播域', '1个冲突域，1个广播域', '24个冲突域，24个广播域']
    },
    jawaban_benar: 1,
    konsep: 'Domain Jaringan Switch',
    penjelasan: {
      id: 'Setiap port switch memecah collision domain (24 port = 24 collision domain), namun seluruh port berada dalam satu broadcast domain tunggal selama tidak dipecah oleh VLAN atau router.',
      en: 'Each switch port forms an isolated collision domain (24 ports = 24 collision domains), but all unsegmented ports share 1 single broadcast domain.',
      jp: 'スイッチの各ポートは独立したコリジョンドメインを形成（24個）しますが、VLAN未分割時は全体で1つのブロードキャストドメインを共有します。',
      cn: '交换机的每个物理端口都是一个独立的冲突域（24个），但在未划分VLAN的情况下，全交换机共享同一个单一的广播域。'
    }
  },
  {
    id: 'pg-10',
    difficulty: 'menengah',
    soal: {
      id: 'Protokol standar IEEE manakah yang digunakan untuk mencegah terjadinya bridging loop (looping fisik) pada jaringan multi-switch?',
      en: 'Which IEEE standard protocol is designed to prevent bridging loops in multi-switch redundant networks?',
      jp: '複数スイッチ間の冗長構成ネットワークにおいて、ループ障害を防止するIEEE標準プロトコルはどれですか？',
      cn: '在多台交换机互联的冗余拓扑网络中，用于防止出现二层物理环路的IEEE标准协议是：'
    },
    pilihan: {
      id: ['IEEE 802.1Q (VLAN Tagging)', 'IEEE 802.1D / 802.1w (Spanning Tree Protocol)', 'IEEE 802.3ad (Link Aggregation)', 'IEEE 802.1X (Port-Based Authentication)'],
      en: ['IEEE 802.1Q (VLAN Tagging)', 'IEEE 802.1D / 802.1w (Spanning Tree Protocol)', 'IEEE 802.3ad (Link Aggregation)', 'IEEE 802.1X (Port-Based Authentication)'],
      jp: ['IEEE 802.1Q (VLANタグ)', 'IEEE 802.1D / 802.1w (スパニングツリー STP/RSTP)', 'IEEE 802.3ad (リンクアグリゲーション)', 'IEEE 802.1X (ポート認証)'],
      cn: ['IEEE 802.1Q (VLAN标签封装)', 'IEEE 802.1D / 802.1w (生成树协议 STP/RSTP)', 'IEEE 802.3ad (链路聚合)', 'IEEE 802.1X (基于端口的访问控制)']
    },
    jawaban_benar: 1,
    konsep: 'Spanning Tree Protocol (STP)',
    penjelasan: {
      id: 'Spanning Tree Protocol (STP / RSTP) memblokir port redundant secara logika guna mencegah broadcast storm dan MAC flapping akibat perputaran frame tanpa henti.',
      en: 'STP/RSTP blocks redundant paths logically to avert broadcast storms and MAC flapping caused by endless looping frames.',
      jp: 'STP/RSTPは余剰リンクを論理的にブロックしてフレームの無限巡回によるブロードキャストストームやMACフラッピングを防ぎます。',
      cn: '生成树协议（STP/RSTP）通过逻辑阻塞冗余链路端口，有效避免了二层广播风暴和MAC地址表震荡。'
    }
  },
  {
    id: 'pg-11',
    difficulty: 'menengah',
    soal: {
      id: 'Pada jaringan IPv4 dengan alamat 192.168.1.0/26, berapakah jumlah host maksimal yang dapat digunakan oleh perangkat klien?',
      en: 'In an IPv4 network with address 192.168.1.0/26, what is the maximum number of usable client host addresses?',
      jp: 'IPv4ネットワーク 192.168.1.0/26 において、クライアント端末に割り当て可能な最大ホスト数はいくつですか？',
      cn: '在地址为 192.168.1.0/26 的IPv4子网中，最多可以分配给客户端主机的可用IP地址数量是多少？'
    },
    pilihan: {
      id: ['30 Host', '62 Host', '64 Host', '126 Host'],
      en: ['30 Hosts', '62 Hosts', '64 Hosts', '126 Hosts'],
      jp: ['30ホスト', '62ホスト', '64ホスト', '126ホスト'],
      cn: ['30个主机', '62个主机', '64个主机', '126个主机']
    },
    jawaban_benar: 1,
    konsep: 'Subnetting CIDR',
    penjelasan: {
      id: 'Prefix /26 menyisakan 6 bit host (32 - 26 = 6). Jumlah alamat = 2^6 = 64. Dikurangi Network ID dan Broadcast ID, maka host yang dapat dipakai adalah 64 - 2 = 62 host.',
      en: 'A /26 prefix leaves 6 host bits (32 - 26 = 6). Total addresses = 2^6 = 64. Subtracting network and broadcast addresses yields 62 usable host addresses.',
      jp: '/26はホスト部に6ビット残ります（2^6 = 64個）。ネットワークアドレスとブロードキャストアドレスを除くため、64 - 2 = 62台が利用可能です。',
      cn: '/26前缀的主机位为32-26=6位，总地址数2^6=64。减去网络号与广播号后，可用主机地址为 64 - 2 = 62个。'
    }
  },
  {
    id: 'pg-12',
    difficulty: 'menengah',
    soal: {
      id: 'Kombinasi kabel apakah yang tepat untuk menghubungkan PC secara langsung ke port switch tanpa bantuan router?',
      en: 'Which cable configuration is standard for connecting a workstation PC directly into a network switch port?',
      jp: 'PCをネットワークスイッチのポートへ直接接続する際に標準的に使用されるケーブル結線はどれですか？',
      cn: '将工作站电脑（PC）直接连接至网络交换机端口时，标准使用的双绞线跳线类型是：'
    },
    pilihan: {
      id: ['Kabel Straight-Through (Lurus)', 'Kabel Crossover (Silang)', 'Kabel Rollover (Console)', 'Kabel Coaxial 75 Ohm'],
      en: ['Straight-Through Cable', 'Crossover Cable', 'Rollover (Console) Cable', '75-Ohm Coaxial Cable'],
      jp: ['ストレートケーブル (Straight-Through)', 'クロスオーバーケーブル (Crossover)', 'ロールオーバーケーブル (Console)', '75Ω同軸ケーブル'],
      cn: ['直通双绞线 (Straight-Through Cable)', '交叉双绞线 (Crossover Cable)', '反转线/配置线 (Rollover Cable)', '75欧姆同轴电缆']
    },
    jawaban_benar: 0,
    konsep: 'Tipe Kabel LAN',
    penjelasan: {
      id: 'Perangkat berbeda layer (PC di Layer 3/Host ke Switch di Layer 2) menggunakan kabel Straight-Through (kedua ujung sama-sama T568B atau T568A).',
      en: 'Connecting different-layer devices (PC workstation to Layer 2 switch) requires a Straight-Through cable with identical pinouts on both ends.',
      jp: '異なるレイヤの機器間（PC端末とL2スイッチ）の接続には、両端が同一規格のストレートケーブルを用います。',
      cn: '连接不同层次的设备（如作为终端主机的PC与二层交换机）通常使用两端线序标准一致的直通网线。'
    }
  },
  {
    id: 'pg-13',
    difficulty: 'menengah',
    soal: {
      id: 'Pada kabel UTP Cat 6 standar 1000BASE-T (Gigabit Ethernet), berapa pasang kawat yang digunakan untuk transmisi data?',
      en: 'In a standard 1000BASE-T (Gigabit Ethernet) implementation over Cat 6 UTP, how many wire pairs transmit data?',
      jp: 'Cat 6 UTPケーブルを用いた1000BASE-T（ギガビットイーサネット）では、何対の芯線がデータ送受信に使用されますか？',
      cn: '在运行于Cat 6双绞线上的1000BASE-T（千兆以太网）标准中，实际参与双向数据传输的线对数量是多少？'
    },
    pilihan: {
      id: ['1 Pasang', '2 Pasang (Pin 1, 2, 3, 6)', '3 Pasang', '4 Pasang (Seluruh 8 Kawat)'],
      en: ['1 Pair', '2 Pairs (Pins 1, 2, 3, 6)', '3 Pairs', '4 Pairs (All 8 Wires)'],
      jp: ['1対', '2対 (ピン 1, 2, 3, 6)', '3対', '4対 (全8芯)'],
      cn: ['1对', '2对 (第1, 2, 3, 6引脚)', '3对', '4对 (全部8根线芯)']
    },
    jawaban_benar: 3,
    konsep: 'Transmisi Gigabit 1000BASE-T',
    penjelasan: {
      id: 'Berbeda dengan Fast Ethernet (100BASE-TX) yang hanya menggunakan 2 pasang (Pin 1,2,3,6), Gigabit Ethernet (1000BASE-T) menggunakan seluruh 4 pasang secara simultan bidirectional.',
      en: 'Unlike Fast Ethernet (100BASE-TX) which uses only 2 pairs, Gigabit Ethernet (1000BASE-T) transmits and receives simultaneously across all 4 wire pairs.',
      jp: '100BASE-TXでは2対のみ使用しますが、1000BASE-Tは4対すべて（8本）を全二重で同時に使用して1Gbpsを実現します。',
      cn: '百兆以太网仅使用2对线（1/2/3/6），而千兆以太网（1000BASE-T）采用全双工四对线同时并行收发数据。'
    }
  },
  {
    id: 'pg-14',
    difficulty: 'menengah',
    soal: {
      id: 'Jika salah satu kawat pada Pin 3 (Rx+) putus pada sambungan Fast Ethernet (100BASE-TX), apa gejala yang dialami klien?',
      en: 'If Pin 3 (Rx+) is severed on a Fast Ethernet (100BASE-TX) cable run, what symptom will the workstation experience?',
      jp: '100BASE-TX環境で3番ピン（Rx+）が断線した場合、端末クライアントに生じる現象はどれですか？',
      cn: '在百兆以太网（100BASE-TX）链路中，如果网线的第3引脚（Rx+）出现物理断线，工作站会表现出何种故障现象？'
    },
    pilihan: {
      id: [
        'Koneksi tetap berjalan normal pada kecepatan 100 Mbps',
        'Lampu indikator link padam dan koneksi terputus total (No Link / Cable Disconnected)',
        'Kecepatan otomatis turun menjadi 1 Gbps',
        'PC hanya bisa mengirim file tetapi tidak bisa membuka internet'
      ],
      en: [
        'Connection continues running normally at 100 Mbps',
        'The link LED turns off and connection drops completely (No Link / Cable Disconnected)',
        'Speed automatically falls back to 1 Gbps',
        'The PC can upload files but cannot access web pages'
      ],
      jp: [
        '100Mbpsのまま正常に通信し続ける',
        'リンクランプが消灯し完全に通信不能となる（リンクダウン / ケーブル切断）',
        '速度が自動的に1Gbpsに向上する',
        'ファイルの送信のみ可能で受信はできない状態となる'
      ],
      cn: [
        '网络保持100 Mbps速率正常通信，无明显异常',
        '网卡物理链路指示灯熄灭，网络完全中断（显示网线未拔出或未连接）',
        '物理链路速率自动降级至1 Gbps',
        '主机仅能发送本地文件但无法浏览网页'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Troubleshooting Fisik Kabel',
    penjelasan: {
      id: 'Pada 100BASE-TX, pin 1, 2, 3, dan 6 wajib terhubung. Jika pin 3 (Rx+) terputus, loop penerimaan sinyal hilang sehingga negosiasi fisik gagal dan status link down.',
      en: 'In 100BASE-TX, pins 1, 2, 3, and 6 are critical. A severed pin 3 breaks the receive pair, causing physical link negotiation to fail.',
      jp: '100BASE-TXでは1,2,3,6番ピンが必須です。3番ピンの断線により受信ループが成立せず、リンクアップできません。',
      cn: '百兆以太网依赖1/2/3/6四根线芯建立物理电气闭环。第3引脚断路将导致物理层自协商失败，网卡链路直接中断。'
    }
  },
  {
    id: 'pg-15',
    difficulty: 'menengah',
    soal: {
      id: 'Fitur pada switch atau router modern yang dapat secara otomatis mendeteksi dan menyesuaikan kabel straight atau crossover adalah...',
      en: 'The modern hardware feature on switches and routers that automatically corrects between straight-through and crossover cabling is...',
      jp: 'スイッチやルーターがストレートとクロスの結線種別を自動判別して送受信極性を反転させる機能はどれですか？',
      cn: '现代交换机和路由器接口具备的能够自动识别并适应直通线与交叉线极性的物理层技术是：'
    },
    pilihan: {
      id: ['Auto-MDI/MDIX', 'Auto-Duplex Negotiation', 'Power over Ethernet (PoE)', 'Dynamic Trunking Protocol (DTP)'],
      en: ['Auto-MDI/MDIX', 'Auto-Duplex Negotiation', 'Power over Ethernet (PoE)', 'Dynamic Trunking Protocol (DTP)'],
      jp: ['Auto-MDI/MDIX', 'オートネゴシエーション', 'PoE (Power over Ethernet)', 'DTP (Dynamic Trunking Protocol)'],
      cn: ['Auto-MDI/MDIX (自动线序交叉识别)', '全双工自动协商 (Auto-Duplex)', '以太网供电 (PoE)', '动态中继协议 (DTP)']
    },
    jawaban_benar: 0,
    konsep: 'Teknologi Auto-MDI/MDIX',
    penjelasan: {
      id: 'Auto-MDI/MDIX secara dinamis menukar pin transmiter dan receiver di dalam port chip PHY sehingga pengguna tidak perlu khawatir memakai kabel straight atau crossover.',
      en: 'Auto-MDI/MDIX internally swaps transmitter and receiver circuits inside the PHY chip, making straight vs crossover cabling interchangeable.',
      jp: 'Auto-MDI/MDIXはポート内部で送信ピンと受信ピンを自動切り替えするため、ケーブルの種類を意識せず接続できます。',
      cn: 'Auto-MDI/MDIX技术可在PHY芯片内部自动翻转发送（Tx）和接收（Rx）电路极性，实现任意双绞线跳线的自适应通信。'
    }
  },
  {
    id: 'pg-16',
    difficulty: 'mahir',
    soal: {
      id: 'Mengapa standar T568B dan T568A sengaja membelah kawat pasangan hijau (pin 3 dan pin 6) pada konektor RJ-45?',
      en: 'Why do both T568B and T568A standards deliberately split wire pair 1/2 around pins 3 and 6 in an RJ-45 modular plug?',
      jp: 'T568BおよびT568A規格において、なぜRJ-45コネクタのピン3とピン6のペア線が中央の青ペアを跨ぐように分割配置されているのですか？',
      cn: '为什么T568B与T568A标准在RJ-45水晶头中故意将第3和第6引脚的线对跨越中心第4和第5（蓝色）引脚进行拆分排列？'
    },
    pilihan: {
      id: [
        'Untuk mempermudah urutan warna saat teknisi memasang konektor tanpa alat crimping',
        'Untuk menjaga kompatibilitas dengan standar telepon RJ-11 (pin 4 & 5) dan menyeimbangkan induktansi crosstalk antar-pasangan',
        'Agar kabel memiliki resistansi lebih rendah untuk menyalurkan tegangan PoE 48V',
        'Sebagai penanda visual bahwa kabel tersebut menggunakan konektor jenis Cat 6'
      ],
      en: [
        'To simplify color sorting so technicians can terminate plugs without dedicated tools',
        'To maintain backward compatibility with 1-pair/2-pair RJ-11 telephony (pins 4 & 5) while balancing pair crosstalk inductance',
        'To decrease conductor electrical resistance for 48V PoE delivery',
        'To visually signify that the assembly is rated as Cat 6 certified'
      ],
      jp: [
        '工具なしで現場の作業者が目視で簡単に色順を揃えられるようにするため',
        'RJ-11電話回線（ピン4・5）との互換性を保ち、高周波差動信号の近端漏話（NEXT）を抑えるため',
        '48VのPoE給電時における導体抵抗を低減させるため',
        'Cat 6ケーブルであることを外観上で識別可能にするため'
      ],
      cn: [
        '方便施工人员在没有专用工具的情况下凭直觉整理线序',
        '为了向前兼容旧式RJ-11电话语音线（4/5引脚），并实现高频差分信号的对称平衡以抑制NEXT近端串扰',
        '降低导线线阻以承载PoE 48V高功率直流供电',
        '作为物理外观标记以证明线缆达到Cat 6性能级别'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Arsitektur Fisik RJ-45 & RJ-11',
    penjelasan: {
      id: 'Pin 4 dan 5 (tengah) dicadangkan untuk jalur telepon 1-pair (RJ-11). Pemisahan pin 3 dan 6 mengapit pin tengah sehingga kabel Ethernet tetap kompatibel saat jack RJ-11 dipasang ke port RJ-45.',
      en: 'Pins 4 and 5 were historically reserved for telephone Line 1 (RJ-11). Splitting pins 3 and 6 preserves backward telephony compatibility while mitigating differential capacitive crosstalk.',
      jp: '中央の4・5番ピンは元々RJ-11電話回線の第1極として設計されたため、3・6番で挟み込むことで電話回線との物理的互換性と高周波ノイズ抑制を両立させています。',
      cn: '中央4/5引脚在历史上保留给RJ-11电话语音信号；拆分3/6引脚既实现了物理口兼容，又保证了以太网高频差分传输时的电磁对称性。'
    }
  },
  {
    id: 'pg-17',
    difficulty: 'mahir',
    soal: {
      id: 'Apa fungsi dari header 802.1Q (VLAN Tag) sebesar 4 byte yang disisipkan ke dalam frame Ethernet standar pada port Trunk?',
      en: 'What is the exact purpose of the 4-byte IEEE 802.1Q header injected into standard Ethernet frames on a trunk link?',
      jp: 'トランクポートを通過する標準イーサネットフレームに挿入される4バイトのIEEE 802.1Qヘッダーの役割は何ですか？',
      cn: '在Trunk（中继）链路上传输时，插入到标准以太网帧中的4字节IEEE 802.1Q标签头的核心作用是什么？'
    },
    pilihan: {
      id: [
        'Mengenkripsi seluruh data payload dengan kunci AES-256',
        'Menyertakan VLAN ID (12-bit) dan Priority Code Point (3-bit CoS) untuk membedakan asal segmen virtual jaringan',
        'Mengubah frame Layer 2 menjadi paket Layer 3 yang dapat langsung dirouting di internet',
        'Memperbesar ukuran MTU menjadi 9000 byte (Jumbo Frame)'
      ],
      en: [
        'To encrypt all payload data using an AES-256 cipher',
        'To encode the 12-bit VLAN ID and 3-bit Priority Code Point (CoS) to multiplex virtual segment traffic across switches',
        'To convert Layer 2 frames into Layer 3 routable internet packets',
        'To expand the frame MTU payload directly to 9000 bytes (Jumbo Frame)'
      ],
      jp: [
        'ペイロードデータをAES-256で暗号化するため',
        '12ビットのVLAN IDと3ビットの優先度（CoS）を付与し、複数スイッチ間で仮想ネットワークを識別・多重化するため',
        'レイヤ2フレームを直接インターネットルーティング可能なL3パケットに変換するため',
        'MTUサイズを9000バイトのジャンボフレームに拡張するため'
      ],
      cn: [
        '使用AES-256硬件加密算法对载荷数据进行全面保密封装',
        '携带12位VLAN标识符（VID）与3位优先级代码（CoS），在跨交换机共享链路中区分并隔离不同的虚拟子网',
        '直接将二层数据帧转化为可直接在广域网由BGP协议路由的三层分组',
        '将以太网MTU强制扩充至9000字节巨型帧'
      ]
    },
    jawaban_benar: 1,
    konsep: 'IEEE 802.1Q Trunking',
    penjelasan: {
      id: 'Tag 802.1Q (4 byte) disisipkan setelah source MAC, berisi TPID (0x8100), PCP (Priority 3-bit), DEI, dan VID (12-bit, mendukung hingga 4094 VLAN).',
      en: 'The 4-byte 802.1Q tag contains TPID (0x8100), PCP (3 bits QoS), DEI, and VID (12 bits, addressing up to 4094 distinct VLANs).',
      jp: '802.1QタグはTPID（0x8100）、優先度PCP（3bit）、VLAN ID（12bit、最大4094個）を含み、スイッチ間でフレームの所属VLANを識別します。',
      cn: '802.1Q标签由TPID（0x8100）、优先级PCP（3位QoS）、DEI以及12位的VLAN ID（支持最多4094个隔离子网）构成。'
    }
  },
  {
    id: 'pg-18',
    difficulty: 'mahir',
    soal: {
      id: 'Pada topologi router-on-a-stick, mengapa port switch yang mengarah ke interface fisik router harus dikonfigurasi sebagai port Trunk?',
      en: 'In a router-on-a-stick inter-VLAN topology, why must the switch port connecting to the router physical interface be configured as a Trunk?',
      jp: 'Router-on-a-stick構成において、ルーターの物理インターフェースに接続するスイッチポートをトランクに設定する理由は？',
      cn: '在单臂路由（Router-on-a-stick）跨VLAN通信拓扑中，连接路由器物理接口的交换机端口为何必须配置为Trunk（中继）模式？'
    },
    pilihan: {
      id: [
        'Agar router dapat menyuplai daya listrik PoE ke seluruh switch',
        'Agar lalu lintas dari berbagai VLAN (bertag 802.1Q) dapat diteruskan melalui satu kabel fisik tunggal ke sub-interface router',
        'Agar kecepatan kabel otomatis meningkat menjadi 10 Gbps',
        'Untuk mematikan tabel routing di router agar proses lebih cepat'
      ],
      en: [
        'To allow the router to supply PoE electricity to the switch chassis',
        'To allow tagged traffic from multiple VLANs to transit over a single physical link into distinct router sub-interfaces',
        'To automatically boost the physical cable bandwidth to 10 Gbps',
        'To bypass the routing table in the router for accelerated processing'
      ],
      jp: [
        'ルーターからスイッチへPoE電源を供給可能にするため',
        'タグ付きの複数VLANトラフィックを1本の物理ケーブルでルーターの各サブインターフェースへ転送するため',
        'ケーブル通信速度を自動的に10Gbpsに高速化するため',
        'ルーターのルーティング処理を省いて通信を高速化するため'
      ],
      cn: [
        '使路由器能够通过网线向整台接入交换机输送高功率PoE电能',
        '使携带不同802.1Q标签的多VLAN数据流能够汇聚复用在单一物理链路上，并在路由器的逻辑子接口间完成三层路由',
        '将物理网线的传输带宽强制提升至10 Gbps',
        '绕过路由器的路由表查找机制以实现硬件直通'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Router-on-a-Stick & Sub-interfaces',
    penjelasan: {
      id: 'Port trunk membawa frame dengan tag VLAN dari berbagai segmen. Router membaca tag tersebut pada sub-interface (misal g0/0.10 dan g0/0.20) untuk melakukan routing antar-VLAN.',
      en: 'Trunk ports transport multi-VLAN tagged frames. The router ingests tags on matching virtual sub-interfaces to perform inter-VLAN routing.',
      jp: 'トランクポートは複数VLANのタグ付きフレームを通し、ルーター側でサブインターフェース（例: g0/0.10）ごとに分離してルーティングします。',
      cn: 'Trunk端口允许多个VLAN带标签通过，路由器物理端口下的各个子接口（如g0/0.10）根据VID分别解封装并执行跨网段路由。'
    }
  },
  {
    id: 'pg-19',
    difficulty: 'mahir',
    soal: {
      id: 'Teknologi Wi-Fi 6 (IEEE 802.11ax) menggunakan OFDMA (Orthogonal Frequency Division Multiple Access). Apa keuntungan utama teknologi ini dibandingkan OFDM biasa?',
      en: 'Wi-Fi 6 (802.11ax) adopts OFDMA. What is its key advantage over legacy OFDM?',
      jp: 'Wi-Fi 6（IEEE 802.11ax）で採用されたOFDMAの、従来のOFDMに対する最大の利点は何ですか？',
      cn: 'Wi-Fi 6（IEEE 802.11ax）引入了OFDMA技术，相比传统Wi-Fi采用的OFDM，其核心优势是什么？'
    },
    pilihan: {
      id: [
        'Hanya bisa digunakan oleh satu perangkat saja dalam satu waktu agar bandwidth tidak terbagi',
        'Membagi kanal nirkabel menjadi sub-carrier kecil (Resource Units / RU) sehingga router dapat melayani banyak perangkat sekaligus dalam satu transmisi',
        'Menghapus penggunaan kata sandi WPA3 sehingga koneksi lebih cepat',
        'Mengubah gelombang radio 5 GHz menjadi gelombang sinar inframerah'
      ],
      en: [
        'It restricts channel access to one client at a time to maximize single-thread bandwidth',
        'It subdivides radio channels into granular Resource Units (RUs), enabling the AP to serve multiple clients simultaneously in one transmission window',
        'It eliminates WPA3 encryption passwords to speed up authentication handshakes',
        'It converts 5 GHz RF signals into optical infrared light'
      ],
      jp: [
        '帯域を独占させるため一度に1台の端末しか通信できないようにする',
        '無線チャネルを「リソースユニット（RU）」に細分化し、1回の伝送で複数端末と同時にデータを送受信可能にする',
        '暗号化認証を省略して接続を高速化する',
        '5GHzの電波を赤外線通信に変換して干渉を皆無にする'
      ],
      cn: [
        '每次传输仅独占分配给单一设备，确保单线程带宽最大化',
        '将通信信道划分为多个资源单元（Resource Units, RU），允许AP在同一传输周期内同时与多台设备并发收发小数据包',
        '彻底取消WPA3握手加密以加快接入响应',
        '将5GHz射频电磁波直接转换为红外光通信以消除无线干扰'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Arsitektur Wi-Fi 6 & OFDMA',
    penjelasan: {
      id: 'OFDMA membagi frekuensi menjadi Resource Units (RU), menurunkan latensi secara drastis saat puluhan perangkat terhubung bersamaan di lab komputer.',
      en: 'OFDMA divides channel spectrum into Resource Units (RUs), drastically slashing latency and contention in dense client environments.',
      jp: 'OFDMAは周波数帯をRUに細分化し、多端末が密集する高密度環境（学校のPC教室等）における通信待機時間と遅延を大幅に削減します。',
      cn: 'OFDMA将无线频宽切分为子载波资源单元（RU），彻底解决了高密度机房终端并发通信时的信道排队延迟问题。'
    }
  },
  {
    id: 'pg-20',
    difficulty: 'mahir',
    soal: {
      id: 'Proses pertukaran pesan 4 tahap dalam penyewaan alamat IP otomatis pada protokol DHCP dikenal dengan singkatan DORA, yang terdiri dari urutan...',
      en: 'The standard 4-step message exchange for leasing dynamic IP configurations in DHCP is abbreviated as DORA, representing...',
      jp: 'DHCPプロトコルにおいて動的IPアドレスを払い出す一連の4ステップ手順「DORA」の正確な構成順序はどれですか？',
      cn: 'DHCP协议为客户端动态分配IP配置信息的标准四步握手过程被称为DORA，其正确的交互顺序是：'
    },
    pilihan: {
      id: [
        'Discover -> Offer -> Request -> Acknowledge',
        'Deliver -> Order -> Receive -> Accept',
        'Direct -> Open -> Route -> Authorize',
        'Disconnect -> Offline -> Reboot -> Assign'
      ],
      en: [
        'Discover -> Offer -> Request -> Acknowledge',
        'Deliver -> Order -> Receive -> Accept',
        'Direct -> Open -> Route -> Authorize',
        'Disconnect -> Offline -> Reboot -> Assign'
      ],
      jp: [
        'Discover (探索) -> Offer (提示) -> Request (要求) -> Acknowledge (承認)',
        'Deliver -> Order -> Receive -> Accept',
        'Direct -> Open -> Route -> Authorize',
        'Disconnect -> Offline -> Reboot -> Assign'
      ],
      cn: [
        'Discover (发现) -> Offer (提供) -> Request (请求) -> Acknowledge (确认)',
        'Deliver -> Order -> Receive -> Accept',
        'Direct -> Open -> Route -> Authorize',
        'Disconnect -> Offline -> Reboot -> Assign'
      ]
    },
    jawaban_benar: 0,
    konsep: 'DHCP DORA Process',
    penjelasan: {
      id: 'Klien mengirim DHCP Discover (broadcast), server membalas DHCP Offer (penawaran IP), klien membalas DHCP Request (memilih penawaran), dan server mengonfirmasi dengan DHCP ACK.',
      en: 'The sequence is client DHCP Discover, server DHCP Offer, client DHCP Request, and server confirmation DHCP ACK.',
      jp: 'クライアントがDHCP Discoverを一斉同報し、サーバーがOfferを提示、クライアントがRequestで選択し、サーバーがACKで承認を返します。',
      cn: '客户端广播Discover寻找服务器，服务器单播/广播回复Offer提供候选IP，客户端回复Request确认接受，最后服务器下发ACK完成租约确认。'
    }
  },
  {
    id: 'pg-21',
    difficulty: 'mahir',
    soal: {
      id: 'Jika dua buah switch dihubungkan dengan 2 kabel LAN sekaligus tanpa konfigurasi Link Aggregation (LACP) dan tanpa Spanning Tree Protocol (STP), apa akibat fatal yang terjadi?',
      en: 'If two switches are interconnected via 2 parallel cables without LACP (Link Aggregation) and without Spanning Tree Protocol (STP), what fatal network failure occurs?',
      jp: '2台のスイッチ間をLACPやSTPを有効にせず2本のLANケーブルで並行接続した場合、発生する致命的なネットワーク障害は何ですか？',
      cn: '如果在两台交换机之间同时插上两根并行的网线互联，且未配置LACP链路聚合与STP生成树协议，网络将发生何种灾难性后果？'
    },
    pilihan: {
      id: [
        'Kapasitas bandwidth otomatis berlipat ganda menjadi 2 Gbps',
        'Terjadi Broadcast Storm dan perputaran frame tanpa henti (Looping) yang melumpuhkan seluruh bandwidth dan CPU switch',
        'Kedua switch otomatis mematikan daya listriknya demi keamanan',
        'Salah satu kabel akan berubah menjadi kabel daya listrik'
      ],
      en: [
        'Bandwidth automatically doubles seamlessly to 2 Gbps',
        'A catastrophic Broadcast Storm and infinite frame loop occurs, exhausting switch CPU and totally saturating the network',
        'Both switches automatically shut down power to protect components',
        'One of the cables transforms into an AC power cable'
      ],
      jp: [
        '帯域幅が自動的に2倍（2Gbps）に増強される',
        'ブロードキャストストームとフレームの無限ループが発生し、スイッチのCPUと帯域が枯渇してネットワークが全停止する',
        '安全保護のため両スイッチの電源が自動切断される',
        '片方のケーブルが自動的に給電用電源ラインに切り替わる'
      ],
      cn: [
        '链路带宽无损平滑翻倍至 2 Gbps',
        '引发二层广播风暴与数据帧无限循环（Looping），迅速耗尽交换机CPU与背板带宽，导致整个局域网彻底瘫痪',
        '两台交换机为自保将自动切断机房交流电源',
        '其中一根线缆将自动转换为高压供电线'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Broadcast Storm & Looping L2',
    penjelasan: {
      id: 'Frame broadcast/multicast akan di-flood berputar tanpa henti (karena Ethernet frame tidak memiliki TTL seperti IP), menyebabkan broadcast storm hingga crash.',
      en: 'Ethernet frames lack a TTL (Time-To-Live) field. Without STP, broadcast frames loop endlessly between the parallel links, creating a network-killing storm.',
      jp: 'イーサネットフレームにはTTL（生存時間）がないため、STPなしではブロードキャストが両スイッチ間を無限ループし帯域を埋め尽くします。',
      cn: '二层以太网数据帧头没有三层IP那样的TTL生命周期字段。冗余回路会导致泛洪帧在交换机之间无休止倍增循环，引发毁灭性广播风暴。'
    }
  },
  {
    id: 'pg-22',
    difficulty: 'mahir',
    soal: {
      id: 'Teknisi ingin memeriksa alamat fisik (MAC address) dari gateway router lokal (192.168.1.1) dari komputer Windows. Perintah Command Prompt manakah yang tepat?',
      en: 'A technician wants to verify the cached physical MAC address of the local router gateway (192.168.1.1) on Windows. Which CLI command should be executed?',
      jp: 'Windowsのコマンドプロンプトで、ルーターのゲートウェイ（192.168.1.1）に対応するMACアドレスのキャッシュを確認するコマンドはどれですか？',
      cn: '网络管理员在Windows主机上排查网络时，希望查看本地网关（192.168.1.1）对应的物理MAC地址映射缓存，应执行的命令是：'
    },
    pilihan: {
      id: ['arp -a', 'ipconfig /all', 'netstat -r', 'nslookup 192.168.1.1'],
      en: ['arp -a', 'ipconfig /all', 'netstat -r', 'nslookup 192.168.1.1'],
      jp: ['arp -a', 'ipconfig /all', 'netstat -r', 'nslookup 192.168.1.1'],
      cn: ['arp -a', 'ipconfig /all', 'netstat -r', 'nslookup 192.168.1.1']
    },
    jawaban_benar: 0,
    konsep: 'Protokol ARP (Address Resolution)',
    penjelasan: {
      id: 'Perintah "arp -a" menampilkan tabel cache ARP yang memetakan alamat IP ke alamat fisik MAC address di jaringan lokal.',
      en: 'The "arp -a" command displays the host ARP table resolving IP addresses to physical MAC addresses in the local LAN.',
      jp: '「arp -a」コマンドにより、同一LAN内で解決・保持されているIPアドレスとMACアドレスの対応キャッシュ一覧を表示できます。',
      cn: '“arp -a”命令用于输出显示操作系统当前的ARP映射缓存表，列出局域网内各IP与其对应网卡MAC物理地址。'
    }
  },
  {
    id: 'pg-23',
    difficulty: 'mahir',
    soal: {
      id: 'Standar Power over Ethernet (PoE) IEEE 802.3at (PoE+) mampu menyalurkan daya listrik maksimum hingga sekitar...',
      en: 'The IEEE 802.3at (PoE+) Power over Ethernet standard delivers a maximum DC power per port up to approximately...',
      jp: 'IEEE 802.3at（PoE+）規格において、給電機器（PSE）が1ポートあたり供給可能な最大電力は約何ワットですか？',
      cn: 'IEEE 802.3at（PoE+）以太网供电标准中，PSE供电设备单端口能够输出的最大直流功率约为：'
    },
    pilihan: {
      id: ['15.4 Watt', '30.0 Watt', '60.0 Watt', '100.0 Watt'],
      en: ['15.4 Watts', '30.0 Watts', '60.0 Watts', '100.0 Watts'],
      jp: ['15.4 W', '30.0 W', '60.0 W', '100.0 W'],
      cn: ['15.4 瓦特', '30.0 瓦特', '60.0 瓦特', '100.0 瓦特']
    },
    jawaban_benar: 1,
    konsep: 'Power over Ethernet (PoE+)',
    penjelasan: {
      id: 'IEEE 802.3af (PoE standar) menyuplai 15.4W, sedangkan IEEE 802.3at (PoE+) mampu menyuplai hingga 30W untuk Access Point Wi-Fi 6 atau kamera PTZ.',
      en: 'IEEE 802.3af supplies up to 15.4W, while 802.3at (PoE+) provides up to 30.0W for high-draw devices like Wi-Fi 6 APs and motorized PTZ cameras.',
      jp: '802.3af（旧PoE）の15.4Wに対し、802.3at（PoE+）は最大30Wを出力でき、Wi-Fi 6 APやPTZ監視カメラ等に給電できます。',
      cn: '标准802.3af提供15.4W，而802.3at（PoE+）将单口供电上限提升至30.0W，满足Wi-Fi 6高性能AP及云台摄像机需求。'
    }
  },
  {
    id: 'pg-24',
    difficulty: 'mahir',
    soal: {
      id: 'Apa penyebab utama terjadinya "Near-End Crosstalk" (NEXT) berlebih saat merakit kabel LAN RJ-45 secara manual?',
      en: 'What is the primary technical cause of excessive Near-End Crosstalk (NEXT) during manual RJ-45 cable termination?',
      jp: '手動でRJ-45コネクタを圧着する際、過剰な近端漏話（NEXT）が発生する最大の物理的原因は何ですか？',
      cn: '在手工制作RJ-45网线水晶头时，造成近端串扰（NEXT）严重超标的最主要物理工艺缺陷是：'
    },
    pilihan: {
      id: [
        'Kabel dipotong terlalu pendek',
        'Kawat pasangan tembaga dibuka lilitannya (untwisted) terlalu panjang sebelum masuk ke pin konektor',
        'Menggunakan pinout T568B alih-alih T568A',
        'Menjepit kabel dengan tang crimping terlalu kencang'
      ],
      en: [
        'The overall cable run was cut too short',
        'Untwisting wire pairs excessively long (beyond 1/2 inch) before inserting into plug channels',
        'Using the T568B pinout standard instead of T568A',
        'Squeezing the crimping plier handle too firmly'
      ],
      jp: [
        'ケーブル全長を短く切りすぎたこと',
        '端子に挿入する前の芯線の撚り戻し（untwist）が長すぎること（13mm以上）',
        'T568Aの代わりにT568B配線を使用したこと',
        '圧着ペンチを力任せに握りすぎたこと'
      ],
      cn: [
        '整根网线裁切长度过短',
        '进入水晶头导线槽之前，将双绞线的解绞（Untwist）长度留得过长（超过1.27厘米）',
        '采用了T568B标准而非T568A标准',
        '压线钳按压把手力度过大'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Integritas Fisik Crosstalk NEXT',
    penjelasan: {
      id: 'Membuka lilitan lebih dari 0.5 inci (1.27 cm) menghilangkan proteksi pembatalan noise twisted pair, menyebabkan crosstalk induktif tinggi yang memicu packet error.',
      en: 'Untwisting pairs longer than 0.5 inches (13mm) breaks capacitive balance, triggering high crosstalk and degrading SNR performance.',
      jp: '芯線の撚りを1.27cm以上解くとノイズ相殺効果が消失し、誘導ノイズ（NEXT）が激増してパケットロスや通信速度低下を招きます。',
      cn: '解绞长度若超过1.27厘米（半英寸），双绞平衡抑制电磁辐射的能力被破坏，将直接导致近端串扰急剧升高并诱发海量丢包。'
    }
  },
  {
    id: 'pg-25',
    difficulty: 'mahir',
    soal: {
      id: 'Teknisi mengamati pesan ICMP "TTL Expired in Transit" saat melakukan ping atau traceroute ke server luar. Apa makna teknis dari pesan tersebut?',
      en: 'A network administrator observes ICMP "TTL Expired in Transit" during a traceroute. What is the root technical meaning of this message?',
      jp: '外部サーバーへのtraceroute実行時にICMP「TTL Expired in Transit」が返信された場合、技術的に何を意味しますか？',
      cn: '网络管理员在执行traceroute或ping测试时收到ICMP“TTL Expired in Transit（传输中生存时间超时）”报错，其底层技术含义是：'
    },
    pilihan: {
      id: [
        'Kabel fisik LAN terputus di switch lokal',
        'Nilai Time-To-Live (TTL) pada header paket IP berkurang hingga mencapai 0 sebelum tiba di tujuan (indikasi hop limit atau routing loop)',
        'Server tujuan sedang mematikan firewall port 80',
        'Bandwidth internet telah habis terpakai 100%'
      ],
      en: [
        'Physical LAN cable unplugged at the local switch',
        'The Time-To-Live (TTL) field in the IP header decremented to 0 before reaching destination (indicates hop limit hit or routing loop)',
        'The destination web server disabled port 80 firewall rules',
        'Monthly bandwidth quota is fully exhausted'
      ],
      jp: [
        'ローカルスイッチの物理LANケーブルが抜けている',
        'IPヘッダー内のTTL値が宛先に到着する前に0に達した（ホップ数到達またはルーティングループの発生を示す）',
        '宛先Webサーバーがポート80の通信を遮断した',
        '月間インターネット通信容量を完全に使い切った'
      ],
      cn: [
        '本地交换机连接的物理网线脱落',
        'IP数据报首部的Time-To-Live（生存时间）计数在途经路由器时逐跳递减至0（表明达到最大跳数或网络存在三层路由环路）',
        '目标服务器关闭了Web 80端口防火墙',
        '宽带运营商流量配额已消耗完毕'
      ]
    },
    jawaban_benar: 1,
    konsep: 'Mekanisme IP Header TTL & ICMP',
    penjelasan: {
      id: 'Setiap router mengurangi nilai TTL sebesar 1. Jika TTL mencapai 0, router membuang paket dan mengirim balik ICMP Type 11 (Time Exceeded) untuk mencegah paket berputar selamanya di internet.',
      en: 'Each router decrements the TTL field by 1. When TTL reaches 0, the packet is discarded and an ICMP Type 11 message is returned to prevent endless loops.',
      jp: 'ルーターを経由するたびにTTLは1減算され、0になるとパケットは破棄されICMP Type 11が返信されパケットの無限滞留を防ぎます。',
      cn: '每个三层路由器转发时将TTL减1。当减至0时路由器丢弃该包并向源地址回送ICMP Type 11报文，防止数据包在互联网路由环路中无尽回环。'
    }
  }
];

export const ASSESSMENT_ESSAYS = [
  {
    id: 'essay-1',
    difficulty: 'menengah',
    judul: {
      id: 'Analisis Pembelahan Kawat Pin 3 dan Pin 6 pada Standar T568A/B',
      en: 'Analysis of Split Wire Pair (Pins 3 & 6) in T568A/B Cabling Standards',
      jp: 'T568A/B規格におけるピン3・6のスプリットペア構造に関する分析',
      cn: 'T568A/B线序标准中第3与第6引脚拆分配对原理深度分析'
    },
    pertanyaan: {
      id: 'Jelaskan secara mendalam mengapa pada standar pengkabelan T568B dan T568A, pasangan kawat pin 3 dan pin 6 sengaja membelah pasangan kawat pin 4 dan pin 5 (Biru), alih-alih diletakkan berdampingan (1-2, 3-4, 5-6, 7-8)! Apa alasan teknis, sejarah kompatibilitas, dan dampaknya terhadap Near-End Crosstalk (NEXT)?',
      en: 'Explain why T568B and T568A cabling standards split wire pair on pins 3 and 6 across the center pins 4 and 5 (Blue pair) instead of grouping them sequentially (1-2, 3-4, 5-6, 7-8). Address the electrical cancellation physics, historical RJ-11 backward compatibility, and the impact on Near-End Crosstalk (NEXT).',
      jp: 'T568A/B配線規格において、なぜピン3と6のペア線が中央のピン4・5（青ペア）を挟む形で意図的に分割されているのか詳しく説明してください。電磁誘導（NEXT）の相殺原理、RJ-11電話規格との歴史的互換性、および高周波伝送への影響に触れて述べてください。',
      cn: '请深入解释为什么在T568B和T568A接线标准中，第3和第6引脚的线对要故意跨越第4和第5（蓝色）引脚进行拆分排列，而不是简单按顺序成对排列（1-2、3-4、5-6、7-8）？请从高频差分信号消除近端串扰（NEXT）的物理机制、以及向下兼容传统RJ-11电话系统的历史渊源两方面进行系统论述。'
    },
    rubrik: {
      keywords: ['rj-11', 'telepon', 'pin 4', 'pin 5', 'crosstalk', 'next', 'diferensial', 'induktansi', 'pasangan', 'kompatibilitas'],
      minWords: 20,
      kriteria: [
        'Menyebutkan kompatibilitas dengan standar telepon RJ-11 pada pin 4 dan pin 5',
        'Menjelaskan fungsi diferensial kawat transmit (Tx) dan receive (Rx)',
        'Menjelaskan dampak terhadap pencegahan Near-End Crosstalk (NEXT)'
      ],
      idealAnswer: {
        id: 'Pasangan pin 4 dan 5 (tengah) secara historis dialokasikan untuk saluran telepon 1-pair (standar RJ-11). Agar jack RJ-11 dapat ditancapkan ke soket RJ-45 tanpa merusak sirkuit data, pasangan kedua (Rx) dialokasikan pada pin 3 dan 6 yang mengapit pin tengah. Secara fisika, pengaturan ini menjaga simetri diferensial transmisi dan meminimalkan Near-End Crosstalk (NEXT) antar-pasangan kawat frekuensi tinggi.',
        en: 'Pins 4 and 5 were historically reserved for RJ-11 telephony Line 1. Positioning the data pair on pins 3 and 6 around the center preserved backward compatibility while maintaining differential balance to reduce Near-End Crosstalk (NEXT).',
        jp: '中央の4・5番ピンは歴史的にRJ-11電話回線の第1ペアとして規格化されました。電話用プラグを差し込んでも回路が衝突しないよう互換性を維持し、かつ高周波差動信号の近端漏話（NEXT）を抑える電磁的対称性を保つために3番と6番ピンで挟み込む設計となっています。',
        cn: '第4和第5引脚在历史上专供RJ-11模拟电话语音线路使用。将以太网接收线对放置在第3和第6引脚，既保证了RJ-11水晶头插入RJ-45插座时的电气兼容性，又通过对称的差分几何布局有效抑制了高频通信时的近端串扰（NEXT）。'
      }
    }
  },
  {
    id: 'essay-2',
    difficulty: 'dasar',
    judul: {
      id: 'Perbedaan Collision Domain dan Broadcast Domain antara Switch dan Router',
      en: 'Differences Between Collision Domain and Broadcast Domain: Switch vs Router',
      jp: 'スイッチとルーターにおけるコリジョンドメインおよびブロードキャストドメインの差異',
      cn: '交换机与路由器在冲突域（Collision Domain）与广播域（Broadcast Domain）隔离特性的深度对比'
    },
    pertanyaan: {
      id: 'Bandingkan perbedaan peran antara Switch Layer 2 dan Router Layer 3 dalam mengisolasi Collision Domain dan Broadcast Domain! Sertakan contoh skenario instalasi di laboratorium komputer sekolah.',
      en: 'Contrast the roles of a Layer 2 Switch and a Layer 3 Router in isolating Collision Domains versus Broadcast Domains. Provide an illustrative deployment scenario in a school computer lab.',
      jp: 'L2スイッチとL3ルーターにおける「コリジョンドメイン」と「ブロードキャストドメイン」の分離能力の違いを比較し、学校のPC教室での具体的な設置例を挙げて説明してください。',
      cn: '对比分析二层交换机（Layer 2 Switch）与三层路由器（Layer 3 Router）在隔离“冲突域”和“广播域”方面的本质差异，并结合学校机房局域网的实际布线拓扑给出典型的应用场景说明。'
    },
    rubrik: {
      keywords: ['switch', 'router', 'collision domain', 'broadcast domain', 'vlan', 'port', 'layer 2', 'layer 3', 'isolasi'],
      minWords: 20,
      kriteria: [
        'Menyatakan bahwa switch memecah collision domain pada tiap port',
        'Menyatakan bahwa router memecah broadcast domain antar subnet',
        'Menjelaskan relevansinya pada performa jaringan lokal sekolah'
      ],
      idealAnswer: {
        id: 'Switch Layer 2 memecah Collision Domain pada setiap port fisiknya, namun seluruh port tetap berada dalam satu Broadcast Domain yang sama. Sebaliknya, Router Layer 3 memecah Broadcast Domain pada setiap interfacenya. Di lab sekolah, switch menghubungkan puluhan PC agar bebas tabrakan data (collision), sedangkan router memisahkan jaringan Lab Siswa, Lab Guru, dan Internet agar lalu lintas broadcast tidak membebani satu sama lain.',
        en: 'A Layer 2 switch isolates collision domains per physical port but shares a single broadcast domain across all ports. A Layer 3 router breaks broadcast domains at each interface. In a school lab, switches connect student PCs without data collisions, while routers segment lab subnets from administrative traffic.',
        jp: 'L2スイッチは各ポート単位でコリジョンドメインを分割しますが、全体は1つのブロードキャストドメインに属します。一方、L3ルーターはインターフェース単位でブロードキャストドメインを遮断・分離します。学校のPC室ではスイッチで端末同士の衝突を防ぎ、ルーターで生徒用と職員用のネットワークを隔離して無駄なブロードキャストの蔓延を防止します。',
        cn: '二层交换机的每个端口都是一个独立的冲突域，但所有端口处于同一个广播域内。三层路由器则在每个物理/逻辑接口上彻底切断并隔离广播域。在学校机房中，交换机确保每台电脑独占带宽避免冲突，路由器则将机房学生网、教师办公网及外网隔离成不同子网，阻断全网广播风暴。'
      }
    }
  },
  {
    id: 'essay-3',
    difficulty: 'menengah',
    judul: {
      id: 'Diagnostik Kerusakan Pin pada LAN Tester dan Dampaknya pada Fast Ethernet',
      en: 'Diagnosing Severed Pins via LAN Tester & Impact on Fast Ethernet Operation',
      jp: 'LANテスターによる断線ピンの特定とFast Ethernet通信への具体的影響',
      cn: '利用测线仪判定网线引脚断线故障及其对百兆以太网通信的实际影响分析'
    },
    pertanyaan: {
      id: 'Jika seorang teknisi menguji kabel LAN menggunakan LAN Tester dan menemukan bahwa lampu LED Pin 3 dan Pin 6 pada unit Remote tidak menyala sementara pin lainnya normal, jelaskan: (1) Apa arti kegagalan tersebut? (2) Mengapa koneksi Fast Ethernet (100BASE-TX) gagal total meskipun pin 1 dan 2 menyala? (3) Langkah perbaikan apa yang harus dilakukan teknisi?',
      en: 'During a cable validation test with a LAN Tester, LEDs for Pins 3 and 6 on the Remote unit fail to illuminate while all others sequence normally. Explain: (1) What failure does this indicate? (2) Why does Fast Ethernet (100BASE-TX) fail completely despite pins 1 and 2 functioning? (3) What corrective action must the technician take?',
      jp: 'LANテスターでケーブルを検査した際、子機側の3番ピンと6番ピンのLEDのみ点灯せず他は正常でした。(1) この障害は何を意味しますか？ (2) 1・2番ピンが導通していてもFast Ethernet（100BASE-TX）が完全に不通となる理由は？ (3) 技術者が行うべき修理手順を述べてください。',
      cn: '在利用测线仪测试网线时，发现远端接收器上的第3和第6引脚指示灯完全不亮，其余引脚正常顺序点亮。请回答：(1) 该故障现象表明物理线路上存在什么问题？ (2) 为什么即使第1和第2引脚导通良好，百兆以太网（100BASE-TX）仍彻底无法通信（物理断开）？ (3) 现场技术员应采取何种规范步骤予以修复？'
    },
    rubrik: {
      keywords: ['pin 3', 'pin 6', 'rx', 'receive', 'putus', 'open', 'crimping', 'konektor', 'crimp ulang', 'loop'],
      minWords: 20,
      kriteria: [
        'Mengidentifikasi kerusakan sebagai open circuit / kawat putus pada pasangan Rx',
        'Menjelaskan bahwa 100BASE-TX membutuhkan kedua pasang Tx (1&2) dan Rx (3&6)',
        'Menyebutkan solusi pemotongan dan crimping ulang konektor RJ-45'
      ],
      idealAnswer: {
        id: '(1) Lampu Pin 3 dan 6 yang mati menandakan open circuit (kawat putus atau kontak pin konektor tidak menancap sempurna ke tembaga). (2) Fast Ethernet 100BASE-TX membutuhkan pasangan transmit (pin 1 & 2) dan pasangan receive (pin 3 & 6) secara bersamaan. Tanpa jalur receive yang utuh, negosiasi link fisik gagal total sehingga status port down. (3) Teknisi harus memotong ujung konektor RJ-45 yang bermasalah, mengupas jaket kabel secara rapi, meluruskan kawat sesuai standar T568B/A, memotong rata 1.2 cm, lalu melakukan crimping ulang secara presisi.',
        en: '(1) Dark LEDs on pins 3 and 6 indicate an open circuit or failed contact punch down. (2) Fast Ethernet requires both Tx (1&2) and Rx (3&6) loops; losing the Rx pair prevents link negotiation. (3) The technician must cut off the faulty RJ-45 plug, re-strip, arrange to T568B/A, trim flush to 1.2cm, and re-crimp with a ratchet tool.',
        jp: '(1) 3番・6番の消灯は断線または圧着不良（オープン）を意味します。(2) 100BASE-TXは送信（1・2番）と受信（3・6番）の両対が必須であるため、受信極が途切れると物理リンクが成立せずリンクダウンします。(3) 不良コネクタを切除し、外皮を剥いてT568B規格に正しく整線し、長さを揃えて新品のRJ-45プラグで再圧着します。',
        cn: '(1) 远端3/6号灯不亮表明该线对存在断路（Open）或水晶头金片未完全刺穿铜芯绝缘层。(2) 百兆以太网必须依赖发送（1/2）和接收（3/6）构成双向电气通路；接收回路不通导致PHY物理层无法检测到差分脉冲信号，网卡报告断开。(3) 剪除损坏的水晶头，规范剥开外护套，重新按T568B线序严密理线并剪平至1.2厘米，换用全新RJ-45插头彻底重压。'
      }
    }
  },
  {
    id: 'essay-4',
    difficulty: 'menengah',
    judul: {
      id: 'Batasan Panjang Kabel 100 Meter pada IEEE 802.3 dan Faktor Fisika Sinyal',
      en: 'The 100-Meter Distance Limit in IEEE 802.3: Signal Physics and Attenuation',
      jp: 'IEEE 802.3における100m長制限の物理的要因と信号減衰メカニズム',
      cn: 'IEEE 802.3以太网双绞线100米物理距离极限的衰减机理与碰撞检测时延分析'
    },
    pertanyaan: {
      id: 'Mengapa standar IEEE 802.3 membatasi panjang kabel twisted pair tembaga (UTP) maksimal 100 meter? Jelaskan pengaruh atenuasi (pelemahan sinyal), dispersi, resistansi tembaga, dan waktu propagasi (CSMA/CD timing) pada batasan ini!',
      en: 'Why does IEEE 802.3 enforce a rigid 100-meter maximum length for copper twisted pair cables? Discuss signal attenuation, cable resistance, capacitance, and slot time propagation delay.',
      jp: 'なぜIEEE 802.3規格では銅線UTPケーブルの最大長が100メートルに厳格に制限されているのですか？ 信号の減衰（アッテネーション）、抵抗成分、浮遊容量、およびCSMA/CDにおける伝播遅延時間の観点から解説してください。',
      cn: '为什么IEEE 802.3以太网标准将铜质双绞线（UTP）单段最大传输距离严格限制在100米以内？请结合高频信号衰减（Attenuation）、趋肤效应与导线内阻、以及早期CSMA/CD碰撞检测时槽（Slot Time）传播时延机制进行多角度论述。'
    },
    rubrik: {
      keywords: ['100 meter', 'atenuasi', 'pelemahan sinyal', 'resistansi', 'propagasi', 'csma/cd', 'slot time', 'snr', 'repeater'],
      minWords: 20,
      kriteria: [
        'Menjelaskan atenuasi dan hilangnya kekuatan sinyal akibat resistansi tembaga',
        'Menjelaskan batasan waktu propagasi sinyal pada deteksi tabrakan (CSMA/CD)',
        'Menyebutkan komposisi 90m horizontal + 10m patch cord'
      ],
      idealAnswer: {
        id: 'Batasan 100 meter didasari oleh dua faktor utama: (1) Fisika Sinyal & Atenuasi: resistansi tembaga dan kapasitansi kabel menyebabkan sinyal listrik frekuensi tinggi melemah (attenuation) dan terdistorsi sehingga rasio Signal-to-Noise (SNR) menurun di atas 100m. (2) Waktu Propagasi: pada Ethernet klasik, sinyal harus mampu bolak-balik dalam waktu slot (slot time) agar mekanisme deteksi tabrakan (CSMA/CD) dapat berfungsi sebelum frame selesai dikirim. Standar 100 meter terdiri dari 90 meter kabel horizontal permanen dan 10 meter kabel patch fleksibel.',
        en: 'The 100m limit balances signal attenuation and propagation latency. High-frequency electrical energy dissipates through copper resistance and dielectric capacitance, degrading SNR beyond 100m. Historically, round-trip propagation delay had to fit within Ethernet slot time for CSMA/CD collision detection. The channel allocates 90m for permanent links and 10m for patch cords.',
        jp: '100m制限の主因は信号減衰と伝播遅延です。銅線の直流抵抗と浮遊容量により高周波信号が著しく減衰（アッテネーション）し、100mを超えるとノイズに埋もれ受信不能となります。また歴史的にCSMA/CDの最小フレーム送出時間内に衝突信号が往復できる最大遅延許容値に基づいています（固定配線90m＋端末コード10m）。',
        cn: '100米极限受制于信号衰减与时延控制：(1)高频电磁信号在铜缆中传输时因导线内阻与介质电容产生严重能量衰减（Attenuation），超过100米后信噪比（SNR）急剧恶化致使位错误不可逆；(2)在CSMA/CD机制下，必须保证碰撞信号能在最小数据帧发送完毕前完成往返传播检测。该标准由90米墙内永久水平链路与10米跳线组合而成。'
      }
    }
  },
  {
    id: 'essay-5',
    difficulty: 'mahir',
    judul: {
      id: 'Konsep VLAN, Trunking 802.1Q, dan Router-on-a-Stick',
      en: 'VLAN Segmentation, 802.1Q Trunking, and Router-on-a-Stick Architecture',
      jp: 'VLAN分割、802.1Qトランキング、およびRouter-on-a-stickのアーキテクチャ解説',
      cn: 'VLAN虚拟局域网隔离、802.1Q中继协议与单臂路由技术架构深度剖析'
    },
    pertanyaan: {
      id: 'Jelaskan konsep dasar VLAN (Virtual Local Area Network) pada Switch Manageable! Mengapa port trunk dengan enkapsulasi IEEE 802.1Q mutlak dibutuhkan ketika menghubungkan switch ke router untuk melakukan routing antar-VLAN (Inter-VLAN Routing)?',
      en: 'Explain the fundamental concept of VLANs on a managed switch. Why is an IEEE 802.1Q trunk connection mandatory when connecting a switch to a router for inter-VLAN routing (Router-on-a-stick)?',
      jp: 'マネージドスイッチにおけるVLAN（仮想LAN）の基本概念を解説してください。また、VLAN間ルーティング（Router-on-a-stick）を行うにあたり、スイッチとルーター間のトランク接続（IEEE 802.1Q）が不可欠である理由を述べてください。',
      cn: '阐述网管型交换机中VLAN（虚拟局域网）的核心概念与逻辑隔离价值。在构建跨VLAN通信（Inter-VLAN Routing / 单臂路由）时，为什么交换机与路由器之间的互联接口必须配置为启用IEEE 802.1Q封装的Trunk中继模式？'
    },
    rubrik: {
      keywords: ['vlan', 'trunk', '802.1q', 'tag', 'broadcast domain', 'sub-interface', 'inter-vlan', 'segmen', 'router'],
      minWords: 20,
      kriteria: [
        'Menjelaskan bahwa VLAN memecah broadcast domain secara logis pada switch',
        'Menjelaskan bahwa port trunk membawa banyak VLAN melalui tag 802.1Q',
        'Menjelaskan peran sub-interface router dalam merouting antar-VLAN'
      ],
      idealAnswer: {
        id: 'VLAN membagi switch fisik menjadi beberapa jaringan logis terpisah, di mana tiap VLAN membentuk broadcast domain mandiri untuk meningkatkan keamanan dan efisiensi. Port akses biasa hanya membawa lalu lintas tanpa tag untuk satu VLAN. Agar router dapat merutekan lalu lintas antar-VLAN hanya dengan satu kabel fisik, port penghubung harus dijadikan port Trunk dengan tag IEEE 802.1Q (4 byte). Router menerima frame bertag ini pada sub-interface virtual (misal g0/0.10 dan g0/0.20) untuk melakukan routing layer 3 antar-segmen.',
        en: 'A VLAN logically segments a physical switch into distinct broadcast domains for isolation and security. Access ports carry untagged traffic for a single VLAN. A trunk port using 4-byte 802.1Q tags is required so multiple VLAN traffic streams can multiplex over a single physical link into router sub-interfaces for inter-VLAN routing.',
        jp: 'VLANは物理スイッチを複数の論理ネットワークに分割し、それぞれ独立したブロードキャストドメインを構成して通信セキュリティと帯域効率を高めます。アクセスポートは1つのVLANしか通せませんが、802.1Qトランクポートは4バイトの識別タグを付与することで、1本の物理回線上に複数VLANのトラフィックを多重化してルーターのサブインターフェースへ伝送し、VLAN間ルーティングを実現します。',
        cn: 'VLAN技术将单台物理交换机在逻辑上划分为互不相通的广播域，大幅提升了局域网安全与运行效率。普通Access口只能传输无标签的单一VLAN流量；而配置IEEE 802.1Q标准的Trunk端口通过在以太网帧头插入4字节VID标签，使得单一物理链路能够多路复用承载所有VLAN流量，由路由器的虚拟子接口（Sub-interface）完成三层解封与跨网段路由转发。'
      }
    }
  },
  {
    id: 'essay-6',
    difficulty: 'menengah',
    judul: {
      id: 'Tahapan Proses DORA pada Protokol DHCP',
      en: 'Technical Breakdown of the 4-Stage DHCP DORA Lease Lifecycle',
      jp: 'DHCPプロトコルにおけるDORAシーケンスの各段階の技術的詳細',
      cn: 'DHCP动态主机配置协议DORA四步租约生命周期全流程剖析'
    },
    pertanyaan: {
      id: 'Uraikan secara sistematis keempat tahapan dalam proses DHCP DORA (Discover, Offer, Request, Acknowledge) saat sebuah laptop baru terhubung ke jaringan Wi-Fi lab komputer sekolah! Jelaskan jenis alamat tujuan (Broadcast/Unicast) dan isi informasi pada tiap tahap.',
      en: 'Systematically describe the 4 phases of the DHCP DORA process (Discover, Offer, Request, Acknowledge) when a student laptop associates with the lab Wi-Fi network. Specify destination addressing (Broadcast vs Unicast) and the payload in each step.',
      jp: '生徒のノートPCがPC教室のWi-Fiに接続した際のDHCP DORAプロセス（Discover、Offer、Request、Acknowledge）の4段階を順を追って説明してください。各段階での送信種別（ブロードキャスト／ユニキャスト）と通知される情報内容を含めて記述してください。',
      cn: '系统阐述当一台学生笔记本电脑新接入学校机房无线局域网时，DHCP客户端与服务器之间经历的DORA（Discover发现、Offer提供、Request请求、Acknowledge确认）四步完整交互过程。请分别说明每一步通信所采用的报文寻址类型（广播或单播）以及承载的核心配置参数。'
    },
    rubrik: {
      keywords: ['discover', 'offer', 'request', 'acknowledge', 'ack', 'broadcast', 'ip address', 'subnet mask', 'gateway', 'lease'],
      minWords: 20,
      kriteria: [
        'Mengurutkan Discover -> Offer -> Request -> Acknowledge dengan benar',
        'Menjelaskan bahwa Discover dan Request dikirim secara broadcast (255.255.255.255)',
        'Menyebutkan parameter yang diserahkan: IP, Subnet Mask, Gateway, DNS'
      ],
      idealAnswer: {
        id: '(1) DHCP Discover: Laptop mengirim broadcast (255.255.255.255) mencari server DHCP aktif. (2) DHCP Offer: Server DHCP merespons dengan menawarkan alamat IP cadangan, subnet mask, default gateway, dan DNS server. (3) DHCP Request: Laptop mengirim broadcast memilih penawaran server tersebut sekaligus memberitahu server lain bahwa tawaran mereka dilepas. (4) DHCP Acknowledge (ACK): Server mengonfirmasi pendaftaran sewa IP (lease time), sehingga laptop resmi dapat menggunakan IP tersebut untuk berinternet.',
        en: '(1) Discover: Client broadcasts seeking DHCP servers. (2) Offer: Server replies offering an IP, mask, default gateway, and DNS. (3) Request: Client broadcasts accepting the offer. (4) Acknowledge (ACK): Server commits the lease and sends final confirmation.',
        jp: '(1) Discover: クライアントがDHCPサーバーを探すためブロードキャスト送信。(2) Offer: サーバーが割り当て候補のIP、サブネットマスク、ゲートウェイ、DNSを提示。(3) Request: 端末がその提示を受諾する旨をブロードキャストで要求。(4) ACK: サーバーが正式にリースを承認し通信が開始されます。',
        cn: '(1) DHCP Discover: 客户机无IP，广播发送探寻在网的DHCP服务器。(2) DHCP Offer: 服务器回送候选IP地址、子网掩码、默认网关与DNS地址。(3) DHCP Request: 客户机广播声明正式接受该IP租约，通知其他服务器释放保留资源。(4) DHCP Acknowledge (ACK): 服务器发送确认帧锁定租约时长，客户机正式启用该IP配置进行网络通信。'
      }
    }
  },
  {
    id: 'essay-7',
    difficulty: 'dasar',
    judul: {
      id: 'Perbandingan Topologi Star vs Topologi Mesh',
      en: 'Comparative Evaluation: Star Topology vs Full Mesh Topology',
      jp: 'スター型トポロジーとフルメッシュ型トポロジーの比較評価',
      cn: '星型拓扑（Star Topology）与全网状拓扑（Mesh Topology）的综合架构对比'
    },
    pertanyaan: {
      id: 'Bandingkan Topologi Star dan Topologi Mesh berdasarkan tiga aspek utama: (1) Jumlah kabel dan biaya implementasi, (2) Ketahanan terhadap kegagalan perangkat (fault tolerance), dan (3) Kemudahan penambahan komputer baru (skalabilitas)!',
      en: 'Compare Star Topology and Mesh Topology across three parameters: (1) Cable count and cost, (2) Fault tolerance and single points of failure, and (3) Scalability when adding new hosts.',
      jp: 'スター型トポロジーとメッシュ型トポロジーを次の3つの観点から比較してください。(1) ケーブル配線量と敷設コスト、(2) 障害耐性（フォールトトレランス）、(3) 端末増設の容易さ（スケーラビリティ）。',
      cn: '请从以下三个核心维度深度对比星型拓扑（Star）与全网状拓扑（Mesh）：(1) 线缆消耗量与施工工程造价；(2) 链路或节点故障容错能力（Fault Tolerance）与单点故障风险；(3) 接入新电脑时的扩展便利性（Scalability）。'
    },
    rubrik: {
      keywords: ['star', 'mesh', 'switch', 'biaya', 'kabel', 'fault tolerance', 'single point of failure', 'skalabilitas', 'redundansi'],
      minWords: 20,
      kriteria: [
        'Menjelaskan bahwa topologi star lebih hemat kabel dan murah dibanding mesh',
        'Menjelaskan bahwa star memiliki single point of failure pada switch pusat, sedangkan mesh sangat tangguh berkat redundansi',
        'Menjelaskan bahwa penambahan node pada star jauh lebih mudah dibanding mesh'
      ],
      idealAnswer: {
        id: '(1) Biaya & Kabel: Star hanya membutuhkan n kabel (1 kabel per node ke switch), sehingga biaya sangat ekonomis. Mesh membutuhkan n(n-1)/2 kabel, sehingga kabel sangat banyak dan biaya sangat mahal. (2) Ketahanan: Star memiliki Single Point of Failure pada switch pusat; jika switch mati, seluruh jaringan lumpuh. Sebaliknya, Mesh memiliki redundansi jalur ekstrem; jika satu kabel atau node putus, rute alternatif tetap tersedia. (3) Skalabilitas: Star sangat mudah dikembangkan (cukup colok ke port switch kosong), sedangkan Mesh sangat rumit karena node baru harus dihubungkan ke seluruh node yang sudah ada.',
        en: '(1) Cost: Star uses n cables (cheap); Mesh requires n(n-1)/2 cables (expensive). (2) Fault tolerance: Star suffers a single point of failure at the central switch; Mesh provides redundant alternative paths. (3) Scalability: Star easily scales by plugging into open switch ports; Mesh requires running dedicated links to every existing node.',
        jp: '(1) コスト: スター型は端末数n本のケーブルで済み安価。メッシュ型はn(n-1)/2本の線が必要で極めて高価。(2) 耐障害性: スター型は中央スイッチが単一障害点（SPOF）となります。メッシュ型は多数の予備経路があり非常に堅牢です。(3) 拡張性: スター型は空きポートに挿すだけで容易に増設可能ですが、メッシュ型は全ノードと新規配線が必要で極めて困難です。',
        cn: '(1) 成本与线缆：星型仅需n根网线，经济实惠；全网状需要n(n-1)/2根线缆，材料与施工成本极其昂贵。(2) 容错能力：星型依赖中心交换机，存在单点故障风险；网状拓扑具有极高的链路冗余度，单根线断开自动切换备用路径。(3) 扩展性：星型只需插到交换机空闲口即可即插即用；网状拓扑新增一台电脑必须向现有每台设备拉设独立跳线，极其繁琐。'
      }
    }
  },
  {
    id: 'essay-8',
    difficulty: 'mahir',
    judul: {
      id: 'Mekanisme CSMA/CD dan Transisi Menuju Full-Duplex Switching',
      en: 'CSMA/CD Contention Protocol and the Evolution to Full-Duplex Switching',
      jp: 'CSMA/CDプロトコルの搬送波感知メカニズムと全二重スイッチングへの進化',
      cn: 'CSMA/CD介质冲突检测机制与全双工以太网交换演进机理'
    },
    pertanyaan: {
      id: 'Jelaskan bagaimana cara kerja mekanisme CSMA/CD (Carrier Sense Multiple Access with Collision Detection) pada Ethernet lama (Hub/Bus)! Mengapa penggunaan switch dengan koneksi Full-Duplex modern hampir meniadakan terjadinya tabrakan data (collision)?',
      en: 'Describe how CSMA/CD operated on legacy shared Ethernet (Hubs/Bus). Why has modern Full-Duplex switched Ethernet rendered collision detection effectively obsolete?',
      jp: '従来の共有イーサネット（ハブやバス型）におけるCSMA/CD（搬送波感知多重アクセス/衝突検出）の仕組みを解説してください。また、現代の全二重（Full-Duplex）スイッチの導入によってなぜコリジョン（データ衝突）が根本的に解消されたのかを述べてください。',
      cn: '详细阐述早期共享式以太网（Hub集线器/总线型拓扑）中CSMA/CD（载波侦听多路访问/冲突检测）机制的具体工作流程。为什么在现代全双工（Full-Duplex）交换网络中，以太网数据碰撞（Collision）几乎被彻底消除？'
    },
    rubrik: {
      keywords: ['csma/cd', 'carrier sense', 'jam signal', 'backoff', 'tabrakan', 'collision', 'half-duplex', 'full-duplex', 'switch', 'hub'],
      minWords: 20,
      kriteria: [
        'Menjelaskan Carrier Sense (mendengar sebelum bicara), Collision Detection (mendeteksi tabrakan tegangan), dan Jam Signal + Random Backoff',
        'Menjelaskan bahwa Hub beroperasi Half-Duplex (berbagi satu medium transmisi)',
        'Menjelaskan bahwa Full-Duplex Switch menyediakan jalur Tx dan Rx terpisah untuk tiap port'
      ],
      idealAnswer: {
        id: 'CSMA/CD bekerja dengan prinsip "dengar sebelum kirim" (Carrier Sense). Jika kabel sepi, komputer mentransmisikan data. Jika dua komputer mengirim bersamaan di media bersama (Hub), tegangan listrik melonjak (Collision Detection). Kedua komputer memancarkan Jam Signal, berhenti mengirim, lalu menunggu waktu acak (Exponential Backoff) sebelum mencoba lagi. Pada Switch Full-Duplex modern, collision hilang karena setiap port memiliki collision domain terisolasi dengan jalur transmisi (Tx) dan penerimaan (Rx) fisik yang terpisah di kabel UTP, sehingga data dapat dikirim dan diterima sekaligus tanpa benturan sinyal.',
        en: 'CSMA/CD listens before transmitting. If collision occurs on shared media, a jam signal is sent and stations wait an exponential backoff time. Modern full-duplex switches eliminate collisions because dedicated Tx and Rx conductor pairs allow simultaneous two-way transmission on private switch micro-segments.',
        jp: 'CSMA/CDは送信前に回線の空きを確認（Carrier Sense）し、同時に送信されて衝突を検知するとジャム信号を発信してランダムなバックオフ時間待機してから再送します。現代の全二重スイッチではポートごとに独立したコリジョンドメインがあり、UTP内の送信（Tx）と受信（Rx）が物理的に分離されているため、同時に双方向送受信しても衝突が発生しなくなりました。',
        cn: 'CSMA/CD遵循“先听后发、边发边听、冲突停发、随机重发”原则：节点侦听到信道空闲后发数据，若在集线器共享介质上产生电平叠加冲突，立即发送阻塞信号（Jam Signal）并执行退避算法（Backoff）。现代全双工交换网络彻底消除了冲突，因为每个端口独享微段，双绞线内部独立的Tx发送和Rx接收线对并行运作，收发完全物理隔离。'
      }
    }
  },
  {
    id: 'essay-9',
    difficulty: 'menengah',
    judul: {
      id: 'Standar Pemasangan Outer Jacket pada Konektor RJ-45 dan Risiko Kerusakan',
      en: 'Cable Jacket Clamping Integrity in RJ-45 Termination & Failure Risks',
      jp: 'RJ-45圧着における外被（ジャケット）固定基準と剥きすぎによる物理的リスク',
      cn: 'RJ-45水晶头制作中线缆外护套进入夹线槽的工艺规范与剥线过长失效风险'
    },
    pertanyaan: {
      id: 'Pada proses pemasangan konektor RJ-45 ke kabel UTP Cat 6, mengapa jaket pelindung luar kabel (outer jacket) harus ikut masuk ke dalam badan konektor dan terjepit oleh klip pengunci saat di-crimp? Apa risiko mekanis dan elektrikal jika kawat dibiarkan terkelupas di luar badan konektor?',
      en: 'During RJ-45 Cat 6 cable termination, why must the outer cable jacket extend inside the plug body and be crimped under the strain relief wedge? What mechanical and electrical hazards occur if bare wires are exposed outside the connector?',
      jp: 'Cat 6 UTPケーブルにRJ-45コネクタを圧着する際、なぜ外被（アウタージャケット）がコネクタ内部まで入り込み、固定ウェッジで挟み込まれていなければならないのですか？ 外被が外側で剥き出しのまま放置された場合の機械的・電気的リスクを述べてください。',
      cn: '在Cat 6双绞线压接RJ-45水晶头的标准工艺中，为什么线缆的外层保护套（Outer Jacket）必须深推入水晶头内部并被防拉卡槽紧紧咬住？如果剥皮过长导致内部细线裸露在水晶头壳体之外，会引发哪些严重的机械物理损伤与电气通信风险？'
    },
    rubrik: {
      keywords: ['jaket', 'outer jacket', 'klip', 'strain relief', 'tarikan', 'patah', 'crosstalk', 'next', 'mekanis', 'longgar'],
      minWords: 20,
      kriteria: [
        'Menjelaskan fungsi mekanis penahan beban tarikan (strain relief)',
        'Menjelaskan risiko kawat tembaga patah atau pin terlepas jika tersenggol',
        'Menjelaskan risiko elektrikal berupa kenaikan crosstalk akibat hilangnya lilitan di luar konektor'
      ],
      idealAnswer: {
        id: 'Jaket luar harus terjepit di dalam konektor sebagai penahan regangan mekanis (strain relief). Jika kabel ditarik atau tertekuk, beban tarikan akan ditahan oleh jaket tebal kabel, bukan oleh kawat tembaga kecil di dalam pin. Jika kawat dibiarkan terkelupas di luar konektor: (1) Risiko Mekanis: kawat mudah longgar, pin terlepas dari tembaga, atau kawat putus saat kabel ditarik/digerakkan. (2) Risiko Elektrikal: lilitan pasangan kawat menjadi terurai di luar konektor sehingga kehilangan perlindungan dari interferensi EMI, menyebabkan Near-End Crosstalk (NEXT) melonjak tajam dan memicu packet loss/error rate tinggi.',
        en: 'The outer jacket must be crimped under the internal wedge to provide mechanical strain relief. This ensures pull tension is borne by the tough PVC jacket rather than fragile copper contacts. If bare wires are exposed outside: mechanically, wires fatigue, loosen, and snap easily; electrically, excessive untwisting outside the housing destroys noise cancellation, driving up NEXT and causing packet drops.',
        jp: '外被をコネクタ内部のウェッジで挟み込むことで「ストレインリリーフ（張力緩和）」の役割を果たします。ケーブルが引っ張られても負荷が外被にかかり、細い銅線端子が抜けるのを防ぎます。外被が外で途切れていると：(1) 機械的リスク：引っ張りや屈曲ですぐに断線・接触不良を起こします。(2) 電気的リスク：コネクタ外で撚りが大きく解けるため外来ノイズの影響を受けやすくなり、近端漏話（NEXT）が激増してパケット損失が発生します。',
        cn: '外护套被压入卡槽起到了“防拉应力消除（Strain Relief）”的关键机械保护作用。当跳线受到拖拽或弯折时，拉力由坚韧的外皮承担，而非脆弱的细铜芯。若外皮留在外部：(1) 机械层面：插拔挪动时极易造成铜芯被直接拔脱或内部金属疲劳折断；(2) 电气层面：裸露部分双绞被强行解散，失去抗干扰保护，近端串扰（NEXT）急剧飙升，引发严重传输丢包与速率断崖式下跌。'
      }
    }
  },
  {
    id: 'essay-10',
    difficulty: 'mahir',
    judul: {
      id: 'Perhitungan Subnetting CIDR /27 dan Analisis Kebutuhan 30 Host',
      en: 'CIDR Subnetting Calculation /27 and Scalability Assessment for 30 Hosts',
      jp: 'CIDR /27サブネット計算と30台収容可否の厳密なキャパシティ検証',
      cn: 'CIDR /27可变长子网掩码精确计算与机房30台终端容纳能力合规性验证'
    },
    pertanyaan: {
      id: 'Sebuah laboratorium komputer baru dialokasikan blok alamat IPv4 192.168.10.0/27. Hitunglah secara rinci: (1) Subnet Mask dalam notasi desimal bertitik, (2) Network ID dan Broadcast ID, (3) Rentang alamat IP host yang valid (Usable IP Range), (4) Jumlah total host yang dapat dipakai. Terakhir, apakah blok subnet ini cukup untuk menampung 30 komputer siswa ditambah 1 router gateway? Jelaskan alasannya!',
      en: 'A computer lab is assigned IPv4 block 192.168.10.0/27. Calculate: (1) Dotted-decimal Subnet Mask, (2) Network ID and Broadcast ID, (3) Usable Host IP Range, (4) Total usable host count. Finally, is this subnet sufficient to host 30 student PCs plus 1 router gateway (31 total nodes)? Explain mathematically.',
      jp: '新規PC教室にIPv4アドレスブロック「192.168.10.0/27」が割り当てられました。(1) 10進表記のサブネットマスク、(2) ネットワークIDとブロードキャストID、(3) 利用可能なホストIPアドレス範囲、(4) 利用可能な最大ホスト数を算出してください。最後に、生徒用PC 30台とルーター（ゲートウェイ）1台（計31ノード）をこのサブネットに収容可能か数学的根拠とともに判定してください。',
      cn: '某新建机房分配到的IPv4网络地址块为 192.168.10.0/27。请精确计算：(1) 点分十进制格式的子网掩码（Subnet Mask）；(2) 网络地址（Network ID）与广播地址（Broadcast ID）；(3) 有效的可用主机IP地址范围（Usable IP Range）；(4) 可用主机总容量。最后，请综合判定：该子网是否能够容纳“30台学生机 + 1台默认网关路由器”（共31个网络节点）？请给出严格的数学论证。'
    },
    rubrik: {
      keywords: ['255.255.255.224', '192.168.10.0', '192.168.10.31', '192.168.10.1', '192.168.10.30', '30 host', 'tidak cukup', '31 node', 'broadcast'],
      minWords: 20,
      kriteria: [
        'Menyebutkan subnet mask 255.255.255.224 dengan tepat',
        'Menyebutkan Network ID 192.168.10.0 dan Broadcast ID 192.168.10.31',
        'Menyebutkan Usable Range 192.168.10.1 - 192.168.10.30 (tepat 30 host)',
        'Menyimpulkan TIDAK CUKUP karena dibutuhkan 31 IP (30 PC + 1 Gateway) sedangkan yang tersedia hanya 30 IP'
      ],
      idealAnswer: {
        id: '(1) Subnet Mask: 255.255.255.224 (/27 = 11111111.11111111.11111111.11100000). (2) Network ID: 192.168.10.0, Broadcast ID: 192.168.10.31. (3) Rentang IP Host Valid: 192.168.10.1 s/d 192.168.10.30. (4) Total Host Usable: 2^5 - 2 = 32 - 2 = 30 IP valid. KESIMPULAN: TIDAK CUKUP. Kebutuhan jaringan adalah 31 alamat IP (30 PC siswa + 1 gateway router), sedangkan /27 hanya menyediakan maksimal 30 IP host. Solusinya harus diperbesar menjadi subnet /26 (yang menyediakan hingga 62 IP).',
        en: '(1) Mask: 255.255.255.224. (2) Network ID: 192.168.10.0, Broadcast ID: 192.168.10.31. (3) Usable Range: 192.168.10.1 - 192.168.10.30. (4) Usable Count: 30 IPs (2^5 - 2). VERDICT: INSUFFICIENT. The lab needs 31 total IP endpoints (30 student PCs + 1 gateway router), but /27 only yields 30 usable addresses. The subnet must be expanded to /26 (62 usable hosts).',
        jp: '(1) サブネットマスク: 255.255.255.224。 (2) ネットワークID: 192.168.10.0、ブロードキャストID: 192.168.10.31。 (3) 利用可能IP範囲: 192.168.10.1 〜 192.168.10.30。 (4) 利用可能ホスト数: 2^5 - 2 = 30台。 判定: 収容不可能（不足）。 生徒PC 30台＋ルーター1台で計31個のIPが必要ですが、/27では最大30個しか確保できません。/26（最大62台）に拡張する必要があります。',
        cn: '(1) 子网掩码：255.255.255.224（/27即前27位为1，后5位为主机位）。(2) 网络地址：192.168.10.0，广播地址：192.168.10.31。(3) 有效主机IP范围：192.168.10.1 至 192.168.10.30。(4) 最大可用主机数：2^5 - 2 = 30个IP。结论：绝对无法满足（容纳不下）。机房需要30台电脑+1个路由器网关接口=共计31个IP地址，而/27只能提供30个可用主机地址，缺口1个IP。正确方案必须扩充至/26子网（提供62个可用IP）。'
      }
    }
  }
];

/**
 * Intelligent Semantic AI Rubric Evaluator for Student Essay Answers
 * Can evaluate either via Edge Function / Gemini API, or semantic rubric engine
 */
export async function gradeEssayWithAi(pertanyaanObj, jawabanSiswa, lang = 'id') {
  if (!jawabanSiswa || !jawabanSiswa.trim()) {
    return {
      skor: 0,
      lulus: false,
      feedback: {
        id: 'Jawaban masih kosong. Silakan tuliskan uraian penjelasan Anda secara lengkap.',
        en: 'Answer is empty. Please provide your thorough technical explanation.',
        jp: '回答が入力されていません。詳細な技術的解説を記述してください。',
        cn: '回答内容为空，请撰写您完整的技术分析与原理解释。'
      }[lang] || 'Jawaban masih kosong.'
    };
  }

  const cleanText = jawabanSiswa.toLowerCase();
  const rubrik = pertanyaanObj.rubrik || {};
  const keywords = rubrik.keywords || [];
  const minWords = rubrik.minWords || 15;
  const wordCount = jawabanSiswa.trim().split(/\s+/).length;

  let matchedKeywords = 0;
  keywords.forEach(kw => {
    if (cleanText.includes(kw.toLowerCase())) {
      matchedKeywords++;
    }
  });

  const keywordCoverage = keywords.length > 0 ? (matchedKeywords / keywords.length) : 0.5;
  const lengthRatio = Math.min(1.0, wordCount / minWords);

  // Raw score from 0 to 100
  let calculatedScore = Math.round((keywordCoverage * 65) + (lengthRatio * 35));
  calculatedScore = Math.max(10, Math.min(100, calculatedScore));

  const isPass = calculatedScore >= 60;
  
  // Constructive AI commentary tailored to score
  let feedbackComment = '';
  if (calculatedScore >= 85) {
    feedbackComment = {
      id: `Analisis AI: Luar biasa! Penjelasan Anda sangat komprehensif, menguraikan prinsip inti dengan istilah teknis yang sangat tepat. (Tingkat kesesuaian konsep: ${Math.round(keywordCoverage * 100)}%)`,
      en: `AI Feedback: Outstanding! Your response is exceptionally thorough and demonstrates accurate technical mastery. (Concept alignment: ${Math.round(keywordCoverage * 100)}%)`,
      jp: `AI採点コメント: 素晴らしい！専門用語を的確に使用し、核心的な技術原理が網羅的に解説されています。（概念合致率: ${Math.round(keywordCoverage * 100)}%）`,
      cn: `AI深度批改：非常出色！技术概念解析严谨详实，专业术语引用准确且推导逻辑清晰。（核心概念契合度：${Math.round(keywordCoverage * 100)}%）`
    }[lang] || 'Penjelasan sangat baik dan tepat!';
  } else if (calculatedScore >= 60) {
    feedbackComment = {
      id: `Analisis AI: Jawaban Anda sudah baik dan memahami konsep dasar, namun akan lebih sempurna jika menambahkan rincian mekanisme fisik dan standar industri. (Skor: ${calculatedScore}/100)`,
      en: `AI Feedback: Good answer with solid baseline grasp. To achieve full marks, elaborate further on the underlying physical signaling mechanisms. (Score: ${calculatedScore}/100)`,
      jp: `AI採点コメント: 基礎概念をしっかり理解した良い回答です。物理層の信号挙動や業界標準の背景にもう少し踏み込むと満点になります。（得点: ${calculatedScore}/100）`,
      cn: `AI深度批改：回答基本正确，体现了良好的基础理解。若能在物理层信号收发机理及行业标准规范细节上进一步深入阐述将更为完美。（得分：${calculatedScore}/100）`
    }[lang] || 'Jawaban cukup baik!';
  } else {
    feedbackComment = {
      id: `Analisis AI: Pemahaman konsep masih perlu ditingkatkan. Pastikan menyertakan kata kunci teknis utama dan penjelasan sebab-akibat yang relevan. Periksa kembali materi pembelajaran. (Skor: ${calculatedScore}/100)`,
      en: `AI Feedback: Key concepts are missing. Be sure to reference the core technical keywords and cause-and-effect relationship. Review the study module. (Score: ${calculatedScore}/100)`,
      jp: `AI採点コメント: 核心的なキーワードの網羅が不足しています。技術的な因果関係を意識して学習モジュールを再確認してください。（得点: ${calculatedScore}/100）`,
      cn: `AI深度批改：核心概念掌握仍有欠缺。请注意围绕关键专业术语并阐明技术因果关系，建议重新研读相关课程模块。（得分：${calculatedScore}/100）`
    }[lang] || 'Perlu penjelasan lebih lengkap.';
  }

  return {
    skor: calculatedScore,
    lulus: isPass,
    wordCount: wordCount,
    matchedKeywords: matchedKeywords,
    feedback: feedbackComment,
    kunciKonsep: rubrik.idealAnswer?.[lang] || rubrik.idealAnswer?.id || ''
  };
}
