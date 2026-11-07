import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Op } from 'sequelize';
import { z } from 'zod';
import { ProductState, Session, User } from 'models';
import { DEFAULT_AVATAR, parseForm, requireUser } from 'utils';
import { endOtherSessions, endSession } from 'utils/session';
import { AVATAR_DIR, AVATAR_MAX_BYTES, detectImageType } from '$lib/server/avatars';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	requireUser(locals);
};

const UsernameSchema = z.object({
	username: z.string().trim().min(2, 'Display name must be at least 2 characters')
});

const PasswordSchema = z.object({
	currentPassword: z.string().min(1, 'Enter your current password'),
	newPassword: z.string().min(8, 'New password must be at least 8 characters')
});

async function removeUploadedAvatar(avatar: string) {
	if (!avatar.startsWith('/avatars/')) return;
	await unlink(path.join(AVATAR_DIR, path.basename(avatar))).catch(() => {});
}

export const actions = {
	changeAvatar: async ({ request, locals }) => {
		const user = requireUser(locals);
		const file = (await request.formData()).get('avatar');
		if (!(file instanceof File) || file.size === 0)
			return fail(400, { error: 'Choose an image to upload.' });
		if (file.size > AVATAR_MAX_BYTES)
			return fail(400, { error: 'Images must be 2 MB or smaller.' });

		const buffer = Buffer.from(await file.arrayBuffer());
		const type = detectImageType(buffer);
		if (!type) return fail(400, { error: 'Upload a PNG, JPEG, GIF or WebP image.' });

		const filename = `${randomUUID()}.${type.ext}`;
		await mkdir(AVATAR_DIR, { recursive: true });
		await writeFile(path.join(AVATAR_DIR, filename), buffer);

		await removeUploadedAvatar(user.get('avatar'));
		await user.update({ avatar: `/avatars/${filename}` });
		return { message: 'Avatar updated.' };
	},
	resetAvatar: async ({ locals }) => {
		const user = requireUser(locals);
		await removeUploadedAvatar(user.get('avatar'));
		await user.update({ avatar: DEFAULT_AVATAR });
		return { message: 'Avatar reset.' };
	},
	changeUsername: async ({ request, locals }) => {
		const user = requireUser(locals);
		const form = await parseForm(UsernameSchema, request);
		if (!form.ok) return form.failure;
		const { username } = form.data;

		const taken = await User.findOne({ where: { username, id: { [Op.ne]: user.id } } });
		if (taken) return fail(400, { error: 'That display name is taken.' });

		await user.update({ username });
		return { message: 'Display name updated.' };
	},
	changePassword: async ({ request, locals, cookies }) => {
		const sessionUser = requireUser(locals);
		const form = await parseForm(PasswordSchema, request);
		if (!form.ok) return form.failure;
		const { currentPassword, newPassword } = form.data;

		// locals.user is loaded without the password hash, so fetch it here.
		const user = await User.findByPk(sessionUser.id);
		if (!user || !(await bcrypt.compare(currentPassword, user.get('password')))) {
			return fail(400, { error: 'Your current password is incorrect.' });
		}

		await user.update({ password: await bcrypt.hash(newPassword, 10) });
		await endOtherSessions(cookies, user.id);
		return { message: 'Password updated. Other devices have been signed out.' };
	},
	deleteAccount: async ({ locals, cookies }) => {
		const user = requireUser(locals);
		await endSession(cookies);
		await removeUploadedAvatar(user.get('avatar'));
		await ProductState.destroy({ where: { userId: user.id } });
		await Session.destroy({ where: { userId: user.id } });
		await user.destroy();
		redirect(303, '/');
	}
} satisfies Actions;
