import { useState, useEffect } from 'react';
import { API, safeFetch, MOCK_CUSTOMERS, MOCK_DATASET_STATS, EVENT_LABELS } from '../mockData';

const COLORS = ['#3B82F6','#10B981','#8B5CF6','#F59E0B','#EF4444'];

export default function DatasetScreen() {
  const [stats, setStats]       = useState(MOCK_DATASET_STATS);
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [filter, setFilter]     = useState({ event:'', location:'' });

  useEffect(() => {
    safeFetch(`${API}/dataset/stats`, MOCK_DATASET_STATS).then(setStats);
    safeFetch(`${API}/customers?limit=100`, { customers: MOCK_CUSTOMERS }).then(d => setCustomers(d.customers || MOCK_CUSTOMERS));
  }, []);

  const filtered = customers.filter(c =>
    (!filter.event    || c.life_event === filter.event) &&
    (!filter.location || c.location.toLowerCase() === filter.location.toLowerCase())
  );

  const maxEvent = Math.max(...Object.values(stats.events || {}));

  return (
    <div style={{ padding: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, color: '#1E293B', fontSize: 24, fontWeight: 800 }}>📁 Dataset Overview</h2>
        <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: 14 }}>100 synthetic profiles designed to test fairness, personalization &amp; bias detection</p>
      </div>

      {/* Top Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14, marginBottom:24 }}>
        {[
          {label:'Total Profiles',value:stats.total,icon:'👥',color:'#3B82F6'},
          {label:'Cities Covered',value:stats.city_count,icon:'🏙️',color:'#10B981'},
          {label:'Age Range',value:`${stats.age_min}–${stats.age_max}`,icon:'📅',color:'#8B5CF6'},
          {label:'Life Events',value:Object.keys(stats.events||{}).length,icon:'🎯',color:'#F59E0B'},
          {label:'Gender Split',value:'52F / 48M',icon:'⚖️',color:'#EF4444'},
        ].map((c,i)=>(
          <div key={i} style={{ background:'white', borderRadius:12, padding:'16px 14px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', borderTop:`4px solid ${c.color}` }}>
            <div style={{ fontSize:22 }}>{c.icon}</div>
            <div style={{ fontSize:22, fontWeight:900, color:c.color, marginTop:4 }}>{c.value}</div>
            <div style={{ color:'#64748B', fontSize:11, marginTop:2 }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
        {/* Events */}
        <div style={{ background:'white', borderRadius:14, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,0.07)' }}>
          <h3 style={{ margin:'0 0 16px', fontSize:15, fontWeight:800 }}>🎯 Life Event Distribution</h3>
          {Object.entries(stats.events||{}).map(([event,count],i)=>(
            <div key={event} style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>{EVENT_LABELS[event]||event}</span>
                <span style={{ fontSize:13, fontWeight:800, color:COLORS[i] }}>{count} ({Math.round(count/(stats.total||100)*100)}%)</span>
              </div>
              <div style={{ height:10, background:'#F1F5F9', borderRadius:10 }}>
                <div style={{ height:10, background:COLORS[i], borderRadius:10, width:`${(count/maxEvent)*100}%`, transition:'width 1s' }} />
              </div>
            </div>
          ))}
        </div>
        {/* Channels */}
        <div style={{ background:'white', borderRadius:14, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,0.07)' }}>
          <h3 style={{ margin:'0 0 16px', fontSize:15, fontWeight:800 }}>📱 Channel Distribution</h3>
          {Object.entries(stats.channels||{}).map(([ch,count],i)=>(
            <div key={ch} style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>{ch}</span>
                <span style={{ fontSize:13, fontWeight:800, color:COLORS[i] }}>{count}%</span>
              </div>
              <div style={{ height:10, background:'#F1F5F9', borderRadius:10 }}>
                <div style={{ height:10, background:COLORS[i], borderRadius:10, width:`${count}%`, transition:'width 1s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Distribution */}
      <div style={{ background:'white', borderRadius:14, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,0.07)', marginBottom:24 }}>
        <h3 style={{ margin:'0 0 16px', fontSize:15, fontWeight:800 }}>🏙️ City Distribution</h3>
        <div style={{ display:'flex', gap:12 }}>
          {Object.entries(stats.cities||{}).map(([city,count],i)=>(
            <div key={city} style={{ flex:1, background:'#F8FAFC', borderRadius:10, padding:'14px 12px', textAlign:'center', borderTop:`3px solid ${COLORS[i]}` }}>
              <div style={{ fontSize:22, fontWeight:900, color:COLORS[i] }}>{count}</div>
              <div style={{ fontSize:12, fontWeight:700, color:'#1E293B' }}>{city}</div>
              <div style={{ fontSize:11, color:'#94A3B8' }}>{Math.round(count/(stats.total||100)*100)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter + Table */}
      <div style={{ background:'white', borderRadius:14, padding:20, boxShadow:'0 2px 12px rgba(0,0,0,0.07)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, flexWrap:'wrap', gap:10 }}>
          <h3 style={{ margin:0, fontSize:15, fontWeight:800 }}>📋 Customer Records (showing {filtered.length})</h3>
          <div style={{ display:'flex', gap:8 }}>
            <select value={filter.event} onChange={e=>setFilter({...filter,event:e.target.value})} style={{ padding:'6px 10px', borderRadius:8, border:'1px solid #E2E8F0', fontSize:12 }}>
              <option value="">All Events</option>
              {Object.keys(EVENT_LABELS).map(e=><option key={e} value={e}>{EVENT_LABELS[e]}</option>)}
            </select>
            <select value={filter.location} onChange={e=>setFilter({...filter,location:e.target.value})} style={{ padding:'6px 10px', borderRadius:8, border:'1px solid #E2E8F0', fontSize:12 }}>
              <option value="">All Cities</option>
              {['Mumbai','Delhi','Bangalore','Pune','Chennai'].map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={()=>setFilter({event:'',location:''})} style={{ background:'#F1F5F9', color:'#64748B', border:'none', padding:'6px 14px', borderRadius:8, cursor:'pointer', fontSize:12 }}>Reset</button>
          </div>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
            <thead>
              <tr style={{ background:'#F8FAFC' }}>
                {['ID','Name','Age','Gender','City','Income','Life Event','Channel','Best Time'].map(h=>(
                  <th key={h} style={{ padding:'8px 10px', textAlign:'left', color:'#64748B', fontWeight:700, borderBottom:'2px solid #E2E8F0', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0,15).map((c,i)=>(
                <tr key={c.id} style={{ background: i%2===0?'white':'#FAFBFF' }}>
                  <td style={{ padding:'7px 10px', color:'#94A3B8', fontWeight:600 }}>#{c.id}</td>
                  <td style={{ padding:'7px 10px', fontWeight:700 }}>{c.person_icon} {c.name}</td>
                  <td style={{ padding:'7px 10px', color:'#475569' }}>{c.age}</td>
                  <td style={{ padding:'7px 10px', color:'#475569' }}>{c.gender==='female'?'👩 F':'👨 M'}</td>
                  <td style={{ padding:'7px 10px', color:'#475569' }}>{c.location}</td>
                  <td style={{ padding:'7px 10px', color:'#475569' }}>₹{(c.income||0).toLocaleString()}</td>
                  <td style={{ padding:'7px 10px' }}><span style={{ background:'#EFF6FF', color:'#1D4ED8', padding:'2px 7px', borderRadius:20, fontWeight:600, fontSize:11 }}>{c.event_icon} {(c.life_event||'').replace(/_/g,' ')}</span></td>
                  <td style={{ padding:'7px 10px' }}><span style={{ background:'#F0FDF4', color:'#166534', padding:'2px 7px', borderRadius:20, fontWeight:600, fontSize:11 }}>{c.channel}</span></td>
                  <td style={{ padding:'7px 10px', color:'#475569', whiteSpace:'nowrap' }}>{c.best_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length>15&&<div style={{ textAlign:'center', padding:'10px', color:'#94A3B8', fontSize:12 }}>Showing 15 of {filtered.length} records</div>}
        </div>
      </div>
    </div>
  );
}
