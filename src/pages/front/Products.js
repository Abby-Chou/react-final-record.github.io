import {
  Outlet,
  useOutletContext,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";
import { NavbarContext } from "../../components/NavbarProvider";
import pie from "../../assets/apple-pie.png";
import cake from "../../assets/cake.png";
import doughnut from "../../assets/doughnut.png";
import dessert from "../../assets/dessert.png";

const categories = [
  { path: "/products/allProducts", icon: dessert, label: "全部產品" },
  { path: "/products/cakes", icon: cake, label: "經典蛋糕" },
  { path: "/products/pies", icon: pie, label: "特色派類" },
  { path: "/products/doughnuts", icon: doughnut, label: "甜甜圈類" },
];

export default function Products() {
  const context = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen } = useContext(NavbarContext);

  return (
    <>
      <div className="container mt-2 mt-lg-4 mb-7">
        <div className="row g-4">
          <div className="col-md-3 d-none d-md-flex justify-content-center">
            <ul className="text-secondary list-group list-group-flush">
              {categories.map((cat) => (
                <li
                  key={cat.path}
                  className={`list-group-item d-flex justify-content-center product-list-item ${
                    location.pathname.includes(cat.path) ? "active" : ""
                  }`}
                >
                  <div>
                    <a
                      className="text-decoration-none link-secondary fs-5 d-flex stretched-link"
                      role="button"
                      onClick={() => navigate(cat.path)}
                    >
                      <img
                        src={cat.icon}
                        alt="種類圖片"
                        style={{ height: "20px", width: "20px" }}
                        className="mt-1 me-2"
                      />
                      {cat.label}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-9">
            {/* 行動版 橫向 scroll list */}
            <div
              className={`d-md-none sticky-top bg-white border-top pt-2 mb-3 ${
                isOpen ? "top-s-242" : "top-s-82"
              }`}
              style={{ zIndex: 1020 }}
            >
              <div className="d-flex overflow-auto px-2 py-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.path}
                    className={`category-btn flex-shrink-0 ${
                      location.pathname.includes(cat.path) ? "active" : ""
                    }`}
                    style={{ whiteSpace: "nowrap", fontSize: "1rem" }}
                    onClick={() => navigate(cat.path)}
                  >
                    <img
                      src={cat.icon}
                      alt="種類圖片"
                      style={{ height: "18px", width: "18px" }}
                      className="me-2"
                    />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="row row-cols-2 row-cols-lg-3 gy-3">
              <Outlet context={context} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
