import {StarIcon} from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter"
import {useRecoilState} from "recoil";
import basketItemsState from "../app/state";

type CheckoutProductProps = {
  product: Product
}

const CheckoutProduct: React.VFC<CheckoutProductProps> = ({ product }) => {
  const [basketItems, setBasketItem] = useRecoilState(basketItemsState);

  const addItemToBasket = () => {
    setBasketItem([...basketItems, product]);
  }

  const removeItemFromBasket = () => {
    const index = basketItems.findIndex(item => item.id === product.id);
    let newBasket = [...basketItems];
    if (index >= 0) {
      newBasket.splice(index, 1);
    } else {
      console.warn(`Can't remove product (id: ${product.id}) as its not in Basket`)
    }

    setBasketItem(newBasket);
  }

  return (
    <div className="grid grid-cols-5">
      <Image src={product.image} width={200} height={200} objectFit="contain" alt="" />
      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <div className="flex">
          {Array(product.rating).fill(0).map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
        </div>
        <p className="text-xs my-2 line-clamp3">{product.description}</p>
        <Currency quantity={product.price} currency="usd" />
        {product.hasPrime && (
          <div className="flex items-center space-x-2">
            <Image
              loading="lazy"
              src="https://links.papareact.com/fdw"
              width="48"
              height="48"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>Add to Basket</button>
        <button className="button" onClick={removeItemFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
