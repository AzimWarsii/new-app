import {   Box,
	Button,
	Checkbox,
	Container,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
	Image,
Flex } from "@chakra-ui/react";
import { useRef, useEffect, forwardRef , useState } from 'react'
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
import Reset from "./Reset";
import { set } from "mongoose";

const AuthForm = () => {
	const [login, setLogin] = useState(true);
	
	const [forgotPassword, setForgotPassword] = useState(false);
	
	function handleState() {
		setForgotPassword(!forgotPassword);
	 }


	return (
		<>
			{forgotPassword?
				<><Reset/>
				<Button color={"blue.100"} bg={"transparent"} _hover={"transparent"}
			
				onClick={() => setForgotPassword(!forgotPassword)}>{forgotPassword?"Login":"Forgot Password"}</Button>
				</>
				:
				<Container  maxW="lg" px={{ base: '0', sm: '8' }}>
					 <Stack spacing="8">
					   <Stack spacing="6">
					   <Image  src='/delemateBigWhite.png' objectFit='cover'  h={100} alt='Phone img' />
						 <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
						   <Heading color={"white"} size={{ base: 'xs', md: 'sm' }}>{login?"Log in to your account":"Create an account"} </Heading>
						   <Text color="white">
						   {login?"Don't have an account ?":"Already have an account ?"} <Link onClick={() => setLogin(!login)} color={"blue.100"} bg={"transparent"}>{login?"Signup":"Login"}</Link>
						   </Text>
						 </Stack>
					   </Stack>
					{(login)?<Login change = {handleState} />:<Signup/>}
					 
					
					</Stack>
					
		
				</Container >

				
			}
			
				<Flex  alignItems={"center"} justifyContent={"center"}  gap={1} w={"full"}>
						<Box flex={2} h={"1px"} bg={"gray.400"} />
						<Text mx={1} color={"white"}>
							OR
						</Text>
						<Box flex={2} h={"1px"} bg={"gray.400"} />
					</Flex>

			<Box   borderRadius={4} padding={5}>

			
				<Flex alignItems={"center"} justifyContent={"center"}>
				<GoogleAuth />
				
				</Flex>
				
			</Box>
		</>
	);
};

export default AuthForm;
