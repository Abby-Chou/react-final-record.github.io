import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import bg from "../../assets/orderSuccessBackground.avif";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    data: null,
    fee: 0,
    total: 0,
  });
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
        const orderData = res.data.order;
        const products = orderData?.products || {};
        const calculatedTotal = Object.values(products).reduce(
          (acc, item) => acc + item.total,
          0
        );

        setOrder({
          data: orderData,
          fee: Object.keys(products).length * 100,
          total: calculatedTotal,
        });
        setLoading(false);
        getCartRef.current();
      } catch (error) {
        setLoading(false);
      }
    };

    getOrder();
  }, [orderId]);

  if (loading) {
    return <div className="container py-5">載入中...</div>;
  }

  if (!order.data) {
    return <div className="container py-5">無法載入訂單資料</div>;
  }

  return (
    <div className="container">
      <div
        style={{
          minHeight: "400px",
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center center",
          objectFit: "cover",
        }}
      ></div>

      <div className="mt-4 mt-md-5 mb-6">
        <div className="row">
          <div className="col-md-6">
            <h2 className="fw-bold text-gray mb-4">
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
                className="btn btn-link p-0 ms-1 mt-n2 text-decoration-none"
                title="複製訂單編號"
              >
                <i
                  className={`${
                    copied ? "bi bi-check-lg" : "bi bi-copy"
                  } text-pink`}
                ></i>
              </button>
            </p>

            <p className="fw-bold text-gray">訂單將於 7 天內交由物流宅配送貨</p>
            <Link
              to="/products/allProducts"
              className="btn btn-pink me-2 rounded-0 mb-4 fs-5 py-2 px-3"
            >
              繼續逛逛
            </Link>
          </div>

          <div className="col-md-6">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>餐點細節</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                  {Object.values(order.data.products || {}).map((item) => (
                    <li className="list-group-item px-0" key={item.id}>
                      <div className="d-flex mt-2">
                        <img
                          src={item.product.imageUrl[0]}
                          alt="產品圖片"
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
                                NT$ {item.product.price.toLocaleString()}
                              </small>
                            </p>
                            <p className="mb-0">
                              NT$ {item.total.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}

                  <li className="list-group-item px-0 pb-0">
                    <table className="table text-muted">
                      <tbody>
                        <tr>
                          <th className="border-0 px-0 pt-0 font-weight-normal">
                            小計
                          </th>
                          <td className="text-end border-0 px-0 pt-0">
                            NT$ {order.total.toLocaleString()}
                          </td>
                        </tr>
                        <tr
                          className={
                            order.total !== order.data.total
                              ? "d-table-row"
                              : "d-none"
                          }
                        >
                          <th className="border-0 px-0 pt-3 font-weight-normal">
                            折抵後金額
                          </th>
                          <td className="text-end border-0 px-0 pt-3 text-success fw-bold">
                            NT$ {order.data.total.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th className="border-0 px-0 pt-3 font-weight-normal">
                            宅配運費
                          </th>
                          <td className="text-end border-0 px-0 pt-3">
                            NT$ {order.fee.toLocaleString()}
                          </td>
                        </tr>
                        <tr>
                          <th className="border-0 px-0 pt-0 font-weight-normal">
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
                        NT$ {(order.data.total + order.fee).toLocaleString()}
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
  );
}
