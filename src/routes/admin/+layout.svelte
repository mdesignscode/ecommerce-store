<script lang="ts">
	import type { TUserAttributes } from 'models';
	import { Navbar } from './components';
	import './globals.css';
	import type { Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import { globalStore } from 'store';

	interface Props {
		children: Snippet<[]> | undefined;
		data: {
			user: TUserAttributes;
		};
	}

	let { children, data }: Props = $props();
	const { user } = data;

	if (user.role !== 'admin') goto('/sign-in');
	if (!globalStore.user) globalStore.user = user;
</script>

<div class="overflow-hidden h-screen flex flex-col">
	<Navbar />
	{@render children?.()}
</div>

