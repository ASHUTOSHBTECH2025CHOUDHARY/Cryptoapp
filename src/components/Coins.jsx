import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {server} from "../index"
import { Box, Container, HStack, VStack ,Image, Heading, Text, Button, RadioGroup, Radio} from '@chakra-ui/react';
import Loader from './Loader';
import Errorcomponent from './Errorcomponent';
import { wrap } from 'framer-motion';
import CoinCard from './CoinCard';
import { withTheme } from '@emotion/react';

const Coins = () => {

  const [coins,setcoins]=useState([]);
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(false);
  const [page,setpage]=useState(1);
  const [currency,setcurrency]=useState("inr")

  useEffect(() => {
      const fetchCoins=async()=>{
        try {
          const data=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        console.log(data);
        setcoins(data);
        setloading(false);
        } catch (error) {
          seterror(true);
          setloading(false);
        }
      }
      fetchCoins();
  }, [currency,page]);

  const currencySymbol= currency==='inr'?"₹":currency==='eur'?"€":"$"; 

  const changePage=(page)=>{
    setloading(true);
    setpage(page);
  }
  
  if(error) return  <Errorcomponent message={"Error while fetching data from Coins"}/>;
  
  return (
    <Container maxW={'container.xl'}>{
      loading?(<Loader/>):(
      <>
      <RadioGroup value={'currency'} onChange={setcurrency} p={'8'}>
        <HStack spacing={'4'}>
          <Radio value='inr' >INR</Radio>
          <Radio value='eur'>EUR</Radio>
          <Radio value='usd'>USD </Radio>
        </HStack>
      </RadioGroup>
        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
          {
            coins.data.map((i)=>(
              <CoinCard key={i.id} id={i.id} name={i.name} price={i.current_price} symbol={i.symbol} img={i.image} url={i.url} rank={i.trust_score_rank} 
              currencySymbol={currencySymbol}
              />
            ))
          }
        </HStack>
        <HStack>
            <Button marginBottom={'2'} color={'white'} bgColor={'blackAlpha.900'} onClick={()=>changePage(page+1)}>Next</Button>
        </HStack>
      </>
      )}
    </Container>
  );
};

const Exchangecard=({name,img,rank,url})=>(
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

export default Coins;