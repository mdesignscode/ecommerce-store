import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { User } from 'models';
import { parseForm } from 'utils';
import { startSession } from 'utils/session';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(303, '/');
};

const SignInSchema = z.object({
	email: z.email('Enter a valid email'),
	password: z.string().min(1, 'Enter your password'),
	redirectTo: z.string().optional()
});

/** Only allow same-site paths, never `//evil.com` or absolute URLs. */
const safePath = (path?: string) => (path && /^\/(?![/\\])/.test(path) ? path : '/');

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await parseForm(SignInSchema, request);
		if (!form.ok) return form.failure;
		const { email, password, redirectTo } = form.data;

		const user = await User.findOne({ where: { email: email.toLowerCase() } });
		const valid = user ? await bcrypt.compare(password, user.get('password')) : false;
		if (!user || !valid) return fail(400, { error: 'Invalid email or password.', email });

		await startSession(cookies, user.get('id'));
		redirect(303, user.get('isVerified') ? safePath(redirectTo) : '/signup/validate-email');
	}
} satisfies Actions;
