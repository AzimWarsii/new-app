import { NextResponse } from "next/server";
import { firestore } from "../../../firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { sendMail } from "../../../services/mailService";


export async function POST(req) {

    const { mateOtp, orderId , user , mate} = await req.json();

     
		const otpRef = await getDoc(doc(firestore, "otps", orderId))
        const otps = otpRef.data()
            
		if(otps.mate==mateOtp)
        {
        try{
            await updateDoc(doc(firestore, "orders", orderId), {
				status:"In Transit",
			});
        await sendMail(
        "Success",
        user,
        "Your package was successfully recieved by the mate "
         );
      await sendMail(
        "OTP",
        mate,
        "You have successfully picked the package from the user"
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