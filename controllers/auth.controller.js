import bcrypt from "bcryptjs"
import User from '../models/user.model.js'


/**
 * Logic to the suginup - Customer (A)/ Engineer (P)/ Admin (P)
 */

export const signup = async (req, res)=>{

    //
    let userStatus = req.body.userStatus;
    if(!userStatus || userStatus == 'CUSTOMER'){
        userStatus = 'APPROVED';
    }else{
        userStatus = 'PENDING';
    }

    //to store the user in the DB
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password),
        userStatus: userStatus


    }

    try {
        const userCreated = await User.create(userObj)
        const postRes = {
            name:userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(postRes);
    } catch (error) {
        console.log('Error while creating user', error)
        res.status(500).send({
            message: 'Some internal error while creating the user',
            success: false
        })
    }
}

