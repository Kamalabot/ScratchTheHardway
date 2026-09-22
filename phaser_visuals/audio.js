// Web Audio API Synthesizer for Sci-Fi / Educational Sound FX
// Zero external asset dependencies - generates all sounds mathematically

class SoundFX {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.volume = 0.3;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.2) {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal * this.volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    click() {
        this.playTone(900, 'triangle', 0.03, 0.15);
    }

    blip(pitch = 1200) {
        this.playTone(pitch, 'sine', 0.08, 0.2);
    }

    laser() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.25);

        gain.gain.setValueAtTime(0.15 * this.volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.25);
    }

    snap() {
        this.playTone(320, 'square', 0.05, 0.25);
    }

    whoosh() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.2);
        osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.4);

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2 * this.volume, this.ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.4);
    }

    powerUp() {
        if (this.muted) return;
        this.init();
        [440, 554, 659, 880].forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 'triangle', 0.12, 0.2);
            }, i * 60);
        });
    }

    dbCommit() {
        // Deep resonant sub-bass thud for disk write commit
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.35 * this.volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    }

    cachePing() {
        // Ultra-fast pure crystal chime (high frequency sine)
        if (this.muted) return;
        this.init();
        this.playTone(2093, 'sine', 0.15, 0.2); // C7
        setTimeout(() => this.playTone(2637, 'sine', 0.12, 0.15), 50); // E7
    }

    mailChime() {
        // Pleasant three-tone notification chime
        if (this.muted) return;
        this.init();
        [523.25, 659.25, 783.99].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'sine', 0.18, 0.18), i * 90);
        });
    }

    explosion() {
        if (this.muted) return;
        this.init();
        const bufferSize = this.ctx.sampleRate * 0.35;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3 * this.volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
    }

    clank() {
        if (this.muted) return;
        this.playTone(180, 'square', 0.08, 0.3);
        setTimeout(() => this.playTone(90, 'sawtooth', 0.12, 0.25), 20);
    }

    gearCrunch() {
        if (this.muted) return;
        this.playTone(320, 'sawtooth', 0.06, 0.2);
        setTimeout(() => this.playTone(280, 'triangle', 0.05, 0.25), 40);
        setTimeout(() => this.playTone(360, 'sawtooth', 0.06, 0.2), 80);
    }

    typewriterStamp() {
        if (this.muted) return;
        this.playTone(720, 'square', 0.02, 0.2);
        setTimeout(() => this.playTone(220, 'triangle', 0.04, 0.15), 10);
    }
}

export const sfx = new SoundFX();
