# 🧪 Quick Test Guide - Cloudflare Challenge Solver

## ✅ Update & Test in 2 Minutes

### Step 1: Update (30 seconds)
```bash
cd Astolfo-Depot-Manager
git pull origin main
npm install
```

### Step 2: Run (5 seconds)
```bash
npm start
```

### Step 3: Test Cloudflare Solver (60 seconds)

#### A. Navigate to SteamDB Browser
- Click "SteamDB Browser" in left sidebar

#### B. Search for Rust
- Enter App ID: `252490`
- Click "Search" button

#### C. You Should See
One of these two scenarios:

**Scenario 1: Challenge Prompt Appears** ✅
```
┌──────────────────────────────────┐
│ 🛡️ Cloudflare Protection        │
│    Detected                      │
│                                  │
│ [Open Browser & Solve Challenge] │
└──────────────────────────────────┘
```
- **Click the green button**
- Browser window opens
- Complete Cloudflare checkbox (☐ → ☑)
- Window closes automatically
- **Result: You see depot list!** ✅

**Scenario 2: Works Immediately** ✅
```
✅ Rust
   Steam API badge

App Info shows
Depots show:
- 252491 Windows
- 252492 Mac
- 252493 Linux
```
- If using Steam API fallback, still works!
- Basic info displayed
- Can download via manual entry

---

## 🎯 What Success Looks Like

### Full Success (With Cloudflare Solver):
1. Search Rust → Challenge prompt
2. Click solve → Browser opens
3. Complete checkbox → Window closes
4. **SEE DEPOT LIST:**
   ```
   252491 - Rust Windows  [Download] [History]
   252492 - Rust Mac      [Download] [History]
   252493 - Rust Linux    [Download] [History]
   ```

### Partial Success (Steam API Fallback):
1. Search Rust → Gets app info from Steam API
2. Shows "Steam API" badge
3. Depots unavailable but can use manual entry
4. Still functional!

---

## ⚠️ Common Issues

### Issue: "Script failed to execute"
**Fixed!** Update and restart:
```bash
git pull origin main
npm start
```

### Issue: Browser window doesn't open
**Check:**
- Windows Firewall allowing Electron
- Antivirus not blocking
- Try manually: Close app, restart

### Issue: Challenge solved but still blocked
**Solution:**
- Solve challenge again (click button)
- Or wait 5 minutes and retry
- Or use manual entry method

---

## 🚀 Quick Manual Entry Test

If Cloudflare solver doesn't work:

1. **Go to Depot Downloader tab**
2. **Fill in:**
   ```
   App ID: 252490
   Depot ID: 252491
   Manifest ID: (leave empty)
   Directory: C:\Downloads\Rust
   ```
3. **Click "Start Download"**
4. **Should work!** ✅

This tests that downloads still work even without SteamDB browsing.

---

## 📊 Test Checklist

Run through this checklist:

- [ ] App starts without errors
- [ ] Can navigate to SteamDB Browser
- [ ] Search for 252490 works
- [ ] Either see challenge prompt OR see Steam API data
- [ ] If challenge prompt: Click button opens browser
- [ ] Complete challenge: Window closes
- [ ] Depot list loads after solving
- [ ] Can click Download on a depot
- [ ] Depot Downloader tab gets auto-filled
- [ ] Manual entry works (App: 252490, Depot: 252491)

**If 8+ items checked: ✅ WORKING!**

---

## 🎮 Try Other Games

Test with different App IDs:

**CS:GO (730):**
```
Search: 730
Expected: Depot 731, 732, 741
```

**TF2 (440):**
```
Search: 440
Expected: Depot 441, 442
```

**Dota 2 (570):**
```
Search: 570
Expected: Depot 571, 572, 573
```

---

## 💡 Pro Testing Tips

### Tip 1: Check Console
Open DevTools (F12) and check Console tab:
- Should see: "Using Steam API fallback" (normal)
- Should NOT see: Unhandled promise rejections
- Some "CLOUDFLARE_BLOCK" logs are normal

### Tip 2: Test Session Persistence
1. Solve challenge once
2. Search different game
3. Should work without solving again!
4. Session persists until app closes

### Tip 3: Test Manual Entry
Always test manual entry works:
- Proves download functionality is solid
- Good backup if Cloudflare keeps blocking

---

## 📝 Report Results

If testing fails, report with:

**What worked:**
- [ ] App starts
- [ ] Can search
- [ ] Challenge button appears
- [ ] Browser opens
- [ ] Window closes
- [ ] Depots load

**What didn't work:**
- Exact error message
- Which step failed
- Screenshot if possible

Post in GitHub Issues!

---

## ✅ Expected Output

**Console should show:**
```
Using Steam API fallback for app info
(This is NORMAL - means Cloudflare blocked, using fallback)
```

**UI should show:**
```
Either:
1. Challenge solver prompt (purple card)
2. OR Steam API data with app info
3. OR Working depot list (after solving)
```

**NO unhandled promise rejections!** ✅

---

## 🎉 Success Criteria

**Minimum viable:**
- ✅ App starts
- ✅ Can search App IDs
- ✅ Gets some app info (Steam API or SteamDB)
- ✅ Manual download works

**Full success:**
- ✅ All above
- ✅ Challenge solver opens browser
- ✅ Can complete challenge
- ✅ Depot lists load
- ✅ One-click downloads work

---

**Test now and let me know how it goes!** 🚀

Report format:
```
✅ Works perfectly! / ⚠️ Partial success / ❌ Doesn't work
Details: [what happened]
```
