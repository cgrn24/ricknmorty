import { FC } from 'react'

import styled from 'styled-components'

type Table = {
  children: React.ReactNode
}
type Columns = {
  columns: string[]
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
`

export const Table: FC<Table> = ({ children }) => {
  return <StyledTable>{children}</StyledTable>
}

export const TableHead: FC<Table> = ({ children }) => {
  return <thead>{children}</thead>
}

export const TableBody: FC<Table> = ({ children }) => {
  return <tbody>{children}</tbody>
}

export const TableRow: FC<Table> = ({ children }) => {
  return <tr>{children}</tr>
}

const StyledHeadCell = styled.th`
  padding: 6px 24px;
  > span {
    user-select: none;
    display: flex;
    gap: 4px;
    align-items: center;
  }
`

export const TableHeadCell: FC<Table> = ({ children }) => {
  return (
    <StyledHeadCell>
      <span>{children}</span>
    </StyledHeadCell>
  )
}

const StyledCell = styled.td`
  padding: 6px 24px;

  border-bottom: 1px solid grey;
`
export const TableCell: FC<Table> = ({ children }) => {
  return <StyledCell>{children}</StyledCell>
}

export const TableHeader: FC<Columns> = ({ columns }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((el) => (
          <TableHeadCell key={el}>{el}</TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
