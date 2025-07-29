import React from 'react';
import { CharacterCard } from './CharacterCard';
import type { Character } from '../types';

interface CharacterListSectionProps {
  favoriteCharacters: Character[];
  regularCharacters: Character[];
  selectedCharacter: Character | null;
  onCharacterClick: (id: string) => void;
  loading: boolean;
  error: boolean;
}

const CharacterListSection: React.FC<CharacterListSectionProps> = ({
  favoriteCharacters,
  regularCharacters,
  selectedCharacter,
  onCharacterClick,
  loading,
  error
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="space-y-4">
        {favoriteCharacters.length > 0 && (
          <div>
            <div className="px-2 md:px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              STARRED CHARACTERS ({favoriteCharacters.length})
            </div>
            <div className="space-y-1">
              {favoriteCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={() => onCharacterClick(character.id)}
                  isSelected={selectedCharacter?.id === character.id}
                />
              ))}
            </div>
          </div>
        )}
        
        <div>
          <div className="px-2 md:px-6 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            CHARACTERS ({regularCharacters.length})
          </div>
          <div className="space-y-1">
            {regularCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => onCharacterClick(character.id)}
                isSelected={selectedCharacter?.id === character.id}
              />
            ))}
          </div>
        </div>
      </div>
      
      {loading && <div className="p-6 text-center text-gray-500">Loading…</div>}
      {error && <div className="p-6 text-center text-red-500">Error loading characters.</div>}
    </div>
  );
};

export default CharacterListSection;