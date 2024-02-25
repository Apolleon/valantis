import React, { FC, useEffect, useState, memo, useContext } from "react";
import OptionsList from "./OptionsList/OptionsList.tsx";
import { getCustomApi } from "../helpers/getCustomApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Home/Home.tsx";
import { getFilteredProductsApi } from "../helpers/getFilteredProductsApi.ts";

import styles from "./Filter.module.css";

const Filter: FC = () => {
  const { page = 0 } = useParams();
  const { filters, setFilters, setProducts } = useContext(AppContext);
  const [priceOptions, setPriceOptions] = useState<number[] | []>([]);
  const [brandOptions, setBrandOptions] = useState<string[] | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const priceData = await getCustomApi({
        action: "get_fields",
        params: { field: "price" },
      });

      const uniquePrice = [...new Set<number>(priceData)].sort((a, b) => a - b);
      setPriceOptions(uniquePrice);

      const brandData = await getCustomApi({
        action: "get_fields",
        params: { field: "brand" },
      });

      const uniqueBrand = [...new Set<string>(brandData)];
      setBrandOptions(uniqueBrand);
    };

    fetchData();
  }, [page]);

  const handleChange = (value: string | number | null, name: string) => {
    if (!value) filters.delete(name);
    else filters.set(name, value.toString());
    setFilters(filters);
  };

  const handleFilter = async () => {
    navigate(`/filter?${filters.toString()}`);
  };

  return (
    <div className={styles.filter}>
      <input
        type="text"
        name="product"
        placeholder="product name"
        onInput={({ target }) =>
          handleChange(
            (target as HTMLInputElement).value,
            (target as HTMLInputElement).name
          )
        }
        className={styles.filter_input}
      />
      <OptionsList
        items={priceOptions}
        filterName="price"
        handleChange={handleChange}
      />
      <OptionsList
        items={brandOptions}
        filterName="brand"
        handleChange={handleChange}
      />
      <button className={styles.filter_input} onClick={handleFilter}>
        Поиск
      </button>
    </div>
  );
};

export default memo(Filter);
