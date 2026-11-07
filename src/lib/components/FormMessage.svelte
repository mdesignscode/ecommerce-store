<script lang="ts">
	import type { FormState } from '$lib/forms';

	let { form }: { form: FormState } = $props();
</script>

<div aria-live="polite">
	{#if form.error}
		<p class="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-danger">{form.error}</p>
	{:else if form.message}
		<p class="rounded-xl bg-emerald-50 px-3.5 py-2.5 text-sm text-success">{form.message}</p>
	{/if}
</div>
