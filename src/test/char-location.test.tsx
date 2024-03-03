import { waitFor, renderHook, screen, render } from '@testing-library/react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import nock from 'nock'
import { CharacterModal } from '../components/modals/character/CharacterModal'
import { getLocation } from 'rickmortyapi'

const useGetLocationTest = () => {
  const id = 2
  const getLoc = async () => {
    const data = await getLocation(id)
    return data
  }
  return useQuery({ queryKey: ['location', id], queryFn: getLoc })
}

test('getting location by id', async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  nock('https://rickandmortyapi.com')
    .get('/api/character/10')
    .reply(200, {
      id: 2,
      name: 'Abadango',
      type: 'Cluster',
      dimension: 'unknown',
      residents: ['https://rickandmortyapi.com/api/character/6'],
      url: 'https://rickandmortyapi.com/api/location/2',
      created: '2017-11-10T13:06:38.182Z',
    })
  const { result } = renderHook(() => useGetLocationTest(), { wrapper })
  await waitFor(() => {
    return result.current.isSuccess
  })
  await waitFor(() => expect(result.current.data?.data.name).toBe('Abadango'))
})
test('renders character details', async () => {
  const id = 10
  const queryClient = new QueryClient()
  nock('https://rickandmortyapi.com')
    .get('/api/character/10')
    .reply(200, {
      id: '10',
      name: 'Alan Rails',
      status: 'Dead',
      species: 'Human',
      type: 'Superhuman (Ghost trains summoner)',
      gender: 'Male',
      origin: {
        name: 'unknown',
        url: '',
      },
      location: {
        name: "Worldender's lair",
        url: 'https://rickandmortyapi.com/api/location/4',
      },
      image: `https://rickandmortyapi.com/api/character/avatar/10.jpeg`,
      episode: [`https://rickandmortyapi.com/api/episode/10`],
      url: `https://rickandmortyapi.com/api/character/10`,
      created: '2017-11-04T20:19:09.017Z',
    })
  render(
    <QueryClientProvider client={queryClient}>
      <CharacterModal open={true} id={id} setOpen={() => ''} />
    </QueryClientProvider>
  )
  await waitFor(() => screen.getByText(/Alan Rails/i))
  expect(screen.getByText(/Dead/i)).toBeInTheDocument()
  expect(screen.getByText(/Superhuman/i)).toBeInTheDocument()
})
