import { FC } from 'react'
import styled from 'styled-components'
import Search from '../search/Search'
import { SelectCategory } from '../select-category/SelectCategory'
import { Category } from '../../pages/MainPage'

const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
`
type Props = {
  category: Category
  setCategory: (value: Category) => void
  searchValue: string
  setSearchValue: (value: string) => void
}
export const Toolbar: FC<Props> = ({ category, searchValue, setCategory, setSearchValue }) => {
  return (
    <Container>
      <Search setValue={setSearchValue} value={searchValue} />
      <SelectCategory category={category} setCategory={setCategory} />
    </Container>
  )
}
