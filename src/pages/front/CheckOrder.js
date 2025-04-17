import axios from "axios";
import { useState } from "react";
import { useLoading } from "../../components/LoadingContext";

export default function CheckOrder() {
  const [inputId, setInputId] = useState("");
  const [orderDetail, setOrderDetail] = useState({});
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { setIsLoading } = useLoading();
  //-ON4Qrk5BERJRf8pzG1Y
  const getOrderDetail = async (orderId) => {
    setIsLoading(true);
    try {
      const orderDetailRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
      );
      // console.log(orderDetailRes);
      const order = orderDetailRes.data.order;
      const productsDetail = Object.values(order.products || {});
      setOrderDetail(order);
      setProducts(productsDetail);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      // console.error("取得訂單失敗", error);
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div
        className="min-vh-100"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1676757202363-30c86ba53343?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container p-5 d-flex justify-content-center">
          <div className="order-check"></div>
          <h2 className="text-dark mx-5 text-nowrap">查詢訂單</h2>
          <div className="order-check"></div>
        </div>
        <div className="container mt-lg-2">
          <div className="d-flex justify-content-center">
            <form className="input-group w-s-lg-500 w-s-350">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="請輸入訂單號碼"
                onChange={(e) => setInputId(e.target.value)}
              />
              <button
                type="button"
                className="input-group-text"
                onClick={() => {
                  getOrderDetail(inputId);
                }}
              >
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
          {orderDetail.id && (
            <div className="row d-flex justify-content-center mt-lg-3 mt-4 p-lg-3 p-4">
              <div className="col-lg-8 ms-lg-8 ms-2">
                <h2>訂單資料</h2>
                <ul className="list-unstyled lh-lg fs-s-20">
                  <li className="d-flex">
                    <div className="me-2 fw-bold">訂單號碼 :</div>
                    {orderDetail?.id}
                  </li>
                  <li className="d-flex">
                    <div className="me-2 fw-bold">訂購餐點 : </div>
                    <div>
                      {products.map((item) => {
                        return (
                          <span className="me-2" key={item.id}>
                            {item?.product?.title} x {item?.qty}
                          </span>
                        );
                      })}
                    </div>
                  </li>
                  <li className="d-flex">
                    <div className="me-2 fw-bold">訂單金額 : </div>
                    <div> NT$ {orderDetail?.total}</div>
                  </li>
                  <li className="d-flex">
                    <div className="me-2 fw-bold">訂購人 : </div>
                    <div> {orderDetail?.user?.name}</div>
                  </li>
                  <li className="d-flex">
                    <div className="me-2 fw-bold">訂購人信箱 : </div>
                    <div> {orderDetail?.user?.email}</div>
                  </li>
                  <li className="d-flex">
                    <div className="me-2 fw-bold">送貨地址 : </div>
                    <div> {orderDetail?.user?.address}</div>
                  </li>
                  <li className="d-flex">
                    <div className="me-2 fw-bold">希望送貨日 : </div>
                    <div> {orderDetail?.user?.wishDate}</div>
                  </li>
                  <li className="d-flex">
                    <div className="me-2 fw-bold">訂購人電話 : </div>
                    <div> {orderDetail?.user?.tel}</div>
                  </li>
                  <li className="d-flex">
                    <div className="me-2 fw-bold">訂單狀態 : </div>
                    <div className="text-red"> {orderDetail?.message}</div>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {error && (
            <div className="text-center mt-4 fs-s-32">
              查無此訂單 ! 請重新確認訂單號碼
            </div>
          )}
        </div>
      </div>
    </>
  );
}
