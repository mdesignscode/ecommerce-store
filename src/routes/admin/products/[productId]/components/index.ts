import { editProductStore } from './store.svelte';
import type { TEditProduct, TProductKeys } from './store.svelte';
import AddImage from './addImage.svelte';
import CategoriesSelect from './categoriesSelect.svelte';
import EditProduct from './editProduct.svelte';
import ImageInput from './imageInput.svelte';
import InputField from './inputField.svelte';
import NumberInput from './numberInput.svelte';
import ProductPage from './productPage.svelte';

export {
        editProductStore,
        CategoriesSelect,
        EditProduct,
        ImageInput,
        InputField,
        NumberInput,
        ProductPage,
        AddImage,
}
export type {
        TEditProduct,
        TProductKeys,
}

