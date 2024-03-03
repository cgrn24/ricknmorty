import styled from 'styled-components'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../table/Table'
import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEpisodes } from 'rickmortyapi'
import { FilterButton } from '../../filter-button/FilterButton'
import * as Accordion from '@radix-ui/react-accordion'
import { Pagination } from '../../pagination/Pagination'
import { EpisodeModal } from '../../modals/episode/EpisodeModal'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { Loader } from '../../loader/Loader'
import { StyledAccordionContent, StyledAccordionHeader, StyledAccordionRoot, Trigger } from '../../accordeon/Accordeon'

const Container = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const StyledButton = styled.button`
  font-size: 16px;
  padding: 2px 4px;
  background-color: white;
  color: black;
  border: none;
  border-bottom: 2px solid #0056b3;
  cursor: pointer;
  outline: none;
`

const FiltersContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`

type Props = {
  searchValue: string
}

export const Episodes: FC<Props> = ({ searchValue }) => {
  const [episode, setEpisode] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState<boolean>(false)
  const [epid, setEpid] = useState<number>(1)
  const resetPage = () => {
    setPage(1)
  }
  const modalHandler = (id: number) => {
    setOpen(true)
    setEpid(id)
  }
  const onClearFilters = () => {
    setEpisode('')
    resetPage()
  }
  const episodes = async () => {
    const data = await getEpisodes({ name: searchValue, episode, page })
    return data
  }
  const debouncedValue = useDebounce(searchValue, 300)
  const { data, isLoading, isError } = useQuery({ queryKey: ['episodes', debouncedValue, episode, page], queryFn: episodes })
  const newData = data?.data.results
  const columns = ['Name', 'Air date', 'Episode code']
  const episodeProperties = [
    'S01E01',
    'S01E02',
    'S01E03',
    'S01E04',
    'S01E05',
    'S01E06',
    'S01E07',
    'S01E08',
    'S01E09',
    'S01E10',
    'S01E11',
    'S02E01',
    'S02E02',
    'S02E03',
    'S02E04',
    'S02E05',
    'S02E06',
    'S02E07',
    'S02E08',
    'S02E09',
    'S02E10',
    'S03E01',
    'S03E02',
    'S03E03',
    'S03E04',
    'S03E05',
    'S03E06',
    'S03E07',
    'S03E08',
    'S03E09',
    'S03E10',
    'S04E01',
    'S04E02',
    'S04E03',
    'S04E04',
    'S04E05',
    'S04E06',
    'S04E07',
    'S04E08',
    'S04E09',
    'S04E10',
    'S05E01',
    'S05E02',
    'S05E03',
    'S05E04',
    'S05E05',
    'S05E06',
    'S05E07',
    'S05E08',
    'S05E09',
    'S05E10',
  ]
  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return <div>Some error occured. Please reload page.</div>
  }
  return (
    <Container>
      <FiltersContainer>
        <StyledAccordionRoot type='multiple'>
          <Accordion.Item value='episodes'>
            <StyledAccordionHeader>
              <Trigger>Filters</Trigger>
            </StyledAccordionHeader>
            <StyledAccordionContent>
              <StyledButton onClick={onClearFilters}>Clear all filters</StyledButton>
              {episodeProperties.map((el) => (
                <FilterButton key={el} property={el} value={episode} setValue={setEpisode} resetPage={resetPage}>
                  {el}
                </FilterButton>
              ))}
            </StyledAccordionContent>
          </Accordion.Item>
        </StyledAccordionRoot>
      </FiltersContainer>
      <Table>
        <TableHeader columns={columns} />
        <TableBody>
          {newData?.map((el) => {
            return (
              <TableRow key={el.id}>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.air_date}</TableCell>
                <TableCell>{el.episode}</TableCell>
                <TableCell>
                  <StyledButton onClick={() => modalHandler(el.id)}>More info</StyledButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination currentPage={page} setCurrentPage={setPage} totalPages={data?.data.info?.pages} />
      <EpisodeModal open={open} setOpen={setOpen} id={epid} />
    </Container>
  )
}
