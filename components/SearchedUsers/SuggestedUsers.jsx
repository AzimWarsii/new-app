'use client'
import {Heading, Button, Flex, Text,Card, CardBody, CardHeader,
	Input,Box ,GridItem,Grid,VStack,Skeleton,Show,Table,Hide,InputRightAddon, InputGroup,InputRightElement, Th,NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,} from "@chakra-ui/react";
	import useSearchUser from "../../hooks/useSearchUser";
import useAuthStore from "../../store/authStore";
import { useRef } from "react";
import SuggestedUser from "../SearchedUsers/SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import { SearchLogo } from "../../assets/constants";
import { color } from "framer-motion";


const SuggestedUsers = () => {
	const fromLocationRef = useRef(null);
	const toLocationRef = useRef(null);
	const { user, isLoading, getUserProfile, setUser , searchedUsers } = useSearchUser();
	const { isLoading1, suggestedUsers } = useGetSuggestedUsers();
	const authUser = useAuthStore((state) => state.user);

	const handleSearchUser = (e) => {
		e.preventDefault();
		getUserProfile(fromLocationRef.current.value,toLocationRef.current.value);
	};

	if (!authUser) return null;

	return (

		<>
		
		<Show pt={2} below="sm" gap={3}>
			
			
				<div >
					<Input variant="filled" mb={2} placeholder='From' ref={fromLocationRef} />
				 </div>
				 <div>
					<InputGroup>
					<Input variant="filled" placeholder='TO' ref={toLocationRef} />
					<InputRightElement width='4.5rem'>
        			<Button h='1.75rem' bg={"gray.800"} size='sm' onClick={handleSearchUser}>
        			  <SearchLogo  />
       				 </Button>
   				   </InputRightElement>
					  </InputGroup>
				 </div>
				
				 </Show>
				
				 
				 
				 <Grid
		maxW={"container.lg"} py={10} gap='10'
		>
		<GridItem>


		


		<Card bgColor='white' display={{ base: "none", sm: "block" }}>
			<CardHeader>
				<Table size={"xl"}>
    		<Th color={"gray.700"} > SEARCH FOR MATES</Th>
			</Table>
  			</CardHeader>
			<CardBody>
			  <Box>
			  <form onSubmit={handleSearchUser}>
			  <Flex w={"full"} justifyContent={"flex-end"} gap={10}  >
				<div  classname=''>
				
					<Input  size='sm'  variant='filled'  borderColor={"blue.600"} _hover={{ borderColor: "blue.700" }} color={"black"} placeholder='From' ref={fromLocationRef} />
				 </div>
				 <div>
					
					<Input  size='sm'  variant='filled'  borderColor={"blue.600"} _hover={{ borderColor: "blue.700" }}  color={"black"} placeholder='To' ref={toLocationRef} />
				 </div>
					
				
					</Flex>
       			 
					
      			  
		


      			  
						
				<Flex w={"full"} justifyContent={"flex-end"}>
					<Button bgColor={"gray.400"} _hover={{ bg: "gray.300" }}  type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
									Search
					</Button>
					</Flex>
					</form>
					</Box>
				</CardBody>
				

				
		</Card>
		</GridItem>
		<GridItem  colSpan={2} >
			

				{ isLoading1 && [0, 1, 2].map((_, idx) => (
					<VStack key={idx} alignItems={"flex-start"} gap={1} p='1'>
						<Skeleton w={"full"}>
							<Box mt={4} h='80px' >contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

				{ isLoading && [0, 1, 2].map((_, idx) => (
					<VStack key={idx} alignItems={"flex-start"} gap={1} p='1'>
						<Skeleton w={"full"}>
							<Box mt={4} h='80px' >contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}
		
				{!isLoading1 && !isLoading &&searchedUsers.length == 0 && (
				<>
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested for you
					</Text>
				</Flex>
				
				{suggestedUsers.map((user) => (
				<Card bgColor='white' mt={4}>
				<CardBody>
				<SuggestedUser user={user} key={user.id} />
				</CardBody>
				
				</Card>

				))}
				</>
				
				)}

				{!isLoading && searchedUsers.map((user) => (
			 
				<Card bgColor='white' mt={4}>
			 	<CardBody>
			 	<SuggestedUser user={user} key={user.id} />
			 	</CardBody>
			 	</Card>
				
				))}
			</GridItem>
	
		</Grid>
				 </>
	
						
	);
};

export default SuggestedUsers;