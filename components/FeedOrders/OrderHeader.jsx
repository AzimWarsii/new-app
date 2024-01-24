'use client'
import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle ,useDisclosure,Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Image,
	Tooltip,
	ModalFooter, Text } from "@chakra-ui/react";
import Link from "next/link";

import showImage from "../../public/showImage.png"
import { timeAgo } from "../../utils/timeAgo";

const OrderHeader = ({ order, creatorProfile }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();



	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
			<Flex alignItems={"center"} gap={2}>
				{creatorProfile ? (
					<Link href={`/${creatorProfile.username}`}>
						<Avatar src={creatorProfile.profilePicURL} alt='user profile pic' size={"sm"} />
					</Link>
				) : (
					<SkeletonCircle size='10' />
				)}

				<Flex fontSize={12} fontWeight={"bold"} gap='2'>
					{creatorProfile ? (
						<Link className="truncate ..." href={`/${creatorProfile.username}`}>{creatorProfile.username}</Link>
					) : (
						<Skeleton w={"100px"} h={"10px"} />
					)}

					<Box color={"gray.500"}>• {timeAgo(order.createdAt)}</Box>
				</Flex>
			</Flex>
			
			<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft' size='xl'>
				<ModalOverlay />
				<ModalContent   maxW={"700px"}>
					
					<ModalCloseButton />
					<ModalBody >
						
						<Image src={order.imageURL} alt={"FEED POST IMG"} />
					</ModalBody>
					<ModalFooter>
					<Text  mx={4} fontSize='sm' fontWeight={700}>
					<Text as='span' fontSize='lg' fontWeight={400}>
						{order.caption}
					</Text>
					</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>


			<Tooltip>
			<Box cursor={"pointer"}>
				<Button
					size={"xs"}
					bg={"transparent"}
					fontSize={12}
					color={"blue.500"}
					fontWeight={"bold"}
					_hover={{
						color: "white",
					}}
					transition={"0.2s ease-in-out"}
					onClick={onOpen}
					//isLoading={isUpdating}
				>
					<Image 
						mt={120}
						boxSize='200px'
						objectFit='cover'
						src={order.imageURL}
      				
    					alt="Image"
    					/>
				</Button>
			</Box>
			</Tooltip>
		</Flex>
	);
};

export default OrderHeader;
