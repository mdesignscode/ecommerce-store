import { TProduct } from "@/app/Components/ProductsGroup";

export interface IGetUser {
  id: string;
}

export class GetUserRequest extends Request {
  constructor(url: string, options?: RequestInit, customData?: IGetUser) {
    super(url, mergeOptions(customData, options));
  }
}

export interface IUpdateUserList {
  userId: string;
  product: TProduct;
  listId: number | undefined;
}

export class UpdateListRequest extends Request {
  constructor(url: string, options?: RequestInit, customData?: IUpdateUserList) {
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
