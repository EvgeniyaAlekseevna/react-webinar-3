import { useMemo } from "react";
import { range } from "../utils";


export const DOTS = '...';

export default function usePagination({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;


    // 1 вариант: Если страниц меньше чем 6, то просто выводим пагинацию
    if(totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // находим индексы элементов рядом с текущей страницей
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);


    // Должны ли быть точки вместо номеров
    const shouldLeftDots = leftSiblingIndex > 2;
    const shouldRightDots = rightSiblingIndex < totalPageCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // 2 вариант: когда не нужно показывать точки слева, но справа они есть
    if (!shouldLeftDots && shouldRightDots) {
      let leftItemCount = 1 + 2 * siblingCount;
      let leftRange = range(1, currentPage === 3 ? leftItemCount + 1 : leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    // 3 вариант: Нет точек справа, но есть слева
    if (shouldLeftDots && !shouldRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(currentPage === totalPageCount - rightItemCount + 3 ? totalPageCount - rightItemCount + 2 : totalPageCount - rightItemCount + 3, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // 4вариант: точки должны быть и слева и справа
    if(shouldLeftDots && shouldRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage])
  
  return paginationRange;
}