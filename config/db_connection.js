import mongoose from "mongoose";
import User from '../models/user.model.js'
import bcrypt from "bcryptjs";

const db_connecton = async ()=>{
    try {
        const userId = 'admin'
        await mongoose.connect(process.env.DB_URI)
            console.log('Database Connected...');

        // const user = User.findOne({userId: 'admin'})
        // if(!user){
        //     return console.log('Admin not present')
        // }
        // console.log('hello')
        // const admin = await User.create({
        //     name: "Rohit",
        //     userId: 'admin',
        //     email: 'rohit@gmail.com',
        //     password: bcrypt.hashSync('welcome1', 10),
        //     userType: 'ADMIN'
        // })
        // console.log('admin created :', admin)
    } catch (error) {
      console.log(`something error in db, error : ${error}`)  
    }
}

export default db_connecton;