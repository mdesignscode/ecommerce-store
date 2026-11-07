import type { TProductState } from "store";

type TProductKeys = keyof Omit<TProductState['Product'], 'id' | 'priceId'>;

type TProductEdit = {
        title?: { text: string; editing: boolean };
        description?: { text: string; editing: boolean };
        category?: { text: string; editing: boolean };
        rating?: { text: number; editing: boolean };
        discountPercentage?: { text: null; editing: boolean };
        stock?: { text: number; editing: boolean };
        Images?: Record<string, { text: string; editing: boolean }>;
        Price?: { text: number; editing: boolean };
};

type TEditProduct = {
        editState: TProductEdit;
        activeInput: string;
        product: TProductState['Product'] | null;
        categories: string[] | undefined;
        formState: { error: string, loading: boolean };
}

export let editProductStore = $state<TEditProduct>({
        editState: {},
        activeInput: "",
        product: null,
        categories: undefined,
        formState: { error: '', loading: false },
});

export type {
        TEditProduct,
        TProductKeys,
}

