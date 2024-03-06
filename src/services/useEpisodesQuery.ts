import { useQuery } from '@tanstack/react-query'
import { getEpisodes } from 'rickmortyapi'

type EpisodeQueryParams = {
  name: string
  episode?: string
  page?: number
}

export const useEpisodesQuery = (queryParams: EpisodeQueryParams) => {
  return useQuery({
    queryKey: ['episodes', queryParams],
    queryFn: () => getEpisodes(queryParams),
  })
}
