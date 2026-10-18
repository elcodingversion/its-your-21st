import React from 'react';

// Pastel Ribbon Bow
export const RibbonBow: React.FC<{
  className?: string;
  color?: string;
  size?: number;
}> = ({ className = '', color = '#f8b4c0', size = 48 }) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-sm ${className}`}
    >
      {/* Left Loop */}
      <path
        d="M32 20C26 10 12 8 8 16C4 24 16 32 30 22"
        fill={color}
        stroke="#4a2e1f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Loop */}
      <path
        d="M32 20C38 10 52 8 56 16C60 24 48 32 34 22"
        fill={color}
        stroke="#4a2e1f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ribbon Tails */}
      <path
        d="M27 24C24 32 18 42 14 44C19 41 24 43 28 36"
        fill={color}
        stroke="#4a2e1f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 24C40 32 46 42 50 44C45 41 40 43 36 36"
        fill={color}
        stroke="#4a2e1f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Knot */}
      <ellipse
        cx="32"
        cy="21"
        rx="4.5"
        ry="4"
        fill="#e698a7"
        stroke="#4a2e1f"
        strokeWidth="2"
      />
      {/* Highlight crease */}
      <path
        d="M20 18C23 16 26 17 28 19"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};

// Hand-drawn Birthday Cake with animated candle flame
export const BirthdayCakeDoodle: React.FC<{
  blown?: boolean;
  onBlow?: () => void;
  className?: string;
}> = ({ blown = false, onBlow, className = '' }) => {
  return (
    <div
      onClick={onBlow}
      className={`relative inline-flex flex-col items-center cursor-pointer group select-none ${className}`}
      title={blown ? "Click to relight candles!" : "Click to blow out the candles!"}
    >
      <svg
        width="110"
        height="100"
        viewBox="0 0 110 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform group-hover:scale-105 duration-200"
      >
        {/* Candle 1 (left) */}
        <rect
          x="38"
          y="24"
          width="5.5"
          height="18"
          rx="2"
          fill="#fee49c"
          stroke="#543729"
          strokeWidth="1.5"
        />
        {/* Candle 2 (middle - slightly taller for 21) */}
        <rect
          x="52"
          y="18"
          width="6"
          height="24"
          rx="2"
          fill="#f8b4c0"
          stroke="#543729"
          strokeWidth="1.5"
        />
        {/* Candle 3 (right) */}
        <rect
          x="66"
          y="24"
          width="5.5"
          height="18"
          rx="2"
          fill="#b8e0d2"
          stroke="#543729"
          strokeWidth="1.5"
        />

        {/* Wicks */}
        <path d="M40.5 24V20" stroke="#543729" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M55 18V14" stroke="#543729" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M68.5 24V20" stroke="#543729" strokeWidth="1.5" strokeLinecap="round" />

        {/* Flames (disappear or smoke if blown) */}
        {!blown ? (
          <>
            {/* Flame 1 */}
            <path
              d="M40.5 10C38 14 38 18 40.5 19C43 18 43 14 40.5 10Z"
              fill="#ffb703"
              stroke="#fb8500"
              strokeWidth="1"
              className="animate-pulse"
            />
            {/* Center Flame (21) */}
            <path
              d="M55 3C51.5 8 51.5 13 55 14C58.5 13 58.5 8 55 3Z"
              fill="#ff4d6d"
              stroke="#c9184a"
              strokeWidth="1"
              className="animate-bounce"
              style={{ animationDuration: '1.2s' }}
            />
            {/* Flame 3 */}
            <path
              d="M68.5 10C66 14 66 18 68.5 19C71 18 71 14 68.5 10Z"
              fill="#ffb703"
              stroke="#fb8500"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
          </>
        ) : (
          /* Smoke curls */
          <>
            <path
              d="M40.5 18Q38 14 41 11T39 7"
              stroke="#a89a8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="2 2"
            />
            <path
              d="M55 12Q52 8 56 5T53 2"
              stroke="#a89a8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="2 2"
            />
            <path
              d="M68.5 18Q71 14 68 11T70 7"
              stroke="#a89a8f"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="2 2"
            />
          </>
        )}

        {/* Top Cake Tier */}
        <path
          d="M26 42H84C86 42 88 44 88 46V54C88 56 86 58 84 58H26C24 58 22 56 22 54V46C22 44 24 42 26 42Z"
          fill="#fbf7ee"
          stroke="#543729"
          strokeWidth="2"
        />
        {/* Frosting Drips Top Tier */}
        <path
          d="M22 46C25 50 28 46 31 49C34 52 38 48 42 51C46 54 50 48 55 52C60 48 64 53 68 49C72 47 76 51 80 47C84 50 86 46 88 46"
          fill="#f8b4c0"
          stroke="#543729"
          strokeWidth="1.5"
        />

        {/* Bottom Cake Tier */}
        <path
          d="M16 58H94C96 58 98 60 98 63V82C98 84 96 86 94 86H16C14 86 12 84 12 82V63C12 60 14 58 16 58Z"
          fill="#fdfaf2"
          stroke="#543729"
          strokeWidth="2"
        />

        {/* Frosting Drips Bottom Tier */}
        <path
          d="M12 63C16 68 20 62 25 67C30 72 36 64 42 69C48 74 54 65 60 70C66 65 72 71 78 66C84 64 88 70 94 65C96 68 97 64 98 63"
          fill="#fee49c"
          stroke="#543729"
          strokeWidth="1.5"
        />

        {/* "21" written in icing on cake */}
        <text
          x="55"
          y="79"
          textAnchor="middle"
          fontFamily="'Caveat', cursive"
          fontSize="18"
          fontWeight="bold"
          fill="#e65c7b"
        >
          21 ♡
        </text>

        {/* Cake Stand / Plate */}
        <path
          d="M8 86C20 86 90 86 102 86C104 86 105 88 104 90C101 93 90 95 55 95C20 95 9 93 6 90C5 88 6 86 8 86Z"
          fill="#e6d5c3"
          stroke="#543729"
          strokeWidth="1.5"
        />
        {/* Stand base */}
        <path
          d="M48 95L44 99H66L62 95"
          fill="#d8c2ad"
          stroke="#543729"
          strokeWidth="1.5"
        />
      </svg>
      <span className="text-[11px] font-hand text-[#8b5e43] mt-0.5 tracking-wide">
        {blown ? "✨ tiup lagi!" : "✨ tap to blow candles!"}
      </span>
    </div>
  );
};

// Hand-drawn Washi Tape Strip
export const WashiTape: React.FC<{
  color?: 'pink' | 'mint' | 'yellow' | 'checkered';
  className?: string;
  angle?: number;
}> = ({ color = 'pink', className = '', angle = -2 }) => {
  const getStyle = () => {
    switch (color) {
      case 'mint':
        return 'bg-[#c5e6dc] border-[#a5d4c7] text-[#2c584b]';
      case 'yellow':
        return 'bg-[#fef0b8] border-[#f4df96] text-[#705814]';
      case 'checkered':
        return 'bg-[#ffe5ec] border-[#f7cad0] text-[#a03d52]';
      case 'pink':
      default:
        return 'bg-[#ffd3dc] border-[#f8b4c0] text-[#934557]';
    }
  };

  return (
    <div
      style={{
        transform: `rotate(${angle}deg)`,
      }}
      className={`h-6 px-4 py-0.5 border-t border-b opacity-90 shadow-sm flex items-center justify-center text-[10px] font-hand tracking-widest uppercase select-none pointer-events-none relative before:content-[''] before:absolute before:-left-1.5 before:top-0 before:bottom-0 before:w-2 before:bg-inherit before:[clip-path:polygon(100%_0,0_25%,100%_50%,0_75%,100%_100%)] after:content-[''] after:absolute after:-right-1.5 after:top-0 after:bottom-0 after:w-2 after:bg-inherit after:[clip-path:polygon(0_0,100%_25%,0_50%,100%_75%,0_100%)] ${getStyle()} ${className}`}
    >
      <span className="opacity-70">✦ ✦ ✦</span>
    </div>
  );
};

// Vintage Postage Stamp Badge
export const VintageStamp: React.FC<{
  day?: string;
  year?: string;
  text?: string;
  className?: string;
}> = ({ day = "16", year = "2026", text = "SPECIAL DAY", className = "" }) => {
  return (
    <div
      className={`relative inline-block p-2 bg-[#fdf8f0] border-2 border-dashed border-[#d1baa5] rounded shadow-sm text-center select-none transform rotate-3 ${className}`}
    >
      <div className="border border-[#e0c9b4] p-1.5 rounded-sm bg-[#faf4e6]">
        <div className="text-[9px] font-typewriter uppercase tracking-wider text-[#9c7a65]">
          {text}
        </div>
        <div className="text-xl font-playful text-[#bd4b62] leading-none my-0.5">
          {day}
        </div>
        <div className="text-[8px] font-typewriter text-[#9c7a65]">
          OCT · {year}
        </div>
      </div>
    </div>
  );
};

// Sparkle Star Icon
export const SparkleStar: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 20, color = "#ffc83b", className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block filter drop-shadow-sm ${className}`}
    >
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
};

// Pastel Heart Sticker
export const HeartSticker: React.FC<{
  color?: string;
  size?: number;
  className?: string;
}> = ({ color = "#f8b4c0", size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="#543729"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block filter drop-shadow-xs transition-transform hover:scale-125 duration-150 cursor-pointer ${className}`}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
};

// Scrapbook paper clip
export const PaperClip: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      width="20"
      height="45"
      viewBox="0 0 24 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-sm ${className}`}
    >
      <path
        d="M16 12V38C16 42.4183 12.4183 46 8 46C3.58172 46 0 42.4183 0 38V8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8V35C16 37.2091 14.2091 39 12 39C9.79086 39 8 37.2091 8 35V12"
        transform="translate(4, 2)"
        stroke="#8d6e63"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
