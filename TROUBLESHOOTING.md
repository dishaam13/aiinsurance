# CSV Upload Troubleshooting Guide

## Problem: "Upload Failed" Error

### Most Common Causes (in order):

1. **Backend not running** (90% of cases)
2. **Wrong port** (Backend on 8001 instead of 8000)
3. **CORS issue**
4. **CSV format problem**

---

## SOLUTION 1: Check if Backend is Running

### Step 1: Open Terminal and check:
```bash
# Are you in the backend folder?
cd backend

# Is uvicorn installed?
pip list | grep uvicorn

# Start the backend:
python -m uvicorn main:app --reload
```

### What you SHOULD see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### What you might see (ERROR):
```
ModuleNotFoundError: No module named 'fastapi'
```
**FIX:** `pip install fastapi uvicorn python-multipart`

---

## SOLUTION 2: Test Backend Directly

### Open browser and go to:
```
http://localhost:8000
```

### Should see:
```json
{
  "message": "TrustAI Marketing Agent API",
  "version": "4.0.0",
  "status": "running"
}
```

### If you see "This site can't be reached":
→ Backend is NOT running. Go back to Solution 1.

---

## SOLUTION 3: Check Frontend Console

### Open browser DevTools (F12), go to Console tab

### If you see:
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```
→ Backend is not running on port 8000

### If you see:
```
CORS policy error
```
→ CORS issue (we'll fix this)

---

## SOLUTION 4: Fix CORS (if needed)

The backend already has CORS enabled, but let's verify:

```python
# backend/main.py should have:
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],  # ← This line
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)
```

---

## SOLUTION 5: Check CSV Format

Your CSV MUST have these exact columns:
```
name,age,income,marital_status,dependents,location
```

### Good Example:
```csv
name,age,income,marital_status,dependents,location
Raj Sharma,34,85000,Married,2,Mumbai
```

### Bad Examples:
```csv
Name,Age,Income,Status,Kids,City  ← Wrong column names
Raj,34,85k,Married,2,Mumbai       ← "85k" should be "85000"
Raj Sharma,34,,Married,2,Mumbai   ← Empty income field
```

---

## FULL STEP-BY-STEP FIX

### Terminal 1 (Backend):
```bash
cd C:\Users\Atharv Karekar\Downloads\trustai_final\backend
pip install fastapi uvicorn python-multipart
python -m uvicorn main:app --reload
```

**Wait for:** `Uvicorn running on http://127.0.0.1:8000`

### Terminal 2 (Frontend):
```bash
cd C:\Users\Atharv Karekar\Downloads\trustai_final\frontend
npm install
npm start
```

**Wait for:** `Compiled successfully!` → Opens browser on localhost:3000

### Browser:
1. Should see upload screen
2. Drag customer_template.csv
3. Click "Upload & Process"
4. Should work now! ✅

---

## Still Not Working?

### Check Windows Firewall:
- Might be blocking port 8000
- Try running cmd as Administrator

### Check if port 8000 is busy:
```bash
netstat -ano | findstr :8000
```

If something else is using port 8000, change it:
```bash
# backend/main.py, line 51:
uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)

# frontend/src/screens/UploadScreen.js, line 3:
const API = 'http://localhost:8001';
```

---

## Test Upload with curl (Advanced):

```bash
curl -X POST -F "file=@customer_template.csv" http://localhost:8000/upload-csv
```

Should return:
```json
{"success": true, "message": "Processed 4 customers successfully", ...}
```
