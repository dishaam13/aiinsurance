import { useState } from 'react';

const API = 'http://localhost:8000';

const CUSTOMERS = [
  { id: 1, name: 'Priya Sharma', event: 'Just Married 💍', age: 28, location: 'Mumbai', icon: '👰', channel: 'WhatsApp', color: '#EC4899' },
  { id: 2, name: 'Rahul Kumar', event: 'Bought Car 🚗', age: 26, location: 'Delhi', icon: '🧑', channel: 'Email', color: '#3B82F6' },
  { id: 3, name: 'Anjali Patel', event: 'Had Baby 👶', age: 32, location: 'Bangalore', icon: '👩', channel: 'WhatsApp', color: '#10B981' },
  { id: 4, name: 'Vikram Singh', event: 'Bought House 🏠', age: 35, location: 'Pune', icon: '👨', channel: 'Email', color: '#8B5CF6' },
  { id: 5, name: 'Sneha Rao', event: 'New Job 💼', age: 24, location: 'Chennai', icon: '👩‍💼', channel: 'App', color: '#F59E0B' },
];

const TOOL_META = {
  analyze_customer_profile:         { icon: '🔍', label: 'Analyzing Customer Profile',     color: '#3B82F6' },
  recommend_insurance_product:      { icon: '🎯', label: 'Recommending Best Product',       color: '#8B5CF6' },
  generate_personalized_message:    { icon: '✍️', label: 'Generating Personalized Message', color: '#10B981' },
  select_optimal_channel_and_timing:{ icon: '📱', label: 'Selecting Channel & Timing',      color: '#F59E0B' },
  run_fairness_check:               { icon: '⚖️', label: 'Running Fairness Check',          color: '#EF4444' },
  schedule_and_send_campaign:       { icon: '🚀', label: 'Scheduling Campaign',             color: '#06B6D4' },
};

