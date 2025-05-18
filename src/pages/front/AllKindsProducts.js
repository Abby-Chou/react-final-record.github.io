import { useEffect, useContext } from "react";
import Pagination from "../../components/Pagination";
import { useOutletContext, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { SearchContext } from "../../components/SearchProvider";
import usePagination from "../../components/usePagination";

export default function AllKindsProducts() {
  const location = useLocation();
  const { products, addToCart } = useOutletContext();
  const { search, setSearch, appliedSearch, setAppliedSearch } =
    useContext(SearchContext);

  // 判斷是否仍在 loading 狀態
  const isLoading = products.length === 0;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  const {
    currentItems: currentProducts,
    currentPage,
    setCurrentPage,
    totalItems,
  } = usePagination(filteredProducts, 6, [products]);

  useEffect(() => {
    // 如果不是從搜尋按鈕來的 → 清空搜尋欄位
    if (!location.state?.fromSearch) {
      setSearch("");
      setAppliedSearch("");
    } else {
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.fromSearch, setSearch, setAppliedSearch]);

  // 渲染 loading 中的畫面
  if (isLoading) {
    return (
      <div className="text-center p-5 fs-s-20 text-nowrap">
        產品資料載入中...
      </div>
    );
  }
  return (
    <>
      {currentProducts.length ? (
        currentProducts.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
              addToCart={addToCart}
            />
          );
        })
      ) : (
        <div className="fs-s-20 p-3 d-flex justify-content-center justify-content-lg-start ms-lg-3 mt-4 mt-lg-0">
          <div>
            沒有符合『{" "}
            <span className="text-pink fw-bold">{appliedSearch}</span> 』的產品
            , 請重新確認搜尋關鍵字
            <div className="mt-1">
              <i className="bi bi-arrow-left me-2 d-none d-lg-inline-block"></i>
              <i className="bi bi-arrow-up d-lg-none"></i>或由
              <span className="d-none d-lg-inline-block">左側</span>
              <span className="d-lg-none">上方</span>選單進入
            </div>
            <div className="mt-4">
              <SearchBar
                search={search}
                setSearch={setSearch}
                setAppliedSearch={setAppliedSearch}
              />
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center mt-3">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={6}
          currentPage={currentPage}
          changePage={setCurrentPage}
        />
      </div>
    </>
  );
}
