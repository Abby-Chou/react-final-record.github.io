import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useOutletContext, useParams, Link } from "react-router-dom";

import { useLoading } from "../../components/LoadingContext";
import home from "../../assets/home.png";
import { CartQtyContext } from "../../components/CartQtyProvider";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function ProductDetail() {
  const [singleProduct, setSingleProduct] = useState({});
  const [mainImage, setMainImage] = useState("");

  const [categoryTitle, setCategoryTitle] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { setIsLoading } = useLoading();
  const { id } = useParams();
  const { products, addToCart } = useOutletContext();
  const { cartQuantity, setCartQuantity } = useContext(CartQtyContext);

  // 取得單一產品資料與寫入分類
  useEffect(() => {
    const getProductById = async (id) => {
      setIsLoading(true);
      const productRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );

      const product = productRes.data.product;
      setSingleProduct(product);
      setMainImage(product.imageUrl[0]);

      const category = productRes.data.product.category;
      if (category === "cakes") {
        setCategoryTitle("經典蛋糕");
      } else if (category === "pies") {
        setCategoryTitle("特色派類");
      } else {
        setCategoryTitle("甜甜圈類");
      }

      setIsLoading(false);
    };

    getProductById(id);
  }, [id, setIsLoading]);

  // 篩選相關產品資料
  useEffect(() => {
    if (!singleProduct?.category || !singleProduct?.title) return;

    const relatedProducts = products
      .filter((item) => item.category === singleProduct.category)
      .filter((item) => item.title !== singleProduct.title);

    setRelatedProducts(relatedProducts);
  }, [products, singleProduct]);
  return (
    <div className="container">
      <nav
        style={{ "--bs-breadcrumb-divider": "'>'" }}
        aria-label="breadcrumb"
        className="p-3 ms-5 ms-lg-6 pb-0"
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <img
                src={home}
                alt="首頁"
                style={{ height: "20px", width: "20px" }}
                className="mt-n1"
              />
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <Link
              to={`/products/${singleProduct?.category}`}
              className="link-secondary text-decoration-none"
            >
              {categoryTitle}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {singleProduct.title}
          </li>
        </ol>
      </nav>
      <div className="row justify-content-center mt-lg-4 mb-lg-7 mb-2 px-4 px-lg-5 gx-5 gy-3">
        <div className="col-md-6 col-lg-5">
          <div>
            <img
              src={mainImage}
              alt="產品照片"
              className="img-productDetail mt-4 w-100"
            />
            {singleProduct?.imageUrl?.length > 1 && (
              <div className="d-flex gap-2 mt-3">
                {singleProduct?.imageUrl?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`縮圖${index + 1}`}
                    className={`border img-productDetail-thumbnail ${
                      img === mainImage
                        ? "border-secondary border-4 shadow"
                        : "border-light border-1"
                    }`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6 col-lg-5">
          <h2 className="mb-2">{singleProduct.title}</h2>
          <p className="text-danger">
            首購折扣碼 P2025 , 享 8 折優惠
            <br />
            需於購物車內輸入折扣碼
          </p>
          <p>請於結帳時選取希望到貨日, 若無選取系統自動待入訂購日期 + 7 天</p>

          <p>{singleProduct.content}</p>
          <h5 className="fw-bold">
            NT${singleProduct?.price?.toLocaleString()}
          </h5>
          <div className="input-group mb-3 border mt-4">
            <div className="input-group-prepend">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
                onClick={() =>
                  setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                }
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
            <input
              type="text"
              className="form-control border-0 text-center my-auto shadow-none"
              readOnly
              value={cartQuantity || 1}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
                onClick={() =>
                  setCartQuantity((pre) => (pre === 10 ? pre : pre + 1))
                }
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-dark btn-block rounded-0 mt-2 py-3 w-100"
            onClick={() => {
              addToCart(singleProduct?.id);
            }}
          >
            加入購物車
          </button>
        </div>
        <div className="col-md-12 col-lg-10 mt-4 mt-lg-5">
          <div className="mt-3 text-secondary">
            <h3
              style={{
                borderLeft: "3px solid rgba(210, 152, 121, 1)",
                paddingLeft: "12px",
              }}
            >
              產品描述
            </h3>
            <ul className="list-unstyled lh-lg fs-s-20 p-2 text-secondary">
              <li className="d-flex">
                <i className="bi bi-asterisk me-2"></i>
                <span>名稱 : {singleProduct.title}</span>
              </li>
              <li className="d-flex">
                <i className="bi bi-asterisk me-2"></i>
                <span>重量 : {singleProduct.weight}</span>
              </li>
              <li className="d-flex">
                <i className="bi bi-asterisk me-2"></i>
                <span>
                  過敏原資訊 : {singleProduct.allergin} , 對其過敏者請勿食用
                </span>
              </li>
              <li className="d-flex">
                <i className="bi bi-asterisk me-2"></i>
                <span>
                  保存期限 :
                  {singleProduct?.title?.includes("牛肉派") ||
                  singleProduct?.title?.includes("法式鹹派") ||
                  singleProduct?.title?.includes("康瓦爾派")
                    ? " 冷藏保存 5 日 , 冷凍保存 2 週"
                    : " 冷藏保存 2 日 , 冷凍保存 1 週"}
                </span>
              </li>
            </ul>
            <h3
              style={{
                borderLeft: "3px solid rgba(210, 152, 121, 1)",
                paddingLeft: "12px",
              }}
            >
              注意事項
            </h3>
            <p className="p-2 fs-s-20">
              請詳細閱讀完
              <Link className="link-pink text-decoration-none" to="/problems">
                常見問題
              </Link>
              , 再行下單
            </p>
            <h3
              style={{
                borderLeft: "3px solid rgba(210, 152, 121, 1)",
                paddingLeft: "12px",
              }}
            >
              相關產品
            </h3>
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              loop={relatedProducts.length >= 6}
              autoplay={{ delay: 5000 }}
              modules={[Autoplay]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
              }}
              className="product-swiper pt-3 mt-lg-4 me"
            >
              {relatedProducts.map((product, index) => (
                <SwiperSlide key={index} className="px-lg-2">
                  <div className="card border-0 h-100 card-special-hover">
                    <div className="card-img-wrapper position-relative overflow-hidden">
                      <Link to={`/product/${product?.id}`}>
                        <img
                          src={product?.imageUrl[0]}
                          className="card-img-top rounded-0 img-fixed-height"
                          alt={product?.title}
                        />
                        <div className="overlay d-flex justify-content-center align-items-center">
                          <span className="text-white fs-5">查看內容</span>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body p-2 pb-0 text-center">
                      <h4 className="mt-1 fw-bold mb-0 text-gray fs-s-20">
                        {product?.title}
                      </h4>
                      <p className="text-pink fs-s-20 fw-bold mb-2">
                        NT$ {product?.price?.toLocaleString()}
                      </p>
                      <button
                        type="button"
                        className="btn btn-pink w-100 rounded-0"
                        onClick={() => {
                          addToCart(product?.id);
                        }}
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
