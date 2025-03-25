import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'UUID Matcher - Perfect UUID Match';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

// Function to get a gradient for the card background
const getGradientBackground = () => {
  const gradients = [
    'linear-gradient(to right bottom, #ff3d6f, #9867f0)',
    'linear-gradient(to right bottom, #3b82f6, #06b6d4)',
    'linear-gradient(to right bottom, #6366f1, #a855f7)',
    'linear-gradient(to right bottom, #f97316, #ec4899)',
    'linear-gradient(to right bottom, #22c55e, #0ea5e9)'
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// Function to generate random messages
const getMatchMessage = () => {
  const messages = [
    "Perfect UUID Match Found!",
    "Your Digital Soulmate Awaits!",
    "The One UUID You're Looking For",
    "A Match Made in Digital Heaven",
    "When Human Meets UUID"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Safe base64 decode for server environment
const safeAtob = (str: string): string => {
  try {
    // Node.js environment
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'base64').toString();
    }
    // Browser environment
    return atob(str);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return str;
  }
};

export default async function Image({ params }: { params: { id: string } }) {
  // Try to decode a base64 string (if it is one)
  let uuid = params.id;
  try {
    const decoded = safeAtob(params.id);
    try {
      const profile = JSON.parse(decoded);
      if (profile.uuid) {
        uuid = profile.uuid;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // Not JSON, use decoded as is
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    // If decoding fails, use the id as is
  }
  
  // Clean up the UUID
  uuid = uuid.replace(/_/g, '-');

  const matchMessage = getMatchMessage();
  const gradient = getGradientBackground();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #334155 2%, transparent 0%), radial-gradient(circle at 75px 75px, #334155 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: 40,
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo/Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: 40 
        }}>
          <h1 style={{ 
            fontSize: 60, 
            fontWeight: 'bold', 
            color: 'white', 
            margin: 0 
          }}>
            UUID<span style={{ color: '#ec4899' }}>Matcher</span>
          </h1>
        </div>

        {/* Match Message */}
        <div style={{ 
          fontSize: 48, 
          fontWeight: 'bold', 
          color: 'white', 
          textAlign: 'center',
          marginBottom: 30,
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '20px 40px',
          borderRadius: 20,
        }}>
          {matchMessage}
        </div>

        {/* UUID Card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: gradient,
          width: '80%',
          borderRadius: 24,
          padding: 32,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: 16 
          }}>
            Your Perfect UUID
          </div>
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.2)', 
            padding: 24, 
            borderRadius: 12,
            width: '90%', 
            marginBottom: 16,
            textAlign: 'center'
          }}>
            <p style={{ 
              fontFamily: 'monospace', 
              fontSize: 24, 
              color: 'white',
              overflowWrap: 'break-word'
            }}>
              {uuid}
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div style={{ 
          marginTop: 40, 
          fontSize: 28, 
          color: 'white',
          opacity: 0.8
        }}>
          Find your own perfect UUID match at uuidmatcher.com
        </div>
      </div>
    ),
    {
      ...size,
      // No custom fonts, use system fonts instead
    }
  );
} 