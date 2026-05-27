// Lightweight sound effects using Web Audio API (no external assets needed).
// Tones are short and unobtrusive.

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (audioCtx) return audioCtx;
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    audioCtx = new Ctx();
    return audioCtx;
  } catch {
    return null;
  }
}

function playTone(
  frequency: number,
  duration = 0.1,
  type: OscillatorType = 'sine',
  volume = 0.2,
  attack = 0.005,
  release = 0.05
) {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + attack);
    gain.gain.linearRampToValueAtTime(0, now + duration + release);

    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + release + 0.02);
  } catch {
    /* ignore */
  }
}

let sfxEnabledCache = true;
let sfxVolumeCache = 0.6;

export function setSfxEnabled(enabled: boolean) {
  sfxEnabledCache = enabled;
}
export function setSfxVolume(v: number) {
  sfxVolumeCache = Math.max(0, Math.min(1, v));
}

function vol(base: number) {
  return base * sfxVolumeCache;
}

export const SFX = {
  numberPlace: () => sfxEnabledCache && playTone(880, 0.06, 'triangle', vol(0.15)),
  numberWrong: () => sfxEnabledCache && playTone(220, 0.15, 'square', vol(0.18)),
  erase: () => sfxEnabledCache && playTone(440, 0.05, 'sine', vol(0.1)),
  cellSelect: () => sfxEnabledCache && playTone(660, 0.03, 'sine', vol(0.08)),
  hint: () => sfxEnabledCache && playTone(1000, 0.1, 'triangle', vol(0.2)),
  win: () => {
    if (!sfxEnabledCache) return;
    playTone(523, 0.12, 'triangle', vol(0.2));
    setTimeout(() => playTone(659, 0.12, 'triangle', vol(0.2)), 130);
    setTimeout(() => playTone(784, 0.12, 'triangle', vol(0.2)), 260);
    setTimeout(() => playTone(1047, 0.25, 'triangle', vol(0.25)), 390);
  },
  pause: () => sfxEnabledCache && playTone(330, 0.08, 'sine', vol(0.12)),
  newGame: () => sfxEnabledCache && playTone(587, 0.1, 'triangle', vol(0.15)),
};
