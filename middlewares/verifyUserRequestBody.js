import User from '../models/user.model.js'
import {userTypeConst, userStatusConst} from '../utils/constant.js'

const validateUserrequestBody = async (req, res, next) => {
    //validate the name
    if ( !req.body.name) {
        res.status(400).json({
            success: false,
            message: 'Failed ! bad request, userName is not passed'
        })
    }

     //validate the password
    if (!req.body.password){
        res.status(400).json({
            success: false,
            message: 'Failed ! bad request, Password field is not passed'
        })
    }

    //validate UserId
    if ( !req.body.userId) {
        res.status(400).json({
            success: false,
            message: 'Failed ! bad request, userId is not passed'
        })
    }

    ///Let check if the userId unique
    //check the db 
    const user = await User.findOne({userId: !req.body.userId});

    if(user !==  null){
        res.status(400).json({
            success: false,
            message: 'Failed ! bad request, this userId is already registered, Please change and try again'
        })
    }
    
    //validate the email
    if (!req.body.email){
        res.status(400).json({
            success: false,
            message: 'Failed ! bad request, Email Id is not passed'
        })
    }
    ///Let check if the Email Id unique
    //check in db
    const userEmail = await User.findOne({email: req.body.email})

    //validate
    if(userEmail != null){
        res.status(400).json({
            success: false,
            message: 'Failed ! bad request, this email id is already registered, Please change and try again'
        })
    }

    //validatating the userType
    const possibleUserTypes = [userTypeConst.admin, userTypeConst.customer, userTypeConst.engineer]

    if (req.body.userType && !possibleUserTypes.includes(req.body.userType)){
        res.status(400).json({
            success: false,
            message: 'User Type passed invalid !.. Please correct and re-try '
        })
        return;
    }

    next();
 
}

export default validateUserrequestBody;