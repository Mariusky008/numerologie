import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Votre Légende - Crash Test'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#08090F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            border: '4px solid #C9A24D',
            borderRadius: '20px',
            background: 'rgba(201, 162, 77, 0.1)',
          }}
        >
          <div style={{ color: '#C9A24D', fontSize: 60, marginBottom: 20, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Votre Légende
          </div>
          <div style={{ color: 'white', fontSize: 40, textAlign: 'center', maxWidth: '800px', lineHeight: 1.4 }}>
            Le Crash-Test de tes Décisions
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, color: 'rgba(255,255,255,0.4)', fontSize: 24, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Diagnostic Personnel & Gratuit
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
