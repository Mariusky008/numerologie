export const trackEvent = async (event: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return; // Client-side only

  try {
    console.log(`[Analytics] Tracking event: ${event}`, properties);

    // TikTok Pixel Tracking
    // @ts-ignore
    if (window.ttq) {
      // @ts-ignore
      window.ttq.track(event, properties);
    }

    // Fire and forget - don't await to avoid blocking UI
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, properties }),
      keepalive: true // Crucial for events that happen just before navigation/tab close
    }).catch(err => console.error("Tracking error:", err));
  } catch (e) {
    console.error("Tracking setup error", e);
  }
};
