import mongoose from "mongoose";
import {userTypeConst, userStatusConst} from '../utils/constant.js'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId :{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 10
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    userType: {
        type: String,
        enum: [ userTypeConst.customer,userTypeConst.admin, userTypeConst.engineer],
        default: userTypeConst.customer,
        required: true
    },
    userStatus:{
        type: String,
        enum: [userStatusConst.approved, userStatusConst.pending, userStatusConst.blocked],
        required: true,
        default: userStatusConst.approved
    }

},{
    timestamps: true
})


//Export the model
export default mongoose.model('User', userSchema);