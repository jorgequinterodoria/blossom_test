import { useLocalStorage } from './useLocalStorage';

export function useDeletedCharacters() {
  const [deletedCharacters, setDeletedCharacters] = useLocalStorage<string[]>('deletedCharacters', []);

  const isDeleted = (characterId: string): boolean => {
    return deletedCharacters.includes(characterId);
  };

  const softDeleteCharacter = (characterId: string): void => {
    if (!deletedCharacters.includes(characterId)) {
      setDeletedCharacters([...deletedCharacters, characterId]);
    }
  };

  const restoreCharacter = (characterId: string): void => {
    setDeletedCharacters(deletedCharacters.filter(id => id !== characterId));
  };

  const clearAllDeleted = (): void => {
    setDeletedCharacters([]);
  };

  return {
    deletedCharacters,
    isDeleted,
    softDeleteCharacter,
    restoreCharacter,
    clearAllDeleted
  };
}