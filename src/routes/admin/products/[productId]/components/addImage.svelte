<script lang="ts">
	import { SpinningLoader } from "components";
	import { Button } from "flowbite-svelte";
	import { PlusOutline } from "flowbite-svelte-icons";

interface Props {
  cb?: (filename: string) => Promise<void>;
}
const { cb }: Props = $props();
  let isFetching = $state(false);
  /*onSelect={async (e) => {
          let files = Array.from(e || []);

          setIsFetching(true)

          if (cb) {
            await cb(files[0].name);
            setIsFetching(false)
            return;
          }

          const productImageName = await addProductImage(
            files[0].name,
            product?.id || ""
          );

          const imagePath = "/products/" + productImageName;

          setEditState((state: any) => ({
            ...state,
            images: {
              ...state.images,
              [imagePath]: {
                text: imagePath,
                editing: false,
              },
            },
          }));
          setIsFetching(false);

          router.refresh();
        }}*/


</script>
      <div>
        <Button
          id="add-image"
          disabled={isFetching}
          class={["flex gap-4 items-center mx-auto my-2 mt-4 px-4 py-2 border-2 border-gray-600 text-gray-600 hover:text-gray-800 focus:outline-gray-800 hover:border-gray-800 transition-all rounded-lg hover:rounded-none focus:rounded-none", { "cursor-not-allowed": isFetching}]}
        >
          <span>Add image</span>
          {#if isFetching}
                  <SpinningLoader size="8" />
          {:else}
                  <PlusOutline class="size-8" />
          {/if}
        </Button>
      </div>

