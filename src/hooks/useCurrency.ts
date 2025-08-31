import { useState, useEffect, useCallback } from 'react';
import { ExchangeRates, ConversionResult } from '../types/currency';
import { fetchExchangeRates } from '../utils/api';

export function useCurrency() {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastConversion, setLastConversion] = useState<ConversionResult | null>(null);

  const fetchRates = useCallback(async (baseCurrency: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const exchangeRates = await fetchExchangeRates(baseCurrency);
      setRates(exchangeRates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const convertCurrency = useCallback(async (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    if (!rates || rates.base !== fromCurrency) {
      await fetchRates(fromCurrency);
      return;
    }

    const rate = rates.rates[toCurrency];
    if (!rate) {
      setError(`Exchange rate not found for ${toCurrency}`);
      return;
    }

    const result = amount * rate;
    const conversion: ConversionResult = {
      from: fromCurrency,
      to: toCurrency,
      amount,
      result,
      rate,
      lastUpdated: rates.date
    };

    setLastConversion(conversion);
  }, [rates, fetchRates]);

  useEffect(() => {
    fetchRates('USD');
  }, [fetchRates]);

  return {
    rates,
    loading,
    error,
    lastConversion,
    fetchRates,
    convertCurrency,
    clearError: () => setError(null)
  };
}