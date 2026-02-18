// Central fallback data + safe fetch utility
// All screens use safeFetch() which NEVER crashes — falls back to mock data

export const API = 'http://localhost:8000';

// Safe fetch — returns fallback if backend is down
export async function safeFetch(url, fallback, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return fallback;
  }
}

// ─── MOCK CUSTOMERS (100 entries, abbreviated here for performance) ───
export const MOCK_CUSTOMERS = [
  { id:1,  name:"Priya Sharma",      age:28, gender:"female", location:"Mumbai",    income:45000, life_event:"just_married",  event_date:"2026-02-08", channel:"WhatsApp", best_time:"Saturday 10AM", policies_owned:0, event_icon:"💍", person_icon:"👩" },
  { id:2,  name:"Rahul Kumar",       age:26, gender:"male",   location:"Delhi",     income:38000, life_event:"bought_car",    event_date:"2026-02-10", channel:"Email",    best_time:"Sunday 8PM",    policies_owned:1, event_icon:"🚗", person_icon:"👨" },
  { id:3,  name:"Anjali Patel",      age:32, gender:"female", location:"Bangalore", income:62000, life_event:"had_baby",      event_date:"2026-01-25", channel:"WhatsApp", best_time:"Friday 9AM",    policies_owned:2, event_icon:"👶", person_icon:"👩" },
  { id:4,  name:"Vikram Singh",      age:35, gender:"male",   location:"Pune",      income:85000, life_event:"bought_house",  event_date:"2026-02-01", channel:"Email",    best_time:"Saturday 6PM",  policies_owned:1, event_icon:"🏠", person_icon:"👨" },
  { id:5,  name:"Sneha Rao",         age:24, gender:"female", location:"Chennai",   income:32000, life_event:"new_job",       event_date:"2026-02-12", channel:"App",      best_time:"Monday 7PM",    policies_owned:0, event_icon:"💼", person_icon:"👩" },
  { id:6,  name:"Arjun Mehta",       age:29, gender:"male",   location:"Mumbai",    income:52000, life_event:"just_married",  event_date:"2026-02-05", channel:"WhatsApp", best_time:"Sunday 11AM",   policies_owned:0, event_icon:"💍", person_icon:"👨" },
  { id:7,  name:"Deepa Nair",        age:31, gender:"female", location:"Bangalore", income:71000, life_event:"had_baby",      event_date:"2026-01-20", channel:"WhatsApp", best_time:"Thursday 10AM", policies_owned:1, event_icon:"👶", person_icon:"👩" },
  { id:8,  name:"Karan Shah",        age:27, gender:"male",   location:"Delhi",     income:41000, life_event:"bought_car",    event_date:"2026-02-14", channel:"SMS",      best_time:"Saturday 9AM",  policies_owned:0, event_icon:"🚗", person_icon:"👨" },
  { id:9,  name:"Meera Joshi",       age:33, gender:"female", location:"Pune",      income:68000, life_event:"bought_house",  event_date:"2026-01-28", channel:"Email",    best_time:"Sunday 5PM",    policies_owned:2, event_icon:"🏠", person_icon:"👩" },
  { id:10, name:"Ravi Kumar",        age:25, gender:"male",   location:"Chennai",   income:35000, life_event:"new_job",       event_date:"2026-02-09", channel:"App",      best_time:"Tuesday 7PM",   policies_owned:0, event_icon:"💼", person_icon:"👨" },
  { id:11, name:"Pooja Verma",       age:30, gender:"female", location:"Mumbai",    income:58000, life_event:"just_married",  event_date:"2026-02-03", channel:"WhatsApp", best_time:"Saturday 11AM", policies_owned:1, event_icon:"💍", person_icon:"👩" },
  { id:12, name:"Amit Desai",        age:34, gender:"male",   location:"Bangalore", income:79000, life_event:"bought_house",  event_date:"2026-01-22", channel:"Email",    best_time:"Friday 6PM",    policies_owned:2, event_icon:"🏠", person_icon:"👨" },
  { id:13, name:"Kavitha Reddy",     age:27, gender:"female", location:"Chennai",   income:39000, life_event:"bought_car",    event_date:"2026-02-11", channel:"WhatsApp", best_time:"Sunday 10AM",   policies_owned:0, event_icon:"🚗", person_icon:"👩" },
  { id:14, name:"Nikhil Gupta",      age:36, gender:"male",   location:"Delhi",     income:92000, life_event:"had_baby",      event_date:"2026-01-18", channel:"Email",    best_time:"Saturday 7PM",  policies_owned:3, event_icon:"👶", person_icon:"👨" },
  { id:15, name:"Sanya Kapoor",      age:23, gender:"female", location:"Mumbai",    income:28000, life_event:"new_job",       event_date:"2026-02-15", channel:"App",      best_time:"Wednesday 8PM", policies_owned:0, event_icon:"💼", person_icon:"👩" },
  { id:16, name:"Rohan Pillai",      age:29, gender:"male",   location:"Bangalore", income:47000, life_event:"just_married",  event_date:"2026-02-07", channel:"WhatsApp", best_time:"Sunday 10AM",   policies_owned:0, event_icon:"💍", person_icon:"👨" },
  { id:17, name:"Lakshmi Iyer",      age:38, gender:"female", location:"Chennai",   income:82000, life_event:"bought_house",  event_date:"2026-01-15", channel:"Email",    best_time:"Saturday 5PM",  policies_owned:3, event_icon:"🏠", person_icon:"👩" },
  { id:18, name:"Suresh Nair",       age:26, gender:"male",   location:"Pune",      income:36000, life_event:"bought_car",    event_date:"2026-02-13", channel:"SMS",      best_time:"Friday 8PM",    policies_owned:0, event_icon:"🚗", person_icon:"👨" },
  { id:19, name:"Nisha Tiwari",      age:31, gender:"female", location:"Delhi",     income:61000, life_event:"had_baby",      event_date:"2026-01-30", channel:"WhatsApp", best_time:"Thursday 9AM",  policies_owned:1, event_icon:"👶", person_icon:"👩" },
  { id:20, name:"Sanjay Bose",       age:40, gender:"male",   location:"Mumbai",    income:105000,life_event:"bought_house",  event_date:"2026-01-10", channel:"Email",    best_time:"Sunday 4PM",    policies_owned:4, event_icon:"🏠", person_icon:"👨" },
];

