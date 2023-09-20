import dbConnect from "@/lib/mongoose";
import Product from "@/model/product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {

    try {
        await dbConnect();
        await isAdminRequest(req, res)
        console.log(req.method, req.query)
        if (req.method === "DELETE") {
            const { id } = req.query;
            console.log("id at backend", id)
            const result = await Product.deleteOne({ _id: id });
            console.log('result', result)
            if (result.deletedCount === 1) {
                res.json({ message: "successfully deleted" })
            } else {
                res.json({ message: "no such item " })
            }
            return
        }

        if (req.method === "GET") {
            const id = req.query.id;
            if (id) {
                const product = await Product.findById(id);
                res.status(200).json({ product });
                return;
            }

            const products = await Product.find({}).limit(30);
            res.status(200).json({ products })
            return;
        }

        if (req.method === "PUT") {
            const { title, desc, price, _id, images, category, properties} = req.body;
            const product = await Product.findOneAndUpdate({ _id }, { $set: { title, desc, price, images, category: category || undefined, properties  } });
            console.log(product)
            res.status(200).json({ product })
            return
        }

        if (req.method === "POST") {
            const { title, desc, price, images, category, properties } = req.body;
            if (!title || !desc || !price || !images) {
                throw new Error("missing fields")
            }

            const newProduct = new Product({
                title, desc, price, images, category: category || undefined, properties
            })

            await newProduct.save()
            res.status(201).json({ message: "successfully created" })

        } else {
            res.json({ message: "problem" })
        }

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message })
    }

}
