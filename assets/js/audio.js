// Swiss Mechanical Watch Sound Effects Engine using Web Audio API
class HorologyAudioEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = localStorage.getItem('aura_sound_enabled') === 'true';
    this.tickInterval = null;
    this.isTicking = false;
  }

  init() {
    if (!this.ctx && typeof AudioContext !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggleSound() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('aura_sound_enabled', this.isEnabled);
    
    if (this.isEnabled) {
      this.playBezelClick();
      this.startAmbientTicking();
    } else {
      this.stopAmbientTicking();
    }
    return this.isEnabled;
  }

  // Precision mechanical escapement tick
  playTick(pitchShift = 1.0) {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      
      // High frequency click (pallet jewel hitting escapement tooth)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200 * pitchShift, t);
      filter.Q.setValueAtTime(12, t);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 * pitchShift, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.025);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {
      // Audio fallback
    }
  }

  // Crisp unidirectional ceramic bezel click
  playBezelClick() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2400, t);

      osc.type = 'square';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(200, t + 0.03);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch (e) {}
  }

  // Watch crown winding sound (ratchet gear)
  playCrownWinding() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;

    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.playTick(1.2 + i * 0.1);
      }, i * 35);
    }
  }

  // Luxury Success Chime (Checkout / Order / Add to cart)
  playSuccessChime() {
    if (!this.isEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (C Major Luxury Chord)
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + (idx * 0.07);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.7);
      });
    } catch (e) {}
  }

  startAmbientTicking() {
    if (this.tickInterval) clearInterval(this.tickInterval);
    let flip = false;
    this.isTicking = true;
    this.tickInterval = setInterval(() => {
      if (this.isEnabled && document.visibilityState === 'visible') {
        this.playTick(flip ? 1.0 : 0.92);
        flip = !flip;
      }
    }, 1000);
  }

  stopAmbientTicking() {
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
    this.isTicking = false;
  }
}

const HorologySound = new HorologyAudioEngine();
