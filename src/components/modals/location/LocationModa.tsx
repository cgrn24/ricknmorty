import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { useLocationData } from '../../../services/useLocationData'
import { DialogContent, DialogDescription, DialogOverlay, Flex, IconButton, TextContainer } from '../StyledModalElements'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  id: number
}

export const LocationModal: FC<Props> = ({ open, setOpen, id }) => {
  const { locationData, residentsName } = useLocationData(id)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Flex>
            <TextContainer>
              <DialogDescription>
                <b>Location name:</b> {locationData?.name}
              </DialogDescription>
              <DialogDescription>
                <b>Location type:</b> {locationData?.type}
              </DialogDescription>
              <DialogDescription>
                <b>Dimension:</b> {locationData?.dimension}
              </DialogDescription>
              <DialogDescription>
                <b>Location residents:</b> {residentsName.length === 1 ? residentsName[0] : residentsName.join(', ')}
              </DialogDescription>
            </TextContainer>
          </Flex>
          <Dialog.Close asChild>
            <IconButton aria-label='Close'>
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
