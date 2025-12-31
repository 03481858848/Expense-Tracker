# 🚀 Step-by-Step: Frontend aur Backend Start Karne Ka Guide

## ⚡ Sabse Aasaan Tareeka (1 Click)

### Method 1: START-BOTH.bat Use Karein ⭐

1. **Project folder mein jao**
2. **`START-BOTH.bat` file dhoondho**
3. **Double-click karein**
4. **Do terminal windows khulengi automatically:**
   - Ek Backend ke liye (port 5000)
   - Ek Frontend ke liye (port 5173)
5. **Dono start hone tak wait karein**
6. **Done!** Browser mein `http://localhost:5173` kholo

---

## 📋 Step-by-Step Manual Method

### Step 1: Backend Start Karein (Pehle)

#### Option A: Batch File Se
1. **`START-BACKEND.bat` file dhoondho**
2. **Double-click karein**
3. **Ek terminal window khulegi**
4. **Wait karein** - "Now listening on: http://localhost:5000" dikhne tak
5. **⚠️ IMPORTANT:** Is window ko **open rakho** (band mat karo!)

#### Option B: Terminal Se
1. **PowerShell ya Command Prompt kholo**
2. **Ye commands type karo:**
   ```powershell
   cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
   dotnet run
   ```
3. **Wait karein** - "Now listening on: http://localhost:5000" dikhne tak
4. **Terminal window open rakho!**

#### ✅ Backend Verify Karein:
Browser mein ye URL kholo:
```
http://localhost:5000/swagger
```
**Agar Swagger API page dikhai de** → ✅ Backend chal raha hai!

---

### Step 2: Frontend Start Karein (Nayi Terminal)

**⚠️ IMPORTANT:** Backend terminal **open rakho**, nayi terminal kholo frontend ke liye!

#### Option A: Batch File Se
1. **Nayi terminal window kholo** (backend wali open rakho)
2. **`START-FRONTEND.bat` file dhoondho**
3. **Double-click karein**
4. **Ek nayi terminal window khulegi**
5. **Wait karein** - "Local: http://localhost:5173" dikhne tak
6. **Is window ko bhi open rakho!**

#### Option B: Terminal Se
1. **Nayi PowerShell/Command Prompt window kholo**
2. **Ye commands type karo:**
   ```powershell
   cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-Client
   npm run dev
   ```
3. **Wait karein** - "Local: http://localhost:5173" dikhne tak
4. **Terminal window open rakho!**

#### ✅ Frontend Verify Karein:
Browser mein ye URL kholo:
```
http://localhost:5173
```
**Agar login page dikhai de** → ✅ Frontend chal raha hai!

---

## 🎯 Complete Checklist

### Before Starting:
- [ ] .NET 9.0 installed hai? (`dotnet --version` check karein)
- [ ] Node.js installed hai? (`node --version` check karein)
- [ ] npm installed hai? (`npm --version` check karein)

### Backend Start:
- [ ] Backend terminal open hai
- [ ] "Now listening on: http://localhost:5000" dikh raha hai
- [ ] `http://localhost:5000/swagger` browser mein kaam kar raha hai
- [ ] Backend terminal **band nahi hui**

### Frontend Start:
- [ ] Frontend terminal open hai (backend se alag)
- [ ] "Local: http://localhost:5173" dikh raha hai
- [ ] `http://localhost:5173` browser mein kaam kar raha hai
- [ ] Frontend terminal **band nahi hui**
- [ ] **No connection errors** dikh rahe

---

## 📝 Visual Guide

### Terminal Windows Ka Layout:

```
┌─────────────────────────┐  ┌─────────────────────────┐
│   Backend Terminal      │  │   Frontend Terminal      │
│                         │  │                         │
│  Now listening on:      │  │  Local:                 │
│  http://localhost:5000   │  │  http://localhost:5173   │
│                         │  │                         │
│  [Keep this open!]      │  │  [Keep this open!]      │
└─────────────────────────┘  └─────────────────────────┘
```

**Dono windows open rakho!**

---

## ⚠️ Important Points

1. **Backend pehle start karein** - Frontend ko backend chahiye
2. **Do alag terminals** - Ek backend, ek frontend
3. **Dono windows open rakho** - Band karne se server ruk jayega
4. **Wait karein** - Pehli baar 10-15 seconds lag sakte hain
5. **Order zaroori hai** - Pehle backend, phir frontend

---

## 🔍 Kya Dikhna Chahiye

### Backend Terminal Mein:
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

### Frontend Terminal Mein:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🛑 Agar Kuch Galat Ho

### Backend Start Nahi Ho Raha?
1. `.NET 9.0` installed hai? Check karein: `dotnet --version`
2. Port 5000 available hai? Check karein
3. Build errors? Terminal mein errors check karein

### Frontend Start Nahi Ho Raha?
1. `Node.js` installed hai? Check karein: `node --version`
2. Dependencies install hui? `npm install` run karein
3. Port 5173 available hai? Check karein

### "Unable to connect" Error?
1. Backend chal raha hai? `http://localhost:5000/swagger` check karein
2. Backend terminal open hai? Check karein
3. Hard refresh karein: `Ctrl + Shift + R`

---

## 🎉 Success Indicators

### ✅ Backend Running:
- Terminal: "Now listening on: http://localhost:5000"
- Browser: Swagger page loads
- No errors in terminal

### ✅ Frontend Running:
- Terminal: "Local: http://localhost:5173"
- Browser: Login page loads
- No "Unable to connect" errors

---

## 💡 Quick Commands Reference

### Backend:
```powershell
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
dotnet run
```

### Frontend:
```powershell
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-Client
npm run dev
```

---

## 🎯 Final Steps

1. ✅ Backend start karo → Wait for "Now listening on: http://localhost:5000"
2. ✅ Backend verify karo → `http://localhost:5000/swagger` browser mein
3. ✅ Frontend start karo → Wait for "Local: http://localhost:5173"
4. ✅ Frontend verify karo → `http://localhost:5173` browser mein
5. ✅ Login karo → `admin@test.com` / `123456`
6. ✅ Done! Application use karo

---

**Sabse aasaan: `START-BOTH.bat` double-click karo, sab automatic ho jayega!** 🚀

