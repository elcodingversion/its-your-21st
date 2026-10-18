import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  RibbonBow,
  BirthdayCakeDoodle,
  SparkleStar,
  HeartSticker,
  WashiTape,
  VintageStamp,
  PaperClip,
} from './ScrapbookDoodles';
import { sounds } from '../utils/sound';

interface CalendarStageProps {
  onNext: () => void;
  onPrev: () => void;
  onCelebrate: () => void;
}

export const CalendarStage: React.FC<CalendarStageProps> = ({
  onNext,
  onPrev,
  onCelebrate,
}) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleCakeClick = () => {
    if (!candlesBlown) {
      setCandlesBlown(true);
      setWishMade(true);
      sounds.playFanfare();
      onCelebrate();
    } else {
      setCandlesBlown(false);
      sounds.playPop();
    }
  };

  const handleLetterClick = () => {
    sounds.playPop();
    onNext();
  };

  // October 2026 Calendar days calculation:
  // Oct 1, 2026 is Thursday
  // Days of week: S M T W T F S
  // Blank slots: Sun, Mon, Tue, Wed = 4 empty cells
  const emptyDays = [null, null, null, null];
  const daysInOctober = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -20, transition: { duration: 0.35 } }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto relative px-2.5 sm:px-3 py-3 sm:py-4"
    >
      {/* Decorative scrap tape & paper clip on outer edge */}
      <div className="absolute -top-2.5 left-8 z-30 pointer-events-none">
        <WashiTape color="pink" angle={-3} className="w-20 sm:w-24 !h-3.5 text-[7px]" />
      </div>
      <div className="absolute top-2 right-4 z-30 hidden sm:block pointer-events-none">
        <PaperClip />
      </div>

      {/* Main Ivory Calendar Sheet */}
      <div className="relative bg-[#fbf7ee] rounded-xl sm:rounded-2xl border-2 border-[#543729] scrapbook-shadow p-3.5 sm:p-5 overflow-hidden">
        
        {/* Top Header / Scrapbook Ribbon & Title */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-[#e2d0bf] pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onPrev}
              className="text-[11px] font-hand text-[#8c674e] hover:text-[#543729] px-2 py-0.5 rounded bg-[#f3e7d6] border border-[#d6beaa] transition-colors cursor-pointer"
              title="Kembali ke sampul"
            >
              ← cover
            </button>
            <span className="text-[10px] font-typewriter text-[#987860] uppercase tracking-wider">
              page 01 · celebration
            </span>
          </div>

          <div className="flex items-center gap-1">
            <RibbonBow color="#f8b4c0" size={28} />
            <span className="font-handwriting text-xs sm:text-sm text-[#c9184a] font-bold">
              sweet 21
            </span>
          </div>
        </div>

        {/* Big Handwritten Header */}
        <div className="text-center my-1 relative">
          <div className="absolute -top-2 left-2 rotate-[-15deg] pointer-events-none">
            <SparkleStar size={14} color="#fca311" />
          </div>
          <div className="absolute -top-1 right-4 rotate-[12deg] pointer-events-none">
            <SparkleStar size={14} color="#f8b4c0" />
          </div>

          <h1 className="font-playful text-lg sm:text-2xl text-[#523321] tracking-wide leading-tight drop-shadow-xs">
            happy 21st birthday,
          </h1>
          <h2 className="font-handwriting text-2xl sm:text-3xl text-[#c9184a] font-bold drop-shadow-xs">
            Teh Ana! ♡
          </h2>

          <p className="font-hand text-xs sm:text-sm text-[#855e46] mt-0.5 tracking-wide">
            “today is all about you ♡”
          </p>
        </div>

        {/* Scrapbook Collage Grid: Mini Calendar + Birthday Cake Doodle */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          {/* Mini Calendar Card (takes 7 cols on sm) */}
          <div className="sm:col-span-7 bg-[#fffefb] border border-[#ebd8c7] rounded-xl p-3.5 shadow-xs relative">
            {/* Top Washi Tape */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
              <WashiTape color="yellow" angle={1} className="w-20 !h-4 text-[8px]" />
            </div>

            {/* Month Header */}
            <div className="flex items-center justify-between border-b border-[#ebd8c7] pb-1.5 mb-2 mt-1 px-1">
              <span className="font-typewriter text-xs font-bold text-[#63432f] uppercase tracking-widest">
                OCTOBER 2026
              </span>
              <span className="text-[10px] font-hand text-[#c9184a] font-bold bg-[#ffe5ec] px-1.5 py-0.5 rounded-full border border-[#f8b4c0]">
                21st Year ✨
              </span>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center text-[10px] font-typewriter text-[#9c7d67] mb-1 font-semibold">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span className="text-[#c9184a] font-bold">F</span>
              <span>S</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center font-typewriter text-xs text-[#523726]">
              {/* Empty slots for Sun-Wed */}
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="h-6" />
              ))}

              {/* Days 1 to 31 */}
              {daysInOctober.map((day) => {
                const isTheBirthday = day === 16;
                return (
                  <div
                    key={day}
                    className="h-6 flex items-center justify-center relative"
                  >
                    {isTheBirthday ? (
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative z-10 w-6 h-6 rounded-full bg-[#f8b4c0] border border-[#e65c7b] flex items-center justify-center shadow-xs cursor-pointer"
                        title="Teh Ana's 21st Birthday! 🎂"
                      >
                        <span className="font-bold text-[#5c1c2b] text-[11px]">
                          16
                        </span>
                        {/* Little yellow heart sticker badge pinned on 16 */}
                        <span className="absolute -top-2 -right-1 text-[9px] pointer-events-none">
                          💛
                        </span>
                      </motion.div>
                    ) : (
                      <span className="hover:text-[#c9184a] transition-colors">
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Footer Note */}
            <div className="mt-2 pt-1.5 border-t border-dashed border-[#ebd8c7] flex items-center justify-between text-[10px] font-hand text-[#8b654e]">
              <span>★ Friday, 16 Oct 2026</span>
              <span className="text-[#c9184a] font-bold">Teh Ana's Day!</span>
            </div>
          </div>

          {/* Interactive Cake Doodle & Stickers (takes 5 cols on sm) */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center bg-[#faf3e3] border border-[#e5d0bc] rounded-xl p-3 relative">
            {/* Stamp at top right */}
            <div className="absolute -top-2 -right-2 transform rotate-6 z-10">
              <VintageStamp day="16" text="BDAY" className="scale-75" />
            </div>

            <BirthdayCakeDoodle
              blown={candlesBlown}
              onBlow={handleCakeClick}
            />

            {wishMade && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-[11px] font-handwriting text-[#c9184a] font-bold text-center"
              >
                ✧ wish made for Teh Ana! ✧
              </motion.div>
            )}
          </div>
        </div>

        {/* Polaroid-style Sticky Note with message */}
        <div className="mt-4 p-3 bg-[#fff9ea] border border-[#e8d5b5] rounded-lg rotate-[-0.8deg] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <p className="font-hand text-xs sm:text-sm text-[#664632]">
              May your 21st chapter be filled with soft days, endless smiles, and warmth.
            </p>
          </div>
          <HeartSticker color="#fee49c" size={20} className="shrink-0" />
        </div>

        {/* Action Button: "there's a letter for you..." */}
        <div className="mt-4 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLetterClick}
            className="group relative cursor-pointer px-5 sm:px-6 py-2.5 sm:py-3 bg-[#fdf2d0] hover:bg-[#fee7a8] active:bg-[#fddb83] text-[#4a2818] font-hand text-base sm:text-lg font-bold rounded-full border-2 border-[#543729] shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-sm group-hover:rotate-12 transition-transform duration-200">
              ✉️
            </span>
            <span>there's a letter for you...</span>
            <span className="text-xs text-[#8c5737] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </motion.button>

          <span className="text-[11px] font-handwriting text-[#9e7a62] tracking-wide mt-0.5">
            from Helma with lots of love ♡
          </span>
        </div>

        {/* Bottom decorative washi tape */}
        <div className="absolute -bottom-2 left-10 z-20 pointer-events-none">
          <WashiTape color="mint" angle={2} className="w-18 sm:w-20 !h-3.5 text-[7px]" />
        </div>
      </div>
    </motion.div>
  );
};
