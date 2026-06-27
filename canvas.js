export function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 280
    canvas.height = 60
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    const grad = ctx.createLinearGradient(0, 0, 280, 60)
    grad.addColorStop(0, '#ff6633')
    grad.addColorStop(0.5, '#2233aa')
    grad.addColorStop(1, '#33cc55')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 280, 60)

    ctx.globalCompositeOperation = 'multiply'
    ctx.fillStyle = 'rgba(200, 100, 50, 0.7)'
    ctx.beginPath()
    ctx.arc(90, 30, 28, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalCompositeOperation = 'screen'
    ctx.fillStyle = 'rgba(50, 100, 200, 0.6)'
    ctx.beginPath()
    ctx.ellipse(170, 30, 35, 20, Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.globalCompositeOperation = 'source-over'
    ctx.font = '14px Arial, sans-serif'
    ctx.shadowColor = 'rgba(0,0,0,0.8)'
    ctx.shadowBlur = 3
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    ctx.fillStyle = '#eedd88'
    ctx.fillText('Panoptic.js/\u2603\uD83C\uDF0D', 10, 45)

    ctx.shadowColor = 'transparent'
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.lineWidth = 0.7
    ctx.beginPath()
    ctx.moveTo(5, 5)
    ctx.bezierCurveTo(60, 55, 180, 5, 275, 50)
    ctx.stroke()

    return canvas.toDataURL()
  } catch {
    return ''
  }
}
