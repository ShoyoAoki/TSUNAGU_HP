import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'TSUNAGU - Bridging Talent Across Asia'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const LOGO_URL = 'https://tsunaguinc.co.jp/images/logo.png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Grid Pattern Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.3,
          }}
        />

        {/* Decorative Elements */}
        <div style={{ position: 'absolute', top: 60, left: 60, width: 20, height: 20, background: '#06b6d4' }} />
        <div style={{ position: 'absolute', bottom: 80, right: 80, width: 40, height: 40, border: '4px solid #a855f7', opacity: 0.6 }} />

        {/* TSUNAGU ロゴ */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <img
            src={LOGO_URL}
            alt="TSUNAGU"
            width={360}
            height={90}
            style={{ height: 90, width: 'auto', objectFit: 'contain' }}
          />
        </div>

        <div style={{ fontSize: 32, color: '#9ca3af', fontWeight: 500, maxWidth: 800, textAlign: 'center', lineHeight: 1.4 }}>
          Bridging Talent Across Asia.
        </div>

        <div style={{
          marginTop: 40,
          padding: '12px 24px',
          border: '2px solid #333',
          fontSize: 20,
          color: '#06b6d4',
          fontFamily: 'monospace',
          letterSpacing: 4
        }}>
          TSUNAGU Inc.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
