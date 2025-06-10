import { logger } from '../src/application/logging.js';
import { removeTestUser, 
		createTestUser, 
		getTestUser, 
		removeAllTestContact, 
		getManyTestAddresses, 
		getTestAddresses, 
		createTestContact, 
		createManyTestAddresses, 
		createTestAddresses, 
		createManyTestContact, 
		getTestContact,
		removeAllTestAddresses } from './test-util.js';
import supertest from 'supertest';
import { web } from '../src/application/web.js';

describe('POST api/contacts/:contactId/addresses', function () {
	
	beforeEach( async () => {
		await createTestUser();
		await createTestContact();
	});
	
	afterEach( async () => {
		await removeAllTestAddresses();
		await removeAllTestContact();
		await removeTestUser();
		
	});	
	
	it('should create an address by contactId', async () => {
		const testContact = await getTestContact();
		
		const result = await supertest(web) 
		.post(`/api/contacts/${testContact.id}/addresses`)
		.set('Authorization', 'test')
		.send({
			 street: "jalan utomo",
		     city: "Pekanbaru",
		     province: "riau",
		     country: "Indonesia",
		     postal_code: "28111"
		})

		expect(result.status).toBe(201);
		expect(result.body.data.street).toBe("jalan utomo");
		expect(result.body.data.city).toBe("Pekanbaru");
		expect(result.body.data.province).toBe("riau");
		expect(result.body.data.country).toBe("Indonesia");
	})
	
	it('should not create an address because contactId is invalid', async () => {
		const testContact = await getTestContact();
		
		const result = await supertest(web)
		.post(`/api/contacts/${testContact.id + 1}/addresses`)
		.set('Authorization', 'test')
		.send({
			 street: "jalan utomo",
		     city: "Pekanbaru",
		     province: "riau",
		     country: "Indonesia",
		     postal_code: "28111"
		})
		
		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	})
	
	
	it('should not create an address because data is invalid', async () => {
		const testContact = await getTestContact();
		
		const result = await supertest(web)
		.post(`/api/contacts/${testContact.id}/addresses`)
		.set('Authorization', 'test')
		.send({
			 street: "jalan utomo",
		     city: "Pekanbaru",
		     province: "riau",
		     country: "",
		     postal_code: "28111"
		})
		
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	})
})


describe('GET /api/contacts/:contactId/addresses/:addressId', function () {
	beforeEach( async () => {
		await createTestUser();
		await createTestContact();
		await createTestAddresses();
	});
	
	afterEach( async () => {
		await removeAllTestAddresses();
		await removeAllTestContact();
		await removeTestUser();
		
	});	
	it('should get address data by username, contactId, and addressId', async () => {
		const testContact = await getTestContact();
		const testAddress = await getTestAddresses();
		
		const result = await supertest(web)
		.get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
		.set('Authorization', 'test')
		
		expect(result.status).toBe(200)
		expect(result.body.data.street).toBe('jalan utomo');
		expect(result.body.data.city).toBe('Pekanbaru');
		expect(result.body.data.province).toBe('riau');
		expect(result.body.data.country).toBe('Indonesia');
		expect(result.body.data.postal_code).toBe('28111');
	})
	
	it('should not get address data if id is invalid', async () => {
		const testContact = await getTestContact();
		const testAddress = await getTestAddresses();
		
		const result = await supertest(web)
		.get(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id + 1}`)
		.set('Authorization', 'test')
		
		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	})
})

describe('PUT /api/contacts/:contactId/addresses/:addressId', function () {
	beforeEach( async () => {
		await createTestUser();
		await createTestContact();
		await createTestAddresses();
	});
	
	afterEach( async () => {
		await removeAllTestAddresses();
		await removeAllTestContact();
		await removeTestUser();
	});	
	
	it('should update the data', async () => {
		const testContact = await getTestContact();
		const testAddress = await getTestAddresses();
		
		const result = await supertest(web)
		.put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
		.set('Authorization', 'test')
		.send({
			street: "jalan sutomo",
			city: "pekanbaru",
			province: "riau",
			country: "Indonesia",
			postal_code: "28111"
		})
		
		
		expect(result.status).toBe(200);
		expect(result.body.data.street).toBe('jalan sutomo');
		expect(result.body.data.city).toBe('pekanbaru');
		expect(result.body.data.province).toBe('riau');
		expect(result.body.data.country).toBe('Indonesia');
		expect(result.body.data.postal_code).toBe('28111');
	})
	
	it('should reject update the data if data is invalid', async () => {
		const testContact = await getTestContact();
		const testAddress = await getTestAddresses();
		
		const result = await supertest(web)
		.put(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
		.set('Authorization', 'test')
		.send({
			street: "jalan sutomo",
			city: "pekanbaru",
			province: "riau",
			country: "Indonesia",
			postal_code: "28111"
		})
		
		expect(result.status).toBe(404);
	})
})


describe(' DELETE /api/contacts/:contactId/addresses/:addressId', function () {
	beforeEach( async () => {
		await createTestUser();
		await createTestContact();
		await createTestAddresses();
	});
	
	afterEach( async () => {
		await removeAllTestAddresses();
		await removeAllTestContact();
		await removeTestUser();
	});	
	
	it('should delete the address data', async () => {
		const testContact = await getTestContact();
		let testAddress = await getTestAddresses();
		console.log( testContact);
		console.log( testAddress);
		const result = await supertest(web)
		.delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
		.set('Authorization', 'test')
		
		console.log(result);
		
		expect(result.status).toBe(200);
		testAddress = await getTestAddresses();
		expect(testAddress).toBeNull();
	})
	
	it('should reject delete because data not found', async () => {
		const testContact = await getTestContact();
		let testAddress = await getTestAddresses();
		
		const result = await supertest(web)
		.delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
		.set('Authorization', 'test')
		
		expect(result.status).toBe(404);
	})
})

describe('GET /api/contacts/:contactId/addresses', function () {
	beforeEach( async () => {
		await createTestUser();
		await createTestContact();
		await createManyTestAddresses();
	});
	
	afterEach( async () => {
		await removeAllTestAddresses();
		await removeAllTestContact();
		await removeTestUser();
	});	
	
	it('should get all address in contactId', async () => {
		const testContact = await getTestContact();

		const result = await supertest(web)
		.get(`/api/contacts/${testContact.id}/addresses`)
		.set('Authorization', 'test')
		
		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(2);
		const testAddress = await getManyTestAddresses();
		console.log(testAddress);
	})
	
	it('should not get all address if id is invalid', async () => {
		const testContact = await getTestContact();

		const result = await supertest(web)
		.get(`/api/contacts/${testContact.id + 1}/addresses`)
		.set('Authorization', 'test')
		
		expect(result.status).toBe(404);
	})
})