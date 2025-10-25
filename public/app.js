// Global state
let currentPage = 'dashboard';
let currentAppId = null;
let activeDownloads = new Map();

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadDashboardStats();
    checkSteamStatus();
});

async function initializeApp() {
    // Load settings
    const settings = await window.api.settings.getAll();
    if (settings.downloadDir) {
        document.getElementById('downloadDir').value = settings.downloadDir;
    }
    
    // Setup download progress listener
    window.api.depot.onProgress((progress) => {
        updateDownloadProgress(progress);
    });
}

// Page Navigation
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page
    document.getElementById(pageName).classList.remove('hidden');
    
    // Update menu active state
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    currentPage = pageName;
    
    // Load page-specific data
    if (pageName === 'history') {
        loadHistory();
    } else if (pageName === 'settings') {
        loadSettings();
    }
}

// Steam Authentication
function showLoginModal() {
    document.getElementById('loginModal').showModal();
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showToast('Please enter username and password', 'error');
        return;
    }
    
    showToast('Logging in...', 'info');
    
    const result = await window.api.steam.login({ username, password });
    
    if (result.success) {
        showToast('Successfully logged in!', 'success');
        document.getElementById('loginModal').close();
        checkSteamStatus();
    } else if (result.requiresGuard) {
        document.getElementById('guardCodeSection').classList.remove('hidden');
        showToast('Steam Guard code required', 'info');
    } else {
        showToast('Login failed: ' + result.error, 'error');
    }
}

async function submitGuardCode() {
    const code = document.getElementById('guardCode').value;
    
    if (!code) {
        showToast('Please enter Steam Guard code', 'error');
        return;
    }
    
    const result = await window.api.steam.submitGuardCode(code);
    
    if (result.success) {
        showToast('Successfully logged in!', 'success');
        document.getElementById('loginModal').close();
        document.getElementById('guardCodeSection').classList.add('hidden');
        checkSteamStatus();
    } else {
        showToast('Invalid code: ' + result.error, 'error');
    }
}

async function logout() {
    const result = await window.api.steam.logout();
    if (result.success) {
        showToast('Logged out successfully', 'success');
        checkSteamStatus();
    }
}

async function checkSteamStatus() {
    const status = await window.api.steam.getStatus();
    const statusEl = document.getElementById('steamStatus');
    
    if (status.loggedIn) {
        statusEl.innerHTML = `<div class="avatar online placeholder"><div class="bg-primary text-neutral-content rounded-full w-10"><span>${status.username.charAt(0).toUpperCase()}</span></div></div>`;
    } else {
        statusEl.innerHTML = '<i class="fas fa-user text-gray-400"></i>';
    }
}

// Depot Downloader
async function startDownload() {
    const appId = document.getElementById('downloadAppId').value;
    const depotId = document.getElementById('downloadDepotId').value;
    const manifestId = document.getElementById('downloadManifestId').value;
    const downloadDir = document.getElementById('downloadDir').value;
    const verify = document.getElementById('verifyFiles').checked;
    
    if (!appId || !depotId) {
        showToast('Please enter App ID and Depot ID', 'error');
        return;
    }
    
    const config = {
        appId: parseInt(appId),
        depotId: parseInt(depotId),
        manifestId: manifestId || null,
        downloadDir: downloadDir || null,
        verify: verify
    };
    
    showToast('Starting download...', 'info');
    
    const result = await window.api.depot.download(config);
    
    if (result.success) {
        showToast('Download started!', 'success');
        activeDownloads.set(result.downloadId, {
            ...config,
            progress: 0,
            status: 'downloading'
        });
        updateActiveDownloadsList();
    } else {
        showToast('Download failed: ' + result.error, 'error');
    }
}

function updateDownloadProgress(progress) {
    const download = activeDownloads.get(progress.downloadId);
    if (download) {
        download.progress = progress.percentage;
        download.status = progress.status;
        download.speed = progress.speed;
        download.eta = progress.eta;
        updateActiveDownloadsList();
        
        if (progress.status === 'completed') {
            showToast('Download completed!', 'success');
            setTimeout(() => {
                activeDownloads.delete(progress.downloadId);
                updateActiveDownloadsList();
                loadDashboardStats();
            }, 3000);
        }
    }
}

