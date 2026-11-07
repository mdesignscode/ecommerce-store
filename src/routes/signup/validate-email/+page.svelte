<script lang="ts">
	import { enhance } from '$app/forms';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import FormMessage from '$lib/components/FormMessage.svelte';
	import { newFormState, submit } from '$lib/forms';

	let { data } = $props();
	const verify = $state(newFormState());
	const resend = $state(newFormState());
	const change = $state(newFormState());
</script>

<svelte:head><title>Verify your email · Common Goods</title></svelte:head>

<section class="container-page grid place-items-center py-16 sm:py-24">
	<div class="w-full max-w-sm">
		<h1 class="text-4xl">Check your inbox</h1>
		<p class="mt-2 text-muted">
			We sent a 6-digit code to <strong class="text-ink">{data.email}</strong>. It expires in 10
			minutes.
		</p>

		<form method="POST" action="?/verifyCode" use:enhance={submit(verify)} class="mt-8 grid gap-4">
			<div class="field">
				<label for="code">Verification code</label>
				<input
					id="code"
					name="code"
					required
					inputmode="numeric"
					autocomplete="one-time-code"
					pattern="\d{6}"
					maxlength="6"
					class="input text-center font-mono text-2xl tracking-[0.5em]"
				/>
			</div>
			<FormMessage form={verify} />
			<button class="btn-primary py-3 text-base" disabled={verify.pending}>
				{#if verify.pending}<LoaderCircle class="size-4 animate-spin" />{/if}
				Verify email
			</button>
		</form>

		<div class="mt-8 space-y-4 border-t border-line pt-6 text-sm">
			<form method="POST" action="?/resendCode" use:enhance={submit(resend)} class="space-y-3">
				<p class="text-muted">
					Didn’t get it?
					<button
						class="font-semibold text-ink underline underline-offset-4"
						disabled={resend.pending}
					>
						{resend.pending ? 'Sending…' : 'Send a new code'}
					</button>
				</p>
				<FormMessage form={resend} />
			</form>

			<details class="group">
				<summary class="cursor-pointer text-muted marker:text-line">Wrong email address?</summary>
				<form
					method="POST"
					action="?/changeEmail"
					use:enhance={submit(change)}
					class="mt-3 grid gap-3"
				>
					<label for="newEmail" class="sr-only">New email</label>
					<div class="flex gap-2">
						<input
							id="newEmail"
							name="newEmail"
							type="email"
							required
							placeholder="you@example.com"
							class="input"
						/>
						<button class="btn-outline" disabled={change.pending}>Update</button>
					</div>
					<FormMessage form={change} />
				</form>
			</details>
		</div>
	</div>
</section>
