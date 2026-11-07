<script lang="ts">
        import { store } from './store.svelte';
	import { fade, fly } from 'svelte/transition';
	import ShoppingCart from './ShoppingCart.svelte';
	import { Button } from 'flowbite-svelte';
	import { CloseOutline } from 'flowbite-svelte-icons';
</script>

{#if store.showSidebar}
	<div
		transition:fade={{ duration: 200 }}
		class="absolute z-[100] h-dvh w-dvw top-0 left-0 bg-black bg-opacity-90"
		aria-hidden="true"
	></div>
	<div class="size-full z-[101] relative">
		<div
			in:fly={{ x: -100, duration: 300, delay: 200 }}
			out:fly={{ x: -100, duration: 300, delay: 0 }}
			id="sidebar"
			aria-label="Items in shopping cart"
			aria-labelledby="sidebarButton"
			aria-hidden={!store.showSidebar}
			class="left-0 top-0 fixed bg-white flex flex-col h-screen w-72 md:w-96"
		>
			<div class="flex justify-between border-b-2 p-2 bg-secondary border-secondary-dark">
				<strong>Shopping Cart</strong>

				<Button
					aria-label="Hide shopping cart items"
					class="flex gap-2 items-center transition-colors text-white hover:text-secondary-dark"
					onclick={() => (store.showSidebar = false)}
				>
					Close
					<CloseOutline width={20} />
				</Button>
			</div>

			<ShoppingCart />
		</div>
	</div>
{/if}

