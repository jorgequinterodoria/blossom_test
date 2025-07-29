import React, { useMemo, memo } from "react";
import { useFavorites } from "../hooks/useFavorites";

interface Props {
  characterId: string;
  variant?: 'small' | 'large';
}

export const FavoriteButton: React.FC<Props> = memo(({ characterId, variant = 'small' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const isFav = useMemo(() => isFavorite(characterId), [isFavorite, characterId]);
  const isLarge = variant === 'large';
  
  return (
    <button
      type="button"
      className={`group focus:outline-none rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
        isLarge 
          ? 'p-3 bg-white shadow-lg hover:shadow-xl border-2 border-gray-100' 
          : 'p-2 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg border border-gray-200'
      }`}
      onClick={e => {
        e.stopPropagation();
        toggleFavorite(characterId);
      }}
      aria-label={isFav ? "Unfavorite" : "Favorite"}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <div className="relative">
        {/* Heart icon */}
        <svg 
          className={`${isLarge ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-300 ${
            isFav 
              ? "fill-current transform scale-110" 
              : "text-gray-400 group-hover:text-gray-500"
          }`}
          style={isFav ? {color: 'var(--secondary-600)'} : {}}
          viewBox="0 0 24 24"
          fill={isFav ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={isFav ? "0" : "2"}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
          />
        </svg>
        
        {/* Pulse animation when favorited */}
        {isFav && (
          <div 
            className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
              isLarge ? 'w-6 h-6' : 'w-5 h-5'
            }`}
            style={{backgroundColor: 'var(--secondary-600)'}}
          />
        )}
      </div>
    </button>
  );
});
