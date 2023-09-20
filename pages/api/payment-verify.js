import dbConnect from "@/lib/mongoose";
import Order from "@/model/order"
import crypto from "crypto"

export default async function handler(req, res) {
    await dbConnect();

    try {
        if (req.method === "POST") {

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
                req.body;
            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZARPAY_SECRET)
                .update(body.toString())
                .digest("hex");

            const isAuthentic = expectedSignature === razorpay_signature;
            if (isAuthentic) {
                // Database comes here
                await Order.findByIdAndUpdate(razorpay_order_id, {
                    $set: {
                        payment_id: razorpay_payment_id,
                        status: "paid"
                    }
                });
                // order.payment_id = razorpay_payment_id
                // order.status = "paid";
                // console.log("______", order)
                // await order.save();


                // await Payment.create({
                //     razorpay_order_id,
                //     razorpay_payment_id,
                //     razorpay_signature,
                // });
                // res.redirect(
                //     `http://localhost:3000/front/display-products`
                // );
                res.status(200).json({
                    success: true,
                });
            } else {
                res.status(400).json({
                    success: false,
                });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}