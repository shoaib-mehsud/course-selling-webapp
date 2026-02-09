import mongoose from "mongoose";

const Schema = mongoose.Schema;

const courseSchema = new Schema  ({
    title: {type:String, required: true},
    description: {type:String,required:true},
    price: {type:Number, required:true,min:0},
    creatorId:{type: mongoose.Schema.Types.ObjectId, 
        ref: 'admin',
        required: true},
    thumbnail:{type:String}
})

const courseModel = mongoose.model('course',courseSchema);
export default courseModel;