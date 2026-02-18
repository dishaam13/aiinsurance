import { useState, useRef, useEffect } from 'react';

const CUSTOMERS = [
  {id:1,name:'Priya Sharma',event:'just_married',label:'Just Married 💍',icon:'👰',color:'#EC4899'},
  {id:2,name:'Rahul Kumar',event:'bought_car',label:'Bought Car 🚗',icon:'🧑',color:'#3B82F6'},
  {id:3,name:'Anjali Patel',event:'had_baby',label:'Had Baby 👶',icon:'👩',color:'#10B981'},
  {id:4,name:'Vikram Singh',event:'bought_house',label:'Bought House 🏠',icon:'👨',color:'#8B5CF6'},
  {id:5,name:'Sneha Rao',event:'new_job',label:'New Job 💼',icon:'👩‍💼',color:'#F59E0B'},
];

const SCRIPTS = {
  just_married:[
    {role:'system',text:'📋 Task received: Process customer Priya Sharma for a personalized marketing campaign'},
    {role:'agent',text:"Let me begin by deeply analyzing Priya's profile. I can see she just got married 7 days ago — this is one of the most significant life moments. Marriage is the #1 trigger for family insurance needs. I need to act on this carefully and ethically."},
    {role:'tool',text:'🔍 analyze_customer_profile → Name: Priya Sharma, Age: 28, Location: Mumbai, Event: just_married (7 days ago), Channel: WhatsApp, Best Time: Saturday 10 AM'},
    {role:'agent',text:"Perfect. Based on this analysis, Family Health Insurance is the ideal recommendation. She's 28 and newly married — maternity coverage and family-wide protection will be highly relevant. Confidence is high at 89%. Let me confirm this recommendation."},
    {role:'tool',text:'🎯 recommend_insurance_product → Family Health Insurance, Confidence: 89%, Discount: 20% Newlywed Offer, Premium: ₹8,000/year'},
    {role:'agent',text:"Now I'll craft a personalized WhatsApp message. It needs to feel warm and human — not like a generic ad. I'll specifically mention her wedding, include the discount, and keep it conversational with emojis since she prefers WhatsApp."},
    {role:'tool',text:"✍️ generate_personalized_message → \"Congratulations on your wedding, Priya! 🎉💍 Our Family Health Insurance keeps both of you protected with cashless hospitalization & maternity coverage. 20% off today!\""},
    {role:'agent',text:"Saturday 10 AM is the optimal time — she'll be relaxed at home, not rushing to work. WhatsApp is her preferred channel with 52% open rate. This timing maximizes the chance she'll actually read and respond."},
    {role:'tool',text:'📱 select_optimal_channel_and_timing → WhatsApp, Saturday 10:00 AM, Expected Open Rate: 52%'},
    {role:'agent',text:"Before I finalize ANYTHING, I must run a mandatory fairness check. This is non-negotiable — I need to verify Priya is receiving the same quality of offer as everyone else regardless of her gender, location or age group. Ethical AI is not optional."},
    {role:'tool',text:'⚖️ run_fairness_check → Score: 94/100, Gender: FAIR ✅, Region: FAIR ✅, Age: FAIR ✅, Pricing: FAIR ✅ → APPROVED'},
    {role:'agent',text:"Excellent! All fairness checks passed with a score of 94/100. This campaign is ethical, personalized, and ready. Scheduling for Saturday 10 AM via WhatsApp. Creating campaign record now."},
    {role:'tool',text:'🚀 schedule_and_send_campaign → Campaign CAMP-001 created, Status: SCHEDULED, Delivery: Saturday 10:00 AM via WhatsApp ✅'},
    {role:'result',text:'🎉 CAMPAIGN COMPLETE! Priya will receive her personalized Family Health Insurance offer on WhatsApp this Saturday. Confidence: 89% | Fairness: 94/100 | Est. Open Rate: 45% | Discount: 20% Newlywed Offer'},
  ],
  bought_car:[
    {role:'system',text:'📋 Task received: Process customer Rahul Kumar for a personalized marketing campaign'},
    {role:'agent',text:"Rahul just bought a car — this is a high-urgency situation! New car owners need insurance within 24-48 hours. I need to act fast and recommend the right product before he goes elsewhere."},
    {role:'tool',text:'🔍 analyze_customer_profile → Name: Rahul Kumar, Age: 26, Location: Delhi, Event: bought_car (3 days ago), Channel: Email, Best Time: Sunday 8 PM'},
    {role:'agent',text:"Comprehensive Car Insurance is the obvious choice. Delhi roads have higher accident risk — full coverage including third-party liability and own damage is essential. 15% new vehicle discount will incentivize quick action."},
    {role:'tool',text:'🎯 recommend_insurance_product → Comprehensive Car Insurance, Confidence: 92%, Discount: 15% New Vehicle Offer, Premium: ₹12,000/year'},
    {role:'agent',text:"Writing an email for Rahul. Unlike WhatsApp, email allows more detail — I'll highlight key benefits, the discount prominently, and include a clear call-to-action button. Make it exciting about his new car purchase!"},
    {role:'tool',text:"✍️ generate_personalized_message → \"Congrats on your new car, Rahul! 🚗✨ Our Comprehensive Car Insurance covers accidents, theft & roadside assistance. 15% new vehicle discount!\""},
    {role:'tool',text:'📱 select_optimal_channel_and_timing → Email, Sunday 8:00 PM, Expected Open Rate: 38%'},
    {role:'agent',text:"Running mandatory fairness check for Rahul. Must verify no gender or regional discrimination in the offer quality..."},
    {role:'tool',text:'⚖️ run_fairness_check → Score: 96/100, All checks PASSED ✅ → APPROVED'},
    {role:'tool',text:'🚀 schedule_and_send_campaign → Campaign CAMP-002 created, Delivery: Sunday 8:00 PM via Email ✅'},
    {role:'result',text:'🎉 CAMPAIGN COMPLETE! Rahul will receive his Car Insurance offer via Email on Sunday evening. Confidence: 92% | Fairness: 96/100 | Est. Open Rate: 38%'},
  ],
  had_baby:[
    {role:'system',text:'📋 Task received: Process customer Anjali Patel for a personalized marketing campaign'},
    {role:'agent',text:"Anjali just had a baby — this requires extra care and sensitivity. New parents are emotionally vulnerable and exhausted. My message must be warm and supportive, never pushy. The baby needs coverage from day one."},
    {role:'tool',text:'🔍 analyze_customer_profile → Name: Anjali Patel, Age: 32, Location: Bangalore, Event: had_baby (22 days ago), Channel: WhatsApp'},
    {role:'agent',text:"Child Health Insurance is the clear and urgent recommendation. Coverage from day one is critical — vaccinations, pediatric visits, hospitalization. Bangalore has excellent pediatric hospitals in our network which I should mention."},
    {role:'tool',text:'🎯 recommend_insurance_product → Child Health Insurance, Confidence: 91%, Discount: First Month Free, Premium: ₹6,500/year'},
    {role:'agent',text:"Writing a warm, empathetic WhatsApp message. Lead with heartfelt congratulations first, then gently introduce the product. Keep it short — new mothers are exhausted and won't read long messages."},
    {role:'tool',text:"✍️ generate_personalized_message → \"Welcome to parenthood, Anjali! 👶💕 Our Child Health Insurance covers your little one from day one — vaccinations, pediatric care & more. First month FREE!\""},
    {role:'tool',text:'📱 select_optimal_channel_and_timing → WhatsApp, Friday 9:00 AM, Expected Open Rate: 49%'},
    {role:'agent',text:"Fairness check — particularly important here to confirm new mothers receive equally good recommendations as fathers. Checking gender parity now..."},
    {role:'tool',text:'⚖️ run_fairness_check → Score: 95/100, Gender parity confirmed ✅ → APPROVED'},
    {role:'tool',text:'🚀 schedule_and_send_campaign → Campaign CAMP-003 created, Delivery: Friday 9:00 AM via WhatsApp ✅'},
    {role:'result',text:'🎉 CAMPAIGN COMPLETE! Anjali will receive Child Health Insurance offer this Friday. Confidence: 91% | Fairness: 95/100 | Est. Open Rate: 49%'},
  ],
  bought_house:[
    {role:'system',text:'📋 Task received: Process customer Vikram Singh for a personalized marketing campaign'},
    {role:'agent',text:"Vikram just bought a house — his biggest investment ever! Home insurance is critical. He's in the excitement phase which makes now the perfect time to reach out with a protective offer."},
    {role:'tool',text:'🔍 analyze_customer_profile → Name: Vikram Singh, Age: 35, Location: Pune, Event: bought_house (16 days ago), Channel: Email'},
    {role:'agent',text:"Home Protection Insurance is the perfect match. Pune can see flooding — I'll specifically highlight natural disaster coverage. At 35, Vikram is financially savvy and will appreciate comprehensive protection for his investment."},
    {role:'tool',text:'🎯 recommend_insurance_product → Home Protection Insurance, Confidence: 93%, Discount: 10% New Homeowner, Premium: ₹15,000/year'},
    {role:'tool',text:"✍️ generate_personalized_message → \"Congratulations on your new home, Vikram! 🏠 Protect your biggest investment with Home Protection Insurance. Covers floods, theft & more. 10% off!\""},
    {role:'tool',text:'📱 select_optimal_channel_and_timing → Email, Saturday 6:00 PM, Expected Open Rate: 41%'},
    {role:'tool',text:'⚖️ run_fairness_check → Score: 97/100, All checks PASSED ✅ → APPROVED'},
    {role:'tool',text:'🚀 schedule_and_send_campaign → Campaign CAMP-004 created, Delivery: Saturday 6:00 PM via Email ✅'},
    {role:'result',text:'🎉 CAMPAIGN COMPLETE! Vikram will receive Home Insurance offer this Saturday evening. Confidence: 93% | Fairness: 97/100'},
  ],
  new_job:[
    {role:'system',text:'📋 Task received: Process customer Sneha Rao for a personalized marketing campaign'},
    {role:'agent',text:"Sneha just started her first job at 24 — this is genuinely the BEST time to buy life insurance. Premiums are at their absolute lowest at this age. I want to help her understand this is a smart financial decision, not just insurance."},
    {role:'tool',text:'🔍 analyze_customer_profile → Name: Sneha Rao, Age: 24, Location: Chennai, Event: new_job (5 days ago), Channel: App Notification'},
    {role:'agent',text:"Term Life Insurance is ideal — premiums at 24 are 60% cheaper than at 35. Tax benefits under 80C make it even more attractive for a first-jobber. I'll frame this as a smart financial move that her future self will thank her for."},
    {role:'tool',text:'🎯 recommend_insurance_product → Term Life Insurance, Confidence: 87%, Discount: 25% First Job Discount, Premium: ₹5,000/year'},
    {role:'tool',text:"✍️ generate_personalized_message → \"Congrats on the new job, Sneha! 💼🌟 Lock in the lowest life insurance rates at 24. Save 60% vs buying at 35. 25% first-job discount today!\""},
    {role:'tool',text:'📱 select_optimal_channel_and_timing → App Notification, Monday 7:00 PM, Expected Open Rate: 48%'},
    {role:'tool',text:'⚖️ run_fairness_check → Score: 93/100, APPROVED ✅'},
    {role:'tool',text:'🚀 schedule_and_send_campaign → Campaign CAMP-005 created, Delivery: Monday 7:00 PM via App ✅'},
    {role:'result',text:'🎉 CAMPAIGN COMPLETE! Sneha will receive Term Life Insurance notification Monday evening. Confidence: 87% | Fairness: 93/100 | Est. Open Rate: 48%'},
  ],
};

