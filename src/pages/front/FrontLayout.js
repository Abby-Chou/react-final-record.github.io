import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLoading } from "../../components/LoadingContext";

export default function FrontLayout() {
  // const [couponData, setCouponData] = useState({});
  const [products, setProducts] = useState([]);
  const [shippingFee, setShippingFee] = useState(null);
  const { setIsLoading } = useLoading();
  const stepItems = [
    { step: 1, label: "餐點確認" },
    { step: 2, label: "外送資料填寫" },
    { step: 3, label: "選擇付款方式" },
    { step: 4, label: "完成訂購" },
  ];
  const [cartData, setCartData] = useState({});
  const getCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCartData(res.data.data);
      setShippingFee(100 * res.data.data.carts.length);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const productRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setProducts(productRes.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    getCart();
    getProducts();
  }, [getCart, getProducts]);
  return (
    <>
      <Navbar cartData={cartData} />
      <Outlet
        context={{ getCart, stepItems, products, cartData, shippingFee }}
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
