import { create } from "zustand";


const useChatStore = create((set) => ({
	chats: [],
	chatId:null,
	userId:"",
	userPhoto:"",
	createChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
    setChats: (chats) => set({ chats }),
	setChatID: (chatId) => set({chatId}),
	setUserID : (userId) => set({userId}),
	setUserPhoto : (userPhoto) => set ({userPhoto})
	
}));
export default useChatStore