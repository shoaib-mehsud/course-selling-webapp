import signupValidator from "../validator/userValidator.js";
import * as adminLogic from '../services/adminLogic.js';

export const signupAdmin = async (req,res) => {
    try{
        const validatedData = signupValidator.parse(req.body);
        console.log("validation of admin is done");

        const newAdmin = await adminLogic.signupAdmin(validatedData);
        res.json({
            message: "admin created",
            admin: newAdmin
        })
    }
    catch(e){
        res.json({
            error: e.message
        })
    }
}

export const signinAdmin = async (req,res) => {
    try {
        const {email,password} = req.body;
        const adminToSignin = await adminLogic.signinAdmin({email,password});
        res.json({
            message: "admin logged in successfully",
            Authorization: adminToSignin
        });
    } catch (e) {
        res.json({
            message: e.error
        })
    }
}

export const createCourse = async (req,res)=> {
    try {
        const userId = req.userid;
        const {title,description,price,thumbnail} = req.body;
            

        const courseToCreate = await adminLogic.createCourse({userId,title,description,price,thumbnail});
        res.json({
            message: "Course created successfully",
            course: courseToCreate
        })
    } catch (e) {
        res.json({ error: e.message
}) 
    }
}