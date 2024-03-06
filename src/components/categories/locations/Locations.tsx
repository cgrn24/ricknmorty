import styled from 'styled-components'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../table/Table'
import { FC, useState } from 'react'
import { FilterButton } from '../../filter-button/FilterButton'
import { Pagination } from '../../pagination/Pagination'
import { LocationModal } from '../../modals/location/LocationModa'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { Loader } from '../../loader/Loader'
import { StyledAccordionContent, StyledAccordionHeader, StyledAccordionItem, StyledAccordionRoot, Trigger } from '../../accordion/Accordion'
import { dimensionProperties, typeProperties } from './locationProperties'
import { useLocationsQuery } from '../../../services/useLocationsQuery'

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

export const Locations: FC<Props> = ({ searchValue }) => {
  const [type, setType] = useState('')
  const [dimension, setDimension] = useState('')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState<boolean>(false)
  const [locid, setLocid] = useState<number>(1)
  const resetPage = () => {
    setPage(1)
  }
  const modalHandler = (id: number) => {
    setOpen(true)
    setLocid(id)
  }
  const onClearFilters = () => {
    setType('')
    setDimension('')
    resetPage()
  }
  const debouncedValue = useDebounce(searchValue, 300)
  const { data, isLoading, isError } = useLocationsQuery({ name: debouncedValue, type, dimension, page })
  const newData = data?.data.results
  const columns = [
    { name: 'Name', width: '35%' },
    { name: 'Type', width: '20%' },
    { name: 'Dimension', width: '25%' },
    { name: 'More info', width: '20%' },
  ]
  if (isError) {
    return <div>Some error occured. Please reload page.</div>
  }
  return (
    <Container>
      <FiltersContainer>
        <StyledAccordionRoot type='multiple'>
          <StyledAccordionItem value='locations'>
            <StyledAccordionHeader>
              <Trigger>Filters</Trigger>
            </StyledAccordionHeader>
            <StyledAccordionContent>
              <StyledButton onClick={onClearFilters}>Clear all filters</StyledButton>
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
              <StyledAccordionItem value='dimensions'>
                <StyledAccordionHeader>
                  <Trigger>Dimension</Trigger>
                </StyledAccordionHeader>
                <StyledAccordionContent>
                  {dimensionProperties.map((el) => (
                    <FilterButton key={el} property={el} value={dimension} setValue={setDimension} resetPage={resetPage}>
                      {el}
                    </FilterButton>
                  ))}
                </StyledAccordionContent>
              </StyledAccordionItem>
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
                  <TableCell>{el.type}</TableCell>
                  <TableCell>{el.dimension}</TableCell>
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
      <LocationModal open={open} setOpen={setOpen} id={locid} />
    </Container>
  )
}
