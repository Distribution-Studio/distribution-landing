import { env } from '@/env';

// Types for Polar.sh API
export interface PolarPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

export interface PolarCustomer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, any>;
}

export interface PolarSubscription {
  id: string;
  customerId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete' | 'incomplete_expired' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PolarCheckoutSession {
  id: string;
  clientSecret: string;
  url: string;
  customerId?: string;
  subscriptionId?: string;
  successUrl: string;
  cancelUrl: string;
  expiresAt: string;
}

export interface PolarInvoice {
  id: string;
  customerId: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  invoiceUrl?: string;
  invoicePdf?: string;
  createdAt: string;
  paidAt?: string;
}

// Polar.sh API client
export class PolarClient {
  private apiKey: string | undefined;
  private baseUrl: string = 'https://api.polar.sh/v1';

  constructor() {
    this.apiKey = env.POLAR_API_KEY;
  }

  private ensureApiKey(): string {
    if (!this.apiKey) {
      throw new Error('POLAR_API_KEY is not configured. Please set the environment variable to use payment features.');
    }
    return this.apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const apiKey = this.ensureApiKey();
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Polar API error: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  // Plans
  async getPlans(): Promise<PolarPlan[]> {
    return this.request<PolarPlan[]>('/benefits/');
  }

  // Customers
  async createCustomer(data: { email: string; name?: string; metadata?: Record<string, any> }): Promise<PolarCustomer> {
    return this.request<PolarCustomer>('/customers/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCustomer(customerId: string): Promise<PolarCustomer> {
    return this.request<PolarCustomer>(`/customers/${customerId}`);
  }

  // Subscriptions
  async getSubscription(subscriptionId: string): Promise<PolarSubscription> {
    return this.request<PolarSubscription>(`/subscriptions/${subscriptionId}`);
  }

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd: boolean = true): Promise<PolarSubscription> {
    return this.request<PolarSubscription>(`/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
      body: JSON.stringify({ cancel_at_period_end: cancelAtPeriodEnd }),
    });
  }

  // Checkout Sessions
  async createCheckoutSession(data: {
    planId: string;
    customerId?: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, any>;
  }): Promise<PolarCheckoutSession> {
    return this.request<PolarCheckoutSession>('/checkouts/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCheckoutSession(sessionId: string): Promise<PolarCheckoutSession> {
    return this.request<PolarCheckoutSession>(`/checkouts/${sessionId}`);
  }

  // Invoices
  async getInvoices(customerId: string): Promise<PolarInvoice[]> {
    return this.request<PolarInvoice[]>(`/invoices?customer_id=${customerId}`);
  }

  async getInvoice(invoiceId: string): Promise<PolarInvoice> {
    return this.request<PolarInvoice>(`/invoices/${invoiceId}`);
  }
}

// Singleton instance - only create if not in build mode
let _polarClient: PolarClient | null = null;

export const polarClient = (() => {
  if (!_polarClient) {
    _polarClient = new PolarClient();
  }
  return _polarClient;
})();