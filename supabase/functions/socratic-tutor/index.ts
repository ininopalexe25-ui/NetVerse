// NetVerse - Supabase Edge Function: Socratic AI Tutor
// Pedagogical Socratic Assistant for Computer & Network Engineering (TKJ)
// PTI UNESA - Pendidikan Teknologi Informasi

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Domain knowledge base for Socratic Network Inquiry
const SOCRATIC_KNOWLEDGE_BASE = [
  {
    keywords: ["pin 3", "pin 6", "hijau", "mengapit", "kenapa dipisah", "alasan t568b"],
    topic: "Urutan pin T568B",
    response: "Pada colokan telepon lama, sepasang kawat memakai pin tengah, yaitu pin 4 dan 5. Susunan T568B menempatkan pasangan kawat berikutnya di pin 3 dan 6 agar konektor tetap kompatibel. Pilinan kawat membantu mengurangi gangguan sinyal, jadi usahakan pilinannya tetap rapat sampai dekat konektor. Menurutmu, apa yang bisa terjadi kalau kawatnya dibuka terlalu jauh?",
    suggestions: [
      "Bagaimana pilinan kawat memengaruhi kualitas sinyal?",
      "Apa perbedaan susunan pin T568A dan T568B?"
    ]
  },
  {
    keywords: ["crosstalk", "twist", "dipilin", "pilin", "interferensi", "lilitan"],
    topic: "Gangguan sinyal pada kabel UTP",
    response: "Crosstalk adalah gangguan yang muncul saat sinyal dari satu pasang kawat memengaruhi pasang kawat di dekatnya. Pilinan membantu mengurangi gangguan ini, sementara sinyal dikirim lewat dua kawat yang bekerja berpasangan. Pada kabel Cat 5e dan Cat 6, tiap pasangan punya jumlah pilinan yang berbeda. Menurutmu, apa manfaatnya jika jumlah pilinan tiap pasangan tidak sama?",
    suggestions: [
      "Kenapa jumlah pilinan pada tiap pasangan dibuat berbeda?",
      "Apa fungsi sekat plastik di dalam kabel UTP Cat 6?"
    ]
  },
  {
    keywords: ["tx", "rx", "hanya 4", "fast ethernet", "100base", "gigabit", "1000base"],
    topic: "Pasangan kawat untuk Fast Ethernet dan Gigabit Ethernet",
    response: "Fast Ethernet (100BASE-TX) memakai dua pasang kawat: pin 1 dan 2 untuk mengirim data, lalu pin 3 dan 6 untuk menerima. Gigabit Ethernet (1000BASE-T) memakai keempat pasang kawat. Jadi, kabel yang hanya tersambung dengan dua pasang biasanya tidak bisa mencapai kecepatan gigabit. Menurutmu, kecepatan apa yang mungkin dipilih perangkat jaringan?",
    suggestions: [
      "Apakah kabel dengan dua pasang kawat masih bisa dipakai?",
      "Bagaimana perangkat menentukan kecepatan koneksi?"
    ]
  },
  {
    keywords: ["switch", "router", "cam", "mac", "flooding", "broadcast"],
    topic: "Perbedaan switch dan router",
    response: "Switch meneruskan data di dalam jaringan lokal dengan membaca alamat MAC perangkat. Jika belum tahu ke mana data harus dikirim, switch akan meneruskannya ke port lain di jaringan yang sama. Router menghubungkan jaringan yang berbeda dan membatasi lalu lintas antarjaringan. Menurutmu, kenapa lalu lintas dari satu jaringan tidak selalu perlu diteruskan ke jaringan lain?",
    suggestions: [
      "Apa yang bisa terjadi jika terlalu banyak pesan siaran di jaringan?",
      "Bagaimana VLAN membagi jaringan pada sebuah switch?"
    ]
  },
  {
    keywords: ["console", "rollover", "serial", "cli", "out of band", "oobm"],
    topic: "Port console",
    response: "Port console dipakai untuk mengatur perangkat jaringan secara langsung, misalnya saat switch belum punya alamat IP atau pengaturan jaringannya bermasalah. Kabel console memiliki susunan pin khusus yang membalik urutannya. Menurutmu, kenapa teknisi tetap membutuhkan cara akses langsung seperti ini?",
    suggestions: [
      "Apa arti baud rate saat menghubungkan kabel console?",
      "Bagaimana cara mengatasi router yang tidak bisa diakses lewat jaringan?"
    ]
  },
  {
    keywords: ["crimping", "tang", "konektor", "tester", "lan tester", "gagal"],
    topic: "Menguji kabel LAN",
    response: "Saat kabel diuji, lampu pada LAN tester akan menyala sesuai urutan pin yang terhubung. Jika salah satu lampu mati, kawatnya mungkin belum menyentuh kontak konektor atau tidak terpasang dengan baik. Menurutmu, apa bedanya satu kawat yang putus dengan dua kawat yang tertukar pasangannya?",
    suggestions: [
      "Kenapa bagian luar kabel perlu ikut terjepit konektor?",
      "Bagaimana LAN tester membedakan kabel straight dan crossover?"
    ]
  }
];

