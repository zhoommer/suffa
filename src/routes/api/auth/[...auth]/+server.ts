import type { RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const GET: RequestHandler = async (event) => {
	return auth.handler(event.request);
};

export const POST: RequestHandler = async (event) => {
	return auth.handler(event.request);
};



