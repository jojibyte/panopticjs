export function getEnvironmentFingerprint() {
  try {
    const nav = navigator
    const scr = screen

    return {
      cores: nav.hardwareConcurrency ?? 0,
      touchPoints: nav.maxTouchPoints ?? 0,
      platform: nav.platform ?? '',
      languages: (nav.languages ?? [nav.language ?? '']).join(','),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? '',
      timezoneOffset: new Date().getTimezoneOffset(),
      screenWidth: scr.width ?? 0,
      screenHeight: scr.height ?? 0,
      colorDepth: scr.colorDepth ?? 0,
      pixelRatio: window.devicePixelRatio ?? 1,
      cookiesEnabled: nav.cookieEnabled ?? false,
      doNotTrack: nav.doNotTrack ?? '',
      pdfViewer: nav.pdfViewerEnabled ?? false,
    }
  } catch {
    return {}
  }
}
