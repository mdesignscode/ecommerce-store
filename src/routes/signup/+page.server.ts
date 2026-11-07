import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { z } from 'zod';
import { User } from 'models';
import { DEFAULT_AVATAR, parseForm } from 'utils';
import { sendVerificationEmail } from 'utils/emailVerification';
import { startSession } from 'utils/session';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(303, '/');
};

const SignupSchema = z.object({
	username: z.string().trim().min(2, 'Username must be at least 2 characters'),
	email: z.email('Enter a valid email'),
	password: z.string().min(8, 'Password must be at least 8 characters')
});

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await parseForm(SignupSchema, request);
		if (!form.ok) return form.failure;
		const { username, password } = form.data;
		const email = form.data.email.toLowerCase();

		const taken = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
		if (taken) {
			const field = taken.get('email') === email ? 'Email' : 'Username';
			return fail(400, { error: `${field} is already taken.`, username, email });
		}

		const user = await User.create({
			username,
			email,
			password: await bcrypt.hash(password, 10),
			avatar: DEFAULT_AVATAR
		});
		await startSession(cookies, user.get('id'));

		// A failed send is recoverable: the verify page offers "resend".
		await sendVerificationEmail({ email, username });
		redirect(303, '/signup/validate-email');
	}
} satisfies Actions;
