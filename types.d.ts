type TProduct =
  | ({
    price: {
      id: string;
      amount: number;
    };
    images: {
      id: number;
      url: string;
      productId: string | null;
    }[];
  } & {
    id: string;
    title: string;
    description: string;
    category: string;
    rating: number;
    discountPercentage: number | null;
    stock: number;
    priceId: string;
  })
  | null;

type TProductEdit = {
  title: { text: string; editing: boolean };
  description: { text: string; editing: boolean };
  category: { text: string; editing: boolean };
  rating: { text: number; editing: boolean };
  discountPercentage: { text: null; editing: boolean };
  stock: { text: number; editing: boolean };
  images: Record<string, { text: string; editing: boolean }>;
  price: { text: number; editing: boolean };
};

type TUserList = TProduct[] | null

type TTextAttributes = "title" | "description" | "category"
type TNumberAttributes = "rating" | "discountPercentage" | "stock" | "price"

type TUser =
  | ({
    wishList:
    | ({
        products: {
          id: number;
          productId: string;
          shoppingCartId: number | null;
          wishListId: number | null;
        }[];
      } & {
        id: number;
      }) | null;

    shoppingCart:
    | ({
        products: {
          id: number;
          productId: string;
          shoppingCartId: number | null;
          wishListId: number | null;
        }[];
      } & {
        id: number;
      }) | null;

    purchaseHistory:
    | ({
        products: {
          id: number;
          createdAt: Date;
          quantity: number;
          productId: string;
          purchaseHistoryId: number | null;
        }[];
      } & {
        id: number;
      }) | null;
  } & {
    id: string;
    name: string;
    shoppingCartId: number | null;
    wishListId: number | null;
    purchaseHistoryId: number | null;
    checkoutId: string | null;
  })
  | null;

type TCheckoutProduct = {
  price: string;
  quantity: number;
}
