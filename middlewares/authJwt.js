//all imports here
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import {userTypeConst} from '../utils/constant.js';

//middleware function to verify JWT token
export const verifyToken = (req, res, next) =>{

    const token = req.headers.authorization || req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            success : false,
            message : "No token provided!"
        });
    }
    console.log("Token received in middleware: ", token);  // here token received included with "Bearer <token>" in header.authorization

    //so we hava to exclude "Bearer " from the received token
    const actualToken = token.split(" ")[1]; //splitting by space and taking the second part
    console.log('Actual Token: ',actualToken);

    // verification of the jwt token can be done here
    jwt.verify(actualToken, process.env.SECRETE_KEY, (err, decoded) => {
        if(err){
            return res.status(401).send({
                success : false,
                message : "Unauthorized!",
                error: err.message
            })
        }
        req.userId = decoded.id;
        console.log("Decoded token data in middleware: ", decoded);
        next();
    })
}

//middlerware for role base authentication can be added here
// for admin access only
export const isAdmin = (req, res, next) => {
    // find the user type from the userId added in req by verifyToken middleware
    const user = User.findOne({userId: req.userId});
    if(user.userType !== userTypeConst.admin){
        return res.status(403).send({
            success: false,
            message: "Only Admin can access this resource"
        });
    }else{
        next();
    }
}