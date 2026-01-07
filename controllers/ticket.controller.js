import User from '../models/user.model.js'
import Ticket from "../models/ticket.model.js";

import {userStatusConst, userTypeConst} from '../utils/constant.js'

/**
 * Define the controller to create a new ticket.
 * 
 * As soon as a ticket is created, it should be auto assigned to an Engineer
 * if available
 */

export const createTicket = async (req, res) => {
    // Read the ticket req body
    const ticketObj = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.userId ///This useId will be set at the MW layer, during auth
    }

    // Need to find and Engg which is in Approved state
    const engineer = await User.findOne({
        userType: userTypeConst.engineer,
        userStatus: userStatusConst.approved
    })
    if( engineer) {
        ticketObj.assignee = engineer.userId
    }

    try {
        const ticket = await Ticket.create(ticketObj)
        if(ticket){
            res.status(201).json({
                success: true,
                message: 'Ticket create successfully',
                ticket: {
                    title: ticket.title,
                    description: ticket.description,
                    ticketPriority: ticket.ticketPriority,
                    status: ticket.status,
                    reporter: ticket.reporter,
                    assignee: ticket.assignee
                }

            })
        }return
        
    } catch (error) {
        res.statu(500).json({
            success: false,
            message: 'Server error while creating the ticket !',
            error: error.message
        })
    }



    // Create the ticket - Auto assign to the Egg if available
}