import {StarIcon} from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter"
import {useRecoilState} from "recoil";
import basketItemsState from "../app/state";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime
}: Product) {
  const [basketItems, setBasketItem] = useRecoilState(basketItemsState);

  const addItemToBasket = () => {
    const product: Product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime
    }
    setBasketItem([...basketItems, product]);
  }

  const removeItemFromBasket = () => {
    const index = basketItems.findIndex(item => item.id === id);
    let newBasket = [...basketItems];
    if (index >= 0) {
      newBasket.splice(index, 1);
    } else {
      console.warn(`Can't remove product (id: ${id}) as its not in Basket`)
    }

    setBasketItem(newBasket);
  }

  return (
    <div className="grid grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" alt="" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating).fill(0).map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
        </div>
        <p className="text-xs my-2 line-clamp3">{description}</p>
        <Currency quantity={price} currency="usd" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
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
