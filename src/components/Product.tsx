import Image from "next/image"
import { useState } from "react"
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import {useRecoilState} from "recoil"
import basketItemsState from "../app/state"

const MIN_RATING = 1;
const MAX_RATING = 5;

type ProductProps = {
  product: Product
}

const Product: React.VFC<ProductProps> = ({ product }) => {
  const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
  const [hasPrime] = useState(Math.random() < 0.5)
  const [basketItems, addBasketItem] = useRecoilState(basketItemsState);

  const addItemToBascket = () => {
    addBasketItem([...basketItems, product]);
  }

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{product.category}</p>
      <Image src={product.image} height={200} width={200} objectFit="contain" alt="" />
      <h4 className="my-3">{product.title}</h4>

      <div className="flex">
        {Array(rating).fill(0).map((_, i) => (
          <StarIcon key={i} className="h-5 text-yellow-500" />
        ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>

      <div className="mb-5">
        <Currency quantity={product.price} currency="usd" />
      </div>

      {hasPrime && (
          <div className="flex items-center space-x-2 mt-auto mb-5">
            <Image src="https://links.papareact.com/fdw" width="40" height="40" alt="" />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
      )}

      <button onClick={addItemToBascket} className="mt-auto button">Add to Bascket</button>
    </div>
  )
}

export default Product
