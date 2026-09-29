/**
 * NetVerse - Internationalization (i18n) Engine
 * Comprehensive multi-language support:
 *   - 'id': Bahasa Indonesia (Default)
 *   - 'en': English
 *   - 'jp': 日本語 (Japanese)
 *   - 'cn': 简体中文 (Simplified Chinese)
 */

export const SUPPORTED_LANGS = [
  { code: 'id', label: 'Indonesia', short: 'ID', flag: '🇮🇩' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'jp', label: '日本語', short: 'JP', flag: '🇯🇵' },
  { code: 'cn', label: '中文', short: 'CN', flag: '🇨🇳' }
];

export const SUPPORTED_THEMES = [
  { code: 'light', icon: '☀️', color: '#ffffff', border: '#cbd5e1', key: 'light' },
  { code: 'dark', icon: '🌑', color: '#090a0f', border: '#f59e0b', key: 'dark' },
  { code: 'midnight', icon: '🌌', color: '#060b18', border: '#38bdf8', key: 'midnight' },
  { code: 'emerald', icon: '🌲', color: '#05130b', border: '#10b981', key: 'emerald' }
];

export const translations = {
  id: {
    nav: {
      workbench: 'Beranda',
      crimping: 'Rakit kabel',
      materi: 'Materi',
      leaderboard: 'Peringkat',
      ariaLabel: 'Navigasi Utama',
      logoTitle: 'Beranda NetVerse'
    },
    auth: {
      login: 'Masuk',
      register: 'Daftar',
      profile: 'Profil',
      logout: 'Keluar',
      guestNote: 'Masuk untuk simpan progres',
      level: 'Level',
      xp: 'XP',
      systemActive: 'Sistem aktif',
      ariaOpenNav: 'Buka menu navigasi'
    },
    theme: {
      label: 'Tema tampilan',
      dark: 'Gelap (Standar)',
      light: 'Terang (Putih)',
      midnight: 'Midnight Blue',
      emerald: 'Hijau Gelap'
    },
    lang: {
      label: 'Pilihan Bahasa',
      current: 'ID'
    },
    dashboard: {
      heroTitle: 'Belajar jaringan, langkah demi langkah',
      heroDesc: 'Mulai dari satu materi, lalu lanjutkan ke kuis dan praktik kabel.',
      moduleCount: 'Materi {current} dari {total} · {title} · {time} menit',
      btnStart: 'Mulai belajar',
      btnContinue: 'Lanjutkan belajar',
      btnRepeat: 'Ulangi materi',
      devicesTitle: 'Perangkat 3D',
      devicesSubtitle: 'Pilih perangkat, putar model, lalu buka penanda untuk mengenali fungsinya.',
      selectDevice: 'Pilih perangkat',
      resetView: 'Atur ulang tampilan',
      modelSource: 'Model 3D · Sketchfab',
      byAuthor: 'Oleh {author}',
      view3D: 'Lihat model',
      noDownload: 'Unduhan tidak tersedia',
      specsHeader: 'Spesifikasi & Identifikasi Port',
      hotspotsHeader: 'Penanda Fisik & Telemetri Port',
      hotspotIntro: 'Pilih penanda pada model 3D untuk melihat rincian fungsi antarmuka fisik.',
      noHotspots: 'Belum ada data penanda pada model ini.',
      loadingDevices: 'Sedang memuat perangkat',
      loadingDesc: 'Perangkat jaringan dan model 3D sedang disiapkan.',
      rotateHint: 'Seret untuk memutar • Gulir untuk memperbesar',
      defaultHotspotTitle: 'Tentang port',
      defaultHotspotDesc: 'Pilih penanda pada model 3D untuk mengetahui fungsi port dan jalur sinyalnya.'
    },
    crimping: {
      heroTitle: 'Rakit kabel LAN',
      heroSubtitle: 'Pasang delapan kawat ke konektor RJ-45. Klik warna untuk mengisi pin berikutnya, atau seret kawat ke pin yang diinginkan.',
      title: 'Konektor RJ-45 (8P8C)',
      subtitle: 'Geser papan ke samping untuk melihat semua pin di layar kecil.',
      askTutor: 'Tanya tutor',
      clearPins: 'Kosongkan susunan',
      standardLabel: 'Standar pengkabelan:',
      paletteTitle: 'Kawat UTP',
      paletteSubtitle: 'Klik kawat untuk memasukkannya ke pin berikutnya yang kosong.',
      btnVerify: 'Periksa susunan',
      testerTitle: 'Hasil tes kabel LAN:',
      testerWaiting: 'Pasang seluruh 8 pin kabel, lalu tekan Periksa susunan.',
      accuracy: 'Ketepatan',
      timeElapsed: 'Waktu Pengerjaan',
      xpEarned: 'XP Diperoleh',
      perfectMessage: 'Hebat, semua pin tersusun dengan benar! Sinyal data ditransmisikan tanpa redaman.',
      wrongPinsNotice: 'Ada pin yang belum sesuai standar. Periksa lampu tester yang mati.',
      stopwatch: 'Waktu:',
      pin: 'PIN',
      allPlaced: 'Semua kawat sudah terpasang.',
      noWire: 'Belum ada kawat',
      contacts8: '8 KONTAK',
      scrollHint: 'Geser papan untuk melihat semua pin.',
      clickHint: 'Klik kawat untuk mengisi pin berikutnya, atau seret ke pin yang kamu pilih.',
      removePin: 'Hapus kawat',
      resultMatch: 'SESUAI',
      resultWrong: 'SALAH',
      secondUnit: 'detik',
      wiresRemaining: '{count} tersisa',
      resultSuccessMsg: 'Hebat, semua pin tersusun dengan benar! (+{xp} XP)',
      resultPartialMsg: '{correct} dari 8 pin sudah tepat ({accuracy}%). Periksa lagi pin yang ditandai merah.',
      videoTutorialBtn: 'Video Tutorial',
      videoTutorialTitle: 'Tonton Tutorial Cara Crimping Kabel UTP'
    },
    materi: {
      header: 'Materi TKJ',
      sidebarTitle: 'Daftar materi',
      completedOf: '{done} dari {total} selesai',
      module: 'Materi {num}',
      completedBadge: 'Selesai',
      estimatedTime: '{min} menit',
      xpReward: '+{xp} XP',
      score: 'Nilai {score}%',
      backToMaterial: '← Kembali ke materi',
      moduleHeader: 'Materi {current} dari {total}',
      completedScoreHeader: 'Selesai · Nilai {score}%',
      inProgressBadge: 'Sedang dipelajari',
      notStartedBadge: 'Belum dimulai',
      progressCompleted: '{completed} dari {total} selesai',
      backToMateri: '← Kembali ke materi',
      moduleOf: 'Materi {current} dari {total}',
      checkpointTitle: 'Refleksi Sokratik',
      askAiButton: 'Diskusikan pertanyaan ini dengan Tutor AI',
      quizHeader: 'Kuis Evaluasi Diagnostik',
      quizSubtitle: 'Jawab semua soal untuk menguji pemahamanmu dan mendapat XP.',
      quizScore: 'Nilai {score}% · {correct} dari {total} benar',
      submitQuiz: 'Periksa Jawaban',
      retryQuiz: 'Ulangi Kuis',
      quizCompletedNotice: 'Kuis berhasil diselesaikan!',
      quizFailedNotice: 'Nilaimu di bawah 50%. Baca lagi materinya, lalu coba kuis sekali lagi.',
      answerAllNotice: 'Jawab semua soal sebelum memeriksa hasilnya.',
      modeTheory: 'Teks & Teori',
      modeVideo: 'Video Praktik',
      videoLabel: 'Opsi Materi Video YouTube',
      videoSubtitle: 'Panduan video praktik jaringan interaktif dari praktisi terpercaya.',
      videoSidebarTitle: 'Video Tutorial YouTube',
      videoSidebarDesc: 'Tonton demonstrasi praktik langsung dari praktisi jaringan.',
      videoTakeaways: 'Langkah Kunci & Catatan Praktikum',
      videoAuthor: 'Kanal:',
      watchOnYoutube: 'Buka di YouTube',
      watchVideo: 'Tonton Video',
      practiceLab: 'Praktikkan Sekarang',
      relatedVideos: 'Pilihan Video Pembelajaran Lainnya',
      spotlightBannerText: 'Tersedia materi video tutorial praktikum untuk topik ini.',
      practicalGuide: 'Panduan Praktik TKJ',
      activeBadge: 'Aktif',
      videoBadge: 'Video Praktik YouTube',
      watchVideoVersion: 'Tonton versi video tutorial →',
      thinkTitle: 'Coba pikirkan',
      thinkSub: 'Pertanyaan untuk direnungkan',
      discussAi: 'Diskusikan Hipotesis Ini dengan AI Tutor →',
      discussDesc: 'Tutor AI akan membantu membahas alasan di balik jawabanmu.',
      quizReady: 'Siap menguji pemahamanmu?',
      quizCountDesc: 'Kuis ini berisi {count} soal tentang materi di atas.',
      startQuiz: 'Mulai kuis →',
      quizTitle: 'Kuis · Materi {num}',
      quizScoreSummary: 'Nilai {score}% · {correct} dari {total} benar',
      answerCorrect: '✓ Jawabanmu benar',
      answerWrong: '✗ Pelajari lagi',
      nextModule: 'Lanjut ke materi {num}',
      tryCrimping: 'Coba simulasi crimping',
      continueTo: 'Lanjut ke {target}'
    },
    leaderboard: {
      badge: 'Hasil praktik',
      realtimeActive: 'Pembaruan langsung aktif',
      realtimeInactive: 'Pembaruan langsung tidak aktif',
      title: 'Peringkat praktik',
      subtitle: 'Lihat hasil praktik crimping berdasarkan waktu dan ketepatan susunan kabel.',
      filterAll: 'Semua',
      refresh: 'Perbarui daftar',
      rank: 'Peringkat',
      participant: 'Peserta',
      level: 'Level',
      standard: 'Standar',
      time: 'Waktu',
      accuracy: 'Ketepatan',
      completedAt: 'Selesai',
      xp: 'XP diperoleh',
      youTag: 'Kamu',
      top1Badge: '👑 #1 TERATAS',
      runnerUpBadge: '🥈 #2',
      thirdBadge: '🥉 #3',
      secondUnit: 'detik',
      today: 'Hari ini',
      participantDefault: 'Peserta'
    },
    ai: {
      title: 'Tutor AI jaringan',
      subtitle: 'PTI UNESA · Siap membantu',
      topicTag: 'Topik: {topic}',
      badgeText: 'Tutor jaringan',
      newChat: 'Mulai obrolan baru',
      close: 'Tutup tutor AI',
      open: 'Buka tutor AI',
      tryAsking: 'COBA TANYA:',
      placeholder: 'Tanyakan sesuatu tentang jaringan...',
      send: 'Kirim',
      loading: 'Sedang menyiapkan jawaban...',
      greeting: 'Hai, {name}! Kita bisa belajar cara kerja jaringan, mengenal perangkatnya, atau membahas hasil praktikmu. Ada yang ingin kamu tanyakan?',
      defaultConcept: 'Tutor jaringan',
      systemPromptLang: 'Gunakan Bahasa Indonesia yang ramah, mendidik, dan teknis akurat.'
    },
    authModal: {
      loginTitle: 'Masuk ke NetVerse',
      registerTitle: 'Daftar Akun Baru',
      profileTitle: 'Profil Mahasiswa',
      email: 'Alamat Email',
      password: 'Kata Sandi',
      fullName: 'Nama Lengkap',
      username: 'Nama Pengguna',
      btnSignIn: 'Masuk Sekarang',
      btnRegister: 'Daftar Akun',
      btnSignOut: 'Keluar dari Akun',
      switchToRegister: 'Belum punya akun? Daftar di sini',
      switchToLogin: 'Sudah punya akun? Masuk di sini',
      bestAccuracy: 'Ketepatan terbaik',
      totalAttempts: '{count} kali percobaan',
      cloudSync: 'Penyimpanan akun',
      cloudActive: 'Tersinkronisasi',
      cloudLocal: 'Lokal',
      syncReady: 'Tersinkronisasi',
      closeWindow: 'Tutup jendela',
      profileUpdated: 'Profil berhasil diperbarui.',
      profileUpdateErr: 'Perubahan profil belum tersimpan. Coba lagi.',
      accountCreatedLogin: 'Akun berhasil dibuat. Kamu sudah masuk.',
      accountCreatedSignIn: 'Akun berhasil dibuat. Sekarang kamu bisa masuk.',
      namePlaceholder: 'Contoh: Budi Santoso',
      userPlaceholder: 'Contoh: budi_tkj',
      invalidCredentials: 'Kata sandi atau email tidak cocok dengan yang didaftarkan. Silakan periksa kembali email dan kata sandi Anda.',
      emailNotConfirmed: 'Email belum aktif atau belum diverifikasi. Coba masuk kembali sebentar lagi.',
      genericLoginError: 'Kata sandi atau email tidak cocok dengan yang didaftarkan. Coba periksa lagi.',
      genericRegisterError: 'Ada kendala saat membuat akun. Silakan coba lagi.',
      alreadyRegistered: 'Email ini sudah terdaftar. Silakan langsung masuk.',
      passwordTooShort: 'Kata sandi harus terdiri dari minimal 6 karakter.',
      btnSaveProfile: 'Simpan Perubahan',
      loginSubtitle: 'Masuk untuk menyimpan progres belajar dan hasil praktikmu.',
      noticeWarningTitle: 'Peringatan Masuk Akun',
      noticeSuccessTitle: 'Berhasil',
      continueGuest: 'Lanjut tanpa akun →'
    },
    toast: {
      latestActivity: 'Aktivitas lab terbaru',
      live: 'Langsung',
      close: 'Tutup Notifikasi',
      completedFormat: '{name} baru saja menyelesaikan praktik {standard} dengan ketepatan {accuracy}% dalam {time} detik.'
    },
    footer: {
      desc: 'Laboratorium jaringan 3D dengan tutor AI',
      dept: 'Pendidikan Teknologi Informasi UNESA'
    }
  },

  en: {
    nav: {
      workbench: 'Home',
      crimping: 'Cable Crimping',
      materi: 'Theory',
      leaderboard: 'Leaderboard',
      ariaLabel: 'Primary Navigation',
      logoTitle: 'NetVerse Home'
    },
    auth: {
      login: 'Sign In',
      register: 'Register',
      profile: 'Profile',
      logout: 'Sign Out',
      guestNote: 'Sign in to save progress',
      level: 'Level',
      xp: 'XP',
      systemActive: 'System Active',
      ariaOpenNav: 'Open navigation menu'
    },
    theme: {
      label: 'Color Theme',
      dark: 'Dark (Standard)',
      light: 'Light (White)',
      midnight: 'Midnight Blue',
      emerald: 'Dark Emerald'
    },
    lang: {
      label: 'Language',
      current: 'EN'
    },
    dashboard: {
      heroTitle: 'Learn computer networks, step by step',
      heroDesc: 'Start with theory concepts, then advance to diagnostic quizzes and hands-on cable crimping.',
      moduleCount: 'Module {current} of {total} · {title} · {time} mins',
      btnStart: 'Start Learning',
      btnContinue: 'Continue Learning',
      btnRepeat: 'Review Modules',
      devicesTitle: '3D Hardware Lab',
      devicesSubtitle: 'Select hardware, inspect the 3D model, and click hotspots to understand its function.',
      selectDevice: 'Select Hardware',
      resetView: 'Reset Camera',
      modelSource: '3D Model · Sketchfab',
      byAuthor: 'By {author}',
      view3D: 'View 3D',
      noDownload: 'Download unavailable',
      specsHeader: 'Specifications & Port Mapping',
      hotspotsHeader: 'Hardware Hotspots & Telemetry',
      hotspotIntro: 'Click on 3D hotspots to inspect physical interface telemetry and functionality.',
      noHotspots: 'No hotspot data available for this model.',
      loadingDevices: 'Loading devices',
      loadingDesc: 'Preparing network hardware and 3D models.',
      rotateHint: 'Drag to rotate • Scroll to zoom',
      defaultHotspotTitle: 'Interface Overview',
      defaultHotspotDesc: 'Click hotspots on the 3D model to inspect port telemetry and operational signal paths.'
    },
    crimping: {
      heroTitle: 'Assemble LAN Cable',
      heroSubtitle: 'Insert eight copper wires into the RJ-45 modular plug. Click a wire or drag it directly to the designated pin.',
      title: 'RJ-45 Modular Plug (8P8C)',
      subtitle: 'Scroll sideways to view all 8 pins on mobile screens.',
      askTutor: 'Ask Tutor',
      clearPins: 'Clear Pins',
      standardLabel: 'Wiring Standard:',
      paletteTitle: 'Available UTP Wires',
      paletteSubtitle: 'Click a wire to insert it into the next available pin slot.',
      btnVerify: 'Verify Pinout',
      testerTitle: 'LAN Cable Test Results:',
      testerWaiting: 'Insert all 8 wire pins, then click Verify Pinout.',
      accuracy: 'Wiring Accuracy',
      timeElapsed: 'Elapsed Time',
      xpEarned: 'XP Earned',
      perfectMessage: 'Perfect wiring! Signal is transmitted cleanly without crosstalk or attenuation.',
      wrongPinsNotice: 'Some pins do not match the wiring standard. Check inactive tester LEDs.',
      stopwatch: 'Time:',
      pin: 'PIN',
      allPlaced: 'All wires placed.',
      noWire: 'No wire inserted',
      contacts8: '8 CONTACTS',
      scrollHint: 'Scroll to view all 8 pins.',
      clickHint: 'Click a wire to fill the next slot, or drag it to your target pin.',
      removePin: 'Remove wire',
      resultMatch: 'MATCH',
      resultWrong: 'WRONG',
      secondUnit: 's',
      wiresRemaining: '{count} left',
      resultSuccessMsg: 'Outstanding, all 8 pins match the wiring standard! (+{xp} XP)',
      resultPartialMsg: '{correct} of 8 pins are correct ({accuracy}%). Inspect pins flagged in red.',
      videoTutorialBtn: 'Video Tutorial',
      videoTutorialTitle: 'Watch UTP Cable Crimping Video Guide'
    },
    materi: {
      header: 'Network Syllabus',
      sidebarTitle: 'Syllabus modules',
      completedOf: '{done} of {total} completed',
      module: 'Module {num}',
      completedBadge: 'Completed',
      estimatedTime: '{min} mins',
      xpReward: '+{xp} XP',
      score: 'Score {score}%',
      backToMaterial: '← Back to topic',
      moduleHeader: 'Module {current} of {total}',
      completedScoreHeader: 'Completed · Score {score}%',
      inProgressBadge: 'In progress',
      notStartedBadge: 'Not started',
      progressCompleted: '{completed} of {total} completed',
      backToMateri: '← Back to topic',
      moduleOf: 'Module {current} of {total}',
      checkpointTitle: 'Socratic Reflection',
      askAiButton: 'Discuss this question with AI Tutor',
      quizHeader: 'Diagnostic Evaluation Quiz',
      quizSubtitle: 'Answer all questions to test your conceptual knowledge and earn XP.',
      quizScore: 'Score {score}% · {correct} of {total} correct',
      submitQuiz: 'Submit Answers',
      retryQuiz: 'Retry Quiz',
      quizCompletedNotice: 'Quiz completed successfully!',
      quizFailedNotice: 'Score below 50%. Review the material and try again.',
      answerAllNotice: 'Please answer all questions before submitting.',
      modeTheory: 'Reading & Theory',
      modeVideo: 'Video Tutorial',
      videoLabel: 'YouTube Practical Video Option',
      videoSubtitle: 'Interactive network video guides taught by seasoned practitioners.',
      videoSidebarTitle: 'YouTube Video Guides',
      videoSidebarDesc: 'Watch live demonstrations of network engineering practices.',
      videoTakeaways: 'Key Takeaways & Lab Notes',
      videoAuthor: 'Channel:',
      watchOnYoutube: 'Open on YouTube',
      watchVideo: 'Watch Video',
      practiceLab: 'Practice in Lab',
      relatedVideos: 'Explore Related Practical Videos',
      spotlightBannerText: 'A video guide is available for this practical topic.',
      practicalGuide: 'Practical Network Guide',
      activeBadge: 'Active',
      videoBadge: 'YouTube Practical Video',
      watchVideoVersion: 'Watch video tutorial version →',
      thinkTitle: 'Think about this',
      thinkSub: 'Reflection inquiry',
      discussAi: 'Discuss This Hypothesis with AI Tutor →',
      discussDesc: 'AI Tutor will guide you through the reasoning behind your answer.',
      quizReady: 'Ready to test your knowledge?',
      quizCountDesc: 'This quiz contains {count} questions covering the topic above.',
      startQuiz: 'Start Quiz →',
      quizTitle: 'Quiz · Module {num}',
      quizScoreSummary: 'Score {score}% · {correct} of {total} correct',
      answerCorrect: '✓ Correct answer',
      answerWrong: '✗ Review again',
      nextModule: 'Next module {num}',
      tryCrimping: 'Try crimping simulation',
      continueTo: 'Continue to {target}'
    },
    leaderboard: {
      badge: 'Lab Records',
      realtimeActive: 'Live sync active',
      realtimeInactive: 'Live sync offline',
      title: 'Practice Standings',
      subtitle: 'Review crimping leaderboard ranked by pinout accuracy and stopwatch speed.',
      filterAll: 'All',
      refresh: 'Refresh list',
      rank: 'Rank',
      participant: 'Participant',
      level: 'Level',
      standard: 'Standard',
      time: 'Time',
      accuracy: 'Accuracy',
      completedAt: 'Finished',
      xp: 'XP Earned',
      youTag: 'You',
      top1Badge: '👑 #1 CHAMPION',
      runnerUpBadge: '🥈 #2',
      thirdBadge: '🥉 #3',
      secondUnit: 's',
      today: 'Today',
      participantDefault: 'Student'
    },
    ai: {
      title: 'Network AI Tutor',
      subtitle: 'PTI UNESA · Online Assistant',
      topicTag: 'Topic: {topic}',
      badgeText: 'Network Tutor',
      newChat: 'Start new chat',
      close: 'Close AI tutor',
      open: 'Open AI tutor',
      tryAsking: 'SUGGESTED INQUIRIES:',
      placeholder: 'Ask any question about computer networking...',
      send: 'Send',
      loading: 'Generating socratic response...',
      greeting: 'Hello, {name}! We can explore network fundamentals, inspect 3D devices, or discuss your cable crimping results. What would you like to ask?',
      defaultConcept: 'Network Tutor',
      systemPromptLang: 'Please respond in English with clear, educational, and technically rigorous explanations.'
    },
    authModal: {
      loginTitle: 'Sign In to NetVerse',
      registerTitle: 'Create New Account',
      profileTitle: 'Student Profile',
      email: 'Email Address',
      password: 'Password',
      fullName: 'Full Name',
      username: 'Username',
      btnSignIn: 'Sign In Now',
      btnRegister: 'Register Account',
      btnSignOut: 'Sign Out',
      switchToRegister: "Don't have an account? Register here",
      switchToLogin: 'Already have an account? Sign in here',
      bestAccuracy: 'Best accuracy',
      totalAttempts: '{count} attempts',
      cloudSync: 'Cloud Storage',
      cloudActive: 'Synchronized',
      cloudLocal: 'Local',
      syncReady: 'Online sync ready',
      closeWindow: 'Close window',
      profileUpdated: 'Profile updated successfully.',
      profileUpdateErr: 'Profile changes could not be saved. Please try again.',
      accountCreatedLogin: 'Account created successfully. You are now signed in.',
      accountCreatedSignIn: 'Account created. You can now sign in.',
      namePlaceholder: 'e.g. John Doe',
      userPlaceholder: 'e.g. john_tkj',
      invalidCredentials: 'Email or password does not match any registered account. Please check your credentials.',
      emailNotConfirmed: 'Email has not been confirmed yet. Please check your email or try again shortly.',
      genericLoginError: 'Email or password does not match any registered account. Please check your credentials.',
      genericRegisterError: 'There was an issue creating your account. Please try again.',
      alreadyRegistered: 'This email is already registered. Please sign in.',
      passwordTooShort: 'Password must be at least 6 characters.',
      btnSaveProfile: 'Save Changes',
      loginSubtitle: 'Sign in to sync your practice history and XP.',
      noticeWarningTitle: 'Sign In Warning',
      noticeSuccessTitle: 'Success',
      continueGuest: 'Continue as guest →'
    },
    toast: {
      latestActivity: 'Live Lab Activity',
      live: 'Live',
      close: 'Close notification',
      completedFormat: '{name} just completed {standard} cable crimping with {accuracy}% accuracy in {time}s.'
    },
    footer: {
      desc: '3D Computer Network Laboratory with AI Tutor',
      dept: 'Informatics Education, UNESA'
    }
  },

  jp: {
    nav: {
      workbench: 'ホーム',
      crimping: 'ケーブル作成',
      materi: '学習教材',
      leaderboard: 'ランキング',
      ariaLabel: 'メインナビゲーション',
      logoTitle: 'NetVerse ホーム'
    },
    auth: {
      login: 'ログイン',
      register: '新規登録',
      profile: 'プロフィール',
      logout: 'ログアウト',
      guestNote: 'ログインして学習進捗を保存',
      level: 'レベル',
      xp: 'XP',
      systemActive: 'システム正常稼働',
      ariaOpenNav: 'ナビゲーションメニューを開く'
    },
    theme: {
      label: 'カラーテーマ',
      dark: 'ダーク (標準)',
      light: 'ライト (ホワイト)',
      midnight: 'ミッドナイトブルー',
      emerald: 'ダークエメラルド (濃緑)'
    },
    lang: {
      label: '表示言語',
      current: 'JP'
    },
    dashboard: {
      heroTitle: 'ステップ・バイ・ステップでネットワークを学ぶ',
      heroDesc: '基礎理論から始めて、診断クイズや実践的なケーブル圧着をマスターしましょう。',
      moduleCount: '第{current}章 / 全{total}章 · {title} · {time}分',
      btnStart: '学習を始める',
      btnContinue: '学習を続ける',
      btnRepeat: '復習する',
      devicesTitle: '3Dネットワーク機器',
      devicesSubtitle: '機器を選択し、3Dモデルを回転してホットスポットから機能を確認できます。',
      selectDevice: '機器を選択',
      resetView: '視点をリセット',
      modelSource: '3Dモデル · Sketchfab',
      byAuthor: '作成者: {author}',
      view3D: '3Dを見る',
      noDownload: 'ダウンロード不可',
      specsHeader: '基本仕様およびポート情報',
      hotspotsHeader: '機器ホットスポット & テレメトリ',
      hotspotIntro: '3Dモデル上のホットスポットをクリックしてインターフェースの詳細を確認できます。',
      noHotspots: 'このモデルにはホットスポットデータがありません。',
      loadingDevices: '機器を読み込み中',
      loadingDesc: 'ネットワーク機器と3Dモデルを準備しています。',
      rotateHint: 'ドラッグで回転 • スクロールで拡大縮小',
      defaultHotspotTitle: 'ポート概要',
      defaultHotspotDesc: '3Dモデル上のホットスポットをクリックして、ポートの機能や通信経路を確認してください。'
    },
    crimping: {
      heroTitle: 'LANケーブルの結線・圧着',
      heroSubtitle: 'RJ-45コネクタに8本の芯線を正しく配置します。クリックまたはドラッグして指定のピンに挿入してください。',
      title: 'RJ-45 モジュラープラグ (8P8C)',
      subtitle: 'モバイル画面では横スクロールで8ピンすべてを確認できます。',
      askTutor: 'チューターに質問',
      clearPins: '配置をクリア',
      standardLabel: '配線規格:',
      paletteTitle: '利用可能なUTP芯線',
      paletteSubtitle: '芯線をクリックして次の空きピンに差し込みます。',
      btnVerify: '配線順序を確認',
      testerTitle: 'LANケーブル テスター診断:',
      testerWaiting: '8本すべての芯線をセットして「配線順序を確認」を押してください。',
      accuracy: '配線精度',
      timeElapsed: '所要時間',
      xpEarned: '獲得XP',
      perfectMessage: '完璧な仕上がり！データ信号が干渉なく正確に伝送されます。',
      wrongPinsNotice: '配線規格と異なるピンがあります。点灯していないLEDを確認してください。',
      stopwatch: '時間:',
      pin: 'ピン',
      allPlaced: 'すべてのケーブルが配置されました。',
      noWire: '未配置',
      contacts8: '8極ピン',
      scrollHint: 'スワイプして全ピンを表示。',
      clickHint: '芯線をクリックして次のピンに挿入、またはドラッグして配置します。',
      removePin: 'ワイヤーを取り外す',
      resultMatch: '一致',
      resultWrong: '不一致',
      secondUnit: '秒',
      wiresRemaining: '残り {count}',
      resultSuccessMsg: '素晴らしい！すべてのピンが規格通り正しく結線されました！(+{xp} XP)',
      resultPartialMsg: '8ピン中 {correct} ピンが正解です（{accuracy}%）。赤色のピンを確認してください。',
      videoTutorialBtn: '動画解説',
      videoTutorialTitle: 'UTPケーブル圧着の解説動画を視聴'
    },
    materi: {
      header: 'TKJネットワーク教材',
      sidebarTitle: '教材一覧',
      completedOf: '{done} / 全{total}章 完了',
      module: '第{num}章',
      completedBadge: '完了',
      estimatedTime: '{min}分',
      xpReward: '+{xp} XP',
      score: '得点 {score}%',
      backToMaterial: '← 教材に戻る',
      moduleHeader: '第{current}章 / 全{total}章',
      completedScoreHeader: '完了 · 得点 {score}%',
      inProgressBadge: '学習中',
      notStartedBadge: '未着手',
      progressCompleted: '{completed} / 全{total}章 完了',
      backToMateri: '← 教材に戻る',
      moduleOf: '第{current}章 / 全{total}章',
      checkpointTitle: 'ソクラテス的探究',
      askAiButton: 'この問いをAIチューターと議論する',
      quizHeader: '診断評価クイズ',
      quizSubtitle: 'すべての問題に回答して理解度を測定し、XPを獲得しましょう。',
      quizScore: '得点 {score}% · 正解 {correct}/{total}',
      submitQuiz: '回答を送信して採点',
      retryQuiz: '再挑戦',
      quizCompletedNotice: 'テスト完了！理解度が記録されました。',
      quizFailedNotice: '得点が50%未満です。講義を復習して再挑戦しましょう。',
      answerAllNotice: '採点する前にすべての問題に回答してください。',
      modeTheory: '講義テキスト',
      modeVideo: '実践動画',
      videoLabel: 'YouTube実践解説動画',
      videoSubtitle: '現場のエンジニアによる実践的なネットワーク構築チュートリアル。',
      videoSidebarTitle: 'YouTube 実践動画',
      videoSidebarDesc: 'ネットワーク機器の取り扱いを動画で視覚的に学びます。',
      videoTakeaways: '重要ポイント & 実習メモ',
      videoAuthor: 'チャンネル:',
      watchOnYoutube: 'YouTubeで見る',
      watchVideo: '動画を見る',
      practiceLab: '3Dラボで実践',
      relatedVideos: 'その他の実践動画',
      spotlightBannerText: 'この単元には実践的なYouTube動画教材が用意されています。',
      practicalGuide: 'ネットワーク実践ガイド',
      activeBadge: 'アクティブ',
      videoBadge: 'YouTube 実践動画',
      watchVideoVersion: 'チュートリアル動画を見る →',
      thinkTitle: '考えてみよう',
      thinkSub: '考察の問い',
      discussAi: 'AIチューターと議論する →',
      discussDesc: 'AIチューターが考察の根拠や背景を一緒に深掘りします。',
      quizReady: '理解度テストを始めますか？',
      quizCountDesc: '上記の内容に関する{count}問の確認テストです。',
      startQuiz: 'テストを開始 →',
      quizTitle: '確認テスト · 第 {num} 章',
      quizScoreSummary: '得点 {score}% · 正解 {correct}/{total}',
      answerCorrect: '✓ 正解です',
      answerWrong: '✗ もう一度確認',
      nextModule: '次の単元 {num} へ',
      tryCrimping: '圧着シミュレータに挑戦',
      continueTo: '{target} へ進む'
    },
    leaderboard: {
      badge: '実習レコード',
      realtimeActive: 'リアルタイム同期中',
      realtimeInactive: 'リアルタイム同期切断',
      title: '実習ランキング',
      subtitle: '配線の正確性とタイムに基づくリアルタイムランキングです。',
      filterAll: 'すべて',
      refresh: '一覧を更新',
      rank: '順位',
      participant: '学習者',
      level: 'レベル',
      standard: '規格',
      time: '所要時間',
      accuracy: '正確度',
      completedAt: '完了時刻',
      xp: '獲得XP',
      youTag: 'あなた',
      top1Badge: '👑 優勝',
      runnerUpBadge: '🥈 第2位',
      thirdBadge: '🥉 第3位',
      secondUnit: '秒',
      today: '今日',
      participantDefault: '学習者'
    },
    ai: {
      title: 'ネットワーク AI チューター',
      subtitle: 'PTI UNESA · 学習支援',
      topicTag: 'トピック: {topic}',
      badgeText: 'ネットワーク助教',
      newChat: '新しい会話を始める',
      close: 'AIチューターを閉じる',
      open: 'AIチューターを開く',
      tryAsking: 'おすすめの質問:',
      placeholder: 'ネットワーク技術について質問してください...',
      send: '送信',
      loading: '解説を生成中...',
      greeting: 'こんにちは、{name}さん！ネットワークの基礎原理、3D機器の仕組み、ケーブル圧着のコツなどを一緒に学べます。何について知りたいですか？',
      defaultConcept: 'ネットワーク助教',
      systemPromptLang: '親しみやすく、教育的で技術的に正確な日本語で回答してください。'
    },
    authModal: {
      loginTitle: 'NetVerse にログイン',
      registerTitle: '新規アカウント作成',
      profileTitle: '学生プロフィール',
      email: 'メールアドレス',
      password: 'パスワード',
      fullName: '氏名',
      username: 'ユーザー名',
      btnSignIn: 'ログインする',
      btnRegister: '登録を完了する',
      btnSignOut: 'ログアウト',
      switchToRegister: 'アカウントをお持ちでない方はこちら',
      switchToLogin: 'すでにアカウントをお持ちの方はこちら',
      bestAccuracy: '最高精度',
      totalAttempts: '挑戦回数: {count}回',
      cloudSync: 'クラウド保存',
      cloudActive: '同期済み',
      cloudLocal: 'ローカル',
      syncReady: 'クラウド同期完了',
      closeWindow: '閉じる',
      profileUpdated: 'プロフィールを更新しました。',
      profileUpdateErr: 'プロフィールの保存に失敗しました。再試行してください。',
      accountCreatedLogin: 'アカウントが作成されました。ログイン完了。',
      accountCreatedSignIn: 'アカウントが作成されました。ログインしてください。',
      namePlaceholder: '例: 山田 太郎',
      userPlaceholder: '例: taro_tkj',
      invalidCredentials: '登録されたメールアドレスまたはパスワードと一致しません。入力内容をご確認ください。',
      emailNotConfirmed: 'メールアドレスの確認が完了していません。しばらくしてから再試行してください。',
      genericLoginError: 'ログインできませんでした。メールアドレスとパスワードをご確認ください。',
      genericRegisterError: 'アカウント作成に失敗しました。もう一度お試しください。',
      alreadyRegistered: 'このメールアドレスは既に登録されています。ログインしてください。',
      passwordTooShort: 'パスワードは6文字以上で入力してください。',
      btnSaveProfile: '変更を保存',
      loginSubtitle: 'ログインして学習進捗やランキングを同期します。',
      noticeWarningTitle: 'ログイン警告',
      noticeSuccessTitle: '成功',
      continueGuest: 'ゲストとして続行 →'
    },
    toast: {
      latestActivity: '最新のラボアクティビティ',
      live: 'ライブ',
      close: '通知を閉じる',
      completedFormat: '{name} さんが {standard} ケーブルの圧着を完了しました（正確度: {accuracy}%、タイム: {time}秒）。'
    },
    footer: {
      desc: 'AIチューター搭載 3Dコンピュータネットワーク学習プラットフォーム',
      dept: 'UNESA 情報技術教育学科'
    }
  },

  cn: {
    nav: {
      workbench: '工作台',
      crimping: '网线制作',
      materi: '理论课程',
      leaderboard: '光荣榜',
      ariaLabel: '主导航菜单',
      logoTitle: 'NetVerse 首页'
    },
    auth: {
      login: '登录',
      register: '注册',
      profile: '个人中心',
      logout: '退出登录',
      guestNote: '登录后同步学习进度与XP',
      level: '等级',
      xp: '经验值',
      systemActive: '系统运行正常',
      ariaOpenNav: '打开导航菜单'
    },
    theme: {
      label: '界面主题',
      dark: '暗夜黑 (默认)',
      light: '日光白 (明亮)',
      midnight: '午夜深蓝',
      emerald: '苍翠墨绿'
    },
    lang: {
      label: '语言选择',
      current: 'CN'
    },
    dashboard: {
      heroTitle: '循序渐进，精通计算机网络技术',
      heroDesc: '从计算机网络理论基础出发，进阶至单元诊断测试与沉浸式 3D 双绞线网线制作实训。',
      moduleCount: '第 {current} 讲 / 共 {total} 讲 · {title} · {time} 分钟',
      btnStart: '开始学习',
      btnContinue: '继续学习',
      btnRepeat: '复习章节',
      devicesTitle: '3D 网络设备实验室',
      devicesSubtitle: '选择硬件设备，自由旋转 3D 模型并点击热点了解其核心功能。',
      selectDevice: '选择硬件设备',
      resetView: '重置视角',
      modelSource: '3D 模型 · Sketchfab',
      byAuthor: '创作者: {author}',
      view3D: '查看模型',
      noDownload: '暂不开放下载',
      specsHeader: '技术规格与端口布局',
      hotspotsHeader: '物理热点与接口遥测',
      hotspotIntro: '点击 3D 模型上的交互热点，查看硬件物理接口的详细规格及功能机理。',
      noHotspots: '当前模型暂无可用的物理交互热点。',
      loadingDevices: '正在加载设备数据',
      loadingDesc: '正在准备网络硬件与 3D 渲染资源...',
      rotateHint: '按住鼠标拖拽旋转 • 滚动滚轮缩放视角',
      defaultHotspotTitle: '端口功能概览',
      defaultHotspotDesc: '点击 3D 硬件模型上的交互热点，探索对应接口的物理特性与信号通路。'
    },
    crimping: {
      heroTitle: '双绞线网线制作',
      heroSubtitle: '将八根铜导线按标准装入 RJ-45 水晶头。点击颜色快速填入下一引脚，或拖拽至指定针脚。',
      title: 'RJ-45 水晶头 (8P8C)',
      subtitle: '移动端设备可左右滑动查看全部 8 个引脚槽位。',
      askTutor: '咨询助教',
      clearPins: '清空槽位',
      standardLabel: '接线标准:',
      paletteTitle: '双绞线线芯',
      paletteSubtitle: '点击线芯即可自动置入下一个未使用的引脚槽。',
      btnVerify: '校验线序',
      testerTitle: '网络测线仪检测结果:',
      testerWaiting: '排布好全部 8 个引脚后，点击“校验线序”进行通断与顺序测试。',
      accuracy: '排线准确率',
      timeElapsed: '制作耗时',
      xpEarned: '获得经验',
      perfectMessage: '排线完全正确！数据信号稳定传输，无近端串扰与衰减。',
      wrongPinsNotice: '部分线芯顺序不符合规范，请观察测线仪未点亮的指示灯。',
      stopwatch: '计时:',
      pin: '引脚',
      allPlaced: '所有线芯已就绪。',
      noWire: '暂无线芯',
      contacts8: '8触点',
      scrollHint: '滑动查看所有引脚。',
      clickHint: '点击线芯填入下一槽位，或拖拽至指定引脚。',
      removePin: '移除线芯',
      resultMatch: '正确',
      resultWrong: '错误',
      secondUnit: '秒',
      wiresRemaining: '剩余 {count}',
      resultSuccessMsg: '太棒了！所有引脚线序完全匹配标准！(+{xp} XP)',
      resultPartialMsg: '8根线芯中匹配了 {correct} 根（准确率 {accuracy}%），请检查标红的引脚。',
      videoTutorialBtn: '教学视频',
      videoTutorialTitle: '观看网线水晶头压接教学视频'
    },
    materi: {
      header: 'TKJ 课程讲义',
      sidebarTitle: '课程目录',
      completedOf: '已完成 {done} / 共 {total} 讲',
      module: '第 {num} 讲',
      completedBadge: '已学完',
      estimatedTime: '{min} 分钟',
      xpReward: '+{xp} XP',
      score: '得分 {score}%',
      backToMaterial: '← 返回讲义',
      moduleHeader: '第 {current} 讲 / 共 {total} 讲',
      completedScoreHeader: '已学完 · 得分 {score}%',
      inProgressBadge: '学习中',
      notStartedBadge: '未开始',
      progressCompleted: '已完成 {completed} / 共 {total} 讲',
      backToMateri: '← 返回讲义',
      moduleOf: '第 {current} 讲 / 共 {total} 讲',
      checkpointTitle: '苏格拉底式反思',
      askAiButton: '与 AI 助教深入探讨此问题',
      quizHeader: '阶段诊断测评',
      quizSubtitle: '回答全部题目以检验理论掌握程度并获取经验值奖励。',
      quizScore: '得分 {score}% · 正确 {correct}/{total}',
      submitQuiz: '提交批改',
      retryQuiz: '重新测试',
      quizCompletedNotice: '测评已完成！成绩已成功同步至云端。',
      quizFailedNotice: '得分低于50%，建议复习讲义后重新作答。',
      answerAllNotice: '请在提交评分前回答所有题目。',
      modeTheory: '理论讲义',
      modeVideo: '实训视频',
      videoLabel: 'YouTube 配套实操视频',
      videoSubtitle: '来自行业工程师的高清视频演示，直观呈现规范接线流程。',
      videoSidebarTitle: 'YouTube 实训视频',
      videoSidebarDesc: '通过一线工程实拍视频直观掌握网络硬件运维技能。',
      videoTakeaways: '实训要点与操作笔记',
      videoAuthor: '频道:',
      watchOnYoutube: '在 YouTube 观看',
      watchVideo: '观看视频',
      practiceLab: '立即实操演练',
      relatedVideos: '其他推荐实训视频',
      spotlightBannerText: '本章节配套直观清晰的 YouTube 实操视频教程。',
      practicalGuide: '网络实训指南',
      activeBadge: '当前激活',
      videoBadge: 'YouTube 教学视频',
      watchVideoVersion: '观看配套教学视频 →',
      thinkTitle: '拓展思考',
      thinkSub: '引申探究',
      discussAi: '与 AI 助教探讨此假设 →',
      discussDesc: 'AI 导师将引导你深入理解背后的网络机理。',
      quizReady: '准备好进行阶段自测了吗？',
      quizCountDesc: '本测试包含 {count} 道针对上述考点的自测题。',
      startQuiz: '开始测试 →',
      quizTitle: '阶段测试 · 第 {num} 讲',
      quizScoreSummary: '得分 {score}% · 正确 {correct}/{total}',
      answerCorrect: '✓ 回答正确',
      answerWrong: '✗ 建议复习',
      nextModule: '进入第 {num} 讲',
      tryCrimping: '前往网线制作实训',
      continueTo: '前往 {target}'
    },
    leaderboard: {
      badge: '实训记录',
      realtimeActive: '实时同步在线',
      realtimeInactive: '实时同步已断开',
      title: '实训练习排行榜',
      subtitle: '查看基于线序准确率与压接耗时的网络技术实训练习排名。',
      filterAll: '全部',
      refresh: '刷新列表',
      rank: '名次',
      participant: '学员',
      level: '等级',
      standard: '标准',
      time: '耗时',
      accuracy: '准确率',
      completedAt: '完成时间',
      xp: '获得经验',
      youTag: '你',
      top1Badge: '👑 冠军',
      runnerUpBadge: '🥈 亚军',
      thirdBadge: '🥉 季军',
      secondUnit: '秒',
      today: '今天',
      participantDefault: '学员'
    },
    ai: {
      title: '网络技术 AI 导师',
      subtitle: 'PTI UNESA · 在线辅导',
      topicTag: '当前主题: {topic}',
      badgeText: '网络助教',
      newChat: '开启新会话',
      close: '关闭 AI 助教',
      open: '打开 AI 助教',
      tryAsking: '推荐提问:',
      placeholder: '输入关于计算机网络技术的任何疑问...',
      send: '发送',
      loading: '正在生成启发式解答...',
      greeting: '你好，{name}！我们可以一起探讨网络协议原理、解析 3D 硬件设备，或解答网线制作疑难。有什么想了解的吗？',
      defaultConcept: '网络助教',
      systemPromptLang: '请使用亲切、易懂且专业严谨的中文进行启发式苏格拉底教学解答。'
    },
    authModal: {
      loginTitle: '登录 NetVerse 平台',
      registerTitle: '注册新学员账号',
      profileTitle: '学员个人中心',
      email: '电子邮箱',
      password: '登录密码',
      fullName: '真实姓名',
      username: '用户名',
      btnSignIn: '立即登录',
      btnRegister: '立即注册',
      btnSignOut: '退出登录',
      switchToRegister: '还没有账号？点击注册',
      switchToLogin: '已有账号？点击登录',
      bestAccuracy: '最高准确率',
      totalAttempts: '练习 {count} 次',
      cloudSync: '云端同步',
      cloudActive: '已同步',
      cloudLocal: '本地',
      syncReady: '云端同步就绪',
      closeWindow: '关闭窗口',
      profileUpdated: '个人信息更新成功。',
      profileUpdateErr: '资料更新失败，请重试。',
      accountCreatedLogin: '账号创建成功，已自动登录。',
      accountCreatedSignIn: '注册成功，请使用新账号登录。',
      namePlaceholder: '例如：张伟',
      userPlaceholder: '例如：zhang_tkj',
      invalidCredentials: '电子邮箱或密码与已注册的账号不匹配，请检查后重试。',
      emailNotConfirmed: '邮箱尚未激活或验证，请稍后重新尝试登录。',
      genericLoginError: '电子邮箱或密码与已注册的账号不匹配，请检查后重试。',
      genericRegisterError: '创建账号时遇到问题，请重试。',
      alreadyRegistered: '该电子邮箱已被注册，请直接登录。',
      passwordTooShort: '密码长度至少需为 6 位。',
      btnSaveProfile: '保存更改',
      loginSubtitle: '登录以同步学习进度及排行榜数据。',
      noticeWarningTitle: '登录提示',
      noticeSuccessTitle: '成功',
      continueGuest: '以访客身份继续 →'
    },
    toast: {
      latestActivity: '最新实验动态',
      live: '实时',
      close: '关闭通知',
      completedFormat: '{name} 刚刚完成了 {standard} 网线制作，准确率 {accuracy}%，耗时 {time}秒。'
    },
    footer: {
      desc: '搭载苏格拉底式 AI 助教的 3D 计算机网络技术虚拟实验室',
      dept: 'UNESA 信息技术教育系'
    }
  }
};

