import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { useEpisodeData } from '../../../services/useEpisodeData'
import { DialogContent, DialogDescription, DialogOverlay, Flex, IconButton, TextContainer } from '../StyledModalElements'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  id: number
}

export const EpisodeModal: FC<Props> = ({ open, setOpen, id }) => {
  const { episodeData, charactersName } = useEpisodeData(id)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Flex>
            <TextContainer>
              <DialogDescription>
                <b>Episode name:</b> {episodeData?.name}
              </DialogDescription>
              <DialogDescription>
                <b>Episode air date:</b> {episodeData?.air_date}
              </DialogDescription>
              <DialogDescription>
                <b>Episode code:</b> {episodeData?.episode}
              </DialogDescription>
              <DialogDescription>
                <b>Episode characters:</b> {charactersName.length === 1 ? charactersName[0] : charactersName.join(', ')}
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
