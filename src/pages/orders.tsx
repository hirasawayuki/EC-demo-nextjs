import moment from "moment";
import {GetServerSidePropsContext} from "next";
import {getSession, useSession} from "next-auth/client";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

type OrdersProps = {
  orders: Order[]
}

function Orders({ orders }: OrdersProps) {
  const [session] = useSession();

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pg-1 border-yellow-400">
          Your Orders
        </h1>
        { session ? (
          <h2>{orders.length} Orders</h2>
        ): (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order
              key={order.id}
              order={order}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Orders;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials...
  const session = await getSession(context);

  if (!session) {
    return {
      props: {}
    };
  }

  // Firebase db
  const stripeOrders = await db.collection('users')
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    }
  }
}
