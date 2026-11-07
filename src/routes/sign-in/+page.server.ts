import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { ProductState, User } from 'models';
import { createSession, generateSessionToken } from 'utils/session';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import type { ExtractSuccess } from 'utils';
import type { TProductState } from 'store';

export const load: PageServerLoad = async ({ locals }) => {
        const user = locals.user;
        if (user) {
                user
                throw redirect(302, '/');
        }
};

const LoginSchema = z.object({
        email: z.email(),
        password: z.string(),
});

export const actions = {
        default: async ({ request, cookies }) => {
                const form = await request.formData();
                const data = Object.fromEntries(form.entries())

                const formParseResult = LoginSchema.safeParse(data);
                if (!formParseResult.success) {
                        return fail(400, {
                                error: 'Password/Email missing',
                                issues: formParseResult.error.issues,
                        });
                }
                const { email, password } = formParseResult.data;

                const user = await User.findOne({ where: { email } });

                if (!user) {
                        return fail(400, { error: 'Invalid email or password.' });
                }

                const validPassword = bcrypt.compare(password, user.get('password'));

                if (!validPassword) {
                        return fail(400, { error: 'Invalid email or password.' });
                }

                const allProducts = await ProductState.findAll({
                        where: {
                                userId: user.get('id'),
                        },
                });

                const token = generateSessionToken();
                await createSession(token, user.get('id'));

                cookies.set('session', token, {
                        path: '/',
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 60 * 60 * 24 * 30 // 30 days
                });

                const { password: _, ...userData } = user.get({ plain: true });
                const userProducts = allProducts.map(p => p.get({ plain: true })) as TProductState[];

                return { user: userData, userProducts, message: 'User authenticated' };
        }
} satisfies Actions;

export type TLoginSuccess = ExtractSuccess<typeof actions.default>

