import { getCustomApi } from "./getCustomApi.ts";
import { Product } from "../types.ts";

const getProductsAPi = async (page: number, fn): Promise<Product[]> => {
  let ids: string[] = await getCustomApi({
    action: "get_ids",
    params: { offset: Number(page) * 50, limit: 100 },
  });

  fn(ids.length);

  const products: Product[] = await getCustomApi({
    action: "get_items",
    params: { ids: ids },
  });

  const data = products.filter(
    (product, index, a) =>
      a.findIndex((product2) => product2.id === product.id) === index
  );
  return data;
};

export { getProductsAPi };
