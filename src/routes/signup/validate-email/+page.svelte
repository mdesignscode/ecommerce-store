<script lang="ts">
	import { VerificationCodeInput, SpinningLoader } from 'components';
	import { createDisclosure } from 'svelte-headlessui';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { globalStore } from 'store';
	import { customEnhanceHandler } from 'utils';
	import type { ActionData } from './$types.js';
	import type {
		TChangeEmailSuccess,
		TEmailVerificationSuccess,
		TResendCodeSuccess
	} from './+page.server.js';
	import { Button } from 'flowbite-svelte';

	const changeEmail = createDisclosure({ expanded: false });

	let { data } = $props();

	type TRequestState = { loading: boolean; message: string; error: string };

	let email = $state(data.email);
	let newEmail = $state('');
	let updatingEmail: TRequestState = $state({ loading: false, message: '', error: '' });
	let resendingEmail: TRequestState = $state({ loading: false, message: '', error: '' });
	let verifyingEmail: TRequestState = $state({ loading: false, message: '', error: '' });
	let loading = $derived(
		[updatingEmail, resendingEmail, verifyingEmail].some(({ loading }) => loading)
	);

	type RequestSuccessMap = {
		verify: TEmailVerificationSuccess;
		change: TChangeEmailSuccess;
		resend: TResendCodeSuccess;
	};

	const handleUserAction = <K extends keyof RequestSuccessMap>(
		type: K,
		requestState: typeof updatingEmail
	) =>
		customEnhanceHandler<ActionData, RequestSuccessMap[K]>((data) => {
			globalStore.user = data.user;
			requestState.loading = false;

			if ('newEmail' in data) {
				// newEmail exists only on the change response
				email = data.newEmail;
				newEmail = '';
				changeEmail.close();
			} else if (type === 'resend') {
				requestState.error = '';
				verifyingEmail.error = '';
			}

			if ('redirectTo' in data && data.redirectTo) goto(data.redirectTo);
		}, requestState);
</script>

<div class="col mx-auto gap-4 p-8 md:w-3/6">
	<p>Enter the code sent to {email}</p>

	<div
		class="col gap-2 space-y-2 overflow-y-auto rounded-lg border-2 p-4 shadow-md dark:border-transparent dark:bg-neutral-500"
	>
		<form
			id="verification-form"
			action="?/verifyCode"
			class="col gap-2"
			use:enhance={handleUserAction('verify', verifyingEmail)}
			method="POST"
		>
			<VerificationCodeInput error={verifyingEmail.error} />
			<Button disabled={loading}>
				Send
				{#if verifyingEmail.loading}
					<SpinningLoader size="8" />
				{/if}
			</Button>

			{#if verifyingEmail.error}
				<p class="text-red-800">{verifyingEmail.error}</p>
			{/if}
		</form>

		<form
			id="verification-form"
			use:enhance={handleUserAction('resend', resendingEmail)}
			action="?/resendCode"
			method="POST"
		>
			{#if resendingEmail.loading}
				<div class="flex items-center gap-2">
					Requesting new code
					<SpinningLoader size="8" />
				</div>
			{:else}
				<button class="underline">Request new code</button>
			{/if}
		</form>

		<div class="col gap-3">
			<div class="flex gap-2 text-sm">
				<p>Didn't receive a code?</p>
				<button class={{ underline: !$changeEmail.expanded }} type="button" use:changeEmail.button
					>Change email</button
				>
			</div>

			{#if $changeEmail.expanded}
				<form
					use:changeEmail.panel
					class="flex flex-wrap gap-2"
					action="?/changeEmail"
					method="POST"
					use:enhance={handleUserAction('change', updatingEmail)}
				>
					<input
						class="rounded-md p-2 dark:text-dark"
						placeholder="New email"
						type="email"
						bind:value={newEmail}
						name="newEmail"
					/>
					<Button disabled={loading}>
						Change
						{#if updatingEmail.loading}
							<SpinningLoader size="8" />
						{/if}
					</Button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	@media (prefers-color-scheme: dark) {
		:global(#verification-form button:hover) {
			@apply border-dark text-dark;
		}
	}
</style>

