# 🔧 FIX: "Unable to connect to server" Error

## The Problem
You're seeing this error because **the backend API is not running**.

## ✅ Solution (Choose One Method)

### Method 1: Double-Click Script (Easiest) ⭐
1. **Double-click `START-BACKEND.bat`** in the project root folder
2. A terminal window will open
3. Wait until you see: `Now listening on: http://localhost:5000`
4. **Keep that window open!**
5. Go back to your browser and **refresh the page (F5)**

### Method 2: Manual Start
1. **Open a NEW terminal/command prompt**
2. Navigate to the backend folder:
   ```bash
   cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
   ```
3. Run the backend:
   ```bash
   dotnet run
   ```
4. Wait until you see: `Now listening on: http://localhost:5000`
5. **Keep that terminal open!**
6. Go back to your browser and **refresh the page (F5)**

### Method 3: Start Both at Once
1. **Double-click `START-BOTH.bat`**
2. This will start both backend and frontend in separate windows
3. Wait for both to start
4. Open `http://localhost:5173` in your browser

---

## ✅ Verify It's Working

### Test 1: Check Backend
Open this URL in your browser:
```
http://localhost:5000/swagger
```

**If you see the Swagger API page** → Backend is running! ✅

**If you see "This site can't be reached"** → Backend is NOT running ❌
- Go back and start the backend (Method 1 or 2 above)

### Test 2: Check Frontend
1. Make sure backend is running (Test 1 passed)
2. Go to `http://localhost:5173`
3. Refresh the page (F5)
4. The error should be gone! ✅

---

## ❌ Still Not Working?

### Issue 1: Port 5000 Already in Use
**Error:** "Address already in use" or "Failed to bind to address"

**Solution:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with the number from above)
taskkill /PID <PID> /F

# Then try starting the backend again
```

### Issue 2: .NET Not Installed
**Error:** "dotnet is not recognized"

**Solution:**
1. Install .NET 8.0 SDK from: https://dotnet.microsoft.com/download
2. Restart your terminal
3. Verify: `dotnet --version` (should show 8.x.x)

### Issue 3: Build Errors
**Error:** Build fails when running `dotnet run`

**Solution:**
```bash
cd Tracker-API
dotnet restore
dotnet build
# Check for error messages and fix them
```

### Issue 4: Database Errors
**Error:** Database-related errors

**Solution:**
1. Delete the file: `Tracker-API\ExpenseTracker.db`
2. Restart the backend
3. Database will be recreated automatically

---

## 📋 Checklist

Before asking for help, make sure:

- [ ] Backend terminal is open and shows "Now listening on: http://localhost:5000"
- [ ] You can access `http://localhost:5000/swagger` in your browser
- [ ] Frontend is running on `http://localhost:5173`
- [ ] You refreshed the browser page after starting the backend
- [ ] Both terminals (backend and frontend) are kept open

---

## 🎯 Quick Reference

| Component | URL | Status Check |
|-----------|-----|--------------|
| Backend API | http://localhost:5000 | Visit `/swagger` |
| Frontend | http://localhost:5173 | Should load without errors |
| API Endpoint | http://localhost:5000/api | Test with `/api/expenses` |

---

## 💡 Pro Tips

1. **Always start backend first**, then frontend
2. **Keep both terminals open** while using the app
3. **If you close the backend**, the frontend will show the error again
4. **Use `START-BOTH.bat`** to start everything at once

---

## 🆘 Still Need Help?

1. Check the backend terminal for error messages
2. Check the browser console (F12) for network errors
3. Verify both servers are running:
   - Backend: `http://localhost:5000/swagger`
   - Frontend: `http://localhost:5173`

---

**Remember:** The backend MUST be running for the frontend to work! 🚀

