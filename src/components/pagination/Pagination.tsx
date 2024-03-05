import { FC } from 'react'
import styled from 'styled-components'

type Props = {
  totalPages: number | undefined
  currentPage: number
  setCurrentPage: (value: number | ((prevValue: number) => number)) => void
}

const StyledButton = styled.button`
  padding: 4px 8px;
  background-color: lightgray;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  &:disabled {
    background-color: #e0e0e0;
    color: #a8a8a8;
  }
`

const StyledContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 300px;
  display: inline-flex;
  justify-content: space-between;
`

export const Pagination: FC<Props> = ({ totalPages, currentPage, setCurrentPage }) => {
  const nextPage = () => {
    setCurrentPage((value) => value + 1)
  }

  const prevPage = () => {
    setCurrentPage((prevPage: number) => Math.max(prevPage - 1, 1))
  }
  return (
    <StyledContainer>
      <StyledButton onClick={prevPage} disabled={currentPage === 1}>
        Previous Page
      </StyledButton>
      <span>
        Page {currentPage} of {totalPages ? totalPages : 1}
      </span>
      <StyledButton onClick={nextPage} disabled={currentPage === totalPages}>
        Next Page
      </StyledButton>
    </StyledContainer>
  )
}
