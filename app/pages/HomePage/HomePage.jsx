'use client'
import { Box, Container} from "@chakra-ui/react";
import FeedOrders from "../../../components/FeedOrders/FeedOrders";
import SuggestedUsers from "../../../components/SearchedUsers/SuggestedUsers";
import useAuthStore from "../../../store/authStore";




const HomePage = () => {
	
	const authUser = useAuthStore((state) => state.user);
	const role = authUser?.role;
	return(
		  <Container  pt={2} maxW={"container.lg"}>
				<Box flex={2} pb={10}   >
		 {(role=='mate')?
		
					<FeedOrders />
				
			
		:
		
				
				<SuggestedUsers />
				
		}
		</Box>
		</Container>
	);
};

export default HomePage;
