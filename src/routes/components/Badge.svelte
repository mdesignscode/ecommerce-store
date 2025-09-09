<script lang="ts">
	import { Button, type ButtonProps } from 'flowbite-svelte';
	import { globalStore } from 'store';
	import type { Snippet } from 'svelte';

	type Props = {
		indicator: string | number;
		children: Snippet<[]> | undefined;
	} & ButtonProps;
	let { children, indicator, ...rest }: Props = $props();
</script>

<Button {...rest} class={['relative', rest.class]}>
	{#if globalStore.user}
		<span
			role="presentation"
			class="absolute -top-2 right-0 bg-blue-400 text-light rounded-full px-2 py-1 text-sm"
			>{indicator}</span
		>
	{/if}
	{@render children?.()}
</Button>
