import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
	const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
	return new PrismaClient({
		adapter,
		log: dev ? ['query', 'warn', 'error'] : ['error']
	});
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (dev) globalForPrisma.prisma = prisma;

export default prisma;
