/**
 * ThemeAtmosphere.js
 * Renders rich, vibrant ("jreng"), and actively animated atmospheric visual elements
 * for the 4 primary themes:
 * - midnight: Continuous shooting stars/meteors + constellation network data packets + pulsating moon corona + rotating starburst flares + stardust stream
 * - emerald: Lively darting/spiraling fireflies + dancing sunbeam dust motes + dual rolling forest mist + tumbling leaf flurry + spirit wisps & glowing fungi
 * - violet: High-speed cyber data conduit matrix + 3D spinning orbital crystal rings + expanding pulsar energy waves + electric circuit trace sparks
 * - sakura: Swirling petal gusts + sweeping neon wind streaks + dense tumbling petal storm & whole 5-petal blossoms + bobbing fairy lanterns + Mount Fuji & Sakura Moon
 * - light & dark: Clean minimal substrate, strictly zero extra elements
 */

export function renderThemeAtmosphere(theme = 'dark') {
  if (theme === 'light' || theme === 'dark') {
    return `<div id="theme-atmosphere" class="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" aria-hidden="true"></div>`;
  }

  let content = '';

  if (theme === 'midnight') {
    content = `
      <!-- Ambient Aurora Borealis Wave across upper sky -->
      <div class="absolute -top-10 left-0 right-0 h-72 anim-aurora pointer-events-none opacity-45">
        <svg viewBox="0 0 1440 280" preserveAspectRatio="none" class="w-full h-full">
          <defs>
            <linearGradient id="aurora-grad-1" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0" />
              <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.4" />
              <stop offset="65%" stop-color="#06b6d4" stop-opacity="0.45" />
              <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="aurora-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0" />
              <stop offset="50%" stop-color="#22d3ee" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,80 Q360,190 720,100 T1440,120 L1440,0 L0,0 Z" fill="url(#aurora-grad-1)"/>
          <path d="M0,120 Q480,40 960,130 T1440,70 L1440,0 L0,0 Z" fill="url(#aurora-grad-2)"/>
        </svg>
      </div>

      <!-- Celestial Crescent Moon with Pulsating Corona Waves -->
      <div class="absolute top-14 right-6 sm:right-14 md:right-20 w-24 h-24 pointer-events-none">
        <!-- Concentric Expanding Corona Ripple Ring -->
        <div class="absolute -inset-4 rounded-full border border-sky-400/30 anim-corona-ripple"></div>
        <div class="absolute -inset-2 rounded-full border border-sky-300/20 anim-corona-ripple" style="animation-delay: 2.2s;"></div>
        
        <!-- Outer Soft Corona Glow -->
        <div class="absolute -inset-3 rounded-full bg-sky-400/15 blur-xl anim-moon"></div>
        <div class="absolute inset-1 rounded-full border border-sky-300/25 bg-sky-500/10 anim-moon"></div>
        
        <!-- Glowing Crescent Moon SVG -->
        <svg viewBox="0 0 100 100" class="w-full h-full text-sky-200 fill-current drop-shadow-[0_0_24px_rgba(56,189,248,0.75)] anim-moon">
          <defs>
            <linearGradient id="moon-luminous" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f0f9ff" />
              <stop offset="40%" stop-color="#bae6fd" />
              <stop offset="85%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M50 10 A40 40 0 1 0 90 50 A32 32 0 1 1 50 10 Z" fill="url(#moon-luminous)"/>
          <circle cx="36" cy="46" r="3.5" fill="#0284c7" opacity="0.35"/>
          <circle cx="44" cy="62" r="2.5" fill="#0284c7" opacity="0.3"/>
          <circle cx="32" cy="68" r="2" fill="#0284c7" opacity="0.25"/>
        </svg>
      </div>

      <!-- Continuous Cadence of 4 Shooting Stars (Meteors) -->
      <div class="absolute top-8 right-1/4 w-36 h-0.5 bg-gradient-to-l from-sky-200 via-cyan-400 to-transparent anim-meteor-1 pointer-events-none"></div>
      <div class="absolute top-24 right-1/2 w-48 h-0.5 bg-gradient-to-l from-white via-sky-300 to-transparent anim-meteor-2 pointer-events-none"></div>
      <div class="absolute top-44 right-1/3 w-40 h-0.5 bg-gradient-to-l from-cyan-100 via-sky-400 to-transparent anim-meteor-3 pointer-events-none"></div>
      <div class="absolute top-12 left-1/3 w-44 h-0.5 bg-gradient-to-l from-white via-cyan-300 to-transparent anim-meteor-4 pointer-events-none"></div>

      <!-- Rotating 8-Point Starburst Flares -->
      <div class="absolute top-[16%] left-[28%] pointer-events-none anim-starburst">
        <svg class="w-6 h-6 text-sky-100 drop-shadow-[0_0_8px_#38bdf8]" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20,0 L23,17 L40,20 L23,23 L20,40 L17,23 L0,20 L17,17 Z"/>
          <path d="M20,6 L22,18 L34,20 L22,22 L20,34 L18,22 L6,20 L18,18 Z" opacity="0.6"/>
        </svg>
      </div>
      <div class="absolute top-[68%] left-[72%] pointer-events-none anim-starburst" style="animation-delay: 1.8s;">
        <svg class="w-5 h-5 text-cyan-100 drop-shadow-[0_0_8px_#22d3ee]" viewBox="0 0 40 40" fill="currentColor">
          <path d="M20,0 L23,17 L40,20 L23,23 L20,40 L17,23 L0,20 L17,17 Z"/>
        </svg>
      </div>

      <!-- Drifting Diagonal Cosmic Stardust Ribbon -->
      <div class="absolute inset-0 anim-stardust-wave pointer-events-none opacity-60">
        <span class="absolute top-[28%] left-[45%] w-1.5 h-1.5 rounded-full bg-cyan-200 shadow-[0_0_6px_#06b6d4]"></span>
        <span class="absolute top-[32%] left-[49%] w-1 h-1 rounded-full bg-white shadow-[0_0_4px_#fff]"></span>
        <span class="absolute top-[36%] left-[53%] w-2 h-2 rounded-full bg-sky-200 shadow-[0_0_8px_#38bdf8]"></span>
        <span class="absolute top-[40%] left-[57%] w-1 h-1 rounded-full bg-cyan-100 shadow-[0_0_4px_#22d3ee]"></span>
        <span class="absolute top-[44%] left-[61%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]"></span>
      </div>

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

        <!-- Network Constellation Topology Graph Lines with Traveling Spark Pulses -->
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

      <!-- Sunbeam Dust Motes Dancing in the Light Shafts -->
      <div class="absolute top-[8%] left-[8%] w-48 h-48 pointer-events-none">
        <span class="absolute top-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-emerald-200 anim-sunbeam-mote shadow-[0_0_6px_#6ee7b7]"></span>
        <span class="absolute top-[45%] left-[55%] w-2 h-2 rounded-full bg-lime-200 anim-sunbeam-mote shadow-[0_0_8px_#a3e635]" style="animation-delay: 1.5s;"></span>
        <span class="absolute top-[65%] left-[40%] w-1.5 h-1.5 rounded-full bg-mint-200 anim-sunbeam-mote shadow-[0_0_6px_#34d399]" style="animation-delay: 2.8s;"></span>
      </div>

      <!-- Hanging Enchanted Canopy Vines & Luminous Dew (Framing Top Corners) -->
      <div class="absolute top-0 left-0 w-48 h-40 pointer-events-none anim-vine opacity-75">
        <svg viewBox="0 0 200 160" class="w-full h-full fill-none stroke-[#022c16] stroke-[2.5] stroke-linecap-round">
          <path d="M0,0 Q30,60 15,110 T35,150" />
          <path d="M40,0 Q65,45 55,95 T70,130" stroke-width="2" />
          <path d="M80,0 Q95,35 90,75" stroke-width="1.5" />
        </svg>
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

      <!-- Active Cascade of 6 Enchanted Falling Forest Leaves -->
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
      <div class="absolute -top-6 left-[54%] anim-leaf-5 pointer-events-none">
        <svg class="w-4 h-4 text-mint-300/80 fill-current drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" viewBox="0 0 24 24">
          <path d="M17,8 C8,10 5,16 5,22 C11,22 17,19 19,10 C19,9 18,8 17,8 Z"/>
        </svg>
      </div>
      <div class="absolute -top-6 left-[68%] anim-leaf-3 pointer-events-none">
        <svg class="w-4 h-4 text-teal-300/75 fill-current drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]" viewBox="0 0 24 24">
          <path d="M17,8 C8,10 5,16 5,22 C11,22 17,19 19,10 C19,9 18,8 17,8 Z"/>
        </svg>
      </div>
      <div class="absolute -top-6 left-[82%] anim-leaf-4 pointer-events-none">
        <svg class="w-3.5 h-3.5 text-emerald-300/80 fill-current drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" viewBox="0 0 24 24">
          <path d="M17,8 C8,10 5,16 5,22 C11,22 17,19 19,10 C19,9 18,8 17,8 Z"/>
        </svg>
      </div>
      <div class="absolute -top-6 left-[94%] anim-leaf-6 pointer-events-none">
        <svg class="w-3 h-3 text-lime-400/80 fill-current drop-shadow-[0_0_6px_rgba(163,230,53,0.5)]" viewBox="0 0 24 24">
          <path d="M17,8 C8,10 5,16 5,22 C11,22 17,19 19,10 C19,9 18,8 17,8 Z"/>
        </svg>
      </div>

      <!-- Layered 3-Tier Enchanted Forest Canopy Horizon -->
      <div class="absolute bottom-0 left-0 right-0 h-48 sm:h-64 pointer-events-none flex items-end">
        <svg viewBox="0 0 1440 240" preserveAspectRatio="none" class="w-full h-full">
          <path d="M0,240 L0,120 Q180,80 360,130 T720,95 T1080,125 T1440,90 L1440,240 Z" fill="#011409" opacity="0.45"/>
          <path d="M0,240 L0,150 L30,175 L55,130 L90,170 L130,120 L170,172 L210,138 L250,178 L295,125 L345,168 L390,132 L440,175 L495,115 L550,170 L605,128 L660,178 L715,120 L770,168 L815,132 L870,175 L920,122 L975,170 L1030,128 L1080,168 L1130,122 L1185,172 L1240,130 L1295,175 L1350,120 L1400,165 L1440,135 L1440,240 Z" fill="#021d0f" opacity="0.75"/>
          <path d="M0,240 L0,175 L35,190 L70,155 L115,192 L165,150 L220,195 L275,160 L335,198 L395,162 L460,195 L525,152 L590,198 L655,158 L725,198 L790,160 L855,195 L915,155 L975,192 L1035,160 L1090,195 L1145,155 L1200,192 L1260,158 L1320,195 L1380,150 L1440,185 L1440,240 Z" fill="#010e07" opacity="0.95"/>
        </svg>
      </div>

      <!-- Dual-Wave Rolling Bioluminescent Forest Floor Mist -->
      <div class="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-emerald-950/80 via-emerald-900/20 to-transparent anim-mist-drift pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-900/40 via-teal-900/15 to-transparent anim-mist-rolling pointer-events-none opacity-60"></div>

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

      <!-- Lively Darting, Spiraling & Wandering Firefly Swarm (26+ Fireflies) -->
      <div class="absolute inset-0">
        <!-- Swift Darting & Spiraling Fireflies -->
        <span class="absolute bottom-[16%] left-[12%] w-3 h-3 rounded-full bg-emerald-400 anim-firefly-dart-1 shadow-[0_0_16px_#10b981]"></span>
        <span class="absolute bottom-[28%] left-[32%] w-2.5 h-2.5 rounded-full bg-lime-300 anim-firefly-spiral-1 shadow-[0_0_14px_#a3e635]"></span>
        <span class="absolute bottom-[20%] left-[52%] w-3 h-3 rounded-full bg-mint-300 anim-firefly-dart-2 shadow-[0_0_16px_#34d399]"></span>
        <span class="absolute bottom-[25%] left-[74%] w-2.5 h-2.5 rounded-full bg-teal-300 anim-firefly-spiral-2 shadow-[0_0_14px_#2dd4bf]"></span>

        <!-- Tier 1: Large Radiant Emerald & Lime Fireflies -->
        <span class="absolute bottom-[14%] left-[18%] w-3 h-3 rounded-full bg-emerald-400 anim-firefly-drift-1 shadow-[0_0_16px_#10b981]"></span>
        <span class="absolute bottom-[22%] left-[26%] w-2.5 h-2.5 rounded-full bg-lime-300 anim-firefly-drift-2 shadow-[0_0_14px_#a3e635]"></span>
        <span class="absolute bottom-[18%] left-[44%] w-3 h-3 rounded-full bg-mint-300 anim-firefly-drift-3 shadow-[0_0_16px_#34d399]"></span>
        <span class="absolute bottom-[26%] left-[60%] w-2.5 h-2.5 rounded-full bg-emerald-300 anim-firefly-drift-1 shadow-[0_0_14px_#10b981]"></span>
        <span class="absolute bottom-[16%] left-[70%] w-3 h-3 rounded-full bg-teal-300 anim-firefly-drift-2 shadow-[0_0_16px_#2dd4bf]"></span>
        <span class="absolute bottom-[24%] left-[88%] w-2.5 h-2.5 rounded-full bg-lime-400 anim-firefly-drift-3 shadow-[0_0_14px_#a3e635]"></span>

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

      <!-- Pulsar Expanding Radar Energy Waves from Deep Space -->
      <div class="absolute top-[28%] left-[75%] w-36 h-36 pointer-events-none">
        <div class="absolute inset-0 rounded-full border border-purple-400/40 anim-pulsar-ripple"></div>
        <div class="absolute inset-0 rounded-full border border-fuchsia-400/30 anim-pulsar-ripple" style="animation-delay: 2s;"></div>
        <span class="absolute inset-[40%] rounded-full bg-white shadow-[0_0_12px_#c084fc] anim-star-1"></span>
      </div>

      <!-- High-Speed Multi-Channel Cyber Data Conduits (5 Active Matrix Beams) -->
      <div class="absolute top-0 left-[12%] w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent pointer-events-none">
        <div class="w-1.5 h-24 -left-[2px] bg-gradient-to-b from-transparent via-purple-300 to-fuchsia-400 anim-cyber-fast-1 rounded-full shadow-[0_0_12px_#c084fc]"></div>
      </div>
      <div class="absolute top-0 left-[26%] w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent pointer-events-none">
        <div class="w-1.5 h-20 -left-[2px] bg-gradient-to-b from-transparent via-fuchsia-300 to-violet-400 anim-cyber-fast-2 rounded-full shadow-[0_0_10px_#e879f9]"></div>
      </div>
      <div class="absolute top-0 left-[62%] w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent pointer-events-none">
        <div class="w-1.5 h-28 -left-[2px] bg-gradient-to-b from-transparent via-purple-200 to-pink-400 anim-cyber-fast-3 rounded-full shadow-[0_0_14px_#d8b4fe]"></div>
      </div>
      <div class="absolute top-0 left-[78%] w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/25 to-transparent pointer-events-none">
        <div class="w-1.5 h-24 -left-[2px] bg-gradient-to-b from-transparent via-fuchsia-300 to-purple-400 anim-cyber-fast-4 rounded-full shadow-[0_0_10px_#e879f9]"></div>
      </div>
      <div class="absolute top-0 left-[90%] w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent pointer-events-none">
        <div class="w-1.5 h-16 -left-[2px] bg-gradient-to-b from-transparent via-violet-300 to-cyan-400 anim-cyber-fast-1 rounded-full shadow-[0_0_10px_#a855f7]"></div>
      </div>

      <!-- 3D Spinning Orbital Rings around Core Space Crystals -->
      <div class="absolute top-[22%] left-[34%] w-16 h-16 pointer-events-none flex items-center justify-center">
        <div class="absolute inset-0 rounded-full border border-purple-400/50 anim-orbital-ring-1 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
        <div class="absolute inset-2 rounded-full border border-fuchsia-400/40 anim-orbital-ring-2 shadow-[0_0_6px_rgba(217,70,239,0.5)]"></div>
        <div class="w-4 h-4 border border-purple-200 rotate-45 bg-purple-500/20 anim-crystal-1"></div>
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
        <svg class="absolute top-[22%] left-[48%] w-4 h-4 text-purple-200 anim-diamond-1" viewBox="0 0 24 24" fill="currentColor">
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
        <div class="absolute -inset-4 rounded-full border border-pink-400/25 anim-corona-ripple"></div>
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

      <!-- Mount Fuji Cone Silhouette & Torii Gate Horizon Silhouette -->
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
          
          <g fill="#180514" opacity="0.9" transform="translate(140, 95) scale(0.65)">
            <path d="M0,8 Q50,0 100,0 Q150,0 200,8 L195,14 Q150,8 100,8 Q50,8 5,14 Z" fill="#20071a"/>
            <path d="M0,8 Q50,0 100,0 Q150,0 200,8" stroke="#f472b6" stroke-width="1.8" fill="none" opacity="0.8"/>
            <rect x="25" y="18" width="150" height="6" rx="2" fill="#20071a"/>
            <rect x="96" y="8" width="8" height="16" fill="#20071a"/>
            <rect x="42" y="24" width="10" height="80" rx="2" fill="#180514"/>
            <rect x="148" y="24" width="10" height="80" rx="2" fill="#180514"/>
          </g>

          <path d="M0,150 Q360,110 720,140 Q1080,110 1440,135 L1440,200 L0,200 Z" fill="#140511" opacity="0.85"/>
        </svg>
      </div>

      <!-- 4 Whole 5-Petal Flower Heads Tumbling & Spinning -->
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
      <div class="absolute -top-10 left-[84%] anim-blossom-4 pointer-events-none">
        <svg viewBox="0 0 30 30" class="w-6 h-6 fill-rose-200 drop-shadow-[0_0_8px_rgba(244,114,182,0.85)]">
          <circle cx="15" cy="5" r="5.5"/>
          <circle cx="23" cy="12" r="5.5"/>
          <circle cx="20" cy="22" r="5.5"/>
          <circle cx="10" cy="22" r="5.5"/>
          <circle cx="7" cy="12" r="5.5"/>
          <circle cx="15" cy="15" r="3" fill="#e11d48"/>
        </svg>
      </div>

      <!-- Sweeping Petal Wind Gust Streaks across canvas -->
      <div class="absolute top-[32%] left-0 right-0 h-16 anim-wind-gust pointer-events-none overflow-hidden opacity-45">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-full fill-none stroke-pink-300 stroke-[1.8] stroke-dasharray-[14_8]">
          <path d="M0,30 Q360,5 720,35 T1440,20"/>
        </svg>
      </div>
      <div class="absolute top-[62%] left-0 right-0 h-16 anim-breeze-1 pointer-events-none overflow-hidden opacity-40">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-full fill-none stroke-rose-300 stroke-[1.4] stroke-dasharray-[16_10]">
          <path d="M0,35 Q400,55 800,25 T1440,30"/>
        </svg>
      </div>

      <!-- Lively Swirling Wind Gust Petals (Curving Dynamic Trajectories) -->
      <div class="absolute -top-8 left-[10%] anim-sakura-swirl-1 pointer-events-none">
        <svg class="w-5 h-5 text-pink-300 fill-current drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" viewBox="0 0 30 30">
          <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
        </svg>
      </div>
      <div class="absolute -top-8 left-[38%] anim-sakura-swirl-2 pointer-events-none">
        <svg class="w-4.5 h-4.5 text-rose-300 fill-current drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]" viewBox="0 0 30 30">
          <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
        </svg>
      </div>
      <div class="absolute -top-8 left-[62%] anim-sakura-swirl-3 pointer-events-none">
        <svg class="w-5.5 h-5.5 text-pink-200 fill-current drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]" viewBox="0 0 30 30">
          <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
        </svg>
      </div>
      <div class="absolute -top-8 left-[86%] anim-sakura-swirl-4 pointer-events-none">
        <svg class="w-4.5 h-4.5 text-rose-200 fill-current drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" viewBox="0 0 30 30">
          <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
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

        <!-- Bobbing Luminous Fairy Lanterns & Floating Cyber Pollen -->
        <span class="absolute top-[20%] left-[14%] w-3 h-3 rounded-full bg-pink-300 anim-lantern-bob shadow-[0_0_12px_#f472b6]"></span>
        <span class="absolute top-[32%] left-[42%] w-2 h-2 rounded-full bg-rose-200 anim-pollen-drift shadow-[0_0_8px_#fb7185]" style="animation-delay: 1.5s;"></span>
        <span class="absolute top-[48%] left-[22%] w-2.5 h-2.5 rounded-full bg-pink-200 anim-lantern-bob shadow-[0_0_12px_#f472b6]" style="animation-delay: 2.8s;"></span>
        <span class="absolute top-[62%] left-[70%] w-3 h-3 rounded-full bg-rose-300 anim-lantern-bob shadow-[0_0_12px_#fb7185]" style="animation-delay: 0.8s;"></span>
        <span class="absolute top-[75%] left-[36%] w-2 h-2 rounded-full bg-pink-300 anim-pollen-drift shadow-[0_0_8px_#f472b6]" style="animation-delay: 3.2s;"></span>
        <span class="absolute top-[82%] left-[86%] w-2.5 h-2.5 rounded-full bg-pink-200 anim-lantern-bob shadow-[0_0_10px_#f472b6]" style="animation-delay: 2.1s;"></span>
      </div>
    `;
  } else if (theme === 'sunset') {
    content = `
      <!-- Ambient Twilight Sky Glow & Gentle Crepuscular Sunbeams -->
      <div class="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 1440 800" preserveAspectRatio="none" class="w-full h-full">
          <defs>
            <linearGradient id="ocean-sunset-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0c1017" stop-opacity="0.9" />
              <stop offset="30%" stop-color="#1e1b4b" stop-opacity="0.35" />
              <stop offset="55%" stop-color="#701a75" stop-opacity="0.2" />
              <stop offset="74%" stop-color="#c2410c" stop-opacity="0.3" />
              <stop offset="90%" stop-color="#f59e0b" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#fef08a" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="sunset-rays-grad" x1="50%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stop-color="#fde68a" stop-opacity="0.25" />
              <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.1" />
              <stop offset="100%" stop-color="#f43f5e" stop-opacity="0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="800" fill="url(#ocean-sunset-sky)" />

          <!-- Soft Fanning Rays from setting sun -->
          <g class="anim-sunset-rays" transform-origin="720 560">
            <polygon points="720,560 620,0 660,0" fill="url(#sunset-rays-grad)" />
            <polygon points="720,560 780,0 820,0" fill="url(#sunset-rays-grad)" />
            <polygon points="720,560 480,100 520,100" fill="url(#sunset-rays-grad)" />
            <polygon points="720,560 920,100 960,100" fill="url(#sunset-rays-grad)" />
            <polygon points="720,560 340,240 380,240" fill="url(#sunset-rays-grad)" />
            <polygon points="720,560 1060,240 1100,240" fill="url(#sunset-rays-grad)" />
          </g>
        </svg>
      </div>

      <!-- Radiant Sinking Sun over the Ocean Horizon -->
      <div class="absolute bottom-[22vh] sm:bottom-[24vh] left-1/2 -translate-x-1/2 w-44 sm:w-56 md:w-64 h-44 sm:h-56 md:h-64 pointer-events-none flex items-center justify-center">
        <!-- Expanding Golden Solar Corona Rings -->
        <div class="absolute inset-0 rounded-full border border-amber-300/35 anim-sunset-corona-1"></div>
        <div class="absolute inset-4 rounded-full border border-orange-300/30 anim-sunset-corona-2"></div>

        <!-- Diffuse Warm Twilight Glow -->
        <div class="absolute -inset-10 rounded-full bg-gradient-to-t from-amber-500/30 via-orange-500/25 to-pink-500/15 blur-3xl anim-sunset-sun"></div>
        <div class="absolute -inset-4 rounded-full bg-amber-300/25 blur-xl anim-sunset-sun"></div>

        <!-- Setting Sun Orb SVG -->
        <svg viewBox="0 0 200 200" class="w-full h-full drop-shadow-[0_0_35px_rgba(245,158,11,0.85)] anim-sunset-sun">
          <defs>
            <radialGradient id="ocean-sun-orb" cx="50%" cy="38%" r="50%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="28%" stop-color="#fef08a" />
              <stop offset="60%" stop-color="#fb923c" />
              <stop offset="85%" stop-color="#f43f5e" />
              <stop offset="100%" stop-color="#be185d" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="76" fill="url(#ocean-sun-orb)" />
        </svg>
      </div>

      <!-- Calm Ocean Horizon, Undulating Sea Waves & Golden Light Reflection -->
      <div class="absolute bottom-0 left-0 right-0 h-[28vh] sm:h-[32vh] md:h-[35vh] pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" class="w-full h-full">
          <defs>
            <!-- Deep Horizon Water Gradient -->
            <linearGradient id="sea-grad-far" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0f2137" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#08101a" stop-opacity="1" />
            </linearGradient>
            <!-- Mid-Distance Rolling Sea Swell -->
            <linearGradient id="sea-grad-mid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#153654" stop-opacity="0.88" />
              <stop offset="100%" stop-color="#0c1825" stop-opacity="0.98" />
            </linearGradient>
            <!-- Foreground Tide Waters -->
            <linearGradient id="sea-grad-fore" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#164e63" stop-opacity="0.75" />
              <stop offset="40%" stop-color="#0f2b3e" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#09131d" stop-opacity="1" />
            </linearGradient>
            <!-- Golden Sun Reflection Path (Shimmering Light Highway on Sea) -->
            <linearGradient id="sea-shimmer-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.85" />
              <stop offset="30%" stop-color="#fbbf24" stop-opacity="0.75" />
              <stop offset="70%" stop-color="#f97316" stop-opacity="0.45" />
              <stop offset="100%" stop-color="#e11d48" stop-opacity="0.1" />
            </linearGradient>
            <radialGradient id="horizon-glow-radial" cx="50%" cy="0%" r="50%">
              <stop offset="0%" stop-color="#fef08a" stop-opacity="0.5" />
              <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.25" />
              <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
            </radialGradient>
          </defs>

          <!-- Flat Ocean Horizon Baseline with Warm Glow -->
          <rect x="0" y="30" width="1440" height="290" fill="url(#sea-grad-far)" />
          <ellipse cx="720" cy="32" rx="420" ry="16" fill="url(#horizon-glow-radial)" />

          <!-- Layer 1: Distant Calm Swell (animated) -->
          <path class="anim-sea-swell-1" d="M0,50 Q180,38 360,52 T720,44 T1080,52 T1440,46 L1440,320 L0,320 Z" fill="url(#sea-grad-mid)" opacity="0.9" />

          <!-- Layer 2: Mid-range Gentle Rolling Waves (animated) -->
          <path class="anim-sea-swell-2" d="M0,85 Q240,68 480,88 T960,78 T1440,86 L1440,320 L0,320 Z" fill="url(#sea-grad-fore)" opacity="0.95" />

          <!-- Golden Sunlight Reflection Highway on the Water Surface -->
          <g class="anim-sea-shimmer">
            <ellipse cx="720" cy="38" rx="80" ry="2.5" fill="url(#sea-shimmer-grad)" />
            <ellipse cx="720" cy="48" rx="120" ry="3.2" fill="url(#sea-shimmer-grad)" />
            <ellipse cx="720" cy="62" rx="160" ry="4.2" fill="url(#sea-shimmer-grad)" />
            <ellipse cx="720" cy="80" rx="210" ry="5.5" fill="url(#sea-shimmer-grad)" />
            <ellipse cx="720" cy="102" rx="270" ry="6.8" fill="url(#sea-shimmer-grad)" />
            <ellipse cx="720" cy="130" rx="340" ry="8" fill="url(#sea-shimmer-grad)" />
            <ellipse cx="720" cy="165" rx="410" ry="9" fill="url(#sea-shimmer-grad)" opacity="0.6" />
            <ellipse cx="720" cy="210" rx="480" ry="10" fill="url(#sea-shimmer-grad)" opacity="0.4" />
          </g>

          <!-- Delicate Sea Horizon & Wave Line Accents -->
          <path d="M0,86 Q360,72 720,86 T1440,86" fill="none" stroke="rgba(253, 230, 138, 0.28)" stroke-width="1.2" />
          <path d="M0,135 Q400,122 800,136 T1440,135" fill="none" stroke="rgba(251, 191, 36, 0.2)" stroke-width="1.5" />
        </svg>

        <!-- Peaceful Distant Sailboat rocking gently on the ocean swell -->
        <div class="absolute bottom-[16%] sm:bottom-[18%] left-[68%] sm:left-[72%] w-12 sm:w-16 h-12 sm:h-16 anim-sailboat-bob drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]">
          <svg viewBox="0 0 64 64" class="w-full h-full text-amber-100/80">
            <!-- Main Sail -->
            <path d="M30,12 L30,42 L46,42 Z" fill="#fed7aa" opacity="0.85" />
            <!-- Jib Front Sail -->
            <path d="M26,18 L26,42 L16,42 Z" fill="#fde68a" opacity="0.7" />
            <!-- Mast -->
            <line x1="28" y1="10" x2="28" y2="44" stroke="#78350f" stroke-width="1.5" stroke-linecap="round" />
            <!-- Hull -->
            <path d="M12,44 L16,51 L44,51 L50,44 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="0.8" />
            <!-- Waterline Shimmer -->
            <line x1="10" y1="52" x2="52" y2="52" stroke="#f59e0b" stroke-width="1" opacity="0.4" />
          </svg>
        </div>
      </div>

      <!-- Soft Pastel Sunset Clouds Drifting Serenely -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <!-- Cloud 1: High Soft Dusk Veil -->
        <div class="absolute top-[8%] -left-[10%] w-[120%] anim-sunset-cloud-1 opacity-35">
          <svg viewBox="0 0 1200 100" preserveAspectRatio="none" class="w-full h-16 sm:h-20">
            <defs>
              <linearGradient id="ocean-cloud-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#f472b6" stop-opacity="0" />
                <stop offset="30%" stop-color="#fb923c" stop-opacity="0.5" />
                <stop offset="60%" stop-color="#fed7aa" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#c084fc" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,50 Q200,20 400,45 T800,40 Q1000,18 1200,50 Q1000,75 800,60 T400,68 Q200,80 0,50 Z" fill="url(#ocean-cloud-1)" />
          </svg>
        </div>

        <!-- Cloud 2: Warm Golden Mid-Sky Cloud -->
        <div class="absolute top-[22%] -left-[10%] w-[120%] anim-sunset-cloud-2 opacity-40">
          <svg viewBox="0 0 1200 110" preserveAspectRatio="none" class="w-full h-18 sm:h-24">
            <defs>
              <linearGradient id="ocean-cloud-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#fb7185" stop-opacity="0" />
                <stop offset="35%" stop-color="#f59e0b" stop-opacity="0.55" />
                <stop offset="65%" stop-color="#fde68a" stop-opacity="0.75" />
                <stop offset="100%" stop-color="#ea580c" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,55 Q280,25 560,50 T980,45 Q1120,25 1200,55 Q1050,85 840,65 T420,72 Q210,88 0,55 Z" fill="url(#ocean-cloud-2)" />
          </svg>
        </div>

        <!-- Cloud 3: Lower Horizon Mist Layer -->
        <div class="absolute top-[36%] -left-[10%] w-[120%] anim-sunset-cloud-3 opacity-30">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" class="w-full h-12 sm:h-16">
            <defs>
              <linearGradient id="ocean-cloud-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#e11d48" stop-opacity="0" />
                <stop offset="40%" stop-color="#ea580c" stop-opacity="0.4" />
                <stop offset="70%" stop-color="#fbbf24" stop-opacity="0.55" />
                <stop offset="100%" stop-color="#9333ea" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,40 Q320,15 640,38 T1050,35 Q1150,22 1200,42 Q1050,62 750,48 T300,55 Q150,62 0,40 Z" fill="url(#ocean-cloud-3)" />
          </svg>
        </div>
      </div>

      <!-- Graceful Seagulls Gliding Across the Ocean Sunset -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <!-- Seagull Group 1 (Drifting gracefully eastward) -->
        <div class="absolute top-[22%] sm:top-[26%] anim-seagull-fly-1">
          <div class="anim-seagull-wings flex items-center space-x-4">
            <!-- Leader Seagull -->
            <svg class="w-10 h-5 text-amber-200/90 drop-shadow-[0_1px_3px_rgba(245,158,11,0.5)]" viewBox="0 0 52 20">
              <path d="M 2,15 Q 14,3 26,11 Q 38,3 50,15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <!-- Wingman Seagull (staggered) -->
            <svg class="w-7 h-4 -mt-3 text-orange-200/80 drop-shadow-[0_1px_3px_rgba(245,158,11,0.4)]" viewBox="0 0 52 20">
              <path d="M 2,15 Q 14,3 26,11 Q 38,3 50,15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <!-- Trailing Seagull -->
            <svg class="w-8 h-4 mt-3 text-amber-100/75 drop-shadow-[0_1px_3px_rgba(245,158,11,0.4)]" viewBox="0 0 52 20">
              <path d="M 2,15 Q 14,3 26,11 Q 38,3 50,15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>

        <!-- Seagull Group 2 (Higher altitude distant pair gliding westward) -->
        <div class="absolute top-[14%] sm:top-[17%] anim-seagull-fly-2">
          <div class="anim-seagull-wings flex items-center space-x-3">
            <svg class="w-6 h-3 text-rose-200/70 drop-shadow-[0_1px_2px_rgba(244,114,182,0.3)]" viewBox="0 0 52 20">
              <path d="M 2,15 Q 14,3 26,11 Q 38,3 50,15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg class="w-5 h-3 -mt-2 text-amber-200/60 drop-shadow-[0_1px_2px_rgba(245,158,11,0.3)]" viewBox="0 0 52 20">
              <path d="M 2,15 Q 14,3 26,11 Q 38,3 50,15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Gentle Golden Water Sparkles Twinkling on the Sea -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <span class="absolute bottom-[8%] left-[45%] w-1.5 h-1.5 rounded-full bg-amber-200 anim-sea-sparkle-1 shadow-[0_0_8px_#fde68a]"></span>
        <span class="absolute bottom-[12%] left-[52%] w-2 h-2 rounded-full bg-yellow-100 anim-sea-sparkle-2 shadow-[0_0_10px_#fef08a]"></span>
        <span class="absolute bottom-[6%] left-[48%] w-1.5 h-1.5 rounded-full bg-orange-200 anim-sea-sparkle-3 shadow-[0_0_8px_#fbbf24]"></span>
        <span class="absolute bottom-[14%] left-[42%] w-1 h-1 rounded-full bg-amber-100 anim-sea-sparkle-1 shadow-[0_0_6px_#fde68a]" style="animation-delay: 1.5s;"></span>
        <span class="absolute bottom-[10%] left-[56%] w-1.5 h-1.5 rounded-full bg-yellow-200 anim-sea-sparkle-2 shadow-[0_0_8px_#fef08a]" style="animation-delay: 2.1s;"></span>
        <span class="absolute bottom-[5%] left-[50%] w-2 h-2 rounded-full bg-amber-200 anim-sea-sparkle-3 shadow-[0_0_10px_#fbbf24]" style="animation-delay: 0.8s;"></span>
      </div>
    `;
  }

  return `
    <div id="theme-atmosphere" class="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-opacity duration-700" aria-hidden="true">
      ${content}
    </div>
  `;
}
