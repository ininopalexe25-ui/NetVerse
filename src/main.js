import './style.css';
import { supabase } from './utils/supabase.js';
import { renderNavbar } from './components/Navbar.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderMateriViewer } from './components/MateriViewer.js';
import { renderCrimpingMaster, STANDARDS } from './components/CrimpingMaster.js';
import { renderLeaderboard } from './components/Leaderboard.js';
import { renderFloatingAiTutor } from './components/FloatingAiTutor.js';
import { renderAuthModal } from './components/AuthModal.js';
import { renderNetVerseLogo } from './components/Logo.js';
import { getModuleQuizzes } from './data/moduleQuizzes.js';
import { t, getLocalizedModule } from './utils/i18n.js';

const initialLang = localStorage.getItem('netverse-lang') || 'id';

// Application State
const state = {
  activeTab: 'workbench', // 'workbench' | 'crimping' | 'materi' | 'leaderboard'
  session: null,
  userProfile: {
    id: null,
    nama_lengkap: 'User',
    username: 'user',
    level: 1,
    total_xp: 0,
    role: 'tamu'
  },
  authModalOpen: false,
  authMode: 'login', // 'login' | 'register' | 'profile'
  authLoading: false,
  authNotice: null, // { type: 'error' | 'success', message: '' }
  showPassword: false,

  // Learning & Quiz Progress State
  learningProgress: {}, // { [modul_id]: { status, skor_quiz, terakhir_dibaca } }
  quizAnswers: {},      // { [modul_id]: { [qIdx]: optIdx } }
  quizSubmitted: {},    // { [modul_id]: boolean }
  quizMode: false,

  moduls: [],
  selectedModulIndex: 0,
  devices: [],
  activeDeviceIndex: 0,
  selectedHotspot: null,

  // Crimping Master State
  crimpingStandard: 'T568B',
  crimpingSlots: [null, null, null, null, null, null, null, null],
  crimpingTimerRunning: false,
  crimpingElapsedSeconds: 0,
  crimpingTimerId: null,
  crimpingResult: null,

  // AI Tutor State
  aiChatOpen: false,
  aiLoading: false,
  aiDynamicChips: [],
  aiMessages: [
    {
      role: 'assistant',
      text: t('ai.greeting', initialLang, { name: 'User' }),
      concept: t('ai.defaultConcept', initialLang)
    }
  ],
  scores: [],
  leaderboardFilter: 'all', // 'all' | 'T568B' | 'T568A'
  realtimeStatus: 'CONNECTED',
  realtimeToast: null,
  realtimeChannel: null,
  theme: localStorage.getItem('netverse-theme') || 'dark',
  lang: initialLang,
  materiFormat: 'teori', // 'teori' | 'video'
  activeVideoId: 'TrqZDU7Ywf4'
};

// Returns user's dynamic display name if logged in, or 'User' if guest
function getEffectiveUserName() {
  if (state.session) {
    const profileName = state.userProfile?.nama_lengkap?.trim() ||
      state.session.user?.user_metadata?.full_name?.trim() ||
      state.session.user?.user_metadata?.name?.trim();
    if (profileName) {
      return profileName;
    }
  }
  return 'User';
}

// Theme Manager (Light, Dark, Midnight Blue, Dark Emerald)
function applyTheme(theme) {
  state.theme = theme;
  try {
    localStorage.setItem('netverse-theme', theme);
  } catch (e) {}

  const htmlEl = document.documentElement;
  const bodyEl = document.body;

  htmlEl.classList.remove('light', 'dark', 'midnight', 'emerald');
  if (bodyEl) {
    bodyEl.classList.remove('light', 'dark', 'midnight', 'emerald');
  }

  if (theme === 'light') {
    htmlEl.classList.add('light');
    htmlEl.setAttribute('data-theme', 'light');
    if (bodyEl) {
      bodyEl.classList.add('light');
    }
  } else if (theme === 'midnight') {
    htmlEl.classList.add('midnight', 'dark');
    htmlEl.setAttribute('data-theme', 'midnight');
    if (bodyEl) {
      bodyEl.classList.add('midnight', 'dark');
    }
  } else if (theme === 'emerald') {
    htmlEl.classList.add('emerald', 'dark');
    htmlEl.setAttribute('data-theme', 'emerald');
    if (bodyEl) {
      bodyEl.classList.add('emerald', 'dark');
    }
  } else {
    // default dark
    htmlEl.classList.add('dark');
    htmlEl.setAttribute('data-theme', 'dark');
    if (bodyEl) {
      bodyEl.classList.add('dark');
    }
  }
}

function setTheme(theme) {
  applyTheme(theme);
  renderApp();
}

function toggleTheme() {
  const cycle = { dark: 'light', light: 'midnight', midnight: 'emerald', emerald: 'dark' };
  const nextTheme = cycle[state.theme] || 'dark';
  applyTheme(nextTheme);
  renderApp();
}

// Language Manager (ID, EN, JP, CN)
function setLanguage(lang) {
  state.lang = lang;
  try {
    localStorage.setItem('netverse-lang', lang);
  } catch (e) {}

  const htmlEl = document.documentElement;
  const langAttr = lang === 'cn' ? 'zh-CN' : (lang === 'jp' ? 'ja' : (lang === 'en' ? 'en' : 'id'));
  htmlEl.setAttribute('lang', langAttr);

  // Update initial greeting if user hasn't started talking yet
  if (state.aiMessages.length === 1 && state.aiMessages[0].role === 'assistant') {
    state.aiMessages[0].text = t('ai.greeting', lang, { name: getEffectiveUserName() });
    state.aiMessages[0].concept = t('ai.defaultConcept', lang);
  }

  renderApp();
}

// Initial theme & lang apply
applyTheme(state.theme);
document.documentElement.setAttribute('lang', state.lang === 'cn' ? 'zh-CN' : (state.lang === 'jp' ? 'ja' : (state.lang === 'en' ? 'en' : 'id')));

// Profile Loader from Supabase
async function loadUserProfile(userId) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profile) {
      state.userProfile = profile;
    } else if (state.session?.user) {
      // Create fresh profile if trigger was delayed
      const fallbackName = state.session.user.user_metadata?.full_name || 
        state.session.user.user_metadata?.name || 
        state.session.user.email?.split('@')[0] || 
        'Mahasiswa';
      const fallbackUser = state.session.user.user_metadata?.username || 
        state.session.user.email?.split('@')[0] || 
        'mhs_tkj';

      const { data: createdProfile } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          nama_lengkap: fallbackName,
          username: fallbackUser,
          total_xp: 250,
          level: 1,
          role: 'mahasiswa'
        })
        .select()
        .single();

      if (createdProfile) {
        state.userProfile = createdProfile;
      }
    }

    if (state.aiMessages.length === 1 && state.aiMessages[0].role === 'assistant') {
      state.aiMessages[0].text = t('ai.greeting', state.lang, { name: getEffectiveUserName() });
    }
  } catch (err) {
    console.warn('Profile loader notice:', err);
  }
}

// Learning Progress Loader from Supabase
async function loadLearningProgress(userId) {
  try {
    const { data: progressRows, error } = await supabase
      .from('progres_belajar')
      .select('*')
      .eq('user_id', userId);

    if (progressRows && progressRows.length > 0) {
      progressRows.forEach(row => {
        state.learningProgress[row.modul_id] = row;
        if (row.status === 'selesai') {
          state.quizSubmitted[row.modul_id] = true;
        }
      });
    }
  } catch (err) {
    console.warn('Learning progress load notice:', err);
  }
}

// AI Tutor History Loader from Supabase
async function loadAiTutorHistory(userId) {
  try {
    const { data: logs, error } = await supabase
      .from('ai_tutor_logs')
      .select('*')
      .eq('user_id', userId)
      .order('dibuat_pada', { ascending: true })
      .limit(20);

    if (logs && logs.length > 0) {
      state.aiMessages = logs.map(l => ({
        role: l.role,
        text: l.pesan,
        concept: l.role === 'assistant' ? 'Percakapan sebelumnya' : null
      }));
    }
  } catch (err) {
    console.warn('AI history loader notice:', err);
  }
}

// Google Gemini Socratic AI Tutor Configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';

