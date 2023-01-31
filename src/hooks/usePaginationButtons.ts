import { useMemo } from 'react';

import { range } from 'utils/range';

export const usePaginationButtons = function (
  currentPage: number,
  totalPageCount: number,
  todosPerPage: number
) {
  return useMemo(() => {
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
};
