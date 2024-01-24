'use client'
import { Box, Image , Card,CardBody,CardHeader, CardFooter,Text } from "@chakra-ui/react";
import OrderFooter from "./OrderFooter";
import OrderHeader from "./OrderHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { ChakraProvider } from "@chakra-ui/react";
import useAvailableStore from "../../store/availableOrders"

const FeedOrder = ({ order }) => {
	const { userProfile } = useGetUserProfileById(order.createdBy);


	return (
		<>
		{(order.assignedTo=="")&&
			<Card marginTop={8}>
				<CardHeader>
			<OrderHeader order={order} creatorProfile={userProfile} />
			</CardHeader>
			<CardBody>
			
				{/* <Image src={order.imageURL} alt={"FEED POST IMG"} /> */}
				<OrderFooter order={order} creatorProfile={userProfile} /> 
			
			</CardBody>
			<CardFooter>
				
			</CardFooter>
			</Card>
			}
			</>
	);
};

export default FeedOrder;
