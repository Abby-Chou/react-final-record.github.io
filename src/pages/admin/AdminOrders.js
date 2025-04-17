import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import { Modal } from "bootstrap";
import DeleteOrderModal from "../../components/DeleteOrderModal";
import AdminPagination from "../../components/AdminPagination";
import { useLoading } from "../../components/LoadingContext";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const { setIsLoading } = useLoading();

  const [tempOrder, setTempOrder] = useState({});

  const [sortOrder, setSortOrder] = useState("asc"); // asc: 近到遠, desc: 遠到近
  const [copied, setCopied] = useState(false);

  const orderModal = useRef(null);
  const deleteOrderModal = useRef(null);

  const thisDate = `${new Date().getFullYear().toString()}年${(
    new Date().getMonth() + 1
  ).toString()}月`;

  const getOrders = useCallback(
    async (page = 1) => {
      setIsLoading(true);
      const productRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
      );
      // console.log("Orders", productRes);
      setOrders(productRes.data.orders);
      setPagination(productRes.data.pagination);
      setIsLoading(false);
    },
    [setIsLoading]
  );

  const sortedOrders = useMemo(() => {
    const ordersCopy = [...orders];
    return ordersCopy.sort((a, b) => {
      const dateA = a.user?.wishDate || "";
      const dateB = b.user?.wishDate || "";
      if (sortOrder === "asc") {
        return dateA.localeCompare(dateB); // 近到遠
      } else {
        return dateB.localeCompare(dateA); // 遠到近
      }
    });
  }, [orders, sortOrder]);

  const openOrderModal = (openOrder) => {
    setTempOrder(openOrder);
    setTimeout(() => {
      orderModal.current.show();
    }, 0);
  };

  const closeOrderModal = () => {
    orderModal.current.hide();
  };

  const openDeleteModal = (thisProduct) => {
    setTempOrder(thisProduct);
    deleteOrderModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteOrderModal.current.hide();
  };

  const deleteOrder = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
      );
      // console.log(res);
      if (res.data.success) {
        getOrders();
        closeDeleteModal();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 取出之前登入過的 Token
    orderModal.current = new Modal("#orderModal", {
      backdrop: "static",
    });
    deleteOrderModal.current = new Modal("#deleteOrderModal", {
      backdrop: "static",
    });

    getOrders();
  }, [getOrders]);
  return (
    <>
      <div className="p-3">
        <OrderModal
          closeOrderModal={closeOrderModal}
          getOrders={getOrders}
          tempOrder={tempOrder}
        />
        <DeleteOrderModal
          closeDeleteModal={closeDeleteModal}
          text={tempOrder.id}
          handleDelete={deleteOrder}
          id={tempOrder.id}
        />
        <h3>{thisDate}訂單列表</h3>
        <hr />

        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                訂單號碼
                {copied && (
                  <span className="text-pink ms-4">已複製至剪貼簿</span>
                )}
              </th>
              <th scope="col">產品內容</th>
              <th scope="col">數量</th>
              <th scope="col">狀態</th>
              <th scope="col">
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    id="expectedDate"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button"
                  >
                    要求到貨日
                  </div>
                  <ul className="dropdown-menu" aria-labelledby="expectedDate">
                    <li>
                      <button
                        className="dropdown-item"
                        href="#"
                        onClick={() => setSortOrder("asc")}
                      >
                        從近到遠
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        href="#"
                        onClick={() => setSortOrder("desc")}
                      >
                        從遠到近
                      </button>
                    </li>
                  </ul>
                </div>
              </th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => {
              return (
                <tr key={order.id}>
                  <td style={{ width: "250px" }}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(order.id);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="btn btn-link p-0 me-1 text-decoration-none"
                      title="複製訂單編號"
                    >
                      <i className="bi bi-copy text-pink"></i>
                    </button>
                    {order.id}{" "}
                  </td>
                  <td style={{ width: "175px" }}>
                    {Object.values(order.products).map((item) => {
                      return (
                        <ul key={item.id} className="list-unstyled">
                          <li>{item.product.title}</li>
                        </ul>
                      );
                    })}
                  </td>
                  <td>
                    {Object.values(order.products).map((item) => {
                      return (
                        <ul key={item.id} className="list-unstyled">
                          <li>x{item.qty}</li>
                        </ul>
                      );
                    })}
                  </td>
                  <td>{order.message}</td>
                  <td>{order.user.wishDate}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => openOrderModal(order)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-red fw-bold btn-sm ms-2"
                      onClick={() => openDeleteModal(order)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <AdminPagination pagination={pagination} changePage={getOrders} />
      </div>
    </>
  );
}
