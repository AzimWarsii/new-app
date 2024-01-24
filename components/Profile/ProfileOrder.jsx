import {
	Avatar,
	Button,
	Divider,
	Flex,
	GridItem,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
	Grid,
	Spacer 
} from "@chakra-ui/react";
//import { GrStatusGoodSmall } from "react-icons/ai";
import { GrStatusGoodSmall } from "react-icons/gr";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import OrderFooter from "../FeedOrders/OrderFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import useOrderStore from "../../store/orderStore";
import Caption from "../Description/Caption";

const ProfilePost = ({ order }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const deleteOrder = useOrderStore((state) => state.deleteOrder);
	const decrementOrdersCount = useUserProfileStore((state) => state.deleteOrder);
	

	const handledeleteOrder = async () => {
		if (!window.confirm("Are you sure you want to delete this order?")) return;
		if (order.assignedTo) showToast ("Error", "Assigned orders cannot be deleted", "error")
		else{ 
		if (isDeleting ) return;

		try {
			const imageRef = ref(storage, `orders/${order.id}`);
			await deleteObject(imageRef);
			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "orders", order.id));

			await updateDoc(userRef, {
				orders: arrayRemove(order.id),
			});

			deleteOrder(order.id);
			decrementOrdersCount(order.id);
			showToast("Success", "Order deleted successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
			
		}
	}
	};

	return (
		<Grid p='5'>
			<GridItem
				boxShadow='dark-lg'
				h='100px'
				rounded='md'
				
				bgColor='white'
				w={"full"}
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				//border={"1px solid"}
				//borderColor={"BlackAlpha.300"}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={onOpen}
				
			>
				
				<Flex
					
					opacity={1}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={"whiteAlpha.300"}
					zIndex={1}
					justifyContent={"center"}
					className="hover:bg-gray-200  duration-300 ease-in-out "
					
				>
					<Flex
					
					 alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							
							<Text className="hidden lg:block" color="black" fontWeight={"bold"} >
								{order.id}
							</Text>
						</Flex>
						
						<Spacer className="hidden lg:block"/>
						<Spacer className="hidden lg:block"/>
						<Spacer className="hidden lg:block"  />
						<Spacer className="hidden lg:block" />
						<Spacer className="hidden lg:block" />
						<Spacer className="hidden lg:block"/>
						<Spacer className="hidden lg:block"/>
						
						

						
						
						<Flex  >
							
							
							<Text className="flex" textColor={order.status=='Pending'?"rgb(250 204 21)":"rgb(132 204 22)"} fontWeight={"bold"}  >
								<GrStatusGoodSmall className="block" />
								<Text color="black" >{order.status}</Text>
								
							</Text>
						</Flex>
					</Flex>
				</Flex>

				

				{/* <Image src={order.imageURL} alt='profile order' w={"100%"} h={"100%"} objectFit={"cover"} /> */}
			</GridItem>

			<Modal bgColor={"white"} isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton color={"black"} />
					<ModalBody bg={"white"} pb={5}>
						<Flex
							gap='4'
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							maxH={"90vh"}
							minH={"50vh"}
						>
							<Flex
								borderRadius={4}
								overflow={"hidden"}
								border={"1px solid"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Image src={order.imageURL} alt='profile order' />
							</Flex>
							<Flex flex={1} flexDir={"column"} px={10} display={{ base: "flex", md: "flex" }}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={4}>
										{/* <Avatar src={userProfile.profilePicURL} size={"sm"} name='As a Programmer' />
										<Text fontWeight={"bold"} fontSize={12}>
											{userProfile.username}
										</Text> */}
									</Flex>

									{authUser?.uid === userProfile.uid && (
										<Button
											color={"black"}
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											onClick={handledeleteOrder}
											onClickCapture={onClose}
											isLoading={isDeleting}

											
										>
											<MdDelete  size={20} cursor='pointer' />
										</Button>
									)}
								</Flex>
								<Divider my={4} bg={"gray.500"} />

								<VStack w='full' alignItems={"start"} maxH={"300px"} overflowY={"auto"}>
									{/* CAPTION */}
									{order.caption && <Caption order={order} />}

								</VStack>
								
								<Divider my={4} bg={"gray.800"} />

								<OrderFooter isProfilePage={true} order={order} creatorProfile={userProfile}/> 
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Grid>
	);
};

export default ProfilePost;
