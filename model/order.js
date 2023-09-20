import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;


const orderSchema = new Schema({
    _id: {
        type: String
    },
    payment_id: String,
    items: [
        {
            _id: ObjectId,
            qty: String,
            price: String,
            title: String
        }
    ],
    shippingAddress: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        pincode: {
            type: String
        },
        streetAddress: {
            type: String
        },
    },
    amount: {
        type: String
    },
    currency: {
        type: String,
        default: 'INR',
    },
    status: {
        type: String,
        enum: ['created', 'paid', 'failed']
    }

}, {
    timestamps: true
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);