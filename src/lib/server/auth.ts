import { betterAuth } from 'better-auth';
import { genericOAuth, keycloak } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import { env } from '$env/dynamic/private';

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET ?? 'build-placeholder-secret',
	baseURL: env.BETTER_AUTH_URL ?? 'http://localhost:5173',
	database: prismaAdapter(prisma, { provider: 'postgresql' }),
	plugins: [
		genericOAuth({
			config: [
				keycloak({
					clientId: env.CLIENT_ID ?? 'build',
					clientSecret: env.CLIENT_SECRET ?? 'build',
					issuer: env.ISSUER ?? 'http://localhost:8080/realms/suffa',
					scopes: ['openid', 'profile', 'email']
				})
			]
		})
	]
});
