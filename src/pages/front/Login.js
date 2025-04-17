import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../components/LoadingContext";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({});
  const { setIsLoading } = useLoading();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setData({ ...data, [name]: value });
    // console.log(data);
  };

  const submit = async (e) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/admin/signin`,
        data
      );

      if (res.data.success) {
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token}; expires=${new Date(
          expired * 1000
        ).toUTCString()}; path=/;`;

        navigate("/admin/products");
      } else {
        setLoginState(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("登入錯誤：", error);
      setLoginState({ message: "伺服器錯誤，請稍後再試。" });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">會員登入</h2>

          {/* 帳號密碼錯誤, 就顯示"登入失敗" 訊息 */}
          <div
            className={`alert alert-danger ${
              loginState.message ? "d-block" : "d-none"
            }`}
            role="alert"
          >
            {loginState.message}! 請重新輸入帳號、密碼
          </div>

          <div className="mb-4">
            <input
              id="email"
              className="form-control rounded-0"
              name="username"
              type="email"
              placeholder="帳號 ( 電郵 )"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control rounded-0"
              name="password"
              id="password"
              placeholder="密碼"
              onChange={handleChange}
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
              {" "}
              <button
                type="button"
                className="btn btn-fb w-100 text-white d-flex align-items-center justify-content-center"
                style={{ height: "60px" }}
              >
                <i className="bi bi-facebook me-2 fs-s-32"></i>Facebook 登入
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={submit}
          >
            登入
          </button>
        </div>
      </div>
    </div>
  );
}
