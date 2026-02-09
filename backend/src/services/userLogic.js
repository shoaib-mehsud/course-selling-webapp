
import UserModel from "../models/userDB.js";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

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

