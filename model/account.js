import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;


const accountSchema = new Schema({

    userId: {
        type: ObjectId
    },

    type: {
        type: String
    },
    provider: {
        type: String
    },
    providerAccountId: {
        type: String
    },
    refresh_token: {
        type: String
    },
    access_token: {
        type: String
    },
    token_type: {
        type: String
    },
    scope: {
        type: String
    },
    id_token: {
        type: String
    },
    session_state: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model.Account || mongoose.model("Account", accountSchema);