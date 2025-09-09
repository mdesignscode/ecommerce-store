import type { Handle } from '@sveltejs/kit';
import { validateSessionToken } from 'utils/session';

export const handle: Handle = async ({ event, resolve }) => {
        console.log('running mid');
        return await resolve(event);
        const token = event.cookies.get('session');
        event.locals.user = await validateSessionToken(token);
        return await resolve(event);
};

