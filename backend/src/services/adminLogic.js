import adminModel  from "../models/adminDB.js";
import courseModel from "../models/coursesDB.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { viewCourses } from "./userLogic.js";

export async function signupAdmin({firstName, lastName,email,password,role}){
    const hashedPassword = await bcrypt.hash(password,10);
    const admin = await adminModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role
    });
    return admin;
}

export async function signinAdmin({email,password}) {
    const admin = await adminModel.findOne({email});
      if (!admin) {
        return { error: "Invalid email" };
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return { error: "Invalid password" };
    }
    
    const token =jwt.sign({id: admin._id},process.env.adminJWT)
    return token;
    
}

export async function createCourse({userId,title,description,price,thumbnail}){
    const course = await courseModel.create({
        creatorId: userId,
        title,
        description,
        price,
        thumbnail
    });
    return course
}

export async function updateCourse(courseId,updateFields) {
        const update = await courseModel.findByIdAndUpdate(
            courseId,{
                $set: updateFields
        },{
            new: true
        });
        return update;
}

export async function deleteCourseLogic (courseId){
    const deleted = await courseModel.findByIdAndDelete(courseId,
        {new: true}
    );
    return deleted
}

export async function viewACourses (adminId){
    console.log("----> in adminLogic the admin Id:"+adminId)
    const adminCourses = await courseModel.find({creatorId: adminId});
    return adminCourses
}