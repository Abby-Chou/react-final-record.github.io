import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

export default function Cakes() {
  const { products, getCart } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const cakeProducts = products.filter((item) => item.category === "cakes");

  // 分頁計算
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = cakeProducts.slice(indexOfFirst, indexOfLast);
  // const totalPages = Math.ceil(cakeProducts.length / itemsPerPage);
  useEffect(() => {
    setCurrentPage(1); // 每次進入頁面時重設頁碼
  }, [products]);
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
            totalItems={cakeProducts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            changePage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
