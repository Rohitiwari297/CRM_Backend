export const userResponse = (users)=>{
    let userResult = [];
    users.forEach(user => {
        userResult.push({
            name: user.name,
            email: user.email,
            userId: user.userId,
            userType: user.userType,
            userStatus: user.userStatus
        })
    })
    return userResult;
}

console.log("objectConverter loaded", userResponse([{name:"test", email:"test@example.com", userId:1, userType:"admin", userStatus:"active"}]));