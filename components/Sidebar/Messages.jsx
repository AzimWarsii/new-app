import { Box, Flex, Tooltip} from "@chakra-ui/react";
import { MessagesLogo } from "../../assets/constants";
import Link from "next/link";


const Messages = () => {

	return (
		<>
		<Link
			 href='/chats'>
		<Tooltip
			hasArrow
			label={"Messages"}
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
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
					</svg>

					<Box display={{ base: "none", md: "block" }}><span class="ml-2 text-sm font-medium text-white">Messages</span></Box>
					</Flex>
				
		
				
			</Flex>
		</Tooltip>
		
		</Link>
	   
	
	   </>
	);
};

export default Messages;
