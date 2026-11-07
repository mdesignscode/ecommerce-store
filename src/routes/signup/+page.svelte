<script lang="ts">
	import { AuthForm, PasswordInput } from 'components';
	import { globalStore } from 'store';
	import { goto } from '$app/navigation';
	import { customEnhanceHandler } from 'utils';
	import type { ActionData } from './$types';
	import type { TSignupSuccess } from './+page.server';

	let email = $state('');
	let username = $state('');
	let password = $state('');
	let showPassword = $state(false);

	let formState = $state({ error: '', loading: false });

	const handleSignup = customEnhanceHandler<ActionData, TSignupSuccess>((data) => {
		globalStore.user = data.user;
		formState.loading = false;
		goto(data.redirectTo);
	}, formState);
</script>

<AuthForm {formState} handler={handleSignup} route="/signup">
	<input type="text" bind:value={username} name="username" placeholder="Username" required />
	<input type="email" bind:value={email} name="email" placeholder="Email" required />
	<PasswordInput
		label="Create password"
		name="password"
		placeholder="Password"
		show={showPassword}
		value={password}
	/>
</AuthForm>

