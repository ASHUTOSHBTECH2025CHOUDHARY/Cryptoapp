import { Avatar, Box, Stack, VStack, Text } from '@chakra-ui/react';
import React from 'react'
import {motion} from "framer-motion"

const Footer = () => {
  return (
    <Box bgColor={'black'} color={'whiteAlpha.700'} minH={'48'} px={'16'} py={['16','8']}>
        <Stack direction={['column','row']} h={'full'} alignItems={'center'}>
            <VStack w={'full'} alignItems={['center','flex-start']}>
                <Text fontWeight={'bold'}>About Us</Text>
                <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center','left']}>We are the best crypto trading app in India,We provide our guidance at very cheap price</Text>
            </VStack>
            <VStack>
                <Avatar boxSize={'28'} mt={['4','0']}/>
                <Text>OUR FOUNDER</Text>
            </VStack>
        </Stack>
    </Box>
  )
}

export default Footer;