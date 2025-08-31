export interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  date: string;
  time_last_updated: number;
}

export interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  lastUpdated: string;
}

export interface ApiResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: Record<string, number>;
}