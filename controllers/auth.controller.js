import bcrypt from "bcryptjs"
import User from '../models/user.model.js'
import {userStatusConst, userTypeConst} from '../utils/constant.js'
import jwt from "jsonwebtoken";


/**
 * Logic to the suginup - Customer (A)/ Engineer (P)/ Admin (P)
 */

export const signup = async (req, res)=>{

    //
    let userStatus = req.body.userStatus;
    if(!req.body.userType || req.body.userType == userTypeConst.customer){
        userStatus = userStatusConst.approved;
    }else{
        userStatus = userStatusConst.pending;
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


/**
 * Logic to the sigin
 */

export const signin =  async (req, res) => {
    //check if the user id is present
    
    try {
        const user = await User.findOne({userId: req.body.userId});

        //validating
        if(user == null){
            res.status(404).json({
                success: false,
                message: `User id passed: ${req.body.userId} is not correct, please signup first` 
            })
            return;
        }

        //check if the user status is approved?
        if(user.userStatus != userStatusConst.approved){
            res.status(400).json({
                success: false,
                message: `Can't allow the login as the user status is not approved : Current Status : ${user.userStatus}`
            })
            return;
        }

        //if user is present then validation the password
        const passwordIsvalid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsvalid){
            res.status(401).json({
                success: false,
                message: 'Invalid Password'
            });
        }

        //Generate the JWT signed  token and will return that
        const token = jwt.sign({id: user.userId},process.env.SECRETE_KEY, {
            // expiresIn : 120
            expiresIn : process.env.JWT_EXP
        });

        //Return the final response
        return res.status(200).json({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userStatus: user.userStatus,
            accessToken: token
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Some internal error while creating the user'
        })
    }

}