function updateActiveDownloadsList() {
    const listEl = document.getElementById('activeDownloadsList');
    
    if (activeDownloads.size === 0) {
        listEl.innerHTML = '<p class="text-center text-gray-500 py-8">No active downloads</p>';
        return;
    }
    
    let html = '';
    activeDownloads.forEach((download, id) => {
        html += `
            <div class="card bg-base-200">
                <div class="card-body p-4">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-bold">App ${download.appId} / Depot ${download.depotId}</h3>
                        <button class="btn btn-sm btn-error" onclick="cancelDownload('${id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <progress class="progress progress-primary w-full" value="${download.progress}" max="100"></progress>
                    <div class="flex justify-between text-sm mt-2">
                        <span>${download.progress.toFixed(1)}%</span>
                        <span>${download.speed || '0 MB/s'}</span>
                        <span>ETA: ${download.eta || 'Calculating...'}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    listEl.innerHTML = html;
    
    // Update dashboard stats
    document.getElementById('activeDownloads').textContent = activeDownloads.size;
}

async function cancelDownload(downloadId) {
    const result = await window.api.depot.cancel(downloadId);
    if (result.success) {
        activeDownloads.delete(downloadId);
        updateActiveDownloadsList();
        showToast('Download cancelled', 'info');
    }
}

// SteamDB Browser
async function searchSteamDB() {
    const appId = document.getElementById('steamdbAppId').value;
    
    if (!appId) {
        showToast('Please enter an App ID', 'error');
        return;
    }
    
    currentAppId = parseInt(appId);
    
    showToast('Loading app information...', 'info');
    
    // Load app info
    const appInfo = await window.api.steamdb.getAppInfo(appId);
    if (appInfo.success) {
        displayAppInfo(appInfo.data);
    } else {
        showToast('Failed to load app info: ' + appInfo.error, 'error');
        return;
    }
    
    // Load depots
    const depots = await window.api.steamdb.getDepots(appId);
    if (depots.success) {
        displayDepots(depots.data);
    }
    
    // Load patch notes
    const patchNotes = await window.api.steamdb.getPatchNotes(appId);
    if (patchNotes.success) {
        displayPatchNotes(patchNotes.data);
    }
    
    document.getElementById('appInfoSection').classList.remove('hidden');
}

function displayAppInfo(data) {
    const appName = data.name || 'Unknown App';
    document.getElementById('appName').innerHTML = `
        ${appName}
        <a href="https://steamdb.info/app/${data.appId}/" 
           target="_blank" 
           class="btn btn-sm btn-ghost ml-2"
           title="View on SteamDB">
            <i class="fas fa-external-link-alt"></i> SteamDB
        </a>
        <a href="https://store.steampowered.com/app/${data.appId}/" 
           target="_blank" 
           class="btn btn-sm btn-ghost"
           title="View on Steam Store">
            <i class="fab fa-steam"></i> Store
        </a>
    `;
    
    const content = document.getElementById('appInfoContent');
    content.innerHTML = `
        <div class="card bg-base-200 p-4">
            <p class="text-sm opacity-70">App ID</p>
            <p class="font-bold text-lg">${data.appId}</p>
        </div>
        <div class="card bg-base-200 p-4">
            <p class="text-sm opacity-70">Type</p>
            <p class="font-bold text-lg">${data.type || 'Unknown'}</p>
        </div>
        <div class="card bg-base-200 p-4">
            <p class="text-sm opacity-70">Last Updated</p>
            <p class="font-bold text-lg">${data.lastUpdated || 'Unknown'}</p>
        </div>
        <div class="card bg-base-200 p-4">
            <p class="text-sm opacity-70">Developer</p>
            <p class="font-bold text-lg">${data.developer || 'Unknown'}</p>
        </div>
    `;
}

function displayDepots(depots) {
    const listEl = document.getElementById('depotsList');
    const selectEl = document.getElementById('depotSelect');
    
    if (!depots || depots.length === 0) {
        listEl.innerHTML = '<p class="text-center text-gray-500 py-4">No depots found</p>';
        return;
    }
    
    // Update depot select
    selectEl.innerHTML = '<option disabled selected>Select a depot</option>';
    depots.forEach(depot => {
        selectEl.innerHTML += `<option value="${depot.depotId}">${depot.name || 'Depot ' + depot.depotId}</option>`;
    });
    
    // Display depot table
    let html = `
        <div class="alert alert-info mb-4">
            <i class="fas fa-info-circle"></i>
            <span>Found ${depots.length} depot(s). Select one below to view its manifest history.</span>
        </div>
        <table class="table table-zebra w-full">
            <thead>
                <tr>
                    <th>Depot ID</th>
                    <th>Name / Description</th>
                    <th>Size</th>
                    <th>Last Update</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    depots.forEach(depot => {
        html += `
            <tr class="hover:bg-base-300">
                <td>
                    <div class="flex items-center gap-2">
                        <code class="bg-base-200 px-2 py-1 rounded">${depot.depotId}</code>
                        <a href="https://steamdb.info/depot/${depot.depotId}/" 
                           target="_blank" 
                           class="btn btn-xs btn-ghost"
                           title="View on SteamDB">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </td>
                <td>
                    <span class="font-semibold">${depot.name || 'Unknown'}</span>
                </td>
                <td><span class="badge badge-outline">${depot.size || 'N/A'}</span></td>
                <td><span class="text-sm">${depot.lastUpdate || 'N/A'}</span></td>
                <td>
                    <div class="flex gap-2">
                        <button class="btn btn-sm btn-primary" 
                                onclick="quickDownloadDepot(${depot.depotId})"
                                title="Download latest version">
                            <i class="fas fa-download mr-1"></i>Download
                        </button>
                        <button class="btn btn-sm btn-secondary" 
                                onclick="viewDepotHistory(${depot.depotId})"
                                title="View build history">
                            <i class="fas fa-history mr-1"></i>History
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    listEl.innerHTML = html;
}

function viewDepotHistory(depotId) {
    document.getElementById('depotSelect').value = depotId;
    loadManifestHistory();
    // Scroll to manifest history section
    document.getElementById('manifestHistory').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function loadManifestHistory() {
    const depotId = document.getElementById('depotSelect').value;
    
    if (!depotId || !currentAppId) return;
    
    showToast('Loading manifest history...', 'info');
    
    const result = await window.api.steamdb.getManifestHistory(currentAppId, depotId);
    
    if (result.success) {
        displayManifestHistory(result.data);
    } else {
        showToast('Failed to load manifest history: ' + result.error, 'error');
    }
}

function displayManifestHistory(manifests) {
    const historyEl = document.getElementById('manifestHistory');
    const depotId = document.getElementById('depotSelect').value;
    
    if (!manifests || manifests.length === 0) {
        historyEl.innerHTML = '<p class="text-center text-gray-500 py-4">No manifest history found</p>';
        return;
    }
    
    let html = `
        <div class="alert alert-info mb-4">
            <i class="fas fa-info-circle"></i>
            <span>Showing ${manifests.length} most recent builds. Click download to get a specific version.</span>
        </div>
        <table class="table table-zebra w-full">
            <thead>
                <tr>
                    <th>Release Date</th>
                    <th>Manifest ID</th>
                    <th>Size</th>
                    <th>Build Changes / Notes</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    manifests.forEach(manifest => {
        const changeDesc = manifest.changes || 'No description available';
        const hasChanges = changeDesc !== 'No description available' && changeDesc !== 'No description';
        const changeClass = hasChanges ? 'text-success' : 'opacity-50';
        
        html += `
            <tr class="manifest-item hover:bg-base-300">
                <td>
                    <div class="flex flex-col">
                        <span class="font-semibold">${manifest.date || 'Unknown'}</span>
                    </div>
                </td>
                <td>
                    <code class="text-xs bg-base-200 px-2 py-1 rounded">${manifest.manifestId}</code>
                    <a href="https://steamdb.info/depot/${depotId}/history/?changeid=M:${manifest.manifestId}" 
                       target="_blank" 
                       class="btn btn-xs btn-ghost ml-2"
                       title="View on SteamDB">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </td>
                <td><span class="badge badge-outline">${manifest.size || 'N/A'}</span></td>
                <td>
                    <div class="max-w-md">
                        <p class="${changeClass} text-sm">${changeDesc}</p>
                    </div>
                </td>
                <td>
                    <div class="flex gap-2">
                        <button class="btn btn-sm btn-primary" 
                                onclick="downloadManifest('${manifest.manifestId}')" 
                                title="Download this build">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-sm btn-ghost" 
                                onclick="copyManifestId('${manifest.manifestId}')" 
                                title="Copy Manifest ID">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    historyEl.innerHTML = html;
}

function displayPatchNotes(notes) {
    const notesEl = document.getElementById('patchNotes');
    
    if (!notes || notes.length === 0) {
        notesEl.innerHTML = '<p class="text-center text-gray-500 py-4">No patch notes available</p>';
        return;
    }
    
    let html = '';
    notes.forEach(note => {
        html += `
            <div class="card bg-base-200">
                <div class="card-body p-4">
                    <h3 class="font-bold">${note.title || 'Update'}</h3>
                    <p class="text-sm opacity-70">${note.date || 'Unknown date'}</p>
                    <p class="mt-2">${note.content || 'No description available'}</p>
                </div>
            </div>
        `;
    });
    
    notesEl.innerHTML = html;
}

function quickDownloadDepot(depotId) {
    document.getElementById('downloadAppId').value = currentAppId;
    document.getElementById('downloadDepotId').value = depotId;
    showPage('downloader');
    showToast('Depot info filled in downloader', 'success');
}

function downloadManifest(manifestId) {
    const depotId = document.getElementById('depotSelect').value;
    document.getElementById('downloadAppId').value = currentAppId;
    document.getElementById('downloadDepotId').value = depotId;
    document.getElementById('downloadManifestId').value = manifestId;
    showPage('downloader');
    showToast('Manifest info filled! Ready to download specific build version.', 'success');
}

function copyManifestId(manifestId) {
    navigator.clipboard.writeText(manifestId).then(() => {
        showToast('Manifest ID copied to clipboard', 'success');
    }).catch(() => {
        showToast('Failed to copy to clipboard', 'error');
    });
}

// History
async function loadHistory() {
    const result = await window.api.depot.getHistory();
    const historyEl = document.getElementById('historyList');
    
    if (!result.success || !result.data || result.data.length === 0) {
        historyEl.innerHTML = '<p class="text-center text-gray-500 py-8">No download history</p>';
        return;
    }
    
    let html = `
        <table class="table table-zebra w-full">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>App ID</th>
                    <th>Depot ID</th>
                    <th>Manifest ID</th>
                    <th>Status</th>
                    <th>Size</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    result.data.forEach(item => {
        const statusBadge = item.status === 'completed' 
            ? '<span class="badge badge-success">Completed</span>'
            : '<span class="badge badge-error">Failed</span>';
        
        html += `
            <tr>
                <td>${new Date(item.date).toLocaleString()}</td>
                <td>${item.appId}</td>
                <td>${item.depotId}</td>
                <td><code class="text-xs">${item.manifestId || 'Latest'}</code></td>
                <td>${statusBadge}</td>
                <td>${item.size || 'N/A'}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    historyEl.innerHTML = html;
}

// Settings
async function loadSettings() {
    const settings = await window.api.settings.getAll();
    
    document.getElementById('settingsDownloadDir').value = settings.downloadDir || '';
    document.getElementById('settingsMaxDownloads').value = settings.maxDownloads || 3;
    document.getElementById('settingsAutoVerify').checked = settings.autoVerify || false;
    document.getElementById('settingsRememberLogin').checked = settings.rememberLogin || false;
}

async function saveSettings() {
    const settings = {
        downloadDir: document.getElementById('settingsDownloadDir').value,
        maxDownloads: parseInt(document.getElementById('settingsMaxDownloads').value),
        autoVerify: document.getElementById('settingsAutoVerify').checked,
        rememberLogin: document.getElementById('settingsRememberLogin').checked
    };
    
    await window.api.settings.set('downloadDir', settings.downloadDir);
    await window.api.settings.set('maxDownloads', settings.maxDownloads);
    await window.api.settings.set('autoVerify', settings.autoVerify);
    await window.api.settings.set('rememberLogin', settings.rememberLogin);
    
    showToast('Settings saved successfully', 'success');
}

// Dashboard Stats
async function loadDashboardStats() {
    const history = await window.api.depot.getHistory();
    
    if (history.success && history.data) {
        document.getElementById('totalDownloads').textContent = history.data.length;
        
        let totalSize = 0;
        history.data.forEach(item => {
            if (item.sizeBytes) {
                totalSize += item.sizeBytes;
            }
        });
        
        document.getElementById('storageUsed').textContent = formatBytes(totalSize);
    }
}

// Utilities
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    const alertClass = {
        success: 'alert-success',
        error: 'alert-error',
        info: 'alert-info',
        warning: 'alert-warning'
    }[type] || 'alert-info';
    
    toast.className = `alert ${alertClass} shadow-lg mb-2`;
    toast.innerHTML = `
        <div>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
