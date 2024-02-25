import React, { FC, useEffect, useRef, useState, memo } from "react";

import styles from "./OptionsList.module.css";
import { useSearchParams } from "react-router-dom";

interface OptionsListProps {
  handleChange: (option: string | number | null, name: string) => void;
  items: string[] | number[] | [];
  filterName: string;
}

const OptionsList: FC<OptionsListProps> = ({
  handleChange,
  items,
  filterName,
}) => {
  const [showList, setShowList] = useState(false);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState<string | number>(
    searchParams.get(filterName) || filterName
  );
  const divTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (divTarget.current) {
        e.target !== divTarget.current.children[0] && setShowList(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      onClick={() => setShowList(!showList)}
      className={styles.list}
      ref={divTarget}
    >
      <div className={styles.list_title}>{value}</div>
      {showList && (
        <div className={styles.list_block}>
          <div
            onClick={() => {
              handleChange(null, filterName), setValue(filterName);
            }}
          >
            {filterName}
          </div>
          {items.map((option: string | number) => (
            <div
              onClick={() => {
                handleChange(option, filterName), setValue(option);
              }}
              key={option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(OptionsList);
