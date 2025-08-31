import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoritesListProps {
  onSelectPair: (from: string, to: string) => void;
}

export function FavoritesList({ onSelectPair }: FavoritesListProps) {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Favorite Pairs
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {favorites.map((favorite) => (
          <div
            key={favorite.name}
            className="group flex items-center justify-between p-3 bg-white/80 dark:bg-gray-700/80 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200"
          >
            <button
              onClick={() => onSelectPair(favorite.from, favorite.to)}
              className="flex items-center space-x-2 flex-1"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {favorite.from}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {favorite.to}
              </span>
            </button>
            <button
              onClick={() => removeFavorite(favorite.from, favorite.to)}
              className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-red-500 transition-all duration-200"
              aria-label="Remove from favorites"
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}