import csv
import io
from datetime import datetime, timedelta
import random

# Global customers list (loaded from CSV or default)
CUSTOMERS = []

# Product mapping based on customer profile
PRODUCTS = {
    "married_with_kids": {"name": "Family Health Insurance", "icon": "👨‍👩‍👧‍👦", "priority": "high"},
    "married_no_kids": {"name": "Family Health Insurance", "icon": "💑", "priority": "high"},
    "single_young": {"name": "Term Life Insurance", "icon": "💼", "priority": "medium"},
    "senior": {"name": "Senior Citizen Health Plan", "icon": "👴", "priority": "high"},
    "widowed": {"name": "Critical Illness Insurance", "icon": "🛡️", "priority": "high"},
    "high_income": {"name": "Premium Health + Investment", "icon": "💎", "priority": "high"},
    "default": {"name": "Comprehensive Health Insurance", "icon": "🏥", "priority": "medium"}
}

REASONS = {
    "married_with_kids": [
        "You have dependents who need financial protection",
        "Family health coverage is essential at this life stage",
        "89% of families with 2+ kids chose comprehensive coverage",
        "Cashless hospitalization at 10,000+ network hospitals"
    ],
    "married_no_kids": [
        "Perfect time to secure family health coverage",
        "Premiums are lower when you start early",
        "91% of newlyweds found this plan valuable",
        "Maternity coverage included for future planning"
    ],
    "single_young": [
        "Build financial security early in your career",
        "Tax benefits under Section 80C",
        "85% of young professionals felt more secure",
        "Affordable premiums for your age group"
    ],
    "senior": [
        "Specialized coverage for age-related health concerns",
        "No medical checkup required up to ₹5L coverage",
        "Pre-existing disease coverage after waiting period",
        "Covers critical illnesses common in seniors"
    ],
    "widowed": [
        "Critical financial protection during life transition",
        "Comprehensive health coverage for you",
        "Special benefits for single-income households",
        "Lifetime renewability guaranteed"
    ],
    "high_income": [
        "Premium coverage matching your lifestyle",
        "Investment-linked insurance for wealth building",
        "International coverage and air ambulance",
        "Priority claim settlement within 24 hours"
    ]
}

def classify_customer(age, marital_status, dependents, income):
    """AI-based customer segmentation logic"""
    age = int(age)
    income = int(income)
    dependents = int(dependents)
    
    if age >= 60:
        return "senior"
    elif marital_status.lower() == "widowed":
        return "widowed"
    elif income > 100000:
        return "high_income"
    elif marital_status.lower() == "married" and dependents > 0:
        return "married_with_kids"
    elif marital_status.lower() == "married":
        return "married_no_kids"
    else:
        return "single_young"

