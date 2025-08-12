import { validate } from '../validation/validate.js';
import { prismaClient } from '../application/database.js';
import { getContactValidation } from '../validation/contact-validation.js';
import { ResponseError } from '../error/response-error.js';
import { createAddressValidation, getAddressValidation, updateAddressValidation } from '../validation/address-validation.js';

const checkContactExist = async (user , contactId) => {
	contactId = validate(getContactValidation, contactId);
	
	const exists = await prismaClient.contact.findFirst({
		where: {
			username: user.username,
			id: contactId
		},
		select: { id: true }
	})
	
	if(!exists){
		throw new ResponseError(404, "contact is not found");
	}
	
	return contactId
}

const createAddress = async (user, contactId, request) => {
	contactId = await checkContactExist(user, contactId)
	
	const address = validate(createAddressValidation, request);
	address.contact_id = contactId
	
	return prismaClient.address.create({
		data: address,
		select: {
			id: true,
			street: true,
			city: true,
			province: true,
			country: true,
			postal_code: true,
		}
	})
}

const getAddress = async( user, contactId, addressId) => {
	contactId = await checkContactExist(user, contactId);
	addressId = validate(getAddressValidation, addressId);
	
	return prismaClient.address.findFirst({
		where: {
			contact_id: contactId,
			id: addressId
		}, 
		select: {
			id: true,
			street: true,
			city: true,
			province: true,
			country: true,
			postal_code: true
		}
	})
}

const updateAddress = async(user, contactId, request) => {
	contactId = await checkContactExist(user, contactId);
	const address = validate(updateAddressValidation, request);
	
	const exists = await prismaClient.address.findFirst({
		where: {
			contact_id:  contactId,
			id: address.id
		},
		select: { id: true }
	})
	
	if(!exists){
		throw new ResponseError(404, 'address not found')
	}
	
	return prismaClient.address.update({
		where: {
			id: address.id
		},
		data: {
			street: address.street,
			city: address.city,
			province: address.province,
			country: address.country,
			postal_code: address.postal_code
		},
		select: {
			id: true,
			street: true,
			city: true,
			province: true,
			country: true,
			postal_code: true
		}
	})
}

const removeAddress = async (user, contactId, addressId) => {
    contactId = await checkContactExist(user, contactId);
    addressId = validate(getAddressValidation, addressId);

    const exists = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: { id: true }
    });
 
    if (!exists) {
        throw new ResponseError(404, "address is not found");
    }

    return prismaClient.address.delete({
        where: {
            id: addressId
        }
    });
}

const getAllAddress = async (user, contactId) => {
	contactId = await checkContactExist(user, contactId);
	
	const first = await prismaClient.address.findFirst({
		where: { contact_id: contactId },
		select: { id: true }
	});
	
	if(!first){
		throw new ResponseError(404, "address not found")
	}
	
	return prismaClient.address.findMany({
		where: {
			contact_id: contactId
		},
		select: {
			id: true,
			street: true,
			city: true,
			province: true,
			country: true,
			postal_code: true
		}
	})
}

export default { createAddress, getAddress, updateAddress, removeAddress, getAllAddress }