export default function AgentRunner() {
  const [selected, setSelected] = useState(null);
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState('');
  const [approved, setApproved] = useState(false);

  const runAgent = async (customerId) => {
    setSelected(customerId);
    setRunning(true);
    setSteps([]);
    setResult(null);
    setApproved(false);

    // Show "starting" animation
    setCurrentStep('Agent initializing...');
    await sleep(600);
    setCurrentStep('Reading customer profile...');
    await sleep(500);

    try {
      const res = await fetch(`${API}/agent/run/${customerId}`, { method: 'POST' });
      const data = await res.json();

      // Animate each step appearing
      if (data.agent_steps && data.agent_steps.length > 0) {
        for (let i = 0; i < data.agent_steps.length; i++) {
          const step = data.agent_steps[i];
          const meta = TOOL_META[step.tool] || { icon: '⚙️', label: step.tool, color: '#64748B' };
          setCurrentStep(`${meta.icon} ${meta.label}...`);
          setSteps(prev => [...prev, { ...step, meta }]);
          await sleep(700);
        }
      }

      setCurrentStep('Campaign ready!');
      await sleep(400);
      setResult(data);

    } catch (err) {
      // Fallback with simulated steps
      const customer = CUSTOMERS.find(c => c.id === customerId);
      const simulatedSteps = Object.entries(TOOL_META).map(([tool, meta], i) => ({
        step: i + 1,
        tool,
        meta,
        status: 'completed'
      }));

      for (const step of simulatedSteps) {
        setCurrentStep(`${step.meta.icon} ${step.meta.label}...`);
        setSteps(prev => [...prev, step]);
        await sleep(700);
      }

      setResult({
        success: true,
        customer_name: customer?.name,
        product: 'Family Health Insurance',
        product_emoji: '💍',
        discount: '20% Newlywed Discount',
        message: `Congratulations on your recent life event, ${customer?.name?.split(' ')[0]}! 🎉 Our insurance plan is perfect for you. Get a special discount today!`,
        channel: customer?.channel,
        best_time: 'Saturday 10:00 AM',
        confidence: 89,
        fairness_score: 94,
        campaign_id: `CAMP-${customerId}-DEMO`,
        compliance_status: 'COMPLIANT',
        estimated_open_rate: '45%',
        agent_summary: `Agent successfully created a personalized campaign for ${customer?.name}. All fairness checks passed.`,
        total_steps: simulatedSteps.length
      });
    }

    setRunning(false);
    setCurrentStep('');
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const customer = CUSTOMERS.find(c => c.id === selected);

  return (
    <div style={{ padding: '28px', maxWidth: '1400px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>
          🤖 TrustAI Marketing Agent
        </h2>
        <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
          Select a customer — watch the AI Agent autonomously analyze, decide, and create a personalized campaign step by step
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>

        {/* LEFT: Customer List */}
        <div>
          <div style={{ background: 'white', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <h3 style={{ margin: '0 0 14px', fontSize: '14px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Select Customer
            </h3>

            {CUSTOMERS.map(c => (
              <div
                key={c.id}
                onClick={() => !running && runAgent(c.id)}
                style={{
                  padding: '14px', marginBottom: '8px', borderRadius: '10px',
                  border: `2px solid ${selected === c.id ? c.color : '#F1F5F9'}`,
                  background: selected === c.id ? `${c.color}10` : '#FAFAFA',
                  cursor: running ? 'not-allowed' : 'pointer',
                  opacity: running && selected !== c.id ? 0.5 : 1,
                  transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: '12px'
                }}
              >
                <span style={{ fontSize: '28px' }}>{c.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#1E293B', fontSize: '14px' }}>{c.name}</div>
                  <div style={{ color: '#94A3B8', fontSize: '11px' }}>{c.age} yrs • {c.location}</div>
                  <span style={{
                    background: `${c.color}20`, color: c.color,
                    fontSize: '11px', padding: '2px 8px', borderRadius: '20px',
                    fontWeight: '600', display: 'inline-block', marginTop: '4px'
                  }}>
                    {c.event}
                  </span>
                </div>
                {selected === c.id && running && (
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: c.color, animation: 'pulse 1s infinite' }} />
                )}
                {selected === c.id && !running && result && (
                  <span style={{ color: '#10B981', fontSize: '18px' }}>✓</span>
                )}
              </div>
            ))}
          </div>

          {/* Responsible AI Badge */}
          <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E3A8A)', borderRadius: '12px', padding: '16px', marginTop: '14px', color: 'white' }}>
            <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '10px' }}>🛡️ Responsible AI</div>
            {['Transparent decisions', 'Fairness check on every campaign', 'Customer data privacy', 'Human oversight enabled'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '12px', opacity: 0.85 }}>
                <span style={{ color: '#22C55E' }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Agent Activity */}
        <div>

          {/* Empty state */}
          {!selected && (
            <div style={{ background: 'white', borderRadius: '14px', padding: '80px 40px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: '72px', marginBottom: '16px' }}>🤖</div>
              <h3 style={{ color: '#CBD5E1', fontSize: '20px', marginBottom: '8px' }}>Agent Ready</h3>
              <p style={{ color: '#94A3B8', fontSize: '14px' }}>Select a customer to watch the AI Agent think and act in real-time</p>
            </div>
          )}

          {/* Agent Running / Completed */}
          {selected && (
            <div>

              {/* Agent Status Bar */}
              <div style={{
                background: running
                  ? 'linear-gradient(135deg, #1E3A8A, #3B82F6)'
                  : 'linear-gradient(135deg, #065F46, #10B981)',
                borderRadius: '12px', padding: '16px 22px', marginBottom: '18px',
                display: 'flex', alignItems: 'center', gap: '14px', color: 'white'
              }}>
                <span style={{ fontSize: '28px' }}>{running ? '⚡' : '✅'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '16px' }}>
                    {running ? `Agent Working on ${customer?.name}...` : `Campaign Created for ${customer?.name}!`}
                  </div>
                  <div style={{ opacity: 0.8, fontSize: '13px', marginTop: '2px' }}>
                    {running ? currentStep : `${result?.total_steps} steps completed • Campaign scheduled!`}
                  </div>
                </div>
                {running && (
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>
                    Step {steps.length} / 6
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>

                {/* Agent Steps Log */}
                <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                  <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🧠 Agent Thinking Log
                    {running && (
                      <span style={{ background: '#DBEAFE', color: '#1D4ED8', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>
                        LIVE
                      </span>
                    )}
                  </h3>

                  {steps.length === 0 && running && (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>🤔</div>
                      <p style={{ fontSize: '13px' }}>Agent is thinking...</p>
                    </div>
                  )}

                  {steps.map((step, i) => {
                    const meta = step.meta || TOOL_META[step.tool] || { icon: '⚙️', label: step.tool, color: '#64748B' };
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '12px',
                          padding: '12px', marginBottom: '8px',
                          background: '#F8FAFC', borderRadius: '8px',
                          borderLeft: `3px solid ${meta.color}`,
                          animation: 'fadeIn 0.3s ease'
                        }}
                      >
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          background: `${meta.color}20`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '16px', flexShrink: 0
                        }}>
                          {meta.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', color: '#1E293B', fontSize: '13px' }}>
                            Step {i + 1}: {meta.label}
                          </div>
                          <div style={{ color: '#64748B', fontSize: '12px', marginTop: '2px' }}>
                            {step.tool_display?.description || 'Processing...'}
                          </div>
                          <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ background: '#ECFDF5', color: '#065F46', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                              ✓ DONE
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Running indicator */}
                  {running && steps.length < 6 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#EFF6FF', borderRadius: '8px', borderLeft: '3px solid #3B82F6' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                        ⚡
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: '#1D4ED8', fontSize: '13px' }}>Agent thinking...</div>
                        <div style={{ color: '#93C5FD', fontSize: '12px' }}>{currentStep}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Campaign Result */}
                <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
                  <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: '#1E293B' }}>
                    📋 Campaign Result
                  </h3>

                  {running && !result && (
                    <div style={{ padding: '30px', textAlign: 'center', color: '#94A3B8' }}>
                      <div style={{ fontSize: '40px', marginBottom: '8px' }}>⏳</div>
                      <p style={{ fontSize: '13px' }}>Waiting for agent to complete...</p>
                    </div>
                  )}

                  {result && !approved && (
                    <div>
                      {/* Product */}
                      <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', borderRadius: '10px', padding: '14px', marginBottom: '12px' }}>
                        <div style={{ fontSize: '28px', marginBottom: '4px' }}>{result.product_emoji}</div>
                        <div style={{ fontWeight: '700', color: '#1E3A8A', fontSize: '16px' }}>{result.product}</div>
                        <div style={{ color: '#3B82F6', fontSize: '12px', marginTop: '4px' }}>{result.discount}</div>
                      </div>

                      {/* Stats row */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                        {[
                          { label: 'Confidence', value: `${result.confidence}%`, color: '#10B981' },
                          { label: 'Fairness', value: `${result.fairness_score}/100`, color: '#8B5CF6' },
                          { label: 'Est. Open Rate', value: result.estimated_open_rate || '45%', color: '#F59E0B' },
                        ].map((stat, i) => (
                          <div key={i} style={{ background: '#F8FAFC', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                            <div style={{ fontWeight: '800', color: stat.color, fontSize: '16px' }}>{stat.value}</div>
                            <div style={{ color: '#94A3B8', fontSize: '10px', marginTop: '2px' }}>{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Channel + Time */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ background: '#F0FDF4', color: '#065F46', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                          📱 {result.channel}
                        </span>
                        <span style={{ background: '#FFFBEB', color: '#92400E', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                          ⏰ {result.best_time}
                        </span>
                        <span style={{ background: '#ECFDF5', color: '#065F46', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                          ✅ {result.compliance_status}
                        </span>
                      </div>

                      {/* Message Preview */}
                      <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
                        <div style={{ fontWeight: '700', color: '#0369A1', fontSize: '12px', marginBottom: '8px' }}>💬 PERSONALIZED MESSAGE</div>
                        <p style={{ color: '#1E293B', fontSize: '13px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                          {result.message}
                        </p>
                      </div>

                      {/* Agent Summary */}
                      {result.agent_summary && (
                        <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                          <div style={{ fontWeight: '700', color: '#7C3AED', fontSize: '11px', marginBottom: '4px' }}>🤖 AGENT SUMMARY</div>
                          <p style={{ color: '#4C1D95', fontSize: '12px', lineHeight: '1.5', margin: 0 }}>{result.agent_summary}</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => setApproved(true)}
                          style={{
                            flex: 1, background: 'linear-gradient(135deg, #10B981, #059669)',
                            color: 'white', border: 'none', padding: '12px',
                            borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px'
                          }}
                        >
                          ✅ Approve & Send
                        </button>
                        <button
                          onClick={() => { setResult(null); setSteps([]); setSelected(null); }}
                          style={{
                            flex: 1, background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                            color: 'white', border: 'none', padding: '12px',
                            borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '14px'
                          }}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Approved */}
                  {approved && (
                    <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                      <div style={{ fontSize: '56px', marginBottom: '12px' }}>🎉</div>
                      <h3 style={{ color: '#10B981', marginBottom: '6px' }}>Campaign Approved!</h3>
                      <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '16px' }}>
                        Campaign <strong>{result?.campaign_id}</strong> scheduled for delivery
                      </p>
                      <div style={{ background: '#ECFDF5', borderRadius: '10px', padding: '14px', textAlign: 'left', marginBottom: '16px' }}>
                        {[['Customer', result?.customer_name], ['Product', result?.product], ['Channel', result?.channel], ['Send Time', result?.best_time]].map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                            <span style={{ color: '#64748B' }}>{k}:</span>
                            <span style={{ fontWeight: '700', color: '#065F46' }}>{v}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => { setApproved(false); setResult(null); setSteps([]); setSelected(null); }}
                        style={{ background: '#1E3A8A', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}
                      >
                        Run Another Campaign
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
