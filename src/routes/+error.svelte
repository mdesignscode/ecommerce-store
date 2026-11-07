<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head><title>{page.status} · Common Goods</title></svelte:head>

<section
	class="container-page grid min-h-[60dvh] place-content-center justify-items-center gap-4 py-24 text-center"
>
	<p class="eyebrow">Error {page.status}</p>
	<h1 class="text-5xl">
		{page.status === 404 ? 'We couldn’t find that page' : 'Something went wrong'}
	</h1>
	<p class="max-w-md text-muted">{page.error?.message}</p>
	<a href="/" class="btn-primary mt-2">Back to the shop</a>
</section>
