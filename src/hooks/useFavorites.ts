import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "favorites",
    []
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );
  const toggleFavorite = useCallback(
    (id: string) =>
      setFavorites(favorites =>
        favorites.includes(id)
          ? favorites.filter(favId => favId !== id)
          : [...favorites, id]
      ),
    [setFavorites]
  );
  return { isFavorite, toggleFavorite };
}
