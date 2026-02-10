import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
const app = express();

console.log("Checking MONGO_URL");
 process.env.MONGO_URL 
async function DBconneciton(){
   try{ await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected successfully")   
} catch(e){
    console.log("Database connection error:",e);
    process.exit(1);
}
}


app.use(express.json())

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/user', userRouter)
DBconneciton();
app.listen(3000);