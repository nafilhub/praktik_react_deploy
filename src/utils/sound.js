// Web Audio API Synthesizer - Musik Pentatonik Tradisional, Kucing & Suasana Teh
class ZenSoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.melodyPlaying = false;
    this.melodyTimer = null;
    this.pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled && this.melodyPlaying) {
      this.stopMelody();
    }
    return this.enabled;
  }

  // Petikan Dawai Kecapi Guzheng
  playPluck(noteIndex = -1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const freq = noteIndex >= 0 
        ? this.pentatonic[noteIndex % this.pentatonic.length]
        : this.pentatonic[Math.floor(Math.random() * this.pentatonic.length)];

      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.65);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      oscHarmonic.start();
      osc.stop(this.ctx.currentTime + 0.65);
      oscHarmonic.stop(this.ctx.currentTime + 0.65);
    } catch (_) {}
  }

  // Suara Kucing Mengeong Lucu
  playCatMeow() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(460, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.38);
    } catch (_) {}
  }

  // Suara Kucing Mendengkur (Purring)
  playCatPurr() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(85, this.ctx.currentTime);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(26, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(16, this.ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      lfo.start();
      osc.stop(this.ctx.currentTime + 0.7);
      lfo.stop(this.ctx.currentTime + 0.7);
    } catch (_) {}
  }

  // Suara Kucing Makan Ikan (Nyam Nyam!)
  playNyam() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      [0, 0.12, 0.24].forEach((delay, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520 + idx * 80, this.ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + delay + 0.08);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + 0.08);
      });
    } catch (_) {}
  }

  // Suara Sruput Teh Segar
  playTeaPour() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1850, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.32);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch (_) {}
  }

  // Genta Kuil / Mangkuk Meditasi (Sukses Masuk)
  playZenBowl() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const chord = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.07, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 1.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 1.4);
      });
    } catch (_) {}
  }

  // Suara Error Nada Rendah
  playError() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(170, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch (_) {}
  }

  // Musik Alunan Guzheng Otomatis Berkelanjutan (Heboh & Nyaman!)
  toggleMelody(onStateChange) {
    if (this.melodyPlaying) {
      this.stopMelody();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startMelody();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startMelody() {
    this.init();
    this.melodyPlaying = true;
    const notesSequence = [0, 2, 4, 3, 5, 4, 2, 1, 3, 5, 7, 6, 4, 2, 0];
    let step = 0;

    const playNext = () => {
      if (!this.melodyPlaying) return;
      const noteIdx = notesSequence[step % notesSequence.length];
      this.playPluck(noteIdx);
      step++;
      const nextDelay = 350 + Math.random() * 250;
      this.melodyTimer = setTimeout(playNext, nextDelay);
    };

    playNext();
  }

  stopMelody() {
    this.melodyPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }
}

export const sound = new ZenSoundFX();
