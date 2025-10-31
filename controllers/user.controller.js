import User from '../models/user.model.js';
import { userResponse } from '../utils/objectConverter.js';

/**
 * this the controller file for user related operations
 */

/**
 * Controller to fatch all the users details
 */

/**
 * This API will fetch all the users details from the Database
 * Returns a List of User Objects
 * Each User Object will contain the following fields :
 *  - name
 *  - userId
 *  - email
 *  - userType
 *  - userStatus
 *  - createdAt
 *  - updatedAt 
 * 
 * But we have to return only selected fields to the client/admin only only admin can access this API to see all users details.
 */
export const getAllUsers = async (req, res) => {

        //if user want to filter by status & type
        let userTypeReq = req.query.userType;  //if you use filter in GET the value received in req.query not req.body
        let userStatusReq = req.query.userStatus;

        //create a variable of query parameters
        let queryObj = {};

        // apply the conditions
        if (userTypeReq) queryObj.userType = userTypeReq;
        if (userStatusReq) queryObj.userStatus = userStatusReq;
        
        console.log("Query Object : ", queryObj);

        //return the value
        const users = await User.find(queryObj);
        return res.status(200).send(userResponse(users));
    
}