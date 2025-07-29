import React, { memo } from "react";
import type { Character } from "../types";
import { FavoriteButton } from "./FavoriteButton";
import { DeleteButton } from "./DeleteButton";

interface Props {
  character: Character;
  onClick: () => void;
  isSelected?: boolean;
}

export const CharacterCard: React.FC<Props> = memo(({ character, onClick, isSelected = false }) => (
  <div
    className={`group flex items-center px-4 md:px-6 py-3 cursor-pointer transition-all duration-200 border-l-4 relative ${
      isSelected 
        ? 'shadow-sm' 
        : 'hover:bg-gray-50 border-transparent hover:shadow-sm'
    }`}
    style={isSelected ? {
      backgroundColor: 'var(--primary-100)',
      borderLeftColor: 'var(--primary-600)'
    } : {}}
    onClick={onClick}
    data-testid="character-card"
  >
    <div className="relative flex-shrink-0">
      <img
        src={character.image}
        alt={character.name}
        className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm"
        loading="lazy"
      />
      {/* Status indicator */}
      <div 
        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
          character.status === 'Alive' ? 'bg-green-400' :
          character.status === 'Dead' ? 'bg-red-400' : 'bg-gray-400'
        }`}
        title={`Status: ${character.status}`}
      />
    </div>
    
    <div className="flex-grow min-w-0 ml-3">
      <div className="font-semibold text-sm text-gray-900 truncate leading-tight">
        {character.name}
      </div>
      <div className="text-xs text-gray-500 truncate mt-0.5">
        {character.species}
      </div>
    </div>
    
    <div className="ml-3 flex-shrink-0 flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
      <FavoriteButton characterId={character.id} />
      <DeleteButton characterId={character.id} />
    </div>
  </div>
));
