import { usePaginationButtons } from 'hooks/usePaginationButtons';

import styles from './Pagination.module.scss';

interface IBtn {
  number: number;
  current: boolean;
}

interface iPagination {
  todosPerPage: number;
  totalPageCount: number;
  currentPage: number;

  setTodosPerPage: (value: number) => void;
  setCurrentPage: (value: number) => void;
}

export const Pagination = (props: iPagination) => {
  const {
    todosPerPage,
    totalPageCount,
    currentPage,
    setTodosPerPage,
    setCurrentPage,
  } = props;

  const paginationBtns = usePaginationButtons(
    currentPage,
    totalPageCount,
    todosPerPage
  );

  const onSelect: React.ChangeEventHandler<HTMLSelectElement> = e => {
    const value = parseInt(e.target.value);
    setTodosPerPage(value);
    if (value === 5 && currentPage === 1) {
      setCurrentPage(currentPage + 1);
      return;
    }
    if (value === 5) {
      setCurrentPage(currentPage);
      return;
    }
    if (currentPage > 1 && value === 10) {
      setCurrentPage(currentPage - 1);
      return;
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1 ? true : false}
      >
        Previous
      </button>

      {paginationBtns.map((btn, index) => {
        if (index === 1 && btn === '...') {
          return (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(currentPage - 2);
              }}
            >
              {btn}
            </button>
          );
        }

        if (btn === '...') {
          return (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(currentPage + 2);
              }}
            >
              {btn}
            </button>
          );
        }

        if ((btn as IBtn).current) {
          return (
            <button key={index} className={styles.current}>
              {(btn as IBtn).number}
            </button>
          );
        }

        if (typeof btn === 'number') {
          if (btn === currentPage) {
            return (
              <button
                className={styles.current}
                key={index}
                onClick={() => {
                  setCurrentPage(btn);
                }}
              >
                {btn}
              </button>
            );
          }
          return (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(btn);
              }}
            >
              {btn}
            </button>
          );
        }

        return (
          <button
            key={index}
            onClick={() => {
              setCurrentPage((btn as IBtn).number);
            }}
          >
            {(btn as IBtn).number}
          </button>
        );
      })}

      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === totalPageCount ? true : false}
      >
        Next
      </button>

      <select onChange={onSelect} name="" id="">
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
};
