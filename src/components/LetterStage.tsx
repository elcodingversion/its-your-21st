import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RibbonBow,
  SparkleStar,
  HeartSticker,
  WashiTape,
  VintageStamp,
  PaperClip,
} from './ScrapbookDoodles';
import { ScrapbookPolaroid } from './ScrapbookPolaroid';
import { sounds } from '../utils/sound';

interface LetterStageProps {
  onBackToCalendar: () => void;
  onRestart: () => void;
  onCelebrate: () => void;
}

const FULL_LETTER_PARAGRAPHS = [
  "happy birthday, Teh Ana! ♡",
  "Selamat bertambah usia yang ke-21, yaa!",
  "Di umur yang baru ini, semoga Teh Ana selalu dikelilingi hal-hal baik, dipertemukan dengan orang-orang yang tulus, dan diberi banyak alasan untuk tersenyum. Semoga semua yang sedang Teh Ana usahakan perlahan menemukan jalannya, semua doa baik segera menemukan waktunya, dan hari-hari ke depan membawa lebih banyak kebahagiaan.",
  "Jangan lupa bahagia, jangan terlalu keras sama diri sendiri, dan semoga Teh Ana selalu punya alasan untuk bangga dengan perjalanan yang sudah dilewati sampai hari ini.",
  "I hope 21 treats you gently and brings you beautiful little surprises. You deserve so many good things. ♡",
  "With lots of love,\nHelma ♡",
];

