import React from 'react';
import { TrendingUp, Clock, Star } from 'lucide-react';
import { ConversionResult as ConversionResultType } from '../types/currency';
import { formatCurrency } from '../utils/currencies';
import { useFavorites } from '../hooks/useFavorites';

interface ConversionResultProps {
  result: ConversionResultType;
}

export function ConversionResult({ result }: ConversionResultProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(result.from, result.to);

  const handleFavoriteToggle = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(result.from, result.to);
    } else {
      addFavorite(result.from, result.to);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-blue-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Conversion Result
          </h3>
        </div>
        <button
          onClick={handleFavoriteToggle}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isCurrentlyFavorite
              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-yellow-500'
          }`}
          aria-label={isCurrentlyFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star className={`w-4 h-4 ${isCurrentlyFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {formatCurrency(result.amount, result.from)}
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {formatCurrency(result.result, result.to)}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-blue-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">Exchange Rate</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              1 {result.from} = {result.rate.toFixed(6)} {result.to}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          <span>Last updated: {formatDate(result.lastUpdated)}</span>
        </div>
      </div>
    </div>
  );
}