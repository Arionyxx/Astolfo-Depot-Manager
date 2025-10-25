# 🌐 Custom User Agent Guide

## 🎯 What is a User Agent?

A **User Agent** is a string that tells websites what browser and device you're using. SteamDB and other websites use this to identify visitors. By using your actual browser's user agent, you can bypass restrictions that block automated tools.

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Get Your Browser's User Agent

Choose your browser:

#### **Chrome / Edge / Brave**
1. Visit: https://www.whatismybrowser.com/detect/what-is-my-user-agent/
2. Copy the user agent string shown
3. Example: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...`

#### **Firefox**
1. Visit: https://www.whatismybrowser.com/detect/what-is-my-user-agent/
2. Copy the user agent string shown
3. Example: `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0`

#### **Alternative Method (Any Browser)**
1. Open DevTools (F12 or Right-click → Inspect)
2. Go to Console tab
3. Type: `navigator.userAgent`
4. Press Enter
5. Copy the string shown

### Step 2: Add to Settings

1. Open **Astolfo Depot Manager**
2. Go to **Settings** page (sidebar)
3. Scroll to **SteamDB Settings** section
4. Paste your user agent in the textarea
5. Click **Save Settings**

### Step 3: Test It

1. Go to **SteamDB Browser**
2. Enter any App ID (try `730` for CS:GO)
3. Click **Search**
4. ✅ If it works, you'll see depot lists!
5. ❌ If still blocked, try a different browser's user agent

---

## 📖 Detailed Explanation

### Why Does This Work?

**The Problem:**
- SteamDB uses Cloudflare protection
- Cloudflare blocks requests that look like bots
- Default user agents are often flagged

**The Solution:**
- Real browsers have trusted user agents
- By using your browser's user agent, requests look legitimate
- Cloudflare allows the request through

### What User Agent Should I Use?

**Best Options (in order):**

1. **Your Current Browser** - Most likely to work
   - Chrome: Most common, widely accepted
   - Firefox: Also widely accepted
   - Edge: Based on Chrome, works well

2. **Latest Chrome** - If your browser doesn't work
   ```
   Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
   ```

3. **Latest Firefox** - Alternative option
   ```
   Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0
   ```

4. **Try Different OS** - Sometimes helps
   - Windows: `Windows NT 10.0; Win64; x64`
   - macOS: `Macintosh; Intel Mac OS X 10_15_7`
   - Linux: `X11; Linux x86_64`

---

## 🔧 Troubleshooting

### Still Getting "Access Denied"?

**Solution 1: Update Your User Agent**
- Browsers update frequently
- Get a fresh user agent from your browser
- Old user agents may be flagged

**Solution 2: Try a Different Browser**
- Chrome user agent not working? Try Firefox
- Firefox not working? Try Edge/Brave
- Mobile user agents can also work

**Solution 3: Clear and Retry**
1. Clear the user agent field in Settings
2. Save (uses default)
3. Get a NEW user agent from your browser
4. Paste and save again

**Solution 4: Use Manual Entry**
- If all else fails, use browser to view SteamDB
- Copy depot IDs manually
- Enter in "Depot Downloader" tab

### How to Test User Agents

**Quick Test:**
1. Set user agent in Settings
2. Try searching for App ID: `730` (CS:GO)
3. Should see depot list if working

**Browser Test:**
1. Open SteamDB in your browser: https://steamdb.info/app/730/depots/
2. If you can see it in browser, copy that browser's user agent
3. Use it in the app

### Common Errors

**Error: "Access denied. Try using a different user agent in settings."**
- Current user agent is blocked
- Get a fresh one from your browser
- Try a different browser's user agent

**Error: "Rate limit exceeded"**
- Too many requests too fast
- Wait 60 seconds
- Try again with valid user agent

---

## 💡 Pro Tips

### 1. Keep User Agent Updated
- Browsers update monthly
- Update your user agent every few months
- Newer = less likely to be blocked

### 2. Match Your System
- On Windows? Use Windows user agent
- On Mac? Use macOS user agent
- On Linux? Use Linux user agent

### 3. Use Your Daily Browser
- Browser you use daily is trusted
- Has history, cookies, updates
- User agent is most legitimate

### 4. Don't Share User Agents
- Widely-shared user agents get flagged faster
- Use your own browser's
- Unique is better

### 5. Fallback to Steam API
- If SteamDB fails, app uses Steam API
- Less detailed but still works
- You can always download with App/Depot ID

---

## 🎮 Popular User Agents

### Windows 11 (Chrome 120)
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

### Windows 11 (Firefox 120)
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0
```

### macOS (Chrome 120)
```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

### macOS (Safari 17)
```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15
```

### Linux (Chrome 120)
```
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

### Android (Chrome Mobile)
```
Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36
```

### iPhone (Safari)
```
Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1
```

> ⚠️ **Note:** These are examples. For best results, use your OWN browser's user agent!

---

## 🔄 When to Update User Agent

**Update if:**
- ✅ Getting "Access denied" errors
- ✅ Haven't updated in 3+ months
- ✅ Browser has updated recently
- ✅ SteamDB works in browser but not in app

**Don't update if:**
- ❌ Everything is working fine
- ❌ Only occasional errors (normal)
- ❌ You just updated it yesterday

---

## 📊 Settings Page Reference

```
┌─────────────────────────────────────┐
│  SteamDB Settings                   │
├─────────────────────────────────────┤
│  Custom User Agent                  │
│  Leave empty for default            │
│  ┌───────────────────────────────┐ │
│  │ Mozilla/5.0 (Windows NT 10.0; │ │
│  │ Win64; x64) AppleWebKit/537.. │ │
│  └───────────────────────────────┘ │
│  Use a browser user agent to        │
│  bypass restrictions                │
│                                     │
│  📖 How to get a User Agent:        │
│  1. Open your browser               │
│  2. Visit whatismybrowser.com       │
│  3. Copy the User Agent shown       │
│  4. Paste it here and save          │
│                                     │
│  [Save Settings]                    │
└─────────────────────────────────────┘
```

---

## ❓ FAQ

**Q: Do I NEED a custom user agent?**
A: Not always. The app has a default one. But if you get access denied errors, a custom one helps.

**Q: Is this safe?**
A: Yes! You're just telling SteamDB "I'm using Chrome/Firefox/etc." It's a standard browser feature.

**Q: Will my user agent expire?**
A: User agents don't expire, but newer ones work better. Update every few months.

**Q: Can I use someone else's user agent?**
A: Technically yes, but yours is better. Your browser's user agent is most trustworthy.

**Q: What if I don't want to use custom user agent?**
A: Leave it empty! App uses a default one. You can also use manual depot entry.

**Q: Does this bypass Cloudflare completely?**
A: It helps significantly, but Cloudflare has multiple checks. If still blocked, use manual entry.

---

## 🎯 Summary

1. **Get user agent** from your browser (whatismybrowser.com)
2. **Paste in Settings** → SteamDB Settings section
3. **Save and test** with any App ID
4. **Update occasionally** if you get blocked

That's it! No captchas, no browser windows, just a simple setting. 🚀

---

## 📞 Still Having Issues?

- Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
- Use manual depot entry (always works)
- Open an issue on GitHub with details

---

**Made with ❤️ by arifemboy**

*Simple solutions for complex problems!*
