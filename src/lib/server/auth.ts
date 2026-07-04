import { betterAuth } from 'better-auth';
import { genericOAuth, keycloak } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { CLIENT_ID, CLIENT_SECRET, ISSUER } from '$env/static/private';

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'postgresql' }),
	plugins: [
		genericOAuth({
			config: [
				keycloak({
					clientId: CLIENT_ID,
					clientSecret: CLIENT_SECRET,
					issuer: ISSUER,
					scopes: ['openid', 'profile', 'email']
				})
			]
		})
	]
});