// Direct Gemini 2.5 Flash Socratic Engine
async function callGeminiTutor(query, contextName, history = []) {
  if (!GEMINI_API_KEY) return null;

  const studentName = getEffectiveUserName();
  const isGuest = !state.session || studentName === 'User';

  // Build conversational context (last 6 turns)
  const previousTurns = (history || [])
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-6)
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

  const contents = [...previousTurns];
  // Ensure the latest user query is present
  const lastItem = contents[contents.length - 1];
  if (!lastItem || lastItem.role !== 'user' || lastItem.parts[0]?.text !== query) {
    contents.push({
      role: 'user',
      parts: [{ text: `Konteks halaman: ${contextName}\nNama pengguna: ${studentName}\nPertanyaan pengguna: ${query}` }]
    });
  }

  const langGuidance = {
    id: 'Berbahasa Indonesia ramah, mendidik, teknis akurat, dan mudah dipahami mahasiswa.',
    en: 'Respond in English with a helpful, educational, and technically accurate tone suitable for networking students.',
    jp: '親切で教育的、かつ技術的に正確で理解しやすい日本語で回答してください。',
    cn: '请使用亲切、具启发性且技术准确的简体中文进行回复，适合计算机网络专业学生理解。'
  }[state.lang] || 'Berbahasa Indonesia ramah, mendidik, teknis akurat, dan mudah dipahami mahasiswa.';

  const payload = {
    systemInstruction: {
      parts: [
        {
          text: `Kamu adalah NetVerse Socratic AI Tutor untuk mahasiswa/siswa Teknik Komputer dan Jaringan (TKJ) di PTI UNESA.
Bimbing mahasiswa memahami konsep jaringan komputer, pengkabelan UTP/STP, crimping kabel, fungsi switch, router, server, dan pengujian LAN tester.

Identitas & Ketentuan Panggilan Pengguna:
- Nama pengguna saat ini: "${studentName}".
- Status akun: ${isGuest ? 'Tamu / Belum Login (Wajib dipanggil "User")' : 'Pengguna Terdaftar'}.
- ATURAN PENTING IDENTITAS:
  1. Jika pengguna belum login (bernama "User"), panggil atau sapa mereka HANYA sebagai "User".
  2. Jika pengguna sudah login, sapa atau panggil mereka dengan nama "${studentName}".
  3. JANGAN SEKALI-KALI memanggil pengguna dengan nama "Naufal" atau nama pembuat web, kecuali jika nama profil pengguna di atas memang secara eksplisit bernama Naufal.

Pedoman Pedagogis:
1. ${langGuidance}
2. Pendekatan Sokratik: Jika mahasiswa menanyakan jawaban kuis atau meminta urutan warna pin crimping kabel UTP (T568A/T568B), JANGAN memberikan bocoran urutan langsung secara mentah. Bimbing mereka melalui pemahaman konsep (seperti pasangan kawat Tx/Rx, alasan pemilinan/twist untuk meredam crosstalk, atau cara membaca lampu LAN tester).
3. Format Output WAJIB berupa JSON yang valid dengan format:
   - "response": Penjelasan tutor yang ramah, mendidik, menyapa pengguna dengan nama yang tepat jika relevan, dan diakhiri dengan pertanyaan reflektif jika tepat.
   - "concept": Topik/konsep inti dalam 2-4 kata.
   - "suggestedInquiries": Array berisi 2 pertanyaan lanjutan singkat yang relevan untuk diklik mahasiswa.`
        }
      ]
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          response: { type: 'STRING' },
          concept: { type: 'STRING' },
          suggestedInquiries: {
            type: 'ARRAY',
            items: { type: 'STRING' }
          }
        },
        required: ['response', 'concept', 'suggestedInquiries']
      },
      thinkingConfig: {
        thinkingBudget: 0
      }
    }
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Gemini API returned status ${res.status}`);
      return null;
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return null;

    const parsed = JSON.parse(rawText);
    return {
      response: parsed.response,
      concept: parsed.concept || 'Tutor Jaringan',
      suggestedInquiries: Array.isArray(parsed.suggestedInquiries) ? parsed.suggestedInquiries : []
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Direct Gemini call notice:', err);
    return null;
  }
}

// Socratic Inquiry Invoker (Gemini 2.5 Flash with Edge Function and Heuristic Fallbacks)
async function sendSocraticQuery(userQuery) {
  if (!userQuery || !userQuery.trim() || state.aiLoading) return;
  const q = userQuery.trim();

  state.aiMessages.push({ role: 'user', text: q });
  state.aiLoading = true;
  state.aiChatOpen = true;
  renderApp();

  const activeContextName = state.activeTab === 'materi'
    ? `${t('nav.materi', state.lang)}: ${getLocalizedModule(state.moduls[state.selectedModulIndex], state.lang)?.judul || 'Networking'}`
    : state.activeTab === 'crimping'
    ? `${t('nav.crimping', state.lang)}: ${state.crimpingStandard}`
    : t('nav.workbench', state.lang);

  let tutorResult = null;

  // 1. Primary: Direct Google Gemini 2.5 Flash API with user-provided key
  try {
    tutorResult = await callGeminiTutor(q, activeContextName, state.aiMessages);
  } catch (geminiErr) {
    console.warn('Gemini tutor primary attempt notice:', geminiErr);
  }

  // 2. Secondary: Supabase Edge Function (socratic-tutor)
  if (!tutorResult) {
    try {
      const { data } = await supabase.functions.invoke('socratic-tutor', {
        body: {
          query: q,
          context: activeContextName,
          user_id: state.session?.user?.id || null,
          user_name: getEffectiveUserName()
        }
      });
      if (data && data.response) {
        tutorResult = {
          response: data.response,
          concept: data.concept || t('ai.defaultConcept', state.lang),
          suggestedInquiries: data.suggestedInquiries || []
        };
      }
    } catch (edgeErr) {
      console.warn('Edge function invoke notice:', edgeErr);
    }
  }

  // 3. Tertiary: Local Socratic Heuristic Fallback (Multilingual)
  if (!tutorResult) {
    const fallbackByLang = {
      id: {
        response: `Kamu bertanya tentang "${q}". Coba kita pikirkan bersama: bagaimana pasangan kawat dan susunan pin pada kabel UTP membantu menjaga kualitas sinyal?`,
        concept: 'Konsep Jaringan',
        suggestedInquiries: [
          'Bagaimana pilinan kawat mengurangi gangguan sinyal?',
          'Apa perbedaan susunan pin T568A dan T568B?'
        ]
      },
      en: {
        response: `You asked about "${q}". Let's reflect together: how do twisted wire pairs and pinout arrangements in UTP cabling maintain signal integrity?`,
        concept: 'Network Engineering',
        suggestedInquiries: [
          'How do wire twists reduce electromagnetic interference?',
          'What is the difference between T568A and T568B pinout standards?'
        ]
      },
      jp: {
        response: `「${q}」についての質問ですね。一緒に考えてみましょう。UTPケーブルのツイストペアとピンアサインは、どのように信号の品質を保っているでしょうか？`,
        concept: 'ネットワーク工学',
        suggestedInquiries: [
          'ツイストペア構造はどのようにノイズを低減しますか？',
          'T568A規格とT568B規格の違いは何ですか？'
        ]
      },
      cn: {
        response: `你提问了关于“${q}”的问题。让我们共同思考：双绞线内部的线对扭绞与引脚排布是如何保障信号传输质量的？`,
        concept: '网络工程概念',
        suggestedInquiries: [
          '双绞线的缠绕是如何抵消电磁干扰的？',
          'T568A 与 T568B 线序标准有何本质区别？'
        ]
      }
    };
    tutorResult = fallbackByLang[state.lang] || fallbackByLang.id;
  }

  // Apply response to UI state
  state.aiMessages.push({
    role: 'assistant',
    text: tutorResult.response,
    concept: tutorResult.concept
  });
  if (tutorResult.suggestedInquiries && tutorResult.suggestedInquiries.length > 0) {
    state.aiDynamicChips = tutorResult.suggestedInquiries;
  }

  // Asynchronously log interaction to Supabase ai_tutor_logs table
  if (supabase) {
    try {
      supabase.from('ai_tutor_logs').insert([
        {
          user_id: state.session?.user?.id || null,
          konteks_halaman: activeContextName,
          role: 'user',
          pesan: q
        },
        {
          user_id: state.session?.user?.id || null,
          konteks_halaman: activeContextName,
          role: 'assistant',
          pesan: tutorResult.response
        }
      ]).then(({ error }) => {
        if (error) console.warn('Supabase ai_tutor_logs logging notice:', error.message);
      });
    } catch (logErr) {
      console.warn('Logging notice:', logErr);
    }
  }

  state.aiLoading = false;
  renderApp();
  const msgList = document.getElementById('ai-message-list');
  if (msgList) msgList.scrollTop = msgList.scrollHeight;
}

// Save XP and Level to Cloud
async function syncProfileXp(earnedAmount) {
  if (!state.session?.user?.id) {
    state.userProfile.total_xp = 0;
    state.userProfile.level = 1;
    return;
  }
  state.userProfile.total_xp += earnedAmount;
  state.userProfile.level = Math.floor(state.userProfile.total_xp / 500) + 1;

  if (state.session?.user?.id) {
    try {
      await supabase
        .from('profiles')
        .update({
          total_xp: state.userProfile.total_xp,
          level: state.userProfile.level,
          diperbarui_pada: new Date().toISOString()
        })
        .eq('id', state.session.user.id);
    } catch (err) {
      console.warn('Failed syncing XP to Supabase:', err);
    }
  }
}

