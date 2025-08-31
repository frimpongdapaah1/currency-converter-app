import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Currency } from '../types/currency';
import { ALL_CURRENCIES, POPULAR_CURRENCIES } from '../utils/currencies';

interface CurrencySelectProps {
  value: string;
  onChange: (currency: string) => void;
  label: string;
  className?: string;
}

export function CurrencySelect({ value, onChange, label, className = '' }: CurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[]>(ALL_CURRENCIES);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCurrency = ALL_CURRENCIES.find(c => c.code === value);

  useEffect(() => {
    const filtered = ALL_CURRENCIES.filter(currency =>
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCurrencies(filtered);
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currencyCode: string) => {
    onChange(currencyCode);
    setIsOpen(false);
    setSearchQuery('');
  };

  const popularCurrencies = POPULAR_CURRENCIES.filter(currency =>
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const otherCurrencies = filteredCurrencies.filter(
    currency => !POPULAR_CURRENCIES.some(pop => pop.code === currency.code)
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-xl text-left hover:bg-white/90 dark:hover:bg-gray-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">
              {selectedCurrency?.code || value}
            </div>
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {selectedCurrency?.name || value}
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search currencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-64">
            {searchQuery === '' && (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-700/50">
                  Popular Currencies
                </div>
                {popularCurrencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleSelect(currency.code)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700 transition-colors duration-150"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        {currency.code}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{currency.code}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{currency.name}</div>
                      </div>
                    </div>
                  </button>
                ))}
                
                {otherCurrencies.length > 0 && (
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                    Other Currencies
                  </div>
                )}
              </>
            )}
            
            {(searchQuery !== '' ? filteredCurrencies : otherCurrencies).map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleSelect(currency.code)}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700 transition-colors duration-150"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    {currency.code}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{currency.code}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{currency.name}</div>
                  </div>
                </div>
              </button>
            ))}
            
            {filteredCurrencies.length === 0 && (
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                No currencies found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}