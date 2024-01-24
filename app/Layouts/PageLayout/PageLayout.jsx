'use client'
import { Show, Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebase";
import useAuthStore from "../../../store/authStore";
import Bottombar from "../../../components/Sidebar/Bottombar";

// instead of adding the Sidebar component to every page, we can add it only once to the PageLayout component and wrap the children with it. This way, we can have a sidebar on every page except the AuthPage.

const PageLayout = ({ children }) => {
	const [user, loading] = useAuthState(auth);
	const authUser = useAuthStore((state) => state.user);
	const canRenderSidebar =  user 
	const canRenderNavbar = !user && !loading;

	const checkingUserIsAuth = !user && loading;
	if (checkingUserIsAuth) return <PageLayoutSpinner />;

	return (
		<Flex flexDir={canRenderNavbar ? "column" : "row"}>
			{/* sidebar on the left */}
			{canRenderSidebar ? (
				<>
				
				<Box display={{ base: "none", md: "block" }} w={{ base: "0px", md: "200px" }}>
					<Sidebar />
				</Box>
				
				
				<Show pt={2} below="md" gap={3}>
				
				<Bottombar/>
				
				
				</Show>
				</>
				
			) : null}
			{/* Navbar */}

			{/* {canRenderNavbar ? <Navbar /> : null} */}

			{/* the page content on the right */}
			<Box flex={1} w={{ base: "calc(100%)", md: "calc(100% - 240px)" }} h={{ base: "calc(100% - 89px)", md: "calc(100%)" }}  >
				{children}
			</Box>
			
		</Flex>
	);
};

export default PageLayout;

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};
