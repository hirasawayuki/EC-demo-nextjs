import moment from "moment";
import Currency from "react-currency-formatter";

type OrderProps = {
  order: Order;
}

const Order: React.VFC<OrderProps> = ({ order }) => {
  return (
    <div className="relative border rouded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(order.timestamp).format('DD MM YYYY')}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={order.amount} currency="USD" /> - Next Day Delivery{" "}
            <Currency quantity={order.amountShipping} currency="USD" />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {order.items.length} items
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {order.id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {order.images.map(image => (
            /* eslint-disable  @next/next/no-img-element */
            <img key={image} src={image} alt="" className="h-20 object-contain sm:h-32" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order;
