import { FC, ReactNode } from 'react'
import styled from 'styled-components'

type StyledButtonProps = {
  value: string
  property: string
}
type Props = {
  value: string
  setValue: (value: string) => void
  property: string
  children: ReactNode
  resetPage: () => void
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => (props.value === props.property ? '#007bff' : 'white')};
  padding: 4px 8px;
  border: 1px solid black;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${(props) => (props.value === props.property ? '#0056b3' : 'lightgray')};
  }
`

export const FilterButton: FC<Props> = ({ value, setValue, property, resetPage, children }) => {
  const handleClick = () => {
    if (value === property) {
      setValue('')
    } else setValue(property)
    resetPage()
  }

  return (
    <StyledButton onClick={handleClick} value={value} property={property}>
      {children}
    </StyledButton>
  )
}
