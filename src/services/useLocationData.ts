import { useQuery } from '@tanstack/react-query'
import { getCharacter, getLocation } from 'rickmortyapi'

export const useLocationData = (id: number) => {
  const residents: number[] = []
  const query = useQuery({ queryKey: ['location', id], queryFn: () => getLocation(id) })
  const locationData = query.data?.data
  locationData?.residents.forEach((el) => {
    const parts = el.split('/')
    const dataAfterLastSlash = parts[parts.length - 1]
    residents.push(+dataAfterLastSlash)
  })

  const { data: charData, isSuccess } = useQuery({
    queryKey: ['charLocation', id, locationData],
    queryFn: () => getCharacter(residents),
    refetchOnWindowFocus: false,
  })
  const residentsName: string[] = []
  if (isSuccess) {
    if (!charData.data.length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      residentsName.push(charData.data.name)
    } else {
      charData.data.forEach((el) => {
        residentsName.push(el.name)
      })
    }
  }
  return { locationData, residentsName }
}
