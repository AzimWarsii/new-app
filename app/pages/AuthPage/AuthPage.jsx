import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "../../../components/AuthForm/AuthForm";

const AuthPage = () => {
	return (
		
		<Flex ml={{base:0 , md:240}}  minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
			<Container maxW={"container.xl"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>

					<VStack spacing={4} align={"stretch"}>
						<AuthForm />
						<Box color={"white"} textAlign={"center"}>Get the app.</Box>
						<Flex gap={5} justifyContent={"center"}>
							<Image src='/playstore.png' h={"10"} alt='Playstore logo' />
							<Image src='/appstore.png' h={"10"} alt='Microsoft logo' />
						</Flex>
					</VStack>
				</Flex>
			</Container>
		</Flex>
		
	);
};

export default AuthPage;
