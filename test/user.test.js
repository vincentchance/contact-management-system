import supertest from 'supertest';
import {web} from '../src/application/web.js';
import { prismaClient } from '../src/application/database.js';
import { logger } from '../src/application/logging.js';
import { removeTestUser, createTestUser, getTestUser } from './test-util.js';
import bcrypt from 'bcrypt';

describe('POST /api/users', function () {
	
		afterEach( async () => {
			await removeTestUser();
		})
		
		it('should can register new user', async () => {
			const result = await supertest(web)
			.post('/api/users')
			.send({
				username: "Vincent",
				password: "rahasia",
				name: "Vincent Chance"
			});
			
			expect(result.status).toBe(200);
			expect(result.body.data.username).toBe('Vincent');
			expect(result.body.data.name).toBe('Vincent Chance');
			expect(result.body.data.password).toBeUndefined();
		});
		
		it('should cannot register new user', async () => {
			const result = await supertest(web)
			.post('/api/users')
			.send({
				username: '',
				password: '',
				name: ''
			});
			
			expect(result.status).toBe(400);
			expect(result.body.errors).toBeDefined();
		});
		
		
		it('should reject registered new user', async () => {
			let result = await supertest(web)
			.post('/api/users')
			.send({
				username: "Vincent",
				password: "rahasia",
				name: "Vincent Chance"
			});
			
			console.log(result.body)
			logger.info(result.body);
			
			expect(result.status).toBe(200);
			expect(result.body.data.username).toBe('Vincent');
			expect(result.body.data.name).toBe('Vincent Chance');
			expect(result.body.data.password).toBeUndefined();
			
			result = await supertest(web)
			.post('/api/users')
			.send({
				username: "Vincent",
				password: "rahasia",
				name: "Vincent Chance"
			});
			
			logger.info(result.body);
			
			expect(result.status).toBe(400);
			expect(result.body.errors).toBeDefined();
			
		});
});
	
describe('POST /api/users/login', function () {
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeTestUser();
	});
	
	it('should can login', async () => {
		const result = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "Vincent",
			password: "rahasia"
		});
		
		logger.info(result.body);
		
		expect(result.status).toBe(200);
		expect(result.body.data.token).toBeDefined();
		expect(result.body.data.token).not.toBe("test");
	});
	
	it('should reject login request if password is wrong', async () => {
		const result = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "Vincent",
			password: "12"
		});
		
		logger.info(result.body);
		
		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
	
	it('should reject login request if request is invalid', async () => {
		const result = await supertest(web)
		.post('/api/users/login')
		.send({
			username: "",
			password: ""
		});
		
		logger.info(result.body);
		
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});
});

describe('GET /api/users/current', function () {
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeTestUser();
	});
	
	it('should get current user', async () => {
		const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test');
		
		logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('Vincent');
        expect(result.body.data.name).toBe('Vincent Chance');
	});
	
	it('should get rejected because invalid token', async () => {
		const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'wrong');
		
		logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
	});
});

describe('PATCH /api/users/current', function () {
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeTestUser();
	});
	
	it('should can patch user', async () => {
		const result = await supertest(web)
			.patch('/api/users/current')
			.set('Authorization', 'test')
			.send({
				name: 'Vincent Chance1',
				password: 'rahasiaLagi'
			})
			
		logger.info(result.body);
		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('Vincent');
		expect(result.body.data.name).toBe('Vincent Chance1');
	})
	
	
	it('should change name only', async () => {
		const result = await supertest(web)
			.patch('/api/users/current')
			.set('Authorization', 'test')
			.send({
				name: 'Vincent Ismail',
			})
			
		logger.info(result.body);
		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('Vincent');
		expect(result.body.data.name).toBe('Vincent Ismail');
	})
	
	it('should change password only', async () => {
		const result = await supertest(web)
			.patch('/api/users/current')
			.set('Authorization', 'test')
			.send({
				password: 'rahasia2',
			})
			
		logger.info(result.body);
		expect(result.status).toBe(200);
		
		const user = await getTestUser();
		expect(await bcrypt.compare('rahasia2',user.password)).toBe(true);
	})
})

describe('DELETE /api/users/Logout', function() {
	
	beforeEach( async () => {
		await createTestUser();
	});
	
	afterEach( async () => {
		await removeTestUser();
	});
	
	it('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test')
		
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("Ok");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });
	
	it('should reject logout if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah')

        expect(result.status).toBe(401);
    });
	
	
})