import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { useState, useContext, useEffect } from "react";
import { SearchContext } from "./SearchProvider";
import { NavbarContext } from "./NavbarProvider";

export default function Navbar({ cartData }) {
  const { isOpen, setIsOpen } = useContext(NavbarContext);
  const [showSearch, setShowSearch] = useState(false);
  const { search, setSearch, setAppliedSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isProductsPage = pathname.startsWith("/products");

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowSearch(false);
  };
  const handleNavClick = () => setIsOpen(false); // 點擊 nav-link 後就關閉
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [pathname]);

  return (
    <>
      <div className="bg-white sticky-top border-bottom shadow-sm">
        <div className="container">
          <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white py-3 position-relative">
            <NavLink
              className="navbar-brand fw-bold text-pink h3 mb-0 pb-0"
              to="/"
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "45px",
                  height: "45px",
                  marginRight: "8px",
                  position: "relative",
                  top: "-10px",
                }}
              />
              派派工房
            </NavLink>

            <div
              className={`collapse navbar-collapse ${
                isOpen ? "show" : ""
              } bg-white custom-header-md-open me-lg-8`}
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item active me-lg-3">
                  <NavLink
                    className="nav-link nav-link-special"
                    to="/products/allProducts"
                    onClick={handleNavClick}
                  >
                    產品列表
                  </NavLink>
                </li>
                <li className="nav-item active me-lg-3">
                  <NavLink
                    className="nav-link nav-link-special"
                    to="/problems"
                    onClick={handleNavClick}
                  >
                    常見問題
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink
                    className="nav-link nav-link-special"
                    to="/checkOrder"
                    onClick={handleNavClick}
                  >
                    訂單查詢
                  </NavLink>
                </li>
                <li className="nav-item active me-lg-3 d-lg-none">
                  <NavLink
                    className="nav-link nav-link-special"
                    to="/login"
                    onClick={handleNavClick}
                  >
                    會員登入
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="navbar-actions d-flex align-items-center mt-1 mt-lg-0 me-n2 me-sp-0">
              <button
                type="button"
                className="nav-link me-4"
                onClick={toggleSearch}
              >
                <i className="bi bi-search fs-4"></i>
              </button>
              <NavLink
                to="/login"
                className="nav-link me-4 d-none d-lg-inline-block "
              >
                <i className="bi bi-person-fill fs-4"></i>
              </NavLink>

              <NavLink to="/cart" className="nav-link position-relative me-3">
                <i className="bi bi-cart-fill fs-4"></i>
                <span
                  className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${
                    cartData?.carts?.length ? "d-inline-block" : "d-none"
                  }`}
                >
                  {cartData?.carts?.length}
                </span>
              </NavLink>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={handleToggle}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {showSearch && (
                <div
                  className={`search-box ${
                    isProductsPage ? "mt-8 mt-md-0" : ""
                  }`}
                >
                  <SearchBar
                    search={search}
                    setSearch={setSearch}
                    setAppliedSearch={setAppliedSearch}
                    onSearchSuccess={() =>
                      navigate("/products/allProducts", {
                        state: { fromSearch: true },
                      })
                    }
                    hideAfterSearch={() => setShowSearch(false)}
                    autoFocus={true}
                  />
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
