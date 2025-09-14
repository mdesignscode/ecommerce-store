<script lang="ts" generics="TSuccess extends any, TFailure extends any">
	import { SpinningLoader } from 'components';
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	interface Props {
		formState: { error: string; loading: boolean };
		handler: SubmitFunction<TSuccess, TFailure>;
		children: Snippet<[]>;
		route: '/signup' | '/login';
	}

	let { children, route, handler, formState }: Props = $props();

	const routeOptions = $derived({
		'/signup': {
			head: 'Create an account to save your progress',
			footer: 'Already have an account?',
			alt: 'Sign in',
			altRoute: '/sign-in',
			cta: formState.loading ? 'Creating account' : 'Sign up'
		},
		'/login': {
			head: 'Welcome back',
			footer: "Don't have an account?",
			alt: 'Sign up',
			altRoute: '/signup',
			cta: formState.loading ? 'Signing in' : 'Sign in'
		}
	});
</script>

<div class="col gap-4 px-8 py-6 md:mx-auto md:w-4/6">
	<h1 class="text-lg">{routeOptions[route].head}</h1>
	<form
		id="auth-form"
		use:enhance={handler}
		method="POST"
		class="col gap-2 rounded-lg border-2 p-4 shadow-md border-transparent bg-secondary text-secondary-dark"
	>
		{@render children()}
		<button
			disabled={formState.loading}
			class="flex items-center justify-center gap-4 rounded-sm border border-transparent hover:border-secondary-dark bg-primary py-1 transition-all hover:bg-transparent disabled:opacity-60 text-light hover:text-secondary-dark"
		>
			{routeOptions[route].cta}

			{#if formState.loading}
				<SpinningLoader size="8" />
			{/if}
		</button>
		{#if formState.error}
			<p style="color:red">{formState.error}</p>
		{/if}
	</form>

	<p>
		{routeOptions[route].footer}{' '}
		<a class="underline text-primary" href={routeOptions[route].altRoute}
			>{routeOptions[route].alt}</a
		>
	</p>
</div>

<style>
	:global(#auth-form input) {
		@apply rounded-sm p-2 text-dark;
	}
</style>

