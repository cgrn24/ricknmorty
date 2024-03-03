import styled, { keyframes } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { getCharacter, getEpisode } from 'rickmortyapi'
import { useQuery } from '@tanstack/react-query'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  id: number
}

export const EpisodeModal: FC<Props> = ({ open, setOpen, id }) => {
  const residents: number[] = []
  const getEp = async () => {
    const data = await getEpisode(id)
    return data
  }
  const query = useQuery({ queryKey: ['episode', id], queryFn: getEp })
  const newData = query.data?.data
  newData?.characters.forEach((el) => {
    const parts = el.split('/')
    const dataAfterLastSlash = parts[parts.length - 1]
    residents.push(+dataAfterLastSlash)
  })
  const getChars = async () => {
    const data = await getCharacter(residents)
    return data
  }
  const { data: episodeChars, isSuccess } = useQuery({ queryKey: ['episodeChars', id, newData], queryFn: getChars, refetchOnWindowFocus: false })
  const charactersName: string[] = []
  if (isSuccess) {
    if (!episodeChars.data.length) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      episodesNumber.push(episodesData.data.episode)
    } else {
      episodeChars.data.forEach((el) => {
        charactersName.push(el.name)
      })
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Flex>
            <TextContainer>
              <DialogDescription>
                <b>Episode name:</b> {newData?.name}
              </DialogDescription>
              <DialogDescription>
                <b>Episode air date:</b> {newData?.air_date}
              </DialogDescription>
              <DialogDescription>
                <b>Episode code:</b> {newData?.episode}
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
