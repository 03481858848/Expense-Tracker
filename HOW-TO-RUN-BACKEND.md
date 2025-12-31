# 🚀 How to Run Backend - Step by Step Guide

## Method 1: Using Batch File (EASIEST) ⭐

### Steps:
1. **Find the file** `START-BACKEND.bat` in your project folder
2. **Double-click** on `START-BACKEND.bat`
3. A **black terminal window** will open
4. **Wait** until you see: `Now listening on: http://localhost:5000`
5. **Keep that window open!** (Don't close it)
6. Backend is now running! ✅

### What you'll see:
```
========================================
  Expense Tracker Backend API
========================================

[1/3] Checking .NET installation...
OK - .NET is installed

[2/3] Building project...
OK - Build successful

[3/3] Starting server...

=======================================
  SERVER STARTING...
=======================================

Backend URL: http://localhost:5000
Swagger UI:  http://localhost:5000/swagger

IMPORTANT: Keep this window open!
Press Ctrl+C to stop the server

=======================================

Now listening on: http://localhost:5000
```

---

## Method 2: Using PowerShell/Command Prompt

### Steps:
1. **Open PowerShell** or **Command Prompt**
2. **Navigate** to the project folder:
   ```powershell
   cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
   ```
3. **Run** the backend:
   ```powershell
   dotnet run
   ```
4. **Wait** until you see: `Now listening on: http://localhost:5000`
5. **Keep that terminal window open!**

### Full Commands:
```powershell
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
dotnet run
```

---

## Method 3: Using Visual Studio Code Terminal

### Steps:
1. **Open** your project in VS Code
2. **Open Terminal** (Ctrl + ` or Terminal → New Terminal)
3. **Navigate** to backend folder:
   ```bash
   cd Tracker-API
   ```
4. **Run** the backend:
   ```bash
   dotnet run
   ```
5. **Wait** for the server to start
6. **Keep the terminal open!**

---

## ✅ Verify Backend is Running

### Test 1: Check Terminal Output
Look at the terminal window. You should see:
```
Now listening on: http://localhost:5000
```

### Test 2: Open Swagger in Browser
Open your browser and go to:
```
http://localhost:5000/swagger
```

**If you see the Swagger API documentation page** → ✅ **SUCCESS!** Backend is running!

**If you see "ERR_CONNECTION_REFUSED"** → Backend is not running yet. Wait a bit longer.

### Test 3: Test API Endpoint
Open in browser:
```
http://localhost:5000/api/expenses
```

**If you see `[]` (empty array) or JSON data** → ✅ Backend is working!

---

## ⚠️ Important Notes

1. **Keep the terminal window open** - If you close it, the backend stops
2. **Wait 10-15 seconds** - First time startup takes longer (database creation)
3. **Don't close the window** - The backend must stay running for the frontend to work
4. **One terminal = One backend** - Each `dotnet run` starts one instance

---

## 🛑 How to Stop Backend

### Method 1: In Terminal
- Press `Ctrl + C` in the terminal window
- The server will stop

### Method 2: Close Terminal
- Close the terminal window
- The server will stop automatically

---

## ❌ Troubleshooting

### Problem: "dotnet is not recognized"
**Solution:** Install .NET 8.0 SDK from https://dotnet.microsoft.com/download

### Problem: "Port 5000 already in use"
**Solution:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with the number)
taskkill /PID <PID> /F
```

### Problem: Build errors
**Solution:**
```powershell
cd Tracker-API
dotnet restore
dotnet build
# Check error messages and fix them
```

### Problem: Database errors
**Solution:**
1. Delete the file: `Tracker-API\ExpenseTracker.db`
2. Restart the backend
3. Database will be recreated automatically

---

## 📋 Quick Checklist

Before using the frontend, make sure:

- [ ] Backend terminal is open
- [ ] You see "Now listening on: http://localhost:5000"
- [ ] You can access `http://localhost:5000/swagger` in browser
- [ ] Terminal window is NOT closed
- [ ] You waited at least 10 seconds after starting

---

## 🎯 After Backend is Running

1. **Backend is running** on: `http://localhost:5000`
2. **Swagger UI** is available at: `http://localhost:5000/swagger`
3. **Frontend can now connect** - Go to `http://localhost:5173` and refresh

---

## 💡 Pro Tips

- **Use `START-BACKEND.bat`** - It's the easiest method!
- **Keep the terminal visible** - So you can see if there are any errors
- **First run is slower** - Database creation takes time
- **Check Swagger** - It's the best way to verify the backend is working

---

**That's it! Once you see "Now listening on: http://localhost:5000", your backend is running and ready to use!** 🚀

