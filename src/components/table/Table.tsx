import { FC } from 'react'

import styled from 'styled-components'

type Table = {
  children: React.ReactNode
}

type TableHeadCell = {
  children: React.ReactNode
  width: string
}

type Column = {
  name: string
  width: string
}

type Columns = {
  columns: Column[]
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
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

const StyledHeadCell = styled.th<{ width: string }>`
  width: ${(props) => props.width};
  padding: 6px 24px;
  > span {
    user-select: none;
    display: flex;
    gap: 4px;
    align-items: center;
  }
`

export const TableHeadCell: FC<TableHeadCell> = ({ children, width }) => {
  return (
    <StyledHeadCell width={width}>
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
          <TableHeadCell key={el.name} width={el.width}>
            {el.name}
          </TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
