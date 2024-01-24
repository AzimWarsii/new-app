import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import Link from "next/link";

const Track = () => {
	return (
		<Link
				 href='/track'>
		<Tooltip
			hasArrow
			label={"Track"}
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
			>

				
					<Flex gap={4}>
					<svg class="hidden md:block w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" color='rgb(245, 245, 245)'>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>

				<Box display={{ base: "none", md: "block" }}><span class="ml-2 text-sm font-medium text-white">Orders</span></Box>
				</Flex>
				

			</Flex>
		</Tooltip>
		</Link>
	);
};

export default Track;
