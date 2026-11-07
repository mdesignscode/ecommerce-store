import { redirect } from '@sveltejs/kit';
import { endSession } from 'utils/session';
import type { Actions } from './$types';

export const load = () => redirect(303, '/');

export const actions = {
	default: async ({ cookies }) => {
		await endSession(cookies);
		redirect(303, '/');
	}
} satisfies Actions;
