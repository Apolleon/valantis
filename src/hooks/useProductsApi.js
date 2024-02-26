import { useState, useEffect } from "react";
import md5 from "md5";

const api = "https://api.valantis.store:41000/";

const format = (date) => (date < 10 ? `0${date}` : date.toString());

const getTimeStamp = () => {
  const date = new Date();

  return `${date.getFullYear()}${format(date.getMonth() + 1)}${format(
    date.getUTCDate()
  )}`;
};

const initialParams = {
  method: "POST",
  headers: {
    "X-Auth": md5(`${process.env.REACT_APP_PASSWORD}_` + getTimeStamp()),
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export function useProductsApi(ids) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async (ids) => {
      try {
        setLoading(true);
        const data = await fetch(api, {
          ...initialParams,
          body: JSON.stringify({ action: "get_items", params: { ids: ids } }),
        });
        const { result } = await data.json();
        const resData = result.filter(
          (product, index, a) =>
            a.findIndex((product2) => product2.id === product.id) === index
        );
        setResult(resData);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setTimeout(async () => await getData(ids), 3000);
      }
    };

    getData(ids);
  }, [ids]);

  return { result, loading };
}
