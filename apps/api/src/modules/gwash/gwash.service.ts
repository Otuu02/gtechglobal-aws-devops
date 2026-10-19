import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GwashService {
  private readonly logger = new Logger(GwashService.name);
  private readonly baseUrl = process.env.GWASH_API_URL ?? 'https://api.gwash.ng';

  /**
   * Returns the KPI read-model for G Wash.
   * In production this would call the G Wash API with the configured key.
   */
  async getKpis() {
    // TODO: replace with real HTTP call once the G Wash contract is finalised.
    return {
      source: 'gwash',
      asOf: new Date().toISOString(),
      bookings: { today: 0, week: 0, month: 0 },
      revenue: { today: 0, week: 0, month: 0, currency: 'NGN' },
      providers: { active: 0, pendingKyc: 0 },
      customers: { active: 0, newThisWeek: 0 },
      quality: { avgRating: 0, complaintsOpen: 0 },
    };
  }

  async healthCheck() {
    try {
      // Ping the connector once the endpoint is live
      return { connected: true, baseUrl: this.baseUrl };
    } catch (err) {
      this.logger.error('G Wash health check failed', err as Error);
      return { connected: false, baseUrl: this.baseUrl };
    }
  }
}
