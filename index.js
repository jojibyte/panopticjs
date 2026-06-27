import { murmurhash3 } from './hash.js'
import { getCanvasFingerprint } from './canvas.js'
import { getAudioFingerprint } from './audio.js'
import { getWebGLFingerprint } from './webgl.js'
import { getFontFingerprint } from './fonts.js'
import { getEnvironmentFingerprint } from './environment.js'

export async function collect() {
  const [canvas, audio] = await Promise.all([
    Promise.resolve(getCanvasFingerprint()),
    getAudioFingerprint(),
  ])

  const webgl = getWebGLFingerprint()
  const fonts = getFontFingerprint()
  const env = getEnvironmentFingerprint()

  return { canvas, audio, webgl, fonts, env }
}

export async function fingerprint() {
  const signals = await collect()

  const payload = [
    signals.canvas,
    signals.audio,
    signals.webgl.vendor,
    signals.webgl.renderer,
    signals.webgl.extensions,
    signals.fonts,
    ...Object.values(signals.env).map(String),
  ].join('|')

  return murmurhash3(payload)
}

export { murmurhash3 } from './hash.js'
