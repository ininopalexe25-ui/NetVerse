-- ==============================================================================
-- NETVERSE DATABASE SCHEMA (PostgreSQL / Supabase 3NF)
-- Proyek Edukasi TKJ: 3D Virtual Lab, Crimping Master, Gamifikasi XP, AI Tutor
-- ==============================================================================

-- 1. PROFILES (Mahasiswa, Dosen, Gamifikasi XP & Level)
-- Terhubung langsung ke auth.users bawaan Supabase
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama_lengkap text NOT NULL DEFAULT '',
  username text UNIQUE,
  avatar_url text,
  total_xp integer NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
  level integer NOT NULL DEFAULT 1 CHECK (level >= 1),
  role text NOT NULL DEFAULT 'mahasiswa' CHECK (role IN ('mahasiswa', 'dosen', 'admin')),
  dibuat_pada timestamptz NOT NULL DEFAULT now(),
  diperbarui_pada timestamptz NOT NULL DEFAULT now()
);

-- Trigger Otomatis: Saat user sign-up via Google/Email, buat profil di public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, nama_lengkap, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. MODUL (Micro-learning TKJ)
CREATE TABLE IF NOT EXISTS public.modul (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  judul text NOT NULL,
  deskripsi text NOT NULL,
  kategori text NOT NULL DEFAULT 'jaringan_dasar',
  estimasi_menit integer NOT NULL DEFAULT 10 CHECK (estimasi_menit > 0),
  xp_reward integer NOT NULL DEFAULT 100 CHECK (xp_reward >= 0),
  urutan integer NOT NULL DEFAULT 0,
  dibuat_pada timestamptz NOT NULL DEFAULT now()
);

-- 3. PERANGKAT_3D (Katalog Virtual Lab Objek 3D TKJ)
CREATE TABLE IF NOT EXISTS public.perangkat_3d (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kode text NOT NULL UNIQUE,
  nama text NOT NULL,
  kategori text NOT NULL CHECK (kategori IN ('perangkat_jaringan', 'media_transmisi', 'alat_kerja')),
  model_path text NOT NULL,
  deskripsi text NOT NULL,
  spesifikasi jsonb NOT NULL DEFAULT '{}'::jsonb,
  hotspots jsonb NOT NULL DEFAULT '[]'::jsonb,
  urutan integer NOT NULL DEFAULT 0,
  dibuat_pada timestamptz NOT NULL DEFAULT now()
);