/**
 * 3D Hardware Devices Dictionary (Multilingual)
 */
export const DEVICE_TRANSLATIONS = {
  'switch-manageable': {
    nama: {
      id: 'Switch Manageable 24-Port',
      en: '24-Port Managed Switch',
      jp: 'マネージドスイッチ 24ポート',
      cn: '24口网管型交换机'
    },
    kategori: 'perangkat_jaringan',
    deskripsi: {
      id: 'Switch 24 port untuk menghubungkan perangkat dan mengatur jaringan lokal dengan VLAN.',
      en: 'Layer 2 managed switch for enterprise LAN segmentation and 802.1Q VLAN routing.',
      jp: 'VLAN分割やトラフィック管理に対応した24ポートのレイヤ2マネージドスイッチ。',
      cn: '支持VLAN网段划分与流量管理的企业级二层网管交换机。'
    },
    hotspots: {
      id: [
        { name: 'Port RJ-45 1–24', deskripsi: 'Hubungkan komputer dan perangkat jaringan lain ke port ini.' },
        { name: 'Port console', deskripsi: 'Gunakan port ini untuk mengatur switch secara langsung.' }
      ],
      en: [
        { name: 'RJ-45 Ports 1–24', deskripsi: 'Connect workstation PCs and network clients to these Gigabit ports.' },
        { name: 'Console Port', deskripsi: 'Use this out-of-band serial port for direct CLI device configuration.' }
      ],
      jp: [
        { name: 'RJ-45ポート 1〜24', deskripsi: 'PCや端末を接続するためのギガビットイーサネットポート群です。' },
        { name: 'コンソールポート', deskripsi: 'シリアル通信でスイッチに直接接続し、CLIから設定を行う管理用ポートです。' }
      ],
      cn: [
        { name: 'RJ-45以太网电口 1–24', deskripsi: '连接局域网内的客户端电脑及网络接入终端。' },
        { name: 'Console控制口', deskripsi: '用于通过串行线缆连接终端进行直接本地带外命令行配置。' }
      ]
    }
  },
  'router-wifi': {
    nama: {
      id: 'Router Wi-Fi TP-Link Archer AX23',
      en: 'TP-Link Archer AX23 Wi-Fi 6 Router',
      jp: 'Wi-Fi 6 ルーター TP-Link Archer AX23',
      cn: 'TP-Link Archer AX23 Wi-Fi 6 路由器'
    },
    kategori: 'perangkat_jaringan',
    deskripsi: {
      id: 'Router Wi-Fi 6 dengan dua pita frekuensi, empat antena, satu port WAN Gigabit, dan empat port LAN Gigabit.',
      en: 'Dual-band Wi-Fi 6 router featuring 4 high-gain antennas, Gigabit WAN, and 4 Gigabit LAN ports.',
      jp: 'デュアルバンドWi-Fi 6対応、4本の高利得アンテナ、ギガビットWANおよび4つのLANポートを搭載。',
      cn: '双频Wi-Fi 6路由器，搭载4根高增益天线、全千兆WAN口与4个千兆LAN口。'
    },
    hotspots: {
      id: [
        { name: 'Port WAN Gigabit (biru)', deskripsi: 'Hubungkan router ke modem atau sumber internet lewat port ini.' },
        { name: 'Port LAN 1–4 (kuning)', deskripsi: 'Hubungkan komputer dan perangkat lain ke jaringan lokal.' }
      ],
      en: [
        { name: 'Gigabit WAN Port (Blue)', deskripsi: 'Connect this port to your upstream broadband modem or ISP gateway.' },
        { name: 'Gigabit LAN Ports 1–4', deskripsi: 'Connect internal client workstations to the local network.' }
      ],
      jp: [
        { name: 'ギガビットWANポート (青)', deskripsi: '上流のモデムや光回線ONUをこのポートに接続します。' },
        { name: 'ギガビットLANポート 1〜4', deskripsi: '有線PCやスイッチなど社内・家庭内ネットワーク端末を接続します。' }
      ],
      cn: [
        { name: '千兆WAN接口 (蓝色)', deskripsi: '上联宽带光猫（Modem/ONU）或运营商互联网网关。' },
        { name: '千兆LAN接口 1–4 (黄色)', deskripsi: '连接内部局域网内的电脑终端或扩展交换机。' }
      ]
    }
  },
  'crimping-tool': {
    nama: {
      id: 'Tang Crimping RJ-45/RJ-11',
      en: 'RJ-45/RJ-11 Crimping Tool',
      jp: '圧着工具 (RJ-45/RJ-11)',
      cn: 'RJ-45/RJ-11 网线压线钳'
    },
    kategori: 'alat_kerja',
    deskripsi: {
      id: 'Tang untuk memotong dan mengupas kabel, lalu memasang konektor RJ-45 atau RJ-11.',
      en: 'Multi-function tool for cutting, stripping outer jackets, and precision crimping modular plugs.',
      jp: 'LANケーブルの切断、被覆剥き、RJ-45/RJ-11モジュラープラグの圧着を行う専用工具。',
      cn: '集剪线、剥除外皮保护层及精确压接RJ-45水晶头于一体的多功能网络施工工具。'
    },
    hotspots: {
      id: [
        { name: 'Mata pres 8P8C', deskripsi: 'Bagian ini menekan kontak konektor ke kawat tembaga.' }
      ],
      en: [
        { name: '8P8C Crimping Cavity', deskripsi: 'Drives gold-plated modular plug contacts into copper conductor cores.' }
      ],
      jp: [
        { name: '8P8C圧着ダイス', deskripsi: 'コネクタの金属端子を芯線へ均等に押し込み、電気的に導通・固定します。' }
      ],
      cn: [
        { name: '8P8C压接模口', deskripsi: '用于将水晶头的8根镀金铜片触点精准压入双绞线线芯。' }
      ]
    }
  },
  'konektor-rj45': {
    nama: {
      id: 'Konektor & Kabel LAN RJ-45',
      en: 'RJ-45 Modular Plug & Cat 6 UTP Cable',
      jp: 'RJ-45 コネクタ & Cat 6 LANケーブル',
      cn: 'RJ-45 水晶头与超六类双绞线'
    },
    kategori: 'media_transmisi',
    deskripsi: {
      id: 'Kabel UTP Cat 6 dengan konektor RJ-45 (8P8C) dan pelindung di pangkal konektornya.',
      en: 'Cat 6 UTP cable equipped with 8P8C gold-plated contact modular plug and strain-relief boot.',
      jp: '金メッキ8P8C端子と保護ブーツを備えたCat 6 UTP規格のLANケーブル。',
      cn: '配备8P8C镀金触点端子与抗弯折保护套的Cat 6无屏蔽双绞线。'
    },
    hotspots: {
      id: [
        { name: 'Konektor 8P8C', deskripsi: 'Delapan kontak logam menghubungkan kawat di dalam kabel ke port jaringan.' }
      ],
      en: [
        { name: '8P8C Modular Contacts', deskripsi: 'Eight gold-plated copper contacts interface with 8-pin Ethernet ports.' }
      ],
      jp: [
        { name: '8P8C端子部', deskripsi: '8極の金メッキ接点が機器のLANポートと確実に電気信号を通電します。' }
      ],
      cn: [
        { name: '8P8C镀金端子', deskripsi: '8个高导电性铜片触点与以太网接口建立电气接触。' }
      ]
    }
  },
  'server-rack': {
    nama: {
      id: 'Server Rack Data Center',
      en: '19-Inch Data Center Server Rack',
      jp: '19インチ サーバーラック',
      cn: '19英寸数据中心标准机柜'
    },
    kategori: 'perangkat_jaringan',
    deskripsi: {
      id: 'Rak 19 inci untuk memasang server, switch, dan merapikan kabel jaringan.',
      en: 'Standard 19-inch equipment enclosure for organizing enterprise servers, switches, and cabling.',
      jp: 'サーバーやスイッチをマウントし、配線を整理・収容する標準19インチキャビネット。',
      cn: '用于安装服务器、网络交换机并整齐收纳线缆的标准19英寸机架机柜。'
    },
    hotspots: {
      id: [
        { name: 'Rel rak 19 inci', deskripsi: 'Pasang server dan switch pada rel ini. Satu unit rak (1U) tingginya 1,75 inci.' }
      ],
      en: [
        { name: '19-Inch Mounting Rails', deskripsi: 'Install rackmount servers and distribution switches. 1U equals 1.75 inches.' }
      ],
      jp: [
        { name: '19インチマウントレール', deskripsi: 'サーバーやスイッチをネジ止め固定するレールです（1U=約1.75インチ）。' }
      ],
      cn: [
        { name: '19英寸立柱导轨', deskripsi: '固定安装机架式服务器与交换机设备，标准1U高度为1.75英寸。' }
      ]
    }
  },
  'lan-tester': {
    nama: {
      id: 'LAN tester',
      en: 'LAN Cable Tester',
      jp: 'LANテスター',
      cn: '网络寻线测线仪'
    },
    kategori: 'alat_kerja',
    deskripsi: {
      id: 'Alat untuk memeriksa sambungan dan urutan pin pada kabel LAN.',
      en: 'Diagnostic meter to verify pin continuity, sequence, and split pairs across 8 wire loops.',
      jp: 'LANケーブルの導通状態、ピン配列の整合性、断線を8つのLEDランプで検査する装置。',
      cn: '通过8颗LED双端指示灯校验网线通断、线序错位与短路故障的检测仪表。'
    },
    hotspots: {
      id: [
        { name: 'Lampu indikator', deskripsi: 'Delapan lampu menunjukkan sambungan pada tiap pin saat kabel diuji.' },
        { name: 'Port RJ-45', deskripsi: 'Sambungkan salah satu ujung kabel LAN ke port ini.' },
        { name: 'Unit remote', deskripsi: 'Pasang unit ini di ujung kabel yang lain untuk memeriksa sambungan dari kedua sisi.' }
      ],
      en: [
        { name: 'LED Indicators', deskripsi: 'Eight sequenced LEDs illuminate corresponding to active wire pin circuits.' },
        { name: 'Master RJ-45 Port', deskripsi: 'Connect the primary cable jack into this diagnostic jack.' },
        { name: 'Remote Terminating Unit', deskripsi: 'Connect the far end of long cable runs into the detachable remote module.' }
      ],
      jp: [
        { name: 'LEDインジケーター', deskripsi: '1〜8番のLEDランプが順次点灯し、各芯線の導通と配列を明示します。' },
        { name: 'RJ-45ポート', deskripsi: 'テスト対象ケーブルの片端をこのポートに挿入します。' },
        { name: 'リモート子機ユニット', deskripsi: '長距離配線の反対側に接続して両端から導通状態を検証します。' }
      ],
      cn: [
        { name: 'LED线序指示灯', deskripsi: '8颗指示灯按顺序循环点亮，直观显示每根线芯的通断与错序。' },
        { name: '主机RJ-45接口', deskripsi: '插入待测网络跳线的一端接头。' },
        { name: '可分离式远端副机', deskripsi: '连接在长距离布线的另一端，支持远距离双端校验。' }
      ]
    }
  }
};

