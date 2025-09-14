import { redirect, fail, type Actions } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { User } from 'models';
import { sendEmail } from 'utils/emailVerification';
import { createSession, generateSessionToken } from 'utils/session';
import type { PageServerLoad } from './$types';
import z from 'zod';
import type { ExtractSuccess } from 'utils';

export const load: PageServerLoad = ({ locals }) => {
        const user = locals.user;
        if (user) {
                throw redirect(302, '/');
        }
};

const SignupSchema = z.object({
        username: z.string().min(2, "Username required (minimum 2 characters)"),
        email: z.email(),
        password: z.string(),
});

export const actions = {
        default: async ({ request, cookies }) => {
                const form = await request.formData();
                const formData = Object.fromEntries(form.entries())

                const formParseResult = SignupSchema.safeParse(formData);
                if (!formParseResult.success) {
                        return fail(400, {
                                error: 'Password/Email/Username required',
                                issues: formParseResult.error.issues,
                        });
                }
                const { email, password, username } = formParseResult.data;

                const existingUser = await User.findOne({ where: { username } });

                if (existingUser) {
                        return fail(400, { error: 'Username already taken.' });
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                const avatar = '/images/icons8-user-64.png';

                const newUser = await User.create({
                        username,
                        password: hashedPassword,
                        email,
                        avatar,
                });

                const token = generateSessionToken();

                await createSession(token, newUser.get('id'));

                cookies.set('session', token, {
                        path: '/',
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 60 * 60 * 24 * 30,
                });

                const { status, data } = await sendEmail({ email, username });

                if (status === 'fail') {
                        return fail(500, { error: data });
                }

                const validateEmailUri = `/signup/validate-email?email=${email}`;

                const userData = await User.findOne({
                        where: { username },
                        attributes: {
                                exclude: ['password'],
                        },
                });

                return {
                        user: userData!.get({ plain: true }),
                        redirectTo: validateEmailUri,
                        message: 'Account created',
                };
        }
} satisfies Actions;

export type TSignupSuccess = ExtractSuccess<typeof actions.default>;

