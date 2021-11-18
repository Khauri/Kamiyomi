// Api service to interact with the backend
class ApiService {
  public baseURL: string = '';
  
  constructor() {
    this.hyrdrateConfiguration();
  }

  hyrdrateConfiguration() {
    const baseURL = localStorage.getItem('kamiyomi:apiServiceUrl');
    if(baseURL) {
      this.baseURL = baseURL;
    }
  }

  setBaseURL(url: string) {
    url = url.trim();
    if(url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    this.baseURL = url;
    localStorage.setItem('kamiyomi:apiServiceUrl', url);
  }

  // TODO: this should be callable from api.sources[source].get(); (via proxies or something).
  async getPopular(source: string) {
    const result = await fetch(`${this.baseURL}/sources/${source}/popular`);
    return result.json();
  }

  async getSources() {
    const result = await fetch(`${this.baseURL}/sources`);
    return result.json();
  }
}

export default new ApiService();