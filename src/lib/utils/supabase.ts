import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/private';
import 'dotenv/config';

declare let process: {
	env: {
		PUBLIC_SUPABASE_URL: string;
		PUBLIC_SUPABASE_ANON_KEY: string;
	};
};

export const supabase = createClient(
	process.env.PUBLIC_SUPABASE_URL,
	process.env.PUBLIC_SUPABASE_ANON_KEY
);
