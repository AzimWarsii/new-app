'use client'
import { Avatar, Box, Link,  Tooltip } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";


const ProfileLink = () => {
	const authUser = useAuthStore((state) => state.user);

	return (
		<Tooltip
			hasArrow
			label={"Profile"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				href={`/${authUser?.username}`}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<Avatar size={"xs"} src={authUser?.profilePicURL || ""} />
				<Box display={{ base: "none", md: "block" }}><span class="ml-2 text-sm font-medium text-white">Account</span></Box>
			</Link>
		</Tooltip>
	);
};

export default ProfileLink;
