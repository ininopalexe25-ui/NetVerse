# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite, Tailwind CSS, <model-viewer> (WebXR 3D), Vanilla JS / ES Modules, Supabase (PostgreSQL 3NF, Supabase Auth, Row Level Security)

## Users

Mahasiswa S1 Pendidikan Teknologi Informasi (calon guru SMK/dosen) dan siswa SMK jurusan Teknik Komputer dan Jaringan (TKJ) yang mempelajari instalasi infrastruktur jaringan fisik, konfigurasi perangkat, dan pengkabelan LAN.

## Product Purpose

NetVerse adalah platform edukasi web interaktif yang mengatasi keterbatasan laboratorium fisik jaringan komputer dengan menyediakan Virtual Lab 3D (55-70% fokus visual), minigame simulasi Crimping Master 2D interaktif (standar T568A & T568B), modul micro-learning modular, sistem gamifikasi XP/Leveling, dan asisten AI Tutor Sokratik.

## Positioning

Tidak seperti modul perkuliahan PDF statis atau tutorial video pasif, NetVerse memadukan eksplorasi perangkat keras 3D interaktif 360° dengan simulasi perakitan kabel LAN berbasis taktil, dipandu oleh AI Tutor Sokratik yang menguji pemecahan masalah (troubleshooting) secara adaptif.

## Operating Context

Diakses melalui browser desktop/laptop di laboratorium komputer perkuliahan serta perangkat mobile/tablet saat belajar mandiri di luar kelas.

## Capabilities and Constraints

- Render 3D fotorealistik perangkat TKJ (Router Mikrotik, Switch Manageable, RJ-45, Tang Crimping) via `<model-viewer>` dengan titik hotspot informasi port.
- Minigame 2D Drag-and-Drop Crimping Master dengan timer mundur, validasi array 8-pin T568A/T568B, dan kalkulasi akurasi persentase.
- Modul Micro-learning terstruktur per bab dengan tracking progres belajar mahasiswa.
- Database relasional 3NF di Supabase dengan Row Level Security (RLS) untuk keamanan data skor dan profil.
- Gamifikasi terpadu: Perhitungan XP, kenaikan Level otomatis, dan Papan Peringkat (Leaderboard).
- Floating AI Socratic Tutor terintegrasi Gemini API dengan persona Asisten Dosen TKJ.

## Brand Commitments

- Nama: NetVerse
- Nuansa: Edukatif, Tech-Laboratory modern, presisi teknis, futuristik namun bersih dan ramah pemula.
- Identitas Visual: Palet Slate/Indigo/Cyan dengan aksen Emerald untuk status dan Amber untuk peringatan.

## Evidence on Hand

- Database Supabase terhubung dengan skema 3NF (`profiles`, `modul`, `perangkat_3d`, `skor_minigame`, `progres_belajar`, `ai_tutor_logs`).
- Modul data awal dan katalog perangkat 3D TKJ yang sudah di-seed.

## Product Principles

1. Physical Accuracy: Komponen jaringan, urutan warna kabel, dan port perangkat harus akurat sesuai standar TIA/EIA-568 dan standar industri.
2. Active Tactile Learning: Pengetahuan teoritis langsung diuji melalui manipulasi 3D dan simulasi drag-and-drop.
3. Socratic Troubleshooting: AI memandu alur berpikir mahasiswa dan memvalidasi hipotesis masalah jaringan alih-alih memberikan jawaban instan.
4. Micro-feedback & Reward: Setiap pencapaian modul dan minigame memberikan kepuasan instan berupa XP, animasi level, dan posisi leaderboard.

## Accessibility & Inclusion

Kontras warna teks memenuhi standar WCAG AA, navigasi ramah keyboard, dan label urutan warna kabel menyertakan teks nama warna (bukan warna saja) untuk ramah pengguna buta warna.
