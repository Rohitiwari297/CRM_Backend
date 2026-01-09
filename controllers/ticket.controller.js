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
    console.log("engineer",engineer)
    if(engineer) {
        ticketObj.assignee = engineer.userId

    }

    try {
        const ticket = await Ticket.create(ticketObj)
        if(ticket){
            res.status(201).json({
                success: true,
                message: 'Ticket create successfully',
                ticket: {
                    ticketId: ticket._id,
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

/**
 * Controller for updating the tickets
 */
export const updateTicket = async (req, res) => {
    const ticketId = req.params.id;
    console.log('ticketId',ticketId)
    if (!ticketId){
        return res.status(400).json({
            success: false,
            message: 'Failed! Ticket id is missing'
        })
    }

    const ticket = await Ticket.findOne({_id : ticketId})
    if (!ticket) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ticket id'
        })
    }

    // which user is making the call
    const callingUserDetails = await User.findOne({
        userId: req.userId
    })

    // I want to check if the right user is trying to update the ticket
    /**
     *  -Calling User is the filter of the ticket
     *  -Engineer
     *  -Admin
     */

    
    if (ticket.reporter == req.userId || callingUserDetails.userType == userTypeConst.engineer || callingUserDetails.userType == userTypeConst.admin) {
        ticket.title = req.body.title != undefined ? req.body.ticket : ticket.title,
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description,
        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority,
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status,
        ticket.assignee = req.body.assignee != undefined ? req.body.assignee : ticket.assignee

        const updatedTicket = await ticket.save();
        return res.status(200).json({
            success: true,
            message: 'Ticket updated successfully',
            updatedTicket: updatedTicket
        }) 
    }else{
        res.status(400).json({
            success: false,
            message: 'Ticket can only updated by owner or engineer or admin'
        })
    }
}

/**
 * Fetching all the tickets:
 *  - Customers - he/she should fetch only own list of tickets
 *  - Engineers - he/she should get all the tickets assigned to them and created by them
 *  - Admin - He/she should get all the tickets irrespative
 */
export const getAllTickets = async (req, res) => {
    const queryObj = {}
    /**
     * Fetch the user obj which is making the reqest
     */
    const savedUser = await User.findOne({
        userId: req.userId
    })
    if (savedUser.userType == userTypeConst.customer){
        // We should only return the tickets filed by this customer
        queryObj.reporter = savedUser.userId

    }else if(savedUser.userType == userTypeConst.engineer){
        // Get the tickets assigned to engineer
        queryObj.assignee = savedUser.userId
    }else {
        // get all the tickes
        
    }

    console.log("Query Object", queryObj)

    const ticket = await Ticket.find(queryObj);
    if (!ticket || ticket.length == 0) {
        return res.status(400).json({
            success: false,
            message: 'No record found !'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Tickets fetched successfully',
        data: ticket
    })
}

/**
 * Fetch the ticked based on the ticketId
 */
export const findTicketBasedOnId = async (req, res) => {
    const tickeId = req.params.id;
    if (!tickeId){
        return res.status(400).json({
            success: false,
            message: 'Failed! Ticket id is missing'
        })
    }

    const savedUser = await User.findOne({
        userId: req.userId
    })

     const ticket = await Ticket.findOne({
            _id: tickeId
        })

    if (!ticket){
        return res.status(400).json({
            success: false,
            message: 'No record found!'
        })
    }

    /**
     * IF USER TYPE - ADMIN: ticket ki Id koi bhi ho fetch ho jayega
     * IF USER TYPE - ENGINEER || CUSTOMER : aise me ticket id ke hisab se LoggedIn user ya to assignee ho ya reporter ho
     */
    if(savedUser.userType == userTypeConst.admin || ticket.reporter == req.userId || ticket.assignee == req.userId){
        return res.status(200).json({
            success: true,
            message: 'Ticket fetched successfully',
            data: ticket
        })
    }else{
        return res.status(403).json({
            success: false,
            message: "can't return the ticket details as you are not authorized"
        })
    }
}