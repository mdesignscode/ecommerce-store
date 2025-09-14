<script lang="ts">
	import { Popover, Button, Avatar } from 'flowbite-svelte';
	import { globalStore } from 'store';

	const defaultAvatar = '/images/icons8-user-64.png';
</script>

<Button class="text-dark">
	{#if globalStore.user}
		<Avatar href="/settings" src={globalStore.user.avatar} alt={`${globalStore.user.username}`} />
	{:else}
		<Avatar href="/sign-in" src={defaultAvatar} alt="User unavailable" />
	{/if}
</Button>

<Popover class="w-64 text-sm font-light border-gray-600 bg-gray-800 text-gray-400">
	{#if globalStore.user}
		foo
	{:else}
                <p class="text-center">Sign in to view profile</p>
	{/if}
</Popover>

