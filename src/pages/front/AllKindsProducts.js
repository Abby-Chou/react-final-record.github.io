import { useState, useEffect, useContext } from "react";
import Pagination from "../../components/Pagination";
import { useOutletContext, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { SearchContext } from "../../components/SearchProvider";

export default function AllKindsProducts() {
  const location = useLocation();
  const { products, getCart } = useOutletContext();
  const { setSearch, appliedSearch, setAppliedSearch } =
    useContext(SearchContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  // 分頁計算
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  // const totalPages = Math.ceil(cakeProducts.length / itemsPerPage);
  useEffect(() => {
    setCurrentPage(1); // 每次進入頁面時重設頁碼
  }, [products]);

  useEffect(() => {
    // 如果不是從搜尋按鈕來的 → 清空搜尋欄位
    if (!location.state?.fromSearch) {
      setSearch("");
      setAppliedSearch("");
    } else {
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.fromSearch, setSearch, setAppliedSearch]);
  return (
    <>
      <div className="col-lg-9">
        <div className="row gy-3">
          {currentProducts.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                getCart={getCart}
              />
            );
          })}
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Pagination
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            changePage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
