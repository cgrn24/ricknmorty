// useCharacterData.ts
import { useQuery } from '@tanstack/react-query'
import { getCharacter, getEpisode } from 'rickmortyapi'

export const useCharacterData = (id: number) => {
  const characterQuery = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
  })

  const episodes: number[] = []
  const characterData = characterQuery.data?.data

  characterData?.episode.forEach((el: string) => {
    const parts = el.split('/')
    const dataAfterLastSlash = parts[parts.length - 1]
    episodes.push(+dataAfterLastSlash)
  })

  const episodesQuery = useQuery({
    queryKey: ['charEpisodes', id, characterData],
    queryFn: () => getEpisode(episodes),
    refetchOnWindowFocus: false,
  })

  const episodesNumber: string[] = []
  if (episodesQuery.isSuccess) {
    if (!episodesQuery.data.data.length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      episodesNumber.push(episodesQuery.data.episode)
    } else {
      episodesQuery.data.data.forEach((el: { episode: string }) => {
        episodesNumber.push(el.episode)
      })
    }
  }

  return {
    characterData,
    episodesNumber,
  }
}
