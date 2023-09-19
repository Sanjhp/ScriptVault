import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    PAN: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        value: { type: String },
        expire: { type: Date },
    }

},
    { timestamps: true }
);

//Generate token
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