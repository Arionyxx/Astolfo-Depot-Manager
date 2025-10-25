const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Steam Authentication
  steam: {
    login: (credentials) => ipcRenderer.invoke('steam:login', credentials),
    logout: () => ipcRenderer.invoke('steam:logout'),
    getStatus: () => ipcRenderer.invoke('steam:getStatus'),
    submitGuardCode: (code) => ipcRenderer.invoke('steam:submitGuardCode', code)
  },

  // Depot Operations
  depot: {
    download: (config) => ipcRenderer.invoke('depot:download', config),
    cancel: (downloadId) => ipcRenderer.invoke('depot:cancel', downloadId),
    getHistory: () => ipcRenderer.invoke('depot:getHistory'),
    onProgress: (callback) => {
      ipcRenderer.on('depot:progress', (event, progress) => callback(progress));
    }
  },

  // SteamDB Integration
  steamdb: {
    getAppInfo: (appId) => ipcRenderer.invoke('steamdb:getAppInfo', appId),
    getDepots: (appId) => ipcRenderer.invoke('steamdb:getDepots', appId),
    getManifestHistory: (appId, depotId) => ipcRenderer.invoke('steamdb:getManifestHistory', appId, depotId),
    getPatchNotes: (appId) => ipcRenderer.invoke('steamdb:getPatchNotes', appId),
    solveCaptcha: (url) => ipcRenderer.invoke('steamdb:solveCaptcha', url),
    clearSession: () => ipcRenderer.invoke('steamdb:clearSession')
  },

  // Settings
  settings: {
    get: (key) => ipcRenderer.invoke('settings:get', key),
    set: (key, value) => ipcRenderer.invoke('settings:set', key, value),
    getAll: () => ipcRenderer.invoke('settings:getAll')
  }
});
