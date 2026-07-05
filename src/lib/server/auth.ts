import { betterAuth } from 'better-auth';
import { genericOAuth, keycloak } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { env } from '$env/dynamic/private';

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'postgresql' }),
	plugins: [
		genericOAuth({
			config: [
				keycloak({
					clientId: env.CLIENT_ID,
					clientSecret: env.CLIENT_SECRET,
					issuer: env.ISSUER,
					scopes: ['openid', 'profile', 'email']
				})
			]
		})
	]
});
