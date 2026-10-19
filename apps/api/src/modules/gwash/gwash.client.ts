import axios, { AxiosInstance } from 'axios';

export class GwashClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.GWASH_API_URL ?? 'https://api.gwash.ng',
      timeout: 15000,
      headers: {
        'X-API-Key': process.env.GWASH_API_KEY ?? '',
        'Content-Type': 'application/json',
      },
    });
  }

  async ping() {
    const { data } = await this.http.get('/health');
    return data;
  }
}
