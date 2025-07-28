import React from "react";
import type { Character } from "../types";
import { FavoriteButton } from "../components/FavoriteButton";
import { CommentBox } from "../components/CommentBox";

interface Props {
  character: Character;
}

export const CharacterDetail: React.FC<Props> = ({ character }) => {

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Character Image */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
          <div className="absolute -bottom-2 -right-2">
            <FavoriteButton characterId={character.id} />
          </div>
        </div>
      </div>
      
      {/* Character Name */}
      <div className="px-6 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 text-center">{character.name}</h2>
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 mx-6"></div>
      
      {/* Character Info */}
      <div className="flex-1 p-6 space-y-4">
        <div>
          <span className="text-sm font-medium text-gray-500 block mb-1">Specie</span>
          <p className="text-gray-900">{character.species}</p>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200"></div>
        
        <div>
          <span className="text-sm font-medium text-gray-500 block mb-1">Status</span>
          <p className="text-gray-900">{character.status}</p>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200"></div>
        
        <div>
          <span className="text-sm font-medium text-gray-500 block mb-1">Occupation</span>
          <p className="text-gray-900">{character.gender}</p>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 mt-6"></div>
        
        <div className="mt-6">
          <CommentBox characterId={character.id} />
        </div>
      </div>
    </div>
  );
};
