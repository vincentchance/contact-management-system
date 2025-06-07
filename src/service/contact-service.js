import { validate } from '../validation/validate.js';
import { createContactValidation, updateContactValidation, getContactValidation } from '../validation/contact-validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';

// will receive current user and request 
const createContact = async (user, request) => {
	const contact = validate(createContactValidation, request);
	//masukan user.username yang ada ke dalam contact.username
	contact.username = user.username
	
	return prismaClient.contact.create({
		data: contact,
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			phone: true
		}
	});
}


const getContact = async (user,contactId) => {
	contactId = validate(getContactValidation, contactId);
	
	const contact = await prismaClient.contact.findFirst({
		where: {
			username: user.username,
			id: contactId
		},
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			phone: true
		}
	})
	
	console.log(contact);
	
	if(!contact){
		throw new ResponseError(404, 'contact is not found')
	}
	
	return contact;
}

//const updateContact = async (user, contactId) => {
//	const contact = validate(updateContactValidation, request);
//	
//	return prismaClient.contact.update({
//		where: {
//			user: user.username
//		}
//	})
//}

export default { createContact, getContact }