/**
 * ThemeAtmosphere.js
 * Renders rich, vibrant ("jreng"), yet tastefully balanced atmospheric ambient visual elements
 * for specific themes:
 * - midnight: Preserved exactly as requested (Moon + Aurora + Meteors + Network Constellation)
 * - emerald: Elevated enchanted forest (Canopy sunbeams + hanging vines & dewdrops + falling leaves + glowing fungi + spirit wisps + 3-tier forest & fireflies)
 * - violet: Preserved exactly as requested (Cosmic nebula + cyber streams + crystals & stardust)
 * - sakura: Elevated cyber sakura (Mount Fuji + Torii gate + cyber Sakura Moon & clouds + blooming branch + whole 5-petal blossoms + wind breeze ribbons + falling petals)
 * - light & dark: Clean minimal substrate, zero extra elements
 */

export function renderThemeAtmosphere(theme = 'dark') {
  if (theme === 'light' || theme === 'dark') {
    return `<div id="theme-atmosphere" class="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" aria-hidden="true"></div>`;
  }

  let content = '';

  if (theme === 'midnight') {
    content = `
      <!-- Ambient Aurora Borealis Wave across upper sky -->
      <div class="absolute -top-10 left-0 right-0 h-72 anim-aurora pointer-events-none opacity-40">
        <svg viewBox="0 0 1440 280" preserveAspectRatio="none" class="w-full h-full">
          <defs>
            <linearGradient id="aurora-grad-1" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0" />
              <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.35" />
              <stop offset="65%" stop-color="#06b6d4" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="aurora-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0" />
              <stop offset="50%" stop-color="#22d3ee" stop-opacity="0.25" />
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,80 Q360,190 720,100 T1440,120 L1440,0 L0,0 Z" fill="url(#aurora-grad-1)"/>
          <path d="M0,120 Q480,40 960,130 T1440,70 L1440,0 L0,0 Z" fill="url(#aurora-grad-2)"/>
        </svg>
      </div>

      <!-- Celestial Crescent Moon with Radiant Corona Ring -->
      <div class="absolute top-14 right-6 sm:right-14 md:right-20 w-24 h-24 pointer-events-none">
        <!-- Outer Soft Corona Glow -->
        <div class="absolute -inset-3 rounded-full bg-sky-400/10 blur-xl anim-moon"></div>
        <div class="absolute inset-1 rounded-full border border-sky-300/20 bg-sky-500/5 anim-moon"></div>
        
        <!-- Glowing Crescent Moon SVG -->
        <svg viewBox="0 0 100 100" class="w-full h-full text-sky-200 fill-current drop-shadow-[0_0_22px_rgba(56,189,248,0.7)] anim-moon">
          <defs>
            <linearGradient id="moon-luminous" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f0f9ff" />
              <stop offset="40%" stop-color="#bae6fd" />
              <stop offset="85%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
          </defs>
          <!-- Crescent Moon Shape -->
          <path d="M50 10 A40 40 0 1 0 90 50 A32 32 0 1 1 50 10 Z" fill="url(#moon-luminous)"/>
          <!-- Subtle Lunar Crater Details -->
          <circle cx="36" cy="46" r="3.5" fill="#0284c7" opacity="0.35"/>
          <circle cx="44" cy="62" r="2.5" fill="#0284c7" opacity="0.3"/>
          <circle cx="32" cy="68" r="2" fill="#0284c7" opacity="0.25"/>
        </svg>
      </div>

      <!-- Periodic Shooting Stars (Meteors) -->
      <div class="absolute top-8 right-1/4 w-36 h-0.5 bg-gradient-to-l from-sky-200 via-cyan-400 to-transparent anim-meteor-1 pointer-events-none"></div>
      <div class="absolute top-28 right-1/2 w-48 h-0.5 bg-gradient-to-l from-white via-sky-300 to-transparent anim-meteor-2 pointer-events-none"></div>

      <!-- Dense Constellation & Twinkling Celestial Star Field -->
      <div class="absolute inset-0">
        <!-- Diamond 4-Point Sparkle Stars -->
        <svg class="absolute top-[14%] left-[12%] w-4 h-4 text-sky-100 anim-diamond-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/>
        </svg>
        <svg class="absolute top-[26%] left-[68%] w-3.5 h-3.5 text-cyan-200 anim-diamond-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/>
        </svg>
        <svg class="absolute top-[64%] left-[34%] w-4 h-4 text-sky-200 anim-diamond-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/>
        </svg>
        <svg class="absolute top-[45%] left-[88%] w-3 h-3 text-white anim-diamond-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/>
        </svg>

        <!-- Luminous Twinkling Star Particles -->
        <span class="absolute top-[9%] left-[22%] w-2 h-2 rounded-full bg-white anim-star-1 shadow-[0_0_10px_#fff]"></span>
        <span class="absolute top-[18%] left-[38%] w-1.5 h-1.5 rounded-full bg-sky-200 anim-star-2 shadow-[0_0_8px_#38bdf8]"></span>
        <span class="absolute top-[22%] left-[54%] w-2 h-2 rounded-full bg-cyan-200 anim-star-3 shadow-[0_0_10px_#06b6d4]"></span>
        <span class="absolute top-[15%] left-[82%] w-1.5 h-1.5 rounded-full bg-white anim-star-1 shadow-[0_0_8px_#fff]"></span>
        
        <span class="absolute top-[34%] left-[8%] w-1.5 h-1.5 rounded-full bg-sky-300 anim-star-2 shadow-[0_0_8px_#38bdf8]"></span>
        <span class="absolute top-[38%] left-[28%] w-2 h-2 rounded-full bg-cyan-100 anim-star-1 shadow-[0_0_10px_#22d3ee]"></span>
        <span class="absolute top-[42%] left-[48%] w-1 h-1 rounded-full bg-white anim-star-3 shadow-[0_0_6px_#fff]"></span>
        <span class="absolute top-[36%] left-[76%] w-2 h-2 rounded-full bg-sky-200 anim-star-2 shadow-[0_0_10px_#38bdf8]"></span>
        
        <span class="absolute top-[52%] left-[16%] w-2 h-2 rounded-full bg-cyan-300 anim-star-3 shadow-[0_0_10px_#06b6d4]"></span>
        <span class="absolute top-[58%] left-[62%] w-1.5 h-1.5 rounded-full bg-white anim-star-1 shadow-[0_0_8px_#fff]"></span>
        <span class="absolute top-[54%] left-[92%] w-2 h-2 rounded-full bg-sky-200 anim-star-2 shadow-[0_0_10px_#38bdf8]"></span>
        
        <span class="absolute top-[70%] left-[10%] w-1.5 h-1.5 rounded-full bg-sky-100 anim-star-1 shadow-[0_0_8px_#bae6fd]"></span>
        <span class="absolute top-[75%] left-[44%] w-2 h-2 rounded-full bg-cyan-200 anim-star-2 shadow-[0_0_10px_#06b6d4]"></span>
        <span class="absolute top-[68%] left-[78%] w-1.5 h-1.5 rounded-full bg-white anim-star-3 shadow-[0_0_8px_#fff]"></span>
        
        <span class="absolute top-[84%] left-[20%] w-2 h-2 rounded-full bg-sky-300 anim-star-2 shadow-[0_0_10px_#38bdf8]"></span>
        <span class="absolute top-[88%] left-[58%] w-1.5 h-1.5 rounded-full bg-cyan-100 anim-star-1 shadow-[0_0_8px_#22d3ee]"></span>
        <span class="absolute top-[82%] left-[86%] w-2 h-2 rounded-full bg-white anim-star-3 shadow-[0_0_10px_#fff]"></span>

        <!-- Network Constellation Topology Graph Lines (Computer Network in the Stars) -->
        <svg class="absolute inset-0 w-full h-full stroke-sky-400/35 stroke-[1] stroke-dasharray-[4_4]">
          <line x1="12%" y1="14%" x2="22%" y2="9%" />
          <line x1="22%" y1="9%" x2="38%" y2="18%" />
          <line x1="38%" y1="18%" x2="54%" y2="22%" />
          <line x1="54%" y1="22%" x2="68%" y2="26%" />
          <line x1="68%" y1="26%" x2="76%" y2="36%" />
          <line x1="38%" y1="18%" x2="28%" y2="38%" />
          <line x1="28%" y1="38%" x2="34%" y2="64%" />
          <line x1="34%" y1="64%" x2="44%" y2="75%" />
          <line x1="76%" y1="36%" x2="62%" y2="58%" />
          <line x1="62%" y1="58%" x2="78%" y2="68%" />
        </svg>
      </div>
    `;
  } else if (theme === 'emerald') {
    content = `
      <!-- Ethereal Emerald Canopy God Rays (Filtering Moonlight Shafts) -->
      <div class="absolute -top-12 -left-12 w-[600px] h-[600px] pointer-events-none anim-sunbeam opacity-30">
        <svg viewBox="0 0 600 600" class="w-full h-full">
          <defs>
            <linearGradient id="emerald-ray-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#34d399" stop-opacity="0.5" />
              <stop offset="40%" stop-color="#10b981" stop-opacity="0.25" />
              <stop offset="85%" stop-color="#059669" stop-opacity="0" />
            </linearGradient>
          </defs>
          <polygon points="0,0 280,600 160,600" fill="url(#emerald-ray-1)"/>
          <polygon points="0,0 460,540 360,570" fill="url(#emerald-ray-1)" opacity="0.7"/>
          <polygon points="0,0 580,380 520,440" fill="url(#emerald-ray-1)" opacity="0.5"/>
        </svg>
      </div>

      <!-- Hanging Enchanted Canopy Vines & Luminous Dew (Framing Top Corners) -->
      <div class="absolute top-0 left-0 w-48 h-40 pointer-events-none anim-vine opacity-75">
        <svg viewBox="0 0 200 160" class="w-full h-full fill-none stroke-[#022c16] stroke-[2.5] stroke-linecap-round">
          <path d="M0,0 Q30,60 15,110 T35,150" />
          <path d="M40,0 Q65,45 55,95 T70,130" stroke-width="2" />
          <path d="M80,0 Q95,35 90,75" stroke-width="1.5" />
        </svg>
        <!-- Glowing Dew Berries -->
        <span class="absolute top-[108px] left-[13px] w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_#34d399] anim-spore-pulse"></span>
        <span class="absolute top-[128px] left-[68px] w-1.5 h-1.5 rounded-full bg-mint-300 shadow-[0_0_6px_#6ee7b7] anim-spore-pulse" style="animation-delay: 1.5s;"></span>
        <span class="absolute top-[72px] left-[88px] w-1.5 h-1.5 rounded-full bg-lime-300 shadow-[0_0_6px_#a3e635] anim-spore-pulse" style="animation-delay: 2.8s;"></span>
      </div>
      <div class="absolute top-0 right-0 w-44 h-36 pointer-events-none anim-vine opacity-70 scale-x-[-1]">
        <svg viewBox="0 0 180 150" class="w-full h-full fill-none stroke-[#022c16] stroke-[2] stroke-linecap-round">
          <path d="M0,0 Q25,50 18,95 T30,135" />
          <path d="M45,0 Q60,40 50,80" stroke-width="1.5" />
        </svg>
        <span class="absolute top-[92px] left-[16px] w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] anim-spore-pulse" style="animation-delay: 0.8s;"></span>
        <span class="absolute top-[78px] left-[48px] w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_6px_#2dd4bf] anim-spore-pulse" style="animation-delay: 2.2s;"></span>
      </div>

      <!-- Enchanted Falling Forest Leaves (Gentle Horizontal Sway Drift) -->
      <div class="absolute -top-6 left-[18%] anim-leaf-1 pointer-events-none">
        <svg class="w-4 h-4 text-emerald-400/80 fill-current drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" viewBox="0 0 24 24">
          <path d="M17,8 C8,10 5,16 5,22 C11,22 17,19 19,10 C19,9 18,8 17,8 Z"/>
        </svg>
      </div>
      <div class="absolute -top-6 left-[38%] anim-leaf-2 pointer-events-none">
        <svg class="w-3.5 h-3.5 text-lime-300/80 fill-current drop-shadow-[0_0_6px_rgba(163,230,53,0.5)]" viewBox="0 0 24 24">
          <path d="M17,8 C8,10 5,16 5,22 C11,22 17,19 19,10 C19,9 18,8 17,8 Z"/>
        </svg>
      </div>
      <div class="absolute -top-6 left-[62%] anim-leaf-3 pointer-events-none">
        <svg class="w-4 h-4 text-teal-300/75 fill-current drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]" viewBox="0 0 24 24">
          <path d="M17,8 C8,10 5,16 5,22 C11,22 17,19 19,10 C19,9 18,8 17,8 Z"/>
        </svg>
      </div>
      <div class="absolute -top-6 left-[82%] anim-leaf-4 pointer-events-none">
        <svg class="w-3.5 h-3.5 text-emerald-300/80 fill-current drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" viewBox="0 0 24 24">
          <path d="M17,8 C8,10 5,16 5,22 C11,22 17,19 19,10 C19,9 18,8 17,8 Z"/>
        </svg>
      </div>

      <!-- Layered 3-Tier Enchanted Forest Canopy Horizon -->
      <div class="absolute bottom-0 left-0 right-0 h-48 sm:h-64 pointer-events-none flex items-end">
        <svg viewBox="0 0 1440 240" preserveAspectRatio="none" class="w-full h-full">
          <!-- Tier 1: Distant Misty Pine Mountain Silhouette -->
          <path d="M0,240 L0,120 Q180,80 360,130 T720,95 T1080,125 T1440,90 L1440,240 Z" fill="#011409" opacity="0.45"/>
          
          <!-- Tier 2: Mid-ground Pine Forest Treeline -->
          <path d="M0,240 L0,150 L30,175 L55,130 L90,170 L130,120 L170,172 L210,138 L250,178 L295,125 L345,168 L390,132 L440,175 L495,115 L550,170 L605,128 L660,178 L715,120 L770,168 L815,132 L870,175 L920,122 L975,170 L1030,128 L1080,168 L1130,122 L1185,172 L1240,130 L1295,175 L1350,120 L1400,165 L1440,135 L1440,240 Z" fill="#021d0f" opacity="0.75"/>
          
          <!-- Tier 3: Foreground Detailed Spruce & Fir Silhouettes with Moss Accent -->
          <path d="M0,240 L0,175 L35,190 L70,155 L115,192 L165,150 L220,195 L275,160 L335,198 L395,162 L460,195 L525,152 L590,198 L655,158 L725,198 L790,160 L855,195 L915,155 L975,192 L1035,160 L1090,195 L1145,155 L1200,192 L1260,158 L1320,195 L1380,150 L1440,185 L1440,240 Z" fill="#010e07" opacity="0.95"/>
        </svg>
      </div>

      <!-- Bioluminescent Forest Floor Mist Drift -->
      <div class="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-emerald-950/80 via-emerald-900/20 to-transparent anim-mist-drift pointer-events-none"></div>

      <!-- Bioluminescent Mushroom Fungi Clusters on Forest Floor -->
      <div class="absolute bottom-3 left-[12%] pointer-events-none anim-shroom">
        <svg viewBox="0 0 40 40" class="w-8 h-8 drop-shadow-[0_0_10px_#10b981]">
          <path d="M8,26 Q14,14 20,26 Z" fill="#34d399"/>
          <rect x="13" y="26" width="2" height="8" fill="#047857"/>
          <path d="M22,28 Q27,18 32,28 Z" fill="#6ee7b7"/>
          <rect x="26" y="28" width="1.5" height="6" fill="#047857"/>
        </svg>
      </div>
      <div class="absolute bottom-3 right-[18%] pointer-events-none anim-shroom" style="animation-delay: 2s;">
        <svg viewBox="0 0 40 40" class="w-8 h-8 drop-shadow-[0_0_10px_#2dd4bf]">
          <path d="M10,25 Q16,15 22,25 Z" fill="#2dd4bf"/>
          <rect x="15" y="25" width="2" height="7" fill="#0f766e"/>
          <path d="M24,28 Q28,20 32,28 Z" fill="#a7f3d0"/>
          <rect x="27" y="28" width="1.5" height="5" fill="#0f766e"/>
        </svg>
      </div>

      <!-- Forest Spirit Wisps with Trailing Halos -->
      <div class="absolute top-[38%] left-[22%] w-4 h-4 rounded-full bg-emerald-400/90 shadow-[0_0_20px_#10b981] anim-wisp-1 pointer-events-none flex items-center justify-center">
        <span class="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]"></span>
      </div>
      <div class="absolute top-[56%] left-[78%] w-4 h-4 rounded-full bg-teal-400/90 shadow-[0_0_20px_#14b8a6] anim-wisp-2 pointer-events-none flex items-center justify-center">
        <span class="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]"></span>
      </div>

      <!-- Vibrant Swarm of 22+ Fireflies & Bioluminescent Spores -->
      <div class="absolute inset-0">
        <!-- Tier 1: Large Radiant Emerald & Lime Fireflies with Wandering Motion -->
        <span class="absolute bottom-[14%] left-[15%] w-3 h-3 rounded-full bg-emerald-400 anim-firefly-drift-1 shadow-[0_0_16px_#10b981]"></span>
        <span class="absolute bottom-[22%] left-[28%] w-2.5 h-2.5 rounded-full bg-lime-300 anim-firefly-drift-2 shadow-[0_0_14px_#a3e635]"></span>
        <span class="absolute bottom-[18%] left-[42%] w-3 h-3 rounded-full bg-mint-300 anim-firefly-drift-3 shadow-[0_0_16px_#34d399]"></span>
        <span class="absolute bottom-[26%] left-[58%] w-2.5 h-2.5 rounded-full bg-emerald-300 anim-firefly-drift-1 shadow-[0_0_14px_#10b981]"></span>
        <span class="absolute bottom-[16%] left-[72%] w-3 h-3 rounded-full bg-teal-300 anim-firefly-drift-2 shadow-[0_0_16px_#2dd4bf]"></span>
        <span class="absolute bottom-[24%] left-[86%] w-2.5 h-2.5 rounded-full bg-lime-400 anim-firefly-drift-3 shadow-[0_0_14px_#a3e635]"></span>

        <!-- Tier 2: Mid-Height Bioluminescent Spores Rising -->
        <span class="absolute bottom-[35%] left-[20%] w-2 h-2 rounded-full bg-emerald-300 anim-firefly-1 shadow-[0_0_10px_#34d399]"></span>
        <span class="absolute bottom-[40%] left-[36%] w-1.5 h-1.5 rounded-full bg-teal-400 anim-firefly-2 shadow-[0_0_8px_#14b8a6]"></span>
        <span class="absolute bottom-[32%] left-[50%] w-2 h-2 rounded-full bg-lime-300 anim-firefly-3 shadow-[0_0_10px_#a3e635]"></span>
        <span class="absolute bottom-[44%] left-[66%] w-2 h-2 rounded-full bg-emerald-400 anim-firefly-1 shadow-[0_0_10px_#10b981]"></span>
        <span class="absolute bottom-[38%] left-[80%] w-1.5 h-1.5 rounded-full bg-emerald-300 anim-firefly-2 shadow-[0_0_8px_#34d399]"></span>
        <span class="absolute bottom-[42%] left-[92%] w-2 h-2 rounded-full bg-teal-300 anim-firefly-3 shadow-[0_0_10px_#2dd4bf]"></span>

        <!-- Tier 3: Upper Canopy Floating Micro Spores -->
        <span class="absolute top-[28%] left-[12%] w-1.5 h-1.5 rounded-full bg-emerald-300 anim-spore-pulse shadow-[0_0_8px_#10b981]"></span>
        <span class="absolute top-[34%] left-[25%] w-2 h-2 rounded-full bg-mint-400 anim-firefly-drift-2 shadow-[0_0_10px_#34d399]"></span>
        <span class="absolute top-[22%] left-[45%] w-1.5 h-1.5 rounded-full bg-lime-200 anim-spore-pulse shadow-[0_0_8px_#a3e635]"></span>
        <span class="absolute top-[38%] left-[60%] w-2 h-2 rounded-full bg-emerald-400 anim-firefly-drift-1 shadow-[0_0_10px_#10b981]"></span>
        <span class="absolute top-[26%] left-[75%] w-1.5 h-1.5 rounded-full bg-teal-300 anim-spore-pulse shadow-[0_0_8px_#2dd4bf]"></span>
        <span class="absolute top-[32%] left-[88%] w-2 h-2 rounded-full bg-emerald-300 anim-firefly-drift-3 shadow-[0_0_10px_#34d399]"></span>

        <!-- Ambient Forest Flora Spores in Center Screen -->
        <span class="absolute top-[48%] left-[18%] w-1 h-1 rounded-full bg-lime-300 anim-firefly-1 shadow-[0_0_6px_#a3e635]"></span>
        <span class="absolute top-[52%] left-[54%] w-1.5 h-1.5 rounded-full bg-emerald-400 anim-firefly-2 shadow-[0_0_8px_#10b981]"></span>
        <span class="absolute top-[46%] left-[82%] w-1 h-1 rounded-full bg-teal-200 anim-firefly-3 shadow-[0_0_6px_#2dd4bf]"></span>
        <span class="absolute top-[60%] left-[38%] w-1.5 h-1.5 rounded-full bg-emerald-300 anim-spore-pulse shadow-[0_0_8px_#34d399]"></span>
      </div>
    `;
  } else if (theme === 'violet') {
    content = `
      <!-- Cosmic Deep Purple Nebula Glow - 3 Radiant Spatial Clouds -->
      <div class="absolute -top-36 left-1/6 w-[700px] h-[700px] rounded-full bg-purple-600/25 blur-[130px] anim-nebula pointer-events-none"></div>
      <div class="absolute top-1/3 -right-36 w-[600px] h-[600px] rounded-full bg-fuchsia-600/20 blur-[120px] anim-nebula pointer-events-none" style="animation-delay: -4s;"></div>
      <div class="absolute bottom-10 left-10 w-[550px] h-[550px] rounded-full bg-violet-600/20 blur-[110px] anim-nebula pointer-events-none" style="animation-delay: -7s;"></div>

      <!-- Cyber Data Stream Fiber Optics (High-Tech Matrix Rays) -->
      <div class="absolute top-0 left-[18%] w-px h-full bg-gradient-to-b from-transparent via-purple-500/25 to-transparent pointer-events-none">
        <div class="w-1.5 h-20 -left-[2px] bg-gradient-to-b from-transparent via-purple-300 to-fuchsia-400 anim-cyber-beam rounded-full shadow-[0_0_10px_#c084fc]"></div>
      </div>
      <div class="absolute top-0 left-[78%] w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/25 to-transparent pointer-events-none">
        <div class="w-1.5 h-24 -left-[2px] bg-gradient-to-b from-transparent via-fuchsia-300 to-purple-400 anim-cyber-beam rounded-full shadow-[0_0_10px_#e879f9]" style="animation-delay: 2.2s;"></div>
      </div>

      <!-- Floating Crystalline Stardust & Geometric Cyber Nodes -->
      <div class="absolute inset-0">
        <!-- Octahedral Crystals & Diamond Prisms -->
        <div class="absolute top-[16%] left-[16%] w-4 h-4 border-2 border-purple-300/70 rotate-45 anim-crystal-1 shadow-[0_0_12px_rgba(192,132,252,0.6)]"></div>
        <div class="absolute top-[28%] left-[72%] w-3.5 h-3.5 border-2 border-fuchsia-300/70 rotate-12 anim-crystal-2 shadow-[0_0_12px_rgba(232,121,249,0.6)]"></div>
        <div class="absolute top-[48%] left-[26%] w-3 h-3 border border-purple-200/80 rotate-45 anim-crystal-1 shadow-[0_0_10px_rgba(216,180,254,0.6)]"></div>
        <div class="absolute top-[62%] left-[84%] w-4 h-4 border-2 border-violet-300/70 rotate-30 anim-crystal-2 shadow-[0_0_14px_rgba(168,85,247,0.6)]"></div>
        <div class="absolute top-[78%] left-[38%] w-3.5 h-3.5 border-2 border-purple-400/70 rotate-45 anim-crystal-1 shadow-[0_0_10px_rgba(192,132,252,0.6)]"></div>
        <div class="absolute top-[84%] left-[68%] w-3 h-3 border border-fuchsia-300/80 rotate-12 anim-crystal-2 shadow-[0_0_10px_rgba(232,121,249,0.6)]"></div>

        <!-- Diamond Sparkles -->
        <svg class="absolute top-[22%] left-[34%] w-4 h-4 text-purple-200 anim-diamond-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/>
        </svg>
        <svg class="absolute top-[42%] left-[64%] w-4 h-4 text-fuchsia-200 anim-diamond-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/>
        </svg>
        <svg class="absolute top-[72%] left-[14%] w-3.5 h-3.5 text-violet-200 anim-diamond-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"/>
        </svg>

        <!-- Vivid Ultraviolet Stardust Particles -->
        <span class="absolute top-[12%] left-[48%] w-2 h-2 rounded-full bg-purple-300 anim-star-1 shadow-[0_0_8px_#c084fc]"></span>
        <span class="absolute top-[24%] left-[88%] w-1.5 h-1.5 rounded-full bg-fuchsia-300 anim-star-2 shadow-[0_0_8px_#e879f9]"></span>
        <span class="absolute top-[36%] left-[10%] w-2 h-2 rounded-full bg-violet-200 anim-star-3 shadow-[0_0_10px_#ddd6fe]"></span>
        <span class="absolute top-[54%] left-[44%] w-1.5 h-1.5 rounded-full bg-purple-300 anim-star-1 shadow-[0_0_8px_#c084fc]"></span>
        <span class="absolute top-[66%] left-[58%] w-2 h-2 rounded-full bg-fuchsia-200 anim-star-2 shadow-[0_0_10px_#f5d0fe]"></span>
        <span class="absolute top-[82%] left-[22%] w-1.5 h-1.5 rounded-full bg-purple-400 anim-star-3 shadow-[0_0_8px_#a855f7]"></span>
        <span class="absolute top-[90%] left-[82%] w-2 h-2 rounded-full bg-fuchsia-300 anim-star-1 shadow-[0_0_10px_#e879f9]"></span>
      </div>
    `;
  } else if (theme === 'sakura') {
    content = `
      <!-- Dusky Cyber-Pink Warm Horizon Ambient -->
      <div class="absolute -top-28 right-1/4 w-[600px] h-[600px] rounded-full bg-pink-600/20 blur-[130px] pointer-events-none"></div>
      <div class="absolute bottom-0 left-10 w-[550px] h-[450px] rounded-full bg-rose-600/18 blur-[120px] pointer-events-none"></div>

      <!-- Ethereal Cyber Sakura Moon in Sky with Corona & Japanese Cloud Streamer -->
      <div class="absolute top-14 left-8 sm:left-16 md:left-24 w-24 h-24 pointer-events-none anim-sakura-moon">
        <div class="absolute -inset-3 rounded-full bg-pink-500/15 blur-xl"></div>
        <div class="absolute inset-1 rounded-full border border-pink-400/30 bg-pink-500/10"></div>
        <svg viewBox="0 0 100 100" class="w-full h-full text-pink-200 fill-current drop-shadow-[0_0_24px_rgba(244,114,182,0.8)]">
          <defs>
            <linearGradient id="sakura-moon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fff1f2" />
              <stop offset="45%" stop-color="#fbcfe8" />
              <stop offset="85%" stop-color="#f472b6" />
              <stop offset="100%" stop-color="#db2777" />
            </linearGradient>
          </defs>
          <path d="M50 10 A40 40 0 1 0 90 50 A32 32 0 1 1 50 10 Z" fill="url(#sakura-moon-grad)"/>
        </svg>
        <div class="absolute top-1/2 -left-6 right-2 h-4 pointer-events-none opacity-40">
          <svg viewBox="0 0 120 20" class="w-full h-full fill-rose-200/50">
            <path d="M10,12 Q25,2 40,10 Q55,4 70,12 Q85,6 100,12 Q115,10 120,15 L0,15 Q5,13 10,12 Z"/>
          </svg>
        </div>
      </div>

      <!-- Blooming Cherry Blossom Branch Silhouette (Top-Right Corner) -->
      <div class="absolute top-0 right-0 w-56 h-48 pointer-events-none anim-branch opacity-80">
        <svg viewBox="0 0 220 180" class="w-full h-full fill-none">
          <path d="M220,0 Q160,30 130,70 T60,110 T0,130" stroke="#25091e" stroke-width="3" stroke-linecap="round"/>
          <path d="M150,45 Q120,70 110,105" stroke="#25091e" stroke-width="2" stroke-linecap="round"/>
          <path d="M90,90 Q70,120 50,145" stroke="#25091e" stroke-width="1.8" stroke-linecap="round"/>
          
          <!-- Blossoms on Branch with Glowing Cores -->
          <g transform="translate(130, 68) scale(0.65)" fill="#fbcfe8" class="drop-shadow-[0_0_8px_rgba(244,114,182,0.9)]">
            <circle cx="15" cy="5" r="7"/>
            <circle cx="25" cy="15" r="7"/>
            <circle cx="20" cy="25" r="7"/>
            <circle cx="10" cy="25" r="7"/>
            <circle cx="5" cy="15" r="7"/>
            <circle cx="15" cy="17" r="3.5" fill="#f43f5e"/>
          </g>
          <g transform="translate(60, 108) scale(0.55)" fill="#f472b6" class="drop-shadow-[0_0_8px_rgba(244,114,182,0.9)]">
            <circle cx="15" cy="5" r="7"/>
            <circle cx="25" cy="15" r="7"/>
            <circle cx="20" cy="25" r="7"/>
            <circle cx="10" cy="25" r="7"/>
            <circle cx="5" cy="15" r="7"/>
            <circle cx="15" cy="17" r="3.5" fill="#e11d48"/>
          </g>
          <g transform="translate(110, 102) scale(0.5)" fill="#fbcfe8" class="drop-shadow-[0_0_6px_rgba(244,114,182,0.8)]">
            <circle cx="15" cy="5" r="7"/>
            <circle cx="25" cy="15" r="7"/>
            <circle cx="20" cy="25" r="7"/>
            <circle cx="10" cy="25" r="7"/>
            <circle cx="5" cy="15" r="7"/>
            <circle cx="15" cy="17" r="3.5" fill="#f43f5e"/>
          </g>
        </svg>
      </div>

      <!-- Iconic Mount Fuji Cone Silhouette & Torii Gate Horizon Silhouette -->
      <div class="absolute bottom-0 left-0 right-0 h-36 sm:h-48 pointer-events-none flex items-end">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" class="w-full h-full">
          <defs>
            <linearGradient id="sakura-fuji-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#be185d" stop-opacity="0.35" />
              <stop offset="100%" stop-color="#140612" stop-opacity="0.95" />
            </linearGradient>
          </defs>
          <path d="M0,200 L0,150 L420,150 L640,65 Q720,40 800,65 L1020,150 L1440,150 L1440,200 Z" fill="url(#sakura-fuji-grad)" opacity="0.55"/>
          <path d="M640,65 Q720,40 800,65" stroke="#f472b6" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
          
          <!-- Elegant Torii Gate Silhouette on Left Horizon -->
          <g fill="#180514" opacity="0.9" transform="translate(140, 95) scale(0.65)">
            <path d="M0,8 Q50,0 100,0 Q150,0 200,8 L195,14 Q150,8 100,8 Q50,8 5,14 Z" fill="#20071a"/>
            <path d="M0,8 Q50,0 100,0 Q150,0 200,8" stroke="#f472b6" stroke-width="1.8" fill="none" opacity="0.8"/>
            <rect x="25" y="18" width="150" height="6" rx="2" fill="#20071a"/>
            <rect x="96" y="8" width="8" height="16" fill="#20071a"/>
            <rect x="42" y="24" width="10" height="80" rx="2" fill="#180514"/>
            <rect x="148" y="24" width="10" height="80" rx="2" fill="#180514"/>
          </g>

          <!-- Horizon Baseline -->
          <path d="M0,150 Q360,110 720,140 Q1080,110 1440,135 L1440,200 L0,200 Z" fill="#140511" opacity="0.85"/>
        </svg>
      </div>

      <!-- Whole 5-Petal Flower Heads Tumbling & Spinning -->
      <div class="absolute -top-10 left-[20%] anim-blossom-1 pointer-events-none">
        <svg viewBox="0 0 30 30" class="w-6 h-6 fill-pink-200 drop-shadow-[0_0_8px_rgba(244,114,182,0.85)]">
          <circle cx="15" cy="5" r="5.5"/>
          <circle cx="23" cy="12" r="5.5"/>
          <circle cx="20" cy="22" r="5.5"/>
          <circle cx="10" cy="22" r="5.5"/>
          <circle cx="7" cy="12" r="5.5"/>
          <circle cx="15" cy="15" r="3" fill="#f43f5e"/>
        </svg>
      </div>
      <div class="absolute -top-10 left-[68%] anim-blossom-2 pointer-events-none">
        <svg viewBox="0 0 30 30" class="w-5.5 h-5.5 fill-rose-200 drop-shadow-[0_0_8px_rgba(251,113,133,0.85)]">
          <circle cx="15" cy="5" r="5.5"/>
          <circle cx="23" cy="12" r="5.5"/>
          <circle cx="20" cy="22" r="5.5"/>
          <circle cx="10" cy="22" r="5.5"/>
          <circle cx="7" cy="12" r="5.5"/>
          <circle cx="15" cy="15" r="3" fill="#e11d48"/>
        </svg>
      </div>
      <div class="absolute -top-10 left-[44%] anim-blossom-3 pointer-events-none">
        <svg viewBox="0 0 30 30" class="w-5 h-5 fill-pink-100 drop-shadow-[0_0_10px_rgba(244,114,182,0.95)]">
          <circle cx="15" cy="5" r="5.5"/>
          <circle cx="23" cy="12" r="5.5"/>
          <circle cx="20" cy="22" r="5.5"/>
          <circle cx="10" cy="22" r="5.5"/>
          <circle cx="7" cy="12" r="5.5"/>
          <circle cx="15" cy="15" r="3" fill="#f43f5e"/>
        </svg>
      </div>

      <!-- Translucent Flowing Petal Breeze Wind Streaks -->
      <div class="absolute top-[35%] left-0 right-0 h-16 anim-breeze-1 pointer-events-none overflow-hidden opacity-35">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-full fill-none stroke-pink-300 stroke-[1.5] stroke-dasharray-[12_8]">
          <path d="M0,30 Q360,5 720,35 T1440,20"/>
        </svg>
      </div>
      <div class="absolute top-[65%] left-0 right-0 h-16 anim-breeze-2 pointer-events-none overflow-hidden opacity-30">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-full fill-none stroke-rose-300 stroke-[1.2] stroke-dasharray-[16_10]">
          <path d="M0,35 Q400,55 800,25 T1440,30"/>
        </svg>
      </div>

      <!-- Swarm of 16 Falling Sakura Petals across 3 Depth Layers -->
      <div class="absolute inset-0 overflow-hidden">
        
        <!-- Depth 1: Background Subtle Petals (Gentle, Slow Drift) -->
        <div class="absolute -top-8 left-[8%] anim-sakura-1 opacity-50 scale-75">
          <svg class="w-3.5 h-3.5 text-pink-300 fill-current drop-shadow-[0_0_4px_rgba(244,114,182,0.4)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-8 left-[24%] anim-sakura-3 opacity-55 scale-75">
          <svg class="w-3.5 h-3.5 text-rose-300 fill-current drop-shadow-[0_0_4px_rgba(251,113,133,0.4)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-8 left-[64%] anim-sakura-2 opacity-50 scale-75">
          <svg class="w-3.5 h-3.5 text-pink-200 fill-current drop-shadow-[0_0_4px_rgba(244,114,182,0.4)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-8 left-[82%] anim-sakura-4 opacity-55 scale-75">
          <svg class="w-3.5 h-3.5 text-rose-300 fill-current drop-shadow-[0_0_4px_rgba(251,113,133,0.4)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>

        <!-- Depth 2: Midground Tumbling Petals (Crisp & Rotational) -->
        <div class="absolute -top-8 left-[16%] anim-sakura-fall-1 opacity-85">
          <svg class="w-4.5 h-4.5 text-pink-300 fill-current drop-shadow-[0_0_6px_rgba(244,114,182,0.7)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-8 left-[34%] anim-sakura-fall-2 opacity-80">
          <svg class="w-4 h-4 text-rose-300 fill-current drop-shadow-[0_0_6px_rgba(251,113,133,0.7)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-8 left-[50%] anim-sakura-fall-3 opacity-90">
          <svg class="w-5 h-5 text-pink-200 fill-current drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-8 left-[74%] anim-sakura-fall-4 opacity-85">
          <svg class="w-4.5 h-4.5 text-rose-200 fill-current drop-shadow-[0_0_6px_rgba(244,114,182,0.7)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-8 left-[92%] anim-sakura-5 opacity-85">
          <svg class="w-4 h-4 text-pink-300 fill-current drop-shadow-[0_0_6px_rgba(244,114,182,0.7)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>

        <!-- Depth 3: Foreground Luminous Glowing Petals -->
        <div class="absolute -top-10 left-[28%] anim-sakura-fall-3 opacity-95 scale-110">
          <svg class="w-5.5 h-5.5 text-pink-200 fill-current drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-10 left-[58%] anim-sakura-fall-1 opacity-95 scale-110">
          <svg class="w-5.5 h-5.5 text-rose-200 fill-current drop-shadow-[0_0_10px_rgba(251,113,133,0.9)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <div class="absolute -top-10 left-[84%] anim-sakura-fall-2 opacity-95 scale-110">
          <svg class="w-5 h-5 text-pink-100 fill-current drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>

        <!-- Floating Luminous Pink Cyber Pollen / Fairy Orbs -->
        <span class="absolute top-[20%] left-[14%] w-2 h-2 rounded-full bg-pink-300 anim-pollen-drift shadow-[0_0_10px_#f472b6]"></span>
        <span class="absolute top-[32%] left-[42%] w-1.5 h-1.5 rounded-full bg-rose-200 anim-pollen-drift shadow-[0_0_8px_#fb7185]" style="animation-delay: 1.5s;"></span>
        <span class="absolute top-[48%] left-[22%] w-2 h-2 rounded-full bg-pink-200 anim-pollen-drift shadow-[0_0_10px_#f472b6]" style="animation-delay: 2.8s;"></span>
        <span class="absolute top-[62%] left-[70%] w-2 h-2 rounded-full bg-rose-300 anim-pollen-drift shadow-[0_0_10px_#fb7185]" style="animation-delay: 0.8s;"></span>
        <span class="absolute top-[75%] left-[36%] w-1.5 h-1.5 rounded-full bg-pink-300 anim-pollen-drift shadow-[0_0_8px_#f472b6]" style="animation-delay: 3.2s;"></span>
        <span class="absolute top-[82%] left-[86%] w-2 h-2 rounded-full bg-pink-200 anim-pollen-drift shadow-[0_0_10px_#f472b6]" style="animation-delay: 2.1s;"></span>
      </div>
    `;
  }

  return `
    <div id="theme-atmosphere" class="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-opacity duration-700" aria-hidden="true">
      ${content}
    </div>
  `;
}
