/**
 * NetVerse - Official Brand Vector Logo Component
 * Eliminates all placeholder text marks and provides a bespoke, high-precision SVG brandmark.
 * Symbolism:
 * - Interconnected network topology nodes (Ethernet / UTP RJ-45 copper pins).
 * - Isometric dimension (Virtual 3D Laboratory space).
 * - Monogram "N" & "V" forged from precision copper (#f59e0b) and signal cyan (#38bdf8).
 */

export function renderNetVerseLogo({ size = 32, className = '' } = {}) {
  return `
    <svg 
      class="${className}" 
      width="${size}" 
      height="${size}" 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo NetVerse"
    >
      <defs>
        <!-- Titanium Dark Base Gradient -->
        <linearGradient id="nv-bezel-grad-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#161e2e" />
          <stop offset="100%" stop-color="#070a12" />
        </linearGradient>

        <!-- Precision Copper Gradient (N-Trace & Pins) -->
        <linearGradient id="nv-copper-grad-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef3c7" />
          <stop offset="35%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>

        <!-- Cyber Signal Cyan Gradient (V-Trace & Gateway) -->
        <linearGradient id="nv-cyan-grad-${size}" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0284c7" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>

        <!-- Ambient Amber Glow Filter -->
        <filter id="nv-glow-${size}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#f59e0b" flood-opacity="0.5" />
        </filter>
      </defs>

      <!-- Chassis Shell: Titanium Bezel with Crisp 8px Radius -->
      <rect 
        x="1" 
        y="1" 
        width="34" 
        height="34" 
        rx="8" 
        fill="url(#nv-bezel-grad-${size})" 
        stroke="rgba(255, 255, 255, 0.14)" 
        stroke-width="1.2" 
      />

      <!-- Subtle Network Topology Grid Traces -->
      <path d="M7 18H29" stroke="rgba(255, 255, 255, 0.05)" stroke-width="0.8" stroke-dasharray="1.5 1.5" />
      <path d="M18 7V29" stroke="rgba(255, 255, 255, 0.05)" stroke-width="0.8" stroke-dasharray="1.5 1.5" />

      <!-- Isometric Network Polygon Spine (NetVerse Dimensional Node) -->
      <path 
        d="M18 7L28 13V23L18 29L8 23V13L18 7Z" 
        stroke="rgba(245, 158, 11, 0.15)" 
        stroke-width="0.9" 
        stroke-linejoin="round"
      />

      <!-- 'N' Geometric Circuit Trace (Copper) -->
      <path 
        d="M11 25.5V11L19 25V11" 
        stroke="url(#nv-copper-grad-${size})" 
        stroke-width="2.4" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        filter="url(#nv-glow-${size})"
      />

      <!-- 'V' Overlapping Vector Wave (Signal Cyan) -->
      <path 
        d="M17 14L22.5 25.5L27 11.5" 
        stroke="url(#nv-cyan-grad-${size})" 
        stroke-width="2.2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />

      <!-- Micro RJ-45 Copper Terminal Node Pins -->
      <circle cx="11" cy="11" r="1.8" fill="#fbbf24" stroke="#070a12" stroke-width="0.8" />
      <circle cx="11" cy="25.5" r="1.8" fill="#f59e0b" stroke="#070a12" stroke-width="0.8" />
      <circle cx="19" cy="25" r="2" fill="#fef3c7" stroke="#070a12" stroke-width="0.8" />
      <circle cx="22.5" cy="25.5" r="1.8" fill="#38bdf8" stroke="#070a12" stroke-width="0.8" />
      <circle cx="27" cy="11.5" r="1.8" fill="#38bdf8" stroke="#070a12" stroke-width="0.8" />
    </svg>
  `;
}
