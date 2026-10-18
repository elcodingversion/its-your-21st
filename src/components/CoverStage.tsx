import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RibbonBow, SparkleStar, HeartSticker, WashiTape, VintageStamp } from './ScrapbookDoodles';
import { sounds } from '../utils/sound';

interface CoverStageProps {
  onOpen: () => void;
}

export const CoverStage: React.FC<CoverStageProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    sounds.playPop();
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -25, transition: { duration: 0.4 } }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm mx-auto relative px-3 py-4"
    >
      {/* Little floating decorative stars outside the journal */}
      <div className="absolute -top-2 left-4 animate-pulse">
        <SparkleStar size={20} color="#ffd166" />
      </div>
      <div className="absolute top-6 -right-1">
        <HeartSticker color="#f8b4c0" size={22} className="rotate-12" />
      </div>
      <div className="absolute -bottom-1 -left-1">
        <HeartSticker color="#fee49c" size={18} className="-rotate-12" />
      </div>

      {/* Main Journal / Cream Envelope Container */}
      <div className="relative bg-[#fbf7ee] rounded-xl sm:rounded-2xl border-2 border-[#543729] scrapbook-shadow p-4 sm:p-6 overflow-hidden transition-all duration-300">
        
        {/* Washi tapes on top corners for realistic scrapbook tape aesthetic */}
        <div className="absolute -top-2 left-4 z-20 pointer-events-none">
          <WashiTape color="pink" angle={-5} className="w-20 !h-4 text-[8px]" />
        </div>
        <div className="absolute -top-2 right-4 z-20 pointer-events-none">
          <WashiTape color="mint" angle={4} className="w-18 !h-4 text-[8px]" />
        </div>

        {/* Vintage Stamp at top right */}
        <div className="absolute top-5 right-3 z-10 hidden sm:block pointer-events-none">
          <VintageStamp day="21" year="2026" text="SPECIAL" className="scale-75 origin-top-right" />
        </div>

        {/* Cream Envelope Flap Mockup (Folded paper header) */}
        <div className="mt-2 mb-2 flex flex-col items-center">
          <motion.div
            animate={isOpening ? { scale: [1, 1.1, 0.8], rotate: [0, 5, -5] } : {}}
            transition={{ duration: 0.4 }}
          >
            <RibbonBow color="#f8b4c0" size={42} className="mb-1" />
          </motion.div>

          <span className="text-[10px] uppercase tracking-widest font-typewriter text-[#8a6850] bg-[#f5ecdc] px-2.5 py-0.5 rounded border border-[#dfcebd]">
            october 2026 · birthday edition
          </span>
        </div>

        {/* Inner Card / Notebook Paper Panel */}
        <div className="relative bg-[#fdfaf2] border border-[#e8d7c4] rounded-lg p-3.5 sm:p-4 text-center my-3 shadow-inner">
          {/* Subtle paper stitches */}
          <div className="absolute inset-1 border border-dashed border-[#d8c3ae] rounded pointer-events-none" />

          {/* Tagline 1 */}
          <p className="font-handwriting text-xl sm:text-2xl text-[#5c3826] font-semibold leading-snug">
            “psst... someone special turns 21!”
          </p>

          <div className="w-12 h-0.5 bg-[#e4cfbd] mx-auto my-2 rounded-full" />

          {/* Subtitle */}
          <p className="font-hand text-sm sm:text-base text-[#855e46] tracking-wide">
            a little something for you, <span className="font-semibold text-[#c9184a]">Teh Ana ♡</span>
          </p>

          {/* Small decorative heart line */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#d19aa6] mt-1.5">
            <span>✧</span>
            <span>♡</span>
            <span>✧</span>
          </div>
        </div>

        {/* Interactive Open Button */}
        <div className="mt-4 flex flex-col items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative cursor-pointer px-5 sm:px-6 py-2.5 sm:py-3 bg-[#f8b4c0] hover:bg-[#f69eaf] active:bg-[#f0859a] text-[#4a2818] font-hand text-base sm:text-lg font-bold rounded-full border-2 border-[#543729] shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-sm group-hover:scale-125 transition-transform duration-200">
              💌
            </span>
            <span>open your little surprise ♡</span>
          </motion.button>

          {/* Helper hint */}
          <span className="text-[11px] font-handwriting text-[#9e7a62] animate-bounce tracking-wide mt-0.5">
            ~ tap to open ~
          </span>
        </div>

        {/* Bottom edge washi tape decoration */}
        <div className="absolute -bottom-2 right-8 z-20 pointer-events-none">
          <WashiTape color="yellow" angle={-3} className="w-16 !h-3.5 text-[7px]" />
        </div>
      </div>
    </motion.div>
  );
};
