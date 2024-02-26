import React, { FC, memo, useContext } from "react";
import OptionsList from "./OptionsList/OptionsList.tsx";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Home/Home.tsx";
import { useCustomApi } from "../hooks/useCustomApi.js";

import styles from "./Filter.module.css";

const pricesConfigs = {
  action: "get_fields",
  params: { field: "price" },
};

const brandsConfigs = {
  action: "get_fields",
  params: { field: "brand" },
};

const Filter: FC = () => {
  const { filters, setFilters } = useContext(AppContext);
  const navigate = useNavigate();
  const priceData = useCustomApi(pricesConfigs);
  const brandData = useCustomApi(brandsConfigs);

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
        items={[...new Set<number>(priceData)]}
        filterName="price"
        handleChange={handleChange}
      />
      <OptionsList
        items={[...new Set<string>(brandData)]}
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
