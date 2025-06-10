import addressService from '../service/address-service.js';

const createAddress = async (req, res, next) => {
	try {
		const user = req.user;
		const request = req.body;
		const contactId = req.params.contactId;
		
		const result = await addressService.createAddress(user, contactId, request)
		res.status(201).json({
			data: result
		})
	} catch(err){
		next(err)
	}
}

const getAddress = async (req, res, next) => {
	try{
		const user = req.user;
		const contactId = req.params.contactId;
		const addressId = req.params.addressId;
		
		const result = await addressService.getAddress(user, contactId, addressId);
		res.status(200).json({
			data: result
		})
	} catch (err){
		next(err)
	}
}

const updateAddress = async (req, res, next) => {
	try{
		const user = req.user;
		const contactId = req.params.contactId;
		const addressId = req.params.addressId;
		const request = req.body;
		request.id = addressId;
		
		const result = await addressService.updateAddress(user, contactId, request);
		res.status(200).json({
			data: result
		})
	} catch (err) {
		next(err)
	}
}

const removeAddress = async (req, res, next) => {
	try {
		const user = req.user;
		const contactId = req.params.contactId;
		const addressId = req.params.addressId;
		
		const result = await addressService.removeAddress(user, contactId, addressId);
		res.status(200).json({
			data: 'Ok'
		})
	} catch (err) {
		next(err)
	}
}

const getAllAddress = async( req, res, next ) => {
	try{
		const user = req.user;
		const contactId = req.params.contactId;
		
		const result = await addressService.getAllAddress(user, contactId)
		res.status(200).json({
			data: result
		})
	} catch (err) {
		next(err)
	}
}

export default { createAddress, getAddress, updateAddress, removeAddress, getAllAddress }