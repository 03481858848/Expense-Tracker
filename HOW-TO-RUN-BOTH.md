# 🚀 How to Run Frontend and Backend - Complete Guide

## ⚡ Quick Start (Easiest Method)

### Method 1: Use START-BOTH.bat (Recommended) ⭐

1. **Find** `START-BOTH.bat` in your project folder
2. **Double-click** it
3. **Two terminal windows** will open automatically:
   - One for Backend (port 5000)
   - One for Frontend (port 5173)
4. **Wait** for both to start
5. **Done!** Open `http://localhost:5173` in your browser

---

## 📋 Step-by-Step Method (Manual)

### Step 1: Start Backend First

**Option A: Using Batch File**
1. **Double-click** `START-BACKEND.bat`
2. Wait until you see: `Now listening on: http://localhost:5000`
3. **Keep this window open!**

**Option B: Using Terminal**
```powershell
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
dotnet run
```

**Verify Backend:**
- Open `http://localhost:5000/swagger` in browser
- Should see Swagger API documentation

---

### Step 2: Start Frontend (In a NEW Terminal)

**Option A: Using Batch File**
1. **Open a NEW terminal window** (keep backend running)
2. **Double-click** `START-FRONTEND.bat`
3. Wait until you see: `Local: http://localhost:5173`
4. **Keep this window open!**

**Option B: Using Terminal**
```powershell
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-Client
npm install  # First time only
npm run dev
```

**Verify Frontend:**
- Open `http://localhost:5173` in browser
- Should see the Expense Tracker login page

---

## ✅ Complete Setup Checklist

### Before Starting:
- [ ] .NET 9.0 SDK is installed (`dotnet --version` should show 9.x)
- [ ] Node.js is installed (`node --version` should show v16+)
- [ ] npm is installed (`npm --version`)

### Starting Backend:
- [ ] Backend terminal is open
- [ ] You see: `Now listening on: http://localhost:5000`
- [ ] Can access `http://localhost:5000/swagger` in browser
- [ ] Backend terminal window is **NOT closed**

### Starting Frontend:
- [ ] Frontend terminal is open (separate from backend)
- [ ] You see: `Local: http://localhost:5173`
- [ ] Can access `http://localhost:5173` in browser
- [ ] Frontend terminal window is **NOT closed**

---

## 🎯 What You'll See

### Backend Terminal:
```
========================================
  Expense Tracker Backend API
========================================

[1/3] Checking .NET installation...
OK - .NET is installed

[2/3] Building project...
OK - Build successful

[3/3] Starting server...

Now listening on: http://localhost:5000
Swagger UI: http://localhost:5000/swagger
```

### Frontend Terminal:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🔗 URLs to Access

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost:5173 | Main application |
| **Backend API** | http://localhost:5000 | API server |
| **Swagger UI** | http://localhost:5000/swagger | API documentation |

---

## ⚠️ Important Notes

1. **Start Backend FIRST** - Frontend needs backend to be running
2. **Keep Both Windows Open** - Closing them stops the servers
3. **Two Separate Terminals** - One for backend, one for frontend
4. **Wait for Startup** - Backend takes 10-15 seconds, Frontend takes 5-10 seconds

---

## 🛑 How to Stop

### Stop Backend:
- Press `Ctrl + C` in backend terminal
- Or close the backend terminal window

### Stop Frontend:
- Press `Ctrl + C` in frontend terminal
- Or close the frontend terminal window

### Stop Both:
- Close both terminal windows
- Or press `Ctrl + C` in both terminals

---

## ❌ Troubleshooting

### Problem: Backend won't start
**Check:**
- Is .NET 9.0 installed? (`dotnet --version`)
- Is port 5000 available?
- Are there build errors in terminal?

**Solution:**
```powershell
cd Tracker-API
dotnet restore
dotnet build
dotnet run
```

### Problem: Frontend won't start
**Check:**
- Is Node.js installed? (`node --version`)
- Are dependencies installed? (`npm install`)
- Is port 5173 available?

**Solution:**
```powershell
cd Tracker-Client
npm install
npm run dev
```

### Problem: "Unable to connect to server" in frontend
**Check:**
- Is backend running? (Check `http://localhost:5000/swagger`)
- Did you start backend before frontend?
- Is backend terminal still open?

**Solution:**
1. Start backend first
2. Wait for "Now listening on: http://localhost:5000"
3. Then start frontend
4. Refresh browser

### Problem: Port already in use
**Solution:**
```powershell
# Find what's using the port
netstat -ano | findstr :5000  # For backend
netstat -ano | findstr :5173  # For frontend

# Kill the process (replace <PID> with number)
taskkill /PID <PID> /F
```

---

## 📝 Quick Reference Commands

### Backend:
```powershell
cd Tracker-API
dotnet run
```

### Frontend:
```powershell
cd Tracker-Client
npm run dev
```

### Both (in separate terminals):
```powershell
# Terminal 1 - Backend
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
dotnet run

# Terminal 2 - Frontend (open new terminal)
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-Client
npm run dev
```

---

## 💡 Pro Tips

1. **Use START-BOTH.bat** - Starts everything automatically
2. **Check Swagger First** - Verify backend before starting frontend
3. **Keep Terminals Visible** - So you can see errors
4. **First Run is Slower** - Database creation takes time
5. **Use Browser DevTools** - F12 to see network errors

---

## 🎉 Success Indicators

### Backend is Running:
- ✅ Terminal shows: "Now listening on: http://localhost:5000"
- ✅ Browser can access: `http://localhost:5000/swagger`
- ✅ Swagger page loads successfully

### Frontend is Running:
- ✅ Terminal shows: "Local: http://localhost:5173"
- ✅ Browser can access: `http://localhost:5173`
- ✅ Login page loads without errors
- ✅ No "Unable to connect" error messages

---

## 📋 Complete Workflow

1. **Start Backend** → Wait for "Now listening on: http://localhost:5000"
2. **Verify Backend** → Open `http://localhost:5000/swagger`
3. **Start Frontend** → Wait for "Local: http://localhost:5173"
4. **Open Application** → Go to `http://localhost:5173`
5. **Login** → Use `admin@test.com` / `123456`
6. **Use Application** → Keep both terminals open!

---

**That's it! Once both are running, you can use the full Expense Tracker application!** 🚀

