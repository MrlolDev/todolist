import type { PageLoad } from '../$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/utils/supabase';

export const load: PageLoad = async (event) => {
	const { session } = await getSupabase(event);
	if (!session) {
		throw redirect(302, '/');
	}

	const { data: tasks, error } = await supabase
		.from('task')
		.select('*')
		.contains('persons', [session.user.id]);
	if (error) {
		console.log(error);
	}
	return {
		tasks: tasks
	};
};
