import { useQuery } from '@tanstack/react-query'
import { getLocations } from 'rickmortyapi'

type LocationQueryParams = {
  name: string
  type?: string
  dimension?: string
  page?: number
}

export const useLocationsQuery = (queryParams: LocationQueryParams) => {
  return useQuery({
    queryKey: ['locations', queryParams],
    queryFn: () => getLocations(queryParams),
  })
}
