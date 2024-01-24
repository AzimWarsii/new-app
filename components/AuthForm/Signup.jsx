//import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Text ,Input,FormControl, FormLabel, InputGroup, InputRightElement, useDisclosure , Select , Container, Stack ,HStack,Box, Checkbox, IconButton} from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { HiEye, HiEyeOff } from 'react-icons/hi'


const Signup = () => {
	const onClickReveal = () => {
		onToggle()
	  }
	const { isOpen, onToggle } = useDisclosure()
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
		role:"",
	});
	console.log(inputs)
	const [showPassword, setShowPassword] = useState(false);
	
	const { loading, error, signup } = useSignUpWithEmailAndPassword();

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

						 	<FormLabel color={{ base: 'white', sm: 'black' }}  htmlFor="email">Username</FormLabel>	
							 <Input
							 _hover={{ borderColor: "blue.200" }}
							 borderColor={"blue.100"}
							 color={{ base: 'white', sm: 'black' }}
							value={inputs.username}
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
							/>

					   <FormLabel color={{ base: 'white', sm: 'black' }}  htmlFor="email">Email</FormLabel>
							   <Input
							   _hover={{ borderColor: "blue.200" }}
							   borderColor={"blue.100"}
								color={{ base: 'white', sm: 'black' }}
		 						value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
		 						/>

			<FormLabel color={{ base: 'white', sm: 'black' }}  >Password</FormLabel>
       			 <InputGroup>
        		  <InputRightElement>
       		     <IconButton
				 color={{ base: 'white', sm: 'black' }}
       		       variant="text"
       		       aria-label={isOpen ? 'Mask password' : 'Reveal password'}
        		      icon={isOpen ? <HiEyeOff /> : <HiEye />}
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

									<Select 
									iconSize="0"
									_hover={{ borderColor: "blue.200" }}
									borderColor={"blue.100"}
					className="selectAuth bg-transparent"
				placeholder='Sign in As'
					color={{ base: 'white', sm: 'black' }}
					
					value={inputs.role}
					onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
					>
 				<option color={{ base: 'black', sm: 'black' }} value='user'>user</option>
  		 			<option color={{ base: 'black', sm: 'black' }} value='mate'>mate</option>
		 			</Select>
							 </FormControl>
							 // 				   {error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}
						   </Stack>
						   <HStack justify="space-between">
							
							 <Button   color={{ base: 'white', sm: 'black' }}  variant="text" size="md">
							 Do assign yourself a role!!
							 </Button>
						   </HStack>
						   <Stack spacing="6">
						   <Button 
						   bgColor={"blue.700"} _hover={{ bgColor: "blue.600" }}
						colorScheme='facebook'
						isLoading={loading}
						onClick={() => signup(inputs)}><Text color="white">Create</Text></Button>
							 
						   </Stack>
						 </Stack>
					   </Box>
					 </Stack>

		
	);
};

export default Signup;
