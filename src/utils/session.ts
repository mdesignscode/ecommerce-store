import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { Op } from 'sequelize';
import { Session, User } from 'models';

const SESSION_COOKIE = 'session';
const SESSION_DAYS = 30;

const hashToken = (token: string) => encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

/** Create a session for the user and set its cookie. */
export async function startSession(cookies: Cookies, userId: string) {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * SESSION_DAYS;

	await Session.create({ id: hashToken(token), userId, expiresAt: Math.floor(expiresAt / 1000) });

	cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		maxAge: 60 * 60 * 24 * SESSION_DAYS
	});
}

export async function getSessionUser(cookies: Cookies) {
	const token = cookies.get(SESSION_COOKIE);
	if (!token) return;

	const session = await Session.findByPk(hashToken(token));
	if (!session) return;

	if (Date.now() >= session.get('expiresAt') * 1000) {
		await session.destroy();
		return;
	}

	const user = await User.findByPk(session.get('userId'), {
		attributes: { exclude: ['password'] }
	});
	return user ?? undefined;
}

export async function endSession(cookies: Cookies) {
	const token = cookies.get(SESSION_COOKIE);
	if (token) await Session.destroy({ where: { id: hashToken(token) } });
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

/** Remove every session for the user except the one making this request. */
export async function endOtherSessions(cookies: Cookies, userId: string) {
	const token = cookies.get(SESSION_COOKIE);
	const keep = token ? hashToken(token) : '';
	await Session.destroy({ where: { userId, id: { [Op.ne]: keep } } });
}
