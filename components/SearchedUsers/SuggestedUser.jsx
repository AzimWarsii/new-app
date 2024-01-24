'use client'
import { Avatar, Box, Flex, VStack ,InputGroup , InputRightElement,Button,Link, Text } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
//import { Link } from "next/link";
import useCreateChat from "../../hooks/useCreateChat";
import { useRouter } from "next/navigation";
import useChatInfo from "../../hooks/useChatInfo";

const SuggestedUser = ({ user, setUser }) => {
	const {handleCreateChat,isUpdating} =useCreateChat();
	const authUser = useAuthStore((state) => state.user);
	const { handleChange} = useChatInfo();
	const router = useRouter();

	const handleSubmitChat = async () => {
		await handleCreateChat(user);
		await handleChange(user)
		router.push('/chats')
	}


	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} marginTop={2}>
				
				<InputGroup>

				<Flex alignItems={"center"} gap={2}>
				<Link href={`/${user.username}`}>
					<Avatar src={user.profilePicURL} size={"md"} />
				</Link>
				<VStack spacing={2} alignItems={"flex-start"}>
					<Link href={`/${user.username}`}>
						<Box  fontSize={12} fontWeight={"bold"}>
							<Text color={"black"}>{user.fullName}</Text>
							
						</Box>
					</Link>
					<Flex gap={2}>
					<Box fontSize={11} color={"gray.500"}>
						From:{user.tripFrom} 
					</Box>
					<Box fontSize={11} color={"gray.500"}>
						To:{user.tripTo} 
					</Box>
					</Flex>	
				</VStack>
				</Flex>

				<InputRightElement>
				<Button
								size='md'
								height='30px'
								width='100px'
								
								
								bgColor={"blue.500"}
								fontSize={12}
								color={"white"}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "gray" }}
								//bg={"transparent"}
								onClick={handleSubmitChat}
								isLoading={isUpdating}
								colorScheme="facebook">
								Chat
								</Button>
				</InputRightElement>



			</InputGroup>
		
			
		</Flex>
	);
};

export default SuggestedUser;
