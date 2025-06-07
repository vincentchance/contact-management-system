import joi from 'joi';

// ini adalah validation schema untuk user 
const registerUserValidation = joi.object({
	username: joi.string().max(100).required(),
	password: joi.string().max(100).required(),
	name: joi.string().max(100).required()
});

const loginUserValidation = joi.object({
	username: joi.string().max(100).required(),
	password: joi.string().max(100).required(),
});

const getUserValidation = joi.string().max(100).required();

const updateUserValidation = joi.object({
	username: joi.string().max(100).required(),
	password: joi.string().max(100).optional(),
	name: joi.string().max(100).optional(),
})
export { registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation }