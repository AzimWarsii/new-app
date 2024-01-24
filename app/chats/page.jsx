'use client'
import React from 'react'
import { Container, Flex, Link, Text } from "@chakra-ui/react";
import Chats from "../../components/Chat/Chats";
import Chat from '../../components/Chat/Chat';
import useAuthStore from "../../store/authStore";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../firebase/firebase";

const page = () => {

	const [authUser] = useAuthState(auth)
	if (!authUser)
	{
	 return (<UserNotFound/>)
	}

  return (
    <Flex>
	<Chats/>
	<Container maxW={"container.lg"} my={3} ><Chat /></Container>
	</Flex>
  )
}


const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
			<Text color={"white"}  fontSize={"2xl"}>Login to access</Text>
			<Link  href="/" color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
	);
};

export default page