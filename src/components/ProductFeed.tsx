import Product from "./Product";
import Image from "next/image";

type ProductFeedProps = {
  products: Product[];
}

function ProductFeed({ products }: ProductFeedProps) {
  return (
    <div className="grid grid-flow-row-dense md:-mt-52 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
      {products.slice(0, 4).map(({id, title, price, description, category, image}) => (
        <Product
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={image}
        />
      ))}

      <div className="md:col-span-full mx-auto">
        <Image src="https://links.papareact.com/dyz" width="1380" height="276" alt="" />
      </div>

      <div className="md:col-span-2 auto-rows-max">
        {products.slice(4, 5).map(({id, title, price, description, category, image}) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
      </div>

        {products.slice(5, products.length).map(({id, title, price, description, category, image}) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  )
}

export default ProductFeed
