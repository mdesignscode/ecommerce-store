<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	type Props = { icon: Component<{ class?: string }>; title: string; children?: Snippet };
	let { icon: Icon, title, children }: Props = $props();
</script>

<div class="card flex flex-col items-center gap-3 px-6 py-16 text-center">
	<span class="grid size-14 place-items-center rounded-full bg-sand"><Icon class="size-6" /></span>
	<h2 class="text-2xl">{title}</h2>
	{#if children}
		<div class="max-w-sm text-muted">{@render children()}</div>
	{/if}
</div>
