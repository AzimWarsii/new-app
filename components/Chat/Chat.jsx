import React from 'react'
import Messages from "./Messages"
import Cam from "../../public/cam.png";
import More from "../../public/more.png";
import Input from "./Input"
import Image from 'next/image'
import useChatInfo from '../../hooks/useChatInfo';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { Flex ,Box,Spacer, Card,CardBody,CardHeader, CardFooter,Text , InputRightElement, InputGroup, Container , Grid,Avatar,Link, Button, Divider} from "@chakra-ui/react";
import useChatStore from '../../store/chatStore';



const Chat = () => {
  const {userId,userPhoto} = useChatStore();
  //const {userId} = useChatInfo();
  const { isLoading, userProfile } = useGetUserProfileById(userId);
 
  {!isLoading && console.log(userProfile?.username)}

  
  

  return (

    <>
    {!isLoading && (
      <>
      <div className=''>
      <Card bgColor={{base:"gray.800", md:"white"}} boxShadow={{base:"", md:"dark-lg"}} marginTop={5} className="chat">
        <CardHeader>
          
          
          <InputGroup>
          
          <Link
          color={"black"}
          className='flex'
          gap={2}
          href={`/${userProfile?.username}`}>
            
          <Avatar size='sm' src={userPhoto} />
          <Text color={{base:'white', md:'black'}} my={1}>{userProfile?.fullName}</Text>
          
          </Link>
          
          <InputRightElement>
          <Image src={Cam} width={25} height={25} alt="" />
          <Image src={More} width={25} height={25} alt="" />
          </InputRightElement>
         
          </InputGroup>
          
          </CardHeader>
          

        <CardBody><Messages /></CardBody>


        <CardFooter><Input/></CardFooter>
       
         
        </Card>
      
      </div>
      
      


      {/* <div className='md:hidden'>
      <Card  bgColor={"gray.800"} boxShadow='' className="chat">
      <InputGroup mb={3}>
          
          <Link
          color={"black"}
          className='flex'
          gap={2}
          href={`/${userProfile?.username}`}>
            
          <Avatar size='sm' src={userPhoto} />
          <Text color={{base:'white', md:'black'}} my={1}>{userProfile?.fullName}</Text>
          
          </Link>
          
          <InputRightElement>
          <Image src={Cam} width={25} height={25} alt="" />
          <Image src={More} width={25} height={25} alt="" />
          </InputRightElement>
         
          </InputGroup>
          
          <Divider/>
          <Messages/>
          
          <Input/>
        </Card>
      </div>
      */}
      </>
      
      



        
     )}

     </>
    
  
  )
}

export default Chat