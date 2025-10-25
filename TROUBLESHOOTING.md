# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ Issue: "Access denied by SteamDB" / 403 Errors

**Symptoms:**
- Error message: "Access denied by SteamDB"
- Can't load app information
- SteamDB features not working

**Why This Happens:**
SteamDB uses Cloudflare protection which can block automated requests, especially if:
- Too many requests in a short time
- Your IP was recently used for many requests
- Cloudflare's protection level is high

**Solutions:**

#### Solution 1: Use Steam API Fallback (Automatic) ✅
The app now automatically falls back to Steam's official API when SteamDB is blocked:

1. **Try searching for an app** - The app will automatically:
   - Try SteamDB first
   - If blocked, switch to Steam Store API
   - Show a warning badge "Steam API"
   - Still show app information!

2. **What you'll see:**
   - ⚠️ Yellow badge: "Steam API" (using fallback)
   - ℹ️ Info alert: "Showing data from Steam Store API"
   - App details still work!

3. **Limitations with fallback:**
   - ❌ No depot list from SteamDB
   - ❌ No manifest history
   - ✅ Basic app info available
   - ✅ Can still download by manual entry!

#### Solution 2: Manual Depot Entry (Always Works) ✅

Even if SteamDB is completely blocked, you can still download:

1. **Find Depot IDs manually:**
   - Open browser: https://steamdb.info/app/[APP_ID]/depots/
   - Example for CS:GO (730): https://steamdb.info/app/730/depots/
   - Copy the Depot ID you want

2. **Use Depot Downloader tab:**
   - Go to "Depot Downloader" in sidebar
   - Enter App ID (e.g., 730)
   - Enter Depot ID (e.g., 731)
   - Enter Manifest ID if you want specific version
   - Click "Start Download"

3. **Everything still works!** ✅

#### Solution 3: Wait and Retry
Sometimes Cloudflare's protection is temporary:

1. **Wait 5-10 minutes**
2. **Close and reopen the app**
3. **Try searching again**

The app now has better rate limiting:
- 3 seconds between requests (increased from 2)
- Maximum 15 requests per minute (reduced from 20)
- Random delays to appear more human

#### Solution 4: Use Different Network
If your IP is temporarily blocked:

1. **Change networks:**
   - Switch from Wi-Fi to mobile hotspot
   - Use VPN (if you have one)
   - Restart your router to get new IP

2. **Try again** - Should work on different IP

#### Solution 5: Browser Method
Use SteamDB in your browser alongside the app:

1. **Open browser:** https://steamdb.info/
2. **Search for your game**
3. **Copy the information:**
   - App ID
   - Depot IDs
   - Manifest IDs (from history)
4. **Enter manually in app's Depot Downloader**

---

### ❌ Issue: Login Button Not Working

**Symptoms:**
- Click user icon, nothing happens
- Dropdown doesn't open

**Solution:**
This was fixed! Update your app:
```bash
git pull origin main
npm install
npm start
```

---

### ❌ Issue: Steam Login Fails

**Symptoms:**
- "Login failed" error
- Can't enter Steam Guard code
- Invalid credentials

**Solutions:**

1. **Check your credentials:**
   - Username must be Steam account name (not display name)
   - Password is case-sensitive
   - Don't include spaces

2. **Steam Guard:**
   - Check your email for Steam Guard code
   - Or use Steam Mobile App for code
   - Code expires after 30 seconds
   - Request new code if expired

3. **Account limitations:**
   - Make sure Steam Guard is enabled on your account
   - Account must not be in limited mode
   - Account must not have login restrictions

---

### ❌ Issue: Download Fails

**Symptoms:**
- Download doesn't start
- Shows error immediately
- Progress stuck at 0%

**Solutions:**

1. **Check Steam login:**
   - Make sure you're logged into Steam (user icon shows your initial)
   - Re-login if needed

2. **Verify IDs:**
   - App ID must be correct (check SteamDB)
   - Depot ID must be correct
   - Manifest ID optional (leave empty for latest)

3. **Check permissions:**
   - Do you own the game? (Some depots require ownership)
   - Is depot publicly accessible?
   - Try a different depot ID

4. **Directory issues:**
   - Make sure download directory exists
   - Check you have write permissions
   - Try changing to different directory

---

### ❌ Issue: App Won't Start

**Symptoms:**
- Nothing happens when running `npm start`
- Errors about missing modules
- White screen / blank window

**Solutions:**

1. **Reinstall dependencies:**
   ```bash
   cd Astolfo-Depot-Manager
   rm -rf node_modules
   npm install
   npm start
   ```

