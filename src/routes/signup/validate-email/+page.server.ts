import { redirect, fail, type Actions } from '@sveltejs/kit';
import { User } from 'models';
import { sendEmail, validateEmailVerificationCode } from 'utils/emailVerification';
import type { PageServerLoad } from './$types';
import z from 'zod';
import type { ExtractSuccess } from 'utils';

export const load: PageServerLoad = async ({ url, locals }) => {
        const sessionUser = locals.user;
        if (!sessionUser) throw redirect(302, '/login');

        const email = url.searchParams.get('email') ?? "";
        const user = await User.findOne({
                where: { email }
        });

        if (!user) throw redirect(302, '/login');
        if (user.get('isVerified')) throw redirect(302, '/');
        return { email }
}

const EmailVerificationSchema = z.object({
        code: z.string().length(6),
});

const ChangeEmailSchema = z.object({
        newEmail: z.email(),
});

export const actions = {
        verifyCode: async ({ request, locals }) => {
                const user = locals.user;
                if (!user) redirect(302, '/login');

                const form = await request.formData();
                const formData = Object.fromEntries(form.entries())

                const formParseResult = EmailVerificationSchema.safeParse(formData);
                if (!formParseResult.success) {
                        return fail(400, {
                                error: 'Verification code required',
                                issues: formParseResult.error.issues,
                        });
                }
                const { code } = formParseResult.data;

                const { success, message } = await validateEmailVerificationCode(user.get('email'), code);

                if (success) {
                        user.setDataValue('isVerified', true);
                        await user.save();
                        return {
                                message: 'Email verified',
                                user: user.get(),
                                redirectTo: '/',
                        };
                }
                else return fail(400, { error: message })
        },
        resendCode: async ({ locals }) => {
                const user = locals.user;
                if (!user) throw redirect(302, '/login');

                const { status, data } = await sendEmail({ username: user.get('username'), email: user.get('email') })
                if (status === 'fail') return fail(400, { error: data })
                return { user: user.get(), message: 'New code sent' };
        },
        changeEmail: async ({ request, locals }) => {
                const user = locals.user;
                if (!user) throw redirect(302, '/login');

                const form = await request.formData();
                const formData = Object.fromEntries(form.entries())

                const formParseResult = ChangeEmailSchema.safeParse(formData);
                if (!formParseResult.success) {
                        return fail(400, {
                                error: 'Missing new email',
                                issues: formParseResult.error.issues,
                        });
                }
                const { newEmail } = formParseResult.data;

                const validateEmailUri = `/signup/validate-email?email=${newEmail}`;

                user.setDataValue('email', newEmail);
                await user.save();
                return {
                        message: 'Email updated',
                        user: user.get(),
                        redirectTo: validateEmailUri,
                        newEmail,
                };
        }
} satisfies Actions;

export type TEmailVerificationSuccess = ExtractSuccess<typeof actions.verifyCode>;
export type TChangeEmailSuccess = ExtractSuccess<typeof actions.changeEmail>;
export type TResendCodeSuccess = ExtractSuccess<typeof actions.resendCode>;

