import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { User } from 'models';
import { parseForm, requireUser } from 'utils';
import {
	checkVerificationCode,
	emailEnabled,
	sendVerificationEmail
} from 'utils/emailVerification';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = requireUser(locals);
	if (user.get('isVerified')) redirect(303, '/');
	// Without email configured there is no code to send; verify and move on.
	if (!emailEnabled()) {
		await user.update({ isVerified: true });
		redirect(303, '/');
	}
	return { email: user.get('email') };
};

const CodeSchema = z.object({ code: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code') });
const ChangeEmailSchema = z.object({ newEmail: z.email('Enter a valid email') });

export const actions = {
	verifyCode: async ({ request, locals }) => {
		const user = requireUser(locals);
		const form = await parseForm(CodeSchema, request);
		if (!form.ok) return form.failure;

		const valid = await checkVerificationCode(user.get('email'), form.data.code);
		if (!valid) return fail(400, { error: 'That code is invalid or has expired.' });

		await user.update({ isVerified: true });
		redirect(303, '/');
	},
	resendCode: async ({ locals }) => {
		const user = requireUser(locals);
		const sent = await sendVerificationEmail({
			username: user.get('username'),
			email: user.get('email')
		});
		if (!sent.ok) return fail(502, { error: sent.error });
		return { message: 'A new code is on its way.' };
	},
	changeEmail: async ({ request, locals }) => {
		const user = requireUser(locals);
		const form = await parseForm(ChangeEmailSchema, request);
		if (!form.ok) return form.failure;
		const newEmail = form.data.newEmail.toLowerCase();

		if (await User.findOne({ where: { email: newEmail } })) {
			return fail(400, { error: 'That email is already in use.' });
		}

		await user.update({ email: newEmail });
		const sent = await sendVerificationEmail({ username: user.get('username'), email: newEmail });
		if (!sent.ok) return fail(502, { error: sent.error });
		return { message: `Email updated. We sent a new code to ${newEmail}.` };
	}
} satisfies Actions;
