
let audioCtx: AudioContext | null = null;
let ambientNodes: AudioNode[] = [];
let ambientGain: GainNode | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playClick = () => {
  const ctx = initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};

export const playCorrect = () => {
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  // Magical chime (Major triad arpeggio + sparkle)
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    const startTime = now + (i * 0.05);
    const duration = 0.8;
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  });
};

export const playWrong = () => {
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  // Dissonant Buzz
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc1.type = 'sawtooth';
  osc2.type = 'sawtooth';
  
  osc1.frequency.value = 150;
  osc2.frequency.value = 110; // Tritone-ish dissonance
  
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.4);
  
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  
  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.4);
  osc2.stop(now + 0.4);
};

export const playTimeout = () => {
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
  
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(now);
  osc.stop(now + 0.5);
};

export const playGameOver = () => {
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  // Sad descending triad (C Minor: G4 -> Eb4 -> C4)
  const notes = [392.00, 311.13, 261.63]; 
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    const startTime = now + (i * 0.5);
    const duration = 2.0;
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  });
};

export const startAmbient = (universe: 'Harry Potter' | 'Hunger Games' | 'Marvel' | 'LotR' | 'Star Wars' | 'Stranger Things') => {
  const ctx = initAudio();
  stopAmbient(); // Clear previous

  ambientGain = ctx.createGain();
  ambientGain.connect(ctx.destination);
  ambientGain.gain.value = 0.05; // Low volume background

  if (universe === 'Harry Potter') {
    // Magical Drone: Low sine waves lightly detuned
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    
    osc1.frequency.value = 110; // A2
    osc2.frequency.value = 112; // Slight beat frequency
    
    // LFO to modulate volume slightly for movement
    lfo.frequency.value = 0.2; // Slow pulse
    lfoGain.gain.value = 0.02;
    
    lfo.connect(lfoGain);
    lfoGain.connect(ambientGain.gain);
    
    osc1.connect(ambientGain);
    osc2.connect(ambientGain);
    
    osc1.start();
    osc2.start();
    lfo.start();
    
    ambientNodes.push(osc1, osc2, lfo, lfoGain, ambientGain);

  } else if (universe === 'Hunger Games') {
    // Hunger Games: Windy Atmosphere (Filtered Noise)
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    
    // Modulate filter frequency to simulate wind gusts
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; // Very slow wind changes
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 200; // Modulate frequency by +/- 200Hz
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    noise.connect(filter);
    filter.connect(ambientGain);
    
    noise.start();
    lfo.start();
    
    ambientNodes.push(noise, filter, lfo, lfoGain, ambientGain);
  } else if (universe === 'Marvel') {
    // Marvel: Sci-fi Tech Drone
    const osc = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sawtooth';
    osc.frequency.value = 60; // Low drone
    
    mod.type = 'square';
    mod.frequency.value = 4; // Fast tech pulsing
    
    const modGain = ctx.createGain();
    modGain.gain.value = 100;
    
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    
    mod.connect(modGain);
    modGain.connect(filter.frequency);
    
    osc.connect(filter);
    filter.connect(ambientGain);
    
    osc.start();
    mod.start();
    
    ambientNodes.push(osc, mod, modGain, filter, ambientGain);
  } else if (universe === 'LotR') {
    // LotR: Deep Orchestral Drone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();

    // Minor Chord (Deep C Minor)
    osc1.type = 'sawtooth';
    osc1.frequency.value = 65.41; // C2
    
    osc2.type = 'triangle';
    osc2.frequency.value = 77.78; // Eb2
    
    osc3.type = 'sine';
    osc3.frequency.value = 98.00; // G2
    
    filter.type = 'lowpass';
    filter.frequency.value = 150; // Very muffled, distinct low rumble

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(ambientGain);

    osc1.start();
    osc2.start();
    osc3.start();

    ambientNodes.push(osc1, osc2, osc3, filter, ambientGain);
  } else if (universe === 'Star Wars') {
    // Star Wars: High-pitched sci-fi hum (Lightsaber-ish)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc1.frequency.value = 100; 
    
    osc2.type = 'sine';
    osc2.frequency.value = 103; // slight beat
    
    gainNode.gain.value = 0.5;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ambientGain);
    
    osc1.start();
    osc2.start();
    
    ambientNodes.push(osc1, osc2, gainNode, filter, ambientGain);
  } else if (universe === 'Stranger Things') {
    // Stranger Things: Retro Synth Arpeggio Drone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    
    // Sawtooth waves are classic synth
    osc1.type = 'sawtooth';
    osc1.frequency.value = 55; // A1 (Low)
    
    osc2.type = 'sawtooth';
    osc2.frequency.value = 55.5; // Slightly detuned for "chorus" effect
    
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    
    // LFO to open and close filter (slow sweep)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.5; 
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 200;
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(ambientGain);
    
    osc1.start();
    osc2.start();
    lfo.start();
    
    ambientNodes.push(osc1, osc2, lfo, lfoGain, filter, ambientGain);
  }
};

export const stopAmbient = () => {
  ambientNodes.forEach(node => {
    try {
      if (node instanceof AudioScheduledSourceNode) {
        node.stop();
      }
      node.disconnect();
    } catch (e) {
      // Ignore errors if already stopped
    }
  });
  ambientNodes = [];
  if (ambientGain) {
    ambientGain.disconnect();
    ambientGain = null;
  }
};