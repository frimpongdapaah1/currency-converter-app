import { useState, useEffect } from 'react';

export interface FavoritePair {
  from: string;
  to: string;
  name: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePair[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currency-favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('currency-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (from: string, to: string) => {
    const pair: FavoritePair = {
      from,
      to,
      name: `${from}/${to}`
    };

    setFavorites(prev => {
      const exists = prev.some(fav => fav.from === from && fav.to === to);
      if (exists) return prev;
      return [...prev, pair];
    });
  };

  const removeFavorite = (from: string, to: string) => {
    setFavorites(prev => prev.filter(fav => !(fav.from === from && fav.to === to)));
  };

  const isFavorite = (from: string, to: string) => {
    return favorites.some(fav => fav.from === from && fav.to === to);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
}