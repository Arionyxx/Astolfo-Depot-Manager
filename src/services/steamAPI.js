const axios = require('axios');

class SteamAPI {
  constructor() {
    this.baseUrl = 'https://api.steampowered.com';
    this.storeUrl = 'https://store.steampowered.com/api';
    
    this.axiosInstance = axios.create({
      timeout: 10000
    });
  }

  async getAppDetails(appId) {
    try {
      const url = `${this.storeUrl}/appdetails`;
      const response = await this.axiosInstance.get(url, {
        params: {
          appids: appId,
          l: 'english'
        }
      });

      const data = response.data[appId];
      if (!data || !data.success) {
        throw new Error('App not found');
      }

      return {
        success: true,
        data: {
          appId: appId,
          name: data.data.name,
          type: data.data.type,
          developer: data.data.developers ? data.data.developers.join(', ') : 'Unknown',
          publisher: data.data.publishers ? data.data.publishers.join(', ') : 'Unknown',
          description: data.data.short_description,
          releaseDate: data.data.release_date ? data.data.release_date.date : 'Unknown',
          headerImage: data.data.header_image
        }
      };
    } catch (error) {
      console.error('Error fetching app details from Steam API:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Get package info (can sometimes show depot info)
  async getPackageDetails(packageId) {
    try {
      const url = `${this.storeUrl}/packagedetails`;
      const response = await this.axiosInstance.get(url, {
        params: {
          packageids: packageId
        }
      });

      return {
        success: true,
        data: response.data[packageId]
      };
    } catch (error) {
      console.error('Error fetching package details:', error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = SteamAPI;
