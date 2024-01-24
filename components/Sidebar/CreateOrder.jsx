'use client'
import {
	Box,
	Button,
	CloseButton,
	Flex,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Tooltip,
	useDisclosure,
	NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select
} from "@chakra-ui/react";
import { CreateOrderLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useOrderStore from "../../store/orderStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";


const CreateOrder = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [caption, setCaption] = useState("");
	const [data, setData] = useState({
		caption: "",
		weight:"",
		from:"",
		category:"",
	});
	const imageRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const showToast = useShowToast();
	const { isLoading, handleCreateOrder } = useCreateOrder();
	const format = (val) => val +`kg`
  	const parse = (val) => val.replace(/^\$/, "")

	const handleOrderCreation = async () => {
		try {
			await handleCreateOrder(selectedFile, data);
			onClose();
			setCaption("");
			setSelectedFile(null);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<button onClick={onOpen}  data-tooltip-target="tooltip-post" type="button" class=" md:hidden inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            			<svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               			 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            			</svg>
           				<span class="sr-only">New post</span>
        	</button>
			<div className="hidden md:block">
			<Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					
					<div className="hidden md:block"><CreateOrderLogo display={{ base: "none", md: "block" }} /></div>
					
					<Box display={{ base: "none", md: "block" }}><span class="ml-2 text-sm font-medium text-white">Create</span></Box>
				</Flex>
			</Tooltip>
			</div>

			<Modal bgColor={"white"} isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent  border={"1px solid gray"}>
					<ModalHeader color={"white"} >Create Order</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea
							placeholder='Brief Info'
							color={"white"}
							value={data.caption}
							onChange={(e) => setData((prevData) => ({
								...prevData,
								caption: e.target.value,
							  }))}
						/>
						
						<Input
							color={"white"}
							className="mr-10 mt-2"
							htmlSize={14} width='auto'
							placeholder='From'
							type="text"
							value={data.from}
							onChange={(e) => setData((prevData) => ({
								...prevData,
								from: e.target.value,
							  }))}
						/>
						<Input
							className="mt-2"
							color={"white"}
							htmlSize={14} width='auto'
							placeholder='To'
							type='location'
							value={data.to}
							onChange={(e) => setData((prevData) => ({
								...prevData,
								to: e.target.value,
							  }))}
						/>

						
							
						<NumberInput
						color={"white"}
							className="mr-5 mt-2 inline-flex"
      						onChange={(valueString) => setData((prevData) => ({
								...prevData,
								weight: parse(valueString),
							  }))}
      						value={format(data.weight)}
							  
								maxW={40}
								defaultValue={0} 
								min={0}
     							 max={20}
    						>
      						<NumberInputField />
      						<NumberInputStepper>
        						<NumberIncrementStepper />
        						<NumberDecrementStepper />
     						 </NumberInputStepper>
    						</NumberInput>

							<Select 
							className="mt-2"
							color={"white"}
							placeholder='Category'
							onChange={(e) => setData((prevData) => ({
								...prevData,
								category: e.target.value,
							  }))} >
  							<option value='Electronics'>Electronics</option>
  							<option value='Documents'>Documents</option>
  							<option value='Medicine'>Medicine</option>
							</Select>

						<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

						<BsFillImageFill
							onClick={() => imageRef.current.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
						{selectedFile && (
							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
								<Image src={selectedFile} alt='Selected img' />
								<CloseButton
									position={"absolute"}
									top={2}
									right={2}
									onClick={() => {
										setSelectedFile(null);
									}}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handleOrderCreation} isLoading={isLoading}>
							Create
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateOrder;

function useCreateOrder() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	//const [authUser] = useAuthState(auth)
	const createOrder = useOrderStore((state) => state.createOrder);
	const addOrder = useUserProfileStore((state) => state.addOrder);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	//const { pathname } = useLocation();

	const handleCreateOrder = async (selectedFile, data) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);
		
		const newOrder = {
			caption: data.caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
			weight:data.weight,
			locationFrom:data.from,
			locationTo:data.to,
			assignedTo:"",
			assignedAt:"",
			status:"Pending",
			category:data.category,
			paymentId:"",
			amount:"1000",
			user:authUser.username,
			mate:"",
			userEmail:authUser.email
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "orders"), newOrder);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `orders/${postDocRef.id}`);

			await updateDoc(userDocRef, { orders: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newOrder.imageURL = downloadURL;

			if (userProfile?.uid === authUser?.uid) createOrder({ ...newOrder, id: postDocRef.id });

			//if (pathname !== "/" && userProfile?.uid === authUser?.uid) addOrder({ ...newOrder, id: postDocRef.id });
			if (userProfile?.uid === authUser?.uid) addOrder({ ...newOrder, id: postDocRef.id });

			showToast("Success", "Order created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreateOrder };
}
