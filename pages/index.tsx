/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { ReactChild, useState } from 'react'
import {
  Box,
  Button,
  Text,
  Flex,
  Container,
  Image,
  useDisclosure,
  Spinner,
  useToast
} from '@chakra-ui/react'
import Head from 'next/head'
import { fbIcon, twitterIcon } from '@components/svgs'
import ReactPlayer from 'react-player/lazy'
import { CustomModal } from '@components/CustomModal'
import { usePaystackPayment } from 'react-paystack'

const Home = (): ReactChild => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [videoLink, setVideoLink] = useState('')
  const [videoLoading, setVideoLoading] = useState(false)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const { NEXT_PUBLIC_PROLIFICIENT_PAYSTACK_API_KEY } = process.env
  const toast = useToast()

  const handleStopLoading = () => setVideoLoading(false)

  const config = {
    reference: new Date().getTime().toString(),
    email: 'test@gmail.com',
    amount: 500000,
    publicKey: NEXT_PUBLIC_PROLIFICIENT_PAYSTACK_API_KEY,
    currency: 'NGN',
    channels: ['card', 'bank', 'ussd', 'bank_transfer'],
    label: 'John Doe'
  }

  const initializePayment = usePaystackPayment(config)

  const handleCardPayment = () => {
    const onSuccess = (reference) => {
      toast({
        id: 'Success',
        // title: 'Successful',
        description: 'Your payment was successful. Check your email for more instructions',
        position: 'top-right',
        status: 'success'
      })
      // router.push('/orders')
      //   handleOrder({ ...payload, transactionID: reference.transaction })
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onClose = () => {
      toast({
        // title: 'Something went wrong',
        id: 'error',
        description: 'Something went wrong. Please try again',
        position: 'top-right',
        status: 'error'
      })
    }

    initializePayment(onSuccess, onClose)
  }

  const handleOpenVideo = (link: string) => {
    setVideoLink(link)
    setVideoLoading(true)
    onOpen()
  }
  const videoLinks = [
    {
      src: 'icons/2.png',
      url: 'https://res.cloudinary.com/difnldi4c/video/upload/v1649582217/Hike_Video_shopng.mp4'
    },
    {
      src: 'icons/8.png',
      url: 'https://res.cloudinary.com/difnldi4c/video/upload/v1649582217/Hike_Video2_bgaoot.mp4'
    },
    {
      src: 'icons/5.png',
      url: 'https://res.cloudinary.com/difnldi4c/video/upload/v1649582219/Hike_Video3_xbp6uj.mp4'
    }
  ]

  const features = ['25km Endurance Trek', 'Camping', 'Bon Fire', 'Boat Cruise', 'Fun & Games']
  return (
    <Box pos="relative">
      <Head>
        <title>Home</title>
      </Head>
      <CustomModal isOpen={isOpen} onClose={onClose} width={{ base: '100%', lg: '60rem' }}>
        <>
          {videoLoading && (
            <Flex h="5rem" align="center" justify="center">
              <Spinner />
            </Flex>
          )}
          <ReactPlayer
            url={videoLink}
            playing={true}
            volume={0.3}
            controls={true}
            onReady={handleStopLoading}
            width="100%"
            height="100%"
          />
        </>
      </CustomModal>
      <Flex
        w="10rem"
        h="10rem"
        bgColor="#fff"
        position="fixed"
        top={0}
        shadow="sm"
        left={{ base: 0, lg: '10rem' }}
        borderBottomRightRadius="5rem">
        <Image src="icons/logo.jpg" w="10rem" borderBottomRightRadius="5rem" />
      </Flex>
      <Flex flexDir="column">
        <Flex
          bg={`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(/icons/bg.jpg)`}
          h="80vh"
          bgPosition="center"
          align="center"
          justify="center"
          flexDir="column"
          bgSize="cover"
          bgRepeat="no-repeat">
          <Box color="#fff">
            <Text fontSize={{ base: '5rem', lg: '10rem' }} fontWeight="700" className="neon">
              READY . SET
            </Text>
            <Text
              fontWeight="700"
              lineHeight="7rem"
              class="text--glitch"
              data-text="Evolve"
              fontSize={{ base: '8rem', lg: '16rem' }}>
              EVOLVE
            </Text>
          </Box>
          <Button
            bgColor="#5956E9"
            color="#fff"
            w="20rem"
            onClick={handleCardPayment}
            mt={{ base: '4rem', lg: '4rem' }}
            _hover={{
              opacity: 0.8,
              bgColor: '#5956E9'
            }}
            h="5rem"
            borderRadius="1rem">
            Buy Ticket
          </Button>
        </Flex>
        <Container p="0" w={{ base: '90%', lg: '120rem' }} maxW="120rem">
          <Flex justify="space-between" align="center" my="7rem">
            <Box w="40%" display={{ base: 'none', lg: 'block' }}>
              <Image src="icons/feat.jpg" />
            </Box>
            <Box w={{ base: '100%', lg: '40%' }}>
              <Text
                mb="3rem"
                fontWeight="600"
                fontSize={{ base: '2.8rem', lg: '4rem' }}
                textAlign={{ base: 'center', lg: 'left' }}>
                Features
              </Text>
              <Box>
                {features?.map((el, id) => (
                  <Flex
                    key={id}
                    boxShadow="md"
                    align="center"
                    pl="2rem"
                    transition=".7s"
                    _hover={{
                      transform: 'translateX(20px)',
                      transition: '.7s'
                    }}
                    borderRadius="1rem"
                    h="5rem"
                    _notLast={{ mb: '2rem' }}>
                    <Box
                      boxSize="1rem"
                      borderRadius="full"
                      bgColor="rgba(89, 86, 233, 0.4)"
                      mr="1rem"></Box>
                    <Text>{el}</Text>
                  </Flex>
                ))}
              </Box>
            </Box>
          </Flex>
          <Box my="5rem">
            <Text
              mb="3rem"
              fontWeight="600"
              fontSize={{ base: '2.8rem', lg: '4rem' }}
              textAlign={{ base: 'center', lg: 'left' }}>
              Memory Lane
            </Text>
            <Flex justify="space-between" flexDir={{ base: 'column', lg: 'row' }}>
              {videoLinks?.map((el, id) => (
                <Flex
                  key={id}
                  bg={`linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url(${el.src})`}
                  w={{ base: '100%', lg: '38rem' }}
                  mb={{ base: '3rem', lg: 0 }}
                  bgPosition="center"
                  bgSize="cover"
                  onClick={() => handleOpenVideo(el.url)}
                  cursor="pointer"
                  bgRepeat="no-repeat"
                  borderRadius="2rem"
                  transition=".5s"
                  shadow="xl"
                  _hover={{
                    bg: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${el.src})`
                  }}
                  align="center"
                  justify="center"
                  className="video-box"
                  h="30rem">
                  <Text
                    color="#fff"
                    border="1px solid #fff"
                    p="1rem 4rem"
                    transition=".5s"
                    display={{ base: 'block', lg: 'none' }}
                    sx={{
                      '.video-box:hover &': {
                        display: 'block',
                        transition: '.5s'
                      }
                    }}>
                    Play
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
          <Flex
            px={{ base: '2rem', lg: '10rem' }}
            bgColor="#F9B8C3"
            h="35rem"
            my="5rem"
            borderRadius="5rem"
            align="center"
            justify="space-between">
            <Flex
              w={{ base: '100%', lg: '48%' }}
              flexDir="column"
              align={{ base: 'center', lg: 'flex-start' }}>
              <Text fontSize={{ base: '2.8rem', lg: '4rem' }} fontWeight="600" color="#5956E9">
                You want to Evolve? Get your tickets here.
              </Text>
              <Button
                bgColor="#5956E9"
                color="#fff"
                w="20rem"
                _hover={{
                  opacity: 0.8,
                  bgColor: '#5956E9'
                }}
                mt="4rem"
                onClick={handleCardPayment}
                h="5rem"
                borderRadius="1rem">
                Buy Now
              </Button>
            </Flex>
            <Box w={{ base: '100%', lg: '48%' }} display={{ base: 'none', lg: 'block' }}>
              <Image src="icons/lottie.gif" w="35rem" h="full" m="0 auto" />
            </Box>
          </Flex>
          <Flex
            position="relative"
            m="5rem 0"
            w="full"
            justify="space-between"
            align="center"
            flexDir={{ base: 'column', lg: 'row' }}>
            <Box w={{ base: '100%', lg: '48%' }} pl={{ base: 0, lg: '10rem' }}>
              <Text
                fontWeight="600"
                fontSize={{ base: '2.8rem', lg: '4rem' }}
                textAlign={{ base: 'center', lg: 'left' }}>
                Follow us on social media to get latest updates
              </Text>
            </Box>
            <Flex w={{ base: '100%', lg: '48%' }} justify="center" mt={{ base: '3rem', lg: 0 }}>
              <Box boxSize="5rem">{fbIcon}</Box>
              <Box boxSize="5rem" mx="4rem">
                {twitterIcon}
              </Box>
              <Box boxSize="5rem">
                <Image src="icons/ig.png" w="full" h="full" />
              </Box>
            </Flex>
          </Flex>

          <Flex align="center" justify="center" h="8rem">
            <Text color="#000" fontWeight="700">
              Copyright 2022{' '}
              <Text as="span" color="#656565">
                prolificient.com
              </Text>
            </Text>
          </Flex>
        </Container>
      </Flex>
    </Box>
  )
}

export default Home
