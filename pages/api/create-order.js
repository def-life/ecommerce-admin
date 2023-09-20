import dbConnect from "@/lib/mongoose";
import RazorPay from "razorpay"
import Product from "@/model/product"
import Order from "@/model/order"

const instance = new RazorPay({
    key_id: process.env.RAZARPAY_KEYID,
    key_secret: process.env.RAZARPAY_SECRET,
  });


export default async function handler(req, res) {
    await dbConnect();
    
    try {
        if(req.method === "POST") {
            const {name, email, city, country, pincode, streetAddress, productIds, amount} = req.body;
            let uniqueIds = [...new Set(productIds)]
            const products = await Product.find({_id: uniqueIds});
            const productInfo = products.map((product) => {
                return {
                    _id: product._id,
                    title: product.title,
                    qty: productIds.reduce((acc, current) => {
                        if (current === product._id.toString()) {
                            return acc + 1
                        }
                        return acc
                    }, 0),
                    price: product.price
                }
            })
            console.log(productInfo, "_____________________-")
            const options = {
                amount: amount * 100,  // amount in the smallest currency unit
                currency: "INR"
              };
              const order = await instance.orders.create(options)
              order.key_id = process.env.RAZARPAY_KEYID
              await Order.create({
                _id: order.id,
                shippingAddress: {
                    name,email,city, country, pincode, streetAddress
                },
                items: productInfo,
                amount: order.amount,
                currency: order.currency,
                status: order.status 
              })
              res.status(200)
              res.json(order)
        }



    } catch(err) {
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}