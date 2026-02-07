
export async function sha256(message: string): Promise<string> {
  if (!message) return "";
  
  // Safe check for environment
  if (typeof window === 'undefined' && typeof crypto === 'undefined') {
    return ""; // Server-side fallback if crypto not available
  }

  try {
    const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (e) {
    console.warn("SHA256 failed", e);
    return "";
  }
}
