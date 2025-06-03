import { useEffect, useState } from "react";

/**
 * @param {Array} items - 原始資料
 * @param {string} keyword - 搜尋關鍵字
 * @param {number} itemsPerPage - 每頁幾筆
 * @param {(item: any, keyword: string) => boolean} filterFn - 自定義篩選函式
 */
export default function usePagination(
  items,
  keyword = "",
  itemsPerPage = 6,
  filterFn
) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // 關鍵字或資料變動時，重設頁碼
  }, [items, keyword]);

  const filteredItems = filterFn
    ? items.filter((item) => filterFn(item, keyword))
    : items;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);

  return {
    currentItems,
    currentPage,
    setCurrentPage,
    totalItems: filteredItems.length,
  };
}