// Helper: Merge scores with user profiles to calculate combined Total XP (Crimping + Materi)
function enrichScoresWithProfiles(scoresList = [], profilesList = []) {
  const profileMap = new Map();
  if (Array.isArray(profilesList)) {
    profilesList.forEach(p => {
      if (p.id) profileMap.set(`uid:${p.id}`, p);
      if (p.nama_lengkap) profileMap.set(`name:${p.nama_lengkap.trim().toLowerCase()}`, p);
    });
  }

  // Pre-calculated curriculum benchmarks for known students
  const mockMateriBenchmarks = {
    'rian pratama': 180,
    'zahra amalia': 160,
    'dimas wahyu': 140,
    'aisyah putri': 120,
    'muhammad naufal farras': 200
  };

  return scoresList
    .filter(s => {
      const rawName = (s.player_name || '').trim().toLowerCase();
      // Strictly exclude any guest / unauthenticated "User" scores
      return rawName && rawName !== 'user';
    })
    .map(s => {
      const rawName = (s.player_name || '').trim().toLowerCase();
      const prof = (s.user_id && profileMap.get(`uid:${s.user_id}`)) || profileMap.get(`name:${rawName}`);
      const crimpingXp = Number(s.xp_didapat || 0);

      let totalXp = crimpingXp;
      let materiXp = 0;

      if (prof) {
        totalXp = Math.max(Number(prof.total_xp || 0), crimpingXp);
        materiXp = Math.max(0, totalXp - crimpingXp);
      } else {
        materiXp = mockMateriBenchmarks[rawName] !== undefined ? mockMateriBenchmarks[rawName] : (s.xp_materi || 0);
        totalXp = crimpingXp + materiXp;
      }

      return {
        ...s,
        total_xp: totalXp,
        crimpingXp: crimpingXp,
        materiXp: materiXp,
        level: prof?.level || Math.floor(totalXp / 500) + 1
      };
    });
}

// Realtime New Score Handler (WebSocket Broadcast)
function handleRealtimeNewScore(newScore) {
  if (!newScore) return;

  const rawName = (newScore.player_name || '').trim().toLowerCase();
  // Strictly ignore unauthenticated or generic 'User' entries
  if (!rawName || rawName === 'user' || !newScore.user_id) return;

  const crimpingXp = Number(newScore.xp_didapat || 0);
  if (state.session?.user?.id && (newScore.user_id === state.session.user.id || rawName === (state.userProfile.nama_lengkap || '').trim().toLowerCase())) {
    const currentMateriXp = Object.values(state.learningProgress || {}).reduce((acc, p) => acc + Number(p.xp_didapat || p.skor_quiz || 0), 0);
    newScore.total_xp = state.userProfile.total_xp;
    newScore.crimpingXp = crimpingXp;
    newScore.materiXp = currentMateriXp;
    newScore.level = state.userProfile.level;
  } else {
    newScore.crimpingXp = crimpingXp;
    newScore.materiXp = newScore.materiXp || 0;
    newScore.total_xp = crimpingXp + newScore.materiXp;
    newScore.level = newScore.level || Math.floor(newScore.total_xp / 500) + 1;
  }

  // Insert or update score in state.scores
  const existingIdx = state.scores.findIndex(s => s.id === newScore.id);
  if (existingIdx !== -1) {
    state.scores[existingIdx] = newScore;
  } else {
    state.scores.push(newScore);
  }

  // Re-sort scores by accuracy desc, time asc
  state.scores.sort((a, b) => {
    const accA = Number(a.akurasi_persen || 0);
    const accB = Number(b.akurasi_persen || 0);
    if (accB !== accA) return accB - accA;
    return Number(a.waktu_detik || 0) - Number(b.waktu_detik || 0);
  });

  // Keep top 100
  state.scores = state.scores.slice(0, 100);

  // Trigger floating real-time toast banner
  const playerName = newScore.player_name || t('leaderboard.participantDefault', state.lang);
  state.realtimeToast = {
    id: Date.now(),
    text: t('toast.completedFormat', state.lang, {
      name: playerName,
      standard: newScore.standar_kabel || 'T568B',
      accuracy: newScore.akurasi_persen,
      time: newScore.waktu_detik
    }),
    timestamp: new Date()
  };

  setTimeout(() => {
    if (state.realtimeToast && Date.now() - state.realtimeToast.id >= 4500) {
      state.realtimeToast = null;
      renderApp();
    }
  }, 5000);

  renderApp();
}

// Realtime Profile Update Handler
function handleRealtimeProfileUpdate(updatedProfile) {
  if (!updatedProfile) return;

  if (state.session?.user?.id && updatedProfile.id === state.session.user.id) {
    state.userProfile = updatedProfile;
    renderApp();
  }
}

// Fetch Latest Scores Manually & Enrich with Profiles Total XP
async function fetchLatestScores() {
  try {
    const { data: latestScores } = await supabase
      .from('skor_minigame')
      .select('*')
      .not('player_name', 'ilike', 'user')
      .order('akurasi_persen', { ascending: false })
      .order('waktu_detik', { ascending: true })
      .limit(100);

    const { data: profileRows } = await supabase
      .from('profiles')
      .select('id, nama_lengkap, username, total_xp, level');

    if (latestScores && latestScores.length > 0) {
      const cleanScores = latestScores.filter(s => {
        const name = (s.player_name || '').trim().toLowerCase();
        return name && name !== 'user';
      });
      state.scores = enrichScoresWithProfiles(cleanScores, profileRows || []);
      renderApp();
    }
  } catch (err) {
    console.warn('Failed manual score refresh:', err);
  }
}

// Setup Supabase Realtime Channels
function setupRealtimeSubscriptions() {
  if (state.realtimeChannel) {
    try {
      state.realtimeChannel.unsubscribe();
    } catch (e) {
      // ignore
    }
  }

  const channel = supabase
    .channel('netverse-gamification')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'skor_minigame' },
      (payload) => {
        handleRealtimeNewScore(payload.new);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'profiles' },
      (payload) => {
        handleRealtimeProfileUpdate(payload.new);
      }
    )
    .subscribe((status) => {
      state.realtimeStatus = status;
      renderApp();
    });

  state.realtimeChannel = channel;
}

