import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#070709',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '1.5px solid #8b5cf6',
          boxShadow: '0px 0px 8px rgba(139, 92, 246, 0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '18px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            background: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-1px',
          }}
        >
          {'{}'}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
