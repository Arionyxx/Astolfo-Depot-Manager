const SteamUser = require('steam-user');

class SteamAuth {
  constructor(store) {
    this.store = store;
    this.client = new SteamUser();
    this.isLoggedIn = false;
    this.username = null;
    this.pendingGuardCallback = null;

    // Setup event listeners
    this.setupListeners();
  }

  setupListeners() {
    this.client.on('loggedOn', () => {
      this.isLoggedIn = true;
      console.log('Logged into Steam');
    });

    this.client.on('steamGuard', (domain, callback) => {
      console.log('Steam Guard code required');
      this.pendingGuardCallback = callback;
    });

    this.client.on('error', (err) => {
      console.error('Steam error:', err);
      this.isLoggedIn = false;
    });

    this.client.on('disconnected', () => {
      console.log('Disconnected from Steam');
      this.isLoggedIn = false;
    });
  }

  async login(credentials) {
    return new Promise((resolve) => {
      this.username = credentials.username;

      const logOnOptions = {
        accountName: credentials.username,
        password: credentials.password
      };

      // Check for saved login tokens
      const savedToken = this.store.get('steamRefreshToken');
      if (savedToken) {
        logOnOptions.refreshToken = savedToken;
      }

      this.client.once('loggedOn', () => {
        // Save refresh token for future logins
        if (this.client.refreshToken) {
          this.store.set('steamRefreshToken', this.client.refreshToken);
        }
        resolve({ success: true });
      });

      this.client.once('steamGuard', () => {
        resolve({ success: false, requiresGuard: true });
      });

      this.client.once('error', (err) => {
        resolve({ success: false, error: err.message });
      });

      this.client.logOn(logOnOptions);
    });
  }

  async submitGuardCode(code) {
    return new Promise((resolve) => {
      if (!this.pendingGuardCallback) {
        resolve({ success: false, error: 'No pending Steam Guard request' });
        return;
      }

      this.client.once('loggedOn', () => {
        if (this.client.refreshToken) {
          this.store.set('steamRefreshToken', this.client.refreshToken);
        }
        this.pendingGuardCallback = null;
        resolve({ success: true });
      });

      this.client.once('error', (err) => {
        resolve({ success: false, error: err.message });
      });

      this.pendingGuardCallback(code);
    });
  }

  logout() {
    this.client.logOff();
    this.isLoggedIn = false;
    this.username = null;
    this.store.delete('steamRefreshToken');
    return { success: true };
  }

  getStatus() {
    return {
      loggedIn: this.isLoggedIn,
      username: this.username
    };
  }

  getClient() {
    return this.client;
  }
}

module.exports = SteamAuth;
