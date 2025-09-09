<script lang="ts">
	import { Skeleton } from 'flowbite-svelte';
</script>

<div class="p-4">
	<Skeleton size="md" class="mx-auto" />
	<div class="py-4 md:flex w-full">
		<section class="flex flex-col gap-6 md:w-2/3">
			<section class="flex overflow-x-auto gap-4">
				{#each Array.from({ length: 2 }) as _}
					<div class="flex-none rounded-lg gap-2 w-60 flex flex-col p-4 border-2 border-dark">
						<Skeleton class="rounded-lg" size="md" />
						<Skeleton size="md" class="mx-auto" />
						<Skeleton size="md" class="mx-auto" />

						<section class="flex justify-between items-center">
							<Skeleton class="rounded-lg" />

							<Skeleton size="md" />

							<Skeleton size="md" class="rounded-lg" />
						</section>

						<Skeleton class="rounded-lg" size="md" />
					</div>
				{/each}
			</section>

			<Skeleton class="rounded-lg" size="sm" />
		</section>

		<div class="hidden text-center m-auto md:grid place-items-center">
			<Skeleton size="md" class="rounded-lg" />
			<Skeleton size="md" class="mx-auto" />
		</div>
	</div>
</div>

