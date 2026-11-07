import { requireUser } from 'utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals, url }) => {
	requireUser(locals);
	return { justCheckedOut: url.searchParams.get('checkout') === 'success' };
};
