<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import ShoppingCart from './ShoppingCart.svelte';
	import { Button } from 'flowbite-svelte';
	import { CloseOutline } from 'flowbite-svelte-icons';

	interface Props {
		showSidebar: { active: boolean };
	}
	let { showSidebar }: Props = $props();
</script>

{#if showSidebar.active}
	<div class="size-full z-50 relative">
		<div
			in:fade
			out:fade={{ delay: 250 }}
			class="absolute h-dvh w-dvw z-40 top-0 left-0 bg-dark bg-opacity-90"
			aria-hidden="true"
		></div>

		<div
			in:fly={{ x: -100, duration: 300, delay: 200 }}
			out:fly={{ x: -100, duration: 300, delay: 0 }}
			id="sidebar"
			aria-label="Items in shopping cart"
			aria-labelledby="sidebarButton"
			aria-hidden={!showSidebar.active}
			class="left-0 top-0 fixed z-50 bg-white flex flex-col h-screen w-72 md:w-96"
		>
			<div class="flex justify-between border-b-2 p-2 bg-secondary border-secondary-dark">
				<strong>Shopping Cart</strong>

				<Button
					aria-label="Hide shopping cart items"
					class="flex gap-2 items-center transition-colors text-white hover:text-secondary-dark"
					onclick={() => (showSidebar.active = false)}
				>
					Close
					<CloseOutline width={20} />
				</Button>
			</div>

			<ShoppingCart />
		</div>
	</div>
{/if}

