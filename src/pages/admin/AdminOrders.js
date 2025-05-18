import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import { Modal } from "bootstrap";
import DeleteOrderModal from "../../components/DeleteOrderModal";
import AdminPagination from "../../components/AdminPagination";
import { useLoading } from "../../components/LoadingContext";
import {
  MessageContext,
  handleSuccessMessage,
  handleFailMessage,
} from "../../store/messageStore";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const { setIsLoading } = useLoading();

  const [tempOrder, setTempOrder] = useState({});

  const [sortOrder, setSortOrder] = useState("asc"); // asc: 近到遠, desc: 遠到近
  const [copied, setCopied] = useState(false);
  const [, dispatch] = useContext(MessageContext);

  const orderModal = useRef(null);
  const deleteOrderModal = useRef(null);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
  });

  const months = Array.from({ length: 6 }, (_, i) => {
    const now = new Date(); // 這就是你的 baseMonth 固定值
    const baseYear = now.getFullYear();
    const baseMonth = now.getMonth(); // 這邊是 0-11，不要加1

    const date = new Date(baseYear, baseMonth - 3 + i, 1); // 直接用 new Date(年, 月, 日)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${year}-${month}`;
  });

  const getOrders = async (page = 1) => {
    setIsLoading(true);
    const productRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
    );

    setOrders(productRes?.data?.orders);
    setPagination(productRes?.data?.pagination);
    setIsLoading(false);
  };

  const filteredOrders = orders.filter((order) => {
    const wishDate = order.user?.wishDate || "";
    return wishDate.startsWith(selectedMonth);
  });

  const sortedFilteredOrders = [...filteredOrders].sort((a, b) => {
    const dateA = a.user?.wishDate || "";
    const dateB = b.user?.wishDate || "";
    return sortOrder === "asc"
      ? dateA.localeCompare(dateB)
      : dateB.localeCompare(dateA);
  });
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

    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
    );

    if (res.data.success) {
      getOrders();
      closeDeleteModal();
    }
    setIsLoading(false);
  };

  const handleSubmit = async (data) => {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${tempOrder.id}`,
      {
        data: data,
      }
    );

    if (res.data.success) {
      handleSuccessMessage(dispatch, res);
    } else {
      handleFailMessage(dispatch, res);
    }

    closeOrderModal(); // 關掉 Modal
    getOrders(); // 重新發出 API request
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
  }, []);
  return (
    <>
      <div className="p-3">
        <OrderModal
          closeOrderModal={closeOrderModal}
          getOrders={getOrders}
          tempOrder={tempOrder}
          onSubmit={handleSubmit}
        />
        <DeleteOrderModal
          closeDeleteModal={closeDeleteModal}
          text={tempOrder.id}
          handleDelete={deleteOrder}
          id={tempOrder.id}
        />

        <div className="dropdown d-inline ms-3">
          <button
            className="btn btn-pink dropdown-toggle fs-s-20"
            type="button"
            id="monthFilter"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedMonth} 月份訂單列表
          </button>
          <ul className="dropdown-menu" aria-labelledby="monthFilter">
            {months.map((monthStr) => (
              <li key={monthStr}>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedMonth(monthStr)}
                >
                  {monthStr} 月
                </button>
              </li>
            ))}
          </ul>
        </div>

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
            {sortedFilteredOrders.length > 0 ? (
              sortedFilteredOrders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td style={{ width: "250px" }}>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(order.id);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="btn btn-link p-0 me-1 mt-n2 text-decoration-none"
                        title="複製訂單編號"
                      >
                        <i className="bi bi-copy text-pink"></i>
                      </button>
                      {order.id}{" "}
                    </td>
                    <td style={{ width: "175px" }}>
                      {Object.values(order?.products).map((item) => {
                        return (
                          <ul key={item.id} className="list-unstyled">
                            <li>{item.product.title}</li>
                          </ul>
                        );
                      })}
                    </td>
                    <td>
                      {Object.values(order?.products).map((item) => {
                        return (
                          <ul key={item.id} className="list-unstyled">
                            <li>x{item.qty}</li>
                          </ul>
                        );
                      })}
                    </td>
                    <td
                      className={`${
                        order?.message === "未發貨" ? "text-red" : ""
                      } ${order?.message === "已完成" ? "text-success" : ""}`}
                    >
                      {order.message}
                    </td>
                    <td>{order.user.wishDate}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-pink btn-sm"
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
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-secondary">
                  {selectedMonth} 月無訂單
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <AdminPagination pagination={pagination} changePage={getOrders} />
      </div>
    </>
  );
}
