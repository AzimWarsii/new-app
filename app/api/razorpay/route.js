
import Razorpay from "razorpay";
import shortid from "shortid";
import { firestore } from "../../../firebase/firebase";
import { collection, getDoc,doc, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });


export async function GET() {

    // const orderRef = await getDoc(doc(firestore, "orders", params.id));
    // if (orderRef.exists()) {
    //   const order =userRef.data();
    // }
    // const price = order.id;
    // console.log(price)

    const payment_capture = 1;
    const amount = 1 * 100 // amount in paisa. In our case it's INR 1
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            // These notes will be added to your transaction. So you can search it within their dashboard.
            // Also, it's included in webhooks as well. So you can automate it.
            paymentFor: "testingDemo",
            userId: "100",
            productId: 'P100'
        }
    };

   const order = await instance.orders.create(options);
  return new NextResponse(JSON.stringify(order),{ status: 200 });
}


export async function POST(req) {
  const body = await req.json();


  return new NextResponse(JSON.stringify({ msg: body }));
}