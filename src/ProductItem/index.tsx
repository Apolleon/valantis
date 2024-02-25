import React, { FC } from "react";
import { Product } from "../types.ts";

import styles from "./ProductItem.module.css";

interface ProductItemProps {
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <li className={styles.item}>
      <span>{product.id}</span>
      <span>{product.product}</span>
      <span>{product.price}</span>
      <span>{product.brand}</span>
    </li>
  );
};

export default ProductItem;
