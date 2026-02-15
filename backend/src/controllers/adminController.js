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

export const updateCourse = async (req,res)=>{
    try{
        const courseId = req.params.courseId;
        const allowedFields = ["title", "description", "price", "thumbnail"];
        const updateFields = {};
        Object.keys(req.body).forEach((key)=>{
            if(allowedFields.includes(key)){
                updateFields[key] = req.body[key];
            }
        });

        const updateCourse = await adminLogic.updateCourse(courseId,updateFields)
        res.json({
            message: "course updated successfully",
            course: updateCourse
        })
    }catch(e){
        res.json({
            error: e.message
        })
    }
}

export const deleteCourse = async(req,res)=>{
    try {
         const courseId = req.params.courseId;
         const deleteCou = await adminLogic.deleteCourseLogic(courseId)
         res.json({
            message: deleteCou.title + " has deleted successfully"
         })
    } catch (e) {
        res.json({
            error: e.message
        })
    }
}

export const viewAdminCourses = async (req,res)=>{
    try {
        console.log("Here in the admincontroller the userId: "+req.userid);
        const adminId = req.userid;
        const adminCourses = await adminLogic.viewACourses(adminId);
        res.json({
           " your courses": adminCourses
        })
    } catch (e) {
        error: e.message
    }
}