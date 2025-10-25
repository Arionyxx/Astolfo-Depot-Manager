# 🛡️ Cloudflare Challenge Solver - Guide

## 🎉 NEW FEATURE: Solve Cloudflare Challenges In-App!

The app now lets you solve Cloudflare challenges directly, so you can browse SteamDB depot lists normally!

---

## 🚀 How It Works

### When You Search for a Game:

**Scenario 1: No Cloudflare Block** ✅
```
You search → Data loads → See depots/manifests normally
```

**Scenario 2: Cloudflare Blocks Request** 🛡️
```
You search → Cloudflare blocks → App shows "Solve Challenge" button
```

---

## 📖 Step-by-Step: Solving the Challenge

### Step 1: You'll See This Screen

When Cloudflare blocks the request, you'll see a purple/pink gradient card that says:

```
🛡️ Cloudflare Protection Detected

SteamDB uses Cloudflare to protect against bots. Let's solve the challenge!

What will happen:
1. A browser window will open with SteamDB
2. Complete the Cloudflare challenge if shown (click checkbox)
3. Window closes automatically when done
4. Then you can browse SteamDB normally!

[Open Browser & Solve Challenge]
```

### Step 2: Click the Button

Click the big green button: **"Open Browser & Solve Challenge"**

### Step 3: Browser Window Opens

A new browser window will open automatically showing SteamDB.

**You'll see a banner at the top:**
```
Complete the Cloudflare challenge if shown, then this 
window will close automatically.
Browse SteamDB normally - the app will capture your session.
```

### Step 4: Complete the Challenge

**Option A: Cloudflare Checkbox** ✅
- You'll see: "Verify you are human"
- Click the checkbox: ☐ → ☑
- Wait a moment (5-10 seconds)
- Challenge solved!

**Option B: No Challenge Shown** ✅
- Sometimes SteamDB loads directly
- The page just loads normally
- No action needed!

**Option C: Advanced Challenge** 🧩
- Sometimes: "Select all images with traffic lights"
- Complete the image puzzle
- Click Verify
- Challenge solved!

### Step 5: Automatic Capture

Once you pass Cloudflare:
- Banner turns green: **"✅ Success! Session captured..."**
- Window closes automatically in 2 seconds
- App now has your session!

### Step 6: Enjoy SteamDB!

The app retries your search automatically and now you can:
- ✅ See full depot lists
- ✅ Browse manifest history
- ✅ View build changes
- ✅ Download any version!

---

## 🎯 Example: Downloading Rust

**Without Challenge Solver (Old Way):**
1. Search for Rust (252490)
2. Get blocked by Cloudflare
3. Manually open browser
4. Find depot IDs (252491, etc.)
5. Enter in app manually
6. Download

**With Challenge Solver (New Way):**
1. Search for Rust (252490)
2. Get blocked by Cloudflare
3. Click "Solve Challenge" button ⬅️ **ONE CLICK!**
4. Complete checkbox in browser
5. Window closes automatically
6. **See full depot list!** ✅
7. Click download on any depot
8. Done! 🎉

**Time saved: 5+ minutes per search!**

---

## 💡 Pro Tips

### Tip 1: Session Persists
Once you solve the challenge:
- Session is saved
- Works for multiple searches
- No need to solve again (usually)
- Lasts for current app session

### Tip 2: When to Solve Again
You'll need to solve the challenge again if:
- You restart the app
- Cloudflare's cookie expires (hours later)
- You clear session manually

### Tip 3: Browse While Window is Open
While the browser window is open:
- You can browse SteamDB freely
- Check different games
- Look at depot pages
- Take your time!
- Window closes when you're past Cloudflare

### Tip 4: Manual Override
Don't want to wait? You can:
1. Let window stay open
2. Browse SteamDB manually
3. Copy Depot IDs
4. Close window
5. Use manual entry in Depot Downloader

---

## 🔧 Troubleshooting

### Issue: Window doesn't close automatically

**Possible Causes:**
- Cloudflare check not fully complete
- Page still loading

**Solution:**
- Wait 10-15 more seconds
- Or close window manually
- Session might still be captured
- Try your search again

---

### Issue: "Timeout waiting for Cloudflare challenge"

**Cause:** Took longer than 2 minutes

**Solution:**
- Click the button again
- Complete challenge faster
- Or close window and use manual entry

---

### Issue: Challenge solved but still can't see depots

