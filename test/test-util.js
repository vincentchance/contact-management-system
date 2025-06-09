import { prismaClient } from '../src/application/database.js';
import { ResponseError } from '../src/error/response-error.js';
import bcrypt from 'bcrypt';

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'Vincent'
        }
    });
};

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "Vincent",
            password: await bcrypt.hash("rahasia", 10),
            name: "Vincent Chance",
            token: "test"
        }
    });
};

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "Vincent"
        }
    });
};

export const removeAllTestContact = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: 'Vincent'
        }
    });
};

export const createTestContact = async () => {
	await prismaClient.contact.create({
		data: {
			username: 'Vincent',
			first_name: 'Vincent',
			last_name: 'Chance',
			email: 'vincent@hotmail.com',
			phone: '08840000'
		}
	});
}

export const createManyTestContact = async () => {
	for(let x = 1; x <= 15; x++){
		await prismaClient.contact.create({
			data: {
				username: 'Vincent',
				first_name: `Vincent ${x}`,
				last_name: `Chance ${x}`,
				email: `vincent${x}@hotmail.com`,
				phone: `08840000${x}`
			}
		})
	}
}

export const getTestContact = async () => {
	return prismaClient.contact.findFirst({
		where: {
			username: 'Vincent'
		}
	});
}

export const removeAllTestAddresses = async () => {
	await prismaClient.address.deleteMany({
		where: {
			contact: {
				username: 'Vincent'
			}
		}
	})
}

export const createTestAddresses = async () => {
	const testContact = await getTestContact();
	await prismaClient.address.create({
		data: {
			contact_id: testContact.id,
			street: "jalan utomo",
			city: "Pekanbaru",
			province: "riau",
			country: "Indonesia",
			postal_code: "28111"
		}
	})
}

export const getTestAddresses = async () => {
	return await prismaClient.address.findFirst({
		where: {
			contact: {
				username: 'Vincent'
			}
		}
	})
}