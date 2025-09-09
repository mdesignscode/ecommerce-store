<script lang="ts">
        import { Navbar } from 'components';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col h-full">
	<Navbar />
	<div class="flex-1 overflow-y-auto flex flex-col">
		<div class="flex-1">{@render children?.()}</div>
		<!-- <Footer /> -->
	</div>
</div>

