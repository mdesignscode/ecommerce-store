<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ui } from '$lib/shop.svelte';
</script>

<div
	class="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
	aria-live="polite"
>
	{#if ui.toast}
		{#key ui.toast.id}
			<p
				transition:fly={{ y: 16, duration: 200 }}
				class={[
					'rounded-full px-5 py-3 text-sm font-medium shadow-lg',
					ui.toast.tone === 'error' ? 'bg-danger text-white' : 'bg-ink text-paper'
				]}
			>
				{ui.toast.text}
			</p>
		{/key}
	{/if}
</div>
