'use client'
import { Flex, Text } from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo";
import useUserProfileStore from "../../store/userProfileStore";

const Caption = ({ order }) => {
	const userProfile = useUserProfileStore((state) => state.userProfile);

	return (
		<Flex gap={4}>
			
			<Flex direction={"column"}>
				<Flex gap={2} direction={"row"}>
						<Flex gap={2} alignItems={"center"}>
						
							<Text color={"black"} gap={2} fontWeight={"bold"} fontSize={12}>
								FROM:
								
							</Text>
					
						<Text color={"black"} fontSize={14}>{order.locationFrom}</Text>
						</Flex>
						<Flex gap={2} alignItems={"center"}>
							
								<Text color={"black"} fontWeight={"bold"} fontSize={12}>
									TO:
									
								</Text>
							
								<Text color={"black"} gap={2}  fontSize={14}>{order.locationTo}</Text>
						</Flex>
					</Flex>
					
						<Flex gap={2} alignItems={"center"}>
						
							<Text color={"black"} gap={2} fontWeight={"bold"} fontSize={12}>
								Weight:
							
							</Text>
						
						<Text color={"black"} fontSize={14}>{order.weight}kg</Text>
						</Flex>
						<Flex gap={2} alignItems={"center"}>
							
								<Text color={"black"} fontWeight={"bold"} fontSize={12}>
									Category:
									
								</Text>
							
								<Text color={"black"} gap={2}  fontSize={14}>{order.category}</Text>
						</Flex>
						<Flex gap={2} alignItems={"center"}>
							
								<Text color={"black"} fontWeight={"bold"} fontSize={12}>
									Info:
									
								</Text>
							
								<Text color={"black"} gap={2}  fontSize={14}>{order.caption}</Text>
						</Flex>
					
				<Text fontSize={12} color={"gray"}>
					{timeAgo(order.createdAt)}
				</Text>
				
			</Flex>
		</Flex>
	);
};

export default Caption;