export const MOCK_STATS = {
  campaigns_sent: 247, open_rate: 43, conversion_rate: 8, fairness_score: 94,
  customer_satisfaction: 87, total_customers: 100, active_events: 5, cities_covered: 5
};

export const MOCK_DATASET_STATS = {
  total: 100, city_count: 5, age_min: 22, age_max: 45, age_avg: 31,
  gender_percent: { female: 52, male: 48 },
  genders: { female: 52, male: 48 },
  events: { just_married: 20, bought_car: 20, had_baby: 20, bought_house: 20, new_job: 20 },
  channels: { WhatsApp: 40, Email: 30, SMS: 15, App: 15 },
  cities: { Mumbai: 20, Delhi: 20, Bangalore: 20, Pune: 20, Chennai: 20 }
};

export const MOCK_FAIRNESS = {
  overall_score: 94, status: 'FAIR', alerts: [],
  by_gender: { male: { conversion: 8.2, campaigns: 48 }, female: { conversion: 8.3, campaigns: 52 } },
  by_region: {
    Mumbai: { conversion: 8.5, campaigns: 20 },
    Delhi: { conversion: 8.1, campaigns: 20 },
    Bangalore: { conversion: 7.8, campaigns: 20 },
    Pune: { conversion: 8.3, campaigns: 20 },
    Chennai: { conversion: 8.0, campaigns: 20 }
  },
  by_age_group: {
    '22-30': { conversion: 9.1, count: 45 },
    '31-40': { conversion: 8.1, count: 42 },
    '41-50': { conversion: 7.2, count: 13 }
  }
};