**Causes:**
- Session didn't capture properly
- Cookies not saved

**Solution:**
1. Click "Solve Challenge" again
2. This time wait for green success message
3. Let window close automatically
4. Try search again

---

### Issue: Browser window shows different site

**Cause:** Rare redirect issue

**Solution:**
- Close window
- Click "Solve Challenge" again
- Should open steamdb.info correctly

---

## 🛡️ Is This Safe?

**Yes, completely safe!**

**What the app does:**
- Opens a real Chromium browser window
- You complete Cloudflare's official challenge
- App captures session cookies (like a normal browser)
- Uses those cookies for requests

**What the app does NOT do:**
- ❌ Store your passwords
- ❌ Access other sites
- ❌ Bypass security illegally
- ❌ Hack anything

This is the same as:
1. Opening SteamDB in Chrome
2. Completing Cloudflare challenge
3. Continuing to browse

**100% legitimate and safe!** ✅

---

## 📊 Technical Details

### How It Works Internally

1. **Detection:**
   ```
   App tries to fetch SteamDB
   → Gets 403 Forbidden
   → Recognizes Cloudflare block
   ```

2. **Browser Launch:**
   ```
   Opens Electron BrowserWindow
   → Loads steamdb.info
   → Real browser with real JS
   ```

3. **Challenge Completion:**
   ```
   User completes Cloudflare check
   → Browser gets valid cookies
   → App monitors page load
   ```

4. **Session Capture:**
   ```
   Detects successful load
   → Extracts session cookies
   → Saves for future requests
   ```

5. **Reuse:**
   ```
   Future requests include cookies
   → Cloudflare sees valid session
   → Requests succeed!
   ```

### Cookies Captured

The app captures:
- `cf_clearance` - Cloudflare clearance token
- Session cookies from SteamDB
- Standard browser cookies

These prove you're human and passed the challenge.

---

## 🎮 Real-World Usage

### Scenario 1: First Time User

```
1. Install app
2. Search for CS:GO (730)
3. Cloudflare blocks
4. Click "Solve Challenge"
5. Complete checkbox
6. ✅ See all CS:GO depots!
7. Download what you need
8. Done!
```

### Scenario 2: Power User

```
1. Open app (already solved challenge before)
2. Search for Rust (252490)
3. Works immediately! (session saved)
4. Browse depot 252491 manifest history
5. See all 500+ builds with dates
6. Download specific version
7. No challenge needed!
```

### Scenario 3: Session Expired

```
1. App open for hours
2. Session expires
3. Try to browse - blocked again
4. Click "Solve Challenge" again
5. Complete quickly (familiar now)
6. Back to browsing!
```

---

## ✅ Benefits

### For You:
- ✅ **See depot lists** directly in app
- ✅ **Browse manifest history** with dates
- ✅ **View build changes** ("Added winter items")
- ✅ **One-click downloads** from list
- ✅ **No manual entry** needed
- ✅ **Faster workflow** by minutes

### Compared to Old Methods:
| Feature | Manual Entry | Cloudflare Solver |
|---------|-------------|------------------|
| See depot lists | ❌ | ✅ |
| View manifests | ❌ | ✅ |
| Build changes | ❌ | ✅ |
| Time to download | 5-10 min | 30 seconds |
| User effort | High | One click |

---

## 🎓 FAQ

**Q: How long does the session last?**
A: Usually until you close the app, sometimes longer.

**Q: Do I need to solve it every time?**
A: No! Once solved, works for multiple searches until session expires.

**Q: Can I use manual entry instead?**
A: Yes! Manual entry still works if you prefer.

**Q: Is my data private?**
A: Yes! Cookies only used for SteamDB, not stored permanently.

**Q: What if challenge is hard?**
A: Take your time! Window stays open. Or use manual entry fallback.

**Q: Does this work for other sites?**
A: Only for SteamDB. Each site would need its own implementation.

---

## 🚀 Summary

**New workflow is AMAZING:**

1. 🔍 Search for game
2. 🛡️ Cloudflare blocks → Click button
3. ✅ Complete simple checkbox
4. 🎉 **See everything!**
   - All depots listed
   - All manifests with dates
   - All build changes
   - One-click downloads!

**This feature makes the app 100x better than manual methods!**

No more copying Depot IDs manually. No more browser juggling. Just click, solve, browse, download! 🎮

---

**Try it now! Search for any game and experience the magic!** ✨
