import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AudioPlayer } from './components/AudioPlayer';
import { CoverStage } from './components/CoverStage';
import { CalendarStage } from './components/CalendarStage';
import { LetterStage } from './components/LetterStage';
import { ScrapbookConfetti } from './components/ScrapbookConfetti';
import { SparkleStar, HeartSticker } from './components/ScrapbookDoodles';
import { sounds } from './utils/sound';

type Stage = 'cover' | 'calendar' | 'letter';

export default function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('cover');
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const triggerCelebration = React.useCallback(() => {
    setConfettiTrigger((prev) => prev + 1);
  }, []);

  const handleOpenCover = React.useCallback(() => {
    setCurrentStage('calendar');
    triggerCelebration();
  }, [triggerCelebration]);

  const handleGoToLetter = React.useCallback(() => {
    setCurrentStage('letter');
    triggerCelebration();
  }, [triggerCelebration]);

  const handleBackToCalendar = React.useCallback(() => {
    sounds.playPop();
    setCurrentStage('calendar');
  }, []);

  const handleRestart = React.useCallback(() => {
    sounds.playPop();
    setCurrentStage('cover');
  }, []);

  return (
    <div className="min-h-screen bg-scrapbook-fabric relative flex flex-col justify-between overflow-x-hidden selection:bg-[#f8b4c0] selection:text-[#362217]">
      {/* Background Vignette and ambient lighting */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_20%,rgba(25,12,6,0.65)_100%)] pointer-events-none" />

      {/* Floating decorative elements in the background */}
      <div className="fixed top-8 left-6 pointer-events-none opacity-40 hidden sm:block">
        <SparkleStar size={28} color="#ffd166" />
      </div>
      <div className="fixed top-24 right-10 pointer-events-none opacity-40 hidden sm:block">
        <HeartSticker color="#f8b4c0" size={32} />
      </div>
      <div className="fixed bottom-12 left-10 pointer-events-none opacity-40 hidden sm:block">
        <HeartSticker color="#fee49c" size={28} />
      </div>
      <div className="fixed bottom-20 right-8 pointer-events-none opacity-40 hidden sm:block">
        <SparkleStar size={26} color="#b8e0d2" />
      </div>

      {/* Top Floating Music Box Audio Toggle */}
      <AudioPlayer />

      {/* Interactive Confetti Particle Overlay */}
      <ScrapbookConfetti triggerKey={confettiTrigger} />

      {/* Main Journal / Scrapbook Stage Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {currentStage === 'cover' && (
            <CoverStage key="cover-stage" onOpen={handleOpenCover} />
          )}

          {currentStage === 'calendar' && (
            <CalendarStage
              key="calendar-stage"
              onNext={handleGoToLetter}
              onPrev={() => setCurrentStage('cover')}
              onCelebrate={triggerCelebration}
            />
          )}

          {currentStage === 'letter' && (
            <LetterStage
              key="letter-stage"
              onBackToCalendar={handleBackToCalendar}
              onRestart={handleRestart}
              onCelebrate={triggerCelebration}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Scrapbook Journal Footer */}
      <footer className="relative z-10 py-4 text-center select-none">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#2a170d]/60 border border-[#523321]/50 backdrop-blur-xs">
          <span className="text-xs font-hand text-[#d7baaa]">
            handcrafted with lots of love by Helma for Teh Ana's 21st birthday
          </span>
          <span className="text-[#f8b4c0] text-xs">♡</span>
        </div>
      </footer>
    </div>
  );
}
