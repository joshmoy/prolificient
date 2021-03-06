/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { ReactChild, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  Box,
  Button,
  Text,
  Flex,
  Container,
  Image,
  useDisclosure,
  Spinner,
  useToast,
  Input
} from '@chakra-ui/react'
import Link from 'next/link'
import Head from 'next/head'
import { fbIcon, twitterIcon } from '@components/svgs'
import ReactPlayer from 'react-player/lazy'
import { CustomModal } from '@components/CustomModal'
import { usePaystackPayment } from 'react-paystack'
import { FaMoneyBillAlt, FaTicketAlt, FaLocationArrow } from 'react-icons/fa'
import emailService from 'emailKey'

const Home = (): ReactChild => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [videoLink, setVideoLink] = useState('')
  const [videoLoading, setVideoLoading] = useState(false)
  const { NEXT_PUBLIC_PROLIFICIENT_PAYSTACK_API_KEY } = process.env
  const [count, setCount] = useState(1)
  const toast = useToast()
  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = emailService

  const incrementCount = () => setCount((prevState) => prevState + 1)

  const decrementCount = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1)
    }
    return
  }

  const handleStopLoading = () => setVideoLoading(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'name') {
      setName(value)
    } else if (name === 'email') {
      setEmail(value)
    } else {
      setPhone(value)
    }
  }

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: process.env.NEXT_PUBLIC_PROLIFICIENT_AMOUNT * count,
    publicKey: NEXT_PUBLIC_PROLIFICIENT_PAYSTACK_API_KEY,
    currency: 'NGN',
    channels: ['card', 'ussd', 'bank_transfer'],
    label: name
  }

  const initializePayment = usePaystackPayment(config)

  const handleCardPayment = () => {
    const onSuccess = (reference) => {
      const payload = {
        name,
        email,
        phone,
        message: `This ticket admits ${count}`,
        reply_to: 'prolificientfitness1@gmail.com'
      }
      setShowPaymentModal(false)
      emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY).then(
        (result) => {
          toast({
            id: 'Success',
            // title: 'Successful',
            description: 'Your payment was successful. Check your email for more instructions',
            position: 'top-right',
            status: 'success'
          })
        },
        (error) => {
          console.log(error.text)
        }
      )
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

  const features = [
    '25km Endurance Hike',
    'Turn up Mat',
    'Scavenger',
    'Sight Seeing',
    'Fun & Games'
  ]
  return (
    <Box pos="relative">
      <Head>
        <title>Prolificient Fitness</title>
        <meta
          name="description"
          content="Prolificient Fitness is the organizer of 25km Enduranc Hike. This event presents a fantastic opportunity for building excellence, team building, imbibing the culture of walking, and creating role models, in a bid to encourage healthy living and achieving essential sustainable development goals which would lead to a betier and more productive society.
This project also intends introduce outdoor recreational exercises and activities to individuals from different age group. Health professionals will educate participants on general wellbeing, because, it is obvious that the rate of mortality in this part of the world is increasing, basically because of individuals ignorance on the importance of their health and welfare, and when to take necessary ac ons.
Our utmost desire is to make it a long term vision and we are determined at achieving it. We intend organizing this project twice yearly, therefore, giving future sedentary individuals the opportunity to participate in this project, and show the world what we have to offer.
The Prolificient team is made up of fitness and sporting professionals who are dedicated and commitied to our cause. At Prolificient, it is unlimited fun all the way."
        />
        <meta property="og:title" content="Prolificient Fitness" />
        <meta
          property="og:description"
          content="Prolificient Fitness is the organizer of 25km Enduranc Hike. This event presents a fantastic opportunity for building excellence, team building, imbibing the culture of walking, and creating role models, in a bid to encourage healthy living and achieving essential sustainable development goals which would lead to a betier and more productive society.
This project also intends introduce outdoor recreational exercises and activities to individuals from different age group. Health professionals will educate participants on general wellbeing, because, it is obvious that the rate of mortality in this part of the world is increasing, basically because of individuals ignorance on the importance of their health and welfare, and when to take necessary ac ons.
Our utmost desire is to make it a long term vision and we are determined at achieving it. We intend organizing this project twice yearly, therefore, giving future sedentary individuals the opportunity to participate in this project, and show the world what we have to offer.
The Prolificient team is made up of fitness and sporting professionals who are dedicated and commitied to our cause. At Prolificient, it is unlimited fun all the way."
        />
        <meta property="og:type" content="website" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.jpg" />
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
      <CustomModal
        isOpen={showPaymentModal}
        headerText="One more thing"
        onClose={() => setShowPaymentModal(false)}
        width={{ base: '100%', lg: '60rem' }}>
        <>
          <Box mb="2rem" mt="2rem">
            <Text mb="1rem">What should we call you?</Text>
            <Input
              type="text"
              placeholder="john doe"
              name="name"
              fontSize="1.4rem"
              onChange={handleChange}
              _placeholder={{ color: 'gray' }}
            />
          </Box>
          <Box mb="2rem">
            <Text mb="1rem">Give us a valid email address</Text>
            <Input
              type="email"
              fontSize="1.4rem"
              placeholder="johndoe@test.com"
              name="email"
              _placeholder={{ color: 'gray' }}
              onChange={handleChange}
            />
          </Box>
          <Box mb="2rem">
            <Text mb="1rem">Phone Number</Text>
            <Input
              type="tel"
              fontSize="1.4rem"
              placeholder="080*********"
              name="phone"
              _placeholder={{ color: 'gray' }}
              onChange={handleChange}
            />
          </Box>
          <Text>How many tickets do you want to buy?</Text>
          <Flex align="center" mt="1rem">
            <Button
              bgColor="#5956E9"
              color="#fff"
              w="5rem"
              disabled={count === 1}
              onClick={decrementCount}
              _hover={{
                opacity: 0.8,
                bgColor: '#5956E9'
              }}
              h="5rem"
              borderRadius="1rem">
              -
            </Button>
            <Text minW="5rem" textAlign="center">
              {count}
            </Text>
            <Button
              bgColor="#5956E9"
              color="#fff"
              w="5rem"
              onClick={incrementCount}
              _hover={{
                opacity: 0.8,
                bgColor: '#5956E9'
              }}
              h="5rem"
              borderRadius="1rem">
              +
            </Button>
          </Flex>
          <Button
            bgColor="#5956E9"
            color="#fff"
            disabled={!name && !email}
            w="20rem"
            onClick={handleCardPayment}
            mt={{ base: '4rem', lg: '4rem' }}
            _hover={{
              opacity: 0.8,
              bgColor: '#5956E9'
            }}
            h="5rem"
            borderRadius="1rem">
            Make Payment
          </Button>
        </>
      </CustomModal>
      <Flex
        w="10rem"
        h="10rem"
        bgColor="#fff"
        position="fixed"
        zIndex={50}
        top={0}
        shadow="sm"
        left={{ base: 0, lg: '10rem' }}
        borderBottomRightRadius="5rem">
        <Image src="icons/logo.jpg" w="10rem" borderBottomRightRadius="5rem" />
      </Flex>
      <Flex flexDir="column">
        <Flex
          bg={`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(icons/bg.jpg)`}
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
            // onClick={() => setShowPaymentModal(true)}
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
          <Flex
            my="7rem"
            align="center"
            justify="space-between"
            flexDir={{ base: 'column', md: 'row' }}>
            <Flex
              boxShadow="md"
              flexDirection="column"
              align="center"
              justify="center"
              w={{ base: '100%', md: '32%' }}
              mb={{ base: '2rem', md: 0 }}
              h="20rem">
              <Box mb="2rem">
                <FaMoneyBillAlt fontSize="5rem" />
              </Box>
              <Text fontWeight={300} fontSize="2rem">
                Date:
              </Text>
              <Text fontWeight={700} fontSize="2rem">
                02-07-2022
              </Text>
            </Flex>
            <Flex
              boxShadow="md"
              flexDirection="column"
              align="center"
              justify="center"
              w={{ base: '100%', md: '32%' }}
              mb={{ base: '2rem', md: 0 }}
              h="20rem">
              <Box mb="2rem">
                <FaTicketAlt fontSize="5rem" />
              </Box>
              <Text fontWeight={300} fontSize="2rem">
                Ticket Fee
              </Text>
              <Text fontWeight={700} fontSize="2rem">
                10,000
              </Text>
            </Flex>
            <Flex
              boxShadow="md"
              flexDirection="column"
              align="center"
              justify="center"
              w={{ base: '100%', md: '32%' }}
              h="20rem">
              <Box mb="2rem">
                <FaLocationArrow fontSize="5rem" />
              </Box>
              <Text fontWeight={300} fontSize="2rem">
                Meetup
              </Text>
              <Text fontWeight={700} fontSize="2rem">
                CMS Jetty
              </Text>
            </Flex>
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
                // onClick={() => setShowPaymentModal(true)}
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
              <Box boxSize="5rem" mx="4rem" cursor="pointer">
                <Link href="https://twitter.com/prolificientfi1">{twitterIcon}</Link>
              </Box>
              <Box boxSize="5rem" cursor="pointer">
                <Link href="https://www.instagram.com/prolificientfi1/">
                  <Image src="icons/ig.png" w="full" h="full" />
                </Link>
              </Box>
            </Flex>
          </Flex>
          <Box my="5rem" px={{ base: '2rem', lg: '10rem' }}>
            <Text
              mb="3rem"
              fontWeight="600"
              fontSize={{ base: '2.8rem', lg: '4rem' }}
              textAlign={{ base: 'center', lg: 'left' }}>
              Partners
            </Text>
            <Flex>
              <Box w="10rem" mr="1rem">
                <Image src="icons/Rite.png" w="full" h="full" />
              </Box>
              <Box w="20rem">
                <Image src="icons/adnan.jpeg" w="full" h="full" />
              </Box>
            </Flex>
          </Box>
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
