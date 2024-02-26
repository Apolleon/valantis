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

export function useCustomApi(params) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getData = async (params) => {
      try {
        const data = await fetch(api, {
          ...initialParams,
          body: JSON.stringify(params),
        });
        const { result } = await data.json();
        setResult(result);
      } catch (e) {
        console.log(e);
        setTimeout(async () => await getData(params), 3000);
      }
    };

    getData(params);
  }, []);

  return result;
}
