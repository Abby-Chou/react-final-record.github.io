import { Outlet, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo.png";
import { useEffect, useReducer } from "react";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initState,
} from "../../store/messageStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const reducer = useReducer(messageReducer, initState);
  const logout = () => {
    document.cookie =
      "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/adminLogin");
  };
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1]; // MDN Example 2: Get a sample cookie named test2 複製來的

  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  useEffect(() => {
    if (!token) {
      // 沒有 token 就回登入頁面
      navigate("/adminLogin");
    } else {
      // 有 token 就確認 user check
      (async () => {
        const checkRes = await axios.post(
          `${process.env.REACT_APP_API_URL}/v2/api/user/check`
        );
        if (!checkRes.data.success) {
          navigate("/adminLogin");
        }
      })();
    }
  }, [navigate, token]);
  return (
    <MessageContext.Provider value={reducer}>
      <Message />
      <nav className="navbar navbar-expand-lg bg-pink">
        <div className="container-fluid">
          <p className="text-dark fs-s-20 mb-0">
            <img
              src={logo}
              alt="logo"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "8px",
              }}
            />
            派派工房 後台管理系統
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item me-2">
                <Link type="button" className="btn btn-sm btn-fb" to="/">
                  返回首頁
                </Link>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={logout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className="bg-light" style={{ width: "200px" }}>
          <ul className="list-group list-group-flush">
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/products"
            >
              <i className="bi bi-cup-fill me-2" />
              產品列表
            </Link>
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/coupons"
            >
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠卷列表
            </Link>
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/orders"
            >
              <i className="bi bi-receipt me-2" />
              訂單列表
            </Link>
          </ul>
        </div>
        <div className="w-100">
          {/* Products */}
          {token && <Outlet />}
          {/* Products end */}
        </div>
      </div>
    </MessageContext.Provider>
  );
}
