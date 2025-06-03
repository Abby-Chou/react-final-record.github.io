import { useState } from "react";

export default function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-light">
      <div className="container px-4 px-lg-0 py-5 min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="text-center mb-4">會員登入</h2>

            <div className="mb-4">
              <input
                id="email"
                className="form-control rounded-0"
                name="username"
                type="email"
                value={account}
                placeholder="帳號 ( 電郵 )"
                onChange={(e) => {
                  setAccount(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="form-control rounded-0"
                name="password"
                id="password"
                value={password}
                placeholder="密碼"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="row mb-4 gx-2">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-line w-100 text-white d-flex align-items-center justify-content-center"
                  style={{ height: "60px" }}
                >
                  <i className="bi bi-line me-2 fs-s-32"></i>
                  LINE 登入
                </button>
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-fb w-100 text-white d-flex align-items-center justify-content-center"
                  style={{ height: "60px" }}
                >
                  <i className="bi bi-facebook me-2 fs-s-32"></i>Facebook 登入
                </button>
              </div>
            </div>

            <button type="button" className="btn btn-secondary w-100">
              登入
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
