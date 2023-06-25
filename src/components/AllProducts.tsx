import Product from "./Product";
import { testdata } from "@/components/TESTDATA";

export default function AllProducts() {
  return testdata.productData.map((product) => {
    return (
      <>
        <Product
          image={product.image}
          name={product.name}
          price={product.price}
          rating={product.rating}
          quantitySold={product.quantitySold}
        />
        <br></br>
      </>
    );
  });
}