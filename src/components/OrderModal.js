import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  MessageContext,
  handleFailMessage,
  handleSuccessMessage,
} from "../store/messageStore";

export default function OrderModal({ closeOrderModal, getOrders, tempOrder }) {
  const [tempData, setTempData] = useState({});

  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    setTempData(tempOrder);
  }, [tempOrder]);

  const handleChange = (e) => {
    // console.log(e);
    console.log("onChange", e);
    const { value, name } = e.target;

    setTempData({ ...tempData, [name]: value });
    console.log("更新", tempData);
  };

  const submit = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${tempOrder.id}`,
        {
          data: tempData,
        }
      );
      console.log(res);
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
      } else {
        handleFailMessage(dispatch, res);
      }

      closeOrderModal(); // 關掉 Modal
      getOrders(); // 重新發出 API request
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        id="orderModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                編輯訂單 : {tempData.id}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeOrderModal}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-8">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">產品名稱</th>
                        <th scope="col">數量</th>
                        <th scope="col">折扣</th>
                        <th scope="col">總金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {tempData?.products &&
                            Object.values(tempData?.products)?.map((item) => {
                              return (
                                <ul key={item.id} className="list-unstyled">
                                  <li>{item.product.title}</li>
                                </ul>
                              );
                            })}
                        </td>
                        <td>
                          {tempData?.products &&
                            Object.values(tempData?.products)?.map((item) => {
                              return (
                                <ul key={item.id} className="list-unstyled">
                                  <li className="fw-bold text-red">
                                    x{item.qty}
                                  </li>
                                </ul>
                              );
                            })}
                        </td>
                        <td>
                          {tempData?.products &&
                            Object.values(tempData?.products)?.map((item) => {
                              return (
                                <ul key={item.id} className="list-unstyled">
                                  <li>$ {item.total - item.final_total}</li>
                                </ul>
                              );
                            })}
                        </td>
                        <td>
                          {tempData?.products &&
                            Object.values(tempData?.products)?.map((item) => {
                              return (
                                <ul key={item.id} className="list-unstyled">
                                  <li>$ {tempData.total - item.final_total}</li>
                                </ul>
                              );
                            })}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <th>總金額</th>
                        <td>$ {(tempData.total / 0.8) * 0.2}</td>
                        <td>$ {tempData.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* 訂單狀態 */}
                <div className="col-md-3 p-2 d-flex justify-content-center">
                  <div>
                    <h4 className="form-label fw-bold">訂單狀態</h4>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="message"
                        id="not-yet-delivery"
                        value="未發貨"
                        checked={tempData.message === "未發貨"}
                        onChange={(e) => handleChange(e)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="not-yet-delivery"
                      >
                        未發貨
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="message"
                        id="delivering"
                        value="已出貨"
                        checked={tempData.message === "已出貨"}
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="form-check-label" htmlFor="delivering">
                        已出貨
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="message"
                        id="finish"
                        value="已完成"
                        checked={tempData.message === "已完成"}
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="form-check-label" htmlFor="finish">
                        已完成
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 訂購人資料 */}
              <div className="row">
                <div className="col-md-8">
                  <h5 className="fw-bold">訂購人資料</h5>
                  <ul className="list-unstyled p-1 mb-0">
                    <li>訂購人: {tempData?.user?.name}</li>
                    <li>電話: {tempData?.user?.tel}</li>
                    <li>信箱: {tempData?.user?.email}</li>
                    <li>送貨地址: {tempData?.user?.address}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeOrderModal}
              >
                關閉
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submit}
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
