'use client';

import React from 'react';
import Link from 'next/link';

interface ElevaroLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  href?: string;
  className?: string;
  animate?: boolean;
}

export default function ElevaroLogo({
  size = 'md',
  showText = true,
  showTagline = true,
  href = '/',
  className = '',
  animate = true,
}: ElevaroLogoProps) {
  // Dimensions mapping
  const sizeMap = {
    sm: { icon: 32, text: 'text-base', subtext: 'text-[8px]', spacing: 'gap-2.5', tracking: 'tracking-[0.24em]' },
    md: { icon: 40, text: 'text-lg', subtext: 'text-[9px]', spacing: 'gap-3', tracking: 'tracking-[0.28em]' },
    lg: { icon: 48, text: 'text-2xl', subtext: 'text-[10px]', spacing: 'gap-3.5', tracking: 'tracking-[0.32em]' },
    xl: { icon: 64, text: 'text-3xl', subtext: 'text-xs', spacing: 'gap-4', tracking: 'tracking-[0.36em]' },
  };

  const current = sizeMap[size];

  const logoContent = (
    <div className={`inline-flex items-center ${current.spacing} group select-none ${className}`}>
      {/* Precision Engineered Vector Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
        style={{ width: current.icon, height: current.icon }}
      >
        {/* Soft Ambient Radiance Glow behind the emblem */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gold-600/30 via-gold-400/20 to-amber-300/10 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />

        {/* Master SVG Emblem */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_4px_12px_rgba(201,169,110,0.35)]"
        >
          <defs>
            {/* Primary Champagne Gold Facet Gradient */}
            <linearGradient id="elvGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="25%" stopColor="#E9D39C" />
              <stop offset="55%" stopColor="#C9A96E" />
              <stop offset="85%" stopColor="#A88243" />
              <stop offset="100%" stopColor="#7E5F2A" />
            </linearGradient>

            {/* Specular Titanium Highlight */}
            <linearGradient id="elvTitaniumSheen" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1E22" />
              <stop offset="45%" stopColor="#3A3A40" />
              <stop offset="70%" stopColor="#E5E5E9" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Dark Precision Core Gradient */}
            <linearGradient id="elvDarkPlate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B1B1E" />
              <stop offset="50%" stopColor="#101012" />
              <stop offset="100%" stopColor="#08080A" />
            </linearGradient>

            {/* Sub-micron Corner Bevel Mask */}
            <linearGradient id="elvEdgeHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE7B3" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C9A96E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFE7B3" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Background Monolithic Rounded Squircle Tile */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="url(#elvDarkPlate)"
            stroke="url(#elvEdgeHighlight)"
            strokeWidth="1.2"
          />

          {/* Hairline Inner Inset Chamfer */}
          <rect
            x="4.5"
            y="4.5"
            width="39"
            height="39"
            rx="9.5"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.8"
          />

          {/* --- THE SOVEREIGN "E" ELEVATION GLYPH --- */}
          {/* Top Wing: Aerodynamic Bevel with Upward Angle */}
          <path
            d="M13 13.5H32.5L28.5 18.5H18.5V20H13V13.5Z"
            fill="url(#elvGoldPrimary)"
          />

          {/* Middle Wing: Quantum Pulse Blade with Floating Diamond Accent */}
          <path
            d="M13 22H25.5L22.5 26H18.5V27H13V22Z"
            fill="url(#elvGoldPrimary)"
          />

          {/* Bottom Wing: Architectural Foundation Tier */}
          <path
            d="M13 29H18.5V30H32.5L28.5 35H13V29Z"
            fill="url(#elvGoldPrimary)"
          />

          {/* Vertical Monolith Spine */}
          <path
            d="M13 13.5H17.5V35H13V13.5Z"
            fill="url(#elvGoldPrimary)"
            opacity="0.95"
          />

          {/* Ascending Chevron / North Star Jewel (Symbolizes "Technology, Elevated.") */}
          <g className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            {/* Triangular Ascension Crest */}
            <path
              d="M34.5 11.5L37.5 14.5L32 20L30.5 18.5L34.5 14.5H29.5V12.5H34.5V11.5Z"
              fill="#FFF6E0"
            />
            {/* High-carat Diamond Core Sparkle */}
            <circle
              cx="36.5"
              cy="12.5"
              r="1.8"
              fill="#FFFFFF"
              className="drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
            />
          </g>

          {/* Micro Geometric Accents (Circuit Nodes) */}
          <circle cx="15.2" cy="16" r="0.9" fill="#101012" />
          <circle cx="15.2" cy="24.5" r="0.9" fill="#101012" />
          <circle cx="15.2" cy="32" r="0.9" fill="#101012" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <span
              className={`font-black ${current.text} ${current.tracking} text-white font-display uppercase tracking-[0.26em] transition-colors duration-300 group-hover:text-gold-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}
            >
              ELEVARO
            </span>
            {/* Distinctive dot separator */}
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 ml-1.5 mt-0.5 shadow-[0_0_8px_rgba(201,169,110,0.8)]" />
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="w-2.5 h-[1px] bg-gold-500/50" />
              <span
                className={`font-extrabold ${current.subtext} uppercase tracking-[0.38em] text-gold-400/90 font-sans`}
              >
                ELECTRONICS
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="ELEVARO ELECTRONICS Home">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
