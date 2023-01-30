import { useState, useMemo, useEffect } from 'react';

import { todos as items } from 'store/Todos';

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
  setCheckAll: (value: boolean) => void;
}

const range = (start: number, end: number) => {
  const arr: IBtn[] = [];

  if (end <= 6) {
    for (let i = 1; i <= end; i++) {
      if (i === start) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  if (start === 4 && end < 9) {
    for (let i = 2; i <= 6; i++) {
      if (i === 4) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  if (start === 4) {
    for (let i = 1; i <= 6; i++) {
      if (i === 4) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  if (end > 5 && start < 4) {
    for (let i = 1; i <= 5; i++) {
      if (i === start) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  if (start + 4 >= end) {
    for (let i = end - 4; i < end; i++) {
      if (i === start) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  for (let i = start - 2; i < start + 3; i++) {
    if (start > 4 && i === start) {
      arr.push({ number: i, current: true });
      continue;
    }
    arr.push({ number: i, current: false });
  }

  return arr;
};

export const Pagination = (props: iPagination) => {
  const {
    todosPerPage,
    totalPageCount,
    currentPage,

    setTodosPerPage,
    setCurrentPage,
    setCheckAll,
  } = props;

  const paginationBtns = useMemo(() => {
    if (totalPageCount <= 6) {
      return range(currentPage, totalPageCount);
    }

    if (totalPageCount < 9) {
      const shouldShowRightDots =
        currentPage + 3 < totalPageCount ? true : false;
      const shouldShowLeftDots = currentPage - 3 > 0 ? true : false;

      if (shouldShowRightDots && shouldShowLeftDots) {
        return [
          1,
          '...',
          ...range(currentPage, totalPageCount),
          '...',
          totalPageCount,
        ];
      }

      if (shouldShowRightDots) {
        return [...range(currentPage, totalPageCount), '...', totalPageCount];
      }
      if (shouldShowLeftDots) {
        return [
          1,
          '...',
          ...range(currentPage, totalPageCount),
          totalPageCount,
        ];
      }
    }

    const shouldShowRightDots = currentPage + 4 < totalPageCount ? true : false;
    const shouldShowLeftDots = currentPage - 4 > 0 ? true : false;

    if (shouldShowRightDots && shouldShowLeftDots) {
      return [
        1,
        '...',
        ...range(currentPage, totalPageCount),
        '...',
        totalPageCount,
      ];
    }

    if (shouldShowRightDots) {
      return [...range(currentPage, totalPageCount), '...', totalPageCount];
    }
    if (shouldShowLeftDots) {
      return [1, '...', ...range(currentPage, totalPageCount), totalPageCount];
    }

    return [];
  }, [currentPage, totalPageCount, todosPerPage]);

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
