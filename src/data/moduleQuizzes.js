const MODULE_QUIZZES = {
  'jaringan-dasar-topologi': [
    {
      soal: {
        id: 'Apa yang dimaksud dengan host dalam jaringan komputer?',
        en: 'What is defined as a host in a computer network?',
        jp: 'コンピュータネットワークにおいて「ホスト」とは何を指しますか？',
        cn: '在计算机网络中，“主机（Host）”的准确定义是什么？'
      },
      pilihan: {
        id: [
          'Perangkat yang terhubung ke jaringan dan dapat mengirim atau menerima data',
          'Kabel utama yang menghubungkan semua switch',
          'Program untuk mengganti alamat IP router',
          'Pusat data yang hanya menyimpan cadangan berkas'
        ],
        en: [
          'A network-connected device capable of transmitting or receiving data',
          'The main backbone cable connecting all switches',
          'A software utility for reassigning router IP addresses',
          'A centralized data center solely storing file backups'
        ],
        jp: [
          'ネットワークに接続され、データを送受信できるエンドポイント機器',
          'すべてのスイッチを連結する主幹線ケーブル',
          'ルーターのIPアドレスを変更するためのシステムプログラム',
          'ファイルバックアップの保存専用データセンター'
        ],
        cn: [
          '连接至网络并具备发送或接收数据能力的终端设备',
          '连接所有交换机的主干通信线缆',
          '用于更改路由器IP地址的系统管理程序',
          '仅用于文件离线备份的数据中心设施'
        ]
      },
      jawaban_benar: 0,
      konsep: { id: 'Host', en: 'Host', jp: 'ホスト', cn: '主机' },
      penjelasan: {
        id: 'Host adalah perangkat yang terhubung ke jaringan, seperti komputer, ponsel, atau printer. Perangkat ini dapat bertukar data melalui jaringan.',
        en: 'A host is any device connected to a network (PC, laptop, smartphone, or printer) assigned a network address to exchange data.',
        jp: 'ホストとは、IPアドレスが割り当てられネットワーク上でデータを送受信するコンピュータ、スマートフォン、プリンターなどの機器を指します。',
        cn: '主机是指分配有网络地址并能在网络中发起或响应通信的任何设备，例如计算机、服务器、手机及网络打印机。'
      }
    },
    {
      soal: {
        id: 'Pada topologi star, ke mana setiap perangkat biasanya terhubung?',
        en: 'In a star topology, where does every endpoint device typically connect?',
        jp: 'スター型トポロジーにおいて、各端末は通常どこに接続されますか？',
        cn: '在星型拓扑结构中，所有终端设备通常连接到哪里？'
      },
      pilihan: {
        id: [
          'Langsung ke setiap perangkat lain',
          'Ke satu perangkat pusat, seperti switch',
          'Ke satu kabel panjang tanpa perangkat pusat',
          'Hanya ke router milik penyedia internet'
        ],
        en: [
          'Directly to every other device on the network',
          'To a central hub device, such as a switch',
          'To a single shared bus cable with no central device',
          'Only directly to an Internet Service Provider router'
        ],
        jp: [
          'ネットワーク内の他のすべての端末に直接接続',
          'スイッチなどの中央集約機器（ハブ）に接続',
          '中央機器のない1本の長いバスケーブルに共有接続',
          'プロバイダ所有のルーターにのみ直接接続'
        ],
        cn: [
          '与网络中的每台其他设备直接相连',
          '汇聚连接到一个中心设备（如交换机）',
          '在没有中心设备的一根主干共享线缆上',
          '仅直接连接至互联网服务提供商的路由器'
        ]
      },
      jawaban_benar: 1,
      konsep: { id: 'Topologi star', en: 'Star topology', jp: 'スター型トポロジー', cn: '星型拓扑' },
      penjelasan: {
        id: 'Dalam topologi star, setiap perangkat memiliki sambungan ke satu perangkat pusat. Jika satu kabel klien bermasalah, perangkat lain biasanya tetap terhubung.',
        en: 'In star topology, each client runs a dedicated link to a central switch. If one cable fails, other stations remain unaffected.',
        jp: 'スター型トポロジーでは各機器が中央のスイッチに個別に接続されるため、1本のケーブルが断線しても他の機器の通信は維持されます。',
        cn: '在星型拓扑中，每台终端通过独立链路连接至中心交换机，单一网线损坏不会波及其他设备的正常通信。'
      }
    },
    {
      soal: {
        id: 'Apa ciri utama topologi bus?',
        en: 'What is the defining characteristic of a bus topology?',
        jp: 'バス型トポロジーの最大の特徴は何ですか？',
        cn: '总线型网络拓扑的核心特征是什么？'
      },
      pilihan: {
        id: [
          'Setiap perangkat punya dua sambungan ke switch pusat',
          'Perangkat terhubung membentuk lingkaran tertutup',
          'Semua perangkat berbagi satu kabel utama',
          'Setiap perangkat terhubung langsung ke internet'
        ],
        en: [
          'Every node has redundant dual links to a central switch',
          'Devices connect sequentially forming a closed physical ring',
          'All devices share a single linear backbone cable',
          'Every node connects directly to the public internet'
        ],
        jp: [
          '各端末が中央スイッチへ二重接続を持つ',
          '機器同士が輪のように閉じたリングを形成する',
          'すべての端末が1本の幹線同軸ケーブルを共有する',
          'すべての端末が直接公衆インターネットに接続する'
        ],
        cn: [
          '每台设备都具备连接中心交换机的双冗余链路',
          '所有节点首尾相连形成物理闭合环路',
          '所有设备共享连接在一条单一直线主干电缆上',
          '每台终端设备均直接接入公共互联网'
        ]
      },
      jawaban_benar: 2,
      konsep: { id: 'Topologi bus', en: 'Bus topology', jp: 'バス型トポロジー', cn: '总线型拓扑' },
      penjelasan: {
        id: 'Pada topologi bus, semua perangkat berbagi satu kabel utama sebagai jalur komunikasi. Gangguan pada kabel utama dapat memengaruhi banyak perangkat.',
        en: 'Bus topology connects all nodes to a shared main trunk. A cut or fault in the backbone drops the entire network segment.',
        jp: 'バス型では全ノードが単一の主幹ケーブルを共有するため、幹線が断線するとネットワークセグメント全体が停止します。',
        cn: '总线型拓扑中所有节点共享同一主干线缆，主干发生断路将导致整个网络网段通信瘫痪。'
      }
    },
    {
      soal: {
        id: 'Apa kelebihan topologi mesh jika dibandingkan dengan topologi yang hanya punya satu jalur?',
        en: 'What is the primary advantage of a mesh topology over single-path networks?',
        jp: '単一経路のトポロジーと比較したメッシュ型トポロジーの主な利点は何ですか？',
        cn: '与单一路径网络相比，网状拓扑（Mesh）的核心优势是什么？'
      },
      pilihan: {
        id: [
          'Tidak membutuhkan kabel atau koneksi apa pun',
          'Menyediakan beberapa jalur untuk mengirim data',
          'Semua perangkat harus memakai alamat IP yang sama',
          'Data hanya dapat dikirim ke satu perangkat'
        ],
        en: [
          'Requires no physical cabling or transceivers',
          'Provides redundant alternate routes for data transmission',
          'Enforces identical IP addresses across all nodes',
          'Constrains traffic transmission to only one endpoint'
        ],
        jp: [
          '物理ケーブルやトランシーバーを一切必要としない',
          '複数の冗長経路が存在し、耐障害性が極めて高い',
          'すべての機器が同一のIPアドレスを強制設定される',
          'データが単一の端末にしか送信できなくなる'
        ],
        cn: [
          '无需任何物理线缆或网络收发器',
          '提供多条冗余备用路径，具备高容错与自愈能力',
          '强制所有节点使用完全相同的IP地址',
          '数据只能单向发送至单一目标设备'
        ]
      },
      jawaban_benar: 1,
      konsep: { id: 'Topologi mesh', en: 'Mesh topology', jp: 'メッシュ型トポロジー', cn: '网状拓扑' },
      penjelasan: {
        id: 'Topologi mesh menyediakan lebih dari satu jalur antarnode. Jika satu jalur terputus, data dapat melewati jalur lain yang masih tersedia.',
        en: 'Mesh topologies feature interconnected redundant links. If any single path fails, routing algorithms steer packets around the outage.',
        jp: 'メッシュ型はノード間に複数の迂回路（冗長ルート）を備えているため、1箇所で障害が起きても別経路で通信を継続できます。',
        cn: '网状拓扑节点间具备多条互联冗余链路，当某条链路发生故障时，路由机制可立即切换至备用路径继续转发。'
      }
    },
    {
      soal: {
        id: 'Dalam model client-server, apa tugas server?',
        en: 'In the client-server architecture, what is the role of a server?',
        jp: 'クライアント・サーバーモデルにおいて、サーバーの主な役割は何ですか？',
        cn: '在客户机-服务器（Client-Server）架构中，服务器的核心职责是什么？'
      },
      pilihan: {
        id: [
          'Meminta layanan dari semua komputer lain',
          'Menghubungkan kabel jaringan secara fisik',
          'Menyediakan data atau layanan yang diminta oleh client',
          'Mengganti semua switch menjadi router'
        ],
        en: [
          'Requesting network services from user workstations',
          'Terminating physical RJ-45 copper connectors',
          'Providing resources, services, or data requested by clients',
          'Converting hardware Layer 2 switches into Layer 3 routers'
        ],
        jp: [
          '他のすべての端末へサービス要求を送信する',
          '物理的なLANケーブルの結線作業を行う',
          'クライアントからの要求に応じてデータやサービスを提供する',
          'すべてのスイッチをルーターへ自動変換する'
        ],
        cn: [
          '向其他工作站计算机主动发起服务请求',
          '物理连接网络双绞线接头',
          '响应客户机请求并向其提供所需的数据、资源或网络服务',
          '将网络中的二层交换机转换为三层路由器'
        ]
      },
      jawaban_benar: 2,
      konsep: { id: 'Client-server', en: 'Client-server', jp: 'クライアント・サーバー', cn: '客户机-服务器' },
      penjelasan: {
        id: 'Server menyediakan layanan atau data. Client mengirim permintaan, lalu server memberikan respons yang dibutuhkan.',
        en: 'Servers listen for and fulfill service or resource requests dispatched by client machines across the network.',
        jp: 'サーバーはデータや各種サービスを提供するホストであり、クライアントからのリクエストを受信して適切な応答を返します。',
        cn: '服务器集中提供网络服务与数据存储，监听并响应客户端发送的通信请求。'
      }
    }
  ],
  'media-transmisi-utp': [
    {
      soal: {
        id: 'Mengapa kawat di dalam kabel UTP dipilin berpasangan?',
        en: 'Why are copper wire pairs inside UTP cables twisted together?',
        jp: 'UTPケーブル内部の銅線がペアごとにツイスト（撚り合わせ）されている理由は何ですか？',
        cn: '为什么非屏蔽双绞线（UTP）内部的铜芯导线要成对扭绞？'
      },
      pilihan: {
        id: [
          'Agar kabel terlihat lebih tebal',
          'Untuk membantu mengurangi gangguan sinyal (crosstalk)',
          'Supaya kabel dapat menggantikan fungsi switch',
          'Agar setiap kawat membawa alamat IP'
        ],
        en: [
          'To increase the physical diameter of the cable jacket',
          'To cancel out electromagnetic interference and crosstalk',
          'To allow the cable to replace network switch hardware',
          'So each individual copper strand carries its own IP address'
        ],
        jp: [
          '外被を太く見せて耐久性を向上させるため',
          '電磁干渉（ノイズ）やクロストーク（漏話）を相殺するため',
          'スイッチ機器の機能を線材だけで代替できるようにするため',
          '各芯線に個別のIPアドレスを保持させるため'
        ],
        cn: [
          '使网线外观更粗壮以提高抗拉伸强度',
          '抵消相邻线对间的电磁干扰与串扰（Crosstalk）',
          '使网线具备直接替代二层交换机硬件的功能',
          '使每根独立的铜芯导线分配专属IP地址'
        ]
      },
      jawaban_benar: 1,
      konsep: { id: 'Kabel UTP', en: 'UTP Cable', jp: 'UTPケーブル', cn: '双绞线结构' },
      penjelasan: {
        id: 'Pilinannya membantu mengurangi gangguan elektromagnetik (crosstalk) yang dapat memengaruhi sinyal pada kabel.',
        en: 'Twisting causes external noise to induce equal voltage on both wires, cancelling out electromagnetic interference via differential signaling.',
        jp: '芯線をツイストさせることで外部からの電磁ノイズが相殺され、信号劣化や隣接ペア間のクロストークが大幅に低減されます。',
        cn: '成对双绞利用差分信号原理，使外部电磁干扰在双线上感应出相等的电压相互抵消，从而有效抑制串扰。'
      }
    },
    {
      soal: {
        id: 'Apa perbedaan utama susunan T568A dan T568B?',
        en: 'What is the key difference between T568A and T568B wiring pinouts?',
        jp: 'T568A規格とT568B規格の配線順序における主な違いは何ですか？',
        cn: 'T568A与T568B两种网线线序标准的核心区别是什么？'
      },
      pilihan: {
        id: [
          'Keduanya memakai jumlah pin yang berbeda',
          'T568A tidak menggunakan kawat biru',
          'Pasangan hijau dan oranye bertukar posisi',
          'T568B hanya digunakan untuk kabel fiber optik'
        ],
        en: [
          'They utilize different pin counts in the modular plug',
          'T568A completely omits the blue center pair',
          'The green and orange wire pairs swap pin positions',
          'T568B is exclusively deployed on fiber optic patch cords'
        ],
        jp: [
          'RJ-45コネクタで使用するピン数が異なる',
          'T568A規格では青色のペアが除外されている',
          '緑色のペアと橙色のペアの配置位置が入れ替わっている',
          'T568B規格は光ファイバーケーブル専用である'
        ],
        cn: [
          '使用的RJ-45水晶头引脚总数不同',
          'T568A标准完全取消了中间的蓝色线对',
          '绿色线对（Pin 1, 2, 3, 6）与橙色线对互换了引脚位置',
          'T568B标准仅适用于单模与多模光纤跳线'
        ]
      },
      jawaban_benar: 2,
      konsep: { id: 'Standar T568A & T568B', en: 'T568A & T568B Standards', jp: 'T568A/T568B規格', cn: 'T568A与T568B标准' },
      penjelasan: {
        id: 'Kedua standar memakai konektor dan delapan kawat yang sama. Perbedaan susunannya terdapat pada posisi pasangan hijau dan oranye.',
        en: 'Both pinouts use 8P8C plugs and 8 wires. T568A places Green on pins 1-2 and Orange on 3-6, whereas T568B places Orange on 1-2 and Green on 3-6.',
        jp: 'どちらも同じ8芯を使用しますが、T568Aでは緑ペアがピン1-2/3-6、T568Bでは橙ペアがピン1-2/3-6に配置され、緑と橙が入れ替わります。',
        cn: '两种标准都使用相同的8芯水晶头。T568A的引脚1-2为绿白/绿，引脚3-6为橙白/橙；T568B则将绿色与橙色线对位置互换。'
      }
    },
    {
      soal: {
        id: 'Bagaimana cara membuat kabel straight-through?',
        en: 'How do you construct a straight-through Ethernet patch cable?',
        jp: 'ストレートケーブル（Straight-through）を正しく作成する方法はどれですか？',
        cn: '制作一条标准直通网线（Straight-Through）的正确做法是什么？'
      },
      pilihan: {
        id: [
          'Gunakan standar yang sama di kedua ujung kabel',
          'Gunakan T568A di kedua ujung kabel, lalu tukar pin 1 dan 8',
          'Hubungkan hanya empat kawat di satu ujung',
          'Gunakan T568A di satu ujung dan T568B di ujung lain'
        ],
        en: [
          'Terminate both ends using the same wiring standard (e.g. T568B on both)',
          'Terminate both ends to T568A, then invert pins 1 and 8',
          'Connect only 4 wires on one end and 8 on the other',
          'Terminate T568A on one end and T568B on the opposite end'
        ],
        jp: [
          'ケーブルの両端に同一の規格（両端ともT568Bなど）を適用して結線する',
          '両端をT568Aで結線した後、ピン1とピン8を反転させる',
          '片側のみ4芯だけを圧着し反対側を8芯にする',
          '一方の端をT568A、もう一方の端をT568Bで結線する'
        ],
        cn: [
          '在双绞线两端使用完全相同的线序标准（如两端均为T568B）',
          '两端均做T568A，但在打线时将引脚1与引脚8对调',
          '一端仅压接4根线芯，另一端压接全部8根线芯',
          '一端采用T568A标准，另一端采用T568B标准'
        ]
      },
      jawaban_benar: 0,
      konsep: { id: 'Kabel straight-through', en: 'Straight-through cable', jp: 'ストレートケーブル', cn: '直通网线' },
      penjelasan: {
        id: 'Kabel straight-through memakai susunan yang sama di kedua ujungnya, misalnya T568A pada keduanya atau T568B pada keduanya.',
        en: 'Straight-through cables terminate identically on both ends (T568B-T568B or T568A-T568A), typically connecting different device types (PC to Switch).',
        jp: 'ストレートケーブルは両端に同じ規格（通常T568B）を用い、PCとスイッチなど異なる階層の機器間を接続する際に使用します。',
        cn: '直通网线两端采用相同的线序（两端同为T568B或同为T568A），通常用于连接不同类型设备（如电脑到交换机）。'
      }
    },
    {
      soal: {
        id: 'Apa fungsi konektor RJ-45 pada kabel LAN?',
        en: 'What is the function of the RJ-45 modular plug on a LAN cable?',
        jp: 'LANケーブルにおけるRJ-45コネクタの役割は何ですか？',
        cn: '局域网网线中RJ-45水晶头的主要功能是什么？'
      },
      pilihan: {
        id: [
          'Mengubah sinyal kabel menjadi sinyal Wi-Fi',
          'Menghubungkan kabel ke port jaringan pada perangkat',
          'Membagi alamat IP untuk semua komputer',
          'Mengukur kecepatan internet tanpa perangkat lain'
        ],
        en: [
          'Modulating copper electrical pulses into wireless Wi-Fi signals',
          'Mechanically and electrically interfacing cable conductors into Ethernet ports',
          'Allocating IP subnets automatically to connected host computers',
          'Measuring internet bandwidth speeds without external hardware'
        ],
        jp: [
          '有線信号を無線Wi-Fi電波に直接変換する',
          'LANケーブルの芯線を機器のイーサネットポートへ電気的・物理的に接続する',
          'すべての端末へIPアドレスを自動的に配分する',
          '追加機器なしでインターネットの通信速度を測定する'
        ],
        cn: [
          '直接将有线电信号调制转换为无线Wi-Fi射频信号',
          '将网线铜芯与终端设备的以太网端口建立物理与电气连接',
          '为局域网内的所有电脑自动分配IP地址池',
          '无需借助任何硬件即可离线测定公网宽带速率'
        ]
      },
      jawaban_benar: 1,
      konsep: { id: 'Konektor RJ-45', en: 'RJ-45 Connector', jp: 'RJ-45コネクタ', cn: 'RJ-45接口' },
      penjelasan: {
        id: 'Konektor RJ-45 dipasang pada ujung kabel agar kabel dapat terhubung ke port jaringan komputer, switch, router, atau perangkat lain.',
        en: 'The 8P8C RJ-45 modular plug crimps onto cable conductors so they interface securely with 8-pin Ethernet ports on computers, switches, and routers.',
        jp: 'RJ-45（8P8C）コネクタは、PC、スイッチ、ルーター等のLANポートにケーブルを物理的・電気的に確実に接続するための端子です。',
        cn: 'RJ-45（8P8C）水晶头压接在线缆末端，用于安全稳固地插入计算机、交换机、路由器等网络设备的以太网端口。'
      }
    },
    {
      soal: {
        id: 'Apa yang dapat diperiksa dengan LAN tester?',
        en: 'What parameters can be diagnosed using an 8-LED LAN cable continuity tester?',
        jp: 'LANテスターを使用することで、ケーブルのどのような状態を検査できますか？',
        cn: '使用8路LED网络测线仪主要可以检测网线的哪些物理特性？'
      },
      pilihan: {
        id: [
          'Apakah sambungan tiap pin pada kabel terhubung dan berurutan',
          'Berapa banyak perangkat yang terhubung ke internet di seluruh dunia',
          'Versi sistem operasi pada router',
          'Panjang kabel dengan ketepatan sampai satu milimeter'
        ],
        en: [
          'Whether all 8 pin circuits are continuous, open, or crossed in sequence',
          'The total number of global hosts currently connected to the internet',
          'The firmware kernel operating system version of the router',
          'Cable physical length down to single-millimeter precision'
        ],
        jp: [
          '8芯各ピンの電気的導通、断線、および結線順序の整合性',
          '世界中でインターネットに接続されている全端末の総数',
          'ルーターにインストールされているOSのファームウェアバージョン',
          'ケーブルの物理的長さを1ミリメートル単位で正確に計測する'
        ],
        cn: [
          '8根线芯在双端的电气连通性、短路断路以及线序排列是否一致',
          '全球当前连接到互联网的全部设备总数',
          '路由器当前固件的操作系统内核版本',
          '精确到毫米级的物理线缆实际长度'
        ]
      },
      jawaban_benar: 0,
      konsep: { id: 'Pengujian kabel', en: 'Cable Testing', jp: '導通テスト', cn: '网线测试' },
      penjelasan: {
        id: 'LAN tester memeriksa sambungan dan urutan pin dari satu ujung kabel ke ujung lainnya.',
        en: 'The tester pulses electrical signals pin-by-pin (1 through 8) to confirm continuity, open circuits, or misplaced wires on the remote indicator.',
        jp: 'LANテスターは主機からリモート機へ1〜8番ピンに順次パルス信号を流し、LEDの点灯順によって導通や結線ミス（クロス、断線）を診断します。',
        cn: '测线仪通过主测试器向远程端逐根发送电脉冲信号（1至8号引脚），通过LED指示灯的点亮顺序直观判断通断及线序错位。'
      }
    }
  ],
  'perangkat-keras-jaringan': [
    {
      soal: {
        id: 'Informasi apa yang digunakan switch untuk meneruskan data di jaringan lokal?',
        en: 'What addressing information does a Layer 2 switch use to forward frames inside a LAN?',
        jp: 'レイヤ2スイッチはローカルネットワーク内でフレームを転送する際、どの情報を使用しますか？',
        cn: '二层交换机在局域网内部转发数据帧时，依据的是哪种寻址信息？'
      },
      pilihan: {
        id: [
          'Alamat MAC perangkat tujuan',
          'Nomor telepon pengguna',
          'Nama file yang dibuka',
          'Warna kabel yang terpasang'
        ],
        en: [
          'Destination physical MAC address from the Ethernet frame header',
          'User telephone numbers registered in Active Directory',
          'Filename of the payload file being transferred',
          'Exterior jacket color of the connected patch cable'
        ],
        jp: [
          'イーサネットフレームヘッダーの宛先MACアドレス',
          'ユーザーの電話番号やアカウント情報',
          '転送されるファイルやデータの名前',
          '接続されているLANケーブルの外被色'
        ],
        cn: [
          '以太网帧头中的目标设备物理MAC地址',
          '用户在系统上注册的电话号码',
          '正在传输的文件名称与拓展名',
          '连接端口所插网线的外皮颜色'
        ]
      },
      jawaban_benar: 0,
      konsep: { id: 'Switch & MAC Address', en: 'Switch & MAC Address', jp: 'スイッチとMACアドレス', cn: '交换机与MAC地址' },
      penjelasan: {
        id: 'Switch mempelajari alamat MAC perangkat dan port tempat perangkat tersebut terhubung. Informasi itu membantu switch meneruskan data ke tujuan yang tepat.',
        en: 'Switches dynamically learn source MAC addresses and map them to physical ingress ports inside a CAM table to forward frames directly.',
        jp: 'スイッチは受信フレームの送信元MACアドレスを学習してCAMテーブルに登録し、宛先MACアドレスに対応するポートへ正確にフレームを転送します。',
        cn: '交换机通过监听数据帧学习源MAC地址与物理端口的映射关系并存入CAM表，转发时根据目标MAC地址单播定向输出。'
      }
    },
    {
      soal: {
        id: 'Kapan router biasanya diperlukan?',
        en: 'When is a router fundamentally required in network architecture?',
        jp: 'ネットワーク構成において、ルーターが基本的に必須となるのはどのような場面ですか？',
        cn: '在网络体系架构中，何种情况下必须部署路由器？'
      },
      pilihan: {
        id: [
          'Saat menghubungkan dua perangkat dengan kabel USB',
          'Saat menghubungkan jaringan yang berbeda (beda subnet/IP)',
          'Saat memasang konektor di ujung kabel LAN',
          'Saat mengganti alamat MAC kartu jaringan'
        ],
        en: [
          'When interconnecting two peripheral devices via USB cables',
          'When routing packets between different IP subnets or broadcast domains',
          'When crimping modular plugs onto raw bulk cable',
          'When flashing burned-in MAC addresses on a network adapter'
        ],
        jp: [
          'USBケーブルで周辺機器同士を直接接続するとき',
          '異なるIPサブネットやブロードキャストドメイン間をルーティングするとき',
          'LANケーブルの先端にモジュラープラグを圧着するとき',
          'LANカードのMACアドレスをハードウェアレベルで書き換えるとき'
        ],
        cn: [
          '使用USB数据线连接两台外围打印设备时',
          '在不同的IP网段或广播域之间进行路由寻址与报文转发时',
          '给网线末端制作压接水晶头连接器时',
          '物理修改网卡出厂烧录的硬件MAC地址时'
        ]
      },
      jawaban_benar: 1,
      konsep: { id: 'Fungsi Router', en: 'Router Functions', jp: 'ルーターの役割', cn: '路由器路由功能' },
      penjelasan: {
        id: 'Router meneruskan paket antarjaringan berdasarkan alamat IP. Contohnya, router menghubungkan jaringan lokal ke internet.',
        en: 'Routers operate at Layer 3 (Network Layer) inspect IP destination headers to route traffic between distinct broadcast domains (e.g. LAN to WAN).',
        jp: 'ルーターはOSI参照モデルの第3層（ネットワーク層）で動作し、IPアドレスに基づいて異なるネットワーク間（例: LANとインターネット）を中継します。',
        cn: '路由器工作在OSI模型的第三层（网络层），根据目标IP地址在不同逻辑网段和广域网之间进行跨网络寻径转发。'
      }
    },
    {
      soal: {
        id: 'Ke mana port WAN pada router biasanya dihubungkan?',
        en: 'Where is the router WAN port typically connected?',
        jp: 'ルーターのWANポートは通常どこに接続されますか？',
        cn: '路由器的WAN接口通常连接到哪里？'
      },
      pilihan: {
        id: [
          'Ke modem atau sumber koneksi internet upstream',
          'Ke port daya pada komputer',
          'Ke setiap printer di jaringan',
          'Ke port USB pada keyboard'
        ],
        en: [
          'To the upstream broadband modem or ISP internet gateway',
          'To a computer mainboard power connector',
          'To an individual office printer',
          'To a keyboard USB input port'
        ],
        jp: [
          'モデム、ONU、またはプロバイダ（ISP）の上流インターネット回線',
          'パソコンの電源ユニットの電源ポート',
          'オフィス内の単一のプリンター',
          'キーボードのUSBポート'
        ],
        cn: [
          '连接至上级宽带光猫（Modem/ONU）或运营商互联网网关',
          '连接至电脑主板的电源供电接口',
          '单独连接局域网内的某台共享打印机',
          '连接至键盘扩展USB接口'
        ]
      },
      jawaban_benar: 0,
      konsep: { id: 'Port WAN & LAN', en: 'WAN & LAN Ports', jp: 'WAN/LANポート', cn: 'WAN与LAN接口' },
      penjelasan: {
        id: 'Port WAN menghubungkan router ke modem atau sumber internet. Port LAN biasanya dipakai untuk perangkat di jaringan lokal.',
        en: 'WAN (Wide Area Network) connects to the outside world / ISP modem, while LAN (Local Area Network) ports connect internal PCs, switches, and APs.',
        jp: 'WAN（Wide Area Network）ポートは外部のインターネット回線（モデム/ONU）と接続し、LANポートは社内や家庭内の端末群に接続します。',
        cn: 'WAN口（广域网接口）用于上联运营商光猫或外网，而LAN口（局域网接口）则用于连接内部交换机、AP及电脑设备。'
      }
    },
    {
      soal: {
        id: 'Untuk apa modul SFP pada switch dapat digunakan?',
        en: 'What is the purpose of an SFP (Small Form-factor Pluggable) slot on an enterprise switch?',
        jp: 'スイッチのSFP（Small Form-factor Pluggable）スロットはどのような目的に使用されますか？',
        cn: '交换机上的SFP（小型可插拔）光口插槽主要用于实现什么功能？'
      },
      pilihan: {
        id: [
          'Untuk menyimpan konfigurasi VLAN sebagai cadangan',
          'Untuk menambah koneksi uplink, misalnya melalui fiber optik',
          'Untuk mengubah switch menjadi titik akses Wi-Fi',
          'Untuk memasang konektor RJ-45 ke kabel UTP'
        ],
        en: [
          'Storing offline VLAN backup configurations on flash memory',
          'Enabling flexible high-speed uplinks, such as fiber optic links',
          'Converting the switch enclosure into a Wi-Fi wireless access point',
          'Terminating RJ-45 copper modular connectors without tools'
        ],
        jp: [
          'VLAN設定情報をオフラインバックアップとして保存する',
          '光ファイバー等を用いた長距離・高速なアップリンク回線を増設する',
          'スイッチ本体を無線Wi-Fiアクセスポイントに変える',
          '工具なしでRJ-45コネクタをLANケーブルに圧着する'
        ],
        cn: [
          '将VLAN配置文件离线保存在闪存芯片中',
          '插入光模块以实现长距离、高带宽的光纤上行骨干互联',
          '直接将有线交换机转换为主流Wi-Fi无线热点AP',
          '无需压线钳免工具压接RJ-45网线水晶头'
        ]
      },
      jawaban_benar: 1,
      konsep: { id: 'Modul SFP', en: 'SFP Modules', jp: 'SFPモジュール', cn: 'SFP光模块' },
      penjelasan: {
        id: 'Slot SFP menerima modul transceiver yang dapat menyediakan koneksi uplink, termasuk koneksi fiber optik sesuai jenis modulnya.',
        en: 'SFP modular transceivers hot-plug into switches to provide Gigabit or 10G optical fiber uplinks spanning multiple kilometers between core switches.',
        jp: 'SFPスロットには用途に応じた光トランシーバーモジュールを装着でき、建物間やフロア間の長距離・高速光アップリンクを実現します。',
        cn: 'SFP插槽支持热插拔不同规格的光模块，通过单模或多模光纤实现楼宇间数公里远距离、吉比特级以上骨干高速上行互联。'
      }
    },
    {
      soal: {
        id: 'Kapan teknisi menggunakan port console pada switch?',
        en: 'When does a network technician specifically require access via the switch console port?',
        jp: 'ネットワーク技術者がスイッチのコンソールポートを使用するのはどのような状況ですか？',
        cn: '网络工程师在何种场景下必须通过交换机的Console控制口进行管理？'
      },
      pilihan: {
        id: [
          'Saat mengatur atau memulihkan perangkat secara langsung (Out-of-Band)',
          'Saat mengirim data dari switch ke printer melalui Wi-Fi',
          'Saat menguji urutan warna dengan mengukur panjang kabel',
          'Saat menghubungkan dua port daya'
        ],
        en: [
          'For direct local out-of-band management or disaster recovery',
          'When transmitting print jobs from the switch to an office printer over Wi-Fi',
          'When testing cable length and copper attenuation with a multimeter',
          'When connecting dual redundant AC power supply cords together'
        ],
        jp: [
          '初期設定や障害復旧など、帯域外（アウトオブバンド）で直接CLI設定を行うとき',
          'スイッチからオフィスプリンターへWi-Fi経由で印刷ジョブを送るとき',
          'マルチメーターでケーブル長と銅線の減衰度を測定するとき',
          '2系統の電源ケーブルを直接結線するとき'
        ],
        cn: [
          '进行初始无IP配置、带外管理（Out-of-Band）或网络瘫痪灾难恢复时',
          '通过Wi-Fi将交换机数据直接发送到局域网打印机时',
          '使用万用表测量物理线缆长度及信号衰减时',
          '将两路交流冗余电源插头互相连接时'
        ]
      },
      jawaban_benar: 0,
      konsep: { id: 'Port Console', en: 'Console Port', jp: 'コンソールポート', cn: 'Console接口' },
      penjelasan: {
        id: 'Port console memberi akses langsung untuk mengatur switch, termasuk saat perangkat belum punya IP atau konfigurasi jaringannya bermasalah.',
        en: 'Console ports provide direct RS-232 serial CLI terminal access independent of the network state (out-of-band), vital for initial setup and recovery.',
        jp: 'コンソールポートはIPアドレスが未設定の機器やネットワーク障害時でも、シリアル通信を介してCLIから直接安全に管理・復旧できる帯域外管理ポートです。',
        cn: 'Console控制口提供不依赖网络IP状态的独立串行带外管理（Out-of-Band）通道，用于设备初次上线调试及网络中断时的本地急救与恢复。'
      }
    }
  ]
};

export function getModuleQuizzes(module, existingQuizzes = [], lang = 'id') {
  const currentLang = ['id', 'en', 'jp', 'cn'].includes(lang) ? lang : 'id';
  const slug = module?.slug;
  const rawList = MODULE_QUIZZES[slug] || [];

  return rawList.map(item => {
    const soal = typeof item.soal === 'object' ? (item.soal[currentLang] || item.soal.id) : item.soal;
    const pilihan = typeof item.pilihan === 'object' && !Array.isArray(item.pilihan)
      ? (item.pilihan[currentLang] || item.pilihan.id)
      : item.pilihan;
    const konsep = typeof item.konsep === 'object' ? (item.konsep[currentLang] || item.konsep.id) : item.konsep;
    const penjelasan = typeof item.penjelasan === 'object' ? (item.penjelasan[currentLang] || item.penjelasan.id) : item.penjelasan;

    return {
      soal,
      pilihan,
      jawaban_benar: item.jawaban_benar,
      konsep,
      penjelasan
    };
  });
}
