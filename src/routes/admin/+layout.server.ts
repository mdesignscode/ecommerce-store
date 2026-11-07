import { requireAdmin } from 'utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	requireAdmin(locals);
};
