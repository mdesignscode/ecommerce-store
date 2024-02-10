import { TProduct } from "@/app/Components/ProductsGroup";

export interface IGetUser {
  id: string;
}

export class GetUserRequest extends Request {
  constructor(url: string, options?: RequestInit, customData?: IGetUser) {
    super(url, mergeOptions(customData, options));
  }
}

export interface IGetUserList {
  listId: number;
}

export class GetUserListRequest extends Request {
  constructor(url: string, options?: RequestInit, customData?: IGetUserList) {
    super(url, mergeOptions(customData, options));
  }
}

export interface IDeleteImage {
  imageId: number;
  imagePath: string
}

export class DeleteImage extends Request {
  constructor(url: string, options?: RequestInit, customData?: IDeleteImage) {
    super(url, mergeOptions(customData, options));
  }
}

export interface IDeleteProduct {
  product: TProduct;
}

export class DeleteProduct extends Request {
  constructor(url: string, options?: RequestInit, customData?: IDeleteProduct) {
    super(url, mergeOptions(customData, options));
  }
}

export interface IUpdateUserList {
  userId: string;
  product: TProduct;
  listId: number | undefined;
}

export class UpdateUserListRequest extends Request {
  constructor(url: string, options?: RequestInit, customData?: IUpdateUserList) {
    super(url, mergeOptions(customData, options));
  }
}

export interface ICheckOutProduct {
  price: string;
  quantity: number;
}

export interface ICreateCheckoutSession {
  checkOutProducts: ICheckOutProduct[], userCheckoutId: string,
  userId: string
}

export interface ICheckOutProduct {
  price: string;
  quantity: number;
}

export interface ICreateCheckoutSession {
  checkOutProducts: ICheckOutProduct[], userCheckoutId: string
}

export class CreateCheckOutSessionRequest extends Request {
  constructor(url: string, options?: RequestInit, customData?: ICreateCheckoutSession) {
    super(url, mergeOptions(customData, options));
  }
}

export interface ICreateCheckoutUser {
  email: string
  userId: string;
}

export class CreateCheckOutUserRequest extends Request {
  constructor(url: string, options?: RequestInit, customData?: ICreateCheckoutUser) {
    super(url, mergeOptions(customData, options));
  }
}

function mergeOptions<RequestType>(customData: RequestType, options?: RequestInit) {
  // Serialize your custom data and add it to the request body
  const customBody = JSON.stringify(customData);

  // Merge the custom options with the provided options
  return {
    ...options,
    method: options?.method || 'POST',
    body: customBody,
  };
}
