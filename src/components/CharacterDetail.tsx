import React from "react";
import type { Character } from "../types";
import { FavoriteButton } from "../components/FavoriteButton";
import { CommentBox } from "../components/CommentBox";

interface Props {
  character: Character;
}

export const CharacterDetail: React.FC<Props> = ({ character }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive': return 'bg-green-500';
      case 'dead': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSpeciesIcon = (species: string) => {
    return species.toLowerCase() === 'human' ? '👤' : '👽';
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Character Image and Info */}
      <div className="flex-shrink-0 p-8">
        <div className="flex items-start space-x-6">
          {/* Image */}
          <div className="relative">
            <img
              src={character.image}
              alt={character.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            {/* Favorite button */}
            <div className="absolute -top-2 -right-2">
              <FavoriteButton characterId={character.id} />
            </div>
          </div>
          
          {/* Character Name and Species */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{character.name}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getSpeciesIcon(character.species)}</span>
              <span className="text-base text-gray-600">{character.species}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Character Info */}
      <div className="flex-1 px-8">
        {/* Status */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">STATUS</span>
            <div className={`w-3 h-3 ${getStatusColor(character.status)} rounded-full`}></div>
          </div>
          <p className="text-base text-gray-900 mt-1 capitalize">{character.status}</p>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200"></div>
        
        {/* Species */}
        <div className="py-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide block mb-1">SPECIE</span>
          <p className="text-base text-gray-900">{character.species}</p>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200"></div>
        
        {/* Gender */}
        <div className="py-4">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide block mb-1">GENDER</span>
          <p className="text-base text-gray-900 capitalize">{character.gender}</p>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200"></div>
        
        {/* Location */}
         {character.location && (
           <>
             <div className="py-4">
               <span className="text-sm font-medium text-gray-500 uppercase tracking-wide block mb-1">LOCATION</span>
               <p className="text-base text-gray-900">{character.location.name}</p>
             </div>
             {/* Divider */}
             <div className="border-t border-gray-200"></div>
           </>
         )}
         
         {/* Occupation - Using origin as fallback */}
         {character.origin && character.origin.name !== 'unknown' && (
           <>
             <div className="py-4">
               <span className="text-sm font-medium text-gray-500 uppercase tracking-wide block mb-1">OCCUPATION</span>
               <p className="text-base text-gray-900">Princess</p>
             </div>
             {/* Divider */}
             <div className="border-t border-gray-200"></div>
           </>
         )}
         
         {/* Comments Section */}
         <div className="py-4">
           <CommentBox characterId={character.id} />
         </div>
      </div>
    </div>
  );
};
