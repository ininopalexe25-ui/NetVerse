/**
 * ThemeAtmosphere.js
 * Renders rich, vibrant ("jreng"), yet tastefully balanced atmospheric ambient visual elements
 * for specific themes:
 * - midnight: Radiant celestial crescent moon with corona + Aurora Borealis wave + shooting stars/meteors + dense star & network constellation field
 * - emerald: 3-layer enchanted forest canopy + bioluminescent mist + 22+ wandering fireflies & glowing spores in emerald, mint, and lime-gold
 * - violet: Pulsing cosmic ultraviolet nebula + cyber fiber data streams + floating geometric crystal nodes & stardust
 * - sakura: Layered 3D tumbling cherry blossom petals across 3 visual depths + cyber mountain horizon + luminous pink pollen orbs
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

      <!-- Cyber Mountain Ridge Skyline at Bottom with Neon Pink Horizon Fringe -->
      <div class="absolute bottom-0 left-0 right-0 h-32 sm:h-44 pointer-events-none opacity-45 flex items-end">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" class="w-full h-full">
          <defs>
            <linearGradient id="sakura-mountain" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#be185d" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#190714" stop-opacity="0.95" />
            </linearGradient>
          </defs>
          <path d="M0,180 L0,120 Q320,60 640,110 Q960,30 1200,90 Q1340,50 1440,75 L1440,180 Z" fill="url(#sakura-mountain)"/>
          <path d="M0,120 Q320,60 640,110 Q960,30 1200,90 Q1340,50 1440,75" stroke="#f472b6" stroke-width="1.5" stroke-opacity="0.6" fill="none"/>
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
