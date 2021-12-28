import Head from "next/head"
import Header from "../components/Header"
import Banner from "../components/Banner"
import ProductFeed from "../components/ProductFeed"
import {getSession} from "next-auth/client";
import { GetServerSidePropsContext } from "next";

type HomeProps = {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props:{
      products,
      session,
    }
  }
}