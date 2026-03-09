import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'TSUNAGU - 中国IT人材 × リモートトライアル採用'
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
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#171717',
          position: 'relative',
        }}
      >
        {/* ヒーローセクション風：白＋薄いグリッド */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.08,
          }}
        />

        {/* 中央：ロゴは白・グレーなので黒テキストでTSUNAGUを表示（ヒーロー風） */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: '0.2em', color: '#171717', marginBottom: 16 }}>
            TSUNAGU
          </div>
          <div style={{ fontSize: 28, color: '#525252', fontWeight: 500, maxWidth: 700, textAlign: 'center', lineHeight: 1.5 }}>
            中国IT人材 × リモートトライアル採用
          </div>
          <div style={{
            marginTop: 32,
            padding: '10px 20px',
            border: '2px solid #171717',
            fontSize: 18,
            color: '#171717',
            fontFamily: 'monospace',
            letterSpacing: 3
          }}>
            ZERO RISK. PROVEN TALENT.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