/**
 * Curriculum Modules Dictionary (Multilingual)
 */
export const MODULE_TRANSLATIONS = {
  'jaringan-dasar-topologi': {
    judul: {
      id: 'Dasar Jaringan & Topologi',
      en: 'Network Fundamentals & Topology',
      jp: 'ネットワーク基礎とトポロジー',
      cn: '计算机网络基础与拓扑结构'
    },
    deskripsi: {
      id: 'Pelajari konsep host, client-server, serta topologi star, bus, dan mesh.',
      en: 'Understand host concepts, client-server models, and star, bus, and mesh topologies.',
      jp: 'ホスト、クライアント・サーバー、スター型・バス型・メッシュ型トポロジーの基礎を学びます。',
      cn: '理解主机、客户机-服务器架构以及星型、总线型、网状型网络拓扑。'
    },
    sections: {
      id: [
        {
          title: 'Konsep Dasar Host & Jaringan',
          body: 'Jaringan komputer menghubungkan berbagai host—seperti komputer, laptop, smartphone, dan server—agar dapat bertukar data, berbagi sumber daya, dan berkomunikasi secara andal.'
        },
        {
          title: 'Model Arsitektur Client-Server',
          body: 'Dalam arsitektur client-server, server bertindak sebagai penyedia layanan terpusat (web, database, file), sedangkan client mengajukan permintaan layanan melalui media transmisi.'
        },
        {
          title: 'Topologi Star, Bus, & Mesh',
          body: 'Topologi star menghubungkan setiap perangkat ke switch pusat sehingga tahan terhadap putusnya satu kabel. Topologi bus menggunakan satu kabel tulang punggung (backbone). Topologi mesh menyediakan jalur cadangan redundan untuk keandalan maksimal.'
        }
      ],
      en: [
        {
          title: 'Host & Network Fundamentals',
          body: 'A computer network interconnects diverse hosts—including workstations, laptops, mobile devices, and servers—allowing them to exchange data packets, share resources, and communicate securely.'
        },
        {
          title: 'Client-Server Architecture Model',
          body: 'In client-server architectures, centralized servers host network resources (web servers, databases, files), responding to service requests issued by client workstations across transmission media.'
        },
        {
          title: 'Star, Bus, & Mesh Topologies',
          body: 'Star topology links each station to a central switch, isolating single-cable failures. Bus topology shares a single linear backbone trunk. Mesh topology provides redundant backup paths ensuring maximum fault tolerance.'
        }
      ],
      jp: [
        {
          title: 'ホストとネットワークの基本概念',
          body: 'コンピュータネットワークは、PC、スマートフォン、サーバーなどの様々なホスト端末を相互接続し、パケットデータの送受信やリソース共有を行う基盤です。'
        },
        {
          title: 'クライアント・サーバーモデル',
          body: 'クライアント・サーバー型アーキテクチャでは、サーバーがデータやWebサービスを集約提供し、クライアント端末からのリクエストに応じて迅速に応答します。'
        },
        {
          title: 'スター型・バス型・メッシュ型トポロジー',
          body: 'スター型は中央スイッチに各端末を接続し、1本の障害が全体に波及しません。バス型は1本の幹線ケーブルを共有します。メッシュ型は冗長経路を多数備え、極めて高い信頼性を誇ります。'
        }
      ],
      cn: [
        {
          title: '主机概念与计算机网络基础',
          body: '计算机网络将计算机、移动终端、服务器等各类主机节点互联，通过标准网络协议实现可靠的数据报文交换、硬件外设共享与分布式协作。'
        },
        {
          title: '客户机-服务器（Client-Server）架构',
          body: '在典型的 C/S 体系中，服务器端集中管理并响应网络资源与数据库访问；客户端终端则负责向服务端发起通信请求并呈现业务界面。'
        },
        {
          title: '星型、总线型与网状网络拓扑',
          body: '星型拓扑通过中心交换机实现各节点独立汇聚，单一链路中断不影响整体；总线型拓扑共享同一主干线缆；网状拓扑具备多条备用冗余路径，容错能力最强。'
        }
      ]
    },
    checkpointQuestion: {
      id: 'Bagaimana topologi star dan bus memengaruhi keandalan jaringan jika satu kabel putus?',
      en: 'How do star and bus topologies impact network reliability when a single cable breaks?',
      jp: 'ケーブルが1本切断された場合、スター型とバス型トポロジーでは耐障害性にどのような違いが生じますか？',
      cn: '若主干或分路网线中断，星型与总线型拓扑结构在网络可靠性上有何本质区别？'
    }
  },
  'media-transmisi-utp': {
    judul: {
      id: 'Media Transmisi & Standar Pengkabelan UTP',
      en: 'Transmission Media & UTP Cable Standards',
      jp: '伝送媒体とUTP配線規格',
      cn: '传输介质与双绞线标准'
    },
    deskripsi: {
      id: 'Kenali susunan kawat dalam kabel UTP/STP dan urutan warna T568A serta T568B.',
      en: 'Master twisted pair (UTP/STP) cable structures and T568A/T568B color codes.',
      jp: 'ツイストペアケーブル（UTP/STP）の構造とT568A・T568Bの配線順序を深く理解します。',
      cn: '掌握双绞线（UTP/STP）内部结构以及T568A、T568B标准线序排列规则。'
    },
    sections: {
      id: [
        {
          title: 'Karakteristik Kabel UTP & STP',
          body: 'Kabel Unshielded Twisted Pair (UTP) memilin pasangan kawat tembaga untuk meniadakan interferensi elektromagnetik (crosstalk). Kabel STP menambahkan pelindung foil logam untuk lingkungan industri yang bising.'
        },
        {
          title: 'Standar Susunan Pin T568A & T568B',
          body: 'Standar T568B menyusun kawat: Putih Oranye, Oranye, Putih Hijau, Biru, Putih Biru, Hijau, Putih Cokelat, Cokelat. Pada standar T568A, pasangan kawat hijau dan oranye saling bertukar posisi.'
        },
        {
          title: 'Kabel Straight-Through vs Crossover',
          body: 'Kabel straight-through menggunakan standar yang sama di kedua ujungnya (T568B ke T568B) untuk menghubungkan perangkat berbeda (PC ke Switch). Kabel crossover menghubungkan dua perangkat sejenis.'
        }
      ],
      en: [
        {
          title: 'UTP & STP Cable Characteristics',
          body: 'Unshielded Twisted Pair (UTP) cables twist copper conductor pairs to cancel out electromagnetic crosstalk via differential signaling. Shielded Twisted Pair (STP) wraps foil shielding for high-noise industrial settings.'
        },
        {
          title: 'T568A & T568B Color Standards',
          body: 'The T568B standard defines: White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown. T568A swaps the positions of the green and orange wire pairs.'
        },
        {
          title: 'Straight-Through vs Crossover Cables',
          body: 'Straight-through cables terminate identical pinouts on both ends (T568B to T568B) to link dissimilar devices (PC to Switch). Crossover cables invert Tx/Rx pins to interconnect like devices.'
        }
      ],
      jp: [
        {
          title: 'UTPおよびSTPケーブルの特性',
          body: '非シールドツイストペア（UTP）は、銅線をペアで撚り合わせることで電磁ノイズやクロストークを相殺します。STPケーブルは金属シールドを追加し耐ノイズ性を高めた製品です。'
        },
        {
          title: 'T568AおよびT568B配線規格',
          body: 'T568B規格の配列は「白橙、橙、白緑、青、白青、緑、白茶、茶」です。T568A規格では緑ペアと橙ペアの配置位置が相互に入れ替わります。'
        },
        {
          title: 'ストレートケーブルとクロスケーブル',
          body: '両端を同一規格（T568B-T568B）で結線したストレートケーブルはPCとスイッチの接続に用いられます。クロスケーブルは同一階層の機器同士を直結する際に使用されます。'
        }
      ],
      cn: [
        {
          title: '双绞线（UTP/STP）物理电气特性',
          body: '非屏蔽双绞线（UTP）通过成对芯线精密扭绞抵消外部电磁辐射与相邻线对串扰；屏蔽双绞线（STP）加装金属屏蔽箔，适用于强电磁干扰工业场景。'
        },
        {
          title: 'T568A 与 T568B 线序排列规范',
          body: 'T568B 标准线序为：白橙、橙、白绿、蓝、白蓝、绿、白棕、棕。T568A 标准则将绿色线对（Pin 1, 2, 3, 6）与橙色线对位置互换。'
        },
        {
          title: '直通网线与交叉网线应用场景',
          body: '直通线两端采用相同线序（T568B-T568B），用于连接异构设备（如电脑到交换机）；交叉网线则将发送端与接收端反接，用于同类设备直连。'
        }
      ]
    },
    checkpointQuestion: {
      id: 'Mengapa susunan T568B memisahkan pin 3 dan 6 mengapit kawat biru?',
      en: 'Why does the T568B standard split pins 3 and 6 around the blue center pair?',
      jp: 'T568B配線規格において、なぜピン3と6は青ペアを挟んで分割されているのでしょうか？',
      cn: '为什么在T568B标准中，引脚3与引脚6要跨过中间的蓝色线对进行分布？'
    }
  },
  'perangkat-keras-jaringan': {
    judul: {
      id: 'Eksplorasi Perangkat Jaringan (Router & Switch)',
      en: 'Network Hardware Exploration (Router & Switch)',
      jp: 'ネットワーク機器探究（ルーター＆スイッチ）',
      cn: '网络硬件设备解析（路由器与交换机）'
    },
    deskripsi: {
      id: 'Pelajari perbedaan fungsi switch Layer 2 dan router Layer 3, serta port Ethernet, console, dan SFP.',
      en: 'Explore Layer 2 switch vs Layer 3 router operations, Ethernet ports, console, and SFP.',
      jp: 'Layer 2スイッチとLayer 3ルーターの相違点、Ethernetポート、コンソール、SFPモジュールを学習します。',
      cn: '分析二层交换机与三层路由器的核心功能差异，探索以太网电口、Console控制口与SFP光口。'
    },
    sections: {
      id: [
        {
          title: 'Switch Layer 2 & Tabel CAM',
          body: 'Switch meneruskan data di dalam jaringan lokal dengan membaca alamat MAC fisik dan menyimpannya di tabel CAM (Content Addressable Memory) agar data langsung sampai ke port tujuan tanpa broadcast berlebihan.'
        },
        {
          title: 'Router Layer 3 & Perutean IP',
          body: 'Router menghubungkan jaringan yang berbeda subnet atau broadcast domain. Router membaca alamat IP pada Layer 3 untuk menentukan rute terbaik melewati gerbang WAN menuju internet.'
        },
        {
          title: 'Port Console & Modul SFP',
          body: 'Port console memberikan akses konfigurasi CLI langsung (out-of-band) saat perangkat baru disiapkan atau mengalami kendala IP. Modul SFP memungkinkan uplink serat optik berkecepatan tinggi.'
        }
      ],
      en: [
        {
          title: 'Layer 2 Switches & CAM Table Mapping',
          body: 'Switches forward frames within a LAN by reading hardware MAC addresses, dynamically updating their CAM table to unicast traffic directly to target ports without unnecessary broadcast flooding.'
        },
        {
          title: 'Layer 3 Routers & IP Packet Routing',
          body: 'Routers interconnect disparate subnets and separate broadcast domains. Operating at Layer 3, routers examine IP headers to determine optimal paths across WAN gateways to the public internet.'
        },
        {
          title: 'Console Ports & Modular SFP Transceivers',
          body: 'The console port provides direct serial CLI terminal access (out-of-band management) essential for initial setup or network recovery. SFP transceiver cages enable high-speed optical fiber backbones.'
        }
      ],
      jp: [
        {
          title: 'レイヤ2スイッチとCAMテーブルの仕組み',
          body: 'スイッチは受信フレームの宛先MACアドレスを参照し、CAMテーブルに学習・保持することで、不要なブロードキャストを防ぎ目的のポートへユニキャスト転送します。'
        },
        {
          title: 'レイヤ3ルーターとIPルーティング',
          body: 'ルーターは異なるIPサブネットやブロードキャストドメイン間を中継します。第3層のIPパケットヘッダーを読み取り、最適な経路を選択してWANゲートウェイへ転送します。'
        },
        {
          title: 'コンソールポートとSFP光モジュール',
          body: 'コンソールポートはIP未設定時やトラブル発生時にCLIから直接設定を行う帯域外管理ポートです。SFPスロットは光ファイバーによる長距離・高速アップリンク回線を提供します。'
        }
      ],
      cn: [
        {
          title: '二层交换机工作原理与 CAM 转发表',
          body: '交换机根据以太网帧头中的目标硬件 MAC 地址转发数据，并在内存中动态建立 CAM 映射表，避免了无休止的广播风暴，实现了精确的点对点单播传输。'
        },
        {
          title: '三层路由器寻址与网关路由机制',
          body: '路由器工作在网络层，负责隔离广播域并跨网段路由报文。它依据目标 IP 地址查询路由表，选择最优转发下一跳并穿透 WAN 接口通达外部互联网。'
        },
        {
          title: 'Console 带外管理控制口与 SFP 光模块',
          body: 'Console 口提供不依赖 IP 协议栈的串行独立带外维护通道；SFP 热插拔插槽则可灵活插入单模或多模光纤收发器，轻松构建骨干级千兆光纤上联链路。'
        }
      ]
    },
    checkpointQuestion: {
      id: 'Kapan teknisi perlu memakai port console daripada port LAN biasa?',
      en: 'When does a network technician need to use a console port instead of Ethernet?',
      jp: '通常のLANポートではなく、コンソールポートによる管理が必要となるのはどのような場面ですか？',
      cn: '网络工程师在何种故障或调试场景下，必须连接Console接口而非标准以太网口？'
    }
  }
};

