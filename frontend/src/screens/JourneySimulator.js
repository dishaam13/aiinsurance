import { useState, useEffect } from 'react';

const API = 'http://localhost:8000';

// Generate journey steps dynamically based on customer
function generateJourney(customer) {
  const productNames = {
    "married_with_kids": "Family Health Insurance",
    "married_no_kids": "Family Health Insurance",
    "single_young": "Term Life Insurance",
    "senior": "Senior Citizen Health Plan",
    "widowed": "Critical Illness Insurance",
    "high_income": "Premium Health + Investment"
  };

  const eventIcons = {
    "married_with_kids": "👨‍👩‍👧‍👦",
    "married_no_kids": "💑",
    "single_young": "💼",
    "senior": "👴",
    "widowed": "🛡️",
    "high_income": "💎"
  };

  const product = productNames[customer.segment] || "Health Insurance";
  const eventIcon = eventIcons[customer.segment] || "🎯";

  return {
    name: customer.name,
    icon: customer.gender === 'female' ? '👩' : '👨',
    event: `${customer.marital_status} | ${customer.dependents} dependents`,
    product: product,
    channel: customer.channel,
    steps: [
      {
        icon: '🔍',
        title: 'Customer Profile Analyzed',
        desc: `AI analyzes ${customer.name}'s profile`,
        detail: `Age: ${customer.age} | Location: ${customer.location} | Income: ₹${customer.income.toLocaleString()} | Segment: ${customer.segment}`,
        color: '#3B82F6',
        time: 'Day 0 — 09:00 AM'
      },
      {
        icon: eventIcon,
        title: 'Life Stage Detected',
        desc: `Customer segment: ${customer.segment}`,
        detail: `${customer.marital_status} with ${customer.dependents} dependents. Priority: High`,
        color: '#EC4899',
        time: 'Day 0 — 09:01 AM'
      },
      {
        icon: '🎯',
        title: 'Product Matched',
        desc: `${product} recommended (${customer.confidence}% confidence)`,
        detail: `AI selected best insurance product based on life stage, income level, and demographics`,
        color: '#8B5CF6',
        time: 'Day 0 — 09:02 AM'
      },
      {
        icon: '✍️',
        title: 'Personalized Message Created',
        desc: `AI crafts message for ${customer.channel}`,
        detail: `Warm, relevant message tailored to ${customer.name}'s life situation. Includes product benefits and special offer.`,
        color: '#10B981',
        time: 'Day 0 — 09:03 AM'
      },
      {
        icon: '⚖️',
        title: 'Fairness Check Passed',
        desc: 'Bias detection score: 94/100',
        detail: 'Gender: FAIR ✅ | Location: FAIR ✅ | Age: FAIR ✅ | Income: FAIR ✅ — Campaign APPROVED',
        color: '#F59E0B',
        time: 'Day 0 — 09:04 AM'
      },
      {
        icon: '👨‍💼',
        title: 'Human Approval',
        desc: 'Marketing manager reviews recommendation',
        detail: 'Manager verified AI recommendation meets ethical standards. Approved in 38 seconds.',
        color: '#06B6D4',
        time: 'Day 0 — 09:05 AM'
      },
      {
        icon: '📱',
        title: `Message Sent via ${customer.channel}`,
        desc: `Delivered at optimal time: ${customer.best_time}`,
        detail: `Message delivered through preferred channel with perfect timing for maximum engagement`,
        color: '#3B82F6',
        time: customer.best_time
      },
      {
        icon: '👆',
        title: `${customer.name} Opens Message`,
        desc: 'Customer engages with personalized content',
        detail: `Open rate: 43%. ${customer.name} found the message relevant and timely.`,
        color: '#EC4899',
        time: '+2 minutes'
      },
      {
        icon: '🔍',
        title: 'Transparency Check',
        desc: `${customer.name} views "Why this recommendation?"`,
        detail: 'Explainability feature shows data used, reasons for recommendation, and customer has full control',
        color: '#8B5CF6',
        time: '+1 minute'
      },
      {
        icon: '💳',
        title: 'Purchase Complete!',
        desc: `${customer.name} buys ${product}`,
        detail: `Successful conversion! Customer felt the offer was genuinely helpful and trustworthy.`,
        color: '#10B981',
        time: '+15 minutes'
      },
      {
        icon: '📊',
        title: 'AI Learns & Improves',
        desc: 'Campaign success feeds back to AI model',
        detail: `Pattern learned: ${customer.segment} + ${customer.channel} + ${customer.best_time} = effective combination`,
        color: '#F59E0B',
        time: '+0 seconds'
      }
    ]
  };
}

