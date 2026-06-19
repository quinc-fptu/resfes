# Zero-Asset Audio Engine (Web Audio API Synthesis)

A premium audio rendering system for web interfaces that synthesizes complex soundscapes, mechanical interactions, and audio feedback directly via the Web Audio API, eliminating the need to load external audio assets (MP3, WAV, etc.) and reducing load times.

## 🚀 Key Features
- **Layered Synthesis**: Combines multiple oscillators and filters to mimic real-world physics (e.g., low-frequency thump + high-pass noise burst for mechanical click).
- **Dynamic Controls**: Pitch modulation and envelope control via `exponentialRampToValueAtTime` to create realistic mechanical slides or bells.
- **Performance Friendly**: Fully self-contained, lightweight (~5KB script instead of Megabytes of MP3 files).

## 🛠️ Usage Example

### Javascript Web Audio API Sound Generation

```javascript
class AudioManager {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    async init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.ctx.state === 'suspended') await this.ctx.resume();
    }

    // Synthesizes a realistic mechanical button click
    playClick() {
        if (this.muted || !this.ctx) return;
        const time = this.ctx.currentTime;
        
        // Layer 1: Low Frequency Thump
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(60, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + 0.1);
        
        gainNode.gain.setValueAtTime(0.4, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        
        osc.connect(gainNode).connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.1);
        
        // Layer 2: High Frequency Noise Click
        const noise = this.ctx.createBufferSource();
        const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.05, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for(let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        noise.buffer = buffer;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass'; 
        filter.frequency.value = 2000;
        
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.1, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        
        noise.connect(filter).connect(noiseGain).connect(this.ctx.destination);
        noise.start(time);
        noise.stop(time + 0.05);
    }
}
```