/**
 * Technical Specification Labels (Multilingual)
 */
export const SPECIFICATION_LABELS = {
  antena: { id: 'Antena', en: 'Antenna', jp: 'アンテナ', cn: '天线规格' },
  aplikasi: { id: 'Penggunaan', en: 'Application', jp: '用途', cn: '应用场景' },
  bahan: { id: 'Bahan', en: 'Material', jp: '材質', cn: '材质结构' },
  cpu: { id: 'Prosesor', en: 'Processor', jp: 'CPU', cn: '处理器' },
  format: { id: 'Format model', en: 'Model Format', jp: 'フォーマット', cn: '模型格式' },
  frekuensi: { id: 'Frekuensi', en: 'Frequency', jp: '周波数', cn: '工作频段' },
  fungsi: { id: 'Fungsi', en: 'Function', jp: '機能', cn: '核心功能' },
  kapasitas: { id: 'Kapasitas', en: 'Capacity', jp: '容量', cn: '容量规格' },
  kecepatan: { id: 'Kecepatan', en: 'Speed', jp: '通信速度', cn: '传输速率' },
  konektor: { id: 'Konektor', en: 'Connector', jp: 'コネクタ', cn: '接口标准' },
  kompatibilitas: { id: 'Kompatibilitas', en: 'Compatibility', jp: '互換性', cn: '兼容性' },
  material: { id: 'Bahan', en: 'Material', jp: '材質', cn: '外壳材质' },
  os: { id: 'Sistem operasi', en: 'Operating System', jp: 'OS', cn: '操作系统' },
  port: { id: 'Port', en: 'Ports', jp: 'ポート', cn: '接口配置' },
  ram: { id: 'Memori', en: 'Memory', jp: 'メモリ', cn: '运行内存' },
  ukuran: { id: 'Ukuran', en: 'Dimensions', jp: 'サイズ', cn: '尺寸规格' },
  standar: { id: 'Standar', en: 'Standard', jp: '規格', cn: '标准规范' },
  terminasi: { id: 'Cara pemasangan', en: 'Termination', jp: '終端方式', cn: '端接方式' },
  throughput: { id: 'Kapasitas data', en: 'Throughput', jp: 'スループット', cn: '吞吐量' },
  tipe: { id: 'Jenis', en: 'Type', jp: '種別', cn: '设备类型' },
  tipe_kabel: { id: 'Jenis kabel', en: 'Cable Type', jp: 'ケーブル種別', cn: '线缆规格' },
  ventilasi: { id: 'Ventilasi', en: 'Ventilation', jp: '排熱機構', cn: '散热通风' },
  indikator: { id: 'Indikator', en: 'Indicators', jp: 'LED表示', cn: '状态指示' },
  jenis: { id: 'Jenis', en: 'Type', jp: 'タイプ', cn: '类型' }
};

