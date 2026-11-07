import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
        const { user } = locals;

        if (!user) throw redirect(302, '/sign-in');
        if (user.get('role') !== 'admin') throw redirect(302, '/sign-in');

        return { user: user.get({ plain: true }) };
}

