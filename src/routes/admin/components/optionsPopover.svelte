<script lang="ts">
	import { Button, Modal, Popover } from 'flowbite-svelte';
	import { PenOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import { type TProductState } from 'store';
	import { SpinningLoader } from 'components';
	import { ThreeDotsIcon } from '.';
	import { customEnhanceHandler } from 'utils';
	import type { TRemoveProductSuccess } from 'admin/editProduct/+page.server';

	type ActionData =
		| {
				message?: undefined;
				product?: undefined;
				error: string;
		  }
		| {
				error?: undefined;
				product: TProductState['Product'] | null;
				message: string;
		  }
		| null;

	interface Props {
		product: TProductState['Product'];
		deleteStatus: {
			state: 'default' | 'deleting' | 'removed';
		};
	}

	const { product, deleteStatus }: Props = $props();

	let showModal = $state(false);
	let showPopover = $state(false);

	let formState = $state({ error: '', loading: false });

	const handleRemoveProduct = () =>
		customEnhanceHandler<ActionData, TRemoveProductSuccess>(
			() => {
				deleteStatus.state = 'removed';
			},
			formState,
			() => {
				deleteStatus.state = 'deleting';
			}
		);
</script>

{#if deleteStatus.state === 'deleting'}
	<SpinningLoader size="8" />
{:else}
	<div class="relative">
		<Button class="hover:text-secondary-dark" onclick={() => (showPopover = true)}>
			<ThreeDotsIcon />
		</Button>

		{#if showPopover}
			<Popover>
				<!-- <OverlayArrow> -->
				<!-- 	<svg width={12} height={12} viewBox="0 0 12 12"> -->
				<!-- 		<path d="M0 0 L6 6 L12 0" /> -->
				<!-- 	</svg> -->
				<!-- </OverlayArrow> -->

				<div>
					<div class="flex-col gap-2 flex">
						<a class="flex gap-4" href={`/admin/products/${product?.id}`}>
							<PenOutline class="size-8" />
							Edit
						</a>

						<div>
							<Button onclick={() => (showModal = true)} class="flex gap-4 text-red-600">
								<TrashBinOutline class="size-6" />
								Delete
							</Button>

							<Modal bind:open={showModal} form title={`Confirm ${product?.title} delete`}>
								<!-- <form class="p-4 flex flex-col gap-4 text-center items-center"> -->
								<Button class="border-2 text-red-600 border-red-600 p-2 md;text-lg rounded-lg">
									Delete
								</Button>

								<Button
									onclick={() => (showModal = false)}
									class="border-2 text-gray-400 border-gray-400 p-2 md:text-lg rounded-lg"
								>
									Cancel
								</Button>
								<!-- </form> -->
							</Modal>
						</div>
					</div>
				</div>
			</Popover>
		{/if}
	</div>
{/if}

