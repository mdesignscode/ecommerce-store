import { randomInt } from 'node:crypto';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import { EmailVerification } from 'models';

const STORE_NAME = 'Common Goods';
const CODE_TTL_MINUTES = 10;

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: { user: env.EMAIL_ADDRESS, pass: env.EMAIL_CODE }
});

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function sendVerificationEmail({
	email,
	username
}: {
	email: string;
	username: string;
}) {
	const code = await issueVerificationCode(email);

	const html = `<p>Hi ${escapeHtml(username)},</p>
<p>Thanks for signing up with <strong>${STORE_NAME}</strong>. Use this code to verify your email:</p>
<p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p>
<p>The code expires in ${CODE_TTL_MINUTES} minutes. If you didn't request it, you can ignore this email.</p>`;

	try {
		await transporter.sendMail({
			from: `"${STORE_NAME}" <${env.EMAIL_ADDRESS}>`,
			to: email,
			subject: `Your ${STORE_NAME} verification code`,
			html
		});
		return { ok: true as const };
	} catch (error) {
		console.error('Error sending verification email:', error);
		return {
			ok: false as const,
			error: 'We could not send the verification email. Try again shortly.'
		};
	}
}

async function issueVerificationCode(email: string) {
	const code = randomInt(100000, 1000000).toString();
	const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

	const existing = await EmailVerification.findOne({ where: { email } });
	if (existing) await existing.update({ code, expiresAt, used: false });
	else await EmailVerification.create({ email, code, expiresAt });

	return code;
}

export async function checkVerificationCode(email: string, code: string) {
	const record = await EmailVerification.findOne({ where: { email } });
	if (
		!record ||
		record.get('used') ||
		record.get('expiresAt') < new Date() ||
		record.get('code') !== code
	) {
		return false;
	}
	await record.update({ used: true });
	return true;
}
