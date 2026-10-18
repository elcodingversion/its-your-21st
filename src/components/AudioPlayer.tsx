import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sounds } from '../utils/sound';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and attempt immediate autoplay
  useEffect(() => {
    // 1. Create audio element using user's music file
    // Candidates: /music.mp3, /music.mpeg, /sound.mp3
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.85;
    audioRef.current = audio;

    // Helper to start playback
    const startAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback to web audio synthesized melody if blocked or failed
        sounds.startMelody();
        setIsPlaying(true);
      });
    };

    // 2. Immediate autoplay attempt
    startAudio();

    // 3. User interaction listener in case browser blocked unprompted autoplay
    // Any first tap, touch, or click anywhere on the page will immediately start the sound
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        startAudio();
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      cleanupListeners();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      sounds.stopMelody();
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      sounds.stopMelody();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          sounds.startMelody();
          setIsPlaying(true);
        });
      } else {
        sounds.toggleMelody((active) => {
          setIsPlaying(active);
        });
      }
    }
  };

  return (
    <div className="fixed top-2.5 right-2.5 sm:top-4 sm:right-4 z-50 flex items-center select-none">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border shadow-md transition-all duration-300 font-hand text-xs sm:text-sm cursor-pointer ${
          isPlaying
            ? 'bg-[#ffe5ec] border-[#f8b4c0] text-[#85273c] shadow-[#f8b4c0]/40'
            : 'bg-[#faf4e6]/95 hover:bg-[#faf4e6] border-[#d4beaa] text-[#6b4c35]'
        }`}
        title={isPlaying ? "Jeda musik" : "Putar musik"}
        aria-label="Toggle birthday music"
      >
        <Music
          size={12}
          className={isPlaying ? 'animate-bounce text-[#c9184a]' : 'text-[#8b5e43]'}
        />
        <span className="font-medium tracking-wide">
          {isPlaying ? 'musik on ♫' : 'musik off ♪'}
        </span>
        {isPlaying ? (
          <Volume2 size={12} className="text-[#c9184a]" />
        ) : (
          <VolumeX size={12} className="opacity-60" />
        )}
      </button>
    </div>
  );
};