export default function LiveAgentChat() {
  const [sel, setSel] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[msgs]);

  const sleep = ms => new Promise(r=>setTimeout(r,ms));

  const run = async (c) => {
    setSel(c.id); setMsgs([]); setRunning(true); setDone(false);
    const script = SCRIPTS[c.event] || SCRIPTS.just_married;
    for(const m of script){
      await sleep(m.role==='agent'?1500:m.role==='tool'?900:600);
      setMsgs(p=>[...p,{...m,id:Date.now()+Math.random()}]);
    }
    setRunning(false); setDone(true);
  };

  const BG = {system:'rgba(255,255,255,0.05)',agent:'rgba(30,58,138,0.4)',tool:'rgba(6,95,70,0.3)',result:'rgba(124,58,237,0.25)'};
  const BORDER = {system:'rgba(255,255,255,0.1)',agent:'rgba(59,130,246,0.4)',tool:'rgba(16,185,129,0.4)',result:'rgba(167,139,250,0.5)'};
  const COLOR = {system:'rgba(255,255,255,0.4)',agent:'#93C5FD',tool:'#6EE7B7',result:'#C4B5FD'};
  const ICON = {system:'⚙️',agent:'🤖',tool:'🔧',result:'✅'};
  const LABEL = {system:'SYSTEM',agent:'AGENT REASONING',tool:'TOOL CALL',result:'FINAL RESULT'};

  return (
    <div style={{padding:'24px',maxWidth:'1300px',margin:'0 auto'}}>
      <div style={{marginBottom:'18px'}}>
        <h2 style={{fontSize:'26px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>🧠 Live Agent Thinking</h2>
        <p style={{color:'#64748B',fontSize:'14px',margin:0}}>Watch the AI Agent's ACTUAL reasoning — every thought, every tool call, every decision in real-time</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'250px 1fr',gap:'18px'}}>
        <div>
          <div style={{background:'white',borderRadius:'14px',padding:'14px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)',marginBottom:'12px'}}>
            <div style={{fontSize:'10px',color:'#94A3B8',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'10px'}}>Select Customer</div>
            {CUSTOMERS.map(c=>(
              <div key={c.id} onClick={()=>!running&&run(c)} style={{padding:'11px',marginBottom:'7px',borderRadius:'9px',border:`2px solid ${sel===c.id?c.color:'#F1F5F9'}`,background:sel===c.id?`${c.color}12`:'#FAFAFA',cursor:running?'not-allowed':'pointer',opacity:running&&sel!==c.id?0.4:1,display:'flex',alignItems:'center',gap:'10px',transition:'all 0.15s'}}>
                <span style={{fontSize:'22px'}}>{c.icon}</span>
                <div><div style={{fontWeight:'700',fontSize:'13px',color:'#1E293B'}}>{c.name}</div><div style={{fontSize:'11px',color:'#94A3B8'}}>{c.label}</div></div>
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:'12px',padding:'14px',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
            <div style={{fontSize:'10px',color:'#94A3B8',fontWeight:'700',textTransform:'uppercase',marginBottom:'10px'}}>Legend</div>
            {Object.entries(LABEL).map(([k,v])=>(
              <div key={k} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'7px'}}>
                <div style={{width:'9px',height:'9px',borderRadius:'50%',background:BORDER[k],border:`1px solid ${BORDER[k]}`,flexShrink:0}}/>
                <span style={{fontSize:'11px',color:'#64748B'}}>{ICON[k]} {v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:'#0F172A',borderRadius:'16px',padding:'18px',minHeight:'560px',display:'flex',flexDirection:'column',boxShadow:'0 8px 32px rgba(0,0,0,0.4)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'14px',paddingBottom:'12px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {['#EF4444','#F59E0B','#22C55E'].map((c,i)=><div key={i} style={{width:'11px',height:'11px',borderRadius:'50%',background:c}}/>)}
            <span style={{color:'rgba(255,255,255,0.35)',fontSize:'11px',marginLeft:'8px',fontFamily:'monospace'}}>
              trustai-agent — {running?'● RUNNING...':(done?'✓ COMPLETED':'○ READY')}
            </span>
            {running&&<div style={{marginLeft:'auto',width:'7px',height:'7px',borderRadius:'50%',background:'#22C55E'}}/>}
          </div>

          {!sel&&(
            <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.15)'}}>
              <div style={{fontSize:'52px',marginBottom:'10px'}}>🤖</div>
              <div style={{fontFamily:'monospace',fontSize:'13px'}}>Select a customer to start...</div>
              <div style={{fontFamily:'monospace',fontSize:'11px',marginTop:'4px',opacity:0.5}}>_</div>
            </div>
          )}

          <div style={{flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:'9px'}}>
            {msgs.map((m,i)=>(
              <div key={m.id} style={{animation:'slideIn 0.3s ease',display:'flex',gap:'9px',alignItems:'flex-start'}}>
                <div style={{width:'26px',height:'26px',borderRadius:'5px',background:BG[m.role],border:`1px solid ${BORDER[m.role]}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',flexShrink:0,marginTop:'2px'}}>{ICON[m.role]}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'9px',color:'rgba(255,255,255,0.25)',fontFamily:'monospace',fontWeight:'700',letterSpacing:'0.1em',marginBottom:'3px'}}>{LABEL[m.role]}</div>
                  <div style={{background:BG[m.role],border:`1px solid ${BORDER[m.role]}`,borderRadius:'7px',padding:'9px 12px',color:COLOR[m.role],fontSize:'13px',lineHeight:'1.5',fontFamily:m.role==='tool'?'monospace':'inherit'}}>{m.text}</div>
                </div>
              </div>
            ))}
            {running&&msgs.length>0&&(
              <div style={{display:'flex',gap:'9px',alignItems:'center'}}>
                <div style={{width:'26px',height:'26px',borderRadius:'5px',background:'rgba(30,58,138,0.4)',border:'1px solid rgba(59,130,246,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px'}}>🤖</div>
                <div style={{background:'rgba(30,58,138,0.3)',border:'1px solid rgba(59,130,246,0.3)',borderRadius:'7px',padding:'9px 14px',display:'flex',gap:'4px',alignItems:'center'}}>
                  {[0,1,2].map(i=><div key={i} style={{width:'5px',height:'5px',borderRadius:'50%',background:'#93C5FD',animation:`bounce 1.2s ${i*0.2}s infinite`}}/>)}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
        </div>
      </div>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}} @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}
