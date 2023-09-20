import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({

    name: {
        type: String,

    },
    email: {
        type: String,
    },
    emailVerified: {
        type: Date
    },
    image: {
        type: String
    },
    hashedPassword: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model("User", userSchema);