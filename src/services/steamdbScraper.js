const axios = require('axios');
const cheerio = require('cheerio');

class SteamDBScraper {
  constructor() {
    this.baseUrl = 'https://steamdb.info';
    this.requestQueue = [];
    this.isProcessing = false;
    this.lastRequestTime = 0;
    this.minRequestInterval = 2000; // 2 seconds between requests
    this.requestsPerMinute = 20;
    this.requestTimestamps = [];
    
    this.axiosInstance = axios.create({
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
      },
      timeout: 15000
    });
  }

  async throttleRequest() {
    const now = Date.now();
    
    // Remove timestamps older than 1 minute
    this.requestTimestamps = this.requestTimestamps.filter(ts => now - ts < 60000);
    
    // Check if we've exceeded requests per minute
    if (this.requestTimestamps.length >= this.requestsPerMinute) {
      const oldestRequest = this.requestTimestamps[0];
      const waitTime = 60000 - (now - oldestRequest);
      if (waitTime > 0) {
        console.log(`Rate limit: waiting ${waitTime}ms`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    // Ensure minimum interval between requests
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
    this.requestTimestamps.push(this.lastRequestTime);
  }

  async makeRequest(url, options = {}) {
    await this.throttleRequest();
    
    try {
      const response = await this.axiosInstance.get(url, options);
      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          throw new Error('Access denied by SteamDB. Please wait a few minutes before trying again.');
        } else if (error.response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait before making more requests.');
        }
      }
      throw error;
    }
  }

  async getAppInfo(appId) {
    try {
      const url = `${this.baseUrl}/app/${appId}/`;
      const response = await this.makeRequest(url);
      const $ = cheerio.load(response.data);

      const appInfo = {
        appId: appId,
        name: $('h1[itemprop="name"]').first().text().trim() || $('td[itemprop="name"]').text().trim(),
        type: $('.app-type').text().trim(),
        developer: $('td:contains("Developer")').next().text().trim(),
        publisher: $('td:contains("Publisher")').next().text().trim(),
        lastUpdated: $('td:contains("Last Record Update")').next().attr('title') || 
                      $('td:contains("Last Update")').next().text().trim()
      };

      return { success: true, data: appInfo };
    } catch (error) {
      console.error('Error fetching app info:', error.message);
      return { success: false, error: error.message };
    }
  }

  async getDepots(appId) {
    try {
      const url = `${this.baseUrl}/app/${appId}/depots/`;
      const response = await this.makeRequest(url);
      const $ = cheerio.load(response.data);

      const depots = [];
      
      // Parse depot table
      $('table.table-responsive tbody tr').each((i, elem) => {
        const depotId = $(elem).find('td').eq(0).text().trim();
        const name = $(elem).find('td').eq(1).text().trim();
        const size = $(elem).find('td').eq(2).text().trim();
        const lastUpdate = $(elem).find('td').eq(3).text().trim();

        if (depotId && !isNaN(depotId)) {
          depots.push({
            depotId: parseInt(depotId),
            name: name || `Depot ${depotId}`,
            size: size || 'Unknown',
            lastUpdate: lastUpdate || 'Unknown'
          });
        }
      });

      return { success: true, data: depots };
    } catch (error) {
      console.error('Error fetching depots:', error.message);
      return { success: false, error: error.message };
    }
  }

  async getManifestHistory(appId, depotId) {
    try {
      const url = `${this.baseUrl}/depot/${depotId}/history/`;
      const response = await this.makeRequest(url);
      const $ = cheerio.load(response.data);

      const manifests = [];

      // Parse manifest history table
      $('table.table-responsive tbody tr').each((i, elem) => {
        const date = $(elem).find('td').eq(0).text().trim();
        const manifestId = $(elem).find('td').eq(1).text().trim();
        const size = $(elem).find('td').eq(2).text().trim();
        const changes = $(elem).find('td').eq(3).text().trim();

        if (manifestId && manifestId !== '0') {
          manifests.push({
            date: date || 'Unknown',
            manifestId: manifestId,
            size: size || 'Unknown',
            changes: changes || 'No description available'
          });
        }
      });

      // Limit to 50 most recent manifests
      return { success: true, data: manifests.slice(0, 50) };
    } catch (error) {
      console.error('Error fetching manifest history:', error.message);
      return { success: false, error: error.message };
    }
  }

  async getPatchNotes(appId) {
    try {
      const url = `${this.baseUrl}/app/${appId}/patchnotes/`;
      const response = await this.makeRequest(url);
      const $ = cheerio.load(response.data);

      const patchNotes = [];

      // Parse patch notes
      $('.patchnote').each((i, elem) => {
        const title = $(elem).find('.patchnote-title').text().trim();
        const date = $(elem).find('.patchnote-date').text().trim();
        const content = $(elem).find('.patchnote-content').text().trim();

        if (title || content) {
          patchNotes.push({
            title: title || 'Update',
            date: date || 'Unknown date',
            content: content || 'No description available'
          });
        }
      });

      // If no patch notes found with the above selectors, try alternative method
      if (patchNotes.length === 0) {
        $('.change-row').slice(0, 10).each((i, elem) => {
          const date = $(elem).find('td').eq(0).text().trim();
          const description = $(elem).find('td').eq(1).text().trim();

          patchNotes.push({
            title: 'Update',
            date: date || 'Unknown',
            content: description || 'Update made to the app'
          });
        });
      }

      return { success: true, data: patchNotes.slice(0, 20) };
    } catch (error) {
      console.error('Error fetching patch notes:', error.message);
      // Return empty array instead of error to not break the UI
      return { success: true, data: [] };
    }
  }

  async searchApps(query) {
    try {
      const url = `${this.baseUrl}/search/`;
      const response = await this.makeRequest(url, {
        params: { a: 'app', q: query }
      });
      const $ = cheerio.load(response.data);

      const results = [];

      $('table.table-responsive tbody tr').slice(0, 10).each((i, elem) => {
        const appId = $(elem).find('td').eq(0).text().trim();
        const name = $(elem).find('td').eq(1).text().trim();
        const type = $(elem).find('td').eq(2).text().trim();

        if (appId && !isNaN(appId)) {
          results.push({
            appId: parseInt(appId),
            name: name,
            type: type
          });
        }
      });

      return { success: true, data: results };
    } catch (error) {
      console.error('Error searching apps:', error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = SteamDBScraper;
