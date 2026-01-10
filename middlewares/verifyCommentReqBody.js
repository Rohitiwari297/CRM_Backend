import Ticket from '../models/ticket.model.js'

export const validateCommentRequestBody = async (req, res, next) => {
    console.log('ticket id:', req.params.ticketId)
    
    //Validate if the ticketId is present ticketId
    if (!req.params.ticketId ){
        return res.status(400).json({
            success: false,
            message: 'Failed! ticketId is missing'
        })
    }

    // Need to ckeck if it's a valid ticket
    const ticket = await Ticket.findOne({
        _id: req.params.ticketId
    })

    if (!ticket){
        return res.status(400).json({
            success: false,
            message: 'Failed ! ticket id passed is not valid'
        })
    }

    //Validation of content - It can't be empty
    if (!req.body.content ){
        return res.status(400).json({
            success: false,
            message: "Failed! content can't be empty"
        })
    }

    next();
}

export const validateTicketId = async (req, res, next) => {
    console.log('ticket id:', req.params.ticketId)
    
    //Validate if the ticketId is present ticketId
    if (!req.params.ticketId ){
        return res.status(400).json({
            success: false,
            message: 'Failed! ticketId is missing'
        })
    }

    // Need to ckeck if it's a valid ticket
    const ticket = await Ticket.findOne({
        _id: req.params.ticketId
    })

    if (!ticket){
        return res.status(400).json({
            success: false,
            message: 'Failed ! ticket id passed is not valid'
        })
    }

    next();
}