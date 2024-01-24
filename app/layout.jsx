'use client'
import { Nunito } from 'next/font/google'
import './globals.css'
import { ChakraProvider,useColorMode, Button ,useColorModeValue  } from "@chakra-ui/react";
import PageLayout from './Layouts/PageLayout/PageLayout';
import theme from "../styles/theme"
import Script from 'next/script'
const nunito = Nunito({ subsets: ['latin'], weight: ["600"] })

// export const metadata = {
//   title: 'Delemate',
//   description: 'connecting travelers, delivering trust',
//   image: '../public/dashboard.png'
// }


export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet"></link>
        <script src="https://unpkg.com/taos@1.0.5/dist/taos.js"></script>
        <title>Delemate</title>
      </head>
      
      <body className={nunito.className }>
      

        <ChakraProvider theme={theme}  >
        
        <PageLayout>
        {children}
        </PageLayout>
       
        </ChakraProvider>
       
      </body>
    </html>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
    </>
  )
}
