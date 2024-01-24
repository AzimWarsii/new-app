import React, { useEffect, useRef } from "react";
import useChatStore from '../../store/chatStore';
import useAuthStore from "../../store/authStore";
import { timeAgo } from "../../utils/timeAgo";


const Message = ({ message }) => {
  const {userPhoto} = useChatStore();
  const authUser = useAuthStore((state) => state.user);
  const dt = message.date.toDate().toLocaleTimeString('en-US')
  const time = message.date.toMillis()

  const ref = useRef();
  

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div
    ref={ref}
    className={`message ${message.senderId === authUser.uid && "owner"}`}
  >
    <div className="messageInfo">
      <img
        
        src={
          message.senderId === authUser.uid
            ? authUser.profilePicURL
            : userPhoto
        }
        alt=""
      />
      <span className="text-xs">{timeAgo(time)}</span>
    </div>
    <div className="messageContent">
      {message.text!=="" && (<p>{message.text}</p>)}
      
      {message.img && <img src={message.img} alt="" />}
    </div>
  </div>
  )
}

export default Message