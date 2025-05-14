import {
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
  const context = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-4 mb-7">
        <div className="row g-4">
          <div className="col-md-3 d-flex justify-content-center">
            <ul className="text-secondary list-group list-group-flush">
              <a href=""></a>
              <li
                className={`list-group-item d-flex justify-content-center product-list-item  ${
                  location.pathname.includes("/products/allProducts")
                    ? "active"
                    : ""
                }`}
              >
                <div>
                  <a
                    className="text-decoration-none link-secondary fs-5 d-flex stretched-link"
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
                className={`list-group-item d-flex justify-content-center product-list-item  ${
                  location.pathname.includes("/products/cakes") ? "active" : ""
                }`}
              >
                <div>
                  <a
                    className="text-decoration-none link-secondary fs-5 d-flex stretched-link"
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
                className={`list-group-item d-flex justify-content-center product-list-item  ${
                  location.pathname.includes("/products/pies") ? "active" : ""
                }`}
              >
                <div>
                  <a
                    className="text-decoration-none link-secondary fs-5 d-flex stretched-link"
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
                className={`list-group-item d-flex justify-content-center product-list-item  ${
                  location.pathname.includes("/products/doughnuts")
                    ? "active"
                    : ""
                }`}
              >
                <div>
                  <a
                    className="text-decoration-none link-secondary fs-5 stretched-link"
                    role="button"
                    onClick={() => {
                      navigate("/products/doughnuts");
                    }}
                  >
                    <img
                      src={doughnut}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                      className="mt-n1 me-2"
                    />
                    甜甜圈類
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <Outlet context={context} />
        </div>
      </div>
    </>
  );
}