// Initialize Data from Supabase
async function initData() {
  try {
    // 1. Check Auth Session
    const { data: { session } } = await supabase.auth.getSession();
    state.session = session;
    if (session?.user) {
      await loadUserProfile(session.user.id);
      await loadLearningProgress(session.user.id);
      await loadAiTutorHistory(session.user.id);
    }

    // Auth state change listener
    supabase.auth.onAuthStateChange(async (event, newSession) => {
      state.session = newSession;
      if (newSession?.user) {
        await loadUserProfile(newSession.user.id);
        await loadLearningProgress(newSession.user.id);
        await loadAiTutorHistory(newSession.user.id);
        if (state.aiMessages.length === 1 && state.aiMessages[0].role === 'assistant') {
          state.aiMessages[0].text = t('ai.greeting', state.lang, { name: getEffectiveUserName() });
        }
      } else {
        state.userProfile = {
          id: null,
          nama_lengkap: 'User',
          username: 'user',
          level: 1,
          total_xp: 0,
          role: 'tamu'
        };
        state.learningProgress = {};
        state.quizAnswers = {};
        state.quizSubmitted = {};
        if (state.aiMessages.length === 1 && state.aiMessages[0].role === 'assistant') {
          state.aiMessages[0].text = t('ai.greeting', state.lang, { name: 'User' });
        }
      }
      renderApp();
    });

    // 2. Fetch Modul
    const { data: moduls } = await supabase
      .from('modul')
      .select('*')
      .order('urutan', { ascending: true });
    if (moduls && moduls.length > 0) state.moduls = moduls;

    // 3. Fetch 3D Perangkat
    const { data: devices } = await supabase
      .from('perangkat_3d')
      .select('*')
      .order('urutan', { ascending: true });
    if (devices && devices.length > 0) {
      state.devices = devices.filter(d => d.kode !== 'patch-panel' && !d.nama?.toLowerCase().includes('patch panel'));
    }

    // 4. Fetch Scores & Profiles
    const { data: scores } = await supabase
      .from('skor_minigame')
      .select('*')
      .not('player_name', 'ilike', 'user')
      .order('akurasi_persen', { ascending: false })
      .order('waktu_detik', { ascending: true })
      .limit(100);

    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, nama_lengkap, username, total_xp, level');

    if (scores && scores.length > 0) {
      const cleanScores = scores.filter(s => {
        const name = (s.player_name || '').trim().toLowerCase();
        return name && name !== 'user';
      });
      state.scores = enrichScoresWithProfiles(cleanScores, profiles || []);
    }

    // 5. Connect Realtime Channels
    setupRealtimeSubscriptions();

  } catch (err) {
    console.warn('Supabase initial fetch notice:', err);
  }

  // Fallbacks if database is still fresh
  if (!state.devices || state.devices.length === 0) {
    state.devices = [
      {
        kode: 'switch-manageable',
        nama: 'Switch 24 port',
        kategori: 'perangkat_jaringan',
        model_path: '/assets/models/switch.glb',
        embed_url: 'https://sketchfab.com/models/f9edd56da80b4c18b875c15a432fa7d2/embed',
        deskripsi: 'Switch 24 port untuk menghubungkan perangkat dan mengatur jaringan lokal dengan VLAN.',
        spesifikasi: { port: '24 port Gigabit RJ-45 + 2 port SFP', throughput: '48 Gbps', tipe: 'Layer 2 · dapat dikelola' },
        hotspots: [
          { name: 'Port RJ-45 1–24', position: '0 0.05 0.3', deskripsi: 'Hubungkan komputer dan perangkat jaringan lain ke port ini.' },
          { name: 'Port console', position: '-0.3 0.05 0.3', deskripsi: 'Gunakan port ini untuk mengatur switch secara langsung.' }
        ]
      },
      {
        kode: 'router-wifi',
        nama: 'Router Wi-Fi TP-Link Archer AX23',
        kategori: 'perangkat_jaringan',
        model_path: '/assets/models/router.glb',
        embed_url: 'https://sketchfab.com/models/41ff5f5fe0774f43a5896e33ecbe7ad0/embed',
        deskripsi: 'Router Wi-Fi 6 dengan dua pita frekuensi, empat antena, satu port WAN Gigabit, dan empat port LAN Gigabit.',
        spesifikasi: { standar: 'Wi-Fi 6 (802.11ax)', kecepatan: 'Hingga 1,8 Gbps · dua pita', port: '1 WAN + 4 LAN Gigabit', antena: '4 antena berdaya tinggi' },
        hotspots: [
          { name: 'Port WAN Gigabit (biru)', position: '0 0.1 0.2', deskripsi: 'Hubungkan router ke modem atau sumber internet lewat port ini.' },
          { name: 'Port LAN 1–4 (kuning)', position: '0.15 0.1 0.2', deskripsi: 'Hubungkan komputer dan perangkat lain ke jaringan lokal.' }
        ]
      },
      {
        kode: 'crimping-tool',
        nama: 'Tang Crimping RJ-45/RJ-11',
        kategori: 'alat_kerja',
        model_path: '/models/crimping_tool.glb',
        deskripsi: 'Tang untuk memotong dan mengupas kabel, lalu memasang konektor RJ-45 atau RJ-11.',
        spesifikasi: { fungsi: 'Potong, kupas, dan pres', kompatibilitas: 'RJ-45 (8P8C), RJ-11 (6P4C)', bahan: 'Baja karbon' },
        hotspots: [
          { name: 'Mata pres 8P8C', position: '0 0.1 0.1', deskripsi: 'Bagian ini menekan kontak konektor ke kawat tembaga.' }
        ]
      },
      {
        kode: 'konektor-rj45',
        nama: 'Kabel UTP dan konektor RJ-45',
        kategori: 'media_transmisi',
        model_path: '/assets/models/rj45.glb',
        embed_url: 'https://sketchfab.com/models/325672cf996e472abaed009b5ca21cfc/embed',
        deskripsi: 'Kabel UTP Cat 6 dengan konektor RJ-45 (8P8C) dan pelindung di pangkal konektornya.',
        spesifikasi: { tipe: 'UTP Cat 6', konektor: 'RJ-45 (8P8C)', frekuensi: 'Hingga 250 MHz', standar: 'TIA/EIA-568-B' },
        hotspots: [
          { name: 'Konektor 8P8C', position: '0 0.02 0.05', deskripsi: 'Delapan kontak logam menghubungkan kawat di dalam kabel ke port jaringan.' }
        ]
      },
      {
        kode: 'server-rack',
        nama: 'Rak server',
        kategori: 'perangkat_jaringan',
        model_path: '/assets/models/rack.glb',
        embed_url: 'https://sketchfab.com/models/62f6779cb7e448b19aaf58544c3c7218/embed',
        deskripsi: 'Rak 19 inci untuk memasang server, switch, dan merapikan kabel jaringan.',
        spesifikasi: { standar: 'EIA-310 · 19 inci', ventilasi: 'Pintu berjaring', penggunaan: 'Ruang server dan lab jaringan' },
        hotspots: [
          { name: 'Rel rak 19 inci', position: '0 0.5 0.2', deskripsi: 'Pasang server dan switch pada rel ini. Satu unit rak (1U) tingginya 1,75 inci.' }
        ]
      }
    ];
  }

  if (!state.devices.some(device => device.kode === 'lan-tester')) {
    state.devices.push({
      kode: 'lan-tester',
      nama: 'LAN tester',
      kategori: 'alat_kerja',
      model_path: '/models/lan-tester.glb',
      deskripsi: 'Alat untuk memeriksa sambungan dan urutan pin pada kabel LAN.',
      spesifikasi: {
        fungsi: 'Memeriksa sambungan kabel',
        indikator: '8 lampu LED',
        konektor: 'RJ-45 (8P8C)',
        tipe: 'Unit utama dan remote'
      },
      hotspots: [
        { name: 'Lampu indikator', position: '-0.64 0.25 0.16', deskripsi: 'Delapan lampu menunjukkan sambungan pada tiap pin saat kabel diuji.' },
        { name: 'Port RJ-45', position: '-0.64 -0.53 0.18', deskripsi: 'Sambungkan salah satu ujung kabel LAN ke port ini.' },
        { name: 'Unit remote', position: '0.66 0.08 0.12', deskripsi: 'Pasang unit ini di ujung kabel yang lain untuk memeriksa sambungan dari kedua sisi.' }
      ]
    });
  }

  state.devices = state.devices.map(device => device.kode === 'lan-tester'
    ? {
        ...device,
        embed_url: 'https://sketchfab.com/models/ef781928446f42acb5aaa15d1b9d63d8/embed',
        source_url: 'https://sketchfab.com/3d-models/network-cable-tester-devices-ef781928446f42acb5aaa15d1b9d63d8',
        source_author: 'SenjakUR',
        downloadable: false
      }
    : device
  );

  // Exclude non-curriculum models (Patch Panel 2x26 Way Rackmount)
  state.devices = state.devices.filter(d => d.kode !== 'patch-panel' && !d.nama?.toLowerCase().includes('patch panel'));
  if (state.activeDeviceIndex >= state.devices.length) {
    state.activeDeviceIndex = 0;
  }

  if (!state.moduls || state.moduls.length === 0) {
    state.moduls = [
      { id: '1', slug: 'jaringan-dasar-topologi', judul: 'Dasar jaringan dan topologi', estimasi_menit: 10, xp_reward: 100, deskripsi: 'Pelajari peran host dan bentuk topologi star, bus, serta mesh.' },
      { id: '2', slug: 'media-transmisi-utp', judul: 'Kabel UTP dan urutan warnanya', estimasi_menit: 15, xp_reward: 100, deskripsi: 'Kenali susunan kawat dalam kabel UTP dan urutan warna T568A serta T568B.' },
      { id: '3', slug: 'perangkat-keras-jaringan', judul: 'Mengenal router dan switch', estimasi_menit: 15, xp_reward: 100, deskripsi: 'Pelajari perbedaan fungsi switch Layer 2 dan router Layer 3.' }
    ];
  }

  renderApp();
}

