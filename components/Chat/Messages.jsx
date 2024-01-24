'use client'
import { doc, onSnapshot } from "firebase/firestore";
import React, {  useEffect, useState } from "react";
import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, Stack } from "@chakra-ui/react"
import { firestore} from "../../firebase/firebase";
import useChatStore from "../../store/chatStore";
import Message from "./Message";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Messages = () => {
  const { height, width } = useWindowDimensions();
  const [messages, setMessages] = useState([]);
  const { chatId } = useChatStore();
  console.log(height)
  useEffect(() => {
    const unSub = onSnapshot(doc(firestore, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  console.log(messages)
  
  
  return (
    <Stack overflowY={"auto"} className=''h={[height-320,height-320, 400]}>

    {/* <Box className=" bg-orange-400" pb={10} h='10%' 
    w='100%'>
      Messages</Box> */}
      <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>


    </Stack>

  )
}

export default Messages