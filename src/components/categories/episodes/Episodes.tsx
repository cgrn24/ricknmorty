import styled from 'styled-components'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../table/Table'
import { FC, useState } from 'react'
import { FilterButton } from '../../filter-button/FilterButton'
import { Pagination } from '../../pagination/Pagination'
import { EpisodeModal } from '../../modals/episode/EpisodeModal'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { Loader } from '../../loader/Loader'
import { StyledAccordionContent, StyledAccordionHeader, StyledAccordionItem, StyledAccordionRoot, Trigger } from '../../accordion/Accordion'
import { episodeProperties } from './episodeProperties'
import { useEpisodesQuery } from '../../../services/useEpisodesQuery'
import { Container, FiltersContainer, StyledButton } from '../StyledCategoryElements'

const FilterButtonsContainer = styled.div<{ direction: string; jcontent: string }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.jcontent};
  align-items: center;
  flex-wrap: wrap;
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
  const debouncedValue = useDebounce(searchValue, 300)
  const { data, isLoading, isError } = useEpisodesQuery({ name: debouncedValue, episode, page })
  const newData = data?.data.results
  const columns = [
    { name: 'Name', width: '30%' },
    { name: 'Air date', width: '25%' },
    { name: 'Episode code', width: '25%' },
    { name: 'More info', width: '20%' },
  ]
  if (isError) {
    return <div>Some error occured. Please reload page.</div>
  }
  return (
    <Container>
      <FiltersContainer>
        <StyledAccordionRoot type='multiple'>
          <StyledAccordionItem value='episodes'>
            <StyledAccordionHeader>
              <Trigger>Filters</Trigger>
            </StyledAccordionHeader>
            <StyledAccordionContent>
              <FilterButtonsContainer direction='column' jcontent='flex-start'>
                <StyledButton onClick={onClearFilters}>Clear all filters</StyledButton>
                <FilterButtonsContainer direction='row' jcontent='center'>
                  {episodeProperties.map((el) => (
                    <FilterButton key={el} property={el} value={episode} setValue={setEpisode} resetPage={resetPage}>
                      {el}
                    </FilterButton>
                  ))}
                </FilterButtonsContainer>
              </FilterButtonsContainer>
            </StyledAccordionContent>
          </StyledAccordionItem>
        </StyledAccordionRoot>
      </FiltersContainer>
      {isLoading && <Loader />}
      {!isLoading && (
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
      )}
      <Pagination currentPage={page} setCurrentPage={setPage} totalPages={data?.data.info?.pages} />
      <EpisodeModal open={open} setOpen={setOpen} id={epid} />
    </Container>
  )
}
