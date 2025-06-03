import Pagination from "../../components/Pagination";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import usePagination from "../../components/usePagination";

export default function Pies() {
  const { products, getCart } = useOutletContext();

  const {
    currentItems: currentProducts,
    currentPage,
    setCurrentPage,
    totalItems,
  } = usePagination(
    products,
    "pies",
    6,
    (item, keyword) => item.category === keyword
  );
  return (
    <>
      {currentProducts.map((product) => {
        return (
          <ProductCard product={product} key={product.id} getCart={getCart} />
        );
      })}

      <div className="text-center w-100 mt-4">
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
