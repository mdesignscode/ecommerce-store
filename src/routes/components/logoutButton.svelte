<script lang="ts">
	import { SettingForm } from 'components';
	import { goto } from '$app/navigation';
	import { globalStore } from 'store';
	import { createDisclosure } from 'svelte-headlessui';
	import { customEnhanceHandler } from 'utils';
	import type { ActionData } from '../settings/$types';

	const logout = createDisclosure({ expanded: false });
	let sessionDestroyed = $state(false);

	let formState = $state({ error: '', loading: false });

	const handleChangeUserInfo = customEnhanceHandler<ActionData, {}>(() => {
		globalStore.user = null;

		// keep session destroy buttons disabled
		sessionDestroyed = true;
		formState.loading = false;
		goto('/');
	}, formState);
</script>

<SettingForm
	heading="Log out"
	disclosure={logout}
	action="/settings?/logout"
	handler={handleChangeUserInfo}
	updating={formState.loading}
	cta="Confirm"
	{sessionDestroyed}
/>

