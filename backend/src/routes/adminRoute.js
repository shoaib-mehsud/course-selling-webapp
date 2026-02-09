import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import * as adminControl from '../controllers/adminController.js'


const adminRouter = express.Router();

adminRouter.post('/signup', adminControl.signupAdmin);
adminRouter.post('/signin', adminControl.signinAdmin);

// all the fallowing will have to require the adminAuth

adminRouter.post('/course',adminAuth,adminControl.createCourse);
// adminRouter.put('/course/:courseId',adminAuth,updateCourse);
// adminRouter.delete('/course/:courseId',adminAuth, deleteCourse);
// adminRouter.get('/courses',adminAuth, viewCourses);

export default adminRouter;