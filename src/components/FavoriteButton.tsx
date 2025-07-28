import React from "react";
import { useFavorites } from "../hooks/useFavorites";

interface Props {
  characterId: string;
  variant?: 'small' | 'large';
}

export const FavoriteButton: React.FC<Props> = ({ characterId, variant = 'small' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const isLarge = variant === 'large';
  
  return (
    <button
      type="button"
      className={`focus:outline-none rounded-full transition-colors ${
        isLarge 
          ? 'p-2 bg-white shadow-lg hover:shadow-xl' 
          : 'p-0.5 hover:bg-gray-100'
      }`}
      onClick={e => {
        e.stopPropagation();
        toggleFavorite(characterId);
      }}
      aria-label={isFavorite(characterId) ? "Unfavorite" : "Favorite"}
    >
      <svg 
        className={`${isLarge ? 'w-6 h-6' : 'w-4 h-4'} ${
          isFavorite(characterId) ? "fill-current" : "text-gray-300"
        }`}
        style={isFavorite(characterId) ? {color: 'var(--secondary-600)'} : {}}
        viewBox="0 0 24 24"
        fill={isFavorite(characterId) ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
        />
      </svg>
    </button>
  );
};
