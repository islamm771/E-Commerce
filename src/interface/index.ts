export interface ILoginForm {
    name: "email" | "password",
    type: string,
    placeholder: string,
}

export interface IRegisterForm {
    name: "email" | "password" | "username",
    type: string,
    placeholder: string,
}


export interface IReview {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface IDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface IMeta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    image: string;
    thumbnails: string[];
    // tags: string[];
    //sku: string;
    //weight: number;
    //dimensions: IDimensions;
    //warrantyInformation: string;
    //shippingInformation: string;
    //availabilityStatus: string;
    //reviews: IReview[];
    //returnPolicy: string;
    //minimumOrderQuantity: number;
    //meta: IMeta;
}

export type ICartItem = Pick<IProduct, "id" | "title" | "price" | "image" | "stock"> & {
    quantity: number,
}

export interface IProductsResponse {
    data: {
        products: IProduct[],
        // total: number,
        // skip: number,
        // limit: number
    },
    message: string
}

export interface IProductResponse {
    data: {
        product: IProduct,
        // total: number,
        // skip: number,
        // limit: number
    },
    message: string
}

export interface ICartResponse {
    data: {
        cart: ICartItem[],
    },
    message: string
}


export interface IAddProduct {
    title: string,
    price: number,
    description: string,
    category: string,
    count: number
}

export interface IProductForm {
    name: "title" | "description" | "price" | "count",
    type: string,
    placeholder: string,
}

export interface ICategory {
    id: number,
    name: string,
    slug: string
}

export interface IBrand {
    id: number;
    name: string;
    slug: string;
}

export type IUserdata = { token: string; user: IUser } | null


export interface IUser {
    id: number;
    username: string
    email: string,
    password: string,
    gender: string,
    firstName: string,
    lastName: string,
    image: string,
    address: string,
}


export interface ILoggedUser {
    id: string,
    username: string,
    email: string,
}



export interface IProfileForm {
    firstName: string;
    lastName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    address: string;
}

export interface IOrderItem {
    id: number;
    orderId: number;
    productId: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

export interface IOrder {
    id: number;
    userId: number;
    total: number;
    status: string;
    address: string;
    items: IOrderItem[];
    createdAt: string;
    updatedAt: string;
}

export interface IOrderResponse {
    data: {
        order: IOrder,
    },
    message: string
}

export interface IOrdersResponse {
    data: {
        orders: IOrder[],
    },
    message: string
}