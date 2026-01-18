export const trackEvent = async (event: string) => {
  if (typeof window === 'undefined') return; // Client-side only

  try {
    console.log(`[Analytics] Tracking event: ${event}`);
    // Fire and forget - don't await to avoid blocking UI
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event }),
      keepalive: true // Crucial for events that happen just before navigation/tab close
    }).catch(err => console.error("Tracking error:", err));
  } catch (e) {
    console.error("Tracking setup error", e);
  }
};
