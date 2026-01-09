/**
 * 1. Logic of starting the express server server
 * 2. Make a connection to mondodb, and create a ADMIN user at the server startup boottime (if not already present)
 * 3. I will have to connect to the router layer
 */

import express from "express";
import dotenv from "dotenv";
import db_connecton from "./config/db_connection.js";
import authRoute from './routes/auth.routes.js'
import userRoute from './routes/user.routes.js'
import ticketRoute from "./routes/ticket.routes.js";

// create instance of express
const app = express();

// configure environment variables
dotenv.config();
//db_connection
db_connecton()

//parse the JSON
app.use(express.json())

/**
 * Let's stitch the auth route
 */
app.use('/crm/api/v1', authRoute)
app.use('/crm/api/v1', userRoute)
app.use('/crm/api/v1', ticketRoute)




//port
const port = process.env.PORT || 3000;

//start the server
app.listen(port, ()=>{
    console.log(`server is running on localhost:${port}`)
})