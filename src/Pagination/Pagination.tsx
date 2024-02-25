import React, { FC } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";

const Pagination: FC = () => {
  const { page = 0 } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <NavLink
        className={"sliding-button"}
        to={`/${Math.max(Number(page) - 1, 0)}?${searchParams.toString()}`}
      >
        Предыдущая
      </NavLink>
      <NavLink
        className={"sliding-button"}
        to={`/${Number(page) + 1}?${searchParams.toString()}`}
      >
        Следующая
      </NavLink>
    </div>
  );
};

export default Pagination;
