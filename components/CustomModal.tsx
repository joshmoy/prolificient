/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  onClose: () => void
  isOpen: boolean
  children: ReactNode
  width?: any
}

const CustomModal = ({ onClose, isOpen, children, width, ...rest }: Props) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside">
      <ModalOverlay bgColor="rgba(0, 0, 0, 0.4)" />
      <ModalContent
        maxW={{ base: '90%', lg: '80rem' }}
        w={width}
        p={{ base: '1rem', lg: '5rem' }}
        {...rest}>
        <ModalHeader
          p="0"
          fontWeight="600"
          fontSize={{ base: '2.4rem', lg: '3.4rem' }}
          lineHeight="5.4rem"
          textTransform="capitalize">
          Watch Video
        </ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} />

        <ModalBody p="0">{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export { CustomModal }
