import path from 'node:path';

/** Uploaded avatars live outside `static/` so they are served in production builds too. */
export const AVATAR_DIR = path.resolve('uploads/avatars');
export const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

export const AVATAR_TYPES = {
	png: { ext: 'png', mime: 'image/png', magic: [0x89, 0x50, 0x4e, 0x47] },
	jpeg: { ext: 'jpg', mime: 'image/jpeg', magic: [0xff, 0xd8, 0xff] },
	gif: { ext: 'gif', mime: 'image/gif', magic: [0x47, 0x49, 0x46, 0x38] },
	webp: { ext: 'webp', mime: 'image/webp', magic: [0x52, 0x49, 0x46, 0x46] }
} as const;

export function detectImageType(buffer: Buffer) {
	return Object.values(AVATAR_TYPES).find((t) => t.magic.every((byte, i) => buffer[i] === byte));
}
