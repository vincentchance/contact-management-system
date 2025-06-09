import { validate } from '../validation/validate.js';
import { createContactValidation, updateContactValidation, getContactValidation, searchContactValidation } from '../validation/contact-validation.js';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { logger } from '../application/logging.js';

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
	
	if(!contact){
		throw new ResponseError(404, 'contact is not found')
	}
	
	return contact;
}

const updateContact = async (user, request) => {
	const contact = validate(updateContactValidation, request);
	
	const totalContactinDatabase = await prismaClient.contact.count({
		where: {
			username : user.username,
			id: contact.id
		}
	})
	
	if(totalContactinDatabase !== 1){
		throw new ResponseError(404, 'contact is not found')
	}
	
	return await prismaClient.contact.update({
		where: {
			id: contact.id
		},
		data: {
			first_name: contact.first_name,
			last_name: contact.last_name,
			email: contact.email,
			phone: contact.phone
		},
		select: {
			id: true,
			first_name: true,
			last_name: true,
			email: true,
			phone: true
		}
	})
}

const removeContact = async (user, contactId) => {
	contactId = validate(getContactValidation, contactId)
	
	const totalInDatabase = await prismaClient.contact.count({
		where: {
			username: user.username,
			id: contactId
		}
	})
	
	if(totalInDatabase !== 1){
		throw new ResponseError(404, "contact is not found")
	}
	
	return await prismaClient.contact.delete({
		where: {
			id: contactId
		}
	})
}

const searchContact = async (user, request) => {
	request = validate(searchContactValidation, request)
	
	logger.info(request)
	//  page 1 - 1 = 0 size = 10 * 0  
	//  page 2 - 1 = 1 size = 10 * 1 = 10 
	const skip = ( request.page  - 1) * request.size
	
	const filters = []
	
	filters.push({
		username: user.username
	})
	
	if(request.name){
		filters.push({
		OR: [
				{
					first_name: {
						contains: request.name
					}
				},
				{
					last_name: {
							contains: request.name
						}
					}
				]
			});
		}
	if(request.email){
		filters.push({
		OR: [
				{
					email: {
						contains: request.email
					}
				}
			]
		});
	}
	
	const contacts = await prismaClient.contact.findMany({
		where: {
			AND: filters
		},
		take: request.size,
		skip: skip
	})
	
	const totalItems = await prismaClient.contact.count({
		where: {
			AND: filters
		}
	});
	
	return {
		data: contacts, 
		paging: {
			page: request.page,
			total_item: totalItems,
			total_page: Math.ceil(totalItems/ request.size)
			
		}
	}
}




export default { createContact, getContact, updateContact, removeContact, searchContact }