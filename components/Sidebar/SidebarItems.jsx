'use clients'
import CreateOrder from "./CreateOrder";
import Home from "./Home";
import Track from "./Track";
import ProfileLink from "./ProfileLink";
import Messages from "./Messages"
import useAuthStore from "../../store/authStore";

const SidebarItems = () => {
	const authUser = useAuthStore((state) => state.user);
	const  role  = authUser?.role
	return (
		<>
			<Home />
			{role=="user"&&(<CreateOrder />)}
			<Messages/>
			<Track />
			<ProfileLink />
			
		</>
	);
};

export default SidebarItems;
