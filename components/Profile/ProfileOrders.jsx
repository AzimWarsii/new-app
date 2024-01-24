import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfileOrder from "./ProfileOrder";
import useGetUserOrders from "../../hooks/useGetUserOrders";

const ProfileOrders = () => {
	const { isLoading, orders } = useGetUserOrders();

	const noOrdersFound = !isLoading && orders.length === 0;
	if (noOrdersFound) return <NoOrdersFound />;

	return (
		<Grid
			templateColumns={{
				//sm: "repeat(1, 1fr)",
				//md: "repeat(3, 1fr)",
			}}
			gap={1}
			columnGap={1}
		>
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} alignItems={"flex-start"} gap={4} p='6'>
						<Skeleton w={"full"}>
							<Box h='100px' >contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!isLoading && (
				<>
					{orders.map((order) => (
						<ProfileOrder order={order} key={order.id} />
					))}
				</>
			)}
		</Grid>
	);
};

export default ProfileOrders;

const NoOrdersFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Orders Found🤔</Text>
		</Flex>
	);
};