// Main Render Function
function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const activeContextName = state.activeTab === 'materi'
    ? `${t('nav.materi', state.lang)}: ${getLocalizedModule(state.moduls[state.selectedModulIndex], state.lang)?.judul || 'Networking'}`
    : state.activeTab === 'crimping'
    ? `${t('nav.crimping', state.lang)}: ${state.crimpingStandard}`
    : t('nav.workbench', state.lang);

  let mainContent = '';
  switch (state.activeTab) {
    case 'workbench':
      mainContent = renderDashboard(state.moduls, state.devices, state.activeDeviceIndex, state.selectedHotspot, state.learningProgress, state.lang);
      break;

    case 'crimping':
      mainContent = renderCrimpingMaster(state);
      break;

    case 'materi': {
      const currentModul = state.moduls[state.selectedModulIndex];
      const curModulId = currentModul?.id || 'default';
      mainContent = renderMateriViewer(
        state.moduls,
        state.selectedModulIndex,
        state.learningProgress,
        state.quizAnswers,
        state.quizSubmitted[curModulId] || false,
        state.quizMode,
        state.lang,
        state.materiFormat,
        state.activeVideoId,
        !!state.session
      );
      break;
    }

    case 'leaderboard': {
      const currentMateriXp = Object.values(state.learningProgress || {}).reduce((acc, p) => acc + Number(p.xp_didapat || p.skor_quiz || 0), 0);
      const currentTotalXp = Number(state.userProfile?.total_xp || 0);
      const currentCrimpingXp = Math.max(0, currentTotalXp - currentMateriXp);
      const enrichedUserProfile = {
        ...state.userProfile,
        total_xp: currentTotalXp,
        crimpingXp: currentCrimpingXp,
        materiXp: currentMateriXp
      };
      mainContent = renderLeaderboard(state.scores, enrichedUserProfile, state.leaderboardFilter, state.realtimeStatus, state.lang);
      break;
    }
  }

  app.innerHTML = `
    <div class="min-h-screen text-slate-100 flex flex-col font-sans">
      ${renderNavbar(state.activeTab, navigate, state.userProfile, state.session, state.theme, state.lang)}

      ${state.realtimeToast ? `
        <div class="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-2">
          <div id="realtime-toast-banner" class="ml-auto max-w-sm p-4 rounded-xl bg-black/95 border border-amber-400/50 shadow-[0_16px_40px_rgba(245,158,11,0.18)] text-xs text-white flex items-start gap-3 animate-fadeIn" role="status" aria-live="polite">
            <div class="w-2.5 h-2.5 rounded-sm bg-amber-400 mt-1 shrink-0 animate-pulse"></div>
            <div class="flex-1 min-w-0">
              <div class="font-bold text-amber-400 text-[10px] tracking-wider uppercase mb-0.5 flex items-center gap-1.5">
                <span>${t('toast.latestActivity', state.lang)}</span>
                <span class="text-slate-500">•</span>
                <span class="text-slate-400 font-mono text-[9px]">${t('toast.live', state.lang)}</span>
              </div>
              <p class="leading-relaxed text-slate-100 font-medium">${state.realtimeToast.text}</p>
            </div>
            <button id="btn-close-toast" type="button" class="min-h-11 min-w-11 -mr-2 -mt-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center" aria-label="${t('toast.close', state.lang)}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      ` : ''}
      
      <main class="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        ${mainContent}
      </main>

      <footer class="border-t border-white/[0.06] py-12 text-xs text-slate-400">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
          <div class="flex items-center space-x-2.5">
            ${renderNetVerseLogo({ size: 24, className: 'w-6 h-6 rounded-md shadow-sm' })}
            <span class="font-semibold text-white">NetVerse</span>
            <span class="text-slate-400">•</span>
            <span>${t('footer.dept', state.lang)}</span>
          </div>
          <div class="text-slate-400">
            ${t('footer.desc', state.lang)}
          </div>
        </div>
      </footer>

      ${renderFloatingAiTutor(state.aiChatOpen, state.aiMessages, activeContextName, state.aiLoading, state.aiDynamicChips, state.lang)}
      ${renderAuthModal(state)}

    </div>
  `;

  attachEvents();
}

// Navigation Handler
function navigate(tab) {
  state.quizMode = false;
  state.activeTab = tab;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Timer Functions for Crimping
function startCrimpingTimer() {
  if (state.crimpingTimerRunning) return;
  state.crimpingTimerRunning = true;
  state.crimpingElapsedSeconds = 0;
  clearInterval(state.crimpingTimerId);
  state.crimpingTimerId = setInterval(() => {
    state.crimpingElapsedSeconds += 0.1;
    const timerEl = document.querySelector('#crimping-timer-display');
    if (timerEl) timerEl.textContent = `${state.crimpingElapsedSeconds.toFixed(1)} ${t('crimping.secondUnit', state.lang)}`;
  }, 100);
}

function stopCrimpingTimer() {
  state.crimpingTimerRunning = false;
  clearInterval(state.crimpingTimerId);
}

function setCrimpingStandard(standard) {
  if (state.crimpingStandard === standard) return;
  state.crimpingStandard = standard;
  state.crimpingResult = null;
  renderApp();
}

// Verify Crimping
async function verifyCrimping() {
  if (!state.session) {
    state.authModalOpen = true;
    state.authMode = 'login';
    state.authNotice = {
      type: 'warning',
      message: t('authModal.loginRequiredCrimping', state.lang)
    };
    renderApp();
    return;
  }
  stopCrimpingTimer();
  const target = STANDARDS[state.crimpingStandard];
  const user = state.crimpingSlots;

  let correctCount = 0;
  const wrongPins = [];

  for (let i = 0; i < 8; i++) {
    if (user[i] && user[i] === target[i]) {
      correctCount++;
    } else {
      wrongPins.push(i);
    }
  }

  const accuracy = (correctCount / 8) * 100;
  const isPerfect = correctCount === 8;

  let earnedXp = 0;
  if (isPerfect) {
    earnedXp = 150;
  } else if (accuracy >= 75) {
    earnedXp = 75;
  } else {
    earnedXp = 25;
  }

  // Update profile XP (local + Supabase)
  await syncProfileXp(earnedXp);

  state.crimpingResult = {
    success: isPerfect,
    accuracy: accuracy,
    wrongPins: wrongPins,
    earnedXp: earnedXp,
    message: isPerfect 
      ? `Hebat, semua pin tersusun dengan benar! (+${earnedXp} XP)` 
      : `${correctCount} dari 8 pin sudah tepat (${accuracy.toFixed(1)}%). Periksa lagi pin yang ditandai merah.`
  };

  // Record to Supabase (strictly authenticated users only)
  try {
    const elapsedRounded = Math.max(1, Math.round(state.crimpingElapsedSeconds));
    const playerName = getEffectiveUserName();
    const userId = state.session?.user?.id;

    if (!userId || playerName.trim().toLowerCase() === 'user') {
      renderApp();
      return;
    }

    // Check if user already has a record for this cable standard
    const checkQuery = supabase
      .from('skor_minigame')
      .select('id, akurasi_persen, waktu_detik, xp_didapat')
      .eq('standar_kabel', state.crimpingStandard)
      .eq('user_id', userId);

    const { data: existingRows } = await checkQuery.limit(1);
    const existing = existingRows && existingRows[0];

    if (existing) {
      const prevAcc = Number(existing.akurasi_persen || 0);
      const prevTime = Number(existing.waktu_detik || 999);
      const isImprovement = (accuracy > prevAcc) || (accuracy === prevAcc && elapsedRounded < prevTime);

      if (isImprovement) {
        await supabase
          .from('skor_minigame')
          .update({
            waktu_detik: elapsedRounded,
            akurasi_persen: accuracy,
            xp_didapat: Math.max(existing.xp_didapat || 0, earnedXp),
            selesai_pada: new Date().toISOString()
          })
          .eq('id', existing.id);
      }
    } else {
      await supabase.from('skor_minigame').insert({
        user_id: userId,
        player_name: playerName,
        standar_kabel: state.crimpingStandard,
        waktu_detik: elapsedRounded,
        akurasi_persen: accuracy,
        xp_didapat: earnedXp
      });
    }

    await fetchLatestScores();
  } catch (e) {
    console.warn('Recorded score locally:', e);
  }

  renderApp();
}

// Event Listeners
function attachEvents() {
  // Navigation
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget.getAttribute('data-nav');
      const moduleIndex = e.currentTarget.getAttribute('data-select-modul');
      if (moduleIndex !== null) {
        const parsedIndex = Number.parseInt(moduleIndex, 10);
        if (Number.isInteger(parsedIndex) && state.moduls[parsedIndex]) {
          state.selectedModulIndex = parsedIndex;
        }
      }
      const deviceCode = e.currentTarget.getAttribute('data-device-code');
      if (deviceCode && state.devices) {
        const dIdx = state.devices.findIndex(d => d.kode === deviceCode);
        if (dIdx !== -1) {
          state.activeDeviceIndex = dIdx;
          state.selectedHotspot = null;
        }
      }
      if (target) navigate(target);
    });
  });

  // Theme Dropdown Toggle (Desktop)
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const themeDropdownMenu = document.getElementById('theme-dropdown-menu');

  if (themeToggleBtn && themeDropdownMenu) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // If language dropdown is open, close it
      const langDropdown = document.getElementById('lang-dropdown-menu');
      const langBtn = document.getElementById('btn-lang-toggle');
      if (langDropdown && !langDropdown.classList.contains('hidden')) {
        langDropdown.classList.add('hidden');
        if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
      }

      const isHidden = themeDropdownMenu.classList.contains('hidden');
      themeDropdownMenu.classList.toggle('hidden');
      themeToggleBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });
  }

  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  // Segmented Theme buttons (Desktop dropdown items & mobile buttons)
  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeVal = btn.getAttribute('data-set-theme');
      if (themeVal) {
        setTheme(themeVal);
      }
    });
  });

  // Language Dropdown Toggle (Desktop)
  const langToggleBtn = document.getElementById('btn-lang-toggle');
  const langDropdownMenu = document.getElementById('lang-dropdown-menu');

  if (langToggleBtn && langDropdownMenu) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // If theme dropdown is open, close it
      if (themeDropdownMenu && !themeDropdownMenu.classList.contains('hidden')) {
        themeDropdownMenu.classList.add('hidden');
        if (themeToggleBtn) themeToggleBtn.setAttribute('aria-expanded', 'false');
      }

      const isHidden = langDropdownMenu.classList.contains('hidden');
      langDropdownMenu.classList.toggle('hidden');
      langToggleBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });
  }

  // Language selectors (Desktop dropdown items & mobile buttons)
  document.querySelectorAll('[data-select-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedLang = btn.getAttribute('data-select-lang');
      if (selectedLang) {
        setLanguage(selectedLang);
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (langDropdownMenu && !langDropdownMenu.classList.contains('hidden')) {
      if (!langDropdownMenu.contains(e.target) && !langToggleBtn?.contains(e.target)) {
        langDropdownMenu.classList.add('hidden');
        if (langToggleBtn) langToggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
    if (themeDropdownMenu && !themeDropdownMenu.classList.contains('hidden')) {
      if (!themeDropdownMenu.contains(e.target) && !themeToggleBtn?.contains(e.target)) {
        themeDropdownMenu.classList.add('hidden');
        if (themeToggleBtn) themeToggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Auth Modal Triggers
  const openAuthBtn = document.getElementById('btn-open-auth-modal');
  if (openAuthBtn) {
    openAuthBtn.addEventListener('click', () => {
      state.authNotice = null;
      if (state.session) {
        state.authMode = 'profile';
      } else {
        state.authMode = 'login';
      }
      state.authModalOpen = true;
      renderApp();
    });
  }

  const mobileAuthBtn = document.getElementById('mobile-auth-trigger');
  if (mobileAuthBtn) {
    mobileAuthBtn.addEventListener('click', () => {
      state.authNotice = null;
      state.authMode = state.session ? 'profile' : 'login';
      state.authModalOpen = true;
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) mobileMenu.classList.add('hidden');
      renderApp();
    });
  }

  const closeAuthBtn = document.getElementById('btn-close-auth-modal');
  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', () => {
      state.authModalOpen = false;
      renderApp();
    });
  }

  const authBackdrop = document.getElementById('auth-modal-backdrop');
  if (authBackdrop) {
    authBackdrop.addEventListener('click', (e) => {
      if (e.target === authBackdrop) {
        state.authModalOpen = false;
        renderApp();
      }
    });
  }

  const continueGuestBtn = document.getElementById('btn-continue-guest');
  if (continueGuestBtn) {
    continueGuestBtn.addEventListener('click', () => {
      state.authModalOpen = false;
      renderApp();
    });
  }

  // Switch Auth Tabs (Login / Register)
  const tabLogin = document.getElementById('tab-auth-login');
  if (tabLogin) {
    tabLogin.addEventListener('click', () => {
      state.authMode = 'login';
      state.authNotice = null;
      state.showPassword = false;
      renderApp();
    });
  }

  const tabRegister = document.getElementById('tab-auth-register');
  if (tabRegister) {
    tabRegister.addEventListener('click', () => {
      state.authMode = 'register';
      state.authNotice = null;
      state.showPassword = false;
      renderApp();
    });
  }

  // Toggle password visibility (show/hide password)
  const togglePasswordBtn = document.getElementById('btn-toggle-password');
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
      const passwordInput = document.getElementById('auth-password');
      if (!passwordInput) return;
      state.showPassword = !state.showPassword;
      const isVisible = state.showPassword;
      passwordInput.type = isVisible ? 'text' : 'password';
      togglePasswordBtn.setAttribute('aria-label', isVisible ? 'Sembunyikan kata sandi' : 'Lihat kata sandi');
      togglePasswordBtn.setAttribute('title', isVisible ? 'Sembunyikan kata sandi' : 'Lihat kata sandi');
      togglePasswordBtn.innerHTML = isVisible
        ? `<svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>`
        : `<svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`;
    });
  }

  // Auth Form Submit (Login or Register)
  const authForm = document.getElementById('form-auth');
  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('auth-email');
      const passwordInput = document.getElementById('auth-password');
      if (!emailInput || !passwordInput) return;

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      state.authLoading = true;
      state.authNotice = null;
      renderApp();

      if (state.authMode === 'register') {
        const nameInput = document.getElementById('auth-nama-lengkap');
        const userInput = document.getElementById('auth-username');
        const namaLengkap = nameInput ? nameInput.value.trim() : '';
        const username = userInput ? userInput.value.trim() : '';

        const formatAuthErr = (msg) => {
          if (!msg) return t('authModal.genericRegisterError', state.lang);
          const lower = msg.toLowerCase();
          if (lower.includes('invalid login credentials')) return t('authModal.invalidCredentials', state.lang);
          if (lower.includes('email not confirmed')) return t('authModal.emailNotConfirmed', state.lang);
          if (lower.includes('already registered')) return t('authModal.alreadyRegistered', state.lang);
          if (lower.includes('at least 6 characters')) return t('authModal.passwordTooShort', state.lang);
          return t('authModal.genericRegisterError', state.lang);
        };

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: namaLengkap,
                name: namaLengkap,
                username: username
              }
            }
          });

          if (error) {
            state.authNotice = { type: 'error', message: formatAuthErr(error.message) };
          } else {
            // Self-healing confirmation & auto-login
            try {
              await supabase.rpc('confirm_user_by_email', { user_email: email });
            } catch (e) {
              // ignore
            }

            if (data.session) {
              state.session = data.session;
              await loadUserProfile(data.session.user.id);
              state.authMode = 'profile';
              state.authNotice = { type: 'success', message: t('authModal.accountCreatedLogin', state.lang) };
            } else {
              // Automatically sign in with credentials
              const loginRes = await supabase.auth.signInWithPassword({ email, password });
              if (loginRes.data?.session) {
                state.session = loginRes.data.session;
                await loadUserProfile(loginRes.data.session.user.id);
                state.authMode = 'profile';
                state.authNotice = { type: 'success', message: t('authModal.accountCreatedLogin', state.lang) };
              } else {
                state.authNotice = { 
                  type: 'success', 
                  message: t('authModal.accountCreatedSignIn', state.lang) 
                };
                state.authMode = 'login';
              }
            }
          }
        } catch (err) {
          state.authNotice = { type: 'error', message: formatAuthErr(err.message) };
        }
      } else {
        // Login mode error formatter
        const formatAuthErr = (msg) => {
          if (!msg) return t('authModal.genericLoginError', state.lang);
          const lower = msg.toLowerCase();
          if (
            lower.includes('invalid login credentials') ||
            lower.includes('invalid_credentials') ||
            lower.includes('invalid_grant') ||
            lower.includes('invalid credentials') ||
            lower.includes('user not found') ||
            lower.includes('wrong password') ||
            lower.includes('invalid email')
          ) {
            return t('authModal.invalidCredentials', state.lang);
          }
          if (lower.includes('email not confirmed')) {
            return t('authModal.emailNotConfirmed', state.lang);
          }
          return t('authModal.invalidCredentials', state.lang);
        };

        try {
          let { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          // Self-healing if email was unconfirmed
          if (error && error.message?.toLowerCase().includes('email not confirmed')) {
            try {
              await supabase.rpc('confirm_user_by_email', { user_email: email });
              const retry = await supabase.auth.signInWithPassword({ email, password });
              data = retry.data;
              error = retry.error;
            } catch (healErr) {
              console.warn('Auto-confirm attempt notice:', healErr);
            }
          }

          if (error) {
            state.authNotice = { type: 'error', message: formatAuthErr(error.message) };
          } else if (data?.session) {
            state.session = data.session;
            await loadUserProfile(data.session.user.id);
            state.authModalOpen = false;
            state.authNotice = null;
          }
        } catch (err) {
          state.authNotice = { type: 'error', message: formatAuthErr(err.message) };
        }
      }

      state.authLoading = false;
      renderApp();
    });
  }

  // Profile Update Form Submit
  const profileForm = document.getElementById('form-update-profile');
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('profile-nama-lengkap');
      const userInput = document.getElementById('profile-username');
      if (!nameInput || !userInput) return;

      const namaLengkap = nameInput.value.trim();
      const username = userInput.value.trim();

      state.authLoading = true;
      state.authNotice = null;
      renderApp();

      try {
        if (state.session?.user?.id) {
          const { error } = await supabase
            .from('profiles')
            .update({
              nama_lengkap: namaLengkap,
              username: username,
              diperbarui_pada: new Date().toISOString()
            })
            .eq('id', state.session.user.id);

          if (error) {
            state.authNotice = { type: 'error', message: t('authModal.profileUpdateErr', state.lang) };
          } else {
            state.userProfile.nama_lengkap = namaLengkap;
            state.userProfile.username = username;
            if (state.aiMessages.length === 1 && state.aiMessages[0].role === 'assistant') {
              state.aiMessages[0].text = t('ai.greeting', state.lang, { name: namaLengkap });
            }
            state.authNotice = { type: 'success', message: t('authModal.profileUpdated', state.lang) };
          }
        }
      } catch (err) {
        state.authNotice = { type: 'error', message: t('authModal.profileUpdateErr', state.lang) };
      }

      state.authLoading = false;
      renderApp();
    });
  }

  // Sign Out Button
  const signoutBtn = document.getElementById('btn-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      try {
        await supabase.auth.signOut();
        state.session = null;
        state.authModalOpen = false;
        state.userProfile = {
          id: null,
          nama_lengkap: 'User',
          username: 'user',
          level: 1,
          total_xp: 0,
          role: 'tamu'
        };
        state.learningProgress = {};
        state.quizAnswers = {};
        state.quizSubmitted = {};
        if (state.aiMessages.length === 1 && state.aiMessages[0].role === 'assistant') {
          state.aiMessages[0].text = t('ai.greeting', state.lang, { name: 'User' });
        }
      } catch (err) {
        console.warn('Signout error:', err);
      }
      renderApp();
    });
  }

  // Device selection in 3D Lab
  document.querySelectorAll('select[data-select-device]').forEach(select => {
    select.addEventListener('change', (e) => {
      const idx = Number.parseInt(e.currentTarget.value, 10);
      if (!Number.isInteger(idx) || !state.devices[idx]) return;
      state.activeDeviceIndex = idx;
      state.selectedHotspot = null;
      renderApp();
    });
  });

  // Hotspot clicks in 3D Lab
  document.querySelectorAll('[data-hotspot-idx]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-hotspot-idx'), 10);
      state.selectedHotspot = idx;
      renderApp();
    });
  });

  // 3D Camera Controls
  const mv = document.getElementById('tkj-model-viewer');
  if (mv) {
    const camReset = document.getElementById('cam-reset');
    if (camReset) camReset.addEventListener('click', () => { mv.cameraOrbit = '40deg 75deg 105%'; });
  }

  // Crimping Standard Toggles
  const btnB = document.getElementById('set-t568b');
  if (btnB) {
    btnB.addEventListener('click', () => {
      setCrimpingStandard('T568B');
    });
  }

  const btnA = document.getElementById('set-t568a');
  if (btnA) {
    btnA.addEventListener('click', () => {
      setCrimpingStandard('T568A');
    });
  }

  // HTML5 Drag and Drop - Available Wires Palette
  document.querySelectorAll('[data-drag-wire]').forEach(el => {
    el.addEventListener('dragstart', (e) => {
      const wireId = el.getAttribute('data-drag-wire');
      e.dataTransfer.setData('application/json', JSON.stringify({ type: 'palette', wireId }));
      e.dataTransfer.effectAllowed = 'move';
      el.classList.add('opacity-40', 'scale-95');
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('opacity-40', 'scale-95');
    });
  });

  // HTML5 Drag and Drop - Placed Wire Slots
  document.querySelectorAll('[data-slot-drag]').forEach(el => {
    el.addEventListener('dragstart', (e) => {
      const fromSlot = parseInt(el.getAttribute('data-slot-drag'), 10);
      e.dataTransfer.setData('application/json', JSON.stringify({ type: 'slot', fromSlot }));
      e.dataTransfer.effectAllowed = 'move';
      el.classList.add('opacity-40');
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('opacity-40');
    });
  });

  // HTML5 Dropzones (8 Pin Slots)
  document.querySelectorAll('.wire-dropzone').forEach(zone => {
    const slotIdx = parseInt(zone.getAttribute('data-drop-slot'), 10);

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });

    zone.addEventListener('dragenter', (e) => {
      e.preventDefault();
      zone.classList.add('border-amber-400', 'bg-amber-400/20', 'scale-[1.03]');
    });

    zone.addEventListener('dragleave', (e) => {
      if (!zone.contains(e.relatedTarget)) {
        zone.classList.remove('border-amber-400', 'bg-amber-400/20', 'scale-[1.03]');
      }
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('border-amber-400', 'bg-amber-400/20', 'scale-[1.03]');
      
      const rawData = e.dataTransfer.getData('application/json');
      if (!rawData) return;

      if (!state.session) {
        state.authModalOpen = true;
        state.authMode = 'login';
        state.authNotice = {
          type: 'warning',
          message: t('authModal.loginRequiredCrimping', state.lang)
        };
        renderApp();
        return;
      }

      try {
        const payload = JSON.parse(rawData);
        if (payload.type === 'palette') {
          state.crimpingSlots[slotIdx] = payload.wireId;
          if (!state.crimpingTimerRunning) startCrimpingTimer();
          state.crimpingResult = null;
          renderApp();
        } else if (payload.type === 'slot') {
          const fromSlot = payload.fromSlot;
          if (fromSlot !== slotIdx) {
            const temp = state.crimpingSlots[slotIdx];
            state.crimpingSlots[slotIdx] = state.crimpingSlots[fromSlot];
            state.crimpingSlots[fromSlot] = temp;
            if (!state.crimpingTimerRunning) startCrimpingTimer();
            state.crimpingResult = null;
            renderApp();
          }
        }
      } catch (err) {
        console.warn('Drop error:', err);
      }
    });
  });

  // Wire picking (Click-to-place fallback / mobile friendly)
  document.querySelectorAll('[data-pick-wire]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!state.session) {
        state.authModalOpen = true;
        state.authMode = 'login';
        state.authNotice = {
          type: 'warning',
          message: t('authModal.loginRequiredCrimping', state.lang)
        };
        renderApp();
        return;
      }
      const wireId = e.currentTarget.getAttribute('data-pick-wire');
      const firstEmptyIndex = state.crimpingSlots.findIndex(s => s === null);
      if (firstEmptyIndex !== -1) {
        state.crimpingSlots[firstEmptyIndex] = wireId;
        if (!state.crimpingTimerRunning) startCrimpingTimer();
        state.crimpingResult = null;
        renderApp();
      }
    });
  });

  // Wire removal from slot
  document.querySelectorAll('[data-remove-pin]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!state.session) {
        state.authModalOpen = true;
        state.authMode = 'login';
        state.authNotice = {
          type: 'warning',
          message: t('authModal.loginRequiredCrimping', state.lang)
        };
        renderApp();
        return;
      }
      const idx = parseInt(e.currentTarget.getAttribute('data-remove-pin'), 10);
      state.crimpingSlots[idx] = null;
      state.crimpingResult = null;
      renderApp();
    });
  });

  // Reset Crimping
  const btnReset = document.getElementById('btn-reset-crimping');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (!state.session) {
        state.authModalOpen = true;
        state.authMode = 'login';
        state.authNotice = {
          type: 'warning',
          message: t('authModal.loginRequiredCrimping', state.lang)
        };
        renderApp();
        return;
      }
      stopCrimpingTimer();
      state.crimpingSlots = [null, null, null, null, null, null, null, null];
      state.crimpingElapsedSeconds = 0;
      state.crimpingResult = null;
      renderApp();
    });
  }

  // Guest unlock crimping button
  const guestUnlockCrimping = document.getElementById('btn-guest-unlock-crimping');
  if (guestUnlockCrimping) {
    guestUnlockCrimping.addEventListener('click', () => {
      state.authModalOpen = true;
      state.authMode = 'login';
      state.authNotice = {
        type: 'warning',
        message: t('authModal.loginRequiredCrimping', state.lang)
      };
      renderApp();
    });
  }

  // Verify Crimping
  const btnVerify = document.getElementById('btn-verify-crimping');
  if (btnVerify) {
    btnVerify.addEventListener('click', verifyCrimping);
  }

  // Module reading selection
  document.querySelectorAll('[data-select-modul]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.currentTarget.hasAttribute('data-nav')) return;
      const idx = parseInt(e.currentTarget.getAttribute('data-select-modul'), 10);
      state.selectedModulIndex = idx;
      state.quizMode = false;
      if (idx === 1) {
        state.activeVideoId = 'TrqZDU7Ywf4';
      } else if (idx === 2) {
        state.activeVideoId = 'WKrRWSCXo38';
      }
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Learning Format Toggle (Teori vs Video YouTube)
  document.querySelectorAll('[data-materi-format]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const format = e.currentTarget.getAttribute('data-materi-format');
      const videoId = e.currentTarget.getAttribute('data-video-id');
      state.materiFormat = format || 'teori';
      if (videoId) {
        state.activeVideoId = videoId;
      }
      state.quizMode = false;
      renderApp();
    });
  });

  // Direct Video Selection (Sidebar, Spotlight banner & Related Video Switchers)
  document.querySelectorAll('[data-select-video]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const videoId = e.currentTarget.getAttribute('data-select-video');
      if (!videoId) return;
      state.activeVideoId = videoId;
      state.materiFormat = 'video';
      state.activeTab = 'materi';
      state.quizMode = false;
      if (videoId === 'TrqZDU7Ywf4') {
        state.selectedModulIndex = 1;
      } else if (videoId === 'WKrRWSCXo38') {
        state.selectedModulIndex = 2;
      }
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Open Crimping Video from Workshop toolbar
  document.querySelectorAll('[data-open-crimping-video]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = 'materi';
      state.selectedModulIndex = 1; // Module 2 (Crimping)
      state.materiFormat = 'video';
      state.activeVideoId = 'TrqZDU7Ywf4';
      state.quizMode = false;
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-enter-quiz]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.quizMode = true;
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-exit-quiz]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.quizMode = false;
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Quiz Option Click
  document.querySelectorAll('[data-quiz-q]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!state.session) {
        state.authModalOpen = true;
        state.authMode = 'login';
        state.authNotice = {
          type: 'warning',
          message: t('authModal.loginRequiredQuiz', state.lang)
        };
        renderApp();
        return;
      }

      const qIdx = parseInt(e.currentTarget.getAttribute('data-quiz-q'), 10);
      const optIdx = parseInt(e.currentTarget.getAttribute('data-quiz-opt'), 10);
      const currentModul = state.moduls[state.selectedModulIndex];
      if (!currentModul) return;

      const mId = currentModul.id;
      if (!state.quizAnswers[mId]) {
        state.quizAnswers[mId] = {};
      }
      state.quizAnswers[mId][qIdx] = optIdx;
      renderApp();
    });
  });

  // Guest unlock quiz button
  const guestUnlockQuiz = document.getElementById('btn-guest-unlock-quiz');
  if (guestUnlockQuiz) {
    guestUnlockQuiz.addEventListener('click', () => {
      state.authModalOpen = true;
      state.authMode = 'login';
      state.authNotice = {
        type: 'warning',
        message: t('authModal.loginRequiredQuiz', state.lang)
      };
      renderApp();
    });
  }

  // Submit Quiz & Evaluate
  const submitQuizBtn = document.getElementById('btn-submit-quiz');
  if (submitQuizBtn) {
    submitQuizBtn.addEventListener('click', async () => {
      if (!state.session) {
        state.authModalOpen = true;
        state.authMode = 'login';
        state.authNotice = {
          type: 'warning',
          message: t('authModal.loginRequiredQuiz', state.lang)
        };
        renderApp();
        return;
      }
      const currentModul = state.moduls[state.selectedModulIndex];
      if (!currentModul) return;

      const rawContent = currentModul.konten;
      const content = typeof rawContent === 'string' ? JSON.parse(rawContent) : rawContent;
      const quizzes = getModuleQuizzes(currentModul, content?.quiz || [], state.lang);
      if (quizzes.length === 0) return;

      const mId = currentModul.id;
      const userAnswers = state.quizAnswers[mId] || {};
      const answeredCount = Object.keys(userAnswers).length;

      if (answeredCount < quizzes.length) {
        alert(t('materi.answerAllNotice', state.lang));
        return;
      }

      // Calculate score
      let correct = 0;
      quizzes.forEach((q, idx) => {
        if (userAnswers[idx] === q.jawaban_benar) correct++;
      });
      const scorePct = Math.round((correct / quizzes.length) * 100);
      const passed = scorePct >= 50;

      state.quizSubmitted[mId] = true;

      // XP didapat dari setiap menjawab kuis sesuai nilai yang didapat (0 - 100)
      const earnedXp = scorePct;

      state.learningProgress[mId] = {
        modul_id: mId,
        status: passed ? 'selesai' : 'sedang_belajar',
        skor_quiz: scorePct,
        xp_didapat: earnedXp,
        terakhir_dibaca: new Date().toISOString()
      };

      // Award XP from answering quiz according to score obtained
      if (earnedXp > 0) {
        await syncProfileXp(earnedXp);

        // Update current user's entry in state.scores if present so Leaderboard reflects it immediately
        if (state.session?.user?.id) {
          const currentName = getEffectiveUserName().trim().toLowerCase();
          const userIdx = state.scores.findIndex(s => s.user_id === state.session.user.id || (currentName !== 'user' && (s.player_name || '').trim().toLowerCase() === currentName));
          if (userIdx !== -1) {
            state.scores[userIdx].total_xp = state.userProfile.total_xp;
            state.scores[userIdx].materiXp = (state.scores[userIdx].materiXp || 0) + earnedXp;
            state.scores[userIdx].level = state.userProfile.level;
          }
        }

        // Show celebration toast for quiz completion with earned XP
        const moduleTitle = currentModul.judul || t('nav.materi', state.lang);
        state.realtimeToast = {
          id: Date.now(),
          text: t('toast.quizCompletedXp', state.lang, {
            modul: moduleTitle,
            xp: earnedXp,
            score: scorePct
          }),
          timestamp: new Date()
        };

        setTimeout(() => {
          if (state.realtimeToast && Date.now() - state.realtimeToast.id >= 4500) {
            state.realtimeToast = null;
            renderApp();
          }
        }, 5000);
      }

      // Save to Supabase Cloud if user is authenticated
      if (state.session?.user?.id) {
        try {
          await supabase.from('progres_belajar').upsert({
            user_id: state.session.user.id,
            modul_id: mId,
            status: passed ? 'selesai' : 'sedang_belajar',
            skor_quiz: scorePct,
            terakhir_dibaca: new Date().toISOString()
          }, { onConflict: 'user_id,modul_id' });
        } catch (err) {
          console.warn('Failed saving progres_belajar:', err);
        }
      }

      renderApp();
    });
  }

  // Retry Quiz
  const retryQuizBtn = document.getElementById('btn-retry-quiz');
  if (retryQuizBtn) {
    retryQuizBtn.addEventListener('click', () => {
      if (!state.session) {
        state.authModalOpen = true;
        state.authMode = 'login';
        state.authNotice = {
          type: 'warning',
          message: t('authModal.loginRequiredQuiz', state.lang)
        };
        renderApp();
        return;
      }
      const currentModul = state.moduls[state.selectedModulIndex];
      if (!currentModul) return;
      const mId = currentModul.id;
      state.quizSubmitted[mId] = false;
      state.quizAnswers[mId] = {};
      renderApp();
    });
  }

  // AI FAB
  document.querySelectorAll('[data-open-ai-tutor]').forEach(button => {
    button.addEventListener('click', () => {
      state.aiChatOpen = true;
      renderApp();
    });
  });

  const fabBtn = document.getElementById('ai-fab-btn');
  if (fabBtn) {
    fabBtn.addEventListener('click', () => {
      state.aiChatOpen = !state.aiChatOpen;
      renderApp();
    });
  }

  const closeBtn = document.getElementById('btn-close-ai');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      state.aiChatOpen = false;
      renderApp();
    });
  }

  // AI Checkpoint Trigger
  const checkpointBtn = document.getElementById('btn-trigger-ai-checkpoint');
  if (checkpointBtn) {
    checkpointBtn.addEventListener('click', (e) => {
      const q = decodeURIComponent(e.currentTarget.getAttribute('data-question') || '');
      sendSocraticQuery(q);
    });
  }

  // AI Quick Inquiry Chips
  document.querySelectorAll('.ai-quick-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const q = e.currentTarget.getAttribute('data-q');
      if (q) {
        sendSocraticQuery(q);
      }
    });
  });

  // AI Query Form
  const aiForm = document.getElementById('ai-input-form');
  if (aiForm) {
    aiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('ai-user-query');
      if (!input || !input.value.trim()) return;

      const q = input.value.trim();
      input.value = '';
      sendSocraticQuery(q);
    });
  }

  // AI Reset Chat Session
  const resetAiBtn = document.getElementById('btn-reset-ai-chat');
  if (resetAiBtn) {
    resetAiBtn.addEventListener('click', () => {
      state.aiMessages = [
        {
          role: 'assistant',
          text: t('ai.greeting', state.lang, { name: getEffectiveUserName() }),
          concept: t('ai.defaultConcept', state.lang)
        }
      ];
      state.aiDynamicChips = [];
      renderApp();
    });
  }

  // Leaderboard Standard Filter Tabs
  document.querySelectorAll('[data-filter-leaderboard]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const f = e.currentTarget.getAttribute('data-filter-leaderboard');
      if (f) {
        state.leaderboardFilter = f;
        renderApp();
      }
    });
  });

  // Manual Leaderboard Refresh Button
  const refreshLeaderboardBtn = document.getElementById('btn-refresh-leaderboard');
  if (refreshLeaderboardBtn) {
    refreshLeaderboardBtn.addEventListener('click', async () => {
      await fetchLatestScores();
    });
  }

  // Close Realtime Toast Banner
  const closeToastBtn = document.getElementById('btn-close-toast');
  if (closeToastBtn) {
    closeToastBtn.addEventListener('click', () => {
      state.realtimeToast = null;
      renderApp();
    });
  }

  // Mobile menu
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('hidden') === false;
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
      mobileBtn.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    });
  }
}

// Bootstrap
initData();

// Expose state and renderApp for automated inspection & testing
if (typeof window !== 'undefined') {
  window.__netverseState = state;
  window.__renderApp = renderApp;
}
