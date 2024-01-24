import React from 'react'
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
  } from "firebase/firestore";
import { firestore ,storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import useChatStore from '../store/chatStore';
import useAuthStore from "../store/authStore";
import { v4 as uuid } from "uuid";
import useShowToast from "./useShowToast";


export const useSendMessage = () => {

    const showToast = useShowToast();
    const {userId,chatId} = useChatStore();
    const authUser = useAuthStore((state) => state.user);

    const handleSendMessage = async (text,img) => {

        
                if (img) {
                const storageRef = ref(storage,`files/${img.name}`)
                 const uploadTask = uploadBytesResumable(storageRef, img);
                 uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
         
                        // update progress
                        //setPercent(percent);
                    },
                    (err) => console.log(err),
                    () => {
                        // download url
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                       await updateDoc(doc(firestore, "chats", chatId), {
                         messages: arrayUnion({
                         id: uuid(),
                         text:text,
                         senderId: authUser.uid,
                         date: Timestamp.now(),
                         img: downloadURL,
                           }),
                         });
                         });
                         }
                    );
                 } 

        else {
          await updateDoc(doc(firestore, "chats", chatId), {
            messages: arrayUnion({
              id: uuid(), 
              text:text,
              senderId: authUser.uid,
              date: Timestamp.now(),
            }),
          });
        }
    
        try{
        await updateDoc(doc(firestore, "userChats", authUser.uid), {
          [chatId + ".lastMessage"]: {
            text,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
    
        await updateDoc(doc(firestore, "userChats", userId), {
          [chatId + ".lastMessage"]: {
            text,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
    }catch(error) {
        showToast("Error", error.message, "error");
    }
    
        
      };


  return{handleSendMessage}
    
 
}
export default useSendMessage;
