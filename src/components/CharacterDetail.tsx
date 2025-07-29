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
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Character Image */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <img
            src={character.image}
            alt={character.name}
            className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
          />
          {/* Status indicator */}
          <div className={`absolute top-2 right-2 w-6 h-6 ${getStatusColor(character.status)} rounded-full border-3 border-white shadow-lg`}></div>
          {/* Favorite button */}
          <div className="absolute -bottom-2 -right-2">
            <FavoriteButton characterId={character.id} />
          </div>
        </div>
      </div>
      
      {/* Character Name */}
      <div className="px-6 pb-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">{character.name}</h2>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-2xl">{getSpeciesIcon(character.species)}</span>
          <span className="text-lg text-gray-600 font-medium">{character.species}</span>
        </div>
      </div>
      
      {/* Character Info Cards */}
      <div className="flex-1 p-6 space-y-4">
        {/* Status Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Status</span>
            <div className={`w-3 h-3 ${getStatusColor(character.status)} rounded-full`}></div>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1 capitalize">{character.status}</p>
        </div>
        
        {/* Gender Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-1">Gender</span>
          <p className="text-lg font-semibold text-gray-900 capitalize">{character.gender}</p>
        </div>
        
        {/* Location Card */}
        {character.location && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-1">Location</span>
            <p className="text-lg font-semibold text-gray-900">{character.location.name}</p>
          </div>
        )}
        
        {/* Comments Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <CommentBox characterId={character.id} />
        </div>
      </div>
    </div>
  );
};
