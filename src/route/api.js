import express from 'express';
import userController from '../controller/user-controller.js';
import contactController from '../controller/contact-controller.js';
import addressController from '../controller/address-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';
const userRouter = express.Router()

userRouter.use(authMiddleware)

//user API
userRouter.get('/api/users/current', userController.getUser);
userRouter.patch('/api/users/current', userController.patchUser);
userRouter.delete('/api/users/logout', userController.logoutUser);

//contact API
userRouter.post('/api/contacts', contactController.createContact);
userRouter.get('/api/contacts', contactController.searchContact);
userRouter.get('/api/contacts/:contactId', contactController.getContact);
userRouter.put('/api/contacts/:contactId', contactController.updateContact);
userRouter.delete('/api/contacts/:contactId', contactController.removeContact);

//address API
userRouter.post('/api/contacts/:contactId/addresses', addressController.createAddress);
userRouter.get('/api/contacts/:contactId/addresses/:addressId', addressController.getAddress);
userRouter.get('/api/contacts/:contactId/addresses', addressController.getAllAddress);
userRouter.put('/api/contacts/:contactId/addresses/:addressId', addressController.updateAddress);
userRouter.delete('/api/contacts/:contactId/addresses/:addressId', addressController.removeAddress);

export { userRouter }