# Astolfo Depot Manager

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Electron](https://img.shields.io/badge/Electron-27.1.0-47848F.svg)
![Node](https://img.shields.io/badge/Node-18+-339933.svg)

**Advanced Steam Depot Downloader with SteamDB Integration**

A modern, feature-rich alternative to DepotDownloader GUI with real-time SteamDB data integration, beautiful UI powered by daisyUI, and comprehensive Steam authentication support.

[Features](#features) • [Installation](#installation) • [Quick Update](#-updating-easy-way) • [Usage](#usage) • [Documentation](#-documentation)

</div>

---

## ✨ Features

### 🎨 Modern UI
- **Beautiful Interface** - Built with daisyUI and Tailwind CSS
- **Dark Theme** - Easy on the eyes with gradient accents
- **Responsive Design** - Works perfectly on any screen size
- **Intuitive Navigation** - Clean sidebar navigation with icon indicators

### 🔐 Steam Authentication
- **Full Steam Login Support** - Login with username and password
- **Steam Guard Integration** - Support for Steam Guard 2FA codes
- **Session Persistence** - Remember login credentials securely
- **Token Management** - Automatic refresh token handling

### 📦 Depot Management
- **Easy Downloads** - Simple interface to download any Steam depot
- **Manifest Selection** - Choose specific build versions
- **Progress Tracking** - Real-time download progress with speed and ETA
- **Verification** - Optional file verification after download
- **Multiple Downloads** - Support for concurrent downloads
- **Download History** - Track all your previous downloads

### 🗄️ SteamDB Integration
- **App Information** - View detailed app info from SteamDB
- **Depot Browser** - Browse all available depots for any game
- **Manifest History** - View complete manifest history with dates
- **Build Changes** - See what changed in each build/update
- **Patch Notes** - Read patch notes directly in the app
- **Release Dates** - View exact release dates for each build
- **Quick Download** - One-click download from SteamDB browser

### 🛠️ Advanced Features
- **Download Queue** - Queue multiple downloads
- **Custom Directories** - Set custom download locations
- **Settings Persistence** - All settings saved automatically
- **Export History** - Export download history
- **Search Functionality** - Search for apps on SteamDB

---

## 📋 Requirements

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Steam Account** (for downloading depots)
- **Internet Connection** (for SteamDB integration)

---

## 🚀 Installation

### Quick Start (First Time)

1. **Clone the repository**
```bash
git clone https://github.com/Arionyxx/Astolfo-Depot-Manager.git
cd Astolfo-Depot-Manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
npm start
```

### 🔄 Updating (Easy Way)

**Don't redownload everything!** Just update the changes:

**Windows:** Double-click `update.bat`

**Mac/Linux:** Double-click `update.sh` (make executable first)

**Or use command:**
```bash
cd Astolfo-Depot-Manager
git pull origin main
npm install
npm start
```

📖 See [UPDATE_GUIDE.md](UPDATE_GUIDE.md) for detailed update instructions

📚 See [QUICK_START.md](QUICK_START.md) for complete beginner's guide

### Development Mode

Run with developer tools open:
```bash
npm run dev
```

### Build Executables

Build for your platform:
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux

# All platforms
npm run build
```

---

## 📖 Usage

### 1. Login to Steam

1. Click the user icon in the top-right corner
2. Enter your Steam username and password
3. If Steam Guard is enabled, enter the code when prompted
4. You're logged in! The icon will show your username initial

### 2. Browse SteamDB

1. Navigate to **SteamDB Browser** from the sidebar
2. Enter an App ID (e.g., `730` for CS:GO)
3. Click **Search**
4. View:
   - App information and metadata
   - Available depots with sizes
   - Complete manifest history
   - Build changes and patch notes

### 3. Download Depots

#### Method A: From SteamDB Browser
1. Browse to an app in SteamDB Browser
2. Click the download button next to any depot
3. Or select a specific manifest from the history
4. The downloader will auto-fill with the selected info

#### Method B: Manual Entry
1. Navigate to **Depot Downloader** from the sidebar
2. Enter:
   - **App ID** - The Steam app ID
   - **Depot ID** - The depot you want to download
   - **Manifest ID** (optional) - Specific build version
   - **Download Directory** - Where to save files
3. Check **Verify files** if you want hash verification
4. Click **Start Download**

### 4. Track Progress

- View real-time download progress
- See download speed and ETA
- Cancel downloads if needed
- Check download history

### 5. Settings

Configure the app to your preferences:
- Default download directory
- Max concurrent downloads
- Auto-verify downloads
- Remember login credentials

---

## 🎯 Key Improvements Over DepotDownloader GUI

| Feature | DepotDownloader GUI | Astolfo Depot Manager |
|---------|-------------------|----------------------|
| **UI Framework** | Basic WinForms | Modern daisyUI + Tailwind |
| **SteamDB Integration** | ❌ None | ✅ Full integration |
| **Manifest History** | ❌ Manual lookup | ✅ Browse in-app |
| **Build Information** | ❌ Not available | ✅ Shows changes/notes |
| **Release Dates** | ❌ Not shown | ✅ Full date history |
| **Patch Notes** | ❌ Not available | ✅ Integrated viewer |
| **Steam Guard** | ⚠️ Basic | ✅ Full 2FA support |
| **Download Queue** | ⚠️ Limited | ✅ Multiple concurrent |
| **Progress Tracking** | ⚠️ Basic | ✅ Real-time with speed/ETA |
| **Download History** | ❌ Not saved | ✅ Full history with search |
| **Cross-Platform** | ❌ Windows only | ✅ Windows, Mac, Linux |

---

## 🏗️ Architecture

```
Astolfo-Depot-Manager/
├── src/
│   ├── main.js              # Electron main process
│   ├── preload.js           # Context bridge
│   └── services/
│       ├── steamAuth.js      # Steam authentication
│       ├── depotDownloader.js # Depot download logic
│       └── steamdbScraper.js  # SteamDB integration
├── public/
│   ├── index.html           # Main UI
│   └── app.js               # Frontend logic
├── package.json
└── README.md
```

### Technologies Used

- **Electron** - Desktop application framework
- **daisyUI** - UI component library
- **Tailwind CSS** - Utility-first CSS
- **steam-user** - Steam client library
- **axios** - HTTP client
- **cheerio** - Web scraping for SteamDB
- **electron-store** - Settings persistence

---

## 🔧 Development

### Project Structure

- **Main Process** (`src/main.js`) - Handles Electron lifecycle and IPC
- **Preload Script** (`src/preload.js`) - Secure bridge between main and renderer
- **Renderer Process** (`public/`) - UI and user interaction
- **Services** (`src/services/`) - Backend logic for Steam and SteamDB

### Adding Features

1. **Backend**: Add functionality to services in `src/services/`
2. **IPC**: Register handlers in `src/main.js`
3. **Frontend**: Add UI in `public/index.html` and logic in `public/app.js`

### Debug Mode

```bash
npm run dev
```
This opens DevTools automatically for debugging.

---

## 📸 Screenshots

### Dashboard
Clean overview with statistics and quick start guide

### Depot Downloader
Intuitive download configuration with real-time progress

### SteamDB Browser
Browse apps, depots, manifests, and patch notes all in one place

### Settings
Customize the app to your preferences

---

## ⚙️ Configuration

Settings are stored in your user data directory:
- **Windows**: `%APPDATA%/astolfo-depot-manager/`
- **macOS**: `~/Library/Application Support/astolfo-depot-manager/`
- **Linux**: `~/.config/astolfo-depot-manager/`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## ⚠️ Disclaimer

This tool is for educational and backup purposes only. Users are responsible for complying with Steam's Terms of Service and Subscriber Agreement. The authors are not responsible for any misuse of this software.

---

## 🙏 Acknowledgments

- Steam and Valve Corporation for the Steam platform
- SteamDB for providing valuable depot information
- The DepotDownloader project for inspiration
- daisyUI and Tailwind CSS for the beautiful UI components

---

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Complete beginner's guide
- **[UPDATE_GUIDE.md](UPDATE_GUIDE.md)** - How to update without redownloading
- **[FIXES.md](FIXES.md)** - Recent bug fixes and improvements
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute

## 📞 Support

If you encounter any issues or have questions:
- Check [QUICK_START.md](QUICK_START.md) for setup help
- Check [UPDATE_GUIDE.md](UPDATE_GUIDE.md) for update issues
- Check [FIXES.md](FIXES.md) for known issues and solutions
- Open an issue on GitHub
- Check existing issues for solutions

---

<div align="center">

**Made with ❤️ by arifemboy**

⭐ Star this repo if you find it useful!

</div>
