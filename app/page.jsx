'use client'
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { BrowserRouter } from 'react-router-dom';


function App() {
	const [authUser] = useAuthState(auth);
	

	
	return (
		<>
		
		{authUser ? <HomePage />:<AuthPage />  }
			{/* {(!authUser)?<AuthPage/>:<HomePage />} */}			
			{/* <Routes>
				<Route path='/' element={authUser ? <HomePage />:<AuthPage />  } />
			</Routes> */}
			
		</>
	);
}

export default App;
