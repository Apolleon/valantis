import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import Spinner from "../Spinner.js";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Product } from "../types.ts";
import Filter from "../Filter/Filter.tsx";
import { getFilteredProductsApi } from "../helpers/getFilteredProductsApi.ts";
import ProductList from "../ProductsList/ProductList.tsx";

import styles from "../ProductsList/ProductsList.module.css";

const AppContext = createContext<{
  filters: URLSearchParams;
  setFilters: Dispatch<SetStateAction<{}>>;
  setProducts: Dispatch<SetStateAction<[]>>;
}>({
  filters: new URLSearchParams(),
  setFilters: () => {},
  setProducts: () => {},
});
export { AppContext };

const FilterPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageProducts, setPageProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pageQuantity = products.length / 50;
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    if (searchParams.size == 0) {
      navigate("/");
      return;
    }
    const data = await getFilteredProductsApi(searchParams);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const newd = [...products];
    const data = newd.slice(page * 50, page * 50 + 50);
    setPageProducts(data);
  }, [page]);

  return (
    <AppContext.Provider
      value={{
        filters: searchParams,
        setFilters: setSearchParams,
        setProducts: setProducts,
      }}
    >
      <div className={styles.list}>
        <Filter />
        {loading && <Spinner />}
        {!loading && (
          <ProductList
            products={pageProducts.slice(page * 50, page * 50 + 50)}
          />
        )}
        {pageQuantity >= 1 && (
          <>
            <button
              className="sliding-button"
              onClick={() => setPage(Math.max(0, page - 1))}
            >
              Предыдущая
            </button>
            <button
              className="sliding-button"
              onClick={() => setPage(Math.min(pageQuantity, page + 1))}
            >
              Следующая
            </button>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default FilterPage;
