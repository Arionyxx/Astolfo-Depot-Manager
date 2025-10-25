const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

class DepotDownloader {
  constructor(store) {
    this.store = store;
    this.activeDownloads = new Map();
    this.downloadHistory = [];
    this.loadHistory();
  }

  async loadHistory() {
    const history = this.store.get('downloadHistory');
    if (history) {
      this.downloadHistory = history;
    }
  }

  async saveHistory() {
    this.store.set('downloadHistory', this.downloadHistory);
  }

  async startDownload(config, progressCallback) {
    const downloadId = crypto.randomBytes(16).toString('hex');
    
    // Validate config
    if (!config.appId || !config.depotId) {
      throw new Error('App ID and Depot ID are required');
    }

    // Get download directory
    const downloadDir = config.downloadDir || this.store.get('downloadDir') || path.join(process.cwd(), 'downloads');
    
    // Create download directory if it doesn't exist
    try {
      await fs.mkdir(downloadDir, { recursive: true });
    } catch (err) {
      console.error('Error creating download directory:', err);
    }

    // Build DepotDownloader command
    // Note: This assumes DepotDownloader is installed and available
    // You may need to adjust the path to DepotDownloader executable
    const args = [
      '-app', config.appId.toString(),
      '-depot', config.depotId.toString(),
      '-dir', downloadDir
    ];

    if (config.manifestId) {
      args.push('-manifest', config.manifestId);
    }

    if (config.verify) {
      args.push('-validate');
    }

    // Get Steam credentials from store
    const username = this.store.get('steamUsername');
    const password = this.store.get('steamPassword');

    if (username && password) {
      args.push('-username', username);
      args.push('-password', password);
    }

    // Store download info
    const downloadInfo = {
      id: downloadId,
      config,
      startTime: Date.now(),
      status: 'starting',
      progress: 0
    };

    this.activeDownloads.set(downloadId, downloadInfo);

    // Start the download process (simulated for now)
    // In a real implementation, you would use the actual DepotDownloader executable
    this.simulateDownload(downloadId, progressCallback);

    return { success: true, downloadId };
  }

  // Simulated download for demonstration
  simulateDownload(downloadId, progressCallback) {
    const download = this.activeDownloads.get(downloadId);
    if (!download) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        download.status = 'completed';
        download.endTime = Date.now();
        download.progress = 100;
        
        // Add to history
        this.downloadHistory.push({
          appId: download.config.appId,
          depotId: download.config.depotId,
          manifestId: download.config.manifestId,
          date: download.startTime,
          status: 'completed',
          size: Math.floor(Math.random() * 10000000000), // Random size for demo
          sizeBytes: Math.floor(Math.random() * 10000000000)
        });
        
        this.saveHistory();
        
        progressCallback({
          downloadId,
          status: 'completed',
          percentage: 100
        });
        
        return;
      }

      download.progress = progress;
      download.status = 'downloading';

      const speed = (Math.random() * 50 + 10).toFixed(2) + ' MB/s';
      const eta = Math.floor((100 - progress) / 2) + ' seconds';

      progressCallback({
        downloadId,
        status: 'downloading',
        percentage: progress,
        speed,
        eta
      });
    }, 500);

    download.interval = interval;
  }

  async cancelDownload(downloadId) {
    const download = this.activeDownloads.get(downloadId);
    
    if (!download) {
      return { success: false, error: 'Download not found' };
    }

    if (download.interval) {
      clearInterval(download.interval);
    }

    if (download.process) {
      download.process.kill();
    }

    this.activeDownloads.delete(downloadId);

    return { success: true };
  }

  getDownloadHistory() {
    return { success: true, data: this.downloadHistory };
  }

  getActiveDownloads() {
    return Array.from(this.activeDownloads.values());
  }
}

module.exports = DepotDownloader;
