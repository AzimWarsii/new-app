'use client'
import { Card, CardHeader, CardBody, CardFooter,Text, Flex, Center , Button } from '@chakra-ui/react'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from "../../store/authStore";

  

const ProfileTrip = () => {
    const {userProfile} = useUserProfileStore();
    const authUser = useAuthStore((state) => state.user);
  return (
    <Card bgColor={"white"} mt={4} justifyContent={'center'} boxShadow='dark-lg'>
    <CardBody overflowY={"auto"} gap={5}>
    <Flex alignItems={"center"} gap={10}>
        <Flex gap={2}>
        <Text color={"black"} fontSize={{ base: "xs", md: "sm" ,lg:"sm" }} mt={1}>From</Text>
        <Text color={"black"}  fontSize={{ base: "lg", md: "lg" ,lg:"xl" }}>{userProfile.tripFrom}</Text>
        </Flex>
        <Flex gap={2}>
        <Text color={"black"} fontSize={{ base: "xs", md: "sm" ,lg:"sm" }} mt={1}>To</Text>
        <Text color={"black"}  fontSize={{ base: "lg", md: "lg" ,lg:"xl" }}>{userProfile.tripTo}</Text>
        </Flex>
        <Flex gap={2}>
        <Text color={"black"} fontSize={{ base: "xs", md: "sm" ,lg:"sm" }} mt={1}>Date</Text>
        <Text color={"black"}  fontSize={{ base: "lg", md: "lg" ,lg:"xl" }}>{userProfile.tripDate}</Text>
        </Flex>
        
      </Flex>
    
      </CardBody>
      
    </Card>
  )
}

export default ProfileTrip