import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

export default function Success() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null); // 預設為 null
  const [shippingFee, setShippingFee] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { getCart } = useOutletContext();

  const getCartRef = useRef(getCart);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
        );
        const order = res.data.order;
        const products = order?.products || {};
        const total = Object.values(products).reduce(
          (acc, item) => acc + item.total,
          0
        );

        setOrderData(order);
        setShippingFee(Object.keys(products).length * 100);
        setOrderTotal(total);
        setLoading(false);
        getCartRef.current();
      } catch (error) {
        // console.error("取得訂單失敗", error);
        setLoading(false);
      }
    };

    getOrder();
  }, [orderId]);

  if (loading) {
    return <div className="container py-5">載入中...</div>;
  }

  if (!orderData) {
    return <div className="container py-5">無法載入訂單資料</div>;
  }

  return (
    <>
      <div className="container">
        <div
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1570038283490-0c2b8fe95b2b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundPosition: "center center",
            objectFit: "cover",
          }}
        ></div>

        <div className="mt-4 mt-md-5 mb-6">
          <div className="row">
            <div className="col-md-6">
              <h2 className="fw-bold text-gray">
                餐點選購成功 <i className="bi bi-check-circle text-success"></i>
              </h2>
              <p className="fw-bold text-gray">
                您的訂單號碼為：{" "}
                <span className="fw-bold text-dark">{orderId}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(orderId);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="btn btn-link p-0 ms-1 mt-n3 text-decoration-none"
                  title="複製訂單編號"
                >
                  <i
                    className={`${
                      copied ? "bi bi-check-lg" : "bi bi-copy"
                    } text-pink`}
                  ></i>
                </button>
              </p>

              <p className="fw-bold text-gray">
                訂單將於 7 天內交由物流宅配送貨
              </p>
              <Link
                to="/products/allProducts"
                className="btn btn-outline-dark me-2 rounded-0 mb-4"
              >
                回到首頁
              </Link>
            </div>

            <div className="col-md-6">
              <div className="card rounded-0 py-4">
                <div className="card-header border-bottom-0 bg-white px-4 py-0">
                  <h2>餐點細節</h2>
                </div>
                <div className="card-body px-4 py-0">
                  <ul className="list-group list-group-flush">
                    {Object.values(orderData.products || {}).map((item) => (
                      <li className="list-group-item px-0" key={item.id}>
                        <div className="d-flex mt-2">
                          <img
                            src={item.product.imageUrl}
                            alt=""
                            className="me-2"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="w-100 d-flex flex-column">
                            <div className="d-flex justify-content-between">
                              <h5 className="fw-bold">{item.product.title}</h5>
                              <p className="mb-0 fw-bold">x{item.qty}</p>
                            </div>
                            <div className="d-flex justify-content-between mt-auto">
                              <p className="text-muted mb-0">
                                <small className="fw-bold">
                                  NT$ {item.product.price}
                                </small>
                              </p>
                              <p className="mb-0">NT$ {item.total}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}

                    <li className="list-group-item px-0 pb-0">
                      <table className="table text-muted">
                        <tbody>
                          <tr>
                            <th
                              scope="row"
                              className="border-0 px-0 pt-0 font-weight-normal"
                            >
                              小計
                            </th>
                            <td className="text-end border-0 px-0 pt-0">
                              NT$ {orderTotal}
                            </td>
                          </tr>
                          <tr
                            className={
                              orderTotal !== orderData.total
                                ? "d-table-row"
                                : "d-none"
                            }
                          >
                            <th
                              scope="row"
                              className="border-0 px-0 pt-3 font-weight-normal"
                            >
                              折抵後金額
                            </th>
                            <td className="text-end border-0 px-0 pt-3 text-success fw-bold">
                              NT$ {orderData.total}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="border-0 px-0 pt-3 font-weight-normal"
                            >
                              宅配運費
                            </th>
                            <td className="text-end border-0 px-0 pt-3 ">
                              NT$ {shippingFee}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="row"
                              className="border-0 px-0 pt-0 font-weight-normal"
                            >
                              付款方式
                            </th>
                            <td className="text-end border-0 px-0 pt-0">
                              信用卡
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-between mt-2">
                        <p className="mb-0 h4 fw-bold">總金額</p>
                        <p className="mb-0 h4 fw-bold">
                          NT$ {orderData.total + shippingFee}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
