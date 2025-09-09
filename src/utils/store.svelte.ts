import type { TImageAttributes, TPriceAttributes, TProductAttributes, TProductStateAttributes, TUserAttributes } from "models"

type TProduct = TProductAttributes & { Images: TImageAttributes[] } & { Price: TPriceAttributes };

type TGlobalStore = {
        user: TUserAttributes | null;
        products: Record<TProductAttributes['id'], TProductStateAttributes & TProduct>;
}

export let globalStore: TGlobalStore = $state({
        user: null,
        products: {},
})

