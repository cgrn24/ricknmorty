import styled from 'styled-components'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { FC, ReactNode } from 'react'

export const StyledAccordionRoot = styled(RadixAccordion.Root)`
  width: 100%;
`

export const StyledAccordionItem = styled(RadixAccordion.Item)`
  width: 100%;
`
export const StyledAccordionHeader = styled(RadixAccordion.Header)`
  width: 100%;
`

export const StyledAccordionTrigger = styled(RadixAccordion.Trigger)`
  width: 100%;
  font-size: 16px;
  color: black;
  border: none;
  border-bottom: 1px solid #8383aa78;
  cursor: pointer;
  text-align: center;
`

export const StyledAccordionContent = styled(RadixAccordion.Content)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

type Props = {
  children: ReactNode
}
export const Trigger: FC<Props> = ({ children }) => {
  return (
    <StyledAccordionTrigger>
      {children} <ChevronDownIcon />
    </StyledAccordionTrigger>
  )
}
