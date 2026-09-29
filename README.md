# NetVerse • Virtual Hardware Lab & Socratic AI Tutor

> **Platform Laboratorium Virtual 3D & Asisten Dosen Sokratik Berbasis AI untuk Pembelajaran Teknik Komputer dan Jaringan (TKJ)**  
> *Pendidikan Teknologi Informasi (PTI) • Fakultas Teknik • Universitas Negeri Surabaya (UNESA)*

---

## 📌 Ringkasan Proyek

**NetVerse** adalah platform laboratorium virtual berbasis web modern yang dirancang untuk mengatasi hambatan ketersediaan alat praktikum fisik, meminimalkan limbah kabel habis pakai, serta meningkatkan penalaran ilmiah siswa SMK/mahasiswa PTI dalam kompetensi infrastruktur jaringan komputer.

### Fitur Unggulan
1. **Workbench Lab 3D PBR & Spatial Hotspots:** Eksplorasi interaktif model 3D nyata (Switch Manageable 24-Port, Router Wi-Fi TP-Link Archer AX23, Tang Crimping RJ-45/RJ-11, Konektor RJ-45, Server Rack Data Center, dan LAN Tester) dengan kendali multi-angle camera orbit.
2. **Crimping Master (Simulator 2D LAN Cable 8-Pin):** Perakitan kabel UTP TIA/EIA-568-A & T568-B dengan mekanisme *drag-and-drop* ganda, fallback layar sentuh, stopwatch presisi, dan simulasi 8 lampu indikator *LAN Cable Continuity Tester*.
3. **Silabus Modular & Kuis Evaluasi Diagnostik:** Modul pembelajaran terstruktur dengan pelacakan progres kelulusan cloud dan kuis formatif berumpan-balik sokratik analitis (15 soal dengan evaluasi instan).
4. **Materi Praktikum Video YouTube:** Integrasi pemutar video tutorial langkah demi langkah (Crimping RJ-45 & Konfigurasi MikroTik) lengkap dengan rangkuman teknis 4 langkah praktikum.
5. **Asisten Dosen Sokratik AI (Google Gemini 2.5 Flash & Supabase Edge Function):** AI Tutor berbasis metode sokratik yang membimbing pemikiran kritis mahasiswa tanpa memberikan jawaban contekan langsung, tercatat transparan di database `ai_tutor_logs`.
6. **Papan Peringkat Realtime (WebSocket):** Sinkronisasi klasemen kelas live via *Supabase Realtime Channel*, dilengkapi *Top 3 Podium Bento Cards*, filter standar kabel, deduplikasi peringkat unik per pengguna, dan notifikasi siaran aktivitas lab langsung.
7. **Otentikasi & Profil Akademik:** Manajemen identitas mahasiswa, sistem leveling XP gamifikasi, toggle visibilitas kata sandi, validasi kredensial presisi, dan riwayat belajar cloud di Supabase PostgreSQL 3NF.
8. **4 Pilihan Tema Warna (Dropdown):** Mode Terang (Light), Gelap Standar (Dark Titanium), Midnight Blue (Biru Gelap Elegan), dan Dark Emerald (Hijau Gelap Hutan).
9. **Dukungan Multi-Bahasa (i18n):** Lokalisasi penuh 4 bahasa: Bahasa Indonesia (ID), English (EN), 日本語 (JP), dan 简体中文 (CN).
10. **Desain Anti-Slop & Anti-Rounded:** Estetika teknikal presisi dengan kepatuhan radius ketat ($\le 12\text{px}$ kontainer, $\le 8\text{px}$ tombol/input, $\le 6\text{px}$ badge/chips).

---

## 🚀 Panduan Memulai Cepat

### Prasyarat
* **Node.js** v18+ atau v20+
* **NPM** v9+

### Konfigurasi Lingkungan (.env)
Salin berkas template lingkungan:
```bash
cp .env.example .env
```
Isi konfigurasi Supabase dan Google Gemini API Key Anda.

### Instalasi & Menjalankan Server Lokal

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan Vite
npm run dev
```

Aplikasi akan aktif di `http://localhost:5173`.

---

