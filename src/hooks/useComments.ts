import { useLocalStorage } from "./useLocalStorage";

export function useComments(characterId: string) {
  const key = `comment-${characterId}`;
  const [comment, setComment] = useLocalStorage<string | null>(key, null);

  return {
    comment,
    setComment,
    deleteComment: () => setComment(null),
  };
}
