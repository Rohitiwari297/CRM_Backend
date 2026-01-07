import mongoose from "mongoose";
import {ticketStatusesConst} from '../utils/constant.js'

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ticketPriority: {
        type: Number,
        required: true,
        default: 4
    },
    description: {
        type: String,
        required: true

    },
    status: {
        type: String,
        required: true,
        default: ticketStatusesConst.open
    },
    reporter: {                 // we will be use userId
        type: String,
        required: true
    },
    assignee: {                 // we will be use userId
        type: String,

    }
},{timestamps: true})

const Ticket = mongoose.model('Ticket', ticketSchema)
export default Ticket