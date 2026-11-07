import { fail, redirect } from '@sveltejs/kit';
import type { z } from 'zod';

/** Parse a form submission against a zod schema; on failure, return a 400 with the first issue. */
export async function parseForm<S extends z.ZodType>(schema: S, request: Request) {
	const data = Object.fromEntries(await request.formData());
	const result = schema.safeParse(data);
	if (!result.success) {
		return {
			ok: false as const,
			failure: fail(400, { error: result.error.issues[0]?.message ?? 'Invalid form submission' })
		};
	}
	return { ok: true as const, data: result.data as z.infer<S> };
}

export function requireUser(locals: App.Locals) {
	if (!locals.user) redirect(303, '/sign-in');
	return locals.user;
}

export function requireAdmin(locals: App.Locals) {
	const user = requireUser(locals);
	if (user.get('role') !== 'admin') redirect(303, '/');
	return user;
}

export const DEFAULT_AVATAR = '/images/icons8-user-64.png';
