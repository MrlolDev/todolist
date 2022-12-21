<script lang="ts">
	import type TaskInterface from '$lib/interfaces/Task.interface';
	import CreateTask from './CreateTask.svelte';
	export let sectionName: string;
	export let tasks: TaskInterface[];
	import Task from './Task.svelte';
	let createTaskP = false;
</script>

<div class="flex flex-col gap-2 items-start w-[20vw] select-none">
	<header class="flex flex-row justify-between items-center w-full">
		<div class="flex flex-row items-end">
			<p
				class="cursor-pointer bg-gray-800 px-2 py-1 text-sm w-fit rounded text-gray-200 hover:text-white hover:bg-gray-600 transition duration-300"
			>
				{sectionName}
			</p>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="px-2 py-1 bg-none hover:bg-gray-600/[.3] transition duration-300 cursor-pointer w-fit h-fit rounded"
			on:click={() => {
				if (createTaskP) {
					createTaskP = false;
				} else {
					createTaskP = true;
				}
			}}
		>
			<i class="fa-solid fa-plus items-center flex flex-row text-xs" />
		</div>
	</header>
	<ul class="list-none flex flex-col items-start w-full gap-2">
		{#if createTaskP}
			<CreateTask close={() => (createTaskP = false)} {sectionName} />
		{/if}
		{#each tasks as task}
			<Task {task} />
		{/each}
	</ul>
</div>
