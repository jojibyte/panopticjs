export function getWebGLFingerprint() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return { vendor: '', renderer: '', extensions: '' }

    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    const vendor = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR)
    const renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)

    const exts = gl.getSupportedExtensions() ?? []

    const loseCtx = gl.getExtension('WEBGL_lose_context')
    loseCtx?.loseContext()

    return {
      vendor,
      renderer,
      extensions: exts.sort().join(','),
    }
  } catch {
    return { vendor: '', renderer: '', extensions: '' }
  }
}
