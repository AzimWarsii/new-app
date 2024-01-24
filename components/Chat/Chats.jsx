'use client'
import { Box, Flex, Skeleton, Text, VStack , Divider, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody , Drawer , useDisclosure , Button, Input , DrawerFooter} from "@chakra-ui/react";
import React from 'react'
import {
  Avatar,
  Grid, GridItem,} from '@chakra-ui/react'
import useGetChats from "../../hooks/useGetChats";
import useChatInfo from "../../hooks/useChatInfo";

const Chats = () => {
  const btnRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
const { isLoading, chats } = useGetChats();
const { handleChange } = useChatInfo();

const handleSelect = async (u) => {
  //console.log(u)
  await handleChange(u)
};


  return (
<>
  
    <Box
      className="hidden md:block"
			height={"100vh"}
			borderRight={"1px solid"}
			borderColor={"whiteAlpha.300"}
			py={8}
			position={"sticky"}
			top={0}
			left={0}
			px={{  md: 4 }}
      w={{ base: "70px", md: "300px" }}
      bg='gray.700'
		>
			<Flex direction={"column"} gap={10} w='full' height={"full"}>
        <Text  color={"white"}>Chats</Text>
				
					
				
				
				<Flex direction={"column"} gap={5} cursor={"pointer"}>
					
         {isLoading &&
	 			[0, 1, 2,4,5,6].map((_, idx) => (
	 				<VStack px={2} key={idx} gap={3} alignItems={"flex-start"} mt={3} mb={3}>
						
						<Skeleton w={"full"}>
	 						<Box h={"60px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

 		{!isLoading  && 
      (
        <Grid overflowX={"auto"}> 


           {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          
          
          <>
            <Divider className="hidden md:block"  orientation='horizontal' />
                
                <GridItem
                
                key={chat[0]}
                h='70px'
		      		  //rounded='lg'
		        		w={"full"}
		      		  cursor={"pointer"}
			        	//borderRadius={4}
			        	overflow={"hidden"}
                //boxShadow='dark-lg'
                onClick={() => handleSelect(chat[1].userInfo)}
                className="hover:bg-gray-600  duration-300 ease-in-out "
                justifyContent={"center"}
                >
                  <Flex
                  paddingLeft={4}
                  paddingTop={4}
                  justifyContent={"left"}
                 
                  gap={3}
                  >
                     <Avatar size='sm'  src={chat[1].userInfo.profilePicURL} />{' '}

                    <div   className=" my-1 userChatInfo">
                      <span  display={{ base: "none", md: "block" }} ><Text pl={{ base: 1}} color={"white"}>{chat[1].userInfo.displayName}</Text></span>
                      <p display={{ base: "none", md: "block" }}><Text pl={{ base: 1}} fontSize={"xs"} color={"gray"}>{chat[1].lastMessage?.text}</Text></p>
                    </div>
                  </Flex>
                  
                </GridItem>
                
                <Divider className="hidden md:block"  orientation='horizontal' />
                </>
               ))}
        </Grid>
      )}

				</Flex>

			
			</Flex>
		</Box>

  
 </>

    
  //   <>
  //   <Button onClick={onOpen}>Open</Button>
  //   <Drawer placement='left' isOpen={isOpen} onClose={onClose}   >
  //   {/* <DrawerOverlay />   */}
    
  //    <DrawerContent>
       
  //     <DrawerCloseButton onClick={() => navigate(-1)}/>
       
  //      <DrawerHeader>CHATS</DrawerHeader>
  //      <DrawerBody p={0}>
               
  //      {isLoading &&
	// 			[0, 1, 2,4,5,6].map((_, idx) => (
	// 				<VStack px={2} key={idx} gap={3} alignItems={"flex-start"} mt={3} mb={3}>
						
	// 					<Skeleton w={"full"}>
	// 						<Box h={"60px"}>contents wrapped</Box>
	// 					</Skeleton>
	// 				</VStack>
	// 			))}



	// 		{!isLoading  && 
  //     (
  //       <Grid
             
  //             > 
  //          {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          
          
                
  //               <GridItem
  //               className="userChat"
  //               key={chat[0]}
  //               h='70px'
	// 	      		  //rounded='lg'
	// 	        		w={"full"}
	// 	      		  cursor={"pointer"}
	// 		        	//borderRadius={4}
	// 		        	overflow={"hidden"}
  //               //boxShadow='dark-lg'
  //               onClick={() => handleSelect(chat[1].userInfo)}
  //               >
  //                 <Flex
  //                 paddingLeft={4}
  //                 justifyContent={"left"}
  //                 className="hover:bg-gray-200  duration-300 ease-in-out "
  //                 gap={3}
  //                 >
  //                    <Avatar size='md' my={3} src={chat[1].userInfo.profilePicURL} />{' '}

  //                   <div  className="my-5 userChatInfo">
  //                     <span >{chat[1].userInfo.displayName}</span>
  //                     <p>{chat[1].lastMessage?.text}</p>
  //                   </div>
  //                 </Flex>
  //               </GridItem>
                
              
  //              ))}
  //       </Grid>
  //     )}
			
      
  //     {!isLoading && chats.length === 0 && (
	// 			<>
	// 				<Text fontSize={"md"} color={"red.400"}>
	// 					NO Chats
	// 				</Text>
	// 				<Text color={"red.400"}>!!</Text>
	// 			</>
	// 		)} 
  //      </DrawerBody>
  //    </DrawerContent>
  //  </Drawer>
  //  </>

   
  )
}

export default Chats