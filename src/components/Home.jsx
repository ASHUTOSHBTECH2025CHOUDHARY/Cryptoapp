import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react'
import {Link} from "react-router-dom"
import {motion} from "framer-motion"

const Home = () => {
  return (
    <Box bgColor={'black'} w={'full'} h={'85vh'}>
      <motion.div style={{height:'80vh'}} animate={{translateY:'20px'}} transition={{duration:2,repeat:Infinity,repeatType:'reverse'}}>
      <Image w={'full'} h={'70vh'} objectFit={'contain'} src={`https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?cs=srgb&dl=pexels-worldspectrum-844124.jpg&fm=jpg`} filter={'grayscale(1)'}/>
      </motion.div>
      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whatsapp.700'} >
        XCRYPTO
      </Text>
    </Box>
  )
}

export default Home;