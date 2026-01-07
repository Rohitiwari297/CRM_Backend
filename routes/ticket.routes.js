import express from 'express'
import { verifyToken } from '../middlewares/authJwt.js'
import { createTicket } from '../controllers/ticket.controller.js'


const ticket = express.Router()

ticket.post('/ticket', verifyToken, createTicket)

export default ticket