<script lang="ts">
	import { SpinningLoader } from 'components';
	import { enhance } from '$app/forms';
	import { globalStore } from 'store';
	import { Button, Spinner } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';
	import type { createDisclosure } from 'svelte-headlessui';
	import type { customEnhanceHandler } from 'utils';

	interface Props {
		children?: Snippet<[]>;
		heading: string;
		disclosure: ReturnType<typeof createDisclosure>;
		action: string;
		handler: ReturnType<typeof customEnhanceHandler>;
		feedback?: string;
		cta?: string;
		updating: boolean;
		sessionDestroyed?: boolean;
	}

	let {
		children,
		heading,
		disclosure,
		action,
		handler,
		feedback,
		cta = 'Change',
		updating,
		sessionDestroyed = false
	}: Props = $props();
	const buttonStyles =
		'md:no-underline md:border-transparent md:border transition-colors rounded-md md:p-2';
</script>

<div
	class={[
		'rounded-sm border border-transparent transition-all md:rounded-md',
		$disclosure.expanded && 'border-gray-400 p-2 dark:border-light'
	]}
>
	<button
		class={[buttonStyles, !$disclosure.expanded && 'underline md:border md:border-white']}
		use:disclosure.button
	>
		{heading}
	</button>

	{#if $disclosure.expanded}
		<form
			enctype={action === '?/changeAvatar'
				? 'multipart/form-data'
				: 'application/x-www-form-urlencoded'}
			use:disclosure.panel
			class="col gap-2 p-2"
			use:enhance={handler}
			{action}
			method="POST"
		>
			<div class="col gap-2">
				{@render children?.()}
			</div>
			<!-- find user by username on server -->
			<input type="hidden" bind:value={globalStore.user!.username} name="username" />
			<Button
				color={['?/logout', '?/deleteAccount'].includes(action) ? 'red' : 'alternative'}
				class="self-start py-1 px-2 disabled:opacity-50"
				disabled={updating || sessionDestroyed}
				type="submit"
			>
				{#if updating}
					<SpinningLoader size="8" />
				{/if}
				{cta}
			</Button>
			{#if feedback}
				<p class="text-sm italic">{feedback}</p>
			{/if}
		</form>
	{/if}
</div>

