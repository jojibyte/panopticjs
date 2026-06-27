export async function getAudioFingerprint() {
  try {
    const ctx = new OfflineAudioContext(1, 44100, 44100)

    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(10000, ctx.currentTime)

    const compressor = ctx.createDynamicsCompressor()
    compressor.threshold.setValueAtTime(-50, ctx.currentTime)
    compressor.knee.setValueAtTime(40, ctx.currentTime)
    compressor.ratio.setValueAtTime(12, ctx.currentTime)
    compressor.attack.setValueAtTime(0, ctx.currentTime)
    compressor.release.setValueAtTime(0.25, ctx.currentTime)

    osc.connect(compressor)
    compressor.connect(ctx.destination)
    osc.start(0)

    const rendered = await Promise.race([
      ctx.startRendering(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1000))
    ])
    const samples = rendered.getChannelData(0)

    let sum = 0
    for (let i = 4500; i < 5000; i++) {
      sum += Math.abs(samples[i])
    }

    return sum.toString()
  } catch {
    return ''
  }
}
