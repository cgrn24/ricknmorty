import styled, { keyframes } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { useCharacterData } from '../../../services/useCharacterData'

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
const TextContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`

const overlayShow = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const contentShow = keyframes`
  0% { opacity: 0; transform: translate(-50%, -48%) scale(.96); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: #697b8b;
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 2s cubic-bezier(0.16, 1, 0.3, 1);
`

const DialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 600px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`

const DialogDescription = styled(Dialog.Description)`
  margin-bottom: 5px;
  color: black;
  font-size: 15px;
  line-height: 1.5;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const IconButton = styled.button`
  all: unset;
  font-family: inherit;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: black;
  position: absolute;
  top: 10px;
  right: 10px;
`
