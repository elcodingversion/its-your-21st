// Web Audio API synthesized music box and soft chime sounds
// Completely offline, no external audio assets needed.

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMelodyPlaying: boolean = false;
  private melodyTimeout: any = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a gentle music box chime note
  playChime(freq: number, duration: number = 0.8, gainVal: number = 0.15) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave with slight triangle overtone for chime/music-box warmth
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext fallback
    }
  }

  // Sparkle / Pop sound for button clicks & sticker taps
  playPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playChime(freq, 0.4, 0.08);
        }, i * 45);
      });
    } catch {}
  }

  // Celebration fanfare for blowing candles or opening letter
  playFanfare() {
    if (this.isMuted) return;
    try {
      const melody = [523.25, 523.25, 587.33, 523.25, 698.46, 659.25];
      melody.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq, 0.6, 0.12);
        }, idx * 140);
      });
    } catch {}
  }

  // Toggle music box background melody
  toggleMelody(onStateChange?: (playing: boolean) => void) {
    if (this.isMelodyPlaying) {
      this.stopMelody();
      onStateChange?.(false);
    } else {
      this.startMelody();
      onStateChange?.(true);
    }
  }

  startMelody() {
    this.isMelodyPlaying = true;
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    // Gentle music box "Happy Birthday" lullaby sequence
    // C4, C4, D4, C4, F4, E4 ... C4, C4, D4, C4, G4, F4 ...
    const birthdayNotes: Array<{ freq: number; dur: number; rest: number }> = [
      { freq: 261.63, dur: 0.5, rest: 320 },
      { freq: 261.63, dur: 0.5, rest: 320 },
      { freq: 293.66, dur: 0.7, rest: 500 },
      { freq: 261.63, dur: 0.7, rest: 500 },
      { freq: 349.23, dur: 0.8, rest: 500 },
      { freq: 329.63, dur: 1.2, rest: 800 },

      { freq: 261.63, dur: 0.5, rest: 320 },
      { freq: 261.63, dur: 0.5, rest: 320 },
      { freq: 293.66, dur: 0.7, rest: 500 },
      { freq: 261.63, dur: 0.7, rest: 500 },
      { freq: 392.00, dur: 0.8, rest: 500 },
      { freq: 349.23, dur: 1.2, rest: 800 },

      { freq: 261.63, dur: 0.5, rest: 320 },
      { freq: 261.63, dur: 0.5, rest: 320 },
      { freq: 523.25, dur: 0.8, rest: 500 },
      { freq: 440.00, dur: 0.8, rest: 500 },
      { freq: 349.23, dur: 0.8, rest: 500 },
      { freq: 329.63, dur: 0.8, rest: 500 },
      { freq: 293.66, dur: 1.0, rest: 700 },

      { freq: 466.16, dur: 0.5, rest: 320 },
      { freq: 466.16, dur: 0.5, rest: 320 },
      { freq: 440.00, dur: 0.8, rest: 500 },
      { freq: 349.23, dur: 0.8, rest: 500 },
      { freq: 392.00, dur: 0.8, rest: 500 },
      { freq: 349.23, dur: 1.4, rest: 1200 },
    ];

    let currentStep = 0;
    const playNext = () => {
      if (!this.isMelodyPlaying) return;
      const note = birthdayNotes[currentStep];
      this.playChime(note.freq * 1.5, note.dur, 0.08); // slightly higher register for music box chime sweetness

      currentStep = (currentStep + 1) % birthdayNotes.length;
      this.melodyTimeout = setTimeout(playNext, note.rest);
    };

    playNext();
  }

  stopMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
  }

  getPlaying() {
    return this.isMelodyPlaying;
  }
}

export const sounds = new SoundManager();
