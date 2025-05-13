import { useEffect, useState } from "react";

export default function OrderModal({ closeOrderModal, onSubmit, tempOrder }) {
  const [tempData, setTempData] = useState({});

  const productList = Object.values(tempData?.products || {});
  const sum = productList.reduce((acc, item) => {
    const total = item.total || 0;
    const final = item.final_total || 0;
    return acc + (total - final);
  }, 0);

  useEffect(() => {
    setTempData(tempOrder);
  }, [tempOrder]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  return (
    <div className="modal fade" tabIndex="-1" id="orderModal">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 fw-bold">
              編輯訂單 : {tempData.id} <br />
              總金額 (含運費) : ${" "}
              {(tempData.total || 0) + productList.length * 100}
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
                        {productList.map((item) => (
                          <ul key={item.id} className="list-unstyled">
                            <li>{item.product.title}</li>
                          </ul>
                        ))}
                      </td>
                      <td>
                        {productList.map((item) => (
                          <ul key={item.id} className="list-unstyled">
                            <li className="fw-bold text-red">x{item.qty}</li>
                          </ul>
                        ))}
                      </td>
                      <td>
                        {productList.map((item) => (
                          <ul key={item.id} className="list-unstyled">
                            <li>
                              ${" "}
                              {(
                                (item.total || 0) - (item.final_total || 0)
                              ).toLocaleString()}
                            </li>
                          </ul>
                        ))}
                      </td>
                      <td>
                        {productList.map((item) => (
                          <ul key={item.id} className="list-unstyled">
                            <li>
                              $ {item?.final_total?.toLocaleString() || 0}
                            </li>
                          </ul>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <th>總金額</th>
                      <td>$ {sum.toLocaleString()}</td>
                      <td>$ {tempData?.total?.toLocaleString() || 0}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 訂單狀態 */}
              <div className="col-md-3 p-2 d-flex justify-content-center">
                <div>
                  <h4 className="form-label fw-bold">訂單狀態</h4>
                  {["未發貨", "已出貨", "已完成"].map((status) => (
                    <div className="form-check" key={status}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="message"
                        id={status}
                        value={status}
                        checked={tempData.message === status}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={status}>
                        {status}
                      </label>
                    </div>
                  ))}
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
              onClick={() => {
                onSubmit(tempData);
              }}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
