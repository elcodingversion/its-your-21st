import React, { useState, useEffect, useRef } from 'react';
import { WashiTape, HeartSticker } from './ScrapbookDoodles';
import { sounds } from '../utils/sound';

export const ScrapbookPolaroid: React.FC<{
  className?: string;
  onPhotoUploaded?: () => void;
}> = ({ className = '', onPhotoUploaded }) => {
  // Default directly to the uploaded photo in public/photo.jpg
  const [photoUrl, setPhotoUrl] = useState<string>('/photo.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('teh_ana_bday_photo');
      if (saved) {
        setPhotoUrl(saved);
        return;
      }
    } catch {}
  }, []);

  const handleFrameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sounds.playPop();
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPhotoUrl(result);
      try {
        localStorage.setItem('teh_ana_bday_photo', result);
      } catch {}
      onPhotoUploaded?.();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={handleFrameClick}
      className={`relative inline-block bg-[#fffefb] p-2 sm:p-2.5 pb-2.5 sm:pb-3 rounded-md border border-[#ebd8c7] shadow-md transform -rotate-1 hover:rotate-0 transition-all duration-300 select-none cursor-pointer group active:scale-98 ${className}`}
      title="Klik untuk mengganti foto dari galeri / perangkat"
    >
      {/* Top washi tape */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <WashiTape color="pink" angle={-1} className="w-14 sm:w-16 !h-3 text-[7px]" />
      </div>

      {/* Heart sticker on corner */}
      <div className="absolute -bottom-1 -right-1 z-10 pointer-events-none">
        <HeartSticker color="#f8b4c0" size={16} className="rotate-12" />
      </div>

      {/* Photo Frame Container (Sized smaller and comfortable for mobile) */}
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-[#fdf5eb] rounded-xs border border-[#ecd5c0] overflow-hidden flex items-center justify-center">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Foto Teh Ana"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
            onError={() => {
              // If public/photo.jpg fails to load for any reason, use fallback illustration
              setPhotoUrl('');
            }}
          />
        ) : (
          /* Default Warm Vintage Celebration Illustration Fallback */
          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-b from-[#fef8f0] to-[#fceee0]">
            <span className="text-xl sm:text-2xl mb-0.5 filter drop-shadow-xs">🎂</span>
            <p className="font-handwriting text-base sm:text-lg text-[#7d4e33] font-bold leading-tight">
              Teh Ana at 21
            </p>
            <p className="font-hand text-[10px] sm:text-[11px] text-[#a07153] mt-0.5">
              sweetest smile ♡
            </p>
          </div>
        )}

        {/* Hidden File Input triggered on frame click */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Polaroid Handwritten Caption */}
      <div className="pt-1.5 text-center pointer-events-none">
        <p className="font-handwriting text-xs sm:text-sm md:text-base text-[#5a3a27] font-semibold leading-tight">
          Teh Ana ♡ Sweet 21
        </p>
        <p className="font-typewriter text-[9px] sm:text-[10px] text-[#9c7b64] mt-0.5">
          16.10.2026 ✨
        </p>
      </div>
    </div>
  );
};
