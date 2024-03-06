import styled, { keyframes } from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const TextContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`

export const overlayShow = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const contentShow = keyframes`
  0% { opacity: 0; transform: translate(-50%, -48%) scale(.96); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: #697b8b;
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 2s cubic-bezier(0.16, 1, 0.3, 1);
`

export const DialogContent = styled(Dialog.Content)`
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

export const DialogDescription = styled(Dialog.Description)`
  margin-bottom: 5px;
  color: black;
  font-size: 15px;
  line-height: 1.5;
`

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const IconButton = styled.button`
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
