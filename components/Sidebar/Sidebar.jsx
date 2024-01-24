'use client'
import { Box, Button, Flex, Link, Tooltip , VStack , Skeleton, Img} from "@chakra-ui/react";


import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	return (
		
		<Box

		height={"100vh"}
		borderRight={"1px solid"}
		borderColor={"whiteAlpha.300"}
		py={8}
		position={"sticky"}
		top={0}
		left={0}
		px={{ base: 3, md: 4 }}
		bg={"blue.700"}


		boxShadow='2xl'
		>
		<Flex direction={"column"} gap={10} w='full' height={"full"}>
			<Link href="/" display={{ base: "none", md: "block" }} cursor='pointer'>

			<Img src="delemateBigWhite.png"/>
			</Link>
			<Link
				href="/"
				display={{ base: "block", md: "none" }}
				borderRadius={6}
				_hover={{
					bg: "whiteAlpha.200",
				}}
				boxSize='60px'
				cursor='pointer'
			>
					<Img boxSize='40px' objectFit='cover' src="delemateSmallWhite.png"/>
				</Link>
				<div class="flex flex-col items-center w-full  border-t border-gray-100"></div>
				<Flex direction={"column"} gap={5} cursor={"pointer"}>
					<SidebarItems />
				</Flex>

				{/* LOGOUT */}
				<Tooltip
					hasArrow
					label={"Logout"}
					placement='right'
					ml={1}
					openDelay={500}
					display={{ base: "block", md: "none" }}
				>
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
							<span class="  text-sm font-medium text-white">Logout</span>
						</Button>
						</Flex>

					</Link>
				</Tooltip>
			</Flex>
			</Box>


		

		

		
	);
};

export default Sidebar;
