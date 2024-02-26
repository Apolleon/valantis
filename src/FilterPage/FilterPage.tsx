import React, { useEffect, useState } from "react";
import Spinner from "../Spinner.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filter from "../Filter/Filter.tsx";
import ProductList from "../ProductsList/ProductList.tsx";
import { useCustomApi } from "../hooks/useCustomApi.js";
import { useProductsApi } from "../hooks/useProductsApi.js";

import styles from "../ProductsList/ProductsList.module.css";

const searchParamsToObj = (params: URLSearchParams) => {
  const copyParams = {};

  if (params.size > 0) {
    for (const [key, value] of params) {
      copyParams[key] = Number(value) || value;
    }
  }

  return copyParams;
};

const FilterPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const ids = useCustomApi({
    action: "filter",
    params: searchParamsToObj(searchParams),
  });
  const { result, loading } = useProductsApi(ids);

  const pageQuantity = result.length / 50;
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (searchParams.size == 0) navigate("/");
  }, [searchParams]);

  return (
    <div className={styles.list}>
      <Filter />
      {loading && <Spinner />}
      {!loading && <ProductList products={result.splice(page * 50, 50)} />}
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
  );
};

export default FilterPage;