export const MOCK_FAIRNESS_BIASED = {
  overall_score: 54, status: 'BIAS_DETECTED',
  alerts: [
    { type: 'GENDER_BIAS', severity: 'CRITICAL', detail: 'Male customers receiving 3x better offers than female customers', male_rate: 12.4, female_rate: 3.8, action: 'Campaigns PAUSED — Human review required' },
    { type: 'REGIONAL_BIAS', severity: 'HIGH', detail: 'Metro customers getting 40% more premium products than tier-2', action: 'Recalibrating regional targeting algorithm' }
  ],
  by_gender: { male: { conversion: 12.4, campaigns: 48 }, female: { conversion: 3.8, campaigns: 52 } },
  by_region: {
    Mumbai: { conversion: 14.5, campaigns: 20 },
    Delhi: { conversion: 13.2, campaigns: 20 },
    Bangalore: { conversion: 5.1, campaigns: 20 },
    Pune: { conversion: 4.8, campaigns: 20 },
    Chennai: { conversion: 5.3, campaigns: 20 }
  }
};

export const PRODUCTS = {
  just_married: 'Family Health Insurance',
  bought_car: 'Comprehensive Car Insurance',
  had_baby: 'Child Health Insurance',
  bought_house: 'Home Protection Insurance',
  new_job: 'Term Life Insurance'
};

export const EVENT_LABELS = {
  just_married: '💍 Just Married',
  bought_car: '🚗 Bought Car',
  had_baby: '👶 Had Baby',
  bought_house: '🏠 Bought House',
  new_job: '💼 New Job'
};

export function getMockCampaign(customer) {
  const product = PRODUCTS[customer.life_event] || 'Health Insurance';
  const messages = {
    just_married: `Congratulations on your wedding, ${customer.name}! 🎉💍 Our ${product} gives both of you cashless care + 20% newlywed discount. Start your journey protected! 💙`,
    bought_car: `Congrats on your new car, ${customer.name}! 🚗✨ Protect it with our ${product}. Full coverage + roadside assistance + 15% new vehicle discount!`,
    had_baby: `Welcome to parenthood, ${customer.name}! 👶💕 Our ${product} covers your baby from day one — vaccinations, pediatric care & more!`,
    bought_house: `Congratulations on your dream home, ${customer.name}! 🏠🎉 Our ${product} protects it from natural disasters, fire & burglary. Free quote today!`,
    new_job: `Congrats on the new job, ${customer.name}! 💼🌟 Our ${product} offers great tax benefits + 25% first-job discount. Secure your future today!`
  };
  return {
    success: true,
    customer_name: customer.name,
    customer_age: customer.age,
    customer_location: customer.location,
    life_event: customer.life_event,
    product,
    message: messages[customer.life_event] || `Hi ${customer.name}! Check out our ${product}!`,
    channel: customer.channel,
    best_time: customer.best_time,
    confidence: 91,
    fairness_score: 94,
    campaign_id: `CAMP-${String(customer.id).padStart(4,'0')}-DEMO`,
    total_steps: 6,
    agent_steps: [
      { step:1, action:'🔧 Using tool: analyze_customer_profile',        result:`Analyzed ${customer.name} — detected: ${customer.life_event}, urgency: HIGH` },
      { step:2, action:'🔧 Using tool: recommend_insurance_product',      result:`Recommended: ${product} (confidence: 91%)` },
      { step:3, action:'🔧 Using tool: generate_personalized_message',    result:'Warm personalized message generated successfully' },
      { step:4, action:'🔧 Using tool: select_optimal_channel_and_timing',result:`Channel: ${customer.channel} | Best time: ${customer.best_time}` },
      { step:5, action:'🔧 Using tool: run_fairness_check',               result:'✅ Fairness score: 94/100 — APPROVED' },
      { step:6, action:'🔧 Using tool: schedule_and_send_campaign',       result:`Campaign scheduled! ID: CAMP-${String(customer.id).padStart(4,'0')}-DEMO 🎉` },
    ],
    agent_summary: `Successfully created an ethical, personalized campaign for ${customer.name}. Product: ${product}. Scheduled: ${customer.best_time} via ${customer.channel}.`
  };
}
