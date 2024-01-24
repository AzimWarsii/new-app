'use client'
import React from 'react';
import {  Text ,Button, Divider , Flex, Box , VStack ,Skeleton, HStack ,Image,Table,
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
  Show,
useDisclosure ,ChakraProvider} from '@chakra-ui/react'
import { MdDelete } from "react-icons/md";
import useGetUserOrders from "../../hooks/useGetUserOrders";
import ProfileOrder from "../Profile/ProfileOrder";
import useAuthStore from "../../store/authStore";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useRouter  } from 'next/navigation';
import { useState , useRef } from 'react';
import useShowToast from "../../hooks/useShowToast";
import Link from 'next/link';
import Caption from "../Description/Caption";
import OrderFooter from "../FeedOrders/OrderFooter";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import useOrderStore from "../../store/orderStore";
import useUserProfileStore from "../../store/userProfileStore";
import { timeAgo } from '../../utils/timeAgo';

const TrackUser = () => {
  const inputRef = React.useRef(null)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthStore((state) => state.user);
    
	const  username  = authUser?.username
	const {  userProfile } = useGetUserProfileByUsername(username);
  
    const { isLoading, orders } = useGetUserOrders();
    const showToast = useShowToast();

    const [Loading, setLoading] = useState()
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteOrder = useOrderStore((state) => state.deleteOrder);
    const decrementOrdersCount = useUserProfileStore((state) => state.deleteOrder);
    const [info, setInfo] = useState({})
    const [id, setId] = useState("")
    const [otp, setOtp] = useState("")

    const handleOtp = async(orderId,mateEmail)=> {
      setId(orderId)
      const data = await fetch("/api/otpverify", {
        method: "POST",
        // headers: {
        //   // Authorization: 'YOUR_AUTH_HERE'
        // },
        body: JSON.stringify({
           mateOtp:otp,
           orderId:orderId,
           user:authUser.email,
           mate:mateEmail,
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

    
  
    const handledeleteOrder = async () => {
      if (!window.confirm("Are you sure you want to delete this order?")) return;
      if (info.assignedTo) showToast ("Error", "Assigned orders cannot be deleted", "error")
      else{ 
      if (isDeleting ) return;
  
      try {
        const imageRef = ref(storage, `orders/${info.id}`);
        await deleteObject(imageRef);
        const userRef = doc(firestore, "users", authUser.uid);
        await deleteDoc(doc(firestore, "orders", info.id));
  
        await updateDoc(userRef, {
          orders: arrayRemove(info.id),
        });
  
        deleteOrder(info.id);
        decrementOrdersCount(info.id);
        showToast("Success", "Order deleted successfully", "success");
        
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsDeleting(false);
        location.reload();
      }
    }
    };
    
  
    
  
    




    const noOrdersFound = !isLoading && orders.length == 0 
	  if (noOrdersFound) return <NoOrdersFound />;

    

    
   const makePayment = async (orderAmount ,orderId ,mateEmail) => {
      
      setId(orderId)
      //"use server"

      const key ="rzp_test_qExEObeUH4JI7r";

      const data = await fetch(`/api/razorpay/${orderId}`, {
        method: "POST",
        // headers: {
        //   // Authorization: 'YOUR_AUTH_HERE'
        // },
        body: JSON.stringify({
           order_amount:orderAmount+"00",
         }),
     });
      setId("")
      const order  = await data.json();
      console.log(order.id);
      const options = {
        key:key,
        name:"DeleMate",
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        description:"RazorPay Integration",
        //image: logoBase64,
        handler: async function (response) {

        //  showToast("Success", "Paymnet made successfully", "success")
        //  if (response.length!=0) return <Loading/>;

          
          const payment_id = response.razorpay_payment_id
          const order_id = response.razorpay_order_id
          const signature = response.razorpay_signature
          

          console.log(payment_id)
      
          const data = await fetch("/api/paymentverify", {
            method: "POST",
            // headers: {
            //   // Authorization: 'YOUR_AUTH_HERE'
            // },
            body: JSON.stringify({
               razorpay_payment_id: payment_id,
              razorpay_order_id: order_id,
               razorpay_signature: signature,
               orderId:orderId,
               user:authUser.email,
               mate:mateEmail,
             }),
         });

  
         const res = await data.json();
         console.log(res)
  
          //console.log("response verify==",res)
  
           if(res?.message=="success")
           {
             router.push("/paymentsuccess?paymentid="+response.razorpay_payment_id)

          }
       },
       
        prefill: {
          name:"User",
          email:"user@gmail.com",
          contact:"9123456780",
        },
        
     };
  
    const paymentObject = new window.Razorpay(options);
     paymentObject.open();
  
      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again. Contact support for help");
      });
   };


   


  return (

    
    
  <TableContainer bg={"white"} borderRadius={4} color={'black'}>
  <Table  variant='simple'>
    <TableCaption >Reload to refresh </TableCaption>
    <Thead>
      <Tr>
        <Th>ID</Th>
        <Th>Status</Th>
        <Th>Mate</Th>
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
		 			{orders.map((order) => (
      <>
      
      <div className='invisible' ref={inputRef} onClick={onOpen}  ></div>
      <Tr>     
        <Td  onClick={()=>handleClick(order)} ><button className='md:hidden'>{(order.id).slice(0, 3)}..</button> <button className='hidden md:block'>{(order.id)}</button></Td>
        <Td>{(order.status=="Pending") &&<div>Not Assigned</div>}{(order.status=="Assigned" && order.paymentId=="")?<div >Complete payment</div>:(order.status=="Assigned" && order.paymentId!="")?<div>Ready for pickup </div>:(order.status=="In Transit")?<div>Picked Up</div>:<div></div> }{(order.status=="Delivered" && <div>Delivered</div>)}</Td>
        <Td><div id='Status'><Link  href={`/${order.mate}`}>{order.mate}</Link></div></Td>
        <Td>{(order.status=="Assigned" && order.paymentId=="")?<Button bgColor={"gray.400"}  _hover={{ bg: "gray.300" }}  onClick={()=>makePayment(order.amount,order.id,order.mateEmail) }  isLoading={order.id==id}>Pay</Button>:(order.status=="Pending")?<div  className='' id='Payment'></div>:<Image src="checked.png" ml={5} width={5} height={5} alt="Image"/>  }</Td>
        <Td>{(order.paymentId!="") && (order.status=="Assigned") && <HStack>
           <PinInput  onClick={()=>setOtp("")} onChange={(e)=>setOtp(e)}  size={"xs"} otp>
           <PinInputField />
           <PinInputField />
           <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          </PinInput>
          <Button bgColor={"gray.400"} _hover={{ bg: "gray.300" }} onClick={()=>handleOtp(order.id,order.mateEmail) } isLoading={order.id==id}>Submit</Button>
          </HStack>} {(order.status=="In Transit") && <Image src="checked.png"  width={5} height={5} alt="Image"/>  }
          {(order.status=="Delivered") && <Image src="checked.png" width={5} height={5} alt="Image"/>} </Td>
      </Tr>

      <Modal isOpen={isOpen} onClose={onClose}   isCentered={true} size={{ base: "3xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton color={"black"} />
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
                 
										<Button
                      color={"black"}
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											onClick={handledeleteOrder}
											isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer' />
										</Button>
									

								
								</Flex>
								<Divider my={4} bg={"gray.500"} />

								<VStack w='full' alignItems={"start"} maxH={"300px"} overflowY={"auto"}>
									{/* CAPTION */}

									{info.caption && <Caption order={info} />}

								</VStack>
								
								<Divider my={4} bg={"gray.800"} />

								<OrderFooter isProfilePage={true} order={info} creatorProfile={authUser}/> 
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
      </>  ))}
      </Tbody>)}
  </Table>
</TableContainer>

  )

  
}

export default TrackUser

const NoOrdersFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text color={"white"} fontSize={"2xl"}>No Orders Found🤔</Text>
		</Flex>
	);
};