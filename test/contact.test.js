import supertest from 'supertest';
import {web} from '../src/application/web.js';
import { prismaClient } from '../src/application/database.js';
import { logger } from '../src/application/logging.js';
import { removeTestUser, createTestUser, getTestUser, removeAllTestContact } from './test-util.js';
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
		
		expect(result.status).toBe(200);
		expect(result.body.data.id).toBeDefined();
		expect(result.body.data.first_name).toBe('Vincent');
		expect(result.body.data.last_name).toBe('Chance');
		expect(result.body.data.email).toBe('vincent@hotmail.com');
		expect(result.body.data.phone).toBe('08840000')
	})
})