/**
 * Category Labels (Multilingual)
 */
export const CATEGORY_LABELS = {
  perangkat_jaringan: {
    id: 'Perangkat jaringan',
    en: 'Network Equipment',
    jp: 'ネットワーク機器',
    cn: '网络通信设备'
  },
  media_transmisi: {
    id: 'Media transmisi',
    en: 'Transmission Media',
    jp: '伝送媒体',
    cn: '传输介质与线缆'
  },
  alat_kerja: {
    id: 'Alat kerja',
    en: 'Work Tools',
    jp: '作業工具',
    cn: '工程工具与仪表'
  }
};

/**
 * UTP Wires Definition (Multilingual)
 */
export const WIRE_DEFINITIONS_MULTILINGUAL = [
  {
    id: 'WO',
    code: 'white-orange',
    stripeClass: 'cable-striped-orange',
    label: 'W-OR',
    name: { id: 'Putih Oranye', en: 'White Orange', jp: '白/橙', cn: '白橙' }
  },
  {
    id: 'O',
    code: 'orange',
    stripeClass: 'cable-solid-orange',
    label: 'OR',
    name: { id: 'Oranye', en: 'Orange', jp: '橙', cn: '橙色' }
  },
  {
    id: 'WG',
    code: 'white-green',
    stripeClass: 'cable-striped-green',
    label: 'W-GR',
    name: { id: 'Putih Hijau', en: 'White Green', jp: '白/緑', cn: '白绿' }
  },
  {
    id: 'B',
    code: 'blue',
    stripeClass: 'cable-solid-blue',
    label: 'BL',
    name: { id: 'Biru', en: 'Blue', jp: '青', cn: '蓝色' }
  },
  {
    id: 'WB',
    code: 'white-blue',
    stripeClass: 'cable-striped-blue',
    label: 'W-BL',
    name: { id: 'Putih Biru', en: 'White Blue', jp: '白/青', cn: '白蓝' }
  },
  {
    id: 'G',
    code: 'green',
    stripeClass: 'cable-solid-green',
    label: 'GR',
    name: { id: 'Hijau', en: 'Green', jp: '緑', cn: '绿色' }
  },
  {
    id: 'WBr',
    code: 'white-brown',
    stripeClass: 'cable-striped-brown',
    label: 'W-BR',
    name: { id: 'Putih Cokelat', en: 'White Brown', jp: '白/茶', cn: '白棕' }
  },
  {
    id: 'Br',
    code: 'brown',
    stripeClass: 'cable-solid-brown',
    label: 'BR',
    name: { id: 'Cokelat', en: 'Brown', jp: '茶', cn: '棕色' }
  }
];

