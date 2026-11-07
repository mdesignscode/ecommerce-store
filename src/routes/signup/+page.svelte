<script lang="ts">
	import { enhance } from '$app/forms';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import FormMessage from '$lib/components/FormMessage.svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import { newFormState, submit } from '$lib/forms';

	const form = $state(newFormState());
</script>

<svelte:head><title>Create an account · Common Goods</title></svelte:head>

<section class="container-page grid place-items-center py-16 sm:py-24">
	<div class="w-full max-w-sm">
		<h1 class="text-4xl">Create an account</h1>
		<p class="mt-2 text-muted">Save favourites, keep a cart, and check out faster.</p>

		<form method="POST" use:enhance={submit(form, { reset: false })} class="mt-8 grid gap-5">
			<div class="field">
				<label for="username">Display name</label>
				<input
					id="username"
					name="username"
					autocomplete="nickname"
					required
					minlength="2"
					class="input"
				/>
			</div>
			<div class="field">
				<label for="email">Email</label>
				<input id="email" name="email" type="email" autocomplete="email" required class="input" />
			</div>
			<PasswordInput name="password" label="Password" autocomplete="new-password" minlength={8} />
			<FormMessage {form} />
			<button class="btn-primary py-3 text-base" disabled={form.pending}>
				{#if form.pending}<LoaderCircle class="size-4 animate-spin" />{/if}
				Create account
			</button>
		</form>

		<p class="mt-6 text-center text-sm text-muted">
			Already have an account? <a
				href="/sign-in"
				class="font-semibold text-ink underline underline-offset-4">Sign in</a
			>
		</p>
	</div>
</section>
