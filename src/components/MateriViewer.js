import { getModuleQuizzes } from '../data/moduleQuizzes.js';
import { VIDEO_MATERIALS, getVideoByModulSlug, getVideoById } from '../data/videoMaterials.js';
import { t, getLocalizedModule } from '../utils/i18n.js';

/**
 * NetVerse - MateriViewer Component
 * Modul Pembelajaran Interaktif TKJ (Opsi Teks Bacaan & Video Praktik YouTube) & Kuis Diagnostik
 * Strictly adheres to Anti-Rounded Rules (max 12px containers, 8px buttons/inputs, 6px tags/badges).
 */

export function renderMateriViewer(
  moduls = [], 
  selectedIndex = 0, 
  learningProgress = {}, 
  quizAnswers = {}, 
  quizSubmitted = false, 
  quizOnly = false, 
  lang = 'id',
  materiFormat = 'teori',
  activeVideoId = null,
  isAuthenticated = false
) {
  const rawCurrentModul = moduls[selectedIndex] || {
    id: 'default-modul',
    slug: 'media-transmisi-utp',
    judul: 'Media Transmisi & Standar Pengkabelan UTP',
    deskripsi: 'Kenali jenis kabel twisted pair (UTP/STP) dan urutan warna T568A serta T568B.',
    xp_reward: 100,
    estimasi_menit: 15
  };

  const currentModul = getLocalizedModule(rawCurrentModul, lang);

  const defaultContent = {
    intro: currentModul.deskripsi || '',
    sections: currentModul.konten?.sections || [],
    checkpointQuestion: currentModul.konten?.checkpointQuestion || '',
    relatedAction: { label: 'simulasi crimping', targetNav: 'crimping' },
    quiz: []
  };

  const content = currentModul.konten || defaultContent;
  const sections = Array.isArray(content.sections) ? content.sections : [];
  const quizzes = getModuleQuizzes(currentModul, Array.isArray(content.quiz) ? content.quiz : [], lang);

  // Video resolution
  const matchingVideo = getVideoByModulSlug(currentModul.slug);
  const currentVideo = (activeVideoId ? getVideoById(activeVideoId) : null) || matchingVideo || VIDEO_MATERIALS[0];

  // Current module progress from Supabase state
  const currentProgress = learningProgress[currentModul.id] || { status: 'belum_mulai', skor_quiz: 0 };
  const isCompleted = currentProgress.status === 'selesai';

  // Overall syllabus completion rate
  const completedCount = moduls.filter(m => learningProgress[m.id]?.status === 'selesai').length;
  const overallPercentage = moduls.length > 0 ? Math.round((completedCount / moduls.length) * 100) : 0;

  // Quiz evaluation calculation
  const currentModuleAnswers = quizAnswers[currentModul.id] || {};
  let quizScore = 0;
  let correctCount = 0;
  if (quizzes.length > 0) {
    quizzes.forEach((q, qIdx) => {
      if (currentModuleAnswers[qIdx] === q.jawaban_benar) {
        correctCount++;
      }
    });
    quizScore = Math.round((correctCount / quizzes.length) * 100);
  }

  const relatedActionLabel = lang === 'en' ? '3D Crimping Simulator' : (lang === 'jp' ? '3D圧着シミュレータ' : (lang === 'cn' ? '3D网线压接实训' : 'simulasi crimping'));

  return `
    <div class="${quizOnly ? 'max-w-3xl mx-auto grid grid-cols-1' : 'grid grid-cols-1 lg:grid-cols-12'} gap-8 items-start pt-16 pb-16 animate-fadeIn">
      
      <!-- Module Navigation Sidebar (4 cols) -->
      <aside class="${quizOnly ? 'hidden' : 'lg:col-span-4 space-y-5'}">
        
        <!-- Syllabus List Card -->
        <div class="bezel-shell">
          <div class="bezel-core p-5 space-y-4">
            
            <!-- Curriculum Header & Overall Progress -->
            <div class="border-b border-white/[0.08] pb-3.5 space-y-2">
              <div class="flex items-center justify-between">
                <h3 class="text-xs font-bold text-white uppercase tracking-wider">${t('materi.sidebarTitle', lang)}</h3>
                <span class="text-[11px] font-mono font-semibold text-amber-400">${t('materi.completedOf', lang, { done: completedCount, total: moduls.length })}</span>
              </div>
              <div class="w-full bg-white/[0.06] rounded-md h-1.5 overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-md transition-all duration-500" style="width: ${overallPercentage}%"></div>
              </div>
            </div>

            <!-- Module Buttons List -->
            <div class="space-y-2">
              ${moduls.map((m, idx) => {
                const isSelected = idx === selectedIndex;
                const locMod = getLocalizedModule(m, lang);
                const mProg = learningProgress[m.id];
                const mDone = mProg?.status === 'selesai';
                const hasVideo = !!getVideoByModulSlug(m.slug);

                return `
                  <button
                    data-select-modul="${idx}"
                    class="w-full text-left p-3.5 rounded-lg text-xs transition-all border ${
                      isSelected
                        ? 'bg-white/10 text-white border-white/20 shadow-md font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border-transparent'
                    }"
                  >
                    <div class="flex items-center justify-between mb-1.5">
                      <div class="flex items-center gap-1.5">
                        <span class="${isSelected ? 'text-amber-400' : 'text-slate-500'} font-medium">${t('materi.module', lang, { num: idx + 1 })}</span>
                        ${mDone ? `
                          <span class="px-1.5 py-0.2 rounded-md text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            ${t('materi.completedBadge', lang)}
                          </span>
                        ` : ''}
                        ${hasVideo ? `
                          <span class="px-1.5 py-0.2 rounded-md text-[9px] font-bold bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-0.5">
                            <span>▶</span>
                            <span>Video</span>
                          </span>
                        ` : ''}
                      </div>
                      <span class="text-slate-500 font-mono text-[10px]">${t('materi.estimatedTime', lang, { min: m.estimasi_menit || 10 })}</span>
                    </div>
                    <div class="line-clamp-1 text-slate-200 text-xs font-medium">${locMod.judul}</div>
                    <div class="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                      <span>${t('materi.xpReward', lang, { xp: m.xp_reward || 100 })}</span>
                      <span>${mProg?.skor_quiz ? `${t('materi.score', lang, { score: mProg.skor_quiz })}` : ''}</span>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>

            <!-- YouTube Video Materials Section in Sidebar -->
            <div class="pt-4 border-t border-white/[0.08] space-y-2.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="text-red-500 text-xs">▶</span>
                  <h4 class="text-xs font-bold text-white uppercase tracking-wider">${t('materi.videoSidebarTitle', lang)}</h4>
                </div>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">2 Videos</span>
              </div>
              <p class="text-[11px] text-slate-400 leading-relaxed">
                ${t('materi.videoSidebarDesc', lang)}
              </p>

              <div class="space-y-1.5">
                ${VIDEO_MATERIALS.map(v => {
                  const isCurrentActive = materiFormat === 'video' && currentVideo?.youtubeId === v.youtubeId;
                  return `
                    <button
                      type="button"
                      data-select-video="${v.youtubeId}"
                      class="w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isCurrentActive
                          ? 'bg-red-500/20 border-red-500/50 text-white font-medium shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.06]'
                      }"
                    >
                      <div class="min-w-0">
                        <div class="font-medium text-xs truncate ${isCurrentActive ? 'text-red-300 font-semibold' : 'text-slate-200'}">
                          ${v.title[lang] || v.title.id}
                        </div>
                        <div class="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <span>${v.channel}</span>
                          <span>•</span>
                          <span class="font-mono text-amber-400">${v.duration}</span>
                        </div>
                      </div>
                      <span class="text-slate-400 shrink-0 text-xs">&rarr;</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

          </div>
        </div>

      </aside>

      <!-- Main Reading & Quiz Canvas (8 cols) -->
      <main class="${quizOnly ? '' : 'lg:col-span-8'} bezel-shell">
        <div class="bezel-core p-6 sm:p-10 space-y-8">
          
          <!-- Header Banner -->
          <header class="border-b border-white/[0.08] pb-6 space-y-4">
            ${quizOnly ? `
              <button type="button" data-exit-quiz class="text-xs text-slate-300 hover:text-white font-medium transition-colors cursor-pointer">
                ${t('materi.backToMaterial', lang)}
              </button>
            ` : ''}
            
            <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div class="flex items-center space-x-2 text-amber-400 font-medium">
                <span>${t('materi.moduleHeader', lang, { current: selectedIndex + 1, total: moduls.length })}</span>
                <span>•</span>
                <span class="text-emerald-400 font-semibold font-mono">${t('materi.xpReward', lang, { xp: currentModul.xp_reward || 100 })}</span>
              </div>
              <div>
                ${isCompleted ? `
                  <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-sm bg-emerald-400"></span>
                    ${t('materi.completedScoreHeader', lang, { score: currentProgress.skor_quiz || 100 })}
                  </span>
                ` : `
                  <span class="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    ${currentProgress.status === 'sedang_belajar' ? t('materi.inProgressBadge', lang) : t('materi.notStartedBadge', lang)}
                  </span>
                `}
              </div>
            </div>

            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              ${currentModul.judul}
            </h1>
            
            ${!quizOnly ? `
              <p class="text-slate-400 text-sm leading-relaxed article-measure">
                ${content.intro || currentModul.deskripsi || ''}
              </p>

              <!-- Learning Format Selector (Theory vs YouTube Video) -->
              <div class="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div class="inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10" role="tablist" aria-label="${lang === 'en' ? 'Learning Format' : (lang === 'jp' ? '学習フォーマット' : (lang === 'cn' ? '学习形式' : 'Format Materi'))}">
                  <button
                    type="button"
                    data-materi-format="teori"
                    role="tab"
                    aria-selected="${materiFormat === 'teori'}"
                    class="min-h-11 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      materiFormat === 'teori'
                        ? 'bg-white text-black shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                    }"
                  >
                    <span>📖</span>
                    <span>${t('materi.modeTheory', lang)}</span>
                  </button>
                  <button
                    type="button"
                    data-materi-format="video"
                    data-video-id="${matchingVideo ? matchingVideo.youtubeId : currentVideo.youtubeId}"
                    role="tab"
                    aria-selected="${materiFormat === 'video'}"
                    class="min-h-11 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      materiFormat === 'video'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                    }"
                  >
                    <span>🎬</span>
                    <span>${t('materi.modeVideo', lang)}</span>
                    <span class="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase ${
                      materiFormat === 'video' ? 'bg-black/40 text-white' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }">YouTube</span>
                  </button>
                </div>

                ${matchingVideo && materiFormat === 'teori' ? `
                  <button
                    type="button"
                    data-materi-format="video"
                    data-video-id="${matchingVideo.youtubeId}"
                    class="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
                  >
                    <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>${t('materi.watchVideoVersion', lang)}</span>
                  </button>
                ` : ''}
              </div>
            ` : ''}
          </header>

          <!-- VIDEO LEARNING CANVAS -->
          ${materiFormat === 'video' && !quizOnly ? `
            <section class="space-y-6 animate-fadeIn">
              
              <!-- Video Player Shell -->
              <div class="rounded-xl overflow-hidden bg-black/90 border border-white/10 shadow-2xl">
                <!-- Top Player Metadata Bar -->
                <div class="px-4 py-3 bg-white/[0.03] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-sm bg-red-500 animate-pulse"></span>
                    <span class="font-bold text-white font-mono uppercase tracking-wider">${currentVideo.category[lang] || currentVideo.category.id}</span>
                    <span class="text-slate-500">•</span>
                    <span class="text-amber-400 font-semibold font-mono">${typeof currentVideo.duration === 'object' ? (currentVideo.duration[lang] || currentVideo.duration.id) : currentVideo.duration}</span>
                  </div>
                  <a 
                    href="${currentVideo.url}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="inline-flex items-center gap-1.5 text-slate-300 hover:text-white hover:underline transition-colors"
                  >
                    <span>${t('materi.watchOnYoutube', lang)}</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                </div>

                <!-- Responsive 16:9 Embedded YouTube Player -->
                <div class="relative w-full aspect-video bg-black">
                  <iframe
                    id="youtube-player-frame"
                    class="w-full h-full border-0"
                    src="https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?rel=0&modestbranding=1"
                    title="${currentVideo.title[lang] || currentVideo.title.id}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>

                <!-- Sub-bar Channel Info & Practice Trigger -->
                <div class="p-4 bg-white/[0.02] border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-base shrink-0">
                      ▶
                    </div>
                    <div>
                      <h3 class="text-xs sm:text-sm font-bold text-white">${currentVideo.title[lang] || currentVideo.title.id}</h3>
                      <div class="text-[11px] text-slate-400 mt-0.5">
                        <span>${t('materi.videoAuthor', lang)}</span> 
                        <a href="${currentVideo.channelUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-200 hover:text-white font-medium hover:underline">${currentVideo.channel}</a>
                      </div>
                    </div>
                  </div>
                  
                  ${currentVideo.actionLink ? `
                    <button
                      type="button"
                      data-nav="${currentVideo.actionLink.type}"
                      ${currentVideo.actionLink.deviceCode ? `data-device-code="${currentVideo.actionLink.deviceCode}"` : ''}
                      class="rounded-lg px-4 py-2.5 bg-white text-black hover:bg-slate-200 text-xs font-semibold transition-all shadow-md inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <span>${currentVideo.actionLink.label[lang] || currentVideo.actionLink.label.id}</span>
                      <span>&rarr;</span>
                    </button>
                  ` : ''}
                </div>
              </div>

              <!-- Practical Summary & Step-by-Step Takeaways -->
              <div class="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <span class="w-1.5 h-4 rounded-sm bg-amber-400"></span>
                    ${t('materi.videoTakeaways', lang)}
                  </h3>
                  <span class="text-[10px] text-slate-400 font-mono">${t('materi.practicalGuide', lang)}</span>
                </div>
                
                <p class="text-xs text-slate-300 leading-relaxed">
                  ${currentVideo.summary[lang] || currentVideo.summary.id}
                </p>

                <!-- Key Takeaways Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  ${currentVideo.keyTakeaways.map((kp, kpIdx) => `
                    <div class="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-1.5">
                      <div class="flex items-center gap-2">
                        <span class="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold font-mono flex items-center justify-center shrink-0">
                          ${kpIdx + 1}
                        </span>
                        <span class="text-xs font-bold text-white">${kp.title[lang] || kp.title.id}</span>
                      </div>
                      <p class="text-[11px] text-slate-400 leading-relaxed pl-7">
                        ${kp.desc[lang] || kp.desc.id}
                      </p>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Quick Video Switcher -->
              <div class="p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-3">
                <span class="text-[11px] font-bold text-slate-300 uppercase tracking-wider">${t('materi.relatedVideos', lang)}</span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  ${VIDEO_MATERIALS.map(v => {
                    const isCurrentActive = v.youtubeId === currentVideo.youtubeId;
                    return `
                      <button
                        type="button"
                        data-select-video="${v.youtubeId}"
                        class="p-3 rounded-lg border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                          isCurrentActive 
                            ? 'bg-amber-400/15 border-amber-400/50 text-white font-medium shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]'
                        }"
                      >
                        <div class="flex items-center gap-2.5 min-w-0">
                          <span class="text-base text-red-500 shrink-0">▶</span>
                          <div class="min-w-0">
                            <div class="text-xs font-semibold truncate ${isCurrentActive ? 'text-amber-300' : 'text-slate-200'}">
                              ${v.title[lang] || v.title.id}
                            </div>
                            <div class="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <span>${v.channel}</span>
                              <span>•</span>
                              <span>${typeof v.duration === 'object' ? (v.duration[lang] || v.duration.id) : v.duration}</span>
                            </div>
                          </div>
                        </div>
                        ${isCurrentActive ? `<span class="text-amber-400 font-bold text-xs shrink-0">${t('materi.activeBadge', lang)}</span>` : '<span class="text-xs text-slate-500 shrink-0">&rarr;</span>'}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

            </section>
          ` : ''}

          <!-- READING & THEORY SECTIONS (When in 'teori' format) -->
          ${materiFormat === 'teori' && !quizOnly ? `
            <div class="space-y-8 animate-fadeIn">
              
              <!-- Spotlight Banner for YouTube Tutorial (if module has a video) -->
              ${matchingVideo ? `
                <div class="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-black/50 to-black/30 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold text-base shrink-0">
                      ▶
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-[10px] uppercase font-bold text-red-400 tracking-wider font-mono">${t('materi.videoBadge', lang)}</span>
                        <span class="text-slate-500">•</span>
                        <span class="text-[11px] text-slate-400 truncate">${matchingVideo.channel}</span>
                      </div>
                      <h4 class="text-xs sm:text-sm font-bold text-white truncate">${matchingVideo.title[lang] || matchingVideo.title.id}</h4>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-materi-format="video"
                    data-video-id="${matchingVideo.youtubeId}"
                    class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>${t('materi.watchVideo', lang)}</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              ` : ''}

              <!-- Reading Sections -->
              <div class="space-y-8 text-slate-300 text-sm leading-relaxed article-measure">
                ${sections.map((sec) => `
                  <section class="space-y-3">
                    <div class="flex items-center gap-2">
                      <span class="w-1 h-4 rounded-sm bg-amber-400"></span>
                      <h2 class="text-base sm:text-lg font-bold text-white tracking-tight">${sec.title}</h2>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-xs sm:text-sm pl-3 border-l border-white/[0.06]">
                      ${sec.body}
                    </p>
                  </section>
                `).join('')}
              </div>

              <!-- Socratic Checkpoint Callout -->
              <section class="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3.5">
                <div class="flex items-center justify-between">
                  <div class="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-sm bg-amber-400"></span>
                    ${t('materi.thinkTitle', lang)}
                  </div>
                  <span class="text-[10px] text-slate-400 font-mono">${t('materi.thinkSub', lang)}</span>
                </div>
                <p class="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed italic bg-black/40 p-3 rounded-lg border border-white/[0.05]">
                  "${content.checkpointQuestion || ''}"
                </p>
                <div class="pt-1 flex flex-wrap items-center gap-3">
                  <button 
                    id="btn-trigger-ai-checkpoint" 
                    data-question="${encodeURIComponent(content.checkpointQuestion || '')}" 
                    class="rounded-lg px-4 py-2 bg-white text-black hover:bg-slate-200 text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    ${t('materi.discussAi', lang)}
                  </button>
                  <span class="text-[11px] text-slate-400">${t('materi.discussDesc', lang)}</span>
                </div>
              </section>

              <!-- Quiz Invitation Banner -->
              ${quizzes.length >= 5 ? `
                <section class="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 class="text-sm font-semibold text-white">${t('materi.quizReady', lang)}</h2>
                    <p class="mt-1 text-xs text-slate-400">${t('materi.quizCountDesc', lang, { count: quizzes.length })}</p>
                  </div>
                  <button type="button" data-enter-quiz class="min-h-11 px-4 rounded-lg bg-white text-black hover:bg-slate-200 text-xs font-semibold transition-colors shrink-0 cursor-pointer">
                    ${t('materi.startQuiz', lang)}
                  </button>
                </section>
              ` : ''}

            </div>
          ` : ''}

          <!-- Formative Assessment Quiz Section -->
          ${quizzes.length >= 5 && quizOnly ? `
            <section id="section-quiz-evaluasi" class="p-6 rounded-xl bg-black/60 border border-white/10 space-y-6">
              
              <!-- Quiz Section Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
                <div>
                  <h3 class="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <span class="w-2 h-2 rounded-sm bg-emerald-400"></span>
                    ${t('materi.quizTitle', lang, { num: selectedIndex + 1 })}
                  </h3>
                  <p class="text-xs text-slate-400 mt-0.5">${t('materi.quizSubtitle', lang, { xp: currentModul.xp_reward || 100 })}</p>
                </div>
                ${quizSubmitted ? `
                  <div class="flex flex-wrap items-center gap-2">
                    <div class="px-3 py-1.5 rounded-md text-xs font-bold font-mono ${
                      quizScore >= 75 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }">
                      ${t('materi.quizScoreSummary', lang, { score: quizScore, correct: correctCount, total: quizzes.length })}
                    </div>
                    ${quizScore > 0 ? `
                      <div class="px-2.5 py-1.5 rounded-md text-xs font-bold font-mono bg-amber-400/15 text-amber-300 border border-amber-400/40 flex items-center gap-1 shadow-sm">
                        <span class="text-amber-400">⚡</span>
                        <span>+${quizScore} XP</span>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
              </div>

              ${!isAuthenticated ? `
                <!-- Guest Quiz Lock Banner -->
                <div class="rounded-xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-amber-500/5">
                  <div class="flex items-start gap-3.5">
                    <div class="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 text-lg shrink-0 mt-0.5">
                      🔒
                    </div>
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <h4 class="text-sm font-bold text-white tracking-tight">${t('materi.guestQuizLockTitle', lang)}</h4>
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">${t('crimping.guestBadge', lang)}</span>
                      </div>
                      <p class="text-xs text-slate-300 leading-relaxed max-w-2xl">
                        ${t('materi.guestQuizLockDesc', lang)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="btn-guest-unlock-quiz"
                    class="rounded-lg px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>${t('materi.guestQuizLockBtn', lang)}</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              ` : ''}

              <!-- Questions List -->
              <div class="space-y-6">
                ${quizzes.map((quiz, qIdx) => {
                  const selectedOpt = currentModuleAnswers[qIdx];
                  const hasAnswered = selectedOpt !== undefined;
                  const isCorrect = hasAnswered && selectedOpt === quiz.jawaban_benar;

                  return `
                    <div class="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-3">
                      <div class="flex items-start gap-2.5">
                        <span class="w-5 h-5 rounded-md bg-white/10 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          ${qIdx + 1}
                        </span>
                        <div class="flex-1 min-w-0">
                          <p class="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                            ${quiz.soal}
                          </p>
                        </div>
                      </div>

                      <!-- Options List -->
                      <div class="space-y-2 pt-1 pl-7">
                        ${quiz.pilihan.map((pilihanText, optIdx) => {
                          const isOptionChosen = selectedOpt === optIdx;
                          let optionClasses = 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-amber-400/50 hover:bg-white/[0.05]';

                          if (quizSubmitted) {
                            if (optIdx === quiz.jawaban_benar) {
                              optionClasses = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-semibold';
                            } else if (isOptionChosen && !isCorrect) {
                              optionClasses = 'bg-rose-500/15 border-rose-500/50 text-rose-300';
                            } else {
                              optionClasses = 'bg-white/[0.01] border-white/[0.04] text-slate-500 opacity-60';
                            }
                          } else if (isOptionChosen) {
                            optionClasses = 'bg-amber-400/10 border-amber-400 text-white font-medium shadow-sm';
                          }

                          return `
                            <button
                              type="button"
                              data-quiz-q="${qIdx}"
                              data-quiz-opt="${optIdx}"
                              ${quizSubmitted ? 'disabled' : ''}
                              class="w-full text-left p-3 rounded-md border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${optionClasses}"
                            >
                              <span class="w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 text-[10px] font-mono mt-0.5 ${
                                isOptionChosen ? 'border-amber-400 bg-amber-400 text-black font-bold' : 'border-white/20 text-slate-400'
                              }">
                                ${String.fromCharCode(65 + optIdx)}
                              </span>
                              <span class="leading-relaxed">${pilihanText}</span>
                            </button>
                          `;
                        }).join('')}
                      </div>

                      <!-- Socratic Post-Submission Explanation -->
                      ${quizSubmitted ? `
                        <div class="mt-3 p-3.5 rounded-lg border text-xs leading-relaxed ${
                          isCorrect 
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                            : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                        }">
                          <div class="flex items-center gap-1.5 font-bold mb-1">
                            <span>${isCorrect ? t('materi.answerCorrect', lang) : t('materi.answerWrong', lang)}</span>
                          </div>
                          <p class="text-[11px] leading-relaxed opacity-90">${quiz.penjelasan}</p>
                        </div>
                      ` : ''}

                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Quiz Action Buttons -->
              <div class="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06]">
                ${!quizSubmitted ? `
                  <button
                    id="btn-submit-quiz"
                    class="rounded-lg px-5 py-2.5 ${
                      isAuthenticated
                        ? 'bg-white text-black hover:bg-slate-200'
                        : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                    } text-xs font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                    title="${isAuthenticated ? t('materi.submitQuiz', lang) : t('materi.guestQuizLockTitle', lang)}"
                  >
                    <span>${isAuthenticated ? t('materi.submitQuiz', lang) : `🔒 ${t('materi.guestQuizLockBtn', lang)}`}</span>
                    <span class="font-mono text-slate-600">→</span>
                  </button>
                  <span class="text-xs text-slate-400">${isAuthenticated ? t('materi.answerAllNotice', lang) : t('materi.guestQuizLockDesc', lang)}</span>
                ` : `
                  <div class="flex flex-wrap items-center gap-3">
                    <button
                      id="btn-retry-quiz"
                      class="rounded-lg px-4 py-2 bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      ${t('materi.retryQuiz', lang)} ⟳
                    </button>
                    ${quizScore >= 50 ? `
                      <span class="text-xs text-emerald-400 font-medium">✓ ${t('materi.quizCompletedNotice', lang)}</span>
                    ` : `
                      <span class="text-xs text-amber-400 font-medium">${t('materi.quizFailedNotice', lang)}</span>
                    `}
                    ${quizScore > 0 ? `
                      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono font-bold text-xs">
                        <span class="text-amber-400">⚡</span>
                        <span>${t('materi.quizEarnedXpNotice', lang, { xp: quizScore })}</span>
                      </span>
                    ` : ''}
                  </div>
                `}
              </div>

            </section>
          ` : ''}

          <!-- Footer Actions & Links to 3D Workbench / Crimping -->
          ${!quizOnly ? `
            <footer class="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div>
                ${content.relatedAction ? `
                  <button 
                    data-nav="${content.relatedAction.targetNav}" 
                    class="rounded-lg px-4 py-2 bg-white/[0.05] hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>${t('materi.continueTo', lang, { target: relatedActionLabel })}</span>
                    <span>&rarr;</span>
                  </button>
                ` : ''}
              </div>

              <!-- Next Module Navigation -->
              ${selectedIndex < moduls.length - 1 ? `
                <button 
                  data-select-modul="${selectedIndex + 1}"
                  class="rounded-lg px-4 py-2 bg-white text-black hover:bg-slate-200 text-xs font-semibold transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>${t('materi.nextModule', lang, { num: selectedIndex + 2 })}</span>
                  <span>&rarr;</span>
                </button>
              ` : `
                <button 
                  data-nav="crimping"
                  class="rounded-lg px-4 py-2 bg-amber-400 text-black hover:bg-amber-300 text-xs font-semibold transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>${t('materi.tryCrimping', lang)}</span>
                  <span>★</span>
                </button>
              `}
            </footer>
          ` : ''}

        </div>
      </main>

    </div>
  `;
}
