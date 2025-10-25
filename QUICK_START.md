# 🚀 Quick Start Guide

## First Time Setup

### 1. Install Prerequisites

**Node.js (Required)**
- Download from: https://nodejs.org/
- Install version 18 or higher
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

**Git (Required)**
- Download from: https://git-scm.com/
- Install with default settings
- Verify installation:
  ```bash
  git --version
  ```

### 2. Clone the Repository

```bash
# Open Command Prompt / Terminal
# Navigate to where you want to install (e.g., C:\Projects)
cd C:\Projects

# Clone the repository
git clone https://github.com/Arionyxx/Astolfo-Depot-Manager.git

# Enter the directory
cd Astolfo-Depot-Manager
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

```bash
npm start
```

## 🔄 Updating (Easy Way)

Just double-click one of these files:

**Windows:**
- Double-click `update.bat`

**Mac/Linux:**
- Right-click `update.sh` → Properties → Make executable
- Double-click `update.sh`

Or use the command:
```bash
cd Astolfo-Depot-Manager
git pull origin main
npm install
npm start
```

## 🎮 Using the Application

### Step 1: Login to Steam
1. Click the user icon (top right)
2. Enter your Steam username and password
3. Enter Steam Guard code if prompted
4. You're logged in! ✅

### Step 2: Browse SteamDB
1. Click "SteamDB Browser" in sidebar
2. Enter an App ID (e.g., `730` for CS:GO)
3. Click "Search"
4. View:
   - App information
   - Available depots
   - Build history with release dates
   - What changed in each update

### Step 3: Download a Depot

**Method A: From SteamDB Browser**
1. Browse to an app
2. Click "History" on a depot
3. Find the build you want
4. Click the download button
5. Info auto-fills in downloader!

**Method B: Manual Entry**
1. Click "Depot Downloader" in sidebar
2. Enter:
   - App ID (e.g., `730`)
   - Depot ID (e.g., `731`)
   - Manifest ID (optional - for specific version)
   - Download directory
3. Click "Start Download"

## 📊 Common App IDs

| Game | App ID | Description |
|------|--------|-------------|
| CS:GO | 730 | Counter-Strike: Global Offensive |
| TF2 | 440 | Team Fortress 2 |
| Dota 2 | 570 | Dota 2 |
| Left 4 Dead 2 | 550 | Left 4 Dead 2 |
| Portal 2 | 620 | Portal 2 |
| Garry's Mod | 4000 | Garry's Mod |
| Rust | 252490 | Rust |
| ARK | 346110 | ARK: Survival Evolved |

Find more at: https://steamdb.info/

## ⚙️ Configuration

### Settings Page
1. Click "Settings" in sidebar
2. Configure:
   - Default download directory
   - Max concurrent downloads
   - Auto-verify downloads
   - Remember login credentials
3. Click "Save Settings"

### File Locations

**Windows:**
- Settings: `%APPDATA%/astolfo-depot-manager/`
- Downloads: `C:\Users\YourName\Downloads\Depots\` (default)

**Mac:**
- Settings: `~/Library/Application Support/astolfo-depot-manager/`
- Downloads: `~/Downloads/Depots/` (default)

**Linux:**
- Settings: `~/.config/astolfo-depot-manager/`
- Downloads: `~/Downloads/Depots/` (default)

## 🐛 Troubleshooting

### "403 Forbidden" from SteamDB
- ✅ **Fixed!** App now has rate limiting
- Wait 2 seconds between searches
- Max 20 requests per minute
- If still happening, wait a few minutes

### Login not working
- Check Steam username/password
- Make sure Steam Guard is working
- Enter the code from your email/app
- Try logging in again

### Download fails
- Make sure you're logged into Steam
- Check if you own the game (for some content)
- Verify App ID and Depot ID are correct
- Check your internet connection

### App won't start
```bash
# Reinstall dependencies
npm install

# Clear cache
npm cache clean --force
npm install

# Check Node.js version
node --version  # Should be 18+
```

## 🎯 Pro Tips

1. **Save Manifests** - Copy manifest IDs for builds you want to keep
2. **Use History** - Browse build history to find specific versions
3. **Check Patch Notes** - See what changed before downloading
4. **Bookmark Games** - Save App IDs of games you download often
5. **Organize Downloads** - Set custom directories per game

## 📚 Learn More

- **Full Documentation:** [README.md](README.md)
- **Update Guide:** [UPDATE_GUIDE.md](UPDATE_GUIDE.md)
- **Recent Fixes:** [FIXES.md](FIXES.md)
- **Changelog:** [CHANGELOG.md](CHANGELOG.md)

## 🆘 Getting Help

1. Check [UPDATE_GUIDE.md](UPDATE_GUIDE.md) for update issues
2. Check [FIXES.md](FIXES.md) for known issues
3. Check GitHub Issues: https://github.com/Arionyxx/Astolfo-Depot-Manager/issues
4. Create a new issue if needed

## 🎉 You're Ready!

That's it! You now have:
- ✅ A working Steam Depot Downloader
- ✅ Full SteamDB integration
- ✅ Build history and changelogs
- ✅ Easy update system
- ✅ Better than DepotDownloader GUI!

**Enjoy downloading! 🚀**

---

**Quick Commands:**
```bash
# Update
git pull origin main && npm install

# Run
npm start

# Build for release
npm run build

# Run in dev mode
npm run dev
```
