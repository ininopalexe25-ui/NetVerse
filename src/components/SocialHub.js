import { t } from '../utils/i18n.js';
import { searchUsers, extractProfileMetadata } from '../utils/userProfiles.js';

/**
 * NetVerse - Social Hub & Community Chat Component
 * Features:
 * 1. User & Friend Search by Nickname OR UID
 * 2. Community Chat: Global Lounge & 1-on-1 Direct Messaging
 * 3. Quick Profile inspection with strict public privacy (Nickname + UID only)
 *
 * Adheres strictly to Anti-Rounded Rules (max 12px containers, 8px buttons, 6px badges).
 */
export function renderSocialHub(state) {
  const lang = state.lang || 'id';
  const searchQuery = state.socialSearchQuery || '';
  const activeChat = state.activeChatTarget || 'global'; // 'global' or friend nickname
  const chatMessages = state.chatMessages || [];

  // Filter messages for current active chat
  const currentMessages = activeChat === 'global'
    ? chatMessages.filter(m => !m.recipient || m.recipient === 'global')
    : chatMessages.filter(m => 
        (m.recipient === activeChat && (m.sender === state.userProfile?.nama_lengkap || m.sender === 'Anda')) ||
        (m.sender === activeChat && (!m.recipient || m.recipient === state.userProfile?.nama_lengkap || m.recipient === 'Anda'))
      );

  // All known community users (from profiles + scores)
  const allUsers = state.communityUsers || [];
  const searchResults = searchQuery ? searchUsers(searchQuery, allUsers) : [];

  return `
    <div class="space-y-6 animate-fadeIn pb-12">
      
      <!-- HERO HEADER -->
      <div class="bezel-shell">
        <div class="bezel-core p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-transparent to-blue-500/10">
          <div class="max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>👥</span>
              <span>Komunitas & Obrolan Mahasiswa NetVerse</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pusat Sosial, Teman & Obrolan
            </h1>
            <p class="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Cari rekan belajar menggunakan <strong>Nickname</strong> atau <strong>UID</strong> permanen, jalin obrolan langsung, dan diskusikan materi jaringan dalam satu ruang terpadu.
            </p>
          </div>
        </div>
      </div>

      <!-- MAIN SPLIT INTERFACE -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- LEFT COLUMN: Search & Chat Threads (5 Columns) -->
        <div class="lg:col-span-5 space-y-5">
          
          <!-- USER SEARCH CARD -->
          <div class="bezel-shell">
            <div class="bezel-core p-4 sm:p-5 space-y-3.5">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>🔍</span> Cari Pengguna & Teman
                </h3>
                <span class="text-[10px] font-mono text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                  Input: Nickname / UID
                </span>
              </div>

              <!-- Search Input Form -->
              <div class="relative">
                <input 
                  type="text" 
                  id="input-social-search" 
                  value="${searchQuery}"
                  placeholder="Ketik Nickname atau UID (cth. Shiina atau NV-849201)..." 
                  class="w-full pl-9 pr-8 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔎</span>
                ${searchQuery ? `
                  <button 
                    type="button" 
                    id="btn-clear-social-search" 
                    class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                ` : ''}
              </div>

              <!-- Search Results Dropdown / List -->
              ${searchQuery ? `
                <div id="social-search-results" class="mt-2 space-y-2 max-h-56 overflow-y-auto custom-scrollbar p-1">
                  ${searchResults.length > 0 ? searchResults.map(u => {
                    const meta = extractProfileMetadata(u);
                    const name = meta.nickname || u.nama_lengkap || 'Mahasiswa';
                    const uid = meta.uid;
                    const level = u.level || 1;
                    return `
                      <div class="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 flex items-center justify-between transition-colors">
                        <div class="flex items-center gap-2.5 min-w-0">
                          <div class="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-xs font-bold text-amber-300 shrink-0">
                            ${name.charAt(0).toUpperCase()}
                          </div>
                          <div class="min-w-0">
                            <div class="text-xs font-bold text-white truncate">${name}</div>
                            <div class="text-[10px] font-mono text-amber-400/90 font-semibold">${uid} · L${level}</div>
                          </div>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0 ml-2">
                          <button 
                            type="button" 
                            data-view-profile="${name}"
                            data-user-uid="${uid}"
                            class="px-2 py-1 rounded-md bg-white/[0.06] hover:bg-white/15 text-slate-300 text-[11px] font-medium border border-white/10 transition-colors cursor-pointer"
                            title="Lihat Profil"
                          >
                            Profil
                          </button>
                          <button 
                            type="button" 
                            data-select-chat="${name}"
                            data-chat-uid="${uid}"
                            class="px-2 py-1 rounded-md bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-[11px] font-bold border border-amber-400/30 transition-colors cursor-pointer"
                            title="Mulai Chat"
                          >
                            Chat 💬
                          </button>
                        </div>
                      </div>
                    `;
                  }).join('') : `
                    <div class="p-4 text-center rounded-lg bg-white/[0.02] border border-dashed border-white/10 text-xs text-slate-400">
                      Tidak ditemukan pengguna dengan Nickname atau UID tersebut.
                    </div>
                  `}
                </div>
              ` : ''}
            </div>
          </div>

          <!-- CHANNELS & CONVERSATIONS LIST -->
          <div class="bezel-shell">
            <div class="bezel-core p-4 sm:p-5 space-y-3">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Saluran Obrolan (Chats)
              </h3>

              <div class="space-y-1.5">
                <!-- Global Community Lounge -->
                <button 
                  type="button" 
                  data-select-chat="global"
                  class="w-full p-3 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeChat === 'global'
                      ? 'bg-amber-400/15 border border-amber-400/30 shadow-sm'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/5'
                  }"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-sm font-bold text-amber-300 shrink-0">
                      🌐
                    </div>
                    <div class="min-w-0">
                      <div class="text-xs font-bold text-white truncate flex items-center gap-1.5">
                        <span>Ruang Global NetVerse</span>
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                      <div class="text-[10px] text-slate-400 truncate mt-0.5">Semua Mahasiswa & Pengguna</div>
                    </div>
                  </div>
                  <span class="text-[10px] font-mono text-amber-400 font-semibold uppercase">Umum</span>
                </button>

                <!-- Direct Messages List -->
                ${(state.recentDmContacts || ['Shiina', 'abduljabar', 'Dimas Wahyu']).map(contactName => {
                  const isSelected = activeChat === contactName;
                  return `
                    <button 
                      type="button" 
                      data-select-chat="${contactName}"
                      class="w-full p-2.5 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400/15 border border-amber-400/30 shadow-sm'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/5'
                      }"
                    >
                      <div class="flex items-center gap-2.5 min-w-0">
                        <div class="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          ${contactName.charAt(0).toUpperCase()}
                        </div>
                        <div class="min-w-0">
                          <div class="text-xs font-semibold text-white truncate">${contactName}</div>
                          <div class="text-[10px] text-slate-400 truncate mt-0.5">Obrolan Langsung (1-on-1)</div>
                        </div>
                      </div>
                      <span class="text-[9px] font-mono text-slate-500 uppercase">DM</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: Active Chat Stream & Input (7 Columns) -->
        <div class="lg:col-span-7">
          <div class="bezel-shell">
            <div class="bezel-core p-4 sm:p-6 flex flex-col h-[560px]">
              
              <!-- Chat Stream Header -->
              <div class="flex items-center justify-between pb-3.5 border-b border-white/[0.08] shrink-0">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-base font-bold text-amber-300 shrink-0">
                    ${activeChat === 'global' ? '🌐' : activeChat.charAt(0).toUpperCase()}
                  </div>
                  <div class="min-w-0">
                    <h3 class="text-sm font-bold text-white truncate">
                      ${activeChat === 'global' ? 'Ruang Diskusi Global Mahasiswa' : `Obrolan dengan ${activeChat}`}
                    </h3>
                    <p class="text-[11px] text-slate-400 truncate">
                      ${activeChat === 'global' 
                        ? 'Saluran publik langsung untuk semua siswa TKJ' 
                        : 'Obrolan pribadi 1-on-1'}
                    </p>
                  </div>
                </div>

                ${activeChat !== 'global' ? `
                  <button 
                    type="button" 
                    data-view-profile="${activeChat}"
                    class="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/15 border border-white/10 text-xs text-amber-400 font-semibold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>👤</span>
                    <span>Lihat Profil</span>
                  </button>
                ` : ''}
              </div>

              <!-- Messages List (Scrollable) -->
              <div id="social-chat-messages" class="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-3">
                ${currentMessages.length > 0 ? currentMessages.map(msg => {
                  const isSelf = msg.sender === (state.userProfile?.nama_lengkap || 'Anda') || msg.isSelf;
                  return `
                    <div class="flex flex-col ${isSelf ? 'items-end' : 'items-start'}">
                      <div class="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                        <span class="font-bold ${isSelf ? 'text-amber-400' : 'text-slate-200'}">${msg.sender}</span>
                        ${msg.senderUid ? `<span class="font-mono text-slate-500">(${msg.senderUid})</span>` : ''}
                        <span>•</span>
                        <span class="font-mono">${msg.time || 'Baru saja'}</span>
                      </div>
                      <div class="max-w-[85%] sm:max-w-[75%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed break-words ${
                        isSelf 
                          ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/30 text-white border border-amber-500/30 rounded-tr-sm' 
                          : 'bg-white/[0.05] text-slate-200 border border-white/10 rounded-tl-sm'
                      }">
                        ${msg.text}
                      </div>
                    </div>
                  `;
                }).join('') : `
                  <div class="h-full flex flex-col items-center justify-center text-center text-slate-500 p-6 space-y-2">
                    <span class="text-3xl">💬</span>
                    <p class="text-xs">Belum ada percakapan. Mulai kirimkan pesan pertama Anda!</p>
                  </div>
                `}
              </div>

              <!-- Quick Discussion Starters -->
              <div class="py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 border-t border-white/[0.06]">
                ${[
                  '👋 Halo semua rekan TKJ!',
                  '⚡ Ada tips crimping kabel T568B?',
                  '🎯 Siapa yang sudah capai akurasi 100%?',
                  '📚 Ayo belajar modul materi bersama!'
                ].map(chip => `
                  <button 
                    type="button" 
                    data-send-chip="${chip}"
                    class="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    ${chip}
                  </button>
                `).join('')}
              </div>

              <!-- Message Input & Send Form -->
              <form id="form-social-chat-send" class="pt-2 flex items-center gap-2 shrink-0">
                <input 
                  type="text" 
                  id="input-social-chat-message" 
                  placeholder="Ketik pesan obrolan..." 
                  required
                  autocomplete="off"
                  class="flex-1 px-3.5 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button 
                  type="submit" 
                  id="btn-send-social-chat" 
                  class="py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Kirim</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </form>

            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}
