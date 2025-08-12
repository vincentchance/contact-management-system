import { PrismaClient } from "@prisma/client";
import {logger} from './logging.js';

const isTest = process.env.NODE_ENV === 'test';

export const prismaClient = new PrismaClient({
  log: isTest ? [] : [
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

if (!isTest) {
  prismaClient.$on('error', (e) => {
    logger.error(e);
  })
  
  prismaClient.$on('warn', (e) => {
    logger.warn(e);
  })
}