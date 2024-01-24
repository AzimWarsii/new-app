'use client'
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import useOrderAccept from "../../hooks/useOrderAccept";
import useOrderCancel from "../../hooks/useOrderCancel";
import useAuthStore from "../../store/authStore";
import useCreateChat from "../../hooks/useCreateChat";
import { timeAgo } from "../../utils/timeAgo";
import { useRouter } from "next/navigation";
import useChatInfo from "../../hooks/useChatInfo";


const OrderFooter = ({ order, isProfilePage, creatorProfile }) => {
	const { isAccepting, handleOrderAccept } = useOrderAccept();
	const {isCancelling, handleOrderCancel} = useOrderCancel();
	const authUser = useAuthStore((state) => state.user);
	const {handleCreateChat,isUpdating} =useCreateChat();
	const router = useRouter();
	const { handleChange } = useChatInfo();

	console.log(order.paymentId)


	const handleSubmitAccept = async () => {
		await handleOrderAccept(order.id);
	};
	const handleSubmitCancel = async () => {
		await handleOrderCancel(order.id , order.paymentId);
		location.reload();
	}

	const handleSubmitChat = async () => {
		await handleCreateChat(creatorProfile);
		await handleChange(creatorProfile)
		router.push('/chats')
	}


	return (
		<Box mb={4} >


			{isProfilePage && (
				<Text fontSize='12' color={"gray"}>
					Order placed {timeAgo(order.createdAt)}
				</Text>
			)}

			{!isProfilePage && (
				<>
				<Text  mx={4} fontSize='sm' fontWeight={700}>
					<Text color={"green"} as='span' fontSize='lg' fontWeight={400}>
						{"₹"}{order.amount}{"/-"}
					</Text>
				</Text>
				
				<Flex gap={10}>
					<Text mx={4} fontSize='sm' fontWeight={700}>
						from :{" "}
						<Text as='span' fontSize='lg' fontWeight={400}>
							{order.locationFrom}
						</Text>
					</Text>
					<Text fontSize='sm' fontWeight={700}>
						to :{" "}
						<Text as='span' fontSize='lg' fontWeight={400}>
							{order.locationTo}
						</Text>
					</Text>
				</Flex>
				<Flex gap={10}>
				<Text mx={4} my={2} fontSize='sm' fontWeight={700}>
					weight :{" "}
					<Text as='span' fontSize='lg' fontWeight={400}>
						{order.weight}{"kg"}
					</Text>
				</Text>
				
				
			</Flex>
			<Text  mx={4} fontSize='sm' fontWeight={700}>
				
					<Text color={"gray"} as='span' fontSize='sm' fontWeight={400}>
						{"("}{order.category}{")"}
					</Text>
					
				</Text>
				
				
			</>
			)}

			{authUser && (
				<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
					<InputGroup>
							{(authUser.uid!=creatorProfile?.uid)?
							<InputLeftElement>
								<Button
								size='md'
								height='30px'
								width='100px'
								ml={7}
								
								
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
							</InputLeftElement>
							:<></>}
						
						<InputRightElement>
								
							
								{(order.assignedTo==authUser.uid&&order.status!="In Transit")?
								<Button
								fontSize={14}
								color={"red.300"}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "red.500" }}
								bg={"transparent"}
								onClick={handleSubmitCancel}
								isLoading={isCancelling}
							>
								Cancel
								</Button>:
								<></>
								}

								{
								(order.assignedTo==""&&authUser.role=="mate")?
								
								<Button
								fontSize={14}
								color={"green.300"}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "green.500" }}
								bg={"transparent"}
								onClick={handleSubmitAccept}
								isLoading={isAccepting}
							>	
								
								Accept
								</Button>:<></>
								}

								
							
						</InputRightElement>
						
						
						
					</InputGroup>
				</Flex>
			)}
		</Box>
	);
};

export default OrderFooter;
