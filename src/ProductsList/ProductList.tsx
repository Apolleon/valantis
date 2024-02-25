import React, { FC, memo } from "react";
import { Product } from "../types";
import ProductItem from "../ProductItem/index.tsx";

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default memo(ProductList);
