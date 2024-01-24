import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { sendMail } from "../../../services/mailService";


export async function POST(req) {

    const { userOtp, orderId , user , mate} = await req.json();

     
		const otpRef = await getDoc(doc(firestore, "otps", orderId))
        const otps = otpRef.data()
            
		if(otps.user==userOtp)
        {
        try{
            await updateDoc(doc(firestore, "orders", orderId), {
				status:"Delivered",
			});
        await sendMail(
        "Success",
        user,
        "Your package was successfully delivered by the mate " + orderId
         );
      await sendMail(
        "Success",
        mate,
        "You have successfully delivered the package to the user" + orderId
      );

      }catch(e){
        return new NextResponse(e)
      }
      
     
      
  }    
  else {
    console.log("Fail")
    return new NextResponse(JSON.stringify({message:"failed"}), { status: 400})
  }

 
  return new NextResponse(JSON.stringify({message:"success"}), { status: 200 })
}