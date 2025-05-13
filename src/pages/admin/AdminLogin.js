import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../components/LoadingContext";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loginState, setLoginState] = useState({});
  const { setIsLoading } = useLoading();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
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
      setLoginState({ message: "伺服器錯誤，請稍後再試。" });
    }
  };

  return (
    <div className="bg-light">
      <div className="container py-5 min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h2 className="text-center mb-4 text-secondary">
              {" "}
              派派 <i className="bi bi-x"></i> 後台登入
            </h2>

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

            <button
              type="button"
              className="btn btn-pink w-100"
              onClick={submit}
            >
              登入
            </button>
            <Link type="button" className="btn btn-pink w-100 mt-3" to="/">
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
