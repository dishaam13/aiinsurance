from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from agent import run_agent, get_customers, load_customers_from_csv, get_stats, get_fairness, explain_recommendation
import io

app = FastAPI(title="TrustAI Agent API", version="4.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/") 
def root(): 
    return {"message":"TrustAI Marketing Agent API","version":"4.0.0","status":"running"}

@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    """Upload CSV file and process customers with AI-based segmentation"""
    try:
        contents = await file.read()
        csv_text = contents.decode('utf-8')
        result = load_customers_from_csv(csv_text)
        return {
            "success": True, 
            "message": f"Processed {result['total']} customers successfully",
            "total": result['total'],
            "customers": result['customers'],
            "stats": result['stats']
        }
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/customers")
def get_all_customers(): 
    customers = get_customers()
    return {"customers": customers, "total": len(customers)}

@app.get("/stats")
def get_system_stats(): 
    return get_stats()

@app.post("/agent/run/{customer_id}")
def run_agent_for_customer(customer_id: int): 
    return run_agent(customer_id)

@app.get("/explain/{customer_id}")
def explain_customer(customer_id: int):
    return explain_recommendation(customer_id)

@app.get("/fairness")
def get_fairness_metrics(): 
    return get_fairness()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
