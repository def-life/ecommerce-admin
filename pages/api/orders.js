import dbConnect from "@/lib/mongoose";
import Order from "@/model/order";

export default async function handler(req, res) {

    try {
        await dbConnect();
        if (req.method === "GET") {
            const orders = await Order.find({}, null, {
                sort: {
                    createdAt: -1
                },
                limit: 20
            })
                res.status(200).json(orders);
                return;
        }

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message })
    }

}
