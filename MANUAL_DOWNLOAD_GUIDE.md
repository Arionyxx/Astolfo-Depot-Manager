# 🎮 Manual Download Guide - When SteamDB is Blocked

## ✅ Good News: You Can Still Download!

Even when SteamDB is blocked, you can download any depot by entering the IDs manually. Here's how:

---

## 📝 Step-by-Step: Download Rust (Example)

### Step 1: Find Depot IDs

**Option A: Use Browser**
1. Open this link: https://steamdb.info/app/252490/depots/
2. You'll see a list like this:

```
Depot ID    Name                    Size
---------   ---------------------   ------
252491      Rust - Windows          3.5 GB
252492      Rust - Mac              3.5 GB
252493      Rust - Linux            3.5 GB
252494      Rust - Dedicated Server 1.2 GB
```

3. Choose which one you want (most likely **252491** for Windows)

**Option B: Common Depot IDs**

For most games, depot IDs follow a pattern:
- **App ID + 1** = Windows (e.g., Rust 252490 → Depot 252491)
- **App ID + 2** = Mac
- **App ID + 3** = Linux

---

### Step 2: Use Depot Downloader Tab

1. **In the app, click "Depot Downloader"** in the left sidebar

2. **Fill in the form:**
   ```
   App ID: 252490
   Depot ID: 252491  (for Windows version)
   Manifest ID: (leave empty for latest)
   Download Directory: C:\Downloads\Rust
   ```

3. **Check "Verify downloaded files"** if you want (optional, but recommended)

4. **Click "Start Download"** button

5. **Watch the progress!** You'll see:
   - Progress bar
   - Download speed
   - ETA

---

## 🎯 Quick Reference: Common Games

| Game | App ID | Windows Depot | Mac Depot | Linux Depot |
|------|--------|--------------|-----------|-------------|
| **Rust** | 252490 | 252491 | 252492 | 252493 |
| **CS:GO** | 730 | 731 | 732 | 741 |
| **TF2** | 440 | 441 | 442 | 441 |
| **Dota 2** | 570 | 571 | 572 | 573 |
| **ARK** | 346110 | 346111 | 346112 | - |
| **Garry's Mod** | 4000 | 4001 | 4002 | 4003 |

---

## 🔍 How to Find Any Game's Depot IDs

### Method 1: Browser (Always Works)
1. Go to: `https://steamdb.info/app/[APP_ID]/depots/`
2. Replace `[APP_ID]` with your game's ID
3. Example for Rust: https://steamdb.info/app/252490/depots/
4. Copy the Depot IDs you see

### Method 2: Pattern Guess (Usually Works)
Most games follow this pattern:
```
App ID: 252490
├─ Depot 252491 (Windows)
├─ Depot 252492 (Mac)
├─ Depot 252493 (Linux)
└─ Depot 252494 (DLC/Server/etc)
```

Try App ID + 1 for Windows client!

### Method 3: Steam Console (Advanced)
1. Open Steam
2. Go to: `steam://nav/console`
3. Type: `app_info_print [APP_ID]`
4. Look for "depots" section
5. Find depot IDs listed there

---

## 💡 Pro Tips

### Tip 1: Start with Latest Version
- Leave "Manifest ID" **empty** to get the latest version
- This is what most people want!

### Tip 2: Download Specific Old Version
If you need an old version:
1. Open browser: https://steamdb.info/depot/252491/history/
2. Find the date you want (e.g., "Before update X")
3. Copy the Manifest ID (long number)
4. Paste in "Manifest ID" field in app
5. Download!

### Tip 3: Multiple Depots
To download multiple depots:
1. Download first depot
2. Wait for it to finish (or let it run)
3. Start second download
4. App supports multiple concurrent downloads!

### Tip 4: Verify Large Downloads
For important downloads:
- ✅ Check "Verify downloaded files"
- Takes longer but ensures files aren't corrupted
- Especially useful for 3+ GB downloads

---

## 🎮 Complete Example: Downloading Rust

```
SCENARIO: I want to download Rust (Windows, latest version)

1. Find Info:
   - App ID: 252490 (already know from search)
   - Depot ID: 252491 (Windows client, from browser or guess)
   - Manifest ID: (leave empty for latest)

2. In App:
   - Click "Depot Downloader" in sidebar
   - Enter App ID: 252490
   - Enter Depot ID: 252491
   - Leave Manifest ID empty
   - Set download folder: C:\Games\Rust
   - Check verify if wanted
   - Click "Start Download"

3. Wait:
   - Watch progress bar
   - Speed: ~50 MB/s (depends on internet)
   - Time: ~1-2 minutes for 3.5 GB

4. Done!
   - Files downloaded to C:\Games\Rust
   - Ready to use!
```

---

## 🚨 Troubleshooting

### Problem: "Login required"
**Solution:** Make sure you're logged into Steam:
1. Click user icon (top right)
2. Enter Steam username and password
3. Enter Steam Guard code
4. Try download again

### Problem: "Access denied"
**Solution:** 
- Some depots require game ownership
- Make sure you own the game on Steam
- Or try a free game first (TF2, Dota 2)

### Problem: Download stuck at 0%
**Solution:**
1. Cancel download
2. Check App ID and Depot ID are correct
3. Verify you're logged into Steam
4. Try again

### Problem: Can't find Depot ID
**Solution:**
1. Try the pattern: App ID + 1
2. Or open browser: https://steamdb.info/app/[APP_ID]/depots/
3. SteamDB website works in browser (Cloudflare only blocks automation)

---

## 📚 Additional Resources

**Need help finding App IDs?**
- Steam Store URL: `store.steampowered.com/app/[APP_ID]/`
- SteamDB: https://steamdb.info/
- Or Google: "game name steam app id"

**Need old versions?**
- Manifest history: https://steamdb.info/depot/[DEPOT_ID]/history/
- Shows every update with dates
- Copy manifest ID for specific version

**Want to see what changed?**
- Patch notes: https://steamdb.info/app/[APP_ID]/patchnotes/
- Shows update descriptions
- Helps find "the version before X was added"

---

## ✅ Summary

**Even when SteamDB is blocked in the app:**
1. ✅ Open SteamDB in your **browser** (works fine!)
2. ✅ Find the **Depot IDs** you need
3. ✅ Use **"Depot Downloader"** tab in app
4. ✅ Enter IDs **manually**
5. ✅ **Download works perfectly!**

**The app's download functionality is NOT affected by SteamDB blocks!**

Only the automated browsing is blocked. Manual downloads work 100%! 🎉

---

## 🎯 Quick Commands

**For Rust (Windows):**
```
App ID: 252490
Depot ID: 252491
Manifest ID: (empty)
Directory: Your choice
```

**For CS:GO (Windows):**
```
App ID: 730
Depot ID: 731
Manifest ID: (empty)
Directory: Your choice
```

**For TF2 (Windows):**
```
App ID: 440
Depot ID: 441
Manifest ID: (empty)
Directory: Your choice
```

---

**You're all set! Start downloading! 🚀**

Any questions? Check TROUBLESHOOTING.md or open an issue on GitHub!
