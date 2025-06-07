import express from 'express';
import userController from '../controller/user-controller.js';
import contactController from '../controller/contact-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
const userRouter = express.Router()

userRouter.use(authMiddleware)

//user API
userRouter.get('/api/users/current', userController.getUser);
userRouter.patch('/api/users/current', userController.patchUser);
userRouter.delete('/api/users/logout', userController.logoutUser);

//contact API
userRouter.post('/api/contacts', contactController.createContact);

export { userRouter }