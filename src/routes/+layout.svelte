<script lang="ts">
	import { Navbar } from 'components';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { TUserAttributes } from 'models';
	import { globalStore, type TProductState } from 'store';
	import { updateUserLists } from 'utils';

	interface Props {
		children: Snippet<[]> | undefined;
		data: {
			user: TUserAttributes;
			userProducts: TProductState[];
		};
	}

	let { children, data }: Props = $props();
	const { userProducts, user } = data;

	if (user && !globalStore.user) {
		globalStore.user = user;
		updateUserLists(userProducts);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="col h-full">
	<main class="flex-1 overflow-y-auto">
		{@render children?.()}
	</main>

	<Navbar />
</div>
