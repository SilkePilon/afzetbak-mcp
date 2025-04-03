import fetch from 'node-fetch';

export class ApiClient {
  private static baseUrl = 'https://www.afzetbak.nl';

  private static async get(endpoint: string) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${error}`);
      throw error;
    }
  }

  public static async getGarbages() {
    return this.get('/internal-api/garbages');
  }

  public static async getSizes() {
    return this.get('/internal-api/sizes');
  }

  public static async getStats() {
    return this.get('/internal-api/stats');
  }

  public static async getUsps() {
    return this.get('/internal-api/usps');
  }

  public static async getReview() {
    return this.get('/internal-api/review');
  }

  public static async getReviews() {
    return this.get('/internal-api/reviews');
  }

  public static async getRecentOrderContainers() {
    return this.get('/internal-api/recent-order-containers');
  }
}