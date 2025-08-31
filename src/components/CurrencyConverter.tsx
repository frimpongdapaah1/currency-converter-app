import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowUpDown } from 'lucide-react';
import { CurrencySelect } from './CurrencySelect';
import { ConversionResult } from './ConversionResult';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { FavoritesList } from './FavoritesList';
import { useCurrency } from '../hooks/useCurrency';

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [autoConvert, setAutoConvert] = useState(true);

  const {
    rates,
    loading,
    error,
    lastConversion,
    convertCurrency,
    fetchRates,
    clearError
  } = useCurrency();

  useEffect(() => {
    if (autoConvert && amount && !isNaN(Number(amount)) && Number(amount) > 0) {
      const debounceTimer = setTimeout(() => {
        convertCurrency(Number(amount), fromCurrency, toCurrency);
      }, 300);

      return () => clearTimeout(debounceTimer);
    }
  }, [amount, fromCurrency, toCurrency, autoConvert, convertCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleManualConvert = () => {
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
      convertCurrency(Number(amount), fromCurrency, toCurrency);
    }
  };

  const handleRefresh = () => {
    fetchRates(fromCurrency);
  };

  const handleFavoritePairSelect = (from: string, to: string) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {error && (
        <ErrorMessage message={error} onDismiss={clearError} />
      )}

      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-white/20 dark:border-gray-700 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100"
                min="0"
                step="any"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CurrencySelect
                value={fromCurrency}
                onChange={setFromCurrency}
                label="From"
              />
              
              <div className="relative">
                <CurrencySelect
                  value={toCurrency}
                  onChange={setToCurrency}
                  label="To"
                />
                <button
                  onClick={handleSwapCurrencies}
                  className="absolute top-8 right-2 p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 transform hover:scale-105"
                  aria-label="Swap currencies"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoConvert}
                  onChange={(e) => setAutoConvert(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Auto-convert</span>
              </label>

              {!autoConvert && (
                <button
                  onClick={handleManualConvert}
                  disabled={loading || !amount || isNaN(Number(amount))}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? <LoadingSpinner /> : 'Convert'}
                </button>
              )}

              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 transform hover:scale-105"
                aria-label="Refresh rates"
              >
                <RefreshCw className={`w-4 h-4 text-gray-600 dark:text-gray-400 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {loading && !lastConversion && (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner />
              </div>
            )}

            {lastConversion && (
              <ConversionResult result={lastConversion} />
            )}

            {rates && (
              <div className="bg-white/40 dark:bg-gray-700/40 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Base Currency
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {rates.base}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {rates.date ? new Date(rates.date).toLocaleDateString() : 'Today'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FavoritesList onSelectPair={handleFavoritePairSelect} />
    </div>
  );
}