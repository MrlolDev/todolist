<script>
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar/index.svelte';
	import TaskList from '$lib/components/TaskList.svelte';
</script>

<svelte:head>
	<title>Todo</title>
	<meta name="description" content="SvelteKit using supabase-js v2" />
</svelte:head>
<main class="p-2">
	<h1 class="text-2xl font-medium">Welcome, {$page.data.session.user.user_metadata.full_name}</h1>
	<section class="flex flex-row gap-4 items-start w-fit">
		<TaskList
			sectionName={'To do'}
			tasks={$page.data.tasks.filter((/** @type {{ status: string; }} */ t) => t.status == 'to do')}
		/>
		<TaskList
			sectionName={'Doing'}
			tasks={$page.data.tasks.filter((/** @type {{ status: string; }} */ t) => t.status == 'doing')}
		/>
		<TaskList
			sectionName={'Done'}
			tasks={$page.data.tasks.filter((/** @type {{ status: string; }} */ t) => t.status == 'done')}
		/>
	</section>
</main>
