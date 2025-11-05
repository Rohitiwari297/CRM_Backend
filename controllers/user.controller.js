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

/**
 * Controller to find the user based on the user id (Cust1)
 */

export const getLoggedInUser = async (req, res) => {

        try {
                // extrect the id
                const userId = req.params.userId;

                console.log('userId', userId)

                //validate user form db
                const user = await User.findOne({
                        userId: userId
                });
                console.log('printing type of user :', typeof user)
                if (!user && [user].length >= 1) {
                        res.status(404).json({
                                success: false,
                                message: 'User with the given id is not present'
                        })
                } else {
                        res.status(200).json({
                                success: true,
                                message: 'User fetch successfully',
                                data : userResponse([user])
                        }).send(userResponse(user))
                }
        } catch (error) {
                res.status(500).json({
                        success: false,
                        message: 'Server error in user fetch',
                        error: error.message
                })
        }


}