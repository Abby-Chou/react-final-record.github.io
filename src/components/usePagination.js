import { useState, useEffect } from "react";

/**
 * @param {Array} items - 要分頁的原始資料
 * @param {number} itemsPerPage - 每頁幾筆資料
 * @param {Array<any>} resetDeps - 當這些依賴變化時，重設頁數
 */
export default function usePagination(items, itemsPerPage = 6, resetDeps = []) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // 依賴變化時重設頁碼
  }, resetDeps);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = items.slice(indexOfFirst, indexOfLast);

  return {
    currentItems,
    currentPage,
    setCurrentPage,
    totalItems: items.length,
  };
}
