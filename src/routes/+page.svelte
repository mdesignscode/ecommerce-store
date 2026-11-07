<script lang="ts">
	import { ProductsGroup } from 'components';
	import type { THomePageProducts } from './+page.server';
	interface Props {
		data: THomePageProducts;
	}
	const { data }: Props = $props();
	const { products, discountedProducts } = data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Ecommerce store home page" />
</svelte:head>

<main class="flex flex-col gap-4 relative">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="fixed top-0 left-0 -z-10">
		<path
			fill="#ccc5b9"
			fill-opacity="1"
			d="M0,256L48,229.3C96,203,192,149,288,122.7C384,96,480,96,576,112C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
		></path>
	</svg>

	<div class="space-y-4">
		<div class="col md:flex-row-reverse">
			<div class="md:w-1/2 p-[2%] md:flex-1 grid place-content-center">
				<img class="w-screen h-auto" src="/Ecommerce web page-pana.svg" alt="Hero" />
			</div>

			<div class="md:flex-1 py-2 px-8 md:p-10">
				<h1 class="text-lg font-bold mb-2">Welcome to our online store</h1>

				<p>
					Est sit est dignissimos. Aliquam nihil odit et voluptates. Quia id et consequatur animi
					expedita aut voluptas ratione. Mollitia doloribus id omnis voluptatem impedit. Numquam
					quia et a non autem. Quos rerum ut rerum exercitationem et.
				</p>
				<p class="hidden lg:block mt-2">
					Qui exercitationem a quisquam. Quibusdam voluptate qui id harum nisi inventore vero quo.
					Temporibus praesentium vel recusandae voluptas. Soluta occaecati perspiciatis doloremque
					nesciunt tenetur. Magnam consequatur perferendis dolore quaerat qui occaecati neque omnis.
					Mollitia voluptatem possimus. Numquam est minima. Et distinctio eaque consequatur beatae
					aperiam eaque non vero adipisci.
				</p>
			</div>
		</div>

		<div class="">
			<div class="px-4 md space-y-4">
				<ProductsGroup
					groupTitle="Browse our discounted products"
					groupUrl="discountedProducts"
					products={discountedProducts}
					category="discounted products"
				/>
				{#each products as { products: categoryProducts, category }}
					<ProductsGroup
						groupTitle={`Browse products in ${category}`}
						groupUrl={`${category}`}
						products={categoryProducts}
						category={`products in ${category}`}
					/>
				{/each}
			</div>
		</div>
	</div>
</main>

