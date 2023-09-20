import dbConnect from "@/lib/mongoose";
import Category from "@/model/category";
import { isAdminRequest } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    await dbConnect();
    try {

        await isAdminRequest(req, res)
    } catch(err) {
        res.json({error: err.message})

    }
    if (req.method === "DELETE") {
        try {
            const { _id } = req.query;
            console.log("id at backend", _id)
            const result = await Category.deleteOne({ _id });
            console.log('result', result)
            if (result.deletedCount === 1) {
                res.json({ message: "successfully deleted" })
            } else {
                res.json({ message: "no such item " })
            }
        } catch (err) {
            res.status(400)
            res.json({ message: err.message })
        }
        return
    }

    if (req.method === "GET") {
        console.log(req.url, req.method)

        try {
            const id = req.query._id;
            if (id) {
                const category = await Category.findById(id);
                res.status(200).json({ category });
                return;
            }
            const categories = await Category.find({}).populate("parent");
            res.status(201);
            res.json({ categories })
        } catch (err) {
            res.status(400);
            res.json({
                message: err.message
            })
        }
        return
    }

    if (req.method === "POST") {
        const { name, parent, properties } = req.body;

        console.log("properites", properties)
        try {
            if (!name) {
                throw new Error("missing fields")
            }

            const category = await Category.create({
                name,
                parent: parent || undefined,
                properties
            })

            res.status(201);
            res.json({ category })
        } catch (err) {
            res.status(400);
            res.json({
                message: err.message
            })
        }
        return
    }
    if (req.method === "PUT") {
        const { name, parent, _id, properties } = req.body;
        console.log(name, parent || null,  "_________________----------, parent")

        try {
            const category = await Category.updateOne({
                _id
            }, {
                $set: {
                    name,
                    parent: parent || null,
                    properties
                }
            })

            res.status(200);
            res.json({ category })
        } catch (err) {
            res.status(400);
            res.json({
                message: err.message
            })
        }
    }
}