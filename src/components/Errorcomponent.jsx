import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react'

const Errorcomponent = ({message}) => {
  return (
    <Alert position={'fixed'} left={'50%'} bottom={'4'} transform={"translateX(-50%)"}
    w={'container.xl'}
    >
      <AlertIcon/>
      {message}
    </Alert>
    )
}

export default Errorcomponent;