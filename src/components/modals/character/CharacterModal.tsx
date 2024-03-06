import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { useCharacterData } from '../../../services/useCharacterData'
import { DialogContent, DialogDescription, DialogOverlay, Flex, IconButton, TextContainer } from '../StyledModalElements'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  id: number
}

export const CharacterModal: FC<Props> = ({ open, setOpen, id }) => {
  const { characterData, episodesNumber } = useCharacterData(id)
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Flex>
            <AvatarContainer>
              <Avatar src={characterData?.image} />
            </AvatarContainer>
            <TextContainer>
              <DialogDescription>
                <b>Name:</b> {characterData?.name}
              </DialogDescription>
              <DialogDescription>
                <b>Gender:</b> {characterData?.gender}
              </DialogDescription>
              <DialogDescription>
                <b>Location:</b> {characterData?.location.name}
              </DialogDescription>
              <DialogDescription>
                <b>Origin:</b> {characterData?.origin.name}
              </DialogDescription>
              <DialogDescription>
                <b>Species:</b> {characterData?.species}
              </DialogDescription>
              <DialogDescription>
                <b>Type:</b> {characterData?.type}
              </DialogDescription>
              <DialogDescription>
                <b>Status:</b> {characterData?.status}
              </DialogDescription>
              <DialogDescription>
                <b>Episodes:</b> {episodesNumber.length === 1 ? episodesNumber[0] : episodesNumber.join(', ')}
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

const Avatar = styled.img`
  object-fit: cover;
`
const AvatarContainer = styled.div`
  height: 300px;
  width: 300px;
  overflow: hidden;
  border: 1px black solid;
  border-radius: 15px;
`
