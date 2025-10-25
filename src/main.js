const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');
const SteamAuth = require('./services/steamAuth');
const DepotDownloader = require('./services/depotDownloader');
const SteamDBScraper = require('./services/steamdbScraper');

const store = new Store();
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    backgroundColor: '#1a1a2e',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/icon.png'),
    frame: true,
    titleBarStyle: 'default'
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
const steamAuth = new SteamAuth(store);
const depotDownloader = new DepotDownloader(store);
const steamdbScraper = new SteamDBScraper();

// Steam Authentication
ipcMain.handle('steam:login', async (event, credentials) => {
  try {
    return await steamAuth.login(credentials);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('steam:logout', async () => {
  return steamAuth.logout();
});

ipcMain.handle('steam:getStatus', async () => {
  return steamAuth.getStatus();
});

ipcMain.handle('steam:submitGuardCode', async (event, code) => {
  return steamAuth.submitGuardCode(code);
});

// Depot Operations
ipcMain.handle('depot:download', async (event, config) => {
  try {
    return await depotDownloader.startDownload(config, (progress) => {
      mainWindow.webContents.send('depot:progress', progress);
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('depot:cancel', async (event, downloadId) => {
  return depotDownloader.cancelDownload(downloadId);
});

ipcMain.handle('depot:getHistory', async () => {
  return depotDownloader.getDownloadHistory();
});

// SteamDB Integration
ipcMain.handle('steamdb:getAppInfo', async (event, appId) => {
  try {
    return await steamdbScraper.getAppInfo(appId);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('steamdb:getDepots', async (event, appId) => {
  try {
    return await steamdbScraper.getDepots(appId);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('steamdb:getManifestHistory', async (event, appId, depotId) => {
  try {
    return await steamdbScraper.getManifestHistory(appId, depotId);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('steamdb:getPatchNotes', async (event, appId) => {
  try {
    return await steamdbScraper.getPatchNotes(appId);
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Settings
ipcMain.handle('settings:get', async (event, key) => {
  return store.get(key);
});

ipcMain.handle('settings:set', async (event, key, value) => {
  store.set(key, value);
  return { success: true };
});

ipcMain.handle('settings:getAll', async () => {
  return store.store;
});
