'use client'
import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import FeedOrder from "./FeedOrder";
import useGetFeedOrders from "../../hooks/useGetFeedOrders";

const FeedOrders = () => {
	const { isLoading, orders } = useGetFeedOrders();
	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mt={2} mb={10}>
						
						<Skeleton w={"full"}>
							<Box h={"290px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!isLoading && orders.length > 0 && orders.map((order) =>  <FeedOrder key={order.id} order={order} />)}
			{!isLoading && orders.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						No Available orders at the moment
					</Text>
					<Text color={"red.400"}>!!</Text>
				</>
			)}


		</Container>
	);
};

export default FeedOrders;