## 🌐 Panduan Deploy ke Layanan Hosting

### 1. Vercel (Rekomendasi)
Repository telah dilengkapi berkas `vercel.json` bawaan:
- Hubungkan repository GitHub ke Vercel.
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: Masukkan variabel dari `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_GEMINI_API_KEY`, `VITE_GEMINI_MODEL`).

### 2. Netlify / Cloudflare Pages
Repository telah dilengkapi berkas `public/_redirects`:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- Atur Environment Variables yang sama di dashboard hosting.

---

## 🛠️ Perintah Skrip Tersedia

| Perintah | Deskripsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan Vite lokal (`http://localhost:5173`) |
| `npm run build` | Melakukan kompilasi bundle produksi yang teroptimasi di folder `dist/` |
| `npm run preview` | Meninjau hasil kompilasi produksi secara lokal |
| `npm run test:ui` | Menjalankan pengujian otomatis komprehensif Playwright E2E (**93 checks**) |

---

## 🗄️ Arsitektur Basis Data Supabase (PostgreSQL 3NF)

Platform NetVerse menggunakan arsitektur basis data relasional ternormalisasi (3NF) di Supabase Cloud:
* **`profiles`:** Data identitas mahasiswa, username, total XP, level gamifikasi, dan role.
* **`modul`:** Silabus kurikulum, estimasi durasi, reward XP, konten pembelajaran, dan bank kuis JSONB.
* **`perangkat_3d`:** Katalog perangkat keras lab 3D, jalur model GLB, embed Sketchfab, dan titik spatial hotspot.
* **`skor_minigame`:** Rekor waktu dan akurasi perakitan kabel LAN T568A/T568B mahasiswa.
* **`progres_belajar`:** Riwayat kemajuan modul dan nilai kuis evaluasi formatif.
* **`ai_tutor_logs`:** Dokumentasi dialog tanya-jawab sokratik antara mahasiswa dan AI Tutor.

Semua tabel dilindungi oleh kebijakan keamanan **Row Level Security (RLS)** dan dipublikasikan ke kanal **Supabase Realtime WebSocket**.

---

## 🧪 Pengujian Sistem Otomatis (Playwright)

NetVerse dilengkapi dengan suite pengujian otomatis end-to-end menyeluruh pada [`scripts/audit_ui_playwright.mjs`](scripts/audit_ui_playwright.mjs):

```bash
npm run test:ui
```

**Hasil Audit Terakhir:**
* **Total Pemeriksaan:** 93 Checks
* **Tingkat Kelulusan:** 100% (93/93 Passed, 0 Failed)
* **Cakupan Pengujian:**
  - Audit Desktop & Responsivitas Mobile (390px).
  - Verifikasi Anti-Rounded CSS Radii Token.
  - Simulasi Perakitan Kabel Crimping & Uji Kontinuitas 8-Pin.
  - Alih Bahasa 4 Bahasa (ID, EN, JP, CN).
  - Alih Tema 4 Warna (Light, Dark, Midnight Blue, Dark Emerald).
  - Alih Format Materi Video YouTube & Rangkuman Langkah Praktikum.
  - Otentikasi Supabase, Show/Hide Password, dan Validasi Akun.
* **Kepatuhan Desain:** Radii navbar (12px), bezel card (12px), input & tombol (8px), tag & chips (6px). Zero horizontal overflow di desktop (1280px) maupun smartphone (390px).

---

## 📚 Dokumentasi Skripsi Lengkap

Naskah teknis akademik skripsi yang mencakup Latar Belakang, Landasan Teori TIA/EIA-568, Diagram Arsitektur Sistem, ERD 3NF, Pengujian Black Box, dan Pembahasan Penelitian dapat diakses pada berkas:
👉 **[`DOKUMENTASI_SKRIPSI.md`](DOKUMENTASI_SKRIPSI.md)**

---

## 👨‍💻 Pengembang
* **Nama:** Muhammad Naufal Farras (`naufalmhsunesa`)
* **Prodi:** S1 Pendidikan Teknologi Informasi (PTI)
* **Fakultas:** Fakultas Teknik, Universitas Negeri Surabaya (UNESA)
