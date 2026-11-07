<script lang="ts">
	import { AuthForm, PasswordInput } from 'components';
	import { globalStore } from 'store';
	import { goto } from '$app/navigation';
	import type { TLoginSuccess } from './+page.server';
	import type { ActionData } from './$types';
	import { customEnhanceHandler, updateUserLists } from 'utils';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);

	let formState = $state({ error: '', loading: false });

	const handleLogin = customEnhanceHandler<ActionData, TLoginSuccess>((data) => {
		globalStore.user = data.user;
                updateUserLists(data.userProducts);
		formState.loading = false;

		goto('/');
	}, formState);
</script>

<AuthForm {formState} handler={handleLogin} route="/login">
	<input type="email" bind:value={email} name="email" placeholder="Email" required />
	<PasswordInput
		label="Enter password"
		name="password"
		placeholder="Password"
		show={showPassword}
		value={password}
	/>
</AuthForm>

