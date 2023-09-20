import dbConnect from "@/lib/mongoose";
import User from "@/model/user";
import bcrypt from "bcrypt"

export default async function handler(req, res) {
    await dbConnect();

    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error("missing fields")
        }

        const exist = await User.findOne({
            email
        })

        if (exist) {
            throw new Error("Email already taken")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            hashedPassword,
            name
        })

        console.log(user);

        await user.save();

        res.status(201);
        res.json({ message: "successfully created" })
    } catch (err) {
        res.status(400);
        res.json({
            message: err.message
        })
    }
}