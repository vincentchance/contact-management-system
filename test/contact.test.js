import supertest from 'supertest';
import {web} from '../src/application/web.js';
import { prismaClient } from '../src/application/database.js';
import { logger } from '../src/application/logging.js';
import { removeTestUser, createTestUser, getTestUser, removeAllTestContact, createTestContact, createManyTestContact, getTestContact } from './test-util.js';
import bcrypt from 'bcrypt';

describe('POST /api/contacts', function () {
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeAllTestContact();
		await removeTestUser();
	});
	
	it('should create contact', async () => {
		const result = await supertest(web)
		.post('/api/contacts')
		.set('Authorization', 'test')
		.send({
			first_name: 'Vincent',
			last_name: 'Chance',
			email: 'vincent@hotmail.com',
			phone: '08840000'
		})
		
		expect(result.status).toBe(201);
		expect(result.body.data.id).toBeDefined();
		expect(result.body.data.first_name).toBe('Vincent');
		expect(result.body.data.last_name).toBe('Chance');
		expect(result.body.data.email).toBe('vincent@hotmail.com');
		expect(result.body.data.phone).toBe('08840000')
	})
	
	it('should reject a request contact if the token is invalid', async () => {
		const result = await supertest(web)
		.post('/api/contacts/')
		.set('Authorization', 'salah')
		.send({
			first_name: 'Vincent',
			last_name: 'Chance',
			email: 'vincent@hotmail.com',
			phone: '08840000'
		})
		
		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	})
	
	it('should reject a request if data is not valid', async () => {
		const result = await supertest(web)
		.post('/api/contacts')
		.set('Authorization', 'test')
		.send({
			first_name: '',
			last_name: 'Chance',
			email: 'vincent@hotmail.com',
			phone: '08840000'
		})
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	})
})

describe('GET /api/contacts/:contactId', function () {
	
	beforeEach( async () => {
		await createTestUser();
		await createTestContact();
	});
	
	afterEach( async () => {
		await removeAllTestContact();
		await removeTestUser();
	});
	   
	it('should get a contact data', async() => {
		const testContact = await getTestContact();
		console.log(testContact.id);
		const result = await supertest(web)
		.get('/api/contacts/' + testContact.id )
		.set('Authorization', 'test')
		
		logger.info(result.body);
		
		expect(result.status).toBe(200);
		expect(result.body.data.id).toBe(testContact.id);
		expect(result.body.data.first_name).toBe('Vincent');
		expect(result.body.data.last_name).toBe('Chance');
		expect(result.body.data.email).toBe('vincent@hotmail.com');
		expect(result.body.data.phone).toBe('08840000');
	})
	
	it('must return 404 if contact is not found', async () => {
		const testContact = await getTestContact();
		console.log(testContact.id);
		const result = await supertest(web)
		.get('/api/contacts/' + (testContact.id + 1) )
		.set('Authorization', 'test')
		
		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	})
})

describe('PUT /api/contacts/:contactId', function () {
	beforeEach( async () => {
		await createTestUser();
		await createTestContact();
	});
	
	afterEach( async () => {
		await removeAllTestContact();
		await removeTestUser();
	});
	
	it('should update the contact', async () => {
		const testContact = await getTestContact();
		
		const result = await supertest(web)
		.put('/api/contacts/' + testContact.id)
		.set('Authorization', 'test')
		.send({
			first_name : "Vincent1",
			last_name: "Cha",
			email: "vincent1@hotmail.com",
			phone: "09988800"
		});
		
		expect(result.status).toBe(200);
		expect(result.body.data.first_name).toBe("Vincent1");
		expect(result.body.data.last_name).toBe("Cha");
		expect(result.body.data.email).toBe("vincent1@hotmail.com");
		expect(result.body.data.phone).toBe("09988800");
	})
	
	it('should reject update req if req is not valid', async () => {
		const testContact = await getTestContact();
		
		const result = await supertest(web)
		.put('/api/contacts/' + testContact.id)
		.set('Authorization', 'test')
		.send({
			first_name : "",
			last_name: "Cha",
			email: "vincent1@hotmail.com",
			phone: "09988800"
		});
		
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	})
})


describe('DELETE /api/contacts/:contactId', function () {
	beforeEach( async () => {
		await createTestUser();
		await createTestContact();
	});
	
	afterEach( async () => {
		await removeAllTestContact();
		await removeTestUser();
	});
	
	it('should can delete contact', async () => {
		let testContact = await getTestContact();
		
		const result = await supertest(web)
		.delete('/api/contacts/' + testContact.id)
		.set('Authorization', 'test')
		
		testContact = await getTestContact();
		expect(result.status).toBe(200);
		expect(testContact).toBe(null);
	})
	
	it('should can reject delete if data not found', async () => {
		let testContact = await getTestContact();
		
		const result = await supertest(web)
		.delete('/api/contacts/' + (testContact.id + 1))
		.set('Authorization', 'test')
		
		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	})
})

describe('GET /api/contacts', function () {
	beforeEach( async () => {
		await createTestUser();
		await createManyTestContact();
	});
	
	afterEach( async () => {
		await removeAllTestContact();
		await removeTestUser();
	});	
	
	it('should search data without parameter', async () => {
		const result = await supertest(web)
		.get('/api/contacts')
		.set('Authorization', 'test')
		
		
		expect(result.status).toBe(200)
		expect(result.body.data.length).toBe(10);
		expect(result.body.paging.page).toBe(1);
		expect(result.body.paging.total_page).toBe(2);
		expect(result.body.paging.total_item).toBe(15);
	})
	
	it('should get search into page 2', async () => {
		const result = await supertest(web)
		.get('/api/contacts')
		.query({ page: 2 })
		.set('Authorization', 'test')
		

		
		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(5);
		expect(result.body.paging.page).toBe(2);
		expect(result.body.paging.total_page).toBe(2);
		expect(result.body.paging.total_item).toBe(15);
	})
})