import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { getProductsAPi } from "../helpers/getProductsApi.ts";
import Pagination from "../Pagination/Pagination.tsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Product } from "../types.ts";
import Filter from "../Filter/Filter.tsx";
import Spinner from "../Spinner";
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

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { page = 0 } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [idsQuantity, setIdsQuantity] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    if (searchParams.size > 0) {
      navigate("/filter");
      return;
    }
    const data = await getProductsAPi(Number(page), setIdsQuantity);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
        {!loading && <ProductList products={products} />}
        {idsQuantity > 50 && !loading && <Pagination />}
      </div>
    </AppContext.Provider>
  );
};

export default Home;
