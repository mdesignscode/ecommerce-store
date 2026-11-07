import type { Handle } from '@sveltejs/kit';
import { getSessionUser } from 'utils/session';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getSessionUser(event.cookies);
	return resolve(event);
};
