
import UserModel from "../models/userDB.js";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import courseModel from "../models/coursesDB.js"; 
import purchasedModel from "../models/purchasesDB.js";

export async function signupUser(userData) {
          const firstName = userData.firstName;
    const lastName  = userData.lastName;
    const email = userData.email;
    const password = userData.password;

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await UserModel.create({
        firstName,lastName,email,password: hashedPassword
    });
    return user;
}

export async function signinUser({email,password}) {
  

    const user = await UserModel.findOne({email});
    if(!user){
        return "invalid email"
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(isMatch){

        const token = jwt.sign({id: user._id},process.env.userJWT)
      return token;
    }

}

export async function viewCourses() {
    const courses = await courseModel.find({});
    if(!courses){
        console.log("courses doesnot exist");
        
    }return courses;
}

 export async function buyCourse({userId,courseId,paymentRef,payment}){
        const courseBought = await purchasedModel.create({
            userId,
            courseId,
            paymentRef,
            payment
        });
        return courseBought;
 }

