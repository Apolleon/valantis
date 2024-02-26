import React, {
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import Pagination from "../Pagination/Pagination.tsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Filter from "../Filter/Filter.tsx";
import Spinner from "../Spinner";
import ProductList from "../ProductsList/ProductList.tsx";
import { useCustomApi } from "../hooks/useCustomApi.js";
import { useProductsApi } from "../hooks/useProductsApi.js";

import styles from "../ProductsList/ProductsList.module.css";

const AppContext = createContext<{
  filters: URLSearchParams;
  setFilters: Dispatch<SetStateAction<{}>>;
}>({
  filters: new URLSearchParams(),
  setFilters: () => {},
});
export { AppContext };

const Home = () => {
  const { page = 0 } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const idsRes = useCustomApi({
    action: "get_ids",
    params: { offset: Number(page) * 50, limit: 100 },
  });

  const { result, loading } = useProductsApi(idsRes);

  useEffect(() => {
    if (searchParams.size > 0) {
      navigate("/filter");
      return;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        filters: searchParams,
        setFilters: setSearchParams,
      }}
    >
      <div className={styles.list}>
        <Filter />
        {loading && <Spinner />}
        {!loading && <ProductList products={result} />}
        {idsRes.length > 50 && !loading && <Pagination />}
      </div>
    </AppContext.Provider>
  );
};

export default Home;
