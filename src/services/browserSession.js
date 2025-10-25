const { BrowserWindow } = require('electron');
const axios = require('axios');

class BrowserSession {
  constructor() {
    this.sessionWindow = null;
    this.cookies = null;
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  }

  async openSteamDBWindow(url) {
    return new Promise((resolve, reject) => {
      // Create a browser window for user to solve Cloudflare
      this.sessionWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'Solve Cloudflare Challenge - SteamDB',
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          javascript: true
        }
      });

      // Load SteamDB
      this.sessionWindow.loadURL(url || 'https://steamdb.info');

      // Show instructions
      this.sessionWindow.webContents.on('did-finish-load', () => {
        this.sessionWindow.webContents.executeJavaScript(`
          // Add a banner to help user
          const banner = document.createElement('div');
          banner.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; background: #667eea; color: white; padding: 15px; text-align: center; z-index: 99999; font-family: Arial;';
          banner.innerHTML = '<strong>Complete the Cloudflare challenge if shown, then this window will close automatically.</strong><br>Browse SteamDB normally - the app will capture your session.';
          document.body.insertBefore(banner, document.body.firstChild);
        `);
      });

      // Monitor for successful load (passed Cloudflare)
      let checkCount = 0;
      const checkInterval = setInterval(async () => {
        checkCount++;
        
        try {
          const currentUrl = this.sessionWindow.webContents.getURL();
          const title = this.sessionWindow.webContents.getTitle();
          
          // Check if we're past Cloudflare (page loaded normally)
          if (currentUrl.includes('steamdb.info') && 
              !title.includes('Just a moment') && 
              !title.includes('Cloudflare')) {
            
            // Get cookies from the session
            const cookies = await this.sessionWindow.webContents.session.cookies.get({
              domain: '.steamdb.info'
            });
            
            if (cookies.length > 0) {
              clearInterval(checkInterval);
              this.cookies = cookies;
              
              // Show success message
              this.sessionWindow.webContents.executeJavaScript(`
                const banner = document.querySelector('div');
                if (banner) {
                  banner.style.background = '#48bb78';
                  banner.innerHTML = '<strong>✅ Success! Session captured. This window will close in 2 seconds...</strong>';
                }
              `);
              
              setTimeout(() => {
                if (this.sessionWindow) {
                  this.sessionWindow.close();
                  this.sessionWindow = null;
                }
                resolve({ success: true, cookies: this.cookies });
              }, 2000);
            }
          }
        } catch (error) {
          // Window might be closed
        }
        
        // Timeout after 2 minutes
        if (checkCount > 120) {
          clearInterval(checkInterval);
          if (this.sessionWindow) {
            this.sessionWindow.close();
            this.sessionWindow = null;
          }
          reject(new Error('Timeout waiting for Cloudflare challenge'));
        }
      }, 1000);

      // Handle manual close
      this.sessionWindow.on('closed', () => {
        clearInterval(checkInterval);
        this.sessionWindow = null;
        if (!this.cookies) {
          reject(new Error('Window closed before session captured'));
        }
      });
    });
  }

  getCookieString() {
    if (!this.cookies) return '';
    return this.cookies.map(c => `${c.name}=${c.value}`).join('; ');
  }

  getAxiosConfig() {
    return {
      headers: {
        'User-Agent': this.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': this.getCookieString(),
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
      },
      timeout: 15000
    };
  }

  hasValidSession() {
    return this.cookies && this.cookies.length > 0;
  }

  clearSession() {
    this.cookies = null;
  }
}

module.exports = BrowserSession;
