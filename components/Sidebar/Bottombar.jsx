'use client'
import React from 'react'
import { Box, Flex, Link , VStack ,Avatar, Skeleton, Img} from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useGetChats from "../../hooks/useGetChats";
import useChatInfo from "../../hooks/useChatInfo";
import CreateOrder from "./CreateOrder";
import { useRouter } from "next/navigation";
import {
	CloseButton,
	Image,
    Text,
	Textarea,
	Tooltip,
     Divider, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody , Drawer , useDisclosure , Button , DrawerFooter, Grid,GridItem} from "@chakra-ui/react";

const Bottombar = () => {
    const router = useRouter();
    const btnRef = React.useRef()
    const { isLoading1, chats } = useGetChats();
    const { handleChange } = useChatInfo();
    
    const handleSelect = async (u) => {
    //console.log(u)
        await handleChange(u)
        router.push('/chats')
    };

    const authUser = useAuthStore((state) => state.user);
    const  role  = authUser?.role
    const { isOpen, onOpen, onClose } = useDisclosure();

    


  return (  
    <>
    <div class="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
        <a href="/" data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            <span class="sr-only">Home</span>
        </a>
        <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Home
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button ref={btnRef} onClick={onOpen} data-tooltip-target="tooltip-message" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg class=" w-6 h-6 stroke-current text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" color='currentColor'>
                <path  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
            </svg>
            <span class="sr-only">Message</span>
        </button>
        <div id="tooltip-message" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Message
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        {role=="user"&&
        (
            <div data-tooltip-target="tooltip-post" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            
            <CreateOrder />
             </div>
        )}
        {role=="mate"&&
        (<>
        <button  data-tooltip-target="tooltip-post" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
            <span class="sr-only">New post</span>
        </button>
        <div id="tooltip-post" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            New post
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        </>
        )}
        <a href="/track"data-tooltip-target="tooltip-search" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Search</span>
        </a>
        <div id="tooltip-search" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Search
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <a href={`/${authUser?.username}`} data-tooltip-target="tooltip-account" type="button" class="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <Avatar size={"xs"} src={authUser?.profilePicURL || ""} />
            <span class="sr-only">Account</span>
        </a>
        <div id="tooltip-account" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Account
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        </div>
        </div>

    <div className="md:hidden">
  
    <Drawer
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
      finalFocusRef={btnRef}>
      
      <DrawerOverlay/>
      <DrawerContent bgColor={"gray.700"}>

        <DrawerBody>
        <DrawerCloseButton onClick={onClose} />
        <Flex direction={"column"} gap={10} w='full' height={"full"}>
        <Text  color={"white"}>Chats</Text>
				
					
				
				
				<Flex direction={"column"} gap={5} cursor={"pointer"}>
					
         {isLoading1 &&
	 			[0, 1, 2,4,5,6].map((_, idx) => (
	 				<VStack px={2} key={idx} gap={3} alignItems={"flex-start"} mt={3} mb={3}>
						
						<Skeleton w={"full"}>
	 						<Box h={"60px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

 		{!isLoading1  && 
      (
        <Grid overflowX={"auto"}> 


           {chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          
          
          <>
            <Divider  orientation='horizontal' />
                
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
                onClickCapture={onClose}
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
                
                <Divider orientation='horizontal' />
                </>
               ))}
        </Grid>
      )}

				</Flex>

			
			</Flex>
        </DrawerBody>

      <DrawerFooter>
      </DrawerFooter>
      </DrawerContent>
    </Drawer> 
    </div>
    </>
  )
}

export default Bottombar