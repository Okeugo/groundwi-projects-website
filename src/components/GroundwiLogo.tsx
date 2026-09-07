import React from 'react';

interface GroundwiLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textClassName?: string;
  variant?: 'full' | 'icon-only' | 'stacked';
}

export const GroundwiLogo: React.FC<GroundwiLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  textClassName = '',
  variant = 'icon-only'
}) => {
  const icon = (
    <svg 
      viewBox="0 0 200 200" 
      width={size} 
      height={size} 
      className={`shrink-0 drop-shadow-md transition-transform duration-300 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Diamond Shadow/Glow (Subtle) */}
      <g transform="translate(100, 100) rotate(45)">
        {/* Yellow Bar (Top-Left Facet) */}
        <rect 
          x="-58" 
          y="-26" 
          width="28" 
          height="52" 
          fill="#F7BA1E" 
        />

        {/* Orange Segment (Wraps Left Corner & Entire Lower-Left Facet) */}
        <path 
          d="M -58,26 L -30,26 L -30,30 L 58,30 L 58,58 L -58,58 Z" 
          fill="#FF721F" 
        />

        {/* Cyan Blue Bar (Lower-Right Facet) */}
        <rect 
          x="30" 
          y="-24" 
          width="28" 
          height="54" 
          fill="#00A3E8" 
        />

        {/* Crimson Red Segment (Top-Right Facet & Center Stylized G-Hook) */}
        <path 
          d="M -58,-58 L 58,-58 L 58,-24 L 28,-24 L 28,14 L -6,14 L -6,-30 L -58,-30 Z" 
          fill="#BE233D" 
        />
      </g>
    </svg>
  );

  if (variant === 'icon-only' && !showText) {
    return icon;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        {icon}
        <div className="text-center">
          <span className="font-extrabold text-xl tracking-tight text-white font-['Space_Grotesk']">
            Groundwi <span className="text-[#00A3E8]">Projects</span>
          </span>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
            Integrated Site Intelligence
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon}
      {showText && (
        <div className={textClassName}>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-['Space_Grotesk']">
              Groundwi <span className="text-[#00A3E8]">Projects</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#00A3E8]/15 text-[#00A3E8] border border-[#00A3E8]/30">
              Site Intelligence
            </span>
          </div>
          <p className="text-[11px] text-slate-400 tracking-normal hidden md:block">
            One Team • One Document • Zero Ground Surprises
          </p>
        </div>
      )}
    </div>
  );
};