2. **Check Node.js version:**
   ```bash
   node --version
   ```
   - Must be 18 or higher
   - Update if needed: https://nodejs.org/

3. **Clear cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

---

### ❌ Issue: "Not a git repository"

**Symptoms:**
- `git pull` fails
- Error: "fatal: not a git repository"

**Solution:**

You're not in the project folder:
```bash
# Navigate to project
cd path/to/Astolfo-Depot-Manager

# Or if you deleted it, clone again
git clone https://github.com/Arionyxx/Astolfo-Depot-Manager.git
cd Astolfo-Depot-Manager
npm install
```

---

### ❌ Issue: Slow Performance / Lag

**Symptoms:**
- App is slow to respond
- UI freezes
- Long loading times

**Solutions:**

1. **Check background downloads:**
   - Cancel unnecessary downloads
   - Limit concurrent downloads in Settings

2. **Close other apps:**
   - Free up RAM
   - Close browser tabs

3. **Restart the app:**
   - Close completely (File → Exit or close window)
   - Run `npm start` again

---

### ❌ Issue: Can't See Manifest History

**Symptoms:**
- "No manifest history found"
- Empty history table
- Error loading history

**Possible Causes & Solutions:**

1. **SteamDB is blocked:**
   - This feature requires SteamDB access
   - If you see 403 errors, SteamDB is blocking requests
   - **Workaround:** Open https://steamdb.info in browser manually
   - Find manifest IDs and enter them manually

2. **Rate limiting:**
   - Wait a few seconds between depot selections
   - Don't rapidly switch between depots

3. **Invalid depot:**
   - Some depots don't have public history
   - Try a different depot from the same app

---

### ❌ Issue: DevTools Errors (Can be Ignored)

**Symptoms:**
```
ERROR:CONSOLE: "Request Autofill.enable failed"
ERROR:CONSOLE: "Request Autofill.setAddresses failed"
```

**Solution:**
- These are harmless Electron warnings
- They don't affect functionality
- Can be safely ignored

---

## 🆘 Still Having Issues?

### Quick Diagnostic

Run these commands and share output:

```bash
# Check Node version
node --version

# Check npm version  
npm --version

# Check for errors in app
npm start
```

### Get Help

1. **Check documentation:**
   - [README.md](README.md) - Main documentation
   - [QUICK_START.md](QUICK_START.md) - Setup guide
   - [UPDATE_GUIDE.md](UPDATE_GUIDE.md) - Update instructions
   - [FIXES.md](FIXES.md) - Recent fixes

2. **Search existing issues:**
   - https://github.com/Arionyxx/Astolfo-Depot-Manager/issues

3. **Create new issue:**
   - Click "New Issue"
   - Include:
     - Error message (full text)
     - What you were doing
     - Your OS and Node.js version
     - Screenshots if helpful

---

## 💡 Pro Tips

### Avoid SteamDB Blocks

1. **Don't spam searches** - Wait 3-5 seconds between searches
2. **Use manual entry** - If you know the IDs, enter them directly
3. **Bookmark common apps** - Keep a list of App/Depot IDs you use often
4. **One search per session** - Search once, copy all IDs you need

### Efficient Downloading

1. **Login once** - Stay logged in, no need to re-login each time
2. **Queue downloads** - Set up multiple downloads, let them run
3. **Use history** - Check download history to avoid re-downloading
4. **Verify selectively** - Only verify important downloads (it's slower)

### Best Practices

1. **Update regularly** - Run `git pull` weekly for latest fixes
2. **Check CHANGELOG** - See what's new in each update
3. **Report bugs** - Help improve the app for everyone
4. **Be patient with SteamDB** - Cloudflare protection is normal, use fallback

---

## 📊 Quick Reference

| Problem | Quick Solution |
|---------|---------------|
| 403 from SteamDB | Use manual entry or wait 5-10 min |
| Login fails | Check username (not display name) |
| Download fails | Check Steam login, verify IDs |
| App won't start | `npm install` and restart |
| Can't update | Navigate to folder first: `cd Astolfo-Depot-Manager` |
| Slow performance | Cancel extra downloads, restart app |
| No manifest history | Use SteamDB in browser, enter manually |

---

## 🎯 Remember

**The app has multiple fallback systems:**
1. ✅ SteamDB → Steam API fallback (automatic)
2. ✅ Manual depot entry (always works)
3. ✅ Browser + manual entry (ultimate fallback)

**You can ALWAYS download depots** even if SteamDB is completely blocked! Just enter the IDs manually.

---

**Having a different issue?** Open an issue on GitHub and we'll help you out! 🚀
