import { useQuery } from '@tanstack/react-query'
import { getCharacter, getEpisode } from 'rickmortyapi'

export const useEpisodeData = (id: number) => {
  const residents: number[] = []
  const query = useQuery({ queryKey: ['episode', id], queryFn: () => getEpisode(id) })
  const episodeData = query.data?.data
  episodeData?.characters.forEach((el) => {
    const parts = el.split('/')
    const dataAfterLastSlash = parts[parts.length - 1]
    residents.push(+dataAfterLastSlash)
  })
  const { data: episodeChars, isSuccess } = useQuery({
    queryKey: ['episodeChars', id, episodeData],
    queryFn: () => getCharacter(residents),
    refetchOnWindowFocus: false,
  })
  const charactersName: string[] = []
  if (isSuccess) {
    if (!episodeChars.data.length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      charactersName.push(episodeChars.data.episode)
    } else {
      episodeChars.data.forEach((el) => {
        charactersName.push(el.name)
      })
    }
  }
  return { episodeData, charactersName }
}
