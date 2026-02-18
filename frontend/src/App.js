import { useState } from 'react';
import UploadScreen from './screens/UploadScreen';
import Dashboard from './screens/Dashboard';
import LiveAgentChat from './screens/LiveAgentChat';
import JourneySimulator from './screens/JourneySimulator';
import BeforeAfter from './screens/BeforeAfter';
import BiasAlert from './screens/BiasAlert';
import WhatIfSimulator from './screens/WhatIfSimulator';
import FairnessMonitor from './screens/FairnessMonitor';
import ExplainScreen from './screens/ExplainScreen';
import CustomerPanel from './screens/CustomerPanel';

const FEATURES = [
  { key: 'dashboard', label: '📊 Dashboard', component: Dashboard },
  { key: 'agent', label: '🤖 AI Agent', component: LiveAgentChat },
  { key: 'journey', label: '🎭 Customer Journey', component: JourneySimulator },
  { key: 'compare', label: '📈 Before vs After', component: BeforeAfter },
  { key: 'bias', label: '🚨 Bias Detection', component: BiasAlert },
  { key: 'whatif', label: '🔄 What-If Simulator', component: WhatIfSimulator },
  { key: 'fairness', label: '⚖️ Fairness Monitor', component: FairnessMonitor },
  { key: 'explain', label: '🔍 Explainability', component: ExplainScreen },
  { key: 'control', label: '🎛️ Customer Control', component: CustomerPanel },
];

export default function App() {
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadData, setUploadData] = useState(null);
  const [screen, setScreen] = useState('dashboard');

  const handleUploadSuccess = (data) => {
    setUploadData(data);
    setUploadComplete(true);
  };

  if (!uploadComplete) {
    return <UploadScreen onUploadSuccess={handleUploadSuccess} />;
  }

  const ActiveComponent = FEATURES.find(f => f.key === screen)?.component;


  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", minHeight: '100vh', background: '#F1F5F9', display: 'flex' }}>
      
      {/* LEFT SIDEBAR */}
      <div style={{ width: '280px', background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)', boxShadow: '4px 0 24px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 100 }}>
        
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ fontSize: '32px' }}>🤖</div>
            <div>
              <div style={{ color: 'white', fontSize: '20px', fontWeight: '900', letterSpacing: '0.5px' }}>TrustAI</div>
              <div style={{ color: '#94A3B8', fontSize: '11px' }}>Ethical Marketing Agent</div>
            </div>
          </div>
          
          {/* Upload Stats */}
          {uploadData && (
            <div style={{ marginTop: '12px', background: 'rgba(16,185,129,0.2)', borderRadius: '8px', padding: '8px 10px', border: '1px solid rgba(16,185,129,0.3)' }}>
              <div style={{ color: '#6EE7B7', fontSize: '11px', marginBottom: '2px' }}>✅ Dataset Loaded</div>
              <div style={{ color: 'white', fontSize: '16px', fontWeight: '800' }}>{uploadData.total} Customers</div>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <div style={{ padding: '20px 16px', flex: 1, overflowY: 'auto' }}>
          <div style={{ color: '#94A3B8', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', marginBottom: '12px' }}>
            FEATURES
          </div>
          
          {FEATURES.map(item => (
            <button
              key={item.key}
              onClick={() => setScreen(item.key)}
              style={{
                width: '100%',
                background: screen === item.key ? 'rgba(99,102,241,0.2)' : 'transparent',
                border: screen === item.key ? '2px solid #6366F1' : '2px solid transparent',
                color: screen === item.key ? 'white' : '#94A3B8',
                padding: '12px 14px',
                borderRadius: '10px',
                cursor: 'pointer',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: screen === item.key ? '700' : '600',
                textAlign: 'left',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              {item.label}
              {screen === item.key && (
                <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', background: '#6366F1', borderRadius: '50%' }} />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ background: 'rgba(16,185,129,0.1)', borderRadius: '8px', padding: '12px', marginBottom: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>
            <div style={{ color: '#6EE7B7', fontSize: '11px', marginBottom: '4px' }}>System Status</div>
            <div style={{ color: 'white', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} />
              All Features Active
            </div>
          </div>
          <button
            onClick={() => { setUploadComplete(false); setUploadData(null); }}
            style={{
              width: '100%',
              background: 'rgba(100,116,139,0.2)',
              border: '2px solid rgba(100,116,139,0.3)',
              color: '#94A3B8',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '700'
            }}
          >
            🔄 Change Dataset
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: '280px', flex: 1, minHeight: '100vh' }}>
        {ActiveComponent && <ActiveComponent uploadData={uploadData} setScreen={setScreen} />}
      </div>
    </div>
  );
}
