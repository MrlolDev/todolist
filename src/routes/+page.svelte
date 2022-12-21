<script>
	import { page } from '$app/stores';
	// @ts-ignore
	import PrimaryBtn from '$lib/components/Buttons/Primary.svelte';
	import Navbar from '$lib/components/Navbar/index.svelte';
</script>

<svelte:head>
	<title>Todo</title>
	<meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>

<main class="flex flex-col items-center">
	<h1 class="text-4xl font-bold">Todo list</h1>
	{#if !$page.data.session}
		<PrimaryBtn />
	{/if}
</main>
