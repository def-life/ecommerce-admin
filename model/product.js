import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;


const productSchema = new Schema({

    title: {
        type: String,
        required: true

    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String]
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    properties: {
        type: Object
    }
}, {
    timestamps: true
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);