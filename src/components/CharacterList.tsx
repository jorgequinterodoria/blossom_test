import React from "react";
import type { Character } from "../types";
import { CharacterCard } from "./CharacterCard";
import { useFavorites } from "../hooks/useFavorites";

interface Props {
  characters: Character[];
  onCharacterClick: (id: string) => void;
  selectedCharacterId?: string;
}

export const CharacterList: React.FC<Props> = ({
  characters,
  onCharacterClick,
  selectedCharacterId,
}) => {
  const { isFavorite } = useFavorites();
  
  const favoriteCharacters = characters.filter(character => isFavorite(character.id));
  const regularCharacters = characters.filter(character => !isFavorite(character.id));

  return (
    <div className="space-y-4">
      {/* Starred Characters Section */}
      {favoriteCharacters.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            STARRED CHARACTERS ({favoriteCharacters.length})
          </div>
          <div className="space-y-1">
            {favoriteCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => onCharacterClick(character.id)}
                isSelected={selectedCharacterId === character.id}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Regular Characters Section */}
      <div>
        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          CHARACTERS ({regularCharacters.length})
        </div>
        <div className="space-y-1">
          {regularCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => onCharacterClick(character.id)}
              isSelected={selectedCharacterId === character.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
