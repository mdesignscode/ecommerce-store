<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';
	import { editProductStore } from '.';

	let selected = $state('');
	let categories = $derived(editProductStore.categories?.map((c) => ({ name: c, value: c })));
</script>

<Label>
	{editProductStore.product?.category}
	<Select bind:value={selected} items={categories} />
</Label>

