<script lang="ts">
	import '../styles/app.scss';
	import Loading from '$lib/components/Loading.svelte';
	import { supabase } from '$lib/utils/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	let loading = true;
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		loading = false;
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

{#if loading} <Loading /> {:else} <slot />{/if}
