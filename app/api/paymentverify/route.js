import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";
import { firestore } from "../../../firebase/firebase";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { sendMail } from "../../../services/mailService";
const instance = new Razorpay({
    key_id:"rzp_test_qExEObeUH4JI7r",
    key_secret: "htRbHMZd1lraE6TgI3ceVu61",
  });

export async function POST(req) {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature , orderId , user , mate} = await req.json();

    //validatePaymentVerification({"order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("id==",body)
  
     const expectedSignature =  crypto
        .createHmac("sha256",process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest("hex");


        
    const isAuthentic = expectedSignature === razorpay_signature;
    

    if (isAuthentic) {
     //console.log(Payment)
     //console.log("Success")
     const otp1 = Math.floor(100000 + Math.random() * 900000);
     const otp2 = Math.floor(100000 + Math.random() * 900000);
     try {
			await updateDoc(doc(firestore, "orders", orderId), {
				paymentId:razorpay_payment_id
			});
      await setDoc(doc(firestore, "otps", orderId), {
				user:otp1,
				mate:otp2,
			});
      await sendMail(
        "Payment Successful",
        user,
        "Your paymnet was successful with payment ID : "+ razorpay_payment_id
      );
      await sendMail(
        "OTP",
        user,
        "Share this OTP only after the package is delivered "+ otp1 +" for order id : " + orderId
      );
      await sendMail(
        "OTP",
        mate,
        "Share this OTP only after you recieve the package "+ otp2 +" for order id : " + orderId
      );
      await setDoc(doc(firestore, "payments", razorpay_payment_id), {
				paymentId:razorpay_payment_id,
				orderId: razorpay_order_id,
				signature:razorpay_signature
			});
      }catch(e){
        return new NextResponse(e)
      }
      
     
      
     




//     await dbConnect()

//     await Payment.create({
//      razorpay_order_id,
//      razorpay_payment_id,
//      razorpay_signature,
//    });

    // return new NextResponse.redirect(new URL('/paymentsuccess', req.url));
  }    
  else {
    console.log("Fail")
    return new NextResponse(JSON.stringify({message:expectedSignature}), { status: 400})
  }

 
  return new NextResponse(JSON.stringify({message:"success"}), { status: 200 })
}