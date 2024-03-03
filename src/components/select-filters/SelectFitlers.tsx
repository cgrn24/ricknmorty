import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { CheckIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export const Filters = () => {
  const [items, setItems] = useState<string[] | null>(null)
  console.log(items)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>Filters </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.CheckboxItem onCheckedChange={() => setItems} onSelect={(e) => e.preventDefault()}>
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            abc
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem onCheckedChange={() => setItems} onSelect={(e) => e.preventDefault()}>
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            cdf
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem onCheckedChange={() => setItems} onSelect={(e) => e.preventDefault()}>
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            fdg
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
