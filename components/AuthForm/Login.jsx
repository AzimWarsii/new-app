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
	IconButton,
	InputRightElement,
    InputGroup,
	Link,
	Stack,
	useDisclosure,
	Text,Flex,Alert,AlertIcon }from "@chakra-ui/react";

import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import Reset from "./Reset";
import { HiEye, HiEyeOff } from 'react-icons/hi'

const Login = ({change}) => {
	
	const onClickReveal = () => {
		onToggle()
	  }
	const { isOpen, onToggle } = useDisclosure()
	
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { loading, error, login } = useLogin();
	return (
		
		
			
					 <Stack spacing="8">
					   <Box
					   
						 py={{ base: '0', sm: '8' }}
						 px={{ base: '4', sm: '10' }}
						 bg={{ base: 'transparent', sm: 'white' }}
						 boxShadow={{ base: 'none', sm: 'md' }}
						 borderRadius={{ base: 'none', sm: 'xl' }}
					   >
						 <Stack spacing="6">
						   <Stack spacing="5">
							 <FormControl>
							   <FormLabel color={{ base: 'white', sm: 'black' }}  htmlFor="email">Email</FormLabel>
							   <Input
							   _hover={{ borderColor: "blue.200" }}
							   borderColor={"blue.100"}
							   value={inputs.email}
							   onChange={(e) => setInputs({ ...inputs, email: e.target.value })} color={{ base: 'white', sm: 'black' }} id="email" type="email" />
							
							 <FormLabel color={{ base: 'white', sm: 'black' }}  >Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
			color={{ base: 'white', sm: 'black' }}
              variant="text"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff  /> : <HiEye   />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
		  _hover={{ borderColor: "blue.200" }}
		  borderColor={"blue.100"}
            color={{ base: 'white', sm: 'black' }}
            type={isOpen ? 'text' : 'password'}
			value={inputs.password}
            autoComplete="current-password"
			onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
        </InputGroup>
		</FormControl>
						   </Stack>
						   <HStack justify="space-between">
							 <Checkbox color={{ base: 'white', sm: 'black' }} defaultChecked>Remember me</Checkbox>
							 <Button color={"blue.200"}  onClick = {() => change()}    variant="text" size="xs">
							 Forgot Password
							 </Button>
						   </HStack>
						   {error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}
						   <Stack spacing="6">
							 <Button bgColor={"blue.700"} _hover={{ bgColor: "blue.600" }} onClick={() => login(inputs)}  isLoading={loading} > <Text color={"white"}>Sign in</Text></Button>
							 
						   </Stack>
						 </Stack>
					   </Box>
					 </Stack>
				
	);
};

export default Login;
