/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Procedural Ambient Synthesizer for Mathilde Fages Portfolio
// Simulates a calm, museum-grade architectural silence with fragile instrument echoes.

class AmbientSynth {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private mainGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;
  private active = false;
  private notesTimer: number | null = null;

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    
    // Create Nodes
    this.mainGain = this.ctx.createGain();
    this.mainGain.gain.setValueAtTime(0.0, this.ctx.currentTime); // fade in gently

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(150, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1, this.ctx.currentTime);

    this.delayNode = this.ctx.createDelay(3.0);
    this.delayNode.delayTime.setValueAtTime(1.2, this.ctx.currentTime);

    this.delayGain = this.ctx.createGain();
    this.delayGain.gain.setValueAtTime(0.4, this.ctx.currentTime); // high feedback

    // Connections
    // Main Synth -> Filter -> Gain -> Destination
    // Delay feedback loop: Filter -> Delay -> DelayGain -> Delay (loop)
    // Filter -> Delay -> DelayGain -> Gain -> Destination
    this.filter.connect(this.mainGain);
    this.filter.connect(this.delayNode);
    this.delayNode.connect(this.delayGain);
    this.delayGain.connect(this.delayNode); // feedback
    this.delayGain.connect(this.mainGain);

    this.mainGain.connect(this.ctx.destination);

    // 1. Start Drone Sub-bass
    this.startDrone();

    // 2. Start Random Fragile Lithographic Chimes
    this.scheduleNextChime();

    this.active = true;
    
    // Slow initial fade-in
    this.mainGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 4.0);
  }

  private startDrone() {
    if (!this.ctx || !this.filter) return;

    // Deep warm sine
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = "sine";
    this.osc1.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2 chord frequency

    // Filtered slowly breathing triangle
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = "triangle";
    this.osc2.frequency.setValueAtTime(98.0, this.ctx.currentTime); // G2 fifth chord

    const oscGain1 = this.ctx.createGain();
    const oscGain2 = this.ctx.createGain();

    oscGain1.gain.setValueAtTime(0.55, this.ctx.currentTime);
    oscGain2.gain.setValueAtTime(0.15, this.ctx.currentTime);

    this.osc1.connect(oscGain1);
    this.osc2.connect(oscGain2);

    oscGain1.connect(this.filter);
    oscGain2.connect(this.filter);

    this.osc1.start();
    this.osc2.start();

    // Slow organic lfo filter cutoff sweep for "skies & clouds movement"
    setInterval(() => {
      if (this.ctx && this.filter) {
        const t = this.ctx.currentTime;
        const targetFreq = 120 + Math.random() * 140;
        this.filter.frequency.exponentialRampToValueAtTime(targetFreq, t + 4.0);
      }
    }, 4500);
  }

  private triggerChime() {
    if (!this.ctx || !this.mainGain || this.ctx.state === "suspended") return;

    // Pentatonic calm scale frequencies (E minor / G major) represent delicate stone lithography chiseling
    const scale = [196.0, 220.0, 246.94, 293.66, 329.63, 392.0, 440.0, 493.88, 587.33, 659.25];
    const freq = scale[Math.floor(Math.random() * scale.length)];

    const chimeOsc = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();

    // Pure, transparent sine / triangular blend
    chimeOsc.type = Math.random() > 0.4 ? "sine" : "triangle";
    chimeOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    chimeGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    chimeGain.gain.linearRampToValueAtTime(0.015, this.ctx.currentTime + 0.1); // soft attack
    chimeGain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 3.5); // long reverberation

    chimeOsc.connect(chimeGain);
    chimeGain.connect(this.mainGain);

    chimeOsc.start();
    chimeOsc.stop(this.ctx.currentTime + 4.0);
  }

  private scheduleNextChime() {
    const delay = 6000 + Math.random() * 8000; // interval between slow, sparse echoes
    this.notesTimer = window.setTimeout(() => {
      this.triggerChime();
      this.scheduleNextChime();
    }, delay);
  }

  public async start() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    if (this.mainGain && this.ctx) {
      this.mainGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 1.5);
    }
    this.active = true;
  }

  public stop() {
    if (this.mainGain && this.ctx) {
      // Fade out peacefully so no sudden click/pop sounds occur
      this.mainGain.gain.linearRampToValueAtTime(0.0, this.ctx.currentTime + 1.0);
    }
    this.active = false;
  }

  public isPlaying() {
    return this.active && this.ctx?.state === "running";
  }

  public isInitialized() {
    return !!this.ctx;
  }
}

export const ambientPlayer = new AmbientSynth();
