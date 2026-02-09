import adminModel  from "../models/adminDB.js";
import courseModel from "../models/coursesDB.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    if(!admin){
        return "invalid emial"
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if(isMatch){
        const token =jwt.sign({id: admin._id},process.env.adminJWT)
        return token;
    }
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