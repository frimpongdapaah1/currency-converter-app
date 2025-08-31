import React from 'react';
import { DollarSign } from 'lucide-react';
import { CurrencyConverter } from './components/CurrencyConverter';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1"></div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Currency Converter
              </h1>
            </div>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Convert currencies with real-time exchange rates. Get accurate conversions for over 150 currencies worldwide.
          </p>
        </header>

        <main>
          <CurrencyConverter />
        </main>

        <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Exchange rates provided by ExchangeRate-API • Updated in real-time</p>
        </footer>
      </div>
    </div>
  );
}

export default App;