export default function JourneySimulator({ uploadData }) {
  const [customers, setCustomers] = useState([]);
  const [sel, setSel] = useState(null);
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Load customers from upload or from API
    if (uploadData?.customers) {
      setCustomers(uploadData.customers.slice(0, 5)); // Show first 5
    } else {
      fetch(`${API}/customers`)
        .then(r => r.json())
        .then(d => setCustomers((d.customers || []).slice(0, 5)))
        .catch(() => setCustomers([]));
    }
  }, [uploadData]);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const start = async (customer) => {
    setSel(customer);
    setStep(-1);
    setRunning(true);
    setDone(false);

    const journey = generateJourney(customer);
    for (let i = 0; i < journey.steps.length; i++) {
      await sleep(1000);
      setStep(i);
    }

    setRunning(false);
    setDone(true);
  };

  const journey = sel ? generateJourney(sel) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', padding: '40px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '900', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          🎭 Customer Journey Simulator
          <span style={{ background: 'linear-gradient(135deg,#F59E0B,#EF4444)', padding: '4px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: '800' }}>WOW FACTOR</span>
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '16px', margin: 0 }}>
          Watch how AI transforms a customer's life event into a successful, ethical campaign — in real-time
        </p>
      </div>

      {!sel ? (
        // Customer Selection
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {customers.length === 0 ? (
            <div style={{ background: 'rgba(239,68,68,0.2)', border: '2px solid rgba(239,68,68,0.4)', borderRadius: '16px', padding: '32px', textAlign: 'center', gridColumn: '1 / -1' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚠️</div>
              <div style={{ color: '#FCA5A5', fontSize: '18px', fontWeight: '700' }}>No customers loaded</div>
              <div style={{ color: '#F87171', fontSize: '14px', marginTop: '8px' }}>Please upload a CSV file or start the backend</div>
            </div>
          ) : (
            customers.map((c, i) => (
              <div
                key={i}
                onClick={() => start(c)}
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
                  border: '2px solid rgba(59,130,246,0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#3B82F6';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(59,130,246,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                  {c.gender === 'female' ? '👩' : '👨'}
                </div>
                <div style={{ color: 'white', fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>
                  {c.name}
                </div>
                <div style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '12px' }}>
                  Age {c.age} • {c.location}
                </div>
                <div style={{ background: 'rgba(139,92,246,0.2)', color: '#C4B5FD', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', display: 'inline-block' }}>
                  {c.product_icon} {c.segment?.replace(/_/g, ' ').toUpperCase()}
                </div>
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#10B981', color: 'white', fontSize: '10px', padding: '4px 8px', borderRadius: '6px', fontWeight: '800' }}>
                  {c.confidence}% MATCH
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        // Journey Timeline
        <div>
          {/* Journey Header */}
          <div style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', borderRadius: '16px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '56px' }}>{journey.icon}</div>
              <div>
                <div style={{ color: 'white', fontSize: '24px', fontWeight: '900' }}>{journey.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>{journey.event}</div>
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: '700', marginTop: '4px' }}>
                  ✨ Recommended: {journey.product}
                </div>
              </div>
            </div>
            <button
              onClick={() => { setSel(null); setStep(-1); setDone(false); }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid rgba(255,255,255,0.4)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px'
              }}
            >
              ◀ Back
            </button>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical Line */}
            <div style={{
              position: 'absolute',
              left: '30px',
              top: '20px',
              bottom: '20px',
              width: '4px',
              background: 'linear-gradient(180deg, #3B82F6, #8B5CF6)',
              opacity: 0.3,
              borderRadius: '4px'
            }} />

            {journey.steps.map((s, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  marginBottom: '24px',
                  opacity: step >= i ? 1 : 0.3,
                  transform: step >= i ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.5s',
                  display: 'flex',
                  gap: '20px'
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    background: step >= i ? s.color : '#334155',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    flexShrink: 0,
                    border: step === i ? '4px solid white' : '4px solid transparent',
                    boxShadow: step === i ? '0 0 30px rgba(255,255,255,0.5)' : 'none',
                    transition: 'all 0.3s',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {s.icon}
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    background: step >= i ? 'rgba(255,255,255,0.05)' : 'rgba(100,116,139,0.1)',
                    border: step >= i ? '2px solid rgba(255,255,255,0.2)' : '2px solid rgba(100,116,139,0.2)',
                    borderRadius: '12px',
                    padding: '16px 20px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ color: 'white', fontSize: '18px', fontWeight: '800' }}>{s.title}</div>
                      <div style={{ color: '#94A3B8', fontSize: '14px', marginTop: '4px' }}>{s.desc}</div>
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                      {s.time}
                    </div>
                  </div>
                  <div style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: '1.6' }}>
                    {s.detail}
                  </div>
                  {step === i && running && (
                    <div style={{ marginTop: '10px', color: '#F59E0B', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="spinner" style={{ width: '12px', height: '12px', border: '2px solid #F59E0B', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Success Message */}
          {done && (
            <div style={{
              background: 'linear-gradient(135deg, #10B981, #059669)',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'center',
              marginTop: '32px',
              animation: 'fadeIn 0.5s'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '12px' }}>🎉</div>
              <div style={{ color: 'white', fontSize: '28px', fontWeight: '900', marginBottom: '8px' }}>
                Journey Complete!
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                {journey.name} successfully converted with ethical AI personalization
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
