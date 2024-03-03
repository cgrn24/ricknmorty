import { FC } from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`
const SearchInput = styled.input`
  width: 300px;
  padding: 8px;
  margin-right: 4px;
  border: none;
  border-bottom: 2px solid #007bff;
  outline: none;

  &:focus {
    border-bottom: 2px solid #0056b3;
  }
`

type Props = {
  value: string
  setValue: (value: string) => void
}

const Search: FC<Props> = ({ value, setValue }) => {
  return (
    <SearchContainer>
      <SearchInput type='text' placeholder='Search' value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    </SearchContainer>
  )
}

export default Search
