const TEST_FONTS = [
  'Arial', 'Arial Black', 'Calibri', 'Cambria', 'Comic Sans MS',
  'Consolas', 'Courier New', 'Georgia', 'Helvetica', 'Impact',
  'Lucida Console', 'Lucida Sans Unicode', 'Microsoft Sans Serif',
  'Palatino Linotype', 'Segoe UI', 'Tahoma', 'Times New Roman',
  'Trebuchet MS', 'Verdana',
  'Menlo', 'Monaco', 'Optima', 'San Francisco', 'Futura', 'Avenir',
  'Ubuntu', 'DejaVu Sans', 'Liberation Mono', 'Noto Sans',
]

const BASELINES = ['serif', 'sans-serif', 'monospace']
const TEST_STRING = 'mmMwWlLi10Oo@#$'
const TEST_SIZE = '72px'

export function getFontFingerprint() {
  try {
    const span = document.createElement('span')
    span.style.position = 'absolute'
    span.style.left = '-9999px'
    span.style.top = '-9999px'
    span.style.fontSize = TEST_SIZE
    span.style.lineHeight = 'normal'
    span.textContent = TEST_STRING
    document.body.appendChild(span)

    const baselineDims = {}
    for (const base of BASELINES) {
      span.style.fontFamily = base
      baselineDims[base] = { w: span.offsetWidth, h: span.offsetHeight }
    }

    const detected = []

    for (const font of TEST_FONTS) {
      let found = false
      for (const base of BASELINES) {
        span.style.fontFamily = `'${font}', ${base}`
        const w = span.offsetWidth
        const h = span.offsetHeight
        if (w !== baselineDims[base].w || h !== baselineDims[base].h) {
          found = true
          break
        }
      }
      if (found) detected.push(font)
    }

    document.body.removeChild(span)
    return detected.join(',')
  } catch {
    return ''
  }
}
