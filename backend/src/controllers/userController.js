//controller is like a bridge between routes(http) and service portion

import signupValidator from '../validator/userValidator.js';

import * as userLogic from '../services/userLogic.js';
// or import {signinUser, signupUser } from '../servicies/userLogic.js'


export const signupController = async (req,res)=>{
    try{
        const validatedData = signupValidator.parse(req.body); // validate the signup data
        console.log("validation done successfully");

        const newUser = await userLogic.signupUser(validatedData);// server will handle this
        res.json({
            message: "User Created", user:newUser
        });
    }
    catch(e){
        res.json({
            error: e.message
        });
    }
}

export const signinController = async (req,res) => {
    try {
        const {email,password} = req.body;
        const userToSignin = await userLogic.signinUser({email,password});
         res.json({
            message: "login successfully: ",
            Authorization: userToSignin
        });
    } catch (e) {
        res.json({
            message: e.error
        })
    }
}


