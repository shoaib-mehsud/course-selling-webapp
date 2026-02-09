import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true} },
    {timestamps: true
});
const UserModel = mongoose.model('user',userSchema);
console.log("IN USERDB.JS")
export default UserModel;