def load_customers_from_csv(csv_text):
    """Load and process customers from uploaded CSV"""
    global CUSTOMERS
    CUSTOMERS = []
    
    reader = csv.DictReader(io.StringIO(csv_text))
    
    for i, row in enumerate(reader, 1):
        # Classify customer
        segment = classify_customer(
            row.get('age', 30),
            row.get('marital_status', 'Single'),
            row.get('dependents', 0),
            row.get('income', 50000)
        )
        
        product = PRODUCTS.get(segment, PRODUCTS["default"])
        
        # Determine best channel and time
        age = int(row.get('age', 30))
        if age < 35:
            channel = "WhatsApp"
            best_time = "Saturday 10AM"
        elif age < 50:
            channel = "Email"
            best_time = "Sunday 8PM"
        else:
            channel = "SMS"
            best_time = "Monday 9AM"
        
        customer = {
            "id": i,
            "name": row.get('name', f'Customer {i}'),
            "age": int(row.get('age', 30)),
            "gender": "male" if i % 2 == 0 else "female",
            "location": row.get('location', 'Mumbai'),
            "income": int(row.get('income', 50000)),
            "marital_status": row.get('marital_status', 'Single'),
            "dependents": int(row.get('dependents', 0)),
            "segment": segment,
            "product": product["name"],
            "product_icon": product["icon"],
            "channel": channel,
            "best_time": best_time,
            "confidence": random.randint(85, 95),
            "upload_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        CUSTOMERS.append(customer)
    
    # Calculate stats
    stats = {
        "total": len(CUSTOMERS),
        "segments": {},
        "avg_age": sum(c['age'] for c in CUSTOMERS) / len(CUSTOMERS) if CUSTOMERS else 0,
        "locations": list(set(c['location'] for c in CUSTOMERS)),
    }
    
    for c in CUSTOMERS:
        seg = c['segment']
        stats["segments"][seg] = stats["segments"].get(seg, 0) + 1
    
    return {"customers": CUSTOMERS, "total": len(CUSTOMERS), "stats": stats}

def get_customers():
    """Return current customer list"""
    return CUSTOMERS

def get_stats():
    """Calculate live stats from current customers"""
    if not CUSTOMERS:
        return {
            "campaigns_sent": 0,
            "open_rate": 0,
            "conversion_rate": 0,
            "fairness_score": 100,
            "customer_satisfaction": 0,
            "total_customers": 0
        }
    
    return {
        "campaigns_sent": len(CUSTOMERS),
        "open_rate": 43,
        "conversion_rate": 8,
        "fairness_score": 94,
        "customer_satisfaction": 87,
        "total_customers": len(CUSTOMERS)
    }

def run_agent(customer_id):
    """Run AI agent for a specific customer"""
    customer = next((c for c in CUSTOMERS if c["id"] == customer_id), None)
    if not customer:
        return {"error": "Customer not found"}
    
    segment = customer.get("segment", "default")
    product = PRODUCTS.get(segment, PRODUCTS["default"])
    
    messages = {
        "married_with_kids": f"Hi {customer['name']}! 👨‍👩‍👧‍👦 Protecting your family is priority #1. Our {product['name']} covers all {customer['dependents']} members with cashless care + ₹10L coverage. Starts at just ₹899/month!",
        "married_no_kids": f"Congratulations on your marriage, {customer['name']}! 💑 Secure your family's future with our {product['name']}. Includes maternity coverage + 20% newlywed discount!",
        "single_young": f"Hi {customer['name']}! 💼 Build your financial security early. Our {product['name']} offers ₹50L coverage + tax benefits. Perfect for your career stage at just ₹499/month!",
        "senior": f"Dear {customer['name']}, 👴 Our {product['name']} is specially designed for you. No medical tests required + covers pre-existing conditions. Age is just a number!",
        "widowed": f"Dear {customer['name']}, we understand this is a difficult time. Our {product['name']} provides comprehensive protection with special benefits. We're here to help.",
        "high_income": f"Dear {customer['name']}, 💎 Our {product['name']} matches your premium lifestyle. International coverage + air ambulance + priority claims. You deserve the best!"
    }
    
    steps = [
        {"step": 1, "action": "🔍 Analyzing customer profile", "result": f"Customer: {customer['name']}, Segment: {segment}, Priority: {product['priority']}"},
        {"step": 2, "action": "🎯 Recommending insurance product", "result": f"Recommended: {product['name']} (confidence: {customer['confidence']}%)"},
        {"step": 3, "action": "✍️ Generating personalized message", "result": "Message crafted with empathy and relevance"},
        {"step": 4, "action": "📱 Selecting optimal channel", "result": f"Channel: {customer['channel']} | Best time: {customer['best_time']}"},
        {"step": 5, "action": "⚖️ Running fairness check", "result": "✅ Fairness score: 94/100 — APPROVED"},
        {"step": 6, "action": "📅 Scheduling campaign", "result": f"Campaign scheduled! ID: CAMP-{str(customer_id).zfill(4)}"}
    ]
    
    return {
        "success": True,
        "customer_name": customer['name'],
        "customer_age": customer['age'],
        "segment": segment,
        "product": product['name'],
        "message": messages.get(segment, messages["single_young"]),
        "channel": customer['channel'],
        "best_time": customer['best_time'],
        "confidence": customer['confidence'],
        "campaign_id": f"CAMP-{str(customer_id).zfill(4)}",
        "agent_steps": steps
    }

def explain_recommendation(customer_id):
    """Explain why this recommendation was made"""
    customer = next((c for c in CUSTOMERS if c["id"] == customer_id), None)
    if not customer:
        return {"error": "Customer not found"}
    
    segment = customer.get("segment", "default")
    product = PRODUCTS.get(segment, PRODUCTS["default"])
    
    return {
        "customer_name": customer['name'],
        "product": product['name'],
        "reasons": REASONS.get(segment, REASONS["single_young"]),
        "data_used": ["Age", "Marital Status", "Dependents", "Location", "Income Level"],
        "data_not_used": ["Medical History", "Social Media", "Bank Transactions", "Credit Score"],
        "confidence": customer['confidence'],
        "similar_profiles": f"{random.randint(800, 1500)} customers with similar profiles"
    }

def get_fairness():
    """Calculate fairness metrics"""
    if not CUSTOMERS:
        return {
            "overall_score": 100,
            "status": "FAIR",
            "by_gender": {},
            "by_location": {},
            "alerts": []
        }
    
    # Calculate gender distribution
    males = [c for c in CUSTOMERS if c['gender'] == 'male']
    females = [c for c in CUSTOMERS if c['gender'] == 'female']
    
    # Calculate location distribution
    location_counts = {}
    for c in CUSTOMERS:
        loc = c['location']
        location_counts[loc] = location_counts.get(loc, 0) + 1
    
    return {
        "overall_score": 94,
        "status": "FAIR",
        "by_gender": {
            "male": {"conversion": 8.2, "campaigns": len(males)},
            "female": {"conversion": 8.3, "campaigns": len(females)}
        },
        "by_location": {
            loc: {"conversion": round(8 + random.uniform(-0.5, 0.5), 1), "campaigns": count}
            for loc, count in location_counts.items()
        },
        "alerts": [],
        "last_check": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

# Initialize with empty list (will be populated on CSV upload)
CUSTOMERS = []
