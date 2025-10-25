# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-25

### Added
- Initial release of Astolfo Depot Manager
- Modern UI with daisyUI and Tailwind CSS
- Steam authentication with Steam Guard support
- Depot downloader with progress tracking
- SteamDB integration for browsing apps and depots
- Manifest history viewer with build information
- Patch notes reader
- Download history tracking
- Settings persistence
- Cross-platform support (Windows, macOS, Linux)
- Real-time download progress with speed and ETA
- Multiple concurrent downloads support
- Download verification option
- Quick download from SteamDB browser
- Session token management
- Dark theme with gradient accents

### Features
- **Dashboard**: Overview with statistics and quick start guide
- **Depot Downloader**: Configure and manage depot downloads
- **SteamDB Browser**: Browse apps, depots, and manifests
- **Download History**: Track all your downloads
- **Settings**: Customize the application

### Technical
- Built with Electron 27.1.0
- Uses steam-user for Steam authentication
- Axios and Cheerio for SteamDB scraping
- Electron-store for settings persistence
- IPC communication between main and renderer processes
