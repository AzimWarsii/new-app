'use client'
import { Avatar, AvatarGroup, Button, Flex, Text,Link, VStack, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useCreateChat from "../../hooks/useCreateChat";
import { useRouter } from "next/navigation";
import useChatInfo from "../../hooks/useChatInfo";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";




const ProfileHeader = () => {
	const router = useRouter();
	const { handleLogout, isLoggingOut } = useLogout();
	const {handleCreateChat,isUpdating} =useCreateChat();
	const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
	const { handleChange} = useChatInfo();
	
	const handleSubmitChat = async () => {
		await handleCreateChat(userProfile);
		await handleChange(userProfile)
		router.push('/chats')
	}

	return (
		<>
		<Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
			<AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
				<Avatar src={userProfile.profilePicURL} alt='As a programmer logo' />
			</AvatarGroup>

			<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
				<Flex
					gap={4}
					direction={{ base: "column", sm: "row" }}
					justifyContent={{ base: "center", sm: "flex-start" }}
					alignItems={"center"}
					w={"full"}
				>
					<Text color={"white"} fontSize={{ base: "sm", md: "lg" ,lg:"xl" }}>{userProfile.fullName}{" ["}{userProfile.role}{"]"}</Text>
					{visitingOwnProfileAndAuth && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"white"}
								color={"black"}
								_hover={{ bg: "whiteAlpha.800" }}
								size={{ base: "xs", md: "sm" }}
								onClick={onOpen}
							>
								Edit Profile
							</Button>
						</Flex>
					)}

					{visitingAnotherProfileAndAuth && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								fontSize={14}
								color={"white"}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "gray" }}
								bgColor={"blue.800"}
								//bg={"transparent"}
								onClick={handleSubmitChat}
								isLoading={isUpdating}
								colorScheme="facebook"
							>
								Chat
							</Button>
						</Flex>
					)

					}

					<div className="md:hidden">
					<Link
						href='/'
						onClick={handleLogout}
						alignItems={"center"}
						gap={4}
						_hover={{ bg: "whiteAlpha.400" }}
						borderRadius={6}
						p={2}
						w={{ base: 10, md: "full" }}
						mt={"auto"}
						justifyContent={{ base: "center", md: "flex-start" }}
					>
						<Flex >
							<div className="mt-2"><BiLogOut  color="white"   size={24} /></div>


						<Button
							display={{ base: "none", md: "block" }}
							variant={"ghost"}
							_hover={{ bg: "transparent" }}
							isLoading={isLoggingOut}

						>
							<span class="text-sm font-medium text-white">Logout</span>
						</Button>
						</Flex>

					</Link>

					</div>
					
				</Flex>

				<Flex>
					
					</Flex>
					
				<Text color={"white"} fontSize={"sm"}>{userProfile.bio}</Text>
			</VStack>
			{isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
		</Flex>
			
		<Flex
			w={"full"}
			gap={{ base: 4, sm: 10 }}
			textTransform={"uppercase"}
			fontWeight={"bold"}
		>
			
			<Flex alignItems={"center"}  cursor={"pointer"}>
				<Text color={"white"} fontSize={20} display={{ base: "none", sm: "block" }}>
				{(userProfile.role=='user')?<>Available Orders</>:<>Next Trip
				</>}
				</Text>
			</Flex>
			
		</Flex>
	</>
	);
};

export default ProfileHeader;
