'use client'
import {
	Avatar,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Select,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";
import { onSnapshot , collection,query,getDocs, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const EditProfile = ({ isOpen, onClose }) => {
	
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		bio: "",
		role:"",
		tripDate:"",
		tripFrom:"",
		tripTo:""
	});
	const authUser = useAuthStore((state) => state.user);
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isUpdating, editProfile } = useEditProfile();
	const showToast = useShowToast();

	const handleEditProfile = async () => {
		const q = query(collection(firestore, "users"), where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty)
		{
			try {
				await editProfile(inputs, selectedFile);
				setSelectedFile(null);
				onClose();
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		}
		else{
			showToast("Error", "Username already taken", "error")
		}
		
		
	};

	

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody>
						{/* Container Flex */}
						<Flex bg={"black"}>
							<Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
								<Heading color={"white"} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
									Edit Profile
								</Heading>
								<FormControl>
									<Stack direction={["column", "row"]} spacing={6}>
										<Center>
											<Avatar
												size='xl'
												src={selectedFile || authUser.profilePicURL}
												border={"2px solid white "}
											/>
										</Center>
										<Center w='full'>
											<Button w='full' onClick={() => fileRef.current.click()}>
												Edit Profile Picture
											</Button>
										</Center>
										<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
									</Stack>
								</FormControl>

								<FormControl>
									<FormLabel color={"white"} fontSize={"sm"}>Full Name</FormLabel>
									<Input
										color={"white"}
										placeholder={authUser.fullName}
										size={"sm"}
										type={"text"}
										onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
									/>
								</FormControl>

								<FormControl>
									<FormLabel color={"white"} fontSize={"sm"}>Username</FormLabel>
									<Input
										color={"white"}
										placeholder={authUser.username}
										size={"sm"}
										type={"text"}
										onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
									/>
								</FormControl>
								<FormControl>
									<FormLabel color={"white"} fontSize={"sm"}>Change Role</FormLabel>

									<Select
										
										size={"sm"}
										value={inputs.role|| authUser.role}
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
										>
 										<option value='user'>user</option>
  										<option value='mate'>mate</option>
									</Select>
								</FormControl>

								{(authUser.role=='mate')?
								<>
								<Flex gap={2}>
								<FormControl>
									<FormLabel color={"white"} fontSize={"sm"}>Trip From</FormLabel>
									<Input
										color={"white"}
										placeholder={authUser.tripFrom}
										size={"sm"}
										type={"text"}
										onChange={(e) => setInputs({ ...inputs, tripFrom: e.target.value })}
									/>
								</FormControl>
								<FormControl>
									<FormLabel color={"white"} fontSize={"sm"}>Trip To</FormLabel>
									<Input
										color={"white"}
										placeholder={authUser.tripTo}
										size={"sm"}
										type={"text"}
										onChange={(e) => setInputs({ ...inputs, tripTo: e.target.value })}
									/>
								</FormControl>
								</Flex>
								<FormControl>
									<FormLabel color={"white"} fontSize={"sm"}>Trip Date</FormLabel>
									<Input
										type="date"
										color={"white"}
										placeholder={authUser.tripDate}
										size={"sm"}
										
										onChange={(e) => setInputs({ ...inputs, tripDate: e.target.value })}
									/>
								</FormControl>
								</>
								:
								<></>
								}


								<FormControl>
									<FormLabel color={"white"} fontSize={"sm"}>Bio</FormLabel>
									<Input
										color={"white"}
										placeholder={authUser.bio}
										size={"sm"}
										type={"text"}
										onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
									/>
								</FormControl>

								<Stack spacing={6} direction={["column", "row"]}>
									<Button
										bg={"red.400"}
										color={"white"}
										w='full'
										size='sm'
										_hover={{ bg: "red.500" }}
										onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										bg={"blue.400"}
										color={"white"}
										size='sm'
										w='full'
										_hover={{ bg: "blue.500" }}
										onClick={handleEditProfile}
										isLoading={isUpdating}
									>
										Submit
									</Button>
								</Stack>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditProfile;