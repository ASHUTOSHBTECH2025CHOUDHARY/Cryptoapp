import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {server} from "../index"
import { Box, Container, HStack, VStack ,Image, Heading, Text} from '@chakra-ui/react';
import Loader from './Loader';
import Errorcomponent from './Errorcomponent';
import { wrap } from 'framer-motion';

const Exchanges = () => {

  const [exchanges,setexchange]=useState([]);
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(false);

  useEffect(() => {
      const fetchExchanges=async()=>{
        try {
          const data=await axios.get(`${server}/exchanges`)
        console.log(data);
        setexchange(data);
        setloading(false);
        } catch (error) {
          seterror(true);
          setloading(false);
        }
      }
      fetchExchanges();
  }, []);
  
  if(error) return  <Errorcomponent message={"Error while fetching data from api"}/>;
  
  return (
    <Container maxW={'container.xl'}>{
      loading?(<Loader/>):(
      <>
        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
          {
            exchanges.data.map((i)=>(
              <Exchangecard key={i.id} id={i.id} name={i.name} img={i.image} url={i.url} rank={i.trust_score_rank
              }/>
            ))
          }
        </HStack>
      </>
      )}
    </Container>
  );
};

const Exchangecard=({id,name,img,rank,url})=>(
  
      <a href={url} target={'blank'}>
      <VStack w={"52"} shadow={'dark-lg'} p={'8'} borderRadius={'lg'} transition={'all 0.5s'} m={'4'}
        css={{"&:hover":{
          transform:"scale(1.1)"
        }}}
      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} />
        <Heading size={'md'} noOfLines={'1'}>
            {rank}
        </Heading>
        <Text noOfLines={'1'}>
          {name}
        </Text>
      </VStack>
      
    </a>
);

export default Exchanges;