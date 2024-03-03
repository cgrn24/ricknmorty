import styled from 'styled-components'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { FC, ReactNode } from 'react'

// Стили для корневого аккордеона
export const StyledAccordionRoot = styled(RadixAccordion.Root)`
  width: 100%;
`

// Стили для элемента аккордеона
export const StyledAccordionItem = styled(RadixAccordion.Item)`
  width: 100%;
  // Добавьте стили, которые вам нужны для каждого элемента аккордеона
`

// Стили для заголовка аккордеона
export const StyledAccordionHeader = styled(RadixAccordion.Header)`
  width: 100%;
  // Добавьте стили, которые вам нужны для заголовка аккордеона
`

// Стили для триггера аккордеона
export const StyledAccordionTrigger = styled(RadixAccordion.Trigger)`
  // Добавьте стили, которые вам нужны для триггера аккордеона
  width: 100%; // Чтобы триггер занимал всю ширину контейнера
  font-size: 16px;
  /* background-color: #8383aa; */
  color: black;
  border: none;
  border-bottom: 1px solid #8383aa78;
  cursor: pointer;
  text-align: center;
`

// Стили для контента аккордеона
export const StyledAccordionContent = styled(RadixAccordion.Content)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  // Добавьте стили, которые вам нужны для контента аккордеона
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