-- 4. SKOR_MINIGAME (Leaderboard Crimping Master T568A / T568B)
CREATE TABLE IF NOT EXISTS public.skor_minigame (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  standar_kabel text NOT NULL CHECK (standar_kabel IN ('T568A', 'T568B')),
  waktu_detik integer NOT NULL CHECK (waktu_detik > 0),
  akurasi_persen numeric(5,2) NOT NULL CHECK (akurasi_persen >= 0 AND akurasi_persen <= 100),
  xp_didapat integer NOT NULL DEFAULT 0 CHECK (xp_didapat >= 0),
  selesai_pada timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_skor_user_id ON public.skor_minigame(user_id);
CREATE INDEX IF NOT EXISTS idx_skor_leaderboard ON public.skor_minigame(akurasi_persen DESC, waktu_detik ASC);

-- 5. PROGRES_BELAJAR (Tracking Bab & Micro-learning Mahasiswa)
CREATE TABLE IF NOT EXISTS public.progres_belajar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  modul_id uuid NOT NULL REFERENCES public.modul(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'belum_mulai' CHECK (status IN ('belum_mulai', 'sedang_belajar', 'selesai')),
  skor_quiz integer NOT NULL DEFAULT 0 CHECK (skor_quiz >= 0 AND skor_quiz <= 100),
  xp_didapat integer NOT NULL DEFAULT 0 CHECK (xp_didapat >= 0),
  terakhir_dibaca timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_user_modul UNIQUE (user_id, modul_id)
);

CREATE INDEX IF NOT EXISTS idx_progres_user_id ON public.progres_belajar(user_id);

-- 6. AI_TUTOR_LOGS (Riwayat Diskusi Sokratik & Troubleshooting Mahasiswa)
CREATE TABLE IF NOT EXISTS public.ai_tutor_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  konteks_halaman text NOT NULL DEFAULT 'umum',
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  pesan text NOT NULL,
  dibuat_pada timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_logs_user_id ON public.ai_tutor_logs(user_id);

-- KEAMANAN: Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modul ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perangkat_3d ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skor_minigame ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progres_belajar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_tutor_logs ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS (Policies)
DROP POLICY IF EXISTS "Profil dapat dibaca oleh publik" ON public.profiles;
CREATE POLICY "Profil dapat dibaca oleh publik" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Pengguna hanya dapat memperbarui profil sendiri" ON public.profiles;
CREATE POLICY "Pengguna hanya dapat memperbarui profil sendiri" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Modul materi dapat dibaca oleh publik" ON public.modul;
CREATE POLICY "Modul materi dapat dibaca oleh publik" ON public.modul FOR SELECT USING (true);

DROP POLICY IF EXISTS "Katalog 3D dapat dibaca oleh publik" ON public.perangkat_3d;
CREATE POLICY "Katalog 3D dapat dibaca oleh publik" ON public.perangkat_3d FOR SELECT USING (true);

DROP POLICY IF EXISTS "Leaderboard dapat dibaca publik" ON public.skor_minigame;
CREATE POLICY "Leaderboard dapat dibaca publik" ON public.skor_minigame FOR SELECT USING (true);

DROP POLICY IF EXISTS "Pengguna dapat mencatat skor sendiri" ON public.skor_minigame;
CREATE POLICY "Pengguna dapat mencatat skor sendiri" ON public.skor_minigame FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Pengguna dapat memperbarui skor sendiri" ON public.skor_minigame;
CREATE POLICY "Pengguna dapat memperbarui skor sendiri" ON public.skor_minigame FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Pengguna dapat menghapus skor sendiri" ON public.skor_minigame;
CREATE POLICY "Pengguna dapat menghapus skor sendiri" ON public.skor_minigame FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

-- Pembersihan data legacy: Hanya pengguna terotentikasi yang disimpan di skor_minigame
-- DELETE FROM public.skor_minigame WHERE player_name ILIKE 'user' OR (user_id IS NULL AND player_name = 'User');

-- Sinkronisasi nama player jika profil diubah
-- UPDATE public.skor_minigame SET player_name = 'Shiina' WHERE user_id = '9e3d7ba1-0bff-476d-b9e2-d1e153d77648';

-- Otomasi sinkronisasi nama ke tabel skor_minigame saat profiles.nama_lengkap diupdate
CREATE OR REPLACE FUNCTION public.sync_profile_name_to_scores()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.nama_lengkap IS DISTINCT FROM OLD.nama_lengkap THEN
    UPDATE public.skor_minigame
    SET player_name = NEW.nama_lengkap
    WHERE user_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_sync_profile_name ON public.profiles;
CREATE TRIGGER trigger_sync_profile_name
AFTER UPDATE OF nama_lengkap ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.sync_profile_name_to_scores();

DROP POLICY IF EXISTS "Pengguna mengelola progres belajarnya" ON public.progres_belajar;
CREATE POLICY "Pengguna mengelola progres belajarnya" ON public.progres_belajar FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Pengguna mengelola riwayat chat AI" ON public.ai_tutor_logs;
CREATE POLICY "Pengguna mengelola riwayat chat AI" ON public.ai_tutor_logs FOR ALL USING (auth.uid() = user_id);

-- SEED DATA AWAL (Modul & Perangkat 3D)
INSERT INTO public.modul (slug, judul, deskripsi, estimasi_menit, xp_reward, urutan)
VALUES
  ('jaringan-dasar-topologi', 'Dasar jaringan dan topologi', 'Pelajari peran host dan bentuk topologi star, bus, serta mesh.', 10, 100, 1),
  ('media-transmisi-utp', 'Kabel UTP dan urutan warnanya', 'Kenali susunan kawat dalam kabel UTP dan urutan warna T568A serta T568B.', 15, 100, 2),
  ('perangkat-keras-jaringan', 'Mengenal router dan switch', 'Pelajari perbedaan fungsi switch Layer 2 dan router Layer 3.', 15, 100, 3)
ON CONFLICT (slug) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi;

INSERT INTO public.perangkat_3d (kode, nama, kategori, model_path, deskripsi, spesifikasi, hotspots, urutan)
VALUES
(
  'router-mikrotik',
  'Router MikroTik RB750Gr3',
  'perangkat_jaringan',
  '/assets/models/router.glb',
  'Router Gigabit untuk mengatur lalu lintas data, membagi bandwidth, dan mengelola firewall jaringan.',
  '{"port": "5 port Gigabit Ethernet", "cpu": "Dual-core 880 MHz", "ram": "256 MB", "os": "RouterOS Level 4"}'::jsonb,
  '[
    {"name": "Port 1 (Internet/PoE)", "position": "0 0.1 0.2", "deskripsi": "Hubungkan port ini ke modem atau sumber internet. Port ini juga mendukung daya PoE."},
    {"name": "Port LAN 2–5", "position": "0.15 0.1 0.2", "deskripsi": "Hubungkan komputer atau switch lain ke jaringan lokal lewat port ini."}
  ]'::jsonb,
  1
),
(
  'switch-manageable',
  'Switch 24 port yang dapat dikelola',
  'perangkat_jaringan',
  '/assets/models/switch.glb',
  'Switch Layer 2 untuk menghubungkan perangkat dan membagi jaringan ke beberapa VLAN.',
  '{"tipe": "Layer 2 · dapat dikelola", "throughput": "48 Gbps", "port": "24 port RJ-45 + 2 port SFP"}'::jsonb,
  '[
    {"name": "Port RJ-45 1–24", "position": "0 0.05 0.3", "deskripsi": "Hubungkan komputer dan perangkat jaringan lain ke port ini."},
    {"name": "Port console", "position": "-0.3 0.05 0.3", "deskripsi": "Gunakan port ini untuk mengatur switch secara langsung."}
  ]'::jsonb,
  2
),
(
  'konektor-rj45',
  'Konektor RJ-45 Cat 6',
  'media_transmisi',
  '/assets/models/rj45.glb',
  'Konektor delapan pin untuk menghubungkan kabel UTP ke kartu jaringan atau switch.',
  '{"standar": "TIA/EIA-568-A/B", "pin": "8 kontak berlapis emas", "tipe_kabel": "UTP Cat 5e / Cat 6"}'::jsonb,
  '[
    {"name": "Pin 1–8", "position": "0 0.02 0.05", "deskripsi": "Urutan delapan kawat tembaga pada standar T568B, dari putih oranye di pin 1 hingga cokelat di pin 8."},
    {"name": "Klip pengunci", "position": "0 -0.02 0", "deskripsi": "Klip ini menahan konektor agar tidak mudah lepas dari port Ethernet."}
  ]'::jsonb,
  3
),
(
  'crimping-tool',
  'Tang Crimping RJ-45/RJ-11',
  'alat_kerja',
  '/assets/models/crimping.glb',
  'Tang untuk memotong dan mengupas kabel, lalu memasang konektor RJ-45.',
  '{"fungsi": "Potong, kupas, dan pres", "kompatibilitas": "RJ-45 (8P8C), RJ-11 (6P4C/6P2C)"}'::jsonb,
  '[
    {"name": "Mata pres 8P8C", "position": "0 0.1 0.1", "deskripsi": "Bagian ini menekan kontak konektor ke kawat tembaga."},
    {"name": "Pisau pemotong", "position": "0 0.02 -0.05", "deskripsi": "Gunakan pisau ini untuk meratakan ujung kawat sebelum dipasang ke konektor."}
  ]'::jsonb,
  4
),
(
  'lan-tester',
  'LAN tester',
  'alat_kerja',
  '/models/lan-tester.glb',
  'Alat untuk memeriksa sambungan dan urutan pin pada kabel LAN.',
  '{"fungsi": "Memeriksa sambungan kabel", "indikator": "8 lampu LED", "konektor": "RJ-45 (8P8C)", "tipe": "Unit utama dan remote"}'::jsonb,
  '[
    {"name": "Lampu indikator", "position": "-0.64 0.25 0.16", "deskripsi": "Delapan lampu menunjukkan sambungan pada tiap pin saat kabel diuji."},
    {"name": "Port RJ-45", "position": "-0.64 -0.53 0.18", "deskripsi": "Sambungkan salah satu ujung kabel LAN ke port ini."},
    {"name": "Unit remote", "position": "0.66 0.08 0.12", "deskripsi": "Pasang unit ini di ujung kabel yang lain untuk memeriksa sambungan dari kedua sisi."}
  ]'::jsonb,
  5
)
ON CONFLICT (kode) DO UPDATE SET
  nama = EXCLUDED.nama,
  deskripsi = EXCLUDED.deskripsi,
  spesifikasi = EXCLUDED.spesifikasi,
  hotspots = EXCLUDED.hotspots;
