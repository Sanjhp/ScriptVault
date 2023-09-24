import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        required: false,
    },
    PAN: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    otp: {
        value: { type: String },
        expire: { type: Date },
    }

},
    { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
            expiresIn: '24h',
        });

        return token;
    } catch (error) {
        // Handle error 
        throw new Error('Token generation failed');
    }
};

const UserModel = mongoose.model('user-details', userSchema);

export default UserModel;