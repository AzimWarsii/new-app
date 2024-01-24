'use client'
import React from 'react'
import { useState } from 'react';
import { Button, Input, Text } from "@chakra-ui/react";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from 'firebase/auth';
import useShowToast from "../../hooks/useShowToast";
//import { Container } from 'postcss';

const Reset = () => {
	const showToast = useShowToast();

    const [email, setEmail] = useState("");

    const resetPasswordFunction = () => {
    const value = email

    sendPasswordResetEmail(auth,value).then(data=>{
        showToast('Email sent')
    }).catch(err=>{
        showToast(err.code)
    })

    }

  return (  <>
            <Input
			_hover={{ borderColor: "blue.200" }}
			borderColor={"blue.100"}
				className='inputAuth'
				placeholder='Email'
				fontSize={14}
				type='email'
				color={"white"}
				value={email}
				onChange={(e) => setEmail(e.target.value )}
			/>
			{/* {error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)} */}
			<Button
				className='buttonAuth'
				w={"full"}
				colorScheme='facebook'
				bgColor={"blue.700"} _hover={{ bgColor: "blue.600" }}
				size={"sm"}
				fontSize={14}
				onClick={resetPasswordFunction}
			>
				<Text color={"white"}>Reset Password</Text>
				
			</Button>
            </>
  )
}

export default Reset