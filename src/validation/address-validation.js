import Joi from 'joi';

const createAddressValidation = Joi.object({
	street: Joi.string().max(100).optional(),
	city: Joi.string().max(100).optional(),
	province: Joi.string().max(100).optional(),
	country: Joi.string().max(100).required(),
	postal_code: Joi.string().max(10).required(),

})

const getAddressValidation = Joi.number().positive().min(1).required();

const updateAddressValidation = Joi.object({
	id: Joi.number().positive().min(1).required(),
	street: Joi.string().max(100).optional(),
	city: Joi.string().max(100).optional(),
	province: Joi.string().max(100).optional(),
	country: Joi.string().max(100).required(),
	postal_code: Joi.string().max(10).required(),
})

export { createAddressValidation, getAddressValidation, updateAddressValidation }