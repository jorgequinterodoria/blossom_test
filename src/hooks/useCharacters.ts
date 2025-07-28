import { useQuery } from '@apollo/client';
import { GET_CHARACTERS, GET_CHARACTER } from '../graphql/queries';
import type { Character } from '../types';

type Filters = {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
};

export function useCharacters(filters: Filters = {}, page = 1) {
  const { data, loading, error, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      filter: filters,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    characters: data?.characters?.results as Character[] | undefined,
    info: data?.characters?.info,
    loading,
    error,
    refetch,
  };
}

export function useCharacter(id?: string) {
  const { data, loading, error, refetch } = useQuery(GET_CHARACTER, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  return {
    character: data?.character as Character | undefined,
    loading,
    error,
    refetch,
  };
}
