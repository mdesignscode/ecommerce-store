import type { TImageAttributes, TPriceAttributes, TProductAttributes, TProductStateAttributes, TUserAttributes } from "models"

export type TProductState = TProductStateAttributes
        & {
                Product: TProductAttributes
                & { Images: TImageAttributes[] }
                & { Price: TPriceAttributes }
        };
type TProductStateList = TProductState[];

type TGlobalStore = {
        user: Omit<TUserAttributes, 'password'> | null;
        wishList: TProductStateList;
        history: TProductStateList;
        shoppingCart: TProductStateList;
        products: { [key: TProductAttributes['id']]: TProductState | undefined };
        addingToList: boolean;
}

export let globalStore: TGlobalStore = $state({
        user: null,
        wishList: [],
        shoppingCart: [],
        history: [],
        products: {},
        addingToList: false,
})

