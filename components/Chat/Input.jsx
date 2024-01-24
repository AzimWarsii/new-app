import { Box, Center, Container, Flex, Skeleton, SkeletonCircle, Text, VStack  } from "@chakra-ui/react"
import  { useContext, useState } from "react";
import useChatInfo from '../../hooks/useChatInfo';
import useAuthStore from "../../store/authStore";
import useSendMessage from "../../hooks/useSendMessage"

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const {userId,chatId} = useChatInfo();
  const authUser = useAuthStore((state) => state.user);
  const {handleSendMessage} = useSendMessage();


  const handleSubmit = async() =>{
    handleSendMessage(text,img)
    setText("");
    setImg(null);
  }

 


  return (
    
      <div
    class="flex flex-row items-center h-16 rounded-xl bg-gray w-full "
  >

    

    <div>
    
      {img && (<div className="text-black">{(img.name)}</div>)}
      <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
        
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="black"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          ></path>
        </svg>
        </label>      
      
    </div>


    <div class="flex-grow ml-4">
      <div class="relative w-full">
      <input
              type="text"
              color="black"
              placeholder="Type something..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="flex text-black w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                    handleSubmit();
                }}
        />
        {/* <button
          class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
        >
           <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg> 
        </button> */}
      </div>
    </div>


    <div class="ml-4">
      <button
        class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white pl-1 px-2 py-2 flex-shrink-0"
        onClick={handleSubmit}
      >
        
        <span class="ml-2">
          <svg
            class="w-4 h-4 transform rotate-45 -mt-px"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
    
   
  )
}

export default Input