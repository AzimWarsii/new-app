import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import useChatStore from "../store/chatStore";
import { useState } from 'react';


const useChatInfo = () => {
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const {chatId,userId, setChatID ,setUserID , setUserPhoto} = useChatStore();


  const handleChange = async (userInfo) => {
		//if (isLoading) return;
		if (!authUser ) return showToast("Error", "You must be logged in ");
		setIsLoading(true);
		const currentUserId = authUser.uid;
		try {
        let chatID ="";
        (currentUserId > userInfo.uid)
        ? chatID = (currentUserId + userInfo.uid)
        : chatID = (userInfo.uid + currentUserId)
			
      setChatID(chatID)
      setUserID(userInfo.uid)
      setUserPhoto(userInfo.profilePicURL)
      //console.log(userId)
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

  return { isLoading, chatId , handleChange , userId };
}

export default useChatInfo