import { Link } from "react-router-dom";
import axios from "axios";
import { useLoading } from "./LoadingContext";
import { useContext } from "react";
import { CouponContext } from "./CouponProvider";

export default function ProductCard({ product, getCart }) {
  const { setIsLoading } = useLoading();
  const { appliedCoupon } = useContext(CouponContext);

  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: 1,
      },
    };
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      console.log("加入購物車成功");

      await getCart(); // 第一次更新購物車

      if (appliedCoupon) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
          {
            data: { code: appliedCoupon },
          }
        );
        console.log("自動重新套用優惠碼成功");
        await getCart(); // 第二次更新購物車（拿到 final_total）
      }
    } catch (error) {
      console.error("加入購物車或套用優惠碼失敗", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="col-lg-4" key={product.id}>
        <div className="card border-0 mb-4 h-100 card-special-hover px-6 p-lg-0">
          <div className="card-img-wrapper position-relative overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.imageUrl}
                className="card-img-top rounded-0 product-card-img"
                alt="..."
              />
              <div className="overlay d-flex justify-content-center align-items-center">
                <span className="text-white fs-5">查看內容</span>
              </div>
            </Link>
          </div>

          <div className="card-body p-2 pb-0 text-center">
            <h4 className="mt-1 fw-bold mb-0 text-gray fs-s-20">
              {product.title}
            </h4>
            <p className="text-pink fs-s-20 fw-bold mb-2">
              NT$ {product.price}
            </p>
            <button
              type="button"
              className="btn btn-pink w-100 rounded-0"
              onClick={addToCart}
            >
              加入購物車
            </button>
          </div>
          <div className="card-footer pt-0 border-0 bg-white text-center"></div>
        </div>
      </div>
    </>
  );
}
