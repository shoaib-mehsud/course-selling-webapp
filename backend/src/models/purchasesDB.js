import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const purchasedSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
    ref:'user', required: true },
    courseId:{type: mongoose.Schema.Types.ObjectId,
        ref: 'course', required: true
    },
    paymentReference:{type: String, unique: true},
    payment:{type:Number}
})
// create a constraint that a user can buy a course only once
purchasedSchema.index({ userId: 1, courseId: 1 }, { unique: true });
const purchasedModel = mongoose.model('purchases',purchasedSchema);
export default purchasedModel;