import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import Progress from "../../components/Progress";
import { CouponContext } from "../../components/CouponProvider";
import { useLoading } from "../../components/LoadingContext";

export default function Cart() {
  const { stepItems, getCart, cartData, shippingFee } = useOutletContext();
  const [codeData, setCodeData] = useState("");
  const [loadingItems, setLoadingItems] = useState([]);

  const { appliedCoupon, setAppliedCoupon } = useContext(CouponContext);
  const { setIsLoading } = useLoading();

  // 包裝過的 getCart：自動重新套用優惠碼
  const getCartAndReapplyCoupon = async () => {
    await getCart(); // 更新購物車

    if (appliedCoupon) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
          {
            data: { code: appliedCoupon },
          }
        );
        console.log("自動重新套用優惠碼成功");
        await getCart(); // 再次拿回有折扣的 final_total
      } catch (error) {
        console.log("自動套用優惠碼失敗", error);
      }
    }
  };

  const removeCartItem = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCartAndReapplyCoupon();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (item, quantity) => {
    setIsLoading(true);
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItems([...loadingItems, item.id]);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      setLoadingItems((prev) => prev.filter((id) => id !== item.id));
      getCartAndReapplyCoupon();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoupon = async () => {
    setIsLoading(true);
    const data = {
      data: { code: codeData },
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        data
      );
      console.log("套用優惠碼成功");
      setAppliedCoupon(codeData); // 儲存優惠碼到 context
      getCartAndReapplyCoupon();
      setIsLoading(false);
    } catch (error) {
      console.log("套用優惠碼失敗", error);
    }
  };

  const currentStep = 1;
  const width = "12%";

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
            <h2 className="mb-3">購物車</h2>

            {cartData?.carts?.map((item) => (
              <div className="d-flex mt-2 bg-light" key={item.id}>
                <img
                  src={item.product.imageUrl}
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
                        {[...Array(20)].map((_, num) => (
                          <option value={num + 1} key={num}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="mb-0 ms-auto">NT$ {item.total}</p>
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
              <table className="table mt-3 text-muted">
                <tbody>
                  <tr>
                    <th className="border-0 px-0 pt-0 font-weight-normal">
                      小計
                    </th>
                    <td className="text-end border-0 px-0 pt-0">
                      NT$ {cartData.total}
                    </td>
                  </tr>
                  <tr>
                    <th className="border-0 px-0 pt-3 font-weight-normal">
                      <label htmlFor="code">折扣碼</label>
                    </th>
                    <td className="text-end border-0 px-0 pt-3">
                      <input
                        type="text"
                        id="code"
                        className="text-end w-25 me-3 align-middle"
                        onChange={(e) => setCodeData(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-dark rounded-0"
                        onClick={getCoupon}
                      >
                        取得折扣
                      </button>
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
                      NT$ {cartData.final_total}
                    </td>
                  </tr>
                  <tr>
                    <th className="border-0 px-0 pt-0 font-weight-normal">
                      宅配運費
                    </th>
                    <td className="text-end border-0 px-0 pt-0">
                      NT$ {shippingFee}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-3">
                <p className="mb-0 h4 fw-bold">總金額</p>
                <p className="mb-0 h4 fw-bold">
                  NT$ {cartData.final_total + shippingFee}
                </p>
              </div>
              <Link
                to="/checkout"
                className="btn btn-dark w-100 btn-block mt-4 mb-5 rounded-0 py-3"
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
