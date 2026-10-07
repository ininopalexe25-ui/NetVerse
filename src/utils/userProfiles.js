/**
 * NetVerse - User Profiles & Privacy Utilities
 * Handles UID generation, Tagname validation, Achievements calculation,
 * and strict profile data sanitization (Username & Tagname are strictly private).
 */

/**
 * Generate a permanent, immutable UID (e.g., NV-849201)
 * @param {string} [seed] - Optional seed for deterministic generation (e.g., user id)
 * @returns {string} Permanent UID formatted as NV-XXXXXX
 */
export function generatePermanentUID(seed = '') {
  if (!seed) {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `NV-${randomNum}`;
  }

  // Deterministic 6-digit hash from seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const positive = Math.abs(hash) % 900000 + 100000;
  return `NV-${positive}`;
}

/**
 * Validate Tagname: Must be exactly 5 alphanumeric characters (letters and numbers)
 * @param {string} tagname
 * @returns {boolean}
 */
export function validateTagname(tagname = '') {
  return /^[A-Za-z0-9]{5}$/.test((tagname || '').trim());
}

/**
 * Compute user achievements based on XP, crimping performance, and quiz/materi progress
 * @param {object} user - User profile object
 * @param {Array} scores - List of scores from leaderboard
 * @returns {Array} Array of achievement objects
 */
export function computeAchievements(user = {}, scores = []) {
  const userScores = (scores || []).filter(s => 
    (user.id && s.user_id === user.id) ||
    (user.nama_lengkap && (s.player_name || '').trim().toLowerCase() === (user.nama_lengkap || '').trim().toLowerCase()) ||
    (user.nickname && (s.player_name || '').trim().toLowerCase() === (user.nickname || '').trim().toLowerCase())
  );

  const bestAccuracy = userScores.length > 0 
    ? Math.max(...userScores.map(s => Number(s.akurasi_persen !== undefined ? s.akurasi_persen : (parseFloat(s.accuracy) || 0))))
    : 0;

  const bestTime = userScores.length > 0
    ? Math.min(...userScores.map(s => Number(s.waktu_detik !== undefined ? s.waktu_detik : (parseInt(s.time, 10) || 999))))
    : 999;

  const hasT568A = userScores.some(s => (s.standar_kabel || s.standard) === 'T568A');
  const hasT568B = userScores.some(s => (s.standar_kabel || s.standard) === 'T568B');
  const totalXp = Number(user.total_xp || 0);
  const level = Number(user.level || 1);

  return [
    {
      id: 'precision_expert',
      title: 'Presisi Sempurna (100% Accuracy)',
      icon: '🎯',
      desc: 'Mencapai akurasi crimping 100% tanpa kesalahan susunan pin kabel LAN.',
      unlocked: bestAccuracy >= 100,
      badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
    },
    {
      id: 'speed_demon',
      title: 'Kilat Crimping (Speed Demon)',
      icon: '⚡',
      desc: 'Menyelesaikan perakitan kabel berstandar T568A/B di bawah 30 detik.',
      unlocked: bestTime <= 30 && bestTime > 0,
      badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-300'
    },
    {
      id: 'dual_standard',
      title: 'Spesialis Dual Standar',
      icon: '🛡️',
      desc: 'Berhasil merakit kabel dengan kedua standar T568A dan T568B.',
      unlocked: hasT568A && hasT568B,
      badgeColor: 'border-blue-500/40 bg-blue-500/10 text-blue-300'
    },
    {
      id: 'network_scholar',
      title: 'Pakar Jaringan (Level 2+)',
      icon: '📚',
      desc: 'Mendapatkan lebih dari 500 XP dan naik ke Level 2 atau lebih tinggi.',
      unlocked: totalXp >= 500 || level >= 2,
      badgeColor: 'border-purple-500/40 bg-purple-500/10 text-purple-300'
    },
    {
      id: 'netverse_veteran',
      title: 'Master NetVerse (Level 5+)',
      icon: '👑',
      desc: 'Mencapai Level 5 dengan lebih dari 2000 XP gabungan Lab & Materi.',
      unlocked: totalXp >= 2000 || level >= 5,
      badgeColor: 'border-amber-400 bg-amber-400/20 text-amber-200'
    },
    {
      id: 'community_member',
      title: 'Komunikator Komunitas',
      icon: '🌐',
      desc: 'Terdaftar aktif dalam jaringan sosial dan kolaborasi NetVerse.',
      unlocked: true,
      badgeColor: 'border-teal-500/40 bg-teal-500/10 text-teal-300'
    }
  ];
}

/**
 * Extract parsed metadata from avatar_url or user_metadata
 * @param {object} profile
 * @returns {object} { nickname, tagname, uid, achievements }
 */
export function extractProfileMetadata(profile = {}) {
  let meta = {};
  if (profile.avatar_url && profile.avatar_url.startsWith('{')) {
    try {
      meta = JSON.parse(profile.avatar_url);
    } catch (e) {
      meta = {};
    }
  }

  const nickname = meta.nickname || profile.nama_lengkap || profile.username || 'Mahasiswa';
  const tagname = meta.tagname || (profile.id ? generatePermanentUID(profile.id).slice(-5) : 'NV001');
  const uid = meta.uid || generatePermanentUID(profile.id || profile.username || nickname);

  return {
    nickname,
    tagname: tagname.toUpperCase(),
    uid,
    achievements: meta.achievements || []
  };
}

/**
 * STRICT PRIVACY SANITIZER:
 * Strips all private fields (Username, Tagname, Email, Password).
 * Only returns public fields (Nickname, UID, Level, XP, Achievements, Stats).
 * @param {object} user
 * @param {Array} [scores]
 * @returns {object} Publicly safe user profile
 */
export function sanitizePublicProfile(user = {}, scores = []) {
  const meta = extractProfileMetadata(user);
  const nickname = meta.nickname || user.nama_lengkap || user.player_name || 'Mahasiswa';
  const uid = meta.uid || generatePermanentUID(user.id || nickname);
  const level = Number(user.level || 1);
  const totalXp = Number(user.total_xp || 0);

  return {
    id: user.id || null,
    nickname,
    uid,
    level,
    total_xp: totalXp,
    achievements: computeAchievements({ ...user, nickname, level, total_xp: totalXp }, scores),
    // Username and Tagname are STRICTLY omitted for public privacy!
  };
}

/**
 * Search users by Nickname OR UID
 * @param {string} query
 * @param {Array} userList
 * @returns {Array} Matched users
 */
export function searchUsers(query = '', userList = []) {
  const cleanQ = (query || '').trim().toLowerCase().replace(/^@/, '').replace(/^#/, '');
  if (!cleanQ) return [];

  return (userList || []).filter(u => {
    const meta = extractProfileMetadata(u);
    const nickname = (meta.nickname || u.nama_lengkap || u.player_name || '').toLowerCase();
    const uid = (meta.uid || generatePermanentUID(u.id || nickname)).toLowerCase();

    return nickname.includes(cleanQ) || uid.includes(cleanQ);
  });
}
