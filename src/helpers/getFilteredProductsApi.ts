import { getCustomApi } from "./getCustomApi.ts";

const getFilteredProductsApi = async (searchParams) => {
  const params = new URLSearchParams(searchParams);
  const copyParams = {};

  if (searchParams.size > 0) {
    for (const [key, value] of params) {
      copyParams[key] = Number(value) || value;
    }
  }

  const ids = await getCustomApi({ action: "filter", params: copyParams });

  let data = await getCustomApi({
    action: "get_items",
    params: { ids: ids },
  });

  data = data.filter(
    (product, index, a) =>
      a.findIndex((product2) => product2.id === product.id) === index
  );

  return data || [];
};

export { getFilteredProductsApi };
