import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  Outlet,
  useOutletContext,
  useLocation,
  useNavigate,
} from "react-router-dom";
import pie from "../../assets/apple-pie.png";
import cake from "../../assets/cake.png";
import doughnut from "../../assets/doughnut.png";
import dessert from "../../assets/dessert.png";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { getCart } = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  const getAllProducts = async () => {
    const allProductRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    console.log(allProductRes);
    setProducts(allProductRes.data.products);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    // 把所有展開的 collapse 區塊收起來（移除 show class）
    const opened = document.querySelectorAll(".collapse.show");
    opened.forEach((el) => {
      el.classList.remove("show");
    });
  }, [location]);
  return (
    <>
      <div className="container mt-5 mb-7">
        <div className="row gy-2 gx-4">
          <div className="col-lg-3 d-flex justify-content-center">
            <ul className="text-secondary list-group list-group-flush">
              <li
                className={`list-group-item d-flex justify-content-center product-list-item ${
                  location.pathname.includes("/products/allProducts")
                    ? "active"
                    : ""
                }`}
                style={{ width: "250px" }}
              >
                <div>
                  <a
                    className="text-decoration-none link-secondary fs-5 d-flex"
                    onClick={() => {
                      navigate("/products/allProducts");
                    }}
                    role="button"
                  >
                    <img
                      src={dessert}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                      className="mt-1 me-2"
                    />
                    全部產品
                  </a>
                </div>
              </li>
              <li
                className={`list-group-item d-flex justify-content-center product-list-item ${
                  location.pathname.includes("/products/cakes") ? "active" : ""
                }`}
              >
                <div>
                  <a
                    className="text-decoration-none link-secondary fs-5 d-flex"
                    onClick={() => {
                      navigate("/products/cakes");
                    }}
                    role="button"
                  >
                    <img
                      src={cake}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                      className="mt-1 me-2"
                    />
                    經典蛋糕
                  </a>
                </div>
              </li>

              <li
                className={`list-group-item d-flex justify-content-center product-list-item ${
                  location.pathname.includes("/products/pies") ? "active" : ""
                }`}
              >
                <div>
                  <a
                    className="text-decoration-none link-secondary fs-5 d-flex"
                    role="button"
                    onClick={() => {
                      navigate("/products/pies");
                    }}
                  >
                    <img
                      src={pie}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                      className="mt-1 me-2"
                    />
                    特色派類
                  </a>
                </div>
              </li>

              <li
                className={`list-group-item d-flex justify-content-center product-list-item ${
                  location.pathname.includes("/products/doughnuts")
                    ? "active"
                    : ""
                }`}
              >
                <div>
                  <a
                    className="text-decoration-none link-secondary fs-5"
                    role="button"
                    onClick={() => {
                      navigate("/products/doughnuts");
                    }}
                  >
                    <img
                      src={doughnut}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                      className="me-2"
                    />
                    甜甜圈類
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <Outlet context={{ products, getCart }} />
        </div>
      </div>
    </>
  );
}
