import type {
	TImageAttributes,
	TPriceAttributes,
	TProductAttributes,
	TProductStateAttributes,
	TUserAttributes
} from 'models';

export type TProduct = TProductAttributes & {
	Images: TImageAttributes[];
	Price: TPriceAttributes;
};

export type TProductState = TProductStateAttributes & { Product: TProduct };

export type TPublicUser = Omit<TUserAttributes, 'password'>;
