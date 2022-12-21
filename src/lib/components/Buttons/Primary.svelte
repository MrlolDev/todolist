<script lang="ts">
	import { supabase } from '$lib/utils/supabase';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: 'discord'
			});
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<button
	class="px-4 py-1 bg-blue-600 rounded transition duration-300 hover:bg-blue-500"
	on:click|preventDefault={handleLogin}>Log in</button
>
