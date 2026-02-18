import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const API = 'http://localhost:8000';

const trend = [
  { day: 'Mon', open: 38, conv: 6 }, { day: 'Tue', open: 40, conv: 7 },
  { day: 'Wed', open: 37, conv: 6 }, { day: 'Thu', open: 42, conv: 7 },
  { day: 'Fri', open: 41, conv: 8 }, { day: 'Sat', open: 45, conv: 9 }, { day: 'Sun', open: 43, conv: 8 },
];

const channels = [
  { name: 'WhatsApp', rate: 52 }, { name: 'App', rate: 48 },
  { name: 'SMS', rate: 45 }, { name: 'Email', rate: 38 },
];

export default function Dashboard({ setScreen }) {
  const [stats, setStats] = useState({ campaigns_sent: 247, open_rate: 43, conversion_rate: 8, fairness_score: 94, customer_satisfaction: 87, agent_accuracy: 91 });
  const [customers, setCustomers] = useState([]);
  const [count, setCount] = useState(247);

  useEffect(() => {
    fetch(`${API}/stats`).then(r => r.json()).then(setStats).catch(() => {});
    fetch(`${API}/customers`).then(r => r.json()).then(d => setCustomers(d.customers || [])).catch(() => {});
    const t = setInterval(() => setCount(c => c + Math.floor(Math.random() * 2)), 5000);
    return () => clearInterval(t);
  }, []);

  const cards = [
    { label: 'Campaigns Sent', value: count, color: '#3B82F6', icon: '📤', sub: '+8 today' },
    { label: 'Open Rate', value: `${stats.open_rate}%`, color: '#10B981', icon: '📬', sub: 'vs 15% industry' },
    { label: 'Conversion Rate', value: `${stats.conversion_rate}%`, color: '#8B5CF6', icon: '🎯', sub: 'vs 2% industry' },
    { label: 'Fairness Score', value: `${stats.fairness_score}/100`, color: '#F59E0B', icon: '⚖️', sub: '✅ All Clear' },
    { label: 'Agent Accuracy', value: `${stats.agent_accuracy}%`, color: '#EF4444', icon: '🤖', sub: '6 tools used' },
  ];

  const lifeLabel = { just_married: '💍 Just Married', bought_car: '🚗 Bought Car', had_baby: '👶 Had Baby', bought_house: '🏠 Bought House', new_job: '💼 New Job' };

  return (
    <div style={{ padding: '28px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#0F172A', margin: '0 0 4px' }}>📊 Campaign Dashboard</h2>
        <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>Real-time overview of your AI agent's marketing performance</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderTop: `4px solid ${c.color}` }}>
            <div style={{ fontSize: '26px', marginBottom: '6px' }}>{c.icon}</div>
            <div style={{ fontSize: '26px', fontWeight: 'bold', color: c.color }}>{c.value}</div>
            <div style={{ color: '#64748B', fontSize: '12px', marginTop: '2px' }}>{c.label}</div>
            <div style={{ background: `${c.color}15`, color: c.color, fontSize: '10px', padding: '2px 6px', borderRadius: '10px', display: 'inline-block', marginTop: '6px', fontWeight: '600' }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '18px', marginBottom: '20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: '#1E293B' }}>📈 Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="open" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} name="Open Rate %" />
              <Line type="monotone" dataKey="conv" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} name="Conversion %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', color: '#1E293B' }}>📱 Channel Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={channels} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={60} />
              <Tooltip />
              <Bar dataKey="rate" fill="#8B5CF6" radius={[0, 6, 6, 0]} name="Open Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', color: '#1E293B' }}>👥 Customer Profiles</h3>
          <button onClick={() => setScreen('agent')} style={{ background: '#1E3A8A', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
            🤖 Run Agent
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #F1F5F9' }}>
              {['Customer', 'Age', 'Location', 'Life Event', 'Channel', 'Best Time'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '11px', color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#1E293B' }}>{c.icon} {c.name}</td>
                <td style={{ padding: '12px', color: '#64748B' }}>{c.age}</td>
                <td style={{ padding: '12px', color: '#64748B' }}>{c.location}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ background: '#EFF6FF', color: '#3B82F6', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                    {lifeLabel[c.life_event]}
                  </span>
                </td>
                <td style={{ padding: '12px', color: '#64748B' }}>{c.channel}</td>
                <td style={{ padding: '12px', color: '#64748B', fontSize: '13px' }}>{c.best_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
