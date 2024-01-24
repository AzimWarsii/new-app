import { firestore } from "../firebase";


const useGetMessages = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const getMessages = async () => {
        setIsLoading(true);
       
        try {
          const unsub = onSnapshot(doc(firestore, "chats", authUser.uid), (doc) => {
            setChats(doc.data());})
          await getDoc(doc(firestore, "userChats", authUser.uid));
          unsub()
        } catch (error) {
          showToast("Error", error.message, "error");
        } finally {
          
          setIsLoading(false);
        }
      };
  
      if (authUser) getChats();
    }, [authUser, showToast, setChats]);
  
    return { isLoading, chats };
  };
export default useGetMessages