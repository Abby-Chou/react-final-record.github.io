import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import Progress from "../../components/Progress";
import { CouponContext } from "../../components/CouponProvider";
import { useLoading } from "../../components/LoadingContext";

const currentStep = 1;
const width = "0%";

export default function Cart() {
  const { stepItems, getCart, cartData, shippingFee } = useOutletContext();

  const [loadingItems, setLoadingItems] = useState([]);
  const [noCoupon, setNoCoupon] = useState(false);

  const { appliedCoupon, setAppliedCoupon } = useContext(CouponContext);
  const { setIsLoading } = useLoading();

  // 包裝過的 getCart：自動重新套用優惠碼
  const getCartAndReapplyCoupon = async () => {
    await getCart(); // 更新購物車

    if (appliedCoupon) {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        {
          data: { code: appliedCoupon },
        }
      );

      await getCart(); // 再次拿回有折扣的 final_total
    }
  };

  // 操作 API 刪除內容
  const removeCartItem = async (id) => {
    setIsLoading(true);

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
    );
    getCartAndReapplyCoupon();
    setIsLoading(false);
  };

  // 操作 API 更新數量
  const updateCartItem = async (item, quantity) => {
    setIsLoading(true);
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItems([...loadingItems, item.id]);

    await axios.put(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
      data
    );
    setLoadingItems((prev) => prev.filter((id) => id !== item.id));
    getCartAndReapplyCoupon();
    setIsLoading(false);
  };

  // 套用折扣
  const getCoupon = async () => {
    if (!appliedCoupon) return;
    setIsLoading(true);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
      { data: { code: appliedCoupon } }
    );

    if (res.data.success) {
      getCartAndReapplyCoupon();
    } else {
      setNoCoupon(true);
      setTimeout(() => setNoCoupon(false), 5000);
    }

    setIsLoading(false);
  };

  return (
    <div className="container px-4">
      <div className="row justify-content-center">
        <div
          className="col-md-6 bg-white py-2"
          style={{ minHeight: "calc(100vh - 56px - 76px)" }}
        >
          <Progress
            stepItems={stepItems}
            currentStep={currentStep}
            width={width}
          />
          <div className="px-2">
            <h2 className="mb-4">購物車</h2>

            {cartData?.carts?.map((item) => (
              <div className="d-flex mt-2 bg-light" key={item.id}>
                <img
                  src={item.product.imageUrl[0]}
                  alt=""
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <div className="w-100 p-3 position-relative">
                  <button
                    type="button"
                    className="position-absolute btn"
                    onClick={() => removeCartItem(item.id)}
                    style={{ top: "10px", right: "16px" }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <p className="mb-1 fw-bold">{item.product.title}</p>

                  <div
                    className="d-flex justify-content-between align-items-center position-absolute"
                    style={{ bottom: "12px", left: "12px", right: "12px" }}
                  >
                    <div className="input-group w-50 align-items-center">
                      <select
                        className="form-select"
                        value={item.qty}
                        onChange={(e) =>
                          updateCartItem(item, parseInt(e.target.value))
                        }
                        disabled={loadingItems.includes(item.id)}
                      >
                        {[...Array(10)].map((_, num) => (
                          <option value={num + 1} key={num}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="mb-0 ms-auto">
                      NT$ {item?.total?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div
              className={`text-center mb-4 ${
                cartData?.carts?.length === 0 ? "d-block" : "d-none"
              }`}
            >
              <i className="bi bi-cart4 fs-s-200 text-secondary"></i>
              <p className="h4">您沒有選取的餐點</p>
              <Link
                to="/products/cakes"
                className="btn btn-dark w-100 btn-block mt-4 rounded-0 py-3"
              >
                繼續點餐
              </Link>
            </div>

            <div
              className={`${
                cartData?.carts?.length === 0 ? "d-none" : "d-block"
              }`}
            >
              <table className="table mt-4 text-muted">
                <tbody>
                  <tr>
                    <th className="border-0 px-0 pt-0 font-weight-normal">
                      小計
                    </th>
                    <td className="text-end border-0 px-0 pt-0">
                      NT$ {cartData?.total?.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th className="border-0 px-0 pt-3 font-weight-normal">
                      <label htmlFor="code">
                        折扣碼
                        <span
                          className={`text-danger ms-2 ${
                            noCoupon ? "d-inline-block" : "d-none"
                          }`}
                        >
                          ( 找不到優惠券! )
                        </span>
                      </label>
                    </th>
                    <td className="text-end border-0 px-0 pt-3">
                      <div
                        className="d-flex justify-content-end align-items-center"
                        style={{ overflow: "auto" }}
                      >
                        <input
                          type="text"
                          id="code"
                          className="form-control"
                          style={{
                            width: "200px",
                            flex: "0 0 auto",
                            marginRight: "12px",
                          }}
                          placeholder="請輸入折扣碼"
                          value={appliedCoupon || ""}
                          onChange={(e) => setAppliedCoupon(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-pink rounded-0"
                          onClick={getCoupon}
                          style={{ whiteSpace: "nowrap", flex: "0 0 auto" }}
                        >
                          取得折扣
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    className={
                      cartData.final_total !== cartData.total
                        ? "d-table-row"
                        : "d-none"
                    }
                  >
                    <th className="border-0 px-0 pt-0 font-weight-normal">
                      折抵後金額{" "}
                      <span className="text-success text-nowrap">
                        (已取得折扣)
                      </span>
                    </th>
                    <td className="text-end border-0 px-0 pt-0 text-success">
                      NT$ {cartData?.final_total?.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th className="border-0 px-0 pt-0 font-weight-normal">
                      宅配運費
                    </th>
                    <td className="text-end border-0 px-0 pt-0">
                      NT$ {shippingFee?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-3">
                <p className="mb-0 h4 fw-bold">總金額</p>
                <p className="mb-0 h4 fw-bold">
                  NT$ {(cartData?.final_total + shippingFee)?.toLocaleString()}
                </p>
              </div>
              <Link
                to="/checkout"
                className="btn btn-pink w-100 btn-block my-5 rounded-0 py-3"
              >
                確認餐點正確
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
