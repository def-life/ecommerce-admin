import dbConnect from "@/lib/mongoose";
import Order from "@/model/order"

export default async function handler(req, res) {
    await dbConnect();

    try {
        if (req.method === "POST") {

            const { razorpay_order_id, razorpay_payment_id } =
                req.body;

            await Order.findByIdAndUpdate(razorpay_order_id, {
                $set: {
                    payment_id: razorpay_payment_id,
                    status: "failed"
                }
            });
            res.status(200).json({success: true})

        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}