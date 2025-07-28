import React from "react";
import { useParams } from "react-router-dom";
import { useCharacter } from "../hooks/useCharacters";
import { CommentBox } from "../components/CommentBox";
import { FavoriteButton } from "../components/FavoriteButton";

export const CharacterDetail: React.FC = () => {
  const { id } = useParams();
  const { character, loading, error } = useCharacter(id);

  if (loading) return <div className="mt-4 text-center">Loading…</div>;
  if (error || !character) return <div className="mt-4 text-red-500 text-center">Error loading character</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start bg-white rounded-lg p-6 shadow">
      <img src={character.image} alt={character.name} className="rounded-lg w-40 h-40 object-cover" />
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold">{character.name}</h2>
          <FavoriteButton characterId={character.id} />
        </div>
        <div className="text-gray-500 text-base">{character.species}</div>
        <div className="mt-2 mb-4 space-y-1">
          <p><span className="font-semibold">Status:</span> {character.status}</p>
          <p><span className="font-semibold">Gender:</span> {character.gender}</p>
          <p><span className="font-semibold">Origin:</span> {character.origin?.name}</p>
          <p><span className="font-semibold">Location:</span> {character.location?.name}</p>
        </div>
        <CommentBox characterId={character.id} />
      </div>
    </div>
  );
};
