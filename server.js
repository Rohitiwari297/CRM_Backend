/**
 * 1. Logic of starting the express server server
 * 2. Make a connection to mondodb, and create a ADMIN user at the server startup boottime (if not already present)
 * 3. I will have to connect to the router layer
 */

import express from "express";
import dotenv from "dotenv";


// create instance of express
const app = express();

// configure environment variables
dotenv.config();

//port
const port = process.env.PORT || 3000;

//start the server
app.listen(port, ()=>{
    console.log(`server is running on localhost:${port}`)
})