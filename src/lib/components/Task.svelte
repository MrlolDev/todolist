<script lang="ts">
	import type TaskInterface from '$lib/interfaces/Task.interface';
	export let task: TaskInterface;
	import { supabase } from '$lib/utils/supabase';
	let editMode = false;
	async function updateTask() {
		var title = (<HTMLInputElement>document.getElementById('title-update-input')).value;
		var description = (<HTMLInputElement>document.getElementById('description-update-input')).value;
		if (title == '') title = task.title;
		if (description == '') description = task.description;
		const { data: selectData, error: selectError } = await supabase
			.from('task')
			.select()
			.eq('id', task.id);

		console.log('selectData', selectData); // make sure you get the row at which you would like to update here

		const { data, error } = await supabase
			.from('task')
			.update({
				title: title,
				description: description
			})
			.eq('id', task.id);
		task.title = title;
		task.description = description;
		if (error) {
			alert(`Something went wrong:\n${error.message}`);
			return;
		}
		editMode = false;
	}
	async function updateStatus(movement: string) {
		var newStatus = 'doing';
		switch (task.status) {
			case 'to do':
				if (movement == 'right') {
				} else {
					newStatus = 'error';
				}
				break;
			case 'doing':
				if (movement == 'right') {
					newStatus = 'done';
				} else {
					newStatus = 'to do';
				}
				break;
			case 'doing':
				if (movement == 'right') {
					newStatus = 'error';
				} else {
					newStatus = 'doing';
				}
		}
		const { data, error } = await supabase
			.from('task')
			.update({ status: newStatus })
			.eq('id', task.id);

		if (error) {
			alert(`Something went wrong:\n${error.message}`);
			return;
		}
		window.location.reload();
	}
</script>

<li
	class="cursor-move flex flex-col bg-neutral-800 hover:bg-neutral-700 transition duration-300 px-2 py-2 w-full rounded select-none"
	draggable="true"
>
	<header class="flex flex-row justify-between ">
		{#if editMode}
			<input
				id="title-update-input"
				class="text-base font-bold bg-neutral-600 border border-neutral-900 focus:border-blue-500 w-1/2 rounded outline-none p-1"
				placeholder={task.title}
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="px-2 py-1 bg-none bg-neutral-900 text-gray-300 hover:text-white hover:bg-neutral-800 transition duration-300 cursor-pointer w-fit h-fit rounded"
				on:click={() => (editMode = false)}
			>
				<i class="fa-solid fa-xmark items-center flex flex-row text-xs" />
			</div>
		{:else}
			<p class="text-lg font-bold">{task.title}</p>
			<div class="flex flex-row gap-2">
				{#if task.status != 'to do'}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="px-2 py-1 bg-none bg-neutral-900 text-gray-300 hover:text-white hover:bg-neutral-800 transition duration-300 cursor-pointer w-fit h-fit rounded"
						on:click={() => updateStatus('left')}
					>
						<i class="fa-solid fa-arrow-left items-center flex flex-row text-xs" />
					</div>
				{/if}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="px-2 py-1 bg-none bg-neutral-900 text-gray-300 hover:text-white hover:bg-neutral-800 transition duration-300 cursor-pointer w-fit h-fit rounded"
					on:click={() => (editMode = true)}
				>
					<i class="fa-solid fa-pencil items-center flex flex-row text-xs" />
				</div>
				{#if task.status != 'done'}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="px-2 py-1 bg-none bg-neutral-900 text-gray-300 hover:text-white hover:bg-neutral-800 transition duration-300 cursor-pointer w-fit h-fit rounded"
						on:click={() => updateStatus('right')}
					>
						<i class="fa-solid fa-arrow-right items-center flex flex-row text-xs" />
					</div>
				{/if}
			</div>
		{/if}
	</header>
	{#if editMode}
		<textarea
			class="text-sm mt-2 text-gray-300 bg-neutral-600 rounded border border-neutral-900 focus:border-blue-500 outline-none px-2 py-1 resize-none h-[12vh] w-[18vw]"
			placeholder={task.description}
			id="description-update-input"
		/>
		<button
			class="px-4 py-1 mt-2 bg-blue-600 rounded transition duration-300 hover:bg-blue-500"
			on:click={() => updateTask()}>Update Task</button
		>
	{:else}
		<p class="text-sm text-gray-300">{task.description}</p>
	{/if}
</li>
