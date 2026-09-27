// Web Audio API Synthesizer Engine (0 external audio dependencies)
// Guarantees zero autoplay, rate-limited playback, and clear mute toggle

let audioCtx: AudioContext | null = null;
let isMuted: boolean = false;
let lastSoundTime: Record<string, number> = {};

export function initAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted(): boolean {
  return isMuted;
}

export function toggleAudio(): boolean {
  isMuted = !isMuted;
  if (!isMuted) {
    initAudio();
    playComicSound("blip");
  }
  return !isMuted;
}

export function playComicSound(
  type: "thwip" | "blip" | "woosh" | "thunder" | "chime" | "clang"
) {
  if (isMuted || typeof window === "undefined") return;

  // Rate limit sounds to prevent acoustic clutter
  const now = performance.now();
  if (lastSoundTime[type] && now - lastSoundTime[type] < 120) {
    return;
  }
  lastSoundTime[type] = now;

  const ctx = initAudio();
  if (!ctx) return;

  const t = ctx.currentTime;

  try {
    if (type === "thwip") {
      // High-pass frequency snappy web thwip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1300, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.14);

      filter.type = "highpass";
      filter.frequency.setValueAtTime(280, t);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.15);
    } else if (type === "blip") {
      // Clean UI feedback chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(980, t + 0.06);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.07);
    } else if (type === "woosh") {
      // Subtle bandpass scroll swoosh
      const bufferSize = Math.floor(ctx.sampleRate * 0.14);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(350, t);
      filter.frequency.exponentialRampToValueAtTime(1100, t + 0.14);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(t);
      whiteNoise.stop(t + 0.15);
    } else if (type === "thunder") {
      // Low rumble sweep
      const bufferSize = Math.floor(ctx.sampleRate * 0.35);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, t);
      filter.frequency.exponentialRampToValueAtTime(45, t + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(t);
      whiteNoise.stop(t + 0.36);
    } else if (type === "chime") {
      // Harmonic chord for celebration
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C major
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t + idx * 0.04);

        gain.gain.setValueAtTime(0.15 / (idx + 1), t + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t + idx * 0.04);
        osc.stop(t + 0.65);
      });
    } else if (type === "clang") {
      // Metallic resonant vibranium shield ring
      const frequencies = [820, 1240, 1960];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.85, t + 0.35);

        gain.gain.setValueAtTime(0.22 / (idx + 1), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.42);
      });
    }
  } catch {
    // Ignore audio failures silently
  }
}

// Comic Burst Popup helper
export function triggerComicBurst(text: string, event?: React.MouseEvent | MouseEvent) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const bubble = document.createElement("div");
  bubble.className =
    "comic-burst-popup bg-[#f5c518] text-black px-4 py-2 rounded-xl border-3 border-black shadow-[4px_4px_0px_#000] text-lg sm:text-xl font-black";
  bubble.innerText = text;

  let x = event ? event.clientX : window.innerWidth / 2;
  let y = event ? event.clientY : window.innerHeight / 2;

  x = Math.max(80, Math.min(window.innerWidth - 80, x));
  y = Math.max(60, Math.min(window.innerHeight - 60, y));

  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;

  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1100);
}
