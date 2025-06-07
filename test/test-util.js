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