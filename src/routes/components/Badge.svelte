<script lang="ts">
	import { Button, Tooltip, type ButtonProps } from 'flowbite-svelte';
	import { globalStore } from 'store';
	import type { Snippet } from 'svelte';

	type Props = {
		indicator: string | number;
		children: Snippet<[]> | undefined;
		tooltipLabel?: string;
	} & ButtonProps;
	let { children, indicator, tooltipLabel, ...rest }: Props = $props();
</script>

<Button {...rest} class={['relative', rest.class]}>
	{#if globalStore.user}
		<span
			role="presentation"
			class="absolute -top-4 right-0 bg-blue-400 text-light rounded-full px-2 py-1 text-xs"
			>{indicator}</span
		>
	{/if}
	{@render children?.()}
</Button>
{#if tooltipLabel}
	<Tooltip>{tooltipLabel}</Tooltip>
{/if}

