import dbConnect from "@/lib/mongoose";
import Product from "@/model/product";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {

    try {
        await dbConnect();
        // await isAdminRequest(req, res)
        console.log(req.method)
        if (req.method === "POST") {
            const ids = req.body.ids;
                console.log(ids, "inside")
                const products = await Product.find({_id: ids});
                res.status(200).json(products);
                return;
        }



    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message })
    }

}
