import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {server} from "../index"
import { Box, Container, HStack, VStack ,Image, Heading, Text, Button, RadioGroup, Radio, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress} from '@chakra-ui/react';
import Loader from './Loader';
import { Params, useParams } from 'react-router-dom';
import Errorcomponent from './Errorcomponent';
import { Chart } from 'chart.js';

const CoinDetails = () => {
  const [coin,setcoin]=useState([]);
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(false);
  const [currency,setcurrency]=useState("inr");

  const currencySymbol= currency==='inr'?"₹":currency==='eur'?"€":"$";

  const Params=useParams();

  useEffect(() => {
    const fetchCoin=async()=>{
      try {
        console.log(Params.id);
        const data=await axios.get(`${server}/coins/${Params.id}`)
      console.log(data);
      setcoin(data);
      setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    }
    fetchCoin();
}, [Params.id]);

  if(error) return  <Errorcomponent message={"Error while fetching data from Coin"}/>;


  return (
    <Container maxW={'container.xl'}>
    {
      loading?(<Loader/>):(
        <>
        <Box  width={'full'} borderWidth={1}>
          
        </Box>
        <RadioGroup value={'currency'} onChange={setcurrency} p={'8'}>
          <HStack spacing={'4'}>
            <Radio value='inr' >INR</Radio>
            <Radio value='eur'>EUR</Radio>
            <Radio value='usd'>USD </Radio>
          </HStack>
        </RadioGroup>
        <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
          <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
                Last Update on {Date()}
          </Text>

          <Image src={coin.data.image.large} w={'16'} h={'16'} objectFit={'contain'}/>
          <Stat>
            <StatLabel>{coin.data.name}</StatLabel>
            <StatNumber>{currencySymbol} {coin.data.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coin.data.market_data.price_change_percentage_24h>0?"increase":"decrease"}/>
              {coin.data.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>
          <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'white'}>
            {`#${coin.data.market_cap_rank}`}
          </Badge>
          <Customcard high={`${currencySymbol}${coin.data.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.data.market_data.low_24h[currency]}`}/>
          <Box w={'full'} p={'4'}>
              <Item title={"Max Supply"} value={coin.data.market_data.max_supply}/>
              <Item title={"Circulating Supply"} value={coin.data.market_data.circulating_supply}/>
              <Item title={"Market Cap"} value={`${currencySymbol}${coin.data.market_data.market_cap[currency]}`}/>
              <Item title={"All time Low"} value={`${currencySymbol}${coin.data.market_data.atl[currency]}`}/>
              <Item title={"All time high"} value={`${currencySymbol}${coin.data.market_data.ath[currency]}`}/>
          </Box>
        </VStack>
        </>
      )
    }
    </Container>
  )
}

const Item=({title,value})=>(
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const Customcard=({high,low})=>(
  <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)

export default CoinDetails;