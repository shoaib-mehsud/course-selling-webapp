import express from 'express';

import userAuth from '../middleware/userAuth.js';

import * as controller from '../controllers/userController.js';

const userRouter = express.Router();

// public routes
userRouter.post('/signup', controller.signupController);
userRouter.post('/signin', controller.signinController);
userRouter.get('/courses', controller.viewCourses);
// userRouter.get('/course/:id', courseDetail);

// // all the fallowing will have to require the userAuth

userRouter.post('/course/buy/:courseId',userAuth, controller.buyCourse);
 userRouter.get('/myCourses',userAuth, controller.myCourses)

export default userRouter;