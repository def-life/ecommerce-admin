import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;


const categorySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    parent: {
        type: ObjectId,
        ref: "Category"
    },
    properties: {
        type: [{
            property: { type: String },
            value: { type: [String] }
        }]
    }

}, {
    timestamps: true
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);