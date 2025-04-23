import { useState, useEffect, useContext } from "react";
import Pagination from "../../components/Pagination";
import { useOutletContext, useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { SearchContext } from "../../components/SearchProvider";

export default function AllKindsProducts() {
  const location = useLocation();
  const { products, getCart } = useOutletContext();
  const { search, setSearch, appliedSearch, setAppliedSearch } =
    useContext(SearchContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(appliedSearch.toLowerCase())
  );

  console.log(filteredProducts);
  // 分頁計算
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  // const totalPages = Math.ceil(cakeProducts.length / itemsPerPage);

  const handleInput = (e) => {
    const { code, key } = e;
    if (code === "Enter" || key === "Enter") {
      handleSearch();
    } else {
      setSearch(e.target.value);
    }
  };
  const handleSearch = () => {
    if (search.trim() !== "") {
      setAppliedSearch(search); //  實際套用搜尋
    }
  };

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
          {currentProducts.length ? (
            currentProducts.map((product) => {
              return (
                <ProductCard
                  product={product}
                  key={product.id}
                  getCart={getCart}
                />
              );
            })
          ) : (
            <div className="fs-s-20 p-3 d-flex justify-content-center justify-content-lg-start ms-lg-3 mt-4 mt-lg-0">
              <div>
                沒有符合『{" "}
                <span className="text-pink fw-bold">{appliedSearch}</span>{" "}
                』的產品 , 請重新確認搜尋關鍵字
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
