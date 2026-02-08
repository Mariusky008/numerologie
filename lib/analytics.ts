import { sha256 } from './hash';

// Declare global type to avoid TS errors
declare global {
  interface Window {
    ttq?: {
      identify: (data: Record<string, string>) => void;
      track: (event: string, properties?: Record<string, any>) => void;
    }
  }
}

export const identifyUser = async (userData: { email?: string; phone?: string; id?: string }) => {
  if (typeof window === 'undefined') return;

  const identifyData: Record<string, string> = {};

  try {
    if (userData.email) {
      identifyData.email = await sha256(userData.email);
    }
    if (userData.phone) {
      identifyData.phone_number = await sha256(userData.phone);
    }
    if (userData.id) {
      identifyData.external_id = await sha256(userData.id);
    }

    if (window.ttq && Object.keys(identifyData).length > 0) {
      window.ttq.identify(identifyData);
    }
  } catch (e) {
    console.error("Identify failed", e);
  }
};

export const trackEvent = async (event: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return; // Client-side only

  try {
    console.log(`[Analytics] Tracking event: ${event}`, properties);

    // TikTok Pixel Tracking
    if (window.ttq) {
      // Ensure value is a number if present (Fix for "Invalid Purchase Value" error)
      const safeProperties = { ...properties };
      if (safeProperties.value !== undefined) {
          if (typeof safeProperties.value === 'string') {
             // Remove currency symbols and convert to float
             safeProperties.value = parseFloat(safeProperties.value.replace(/[^0-9.]/g, ''));
          } else {
             safeProperties.value = Number(safeProperties.value);
          }
          
          // Ensure it's not NaN
          if (isNaN(safeProperties.value)) {
              delete safeProperties.value;
          }
      }

      window.ttq.track(event, safeProperties);
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
