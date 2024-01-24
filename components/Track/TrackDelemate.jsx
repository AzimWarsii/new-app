'use client'
import {  Text ,Button, Divider, Flex, Box , Image, VStack ,Skeleton, HStack,Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
    PinInput, PinInputField,
useDisclosure} from '@chakra-ui/react'
import React from 'react';
import useGetUserOrders from "../../hooks/useGetUserOrders";
import ProfileOrder from "../Profile/ProfileOrder";
import useAuthStore from "../../store/authStore";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useRouter , useRef } from 'next/navigation';
import { useState } from 'react';
import useShowToast from "../../hooks/useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import Link from 'next/link';
import useGetDelemateDeliveries from "../../hooks/useGetDelemateDeliveries"
import Caption from "../Description/Caption";
import OrderFooter from "../FeedOrders/OrderFooter";

const TrackDelemate = () => {
    const inputRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const authUser = useAuthStore((state) => state.user);
	const  username  = authUser?.username
	const {  userProfile } = useGetUserProfileByUsername(username);
    const { isLoading, orders } = useGetDelemateDeliveries();
    const showToast = useShowToast();
    const [info, setInfo] = useState({})

    const [Loading, setLoading] = useState()
    const [id, setId] = useState("")
    const [otp, setOtp] = useState("")

    const handleOtp = async(orderId,userEmail)=> {
        setId(orderId)
      const data = await fetch("/api/deliveryverify", {
        method: "POST",
        // headers: {
        //   // Authorization: 'YOUR_AUTH_HERE'
        // },
        body: JSON.stringify({
           userOtp:otp,
           orderId:orderId,
           user:userEmail,
           mate:authUser.email,
         }),
     });
     setId("")
     const res = await data.json();
         console.log(res)

         if(res?.message=="success")
         {
          showToast("Success", "OTP accepted", "success")
          location.reload();
         }
         if(res?.message!="success")
         {
          showToast("Error", "OTP incorrect", "error")
         }
         
    }
    
    const handleClick = async (e) => {
        setInfo(e)
        inputRef.current.click()
    }




    const noOrdersFound = !isLoading && orders.length == 0 
	  if (noOrdersFound) return <NoOrdersFound />;

    const router = useRouter()

    
//    const makePayment = async (orderAmount ,orderId) => {

//       setLoading(true)
//       //"use server"

//       const key ="rzp_test_qExEObeUH4JI7r";

//       const data = await fetch(`/api/razorpay/${orderId}`, {
//         method: "POST",
//         // headers: {
//         //   // Authorization: 'YOUR_AUTH_HERE'
//         // },
//         body: JSON.stringify({
//            order_amount:orderAmount+"00",
//          }),
//      });
//       setLoading(false)
//       const order  = await data.json();
//       console.log(order.id);
//       const options = {
//         key:key,
//         name:"DeleMate",
//         currency: order.currency,
//         amount: order.amount,
//         order_id: order.id,
//         description:"RazorPay Integration",
//         //image: logoBase64,
//         handler: async function (response) {

//         //  showToast("Success", "Paymnet made successfully", "success")
//         //  if (response.length!=0) return <Loading/>;

          
//           const payment_id = response.razorpay_payment_id
//           const order_id = response.razorpay_order_id
//           const signature = response.razorpay_signature
//           console.log(payment_id)
      
//           const data = await fetch("/api/paymentverify", {
//             method: "POST",
//             // headers: {
//             //   // Authorization: 'YOUR_AUTH_HERE'
//             // },
//             body: JSON.stringify({
//                razorpay_payment_id: payment_id,
//               razorpay_order_id: order_id,
//                razorpay_signature: signature,
//                orderId:orderId
//              }),
//          });

  
//          const res = await data.json();
//          console.log(res)
  
//           //console.log("response verify==",res)
  
//            if(res?.message=="success")
//            {
//              router.push("/paymentsuccess?paymentid="+response.razorpay_payment_id)

//           }
//        },
       
//         prefill: {
//           name:"User",
//           email:"user@gmail.com",
//           contact:"9123456780",
//         },
        
//      };
  
//     const paymentObject = new window.Razorpay(options);
//      paymentObject.open();
  
//       paymentObject.on("payment.failed", function (response) {
//         alert("Payment failed. Please try again. Contact support for help");
//       });
//    };




  return (
    // <>
    
    // <Card boxShadow='dark-lg' marginTop={8} >
    //     {/* <CardHeader>
           
    //     </CardHeader> */}
        
    //     <CardBody >

            

    //         <Stack overflowY={"auto"} className=''h={450}>
    //         <HStack>
    //         <Flex>            
    //             <div className='w-60 '>ID</div>
    //             <div className='w-[300px]'>Pickup Status</div>
    //             <div className='w-[240px]'>User</div>
    //             <div className=''>Payment</div> 
    //             </Flex>
    //         </HStack>
    //         <Divider orientation='horizontal' />

    //         {isLoading &&
	// 			[0, 1, 2].map((_, idx) => (
					
	// 					<Skeleton my='3' w={"full"}>
	// 						<Box h='50px' >contents wrapped</Box>
	// 					</Skeleton>
				
	// 			))}

    //         {!isLoading && (
	// 			<>
	// 				{orders.map((delivery) => (

	// 					<>
                        
                        
    //                     <HStack my={3}>
    //                         <Flex>
                            
    //                         <div className='w-[242px] truncate ...' id='ID'>{delivery.id}</div>
    //                         {(delivery.paymentId=="")?<div className='w-[300px]'>Payment not Done</div>:(delivery.paymentId!="")?<div className='w-[300px]' >Ready for pickup</div>:(delivery.status=="In Transit")?<div className='w-[300px]'>Picked Up</div>:<div className='w-[300px]'></div> }
    //                         {/* <div className='w-[325px]' id='PickupStatus'>OK</div> */}
    //                         <div className='w-[273px]' id='Status'><Link  href={`/${delivery.user}`}>{delivery.user}</Link></div>
                            
    //                         {(delivery.paymentId=="")?
    //                         <Image src="cancel.png"
    //   					        width={5}
    //   					        height={5}
    // 					        alt="Image"/>
    //                             :
    //                             <Image src="checked.png"
    //                             width={5}
    //                             height={5}
    //                           alt="Image"/> }
                            
                            
    //                         </Flex>
    //                         </HStack>
    //                       <Divider/>
    //                     </>
	// 				))}
	// 			</>
	// 		)}
            
    //         </Stack>
    //         {/* <Stack overflowY={"auto"} className=''h={450}>
    //         <Box my={3}>
    //          HELLo
    //         </Box>
    //         <Divider/>
    //         <Box my={3}>
    //             HELLo
    //         </Box>
    //         </Stack> */}
    //     </CardBody>
    // </Card>
    <TableContainer bg={"white"} borderRadius={4} color={'black'}>
  <Table  variant='simple'>
    <TableCaption >Reload to refresh </TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Status</Th>
        <Th>User</Th>
        <Th>Payment</Th>
        <Th>OTP</Th>
      </Tr>
    </Thead>
    {isLoading &&
                 <Tbody>
				
					<Tr>
                    <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                         
                    </Tr>
                    <Tr>
                    <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                         
                    </Tr>
                    <Tr>
                    <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                        <Td><Skeleton  w={"full"}>
							<Box  h='40px' >contents wrapped</Box>
						</Skeleton></Td>
                         
                    </Tr>
						
				
				
                </Tbody>}
    
    {!isLoading && (
		 		<Tbody>
		 			{orders.map((delivery) => (
     <>
     <div className='invisible' ref={inputRef} onClick={onOpen}  ></div>
      <Tr>
      <Td onClick={()=>handleClick(delivery)} ><button>{delivery.id}</button></Td>
        <Td> {(delivery.paymentId=="")?<div>Payment not Done</div>:(delivery.paymentId!="" && delivery.status=="Assigned")?<div>Ready for pickup</div>:(delivery.status=="In Transit")?<div>Picked Up</div>:<div></div> }{(delivery.status=="Delivered" && <div>Delivered</div>)}</Td>
        <Td><div id='Status'><Link  href={`/${delivery.user}`}>{delivery.user}</Link></div></Td>
        <Td> {(delivery.paymentId=="")?
             <Image src="cancel.png"
             ml={5}
      	      width={5}
      	      height={5}
    		   alt="Image"/>
                :
               <Image src="checked.png"
               ml={5}
                 width={5}
                 height={5}
                 alt="Image"/> }
            </Td>
            <Td>    {(delivery.paymentId!="") && (delivery.status=="In Transit") &&<HStack>
           <PinInput  onClick={()=>setOtp("")} onChange={(e)=>setOtp(e)}  size={"xs"} otp>
           <PinInputField />
           <PinInputField />
           <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          </PinInput>
          <Button bgColor={"gray.400"} _hover={{ bg: "gray.400" }} onClick={()=>handleOtp(delivery.id,delivery.userEmail)} isLoading={delivery.id==id}>Submit</Button>
          </HStack>} {(delivery.status=="Delivered") && <Image src="checked.png"  width={5} height={5} alt="Image"/>  } </Td>
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose}  isCentered={true} size={{ base: "3xl", md: "5xl" }}>
                
               <ModalOverlay />
               <ModalContent>
                   <ModalCloseButton />
                   <ModalBody bg={"white"} pb={5}>
                       <Flex
                           gap='4'
                           w={{ base: "90%", sm: "70%", md: "full" }}
                           mx={"auto"}
                           maxH={"90vh"}
                           minH={"50vh"}
                       >
                           <Flex
                               borderRadius={4}
                               overflow={"hidden"}
                               border={"1px solid"}
                               borderColor={"whiteAlpha.300"}
                               flex={1.5}
                               justifyContent={"center"}
                               alignItems={"center"}
                           >
                               <Image src={info.imageURL} alt='profile order' />
                           </Flex>
                           <Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
                               <Flex alignItems={"center"} justifyContent={"space-between"}>
                                   <Flex alignItems={"center"} gap={4}>
                                       {/* <Avatar src={userProfile.profilePicURL} size={"sm"} name='As a Programmer' />
                                       <Text fontWeight={"bold"} fontSize={12}>
                                           {userProfile.username}
                                       </Text> */}
                                   </Flex>

                               </Flex>
                               <Divider my={4} bg={"gray.500"} />

                               <VStack w='full' alignItems={"start"} maxH={"300px"} overflowY={"auto"}>
                                   {/* CAPTION */}
                                   {info.caption && <Caption order={info} />}

                               </VStack>
                               
                               <Divider my={4} bg={"gray.800"} />

                               <OrderFooter isProfilePage={true} order={info}  creatorProfile={authUser}/> 
                           </Flex>
                       </Flex>
                   </ModalBody>
               </ModalContent>
           </Modal>
      </>  
      ))}
      </Tbody>)}
  </Table>
</TableContainer>
    
  )

  
}

export default TrackDelemate

const NoOrdersFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text color={"white"} fontSize={"2xl"}>No Orders Found🤔</Text>
		</Flex>
	);
};