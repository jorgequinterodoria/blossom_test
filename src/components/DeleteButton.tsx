import React from "react";
import { useDeletedCharacters } from "../hooks/useDeletedCharacters";

interface Props {
  characterId: string;
}

export const DeleteButton: React.FC<Props> = ({ characterId }) => {
  const { isDeleted, softDeleteCharacter, restoreCharacter } = useDeletedCharacters();
  const deleted = isDeleted(characterId);

  const handleClick = () => {
    if (deleted) {
      restoreCharacter(characterId);
    } else {
      softDeleteCharacter(characterId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full transition-colors hover:bg-gray-100"
      title={deleted ? "Restore character" : "Delete character"}
    >
      {deleted ? (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )}
    </button>
  );
};