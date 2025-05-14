import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { useLoading } from "../../components/LoadingContext";
import { CouponContext } from "../../components/CouponProvider";
import { CartQtyContext } from "../../components/CartQtyProvider";

const stepItems = [
  { step: 1, label: "餐點確認" },
  { step: 2, label: "外送資料填寫" },
  { step: 3, label: "選擇付款方式" },
  { step: 4, label: "完成訂購" },
];
export default function FrontLayout() {
  // const [couponData, setCouponData] = useState({});
  const [products, setProducts] = useState([]);
  const [shippingFee, setShippingFee] = useState(null);

  const { setIsLoading } = useLoading();
  const { appliedCoupon } = useContext(CouponContext);
  const { cartQuantity } = useContext(CartQtyContext);

  const [cartData, setCartData] = useState({});

  const getCart = useCallback(async () => {
    setIsLoading(true);

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    setCartData(res.data.data);

    setShippingFee(100 * res.data.data.carts.length);

    setIsLoading(false);
  }, [setIsLoading]);

  const getProducts = useCallback(async () => {
    setIsLoading(true);

    const productRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    setProducts(productRes.data.products);

    setIsLoading(false);
  }, [setIsLoading]);

  const addToCart = async (id) => {
    // 如果找到購物車已有相同品項的產品, 確認原數量加新數量不大於 10
    const existingItem = cartData.carts?.find((item) => item.product_id === id);
    const existingQty = existingItem ? existingItem.qty : 0;
    const totalQty = existingQty + cartQuantity;

    if (totalQty > 10) {
      alert("單一品項最多購買 10 組, 購物車已超過此數量, 請重新確認!");
    } else {
      const data = {
        data: {
          product_id: id,
          qty: cartQuantity,
        },
      };

      setIsLoading(true);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );

      await getCart(); // 第一次更新購物車

      if (appliedCoupon) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
          {
            data: { code: appliedCoupon },
          }
        );

        await getCart(); // 第二次更新購物車（拿到 final_total）
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
    getProducts();
  }, [getCart, getProducts]);
  return (
    <>
      <Navbar cartData={cartData} />
      <Outlet
        context={{
          getCart,
          stepItems,
          products,
          cartData,
          shippingFee,
          addToCart,
        }}
      />
      <footer className="bg-footer">
        <div className="container">
          <div className="d-flex justify-content-center text-white py-4">
            <p className="mb-0 text-center fs-s-14">
              © Copyright 2025 派派工房 僅作為練習作品, 無商業用途
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
