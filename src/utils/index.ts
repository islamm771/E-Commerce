import { ICartItem, IProduct } from "../interface";

export function shuffleArray(array: IProduct[]): IProduct[] {
  // Clone the array to avoid mutating the original one
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0, 4);
}


export const calculatePrice = (price: number, discount: number) => {
  const discountedPrice = price - (price * discount / 100);
  return Math.round(discountedPrice);
}



export const cartSubTotal = (cart: ICartItem[]) => {
  return cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
};



export const mapCartItem = (item: {
  quantity: number;
  product: {
    id: number;
    title: string;
    image: string;
    price: number;
    stock: number;
  };
}) => ({
  id: item.product.id,
  title: item.product.title,
  image: item.product.image,
  price: item.product.price,
  stock: item.product.stock,
  quantity: item.quantity,
});