export const LetterStage: React.FC<LetterStageProps> = ({
  onBackToCalendar,
  onRestart,
  onCelebrate,
}) => {
  const fullText = FULL_LETTER_PARAGRAPHS.join("\n\n");
  
  // Keep onCelebrate in a ref to NEVER trigger re-renders
  const onCelebrateRef = useRef(onCelebrate);
  useEffect(() => {
    onCelebrateRef.current = onCelebrate;
  }, [onCelebrate]);

  // Track if typing has already completed
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number }>>([]);
  
  const isFinishedRef = useRef(false);
  const typingTimerRef = useRef<any>(null);
  const hasStartedRef = useRef(false);

  // Typewriter effect runs strictly once on mount
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    let index = 0;
    const speed = 16;

    const step = () => {
      index += 3;
      if (index >= fullText.length) {
        setDisplayedChars(fullText.length);
        setIsFinished(true);
        isFinishedRef.current = true;
        sounds.playFanfare();
        onCelebrateRef.current();
      } else {
        setDisplayedChars(index);
        typingTimerRef.current = setTimeout(step, speed);
      }
    };

    typingTimerRef.current = setTimeout(step, 300);

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [fullText]);

  // If user clicks while typing, instantly complete the text without resetting or hiding anything
  const handleContainerClick = () => {
    if (!isFinishedRef.current) {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      setDisplayedChars(fullText.length);
      setIsFinished(true);
      isFinishedRef.current = true;
      sounds.playPop();
    }
  };

  const handleSkipTyping = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    setDisplayedChars(fullText.length);
    setIsFinished(true);
    isFinishedRef.current = true;
    sounds.playPop();
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    const newId = Date.now() + Math.random();
    setFloatingHearts((prev) => [...prev, { id: newId, x: Math.random() * 60 - 30 }]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newId));
    }, 1500);
  };

  // Convert displayed characters back into formatted paragraphs
  const currentText = fullText.slice(0, displayedChars);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleContainerClick}
      className="w-full max-w-xl mx-auto relative px-2.5 sm:px-3 py-3 sm:py-4 cursor-default"
    >
      {/* Decorative Washi Tapes on corners */}
      <div className="absolute -top-2.5 left-6 z-30 pointer-events-none">
        <WashiTape color="pink" angle={-4} className="w-20 sm:w-24 !h-3.5 text-[7px]" />
      </div>
      <div className="absolute -top-2.5 right-6 z-30 pointer-events-none">
        <WashiTape color="yellow" angle={3} className="w-18 sm:w-22 !h-3.5 text-[7px]" />
      </div>

      <div className="absolute top-8 -right-2 z-30 hidden sm:block pointer-events-none">
        <PaperClip />
      </div>

      {/* Main Ivory Stationery Letter Sheet */}
      <div className="relative bg-lined-paper rounded-xl sm:rounded-2xl border-2 border-[#543729] scrapbook-shadow p-3.5 sm:p-6 overflow-hidden">
        
        {/* Paper crease mark */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#e0cfbe] opacity-50 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#e2cebc] pb-2 mb-3.5">
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBackToCalendar();
              }}
              className="text-[11px] font-hand text-[#8c674e] hover:text-[#543729] px-2 py-0.5 rounded bg-[#f3e7d6] border border-[#d6beaa] transition-colors cursor-pointer flex items-center gap-1"
              title="Kembali ke halaman kalender"
            >
              <span>←</span>
              <span>calendar</span>
            </button>
            <span className="text-[10px] font-typewriter text-[#987860] uppercase tracking-wider">
              page 02 · personal letter
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <VintageStamp day="21" year="2026" text="BDAY" className="scale-65 origin-right" />
            <RibbonBow color="#f8b4c0" size={26} />
          </div>
        </div>

        {/* Corner Stickers */}
        <div className="absolute top-24 right-5 opacity-80 pointer-events-none">
          <SparkleStar size={20} color="#ffb703" />
        </div>
        <div className="absolute top-44 left-3 opacity-70 pointer-events-none">
          <SparkleStar size={16} color="#f8b4c0" />
        </div>

        {/* Skip Typing Button (shown only while typing) */}
        {!isFinished && (
          <div className="flex justify-end mb-2">
            <button
              onClick={handleSkipTyping}
              className="text-xs font-hand text-[#8c674e] hover:text-[#c9184a] px-2.5 py-0.5 rounded-full bg-[#f6ebd9] border border-[#dfcebe] transition-colors cursor-pointer"
            >
              tampilkan langsung ⚡
            </button>
          </div>
        )}

        {/* Main Content Layout: Letter + Polaroid Photo Frame */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-center md:items-start">
          
          {/* Polaroid Photo Frame (as requested) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 flex flex-col items-center my-1 md:my-0"
          >
            <ScrapbookPolaroid onPhotoUploaded={() => onCelebrateRef.current()} />
          </div>

          {/* Letter Body in Handwritten Font */}
          <div className="flex-1 font-handwriting text-base sm:text-lg md:text-xl text-[#4a2e1f] leading-relaxed select-text space-y-2.5">
            {currentText.split("\n\n").map((para, idx) => {
              // Opening greeting
              if (idx === 0) {
                return (
                  <p key={idx} className="text-lg sm:text-xl md:text-2xl font-bold text-[#c9184a] pb-0.5">
                    {para}
                  </p>
                );
              }
              // Signature block
              if (para.includes("With lots of love")) {
                return (
                  <div key={idx} className="pt-2 text-right pr-1 sm:pr-2">
                    <p className="text-base sm:text-lg text-[#6b442e]">
                      With lots of love,
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#c9184a] font-handwriting mt-0.5">
                      Helma ♡
                    </p>
                  </div>
                );
              }

              return (
                <p key={idx} className="tracking-wide">
                  {para}
                </p>
              );
            })}

            {/* Typewriter cursor indicator while typing */}
            {!isFinished && (
              <span className="inline-block w-1.5 h-4 bg-[#c9184a] ml-1 animate-pulse" />
            )}
          </div>
        </div>

        {/* Interactive Floating Hearts Generator */}
        <div className="relative mt-5 pt-3 border-t-2 border-dashed border-[#e4cfbd] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleHeartClick}
              className="relative group p-1.5 bg-[#ffe5ec] hover:bg-[#ffd1dc] border border-[#f8b4c0] rounded-full cursor-pointer transition-transform active:scale-90"
              title="Kirim cinta untuk Teh Ana!"
            >
              <span className="text-base">💖</span>
              <AnimatePresence>
                {floatingHearts.map((heart) => (
                  <motion.span
                    key={heart.id}
                    initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -65, x: heart.x, scale: 1.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute top-0 left-2 text-base text-[#c9184a] pointer-events-none"
                  >
                    ♡
                  </motion.span>
                ))}
              </AnimatePresence>
            </button>
            <span className="text-[11px] font-hand text-[#8c674e]">
              tap heart for extra love!
            </span>
          </div>

          <HeartSticker color="#f8b4c0" size={20} className="rotate-6" />
        </div>

        {/* Penutup (Ending) Section: Appears once letter is complete or shown */}
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 pt-4 border-t border-[#ebd8c7] text-center space-y-2.5"
            >
              {/* Closing quote */}
              <p className="font-hand text-xs sm:text-sm text-[#7c563e] italic">
                “that's all, just a little piece of happiness for you ♡”
              </p>

              {/* Big Birthday Repeat Wish */}
              <div className="bg-[#fff9ea] border border-[#eed9ba] rounded-lg py-2 px-3 inline-block shadow-xs">
                <p className="font-playful text-lg sm:text-xl text-[#c9184a]">
                  happy birthday again, Teh Ana!
                </p>
                <p className="font-handwriting text-base text-[#6e4832] font-semibold mt-0.5">
                  — from Helma with infinite love —
                </p>
              </div>

              {/* Read Again button */}
              <div className="pt-1.5 flex flex-wrap items-center justify-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRestart();
                  }}
                  className="px-4 py-2 bg-[#f8b4c0] hover:bg-[#f69eaf] text-[#4a2818] font-hand text-sm sm:text-base font-bold rounded-full border-2 border-[#543729] shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>↺</span>
                  <span>read again ♡</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onBackToCalendar();
                  }}
                  className="px-4 py-2 bg-[#fdf2d0] hover:bg-[#fee7a8] text-[#4a2818] font-hand text-sm sm:text-base font-bold rounded-full border-2 border-[#543729] shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>📅</span>
                  <span>view calendar</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom decorative washi tape */}
        <div className="absolute -bottom-2 right-8 z-20 pointer-events-none">
          <WashiTape color="mint" angle={-2} className="w-18 sm:w-22 !h-3 text-[7px]" />
        </div>
      </div>
    </motion.div>
  );
};
