import { useQuery } from '@tanstack/react-query'
import { getCharacters } from 'rickmortyapi'

type CharacterQueryParams = {
  name: string
  status?: string
  species?: string
  type?: string
  gender?: string
  page?: number
}

export const useCharactersQuery = (queryParams: CharacterQueryParams) => {
  return useQuery({
    queryKey: ['characters', queryParams],
    queryFn: () => getCharacters(queryParams),
  })
}
