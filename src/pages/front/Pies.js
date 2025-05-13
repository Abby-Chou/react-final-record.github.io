import Pagination from "../../components/Pagination";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import usePagination from "../../components/usePagination";

export default function Pies() {
  const { products, getCart } = useOutletContext();
  const pieProducts = products.filter((item) => item.category === "pies");

  const {
    currentItems: currentProducts,
    currentPage,
    setCurrentPage,
    totalItems,
  } = usePagination(pieProducts, 6, [products]);
  return (
    <>
      <div className="col-md-9">
        <div className="row row-cols-2 row-cols-lg-3  gy-3">
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
        <div className="d-flex justify-content-center mt-3">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={6}
            currentPage={currentPage}
            changePage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
