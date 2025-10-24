import mongoose from "mongoose";

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
        enum: [ 'CUSTOMER','ADMIN', 'ENGINEER'],
        default: 'CUSTOMER',
        required: true
    },
    userStatus:{
        type: String,
        enum: ['APPROVED', 'PENDING', 'BLOCKED'],
        required: true,
        default: 'APPROVED'
    }

},{
    timestamps: true
})


//Export the model
export default mongoose.model('User', userSchema);