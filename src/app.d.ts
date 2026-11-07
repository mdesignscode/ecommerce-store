import type { TUser } from 'models';
import type { TProductState, TPublicUser } from '$lib/types';

declare global {
	namespace App {
		interface Locals {
			user: TUser | undefined;
		}
		interface PageData {
			user?: TPublicUser;
			userProducts?: TProductState[];
		}
	}
}

export {};