function generateSocraticHeuristic(query: string, context: string) {
  const lowerQuery = query.toLowerCase();
  const lowerContext = context.toLowerCase();

  if (lowerContext.includes("crimping") && /warna|urutan|susunan|pin|t568/.test(lowerQuery)) {
    return {
      response: "Susunan warna adalah bagian dari tantangan ini, jadi aku tidak akan membocorkannya sebelum kamu mencoba. Aku bisa bantu menjelaskan cara memakai simulasi atau membaca hasil LAN tester.",
      concept: "Petunjuk praktik",
      suggestedInquiries: [
        "Bagaimana cara membaca hasil LAN tester?",
        "Apa yang perlu diperiksa jika sambungan tidak terbaca?"
      ]
    };
  }

  for (const item of SOCRATIC_KNOWLEDGE_BASE) {
    if (item.keywords.some(k => lowerQuery.includes(k))) {
      return {
        response: item.response,
        concept: item.topic,
        suggestedInquiries: item.suggestions
      };
    }
  }

  // Dynamic pedagogical inquiry based on page context
  if (lowerContext.includes("crimping")) {
    return {
      response: `Pertanyaanmu tentang "${query}" berkaitan dengan cara memasang kabel ke konektor. Pilinan kawat sebaiknya tetap rapat sampai dekat ujung konektor agar sinyal tidak mudah terganggu. Menurutmu, apa yang bisa terjadi jika pilinannya dibuka terlalu panjang?`,
      concept: "Memasang kabel ke konektor",
      suggestedInquiries: [
        "Kenapa ujung kawat harus rata sebelum konektor dipres?",
        "Apa fungsi kontak logam di dalam konektor RJ-45?"
      ]
    };
  }

  if (lowerContext.includes("materi")) {
    return {
      response: `Pertanyaanmu tentang "${query}" berkaitan dengan cara jaringan dirancang. Coba hubungkan materi ini dengan perangkat dan kabel yang kamu temui di laboratorium. Menurutmu, apa contoh penerapannya?`,
      concept: "Merancang jaringan",
      suggestedInquiries: [
        "Bagaimana switch mencegah data berputar tanpa henti di jaringan?",
        "Apa perbedaan kabel Cat 5e dan Cat 6?"
      ]
    };
  }

  return {
    response: `Kamu bertanya tentang "${query}". Mari kita cari jawabannya bersama. Jika kamu menguji hal ini dengan perangkat jaringan, apa yang akan kamu periksa lebih dulu?`,
    concept: "Mencari jawaban lewat praktik",
    suggestedInquiries: [
      "Kenapa standar T568B banyak digunakan?",
      "Bagaimana LAN tester memeriksa susunan kabel?"
    ]
  };
}

Deno.serve(async (req: Request) => {
  // Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { query, context = "Umum", user_id = null } = await req.json();

    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Query parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let tutorResult;

    // Check if external LLM API key exists (Gemini)
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY") || "";
    if (geminiApiKey) {
      try {
        const prompt = `Kamu adalah NetVerse Socratic AI Tutor untuk mahasiswa/siswa Teknik Komputer dan Jaringan (TKJ).
Bimbing mahasiswa memahami konsep jaringan komputer, UTP/STP, crimping, switch, router, dan LAN tester.
Gunakan Bahasa Indonesia yang ramah, jelas, edukatif, dan ringkas.
PENTING: Pada simulasi crimping atau pertanyaan urutan kabel, JANGAN membocorkan langsung susunan warna kabel atau urutan pin secara mentah. Bimbing mereka melalui pemahaman konsep (misal: kenapa pin Tx/Rx terpisah, fungsi pilinan kabel, dll).
Format output WAJIB JSON dengan format:
{
  "response": "jawaban/bimbingan edukatif",
  "concept": "Label Konsep (2-4 kata)",
  "suggestedInquiries": ["pertanyaan lanjutan 1", "pertanyaan lanjutan 2"]
}

Topik yang sedang dipelajari: "${context}".
Pertanyaan pengguna: "${query}"`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.7,
                responseMimeType: "application/json",
                thinkingConfig: {
                  thinkingBudget: 0
                }
              }
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            try {
              const parsed = JSON.parse(text);
              tutorResult = {
                response: parsed.response || text,
                concept: parsed.concept || "Tutor Jaringan",
                suggestedInquiries: Array.isArray(parsed.suggestedInquiries) ? parsed.suggestedInquiries : [
                  "Bagaimana hasilnya jika memakai kabel STP?",
                  "Apakah hal ini memengaruhi kecepatan jaringan?"
                ]
              };
            } catch {
              tutorResult = {
                response: text,
                concept: "Tutor Jaringan",
                suggestedInquiries: [
                  "Bagaimana hasilnya jika memakai kabel STP?",
                  "Apakah hal ini memengaruhi kecepatan jaringan?"
                ]
              };
            }
          }
        }
      } catch (e) {
        console.warn("External LLM fallback to Heuristic Engine:", e);
      }
    }

    // Heuristic Socratic Engine Fallback if no LLM or failed
    if (!tutorResult) {
      tutorResult = generateSocraticHeuristic(query, context);
    }

    // Log to Supabase Database (ai_tutor_logs)
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY");

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Log user query
        await supabase.from("ai_tutor_logs").insert({
          user_id: user_id || null,
          konteks_halaman: context,
          role: "user",
          pesan: query
        });

        // Log tutor response
        await supabase.from("ai_tutor_logs").insert({
          user_id: user_id || null,
          konteks_halaman: context,
          role: "assistant",
          pesan: tutorResult.response
        });
      } catch (logErr) {
        console.warn("Log to ai_tutor_logs notice:", logErr);
      }
    }

    return new Response(JSON.stringify(tutorResult), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
