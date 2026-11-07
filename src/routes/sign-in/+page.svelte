<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import FormMessage from '$lib/components/FormMessage.svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import { newFormState, submit } from '$lib/forms';

	const form = $state(newFormState());
	const redirectTo = $derived(page.url.searchParams.get('redirectTo') ?? '');
</script>

<svelte:head><title>Sign in · Common Goods</title></svelte:head>

<section class="container-page grid place-items-center py-16 sm:py-24">
	<div class="w-full max-w-sm">
		<h1 class="text-4xl">Welcome back</h1>
		<p class="mt-2 text-muted">Sign in to see your cart, wishlist and orders.</p>

		<form method="POST" use:enhance={submit(form, { reset: false })} class="mt-8 grid gap-5">
			<input type="hidden" name="redirectTo" value={redirectTo} />
			<div class="field">
				<label for="email">Email</label>
				<input id="email" name="email" type="email" autocomplete="email" required class="input" />
			</div>
			<PasswordInput name="password" label="Password" autocomplete="current-password" />
			<FormMessage {form} />
			<button class="btn-primary py-3 text-base" disabled={form.pending}>
				{#if form.pending}<LoaderCircle class="size-4 animate-spin" />{/if}
				Sign in
			</button>
		</form>

		<p class="mt-6 text-center text-sm text-muted">
			New here? <a href="/signup" class="font-semibold text-ink underline underline-offset-4"
				>Create an account</a
			>
		</p>
	</div>
</section>
