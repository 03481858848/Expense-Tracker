# 🔧 Quick Fix: "Unable to connect to server" Error

## ❌ Problem
Aapko ye error dikh raha hai:
```
Error Loading Dashboard
Unable to connect to the server. Please ensure the backend is running.
```

## ✅ Solution: Backend Start Karein

### Method 1: Batch File (Sabse Aasaan) ⭐

1. **Project folder mein jao**
2. **`START-BACKEND.bat` file dhoondho**
3. **Double-click karein**
4. **Ek terminal window khulegi**
5. **Wait karein** - "Now listening on: http://localhost:5000" dikhne tak
6. **Us window ko open rakho** (band mat karo!)
7. **Browser mein refresh karein** (F5)

---

### Method 2: Terminal Mein Manually

**PowerShell ya Command Prompt kholo aur ye commands run karo:**

```powershell
cd C:\Users\DELL\Desktop\Expense-Tracker\Tracker-API
dotnet run
```

**Wait karein** - "Now listening on: http://localhost:5000" dikhne tak
**Terminal window open rakho!**

---

## ✅ Verify Karein

### Step 1: Backend Check
Browser mein ye URL kholo:
```
http://localhost:5000/swagger
```

**Agar Swagger API page dikhai de** → ✅ Backend chal raha hai!

**Agar "ERR_CONNECTION_REFUSED" dikhai de** → Backend abhi start nahi hua, thoda aur wait karein

### Step 2: Frontend Refresh
1. `http://localhost:5173` pe jao
2. **Page refresh karein** (F5 ya Ctrl+R)
3. Error ab fix ho jana chahiye!

---

## ⚠️ Important Points

1. **Backend pehle start karein** - Frontend se pehle backend chalna chahiye
2. **Terminal window open rakho** - Band karne se backend ruk jayega
3. **10-15 seconds wait karein** - Pehli baar database create hota hai
4. **Backend running hona zaroori hai** - Frontend ke liye backend chahiye

---

## 🔍 Checklist

Backend start karne ke baad verify karein:

- [ ] Terminal window open hai
- [ ] Terminal mein "Now listening on: http://localhost:5000" dikh raha hai
- [ ] Browser mein `http://localhost:5000/swagger` kaam kar raha hai
- [ ] Terminal window band nahi hui
- [ ] Frontend page refresh kar diya

---

## ❌ Agar Abhi Bhi Error Aa Raha Hai

### Check 1: Backend Actually Running Hai?
Terminal mein check karein - kya "Now listening on: http://localhost:5000" dikh raha hai?

**Agar nahi dikh raha:**
- Terminal mein errors check karein
- `.NET 9.0` installed hai? (`dotnet --version`)
- Build successful hua? (`dotnet build`)

### Check 2: Port 5000 Available Hai?
Agar "Address already in use" error aaye:
```powershell
# Check kya port 5000 use ho raha hai
netstat -ano | findstr :5000

# Process kill karein (agar zaroorat ho)
taskkill /PID <PID> /F
```

### Check 3: Browser Cache
- Browser cache clear karein
- Hard refresh karein (Ctrl+Shift+R)
- Ya incognito mode mein try karein

---

## 🎯 Step-by-Step Fix

1. ✅ **Backend start karein** → `START-BACKEND.bat` double-click
2. ✅ **Wait karein** → "Now listening on: http://localhost:5000" dikhne tak
3. ✅ **Verify karein** → `http://localhost:5000/swagger` browser mein kholo
4. ✅ **Frontend refresh karein** → `http://localhost:5173` pe F5 press karo
5. ✅ **Done!** → Error fix ho jana chahiye

---

## 💡 Pro Tip

**Sabse aasaan tareeka:**
1. `START-BACKEND.bat` double-click karo
2. Terminal window open rakho
3. "Now listening on: http://localhost:5000" dikhne tak wait karo
4. Browser refresh karo

**Ya `START-BOTH.bat` use karo** - Dono (backend + frontend) ek saath start ho jayengi!

---

**Backend start karne ke baad error fix ho jayega!** 🚀

