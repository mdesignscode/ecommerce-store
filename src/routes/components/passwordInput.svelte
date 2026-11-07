<script>
	import { EyeSolid, EyeSlashSolid } from 'flowbite-svelte-icons';

	let { show, value, name, placeholder, label } = $props();
</script>

<div class="relative w-full">
	<input
		required
		class="w-full rounded-sm px-2"
		style="padding-right: 40px !important;"
		type={show ? 'text' : 'password'}
		bind:value
		{name}
		{placeholder}
	/>
	<button
		type="button"
		class="absolute right-2 top-1/2 -translate-y-1/2"
		aria-label={label}
		onclick={() => (show = !show)}
	>
		{#if show}
			<EyeSlashSolid class="size-7" />
		{:else}
			<EyeSolid class="size-7" />
		{/if}
	</button>
</div>
