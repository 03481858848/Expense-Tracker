# 🚀 QUICK START - Fix "Unable to connect to server" Error

## The Problem
The frontend cannot connect to the backend because **the backend is not running**.

## The Solution (3 Simple Steps)

### Step 1: Start the Backend
**Open a NEW terminal/command prompt window** and run:

```powershell
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
dotnet run
```

**OR** simply double-click: `START-BACKEND.bat`

**Wait until you see:**
```
Now listening on: http://localhost:5000
```

**⚠️ IMPORTANT:** Keep this terminal window OPEN! Do not close it.

---

### Step 2: Verify Backend is Running
Open your browser and go to:
```
http://localhost:5000/swagger
```

You should see the Swagger API documentation page. If you see it, the backend is working! ✅

---

### Step 3: Refresh Your Frontend
Go back to your frontend at `http://localhost:5173` and **refresh the page** (F5 or Ctrl+R).

The error should be gone! 🎉

---

## Still Not Working?

### Check 1: Is the backend actually running?
- Look at the backend terminal - do you see "Now listening on: http://localhost:5000"?
- If not, check for error messages in that terminal

### Check 2: Is port 5000 available?
If you see "Address already in use" error:
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with the number from above)
taskkill /PID <PID> /F
```

### Check 3: Check the API URL
The frontend is configured to connect to: `http://localhost:5000/api`
Make sure your backend is running on port 5000.

---

## Need Help?
1. Make sure .NET 8.0 SDK is installed: `dotnet --version`
2. Make sure you're in the correct directory: `Tracker-API`
3. Check for build errors: `dotnet build`

---

## Remember:
- **Backend must be running** for frontend to work
- **Keep the backend terminal open** while using the app
- Backend runs on: `http://localhost:5000`
- Frontend runs on: `http://localhost:5173`

