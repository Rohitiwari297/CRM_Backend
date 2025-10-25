/**
 * 1. Logic of starting the express server server
 * 2. Make a connection to mondodb, and create a ADMIN user at the server startup boottime (if not already present)
 * 3. I will have to connect to the router layer
 */

import express from "express";
import dotenv from "dotenv";
import db_connecton from "./config/db_connection.js";


// create instance of express
const app = express();

// configure environment variables
dotenv.config();
//db_connection
db_connecton()

//port
const port = process.env.PORT || 3000;

//start the server
app.listen(port, ()=>{
    console.log(`server is running on localhost:${port}`)
})