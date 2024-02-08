import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        default: ['USER_ROL'],
        enum: ['ADMIN_ROL', 'USER_ROL'],
    },

});

export const UserModel = model('User', userSchema);