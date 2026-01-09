import express from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { createTicket, findTicketBasedOnId, getAllTickets, updateTicket } from '../controllers/ticket.controller.js'
import { validateTicketReqBody, validateTicketStatus } from '../middlewares/verifyTicketRequestBody.js'


const route = express.Router()

route.post('/tickets', verifyToken, validateTicketReqBody, createTicket);
route.put('/tickets/:id', verifyToken, validateTicketStatus, updateTicket)
route.get('/tickets', verifyToken, getAllTickets)
route.get("/tickets/:id", verifyToken, findTicketBasedOnId)

export default route