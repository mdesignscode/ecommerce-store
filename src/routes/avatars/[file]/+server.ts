import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { AVATAR_DIR, AVATAR_TYPES } from '$lib/server/avatars';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const ext = path.extname(params.file).slice(1);
	const type = Object.values(AVATAR_TYPES).find((t) => t.ext === ext)?.mime;
	if (!type || !/^[\w-]+\.\w+$/.test(params.file)) error(404, 'Not found');

	try {
		const body = await readFile(path.join(AVATAR_DIR, params.file));
		return new Response(body, {
			headers: { 'content-type': type, 'cache-control': 'public, max-age=31536000, immutable' }
		});
	} catch {
		error(404, 'Not found');
	}
};
