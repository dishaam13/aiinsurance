import { useState, useEffect } from 'react';

function Counter({ target, duration = 2000, suffix = '', color = '#1E293B' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 200);
    return () => clearTimeout(t);
  }, [target]);
  return <span style={{ color, fontWeight: '800' }}>{val}{suffix}</span>;
}

export default function ComingSoon() {
  // COUNTDOWN: 2 DAYS FROM NOW
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2); // ✅ 2 DAYS COUNTDOWN

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1E293B 0%, #020617 50%, #0F172A 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#E5E7EB',
      padding: '24px',
      overflow: 'hidden'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '48px 24px',
        background: 'rgba(15, 23, 42, 0.9)',
        borderRadius: '24px',
        border: '1px solid rgba(148, 163, 184, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* LOGO */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #38BDF8 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            TrustAI
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#CBD5E1',
            margin: '16px 0 0 0',
            fontWeight: '300'
          }}>
            AI Insurance Campaign Agent
          </p>
        </div>

        {/* COMING SOON */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#F8FAFC',
            margin: '0 0 16px 0'
          }}>
            🚀 Coming Soon
        
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#94A3B3',
            lineHeight: '1.6',
            margin: 0
          }}>
            Personalized insurance campaigns powered by AI
          </p>
        </div>

        {/* 2-DAY COUNTDOWN */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '40px',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '16px',
            padding: '24px 12px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: '900',
              color: '#38BDF8',
              lineHeight: '1'
            }}>
              <Counter target={timeLeft.days} duration={1500} />
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#94A3B3',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: '600',
              marginTop: '8px'
            }}>
              Days
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '16px',
            padding: '24px 12px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: '900',
              color: '#38BDF8',
              lineHeight: '1'
            }}>
              <Counter target={timeLeft.hours} duration={1500} />
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#94A3B3',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: '600',
              marginTop: '8px'
            }}>
              Hours
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '16px',
            padding: '24px 12px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: '900',
              color: '#38BDF8',
              lineHeight: '1'
            }}>
              <Counter target={timeLeft.minutes} duration={1500} />
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#94A3B3',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: '600',
              marginTop: '8px'
            }}>
              Mins
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '16px',
            padding: '24px 12px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: '900',
              color: '#38BDF8',
              lineHeight: '1'
            }}>
              <Counter target={timeLeft.seconds} duration={1500} />
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#94A3B3',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: '600',
              marginTop: '8px'
            }}>
              Secs
            </div>
          </div>
        </div>

        {/* NOTIFY FORM */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          marginBottom: '32px'
        }}>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#CBD5E1' }}>
            Be first to know when we launch
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '14px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#F8FAFC',
                fontSize: '1rem'
              }}
            />
            <button
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #38BDF8 0%, #3B82F6 100%)',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(56, 189, 248, 0.3)'
              }}
            >
              Notify Me
            </button>
          </div>
        </div>

        <p style={{
          fontSize: '0.875rem',
          color: '#64748B',
          opacity: 0.8
        }}>
          © 2026 TrustAI. Launching in 2 days.
        </p>
      </div>
    </div>
  );
}
