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
    const users = await User.find();
    console.log(' users detials', users);
    return res.status(200).send(userResponse(users));
    
}