/**
 * Helper to get localized wire details
 */
export function getLocalizedWire(wireId, lang = 'id') {
  const currentLang = ['id', 'en', 'jp', 'cn'].includes(lang) ? lang : 'id';
  const wire = WIRE_DEFINITIONS_MULTILINGUAL.find(w => w.id === wireId);
  if (!wire) return null;
  return {
    ...wire,
    name: wire.name[currentLang] || wire.name.id
  };
}

/**
 * Helper to get localized module metadata & content
 */
export function getLocalizedModule(modul, lang = 'id') {
  if (!modul) return null;
  const currentLang = ['id', 'en', 'jp', 'cn'].includes(lang) ? lang : 'id';
  const slug = modul.slug;
  const trans = MODULE_TRANSLATIONS[slug];

  if (!trans) return modul;

  return {
    ...modul,
    judul: trans.judul[currentLang] || trans.judul.id || modul.judul,
    deskripsi: trans.deskripsi[currentLang] || trans.deskripsi.id || modul.deskripsi,
    konten: {
      intro: trans.deskripsi[currentLang] || trans.deskripsi.id || modul.deskripsi,
      sections: trans.sections[currentLang] || trans.sections.id,
      checkpointQuestion: trans.checkpointQuestion[currentLang] || trans.checkpointQuestion.id
    }
  };
}

