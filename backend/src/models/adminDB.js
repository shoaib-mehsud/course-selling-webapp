import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const adminSchema = new Schema({
    firstName: {type: String, required:true},
    lastName: {type:String, required:true
    },
    email:{
        type:String, unique:true
    },
    password: { type:String,required: true
    },
    role:{
        type:String, default:'admin'
    }},
    
    { timestamps: true})

const adminModel = mongoose.model('admin',adminSchema);

export default adminModel;