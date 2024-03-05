import * as RadixSelect from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { FC } from 'react'
import styled from 'styled-components'
import { Category } from '../../pages/MainPage'

type Props = {
  category: Category
  setCategory: (value: Category) => void
}

const Trigger = styled(RadixSelect.Trigger)`
  width: 132px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0 15px;
  font-size: 16px;
`
const SelectContent = styled(RadixSelect.Content)`
  overflow: hidden;
  background-color: white;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`
const Item = styled(RadixSelect.Item)`
  font-size: 16px;
  color: black;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 28px 5px 28px;
  position: relative;
  user-select: none;
  &:focus {
    color: white;
    background-color: #007bff;
  }
`

export const SelectCategory: FC<Props> = ({ category, setCategory }) => {
  const items = ['Characters', 'Episodes', 'Locations']
  const seletItems = items.map((item, index) => {
    return (
      <Item key={index} value={item}>
        <RadixSelect.ItemText>{item}</RadixSelect.ItemText>
      </Item>
    )
  })

  const currentPlaceholder = items[0]

  return (
    <RadixSelect.Root value={category} onValueChange={setCategory}>
      <Trigger>
        <RadixSelect.Value placeholder={currentPlaceholder} />
        <RadixSelect.Icon>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </Trigger>

      <RadixSelect.Portal>
        <SelectContent avoidCollisions={false} position={'popper'}>
          <RadixSelect.Viewport>{seletItems}</RadixSelect.Viewport>
        </SelectContent>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
