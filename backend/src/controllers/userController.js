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
export const viewCourses = async (req,res)=>{
    try{
        const viewCourses = await userLogic.viewCourses();
        res.json({
            courses: viewCourses
        });
       
    }
     catch(e){
            res.json({
                message: e.error
            })
        }
}

export const buyCourse = async (req,res)=>{
    try {
        console.log("in -------> userCOntroller before");//for beugging
        const courseId= req.params.courseId;
        const userId = req.userid;
        const paymentRef = req.body.paymentReference;
        const payment = req.body.payment;
          console.log("in -------> userCOntroller after")//for beugging
        const courseToBuy = await userLogic.buyCourse({userId,courseId,paymentRef,payment});
      

        res.json({
            message: "Course bought successfully",
            course: courseToBuy
        })
    } catch (e) {
        res.json({
            error: e.message
        })
    }
}

export const myCourses = async (req,res) =>{
    try {
        const userId = req.userid;
        const purchasedCourses = await userLogic.userCourses({userId});
       if(!purchasedCourses){
        return res.json({
            message: "You donot have purchased any course yet"
        })
       } 

       res.json({
            message: "Your courses",
            purchasedCourses
        })
    } catch (e) {
        res.json({
            error: e.message
        })
    }
}

