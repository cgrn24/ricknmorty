import styled from 'styled-components'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../table/Table'
import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as Accordion from '@radix-ui/react-accordion'
import { getCharacters } from 'rickmortyapi'
import { FilterButton } from '../../filter-button/FilterButton'
import { Pagination } from '../../pagination/Pagination'
import { CharacterModal } from '../../modals/character/CharacterModal'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { StyledAccordionContent, StyledAccordionHeader, StyledAccordionItem, StyledAccordionRoot, Trigger } from '../../accordion/Accordion'
import { Loader } from '../../loader/Loader'

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

export const Characters: FC<Props> = ({ searchValue }) => {
  const [status, setStatus] = useState('')
  const [species, setSpecies] = useState('')
  const [type, setType] = useState('')
  const [gender, setGender] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState<boolean>(false)
  const [charid, setCharid] = useState<number>(1)
  const modalHandler = (id: number) => {
    setOpen(true)
    setCharid(id)
  }
  const resetPage = () => {
    setPage(1)
  }
  const onClearFilters = () => {
    setStatus('')
    setSpecies('')
    setType('')
    setGender('')
    resetPage()
  }
  const characters = async () => {
    const data = await getCharacters({ name: searchValue, status, species, type, gender, page })
    return data
  }
  const debouncedValue = useDebounce(searchValue, 300)
  const { data, isLoading, isError } = useQuery({ queryKey: ['characters', debouncedValue, status, species, type, gender, page], queryFn: characters })
  const newData = data?.data.results
  const columns = [
    { name: 'Name', width: '45%' },
    { name: 'Species', width: '15%' },
    { name: 'Status', width: '20%' },
    { name: 'More info', width: '20%' },
  ]
  const statusProperies = ['Alive', 'Dead', 'Unknown']

  const speciesProperties = ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological', 'Unknown', 'Animal', 'Disease', 'Robot', 'Cronenberg', 'Planet']

  const typeProperties = [
    'Human with antennae',
    'Human with ants in his eyes',
    'Fish-Person',
    'Cromulon',
    'Self-aware arm',
    'Cat-Person',
    'Human with baby legs',
    'Parasite',
    'Bepisian',
    'Hivemind',
    'Mytholog',
    'Human with giant head',
    'Dog',
    'Bird-Person',
    'Korblock',
    'Boobloosian',
    'Elephant-Person',
    'Superhuman',
    'Gromflomite',
    'Centaur',
    'Organic gun',
    'Microverse inhabitant',
    'Vampire',
    'Light bulb-Alien',
    'Robot-Crocodile hybrid',
    'Zigerion',
    'Cone-nippled alien',
    'Demon',
  ]

  const genderProperties = ['Female', 'Male', 'Genderless', 'Unknown']

  if (isError) {
    return <div>Some error occured. Please reload page.</div>
  }

  return (
    <Container>
      <FiltersContainer>
        <StyledAccordionRoot type='multiple'>
          <Accordion.Item value='characters'>
            <StyledAccordionHeader>
              <Trigger>Filters</Trigger>
            </StyledAccordionHeader>
            <StyledAccordionContent>
              <StyledButton onClick={onClearFilters}>Clear all filters</StyledButton>
              <StyledAccordionItem value='status'>
                <StyledAccordionHeader>
                  <Trigger>Status</Trigger>
                </StyledAccordionHeader>
                <StyledAccordionContent>
                  {statusProperies.map((el) => (
                    <FilterButton key={el} property={el} value={status} setValue={setStatus} resetPage={resetPage}>
                      {el}
                    </FilterButton>
                  ))}
                </StyledAccordionContent>
              </StyledAccordionItem>
              <StyledAccordionItem value='species'>
                <StyledAccordionHeader>
                  <Trigger>Species</Trigger>
                </StyledAccordionHeader>
                <StyledAccordionContent>
                  {speciesProperties.map((el) => (
                    <FilterButton key={el} property={el} value={species} setValue={setSpecies} resetPage={resetPage}>
                      {el}
                    </FilterButton>
                  ))}
                </StyledAccordionContent>
              </StyledAccordionItem>
              <StyledAccordionItem value='type'>
                <StyledAccordionHeader>
                  <Trigger>Type</Trigger>
                </StyledAccordionHeader>
                <StyledAccordionContent>
                  {typeProperties.map((el) => (
                    <FilterButton key={el} property={el} value={type} setValue={setType} resetPage={resetPage}>
                      {el}
                    </FilterButton>
                  ))}
                </StyledAccordionContent>
              </StyledAccordionItem>
              <StyledAccordionItem value='gender'>
                <StyledAccordionHeader>
                  <Trigger>Gender</Trigger>
                </StyledAccordionHeader>
                <StyledAccordionContent>
                  {genderProperties.map((el) => (
                    <FilterButton key={el} property={el} value={gender} setValue={setGender} resetPage={resetPage}>
                      {el}
                    </FilterButton>
                  ))}
                </StyledAccordionContent>
              </StyledAccordionItem>
            </StyledAccordionContent>
          </Accordion.Item>
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
                  <TableCell>{el.species}</TableCell>
                  <TableCell>{el.status}</TableCell>
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
      <CharacterModal open={open} setOpen={setOpen} id={charid} />
    </Container>
  )
}