/**
 * Helper to get localized 3D device metadata & hotspots
 */
export function getLocalizedDevice(device, lang = 'id') {
  if (!device) return null;
  const currentLang = ['id', 'en', 'jp', 'cn'].includes(lang) ? lang : 'id';
  const kode = device.kode;
  const trans = DEVICE_TRANSLATIONS[kode];

  if (!trans) return device;

  return {
    ...device,
    nama: trans.nama[currentLang] || trans.nama.id || device.nama,
    deskripsi: trans.deskripsi[currentLang] || trans.deskripsi.id || device.deskripsi,
    hotspots: trans.hotspots[currentLang] || trans.hotspots.id || device.hotspots
  };
}

/**
 * Get translation by nested key path, e.g. t('nav.workbench', 'en')
 */
export function t(key, lang = 'id', params = {}) {
  const currentLang = translations[lang] ? lang : 'id';
  const keys = key.split('.');
  let val = translations[currentLang];

  for (const k of keys) {
    if (val && typeof val === 'object' && k in val) {
      val = val[k];
    } else {
      // Fallback to Indonesian if key missing in selected language
      let fallbackVal = translations.id;
      for (const fk of keys) {
        if (fallbackVal && typeof fallbackVal === 'object' && fk in fallbackVal) {
          fallbackVal = fallbackVal[fk];
        } else {
          return key;
        }
      }
      val = fallbackVal;
      break;
    }
  }

  if (typeof val === 'string') {
    return val.replace(/\{(\w+)\}/g, (_, match) => {
      return params[match] !== undefined ? params[match] : `{${match}}`;
    });
  }

  return val;
}
