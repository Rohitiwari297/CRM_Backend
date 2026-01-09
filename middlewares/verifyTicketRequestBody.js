import { ticketStatusesConst, userStatusConst } from "../utils/constant.js"

export const validateTicketReqBody = async (req, res, next) => {
    // Validate if the title is present

    if (!req.body.title){
        return res.status(400).json({
            success: false,
            message: 'Failed! Title is missing'
        })
    }
    if (!req.body.description){
        return res.status(400).json({
            success: false,
            message: 'Failed! Description is missing'
        })
    }
     next()
}

export const validateTicketStatus = (req, res, next) => {
    const status = req.body.status;
    const statusTypes = [ticketStatusesConst.open, userStatusConst.blocked, ticketStatusesConst.closed]
    if (status && !statusTypes.includes(status)){
        res.status(400).json({
            success: false,
            message: 'Status passed is not correct !'
        })
    }

    next();
}