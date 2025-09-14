import type { Handle } from '@sveltejs/kit';
import { validateSessionToken } from 'utils/session';

export const handle: Handle = async ({ event, resolve }) => {
        const token = event.cookies.get('session');
        console.log({ token: event.cookies.get('session'), user: await validateSessionToken(token) })
        event.locals.user = await validateSessionToken(token);
        return await resolve(event);
};

