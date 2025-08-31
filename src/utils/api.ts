import { ApiResponse, ExchangeRates } from '../types/currency';

const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

export async function fetchExchangeRates(baseCurrency: string): Promise<ExchangeRates> {
  try {
    const response = await fetch(`${API_BASE_URL}/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    return {
      base: data.base_code,
      rates: data.conversion_rates,
      date: data.time_last_update_utc,
      time_last_updated: data.time_last_update_unix
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates. Please try again later.');
  }
}

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  const rates = await fetchExchangeRates(fromCurrency);
  const rate = rates.rates[toCurrency];
  
  if (!rate) {
    throw new Error(`Exchange rate not found for ${toCurrency}`);
  }
  
  return amount * rate;
}