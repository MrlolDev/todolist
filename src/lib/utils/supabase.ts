import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
import dotenv from 'dotenv';
dotenv.config();
const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = process.env;
let supabase = null;

if (PUBLIC_SUPABASE_URL && PUBLIC_SUPABASE_ANON_KEY) {
	supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
}

export { supabase };
