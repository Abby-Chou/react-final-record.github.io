import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import { Modal } from "bootstrap";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { useLoading } from "../../components/LoadingContext";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { setIsLoading } = useLoading();

  // const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 分頁計算
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const filterProducts = useMemo(() => {
    if (!search) {
      return products;
    }
    return [...products].filter((product) => {
      return product.category.match(search);
    });
  }, [search, products]);

  const currentProducts = filterProducts.slice(indexOfFirst, indexOfLast);
  // const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  // type: 決定 modal 展開的用途
  const [type, setType] = useState("create"); // edit
  const [tempProduct, setTempProduct] = useState({});

  const productModal = useRef(null);
  const deleteModal = useRef(null);

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    const productRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
    );
    console.log(productRes);
    setProducts(Object.values(productRes.data.products));
    setIsLoading(false);
    // setPagination(productRes.data.pagination);
  }, [setIsLoading]);

  const openDeleteModal = (thisProduct) => {
    setTempProduct(thisProduct);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const openProductModal = (openProductType, openProduct) => {
    setType(openProductType);
    setTempProduct(openProduct);
    productModal.current.show();
  };

  const closeProductModal = () => {
    productModal.current.hide();
  };

  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      console.log(res);
      if (res.data.success) {
        getProducts();
        closeDeleteModal();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 取出之前登入過的 Token
    productModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    getProducts();
  }, [getProducts]);

  useEffect(() => {
    setCurrentPage(1); // 每次進入頁面時重設頁碼
  }, [products]);

  return (
    <>
      <div className="p-3">
        <ProductModal
          closeProductModal={closeProductModal}
          getProducts={getProducts}
          tempProduct={tempProduct}
          type={type}
        />
        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          text={tempProduct.title}
          handleDelete={deleteProduct}
          id={tempProduct.id}
        />
        <h3>產品列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => openProductModal("create", {})}
          >
            建立新商品
          </button>
        </div>
        <table className="table">
          <thead className="align-middle">
            <tr>
              <th scope="col" className="text-nowrap">
                分類
                <label htmlFor="search">
                  <i className="bi bi-search ms-2"></i>
                </label>
                <input
                  id="search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="ms-2 w-75"
                />
              </th>
              <th scope="col">名稱</th>
              <th scope="col">售價</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => {
              return (
                <tr key={product.id}>
                  <td style={{ width: "250px" }}>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openProductModal("edit", product)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-red fw-bold btn-sm ms-2"
                      onClick={() => openDeleteModal(product)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          totalItems={filterProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          changePage={setCurrentPage}
        />
        {/* <AdminPagination pagination={pagination} changePage={getProducts} /> */}
      </div>
    </>
  );
}
