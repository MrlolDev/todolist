<script lang="ts">
	import type TaskInterface from '$lib/interfaces/Task.interface';
	export let reloadTasks: () => Promise<void>;
	import { supabase } from '$lib/utils/supabase';
	import { page } from '$app/stores';
	export let close: () => void;
	export let sectionName: string;
	let tags: string[];

	async function createTask() {
		var title = (<HTMLInputElement>document.getElementById('title-input')).value;
		var description = (<HTMLInputElement>document.getElementById('description-input')).value;
		if (title == '') {
			alert('Please write at least a title');
			return;
		}
		const { data, error } = await supabase.from('task').insert([
			{
				title: title,
				description: description,
				status: sectionName.toLowerCase(),
				persons: [$page.data.session.user.id]
			}
		]);
		if (error) {
			alert(`Something went wrong:\n${error.message}`);
			return;
		}
		close();
		reloadTasks();
	}
</script>

<li
	class="cursor-pointer flex flex-col gap-2 bg-neutral-800  transition duration-300 px-2 py-2  rounded w-[20vw]"
>
	<header class="flex flex-row justify-between items-center">
		<input
			id="title-input"
			class="text-base font-bold bg-neutral-600 border border-neutral-900 focus:border-blue-500 w-[80%] rounded outline-none p-1"
			placeholder="Title"
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="px-2 py-1 bg-none bg-neutral-900 text-gray-300 hover:text-white hover:bg-neutral-700 transition duration-300 cursor-pointer w-fit h-fit rounded"
			on:click={() => close()}
		>
			<i class="fa-solid fa-xmark items-center flex flex-row text-xs" />
		</div>
	</header>
	<textarea
		class="text-sm text-gray-300 bg-neutral-600 rounded border border-neutral-900 focus:border-blue-500 outline-none px-2 py-1 resize-none h-[12vh] w-[90%]"
		placeholder="Description"
		id="description-input"
	/>
	<div class="flex flex-col items-start gap-2">
		<ul class="flex flex-row items-center gap-1" />
	</div>
	<button
		class="px-4 py-1 bg-blue-600 rounded transition duration-300 hover:bg-blue-500"
		on:click={() => createTask()}>Create Task</button
	>
</li>
