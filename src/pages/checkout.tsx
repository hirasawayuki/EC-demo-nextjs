import Header from '../components/Header'
import Image from 'next/image'
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from "react-currency-formatter"
import {useSession} from 'next-auth/client';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import {useRecoilValue} from 'recoil';
import {basketItems, basketItemsTotal} from '../app/state';

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout: React.FC = () => {
  const items = useRecoilValue(basketItems);
  const [session] = useSession();
  const total = useRecoilValue(basketItemsTotal);
  const createCheckSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post('/api/create-checkout-session',
      {
        items: items,
        email: session.user.email
      });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    if (result.error) {
      alert(result.error.message);
    }
  }

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            alt=""
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Shopping Basket"}
            </h1>
            {items.map((item) => <CheckoutProduct key={item.id} product={item} />)}
          </div>
        </div>
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">Subtotal ({items.length} items): {" "}
              <span className="font-bold">
                <Currency quantity={total} currency="USD" />
              </span>
              </h2>
              <button
                role="link"
                onClick={createCheckSession}
                disabled={!session}
                className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Checkout;
