import React from "react";
import type { Character } from "../types";
import { FavoriteButton } from "./FavoriteButton";
import { DeleteButton } from "./DeleteButton";

interface Props {
  character: Character;
  onClick: () => void;
  isSelected?: boolean;
}

export const CharacterCard: React.FC<Props> = ({ character, onClick, isSelected = false }) => (
  <div
    className={`flex items-center px-6 py-3 cursor-pointer transition-colors border-l-4 ${
      isSelected 
        ? 'hover:bg-gray-50' 
        : 'hover:bg-gray-50 border-transparent'
    }`}
    style={isSelected ? {
      backgroundColor: 'var(--primary-100)',
      borderLeftColor: 'var(--primary-600)'
    } : {}}
    onClick={onClick}
    data-testid="character-card"
  >
    <img
      src={character.image}
      alt={character.name}
      className="h-10 w-10 rounded-full object-cover mr-3 flex-shrink-0"
    />
    <div className="flex-grow min-w-0">
      <div className="font-medium text-sm text-gray-900 truncate">{character.name}</div>
      <div className="text-xs text-gray-500 truncate">{character.species}</div>
    </div>
    <div className="ml-2 flex-shrink-0 flex items-center gap-1">
      <FavoriteButton characterId={character.id} />
      <DeleteButton characterId={character.id} />
    </div>
  </div>
);
