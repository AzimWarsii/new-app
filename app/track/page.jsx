'use client'
import React from 'react'

import { Container , Flex, Text , Link} from '@chakra-ui/react'
import Track from '../../components/Track/Track'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../firebase/firebase";


const page = () => {
  const [authUser] = useAuthState(auth)
  if (!authUser)
  {
   return (<UserNotFound/>)
  }
  
  return (
    <>
        
    <div   className='my-8 mx-3 text-white'>Orders</div>
    <Container maxW={"container.lg"} ><Track/></Container>
    </>
  )
}

export default page

const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
			<Text color={"white"} fontSize={"2xl"}>Login to access</Text>
			<Link  href="/" color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
	);
};
