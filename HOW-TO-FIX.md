# 🔧 HOW TO FIX: "ERR_CONNECTION_REFUSED" Error

## The Problem
You're seeing "ERR_CONNECTION_REFUSED" because **the backend server is not running**.

## ✅ Solution (Choose One)

### Method 1: Double-Click Script (EASIEST) ⭐

1. **Find the file `START-BACKEND.bat`** in your project folder
2. **Double-click it**
3. A black terminal window will open
4. **Wait until you see:** `Now listening on: http://localhost:5000`
5. **Keep that window open!**
6. Go to your browser and try `http://localhost:5000/swagger` again

### Method 2: Run in Terminal

1. **Open PowerShell or Command Prompt**
2. **Copy and paste these commands one by one:**

```powershell
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
dotnet run
```

3. **Wait until you see:** `Now listening on: http://localhost:5000`
4. **Keep that terminal window open!**
5. Go to your browser and try `http://localhost:5000/swagger` again

---

## ✅ Verify It's Working

### Step 1: Check the Terminal
Look at the terminal window where you ran `dotnet run`. You should see:
```
Now listening on: http://localhost:5000
```

### Step 2: Test in Browser
Open your browser and go to:
```
http://localhost:5000/swagger
```

**If you see the Swagger API page** → ✅ **SUCCESS!** Backend is running!

**If you still see "ERR_CONNECTION_REFUSED"** → The backend is not running yet. Wait a bit longer or check for errors in the terminal.

---

## ⚠️ Important Notes

1. **The backend MUST be running** for the frontend to work
2. **Keep the terminal window open** - if you close it, the backend stops
3. **Wait for "Now listening on: http://localhost:5000"** before trying to access it
4. **First time startup** may take 10-15 seconds (database creation)

---

## ❌ Still Not Working?

### Check 1: Is .NET installed?
Run this in terminal:
```powershell
dotnet --version
```
Should show: `8.0.x` or `9.0.x`

If you get an error, install .NET SDK from: https://dotnet.microsoft.com/download

### Check 2: Are there build errors?
Look at the terminal output. If you see red error messages, share them.

### Check 3: Is port 5000 already in use?
If you see "Address already in use":
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill it (replace <PID> with the number)
taskkill /PID <PID> /F
```

### Check 4: Check the terminal for errors
The terminal window will show any errors. Common issues:
- Database errors → Delete `Tracker-API\ExpenseTracker.db` and restart
- Port conflicts → Change port in `Properties/launchSettings.json`
- Missing dependencies → Run `dotnet restore` first

---

## 🎯 Quick Checklist

- [ ] Terminal window is open
- [ ] You see "Now listening on: http://localhost:5000" in terminal
- [ ] Terminal window is NOT closed
- [ ] You waited at least 10 seconds after starting
- [ ] You're using `http://localhost:5000/swagger` (not https)

---

## 💡 Pro Tip

**Use `START-BACKEND.bat`** - It's the easiest way! Just double-click and wait.

---

**Once you see "Now listening on: http://localhost:5000" in the terminal, the backend is running and you can access it in your browser!** 🚀

