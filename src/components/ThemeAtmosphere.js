/**
 * ThemeAtmosphere.js
 * Renders unique, lightweight atmospheric ambient visual elements for specific themes:
 * - midnight: Celestial starry sky + glowing crescent moon
 * - emerald: Dark enchanted forest canopy silhouettes + rising bioluminescent fireflies
 * - violet: Cosmic ultraviolet nebula waves + floating crystal stardust nodes
 * - sakura: Falling cherry blossom petals + warm dusky cyber-pink horizon
 * - light & dark: Clean minimal substrate, zero extra elements
 */

export function renderThemeAtmosphere(theme = 'dark') {
  if (theme === 'light' || theme === 'dark') {
    return `<div id="theme-atmosphere" class="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none" aria-hidden="true"></div>`;
  }

  let content = '';

  if (theme === 'midnight') {
    content = `
      <!-- Celestial Crescent Moon in Top Right -->
      <div class="absolute top-16 right-8 sm:right-16 md:right-24 w-20 h-20 anim-moon opacity-80 pointer-events-none">
        <svg viewBox="0 0 100 100" class="w-full h-full text-sky-200 fill-current drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
          <!-- Crescent Moon Shape -->
          <path d="M50 10 A40 40 0 1 0 90 50 A32 32 0 1 1 50 10 Z" fill="url(#moon-gradient)"/>
          <defs>
            <linearGradient id="moon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#bae6fd" />
              <stop offset="60%" stop-color="#7dd3fc" />
              <stop offset="100%" stop-color="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Constellation & Twinkling Stars Field -->
      <div class="absolute inset-0 opacity-70">
        <!-- Star Clusters -->
        <span class="absolute top-[12%] left-[15%] w-1.5 h-1.5 rounded-full bg-sky-200 anim-star-1 shadow-[0_0_6px_#38bdf8]"></span>
        <span class="absolute top-[22%] left-[28%] w-1 h-1 rounded-full bg-white anim-star-2 shadow-[0_0_4px_#fff]"></span>
        <span class="absolute top-[18%] left-[45%] w-2 h-2 rounded-full bg-sky-100 anim-star-3 shadow-[0_0_8px_#38bdf8]"></span>
        <span class="absolute top-[28%] left-[70%] w-1.5 h-1.5 rounded-full bg-cyan-200 anim-star-1 shadow-[0_0_6px_#06b6d4]"></span>
        <span class="absolute top-[40%] left-[10%] w-1 h-1 rounded-full bg-sky-300 anim-star-2 shadow-[0_0_4px_#38bdf8]"></span>
        <span class="absolute top-[48%] left-[85%] w-1.5 h-1.5 rounded-full bg-white anim-star-3 shadow-[0_0_6px_#fff]"></span>
        <span class="absolute top-[60%] left-[25%] w-2 h-2 rounded-full bg-sky-200 anim-star-1 shadow-[0_0_8px_#38bdf8]"></span>
        <span class="absolute top-[68%] left-[62%] w-1 h-1 rounded-full bg-sky-100 anim-star-2 shadow-[0_0_4px_#bae6fd]"></span>
        <span class="absolute top-[78%] left-[40%] w-1.5 h-1.5 rounded-full bg-cyan-100 anim-star-3 shadow-[0_0_6px_#06b6d4]"></span>
        <span class="absolute top-[85%] left-[80%] w-1 h-1 rounded-full bg-white anim-star-1 shadow-[0_0_4px_#fff]"></span>
        <span class="absolute top-[32%] left-[52%] w-1 h-1 rounded-full bg-sky-300 anim-star-2 shadow-[0_0_4px_#38bdf8]"></span>
        <span class="absolute top-[75%] left-[12%] w-1.5 h-1.5 rounded-full bg-sky-200 anim-star-3 shadow-[0_0_6px_#38bdf8]"></span>

        <!-- Subtle Constellation Link Lines -->
        <svg class="absolute inset-0 w-full h-full stroke-sky-400/20 stroke-[0.8] stroke-dasharray-[3_3]">
          <line x1="15%" y1="12%" x2="28%" y2="22%" />
          <line x1="28%" y1="22%" x2="45%" y2="18%" />
          <line x1="45%" y1="18%" x2="52%" y2="32%" />
          <line x1="70%" y1="28%" x2="85%" y2="48%" />
          <line x1="25%" y1="60%" x2="40%" y2="78%" />
          <line x1="40%" y1="78%" x2="62%" y2="68%" />
        </svg>
      </div>
    `;
  } else if (theme === 'emerald') {
    content = `
      <!-- Dark Forest Canopy Silhouettes at Bottom Horizon -->
      <div class="absolute bottom-0 left-0 right-0 h-40 sm:h-56 pointer-events-none opacity-50 flex items-end">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" class="w-full h-full fill-[#021008] text-[#021008]">
          <!-- Layered pine & dark forest tree skyline silhouettes -->
          <path d="M0,200 L0,140 L35,165 L60,120 L95,160 L140,110 L180,165 L220,130 L260,170 L310,115 L360,160 L410,125 L460,168 L520,105 L580,165 L640,120 L700,170 L760,110 L820,160 L870,125 L930,168 L980,115 L1040,165 L1100,120 L1150,160 L1200,130 L1200,200 Z" opacity="0.7"/>
          <path d="M0,200 L0,160 L45,175 L80,145 L130,178 L185,140 L240,180 L300,148 L370,182 L430,150 L500,180 L570,142 L640,182 L710,145 L780,182 L850,150 L910,180 L970,140 L1030,178 L1090,148 L1140,178 L1200,155 L1200,200 Z" opacity="0.95"/>
        </svg>
      </div>

      <!-- Bioluminescent Spores / Floating Fireflies Drifting Upwards -->
      <div class="absolute inset-0">
        <span class="absolute bottom-[10%] left-[18%] w-2 h-2 rounded-full bg-emerald-400 anim-firefly-1 shadow-[0_0_10px_#10b981]"></span>
        <span class="absolute bottom-[15%] left-[32%] w-1.5 h-1.5 rounded-full bg-emerald-300 anim-firefly-2 shadow-[0_0_8px_#34d399]"></span>
        <span class="absolute bottom-[20%] left-[48%] w-2.5 h-2.5 rounded-full bg-emerald-400 anim-firefly-3 shadow-[0_0_12px_#10b981]"></span>
        <span class="absolute bottom-[8%] left-[65%] w-1.5 h-1.5 rounded-full bg-teal-300 anim-firefly-1 shadow-[0_0_8px_#2dd4bf]"></span>
        <span class="absolute bottom-[25%] left-[80%] w-2 h-2 rounded-full bg-emerald-300 anim-firefly-2 shadow-[0_0_10px_#34d399]"></span>
        <span class="absolute bottom-[18%] left-[88%] w-1.5 h-1.5 rounded-full bg-emerald-400 anim-firefly-3 shadow-[0_0_8px_#10b981]"></span>
        <span class="absolute bottom-[30%] left-[25%] w-2 h-2 rounded-full bg-teal-400 anim-firefly-2 shadow-[0_0_10px_#14b8a6]"></span>
        <span class="absolute bottom-[35%] left-[58%] w-1.5 h-1.5 rounded-full bg-emerald-300 anim-firefly-1 shadow-[0_0_8px_#10b981]"></span>
      </div>
    `;
  } else if (theme === 'violet') {
    content = `
      <!-- Cosmic Deep Purple Nebula Auroral Wave Glow -->
      <div class="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[120px] anim-nebula pointer-events-none"></div>
      <div class="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[100px] anim-nebula pointer-events-none" style="animation-delay: -5s;"></div>

      <!-- Floating Crystalline Stardust & Geometric Nodes -->
      <div class="absolute inset-0 opacity-60">
        <div class="absolute top-[18%] left-[20%] w-3 h-3 border border-purple-400/50 rotate-45 anim-crystal-1 shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
        <div class="absolute top-[35%] left-[75%] w-2.5 h-2.5 border border-fuchsia-400/50 rotate-12 anim-crystal-2 shadow-[0_0_8px_rgba(217,70,239,0.4)]"></div>
        <div class="absolute top-[60%] left-[15%] w-2 h-2 border border-purple-300/60 rotate-45 anim-crystal-1 shadow-[0_0_6px_rgba(192,132,252,0.4)]"></div>
        <div class="absolute top-[72%] left-[82%] w-3.5 h-3.5 border border-violet-400/50 rotate-30 anim-crystal-2 shadow-[0_0_10px_rgba(168,85,247,0.4)]"></div>
        <div class="absolute top-[85%] left-[45%] w-2 h-2 border border-purple-400/50 rotate-45 anim-crystal-1 shadow-[0_0_6px_rgba(168,85,247,0.4)]"></div>
        
        <!-- Stardust particles -->
        <span class="absolute top-[25%] left-[38%] w-1.5 h-1.5 rounded-full bg-purple-300 anim-star-1 shadow-[0_0_6px_#c084fc]"></span>
        <span class="absolute top-[52%] left-[62%] w-1.5 h-1.5 rounded-full bg-fuchsia-300 anim-star-2 shadow-[0_0_6px_#e879f9]"></span>
        <span class="absolute top-[80%] left-[28%] w-1 h-1 rounded-full bg-purple-200 anim-star-3 shadow-[0_0_4px_#d8b4fe]"></span>
      </div>
    `;
  } else if (theme === 'sakura') {
    content = `
      <!-- Dusky Cyber-Pink Warm Horizon Ambient -->
      <div class="absolute -top-24 right-1/4 w-[500px] h-[500px] rounded-full bg-pink-600/15 blur-[110px] pointer-events-none"></div>
      <div class="absolute bottom-0 left-10 w-[450px] h-[350px] rounded-full bg-rose-600/10 blur-[100px] pointer-events-none"></div>

      <!-- Falling Gentle Sakura Petals Drifting Downward -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Petal 1 -->
        <div class="absolute -top-6 left-[12%] anim-sakura-1">
          <svg class="w-4 h-4 text-pink-300 fill-current opacity-80 drop-shadow-[0_0_4px_rgba(244,114,182,0.5)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <!-- Petal 2 -->
        <div class="absolute -top-6 left-[30%] anim-sakura-2">
          <svg class="w-3.5 h-3.5 text-rose-300 fill-current opacity-75 drop-shadow-[0_0_4px_rgba(251,113,133,0.5)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <!-- Petal 3 -->
        <div class="absolute -top-6 left-[52%] anim-sakura-3">
          <svg class="w-4.5 h-4.5 text-pink-200 fill-current opacity-85 drop-shadow-[0_0_6px_rgba(244,114,182,0.6)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <!-- Petal 4 -->
        <div class="absolute -top-6 left-[72%] anim-sakura-4">
          <svg class="w-3.5 h-3.5 text-rose-200 fill-current opacity-70 drop-shadow-[0_0_4px_rgba(244,114,182,0.5)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
        <!-- Petal 5 -->
        <div class="absolute -top-6 left-[88%] anim-sakura-5">
          <svg class="w-4 h-4 text-pink-300 fill-current opacity-80 drop-shadow-[0_0_4px_rgba(244,114,182,0.5)]" viewBox="0 0 30 30">
            <path d="M15,0 C22,6 30,12 25,22 C20,30 10,28 5,20 C0,12 8,6 15,0 Z"/>
          </svg>
        </div>
      </div>
    `;
  }

  return `
    <div id="theme-atmosphere" class="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-opacity duration-700" aria-hidden="true">
      ${content}
    </div>
  `;
}
