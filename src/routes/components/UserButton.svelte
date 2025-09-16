<script lang="ts">
	import { LogoutButton } from 'components';
	import { Popover, Button, Avatar } from 'flowbite-svelte';
	import { globalStore } from 'store';

	const defaultAvatar = '/images/icons8-user-64.png';
</script>

<Button class="text-dark size-12 md:size-16">
	{#if globalStore.user}
		<Avatar src={globalStore.user.avatar} alt={`${globalStore.user.username}`} />
	{:else}
		<Avatar src={defaultAvatar} alt="User unavailable" />
	{/if}
</Button>

<Popover class="text-sm font-light border-gray-600 bg-gray-800 text-gray-400 px-4 py-2">
	{#if globalStore.user}
		<div class="col gap-3 text-center items-center">
			<p class="text-lg mb-2">{globalStore.user.username}</p>

			<LogoutButton />
			<a class="border rounded-sm p-1" href="/settings">Settings</a>
                        <a class="border rounded-sm p-1" href="/">Home</a>
		</div>
	{:else}
		<p class="text-center">Sign in to view profile</p>
		<a class="border rounded-sm p-1" href="/">Home</a>
	{/if}
</Popover>

