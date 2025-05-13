import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import { Modal } from "bootstrap";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import usePagination from "../../components/usePagination";
import { useLoading } from "../../components/LoadingContext";
import {
  MessageContext,
  handleSuccessMessage,
  handleFailMessage,
} from "../../store/messageStore";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { setIsLoading } = useLoading();
  const [, dispatch] = useContext(MessageContext);

  const filterProducts = !search
    ? products
    : products.filter((product) => product.category.match(search));

  const {
    currentItems: currentProducts,
    currentPage,
    setCurrentPage,
    totalItems,
  } = usePagination(filterProducts, 10, [products]);

  // type: 決定 modal 展開的用途
  const [type, setType] = useState("create"); // edit
  const [tempProduct, setTempProduct] = useState({});

  const productModal = useRef(null);
  const deleteModal = useRef(null);

  const getProducts = async () => {
    setIsLoading(true);
    const productRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
    );

    setProducts(Object.values(productRes.data.products));
    setIsLoading(false);
  };

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

    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
    );

    if (res.data.success) {
      getProducts();
      closeDeleteModal();
    }
    setIsLoading(false);
  };

  const handleSubmit = async (data) => {
    // 送出資料為物件時, 必須帶上 data
    let api = `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
    let method = "post"; // 預設是走新增 sumbit
    if (type === "edit") {
      // 當 tpye = edit 時, 變成修改編輯的 sumbit
      api = `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
      method = "put";
    }
    const res = await axios[method](api, {
      data: data,
    });

    if (res.data.success) {
      handleSuccessMessage(dispatch, res);
    } else {
      handleFailMessage(dispatch, res);
    }

    closeProductModal(); // 關掉 Modal
    getProducts(); // 重新發出 API request
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
  }, []);

  useEffect(() => {
    setCurrentPage(1); // 每次進入頁面時重設頁碼
  }, [setCurrentPage]);

  return (
    <>
      <div className="p-3">
        <ProductModal
          closeProductModal={closeProductModal}
          getProducts={getProducts}
          tempProduct={tempProduct}
          type={type}
          onSubmit={handleSubmit}
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
                  <td>{product.price.toLocaleString()}</td>
                  <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-pink btn-sm"
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
          totalItems={totalItems}
          itemsPerPage={10}
          currentPage={currentPage}
          changePage={setCurrentPage}
        />
      </div>
    </>
  );
}
