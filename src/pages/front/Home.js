import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link, useOutletContext } from "react-router-dom";

import pie from "../../assets/apple-pie.png";
import cake from "../../assets/cake.png";
import doughnut from "../../assets/doughnut.png";
import dessert from "../../assets/dessert.png";
import subscribe from "../../assets/subscribe.png";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const comments = [
  {
    avatar:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "奶香非常濃郁，但一點也不膩口，蛋糕體濕潤柔軟、帶有淡淡咖啡香，和上層微苦的可可粉搭配得剛剛好 ~",
    title: "提拉米蘇",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "南瓜派真的很好吃！是經典的美式口味，感恩節必吃甜點。",
    title: "南瓜派",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhdHxlbnwwfDB8MHx8fDA%3D",
    text: "很常吃派派工房的甜派，某次吃了他家肉派就回不去了！已經變成家中必備冷凍食品。",
    title: "牛肉派",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "芋頭奶油派超療癒！綿密的口感和奶香太搭了～",
    title: "芋頭波士頓派",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "最近愛上檸檬塔，酸甜平衡得很好，超推薦！",
    title: "檸檬塔",
  },
];

export default function Home() {
  const { products, addToCart } = useOutletContext();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 2000, // 動畫時間（毫秒）
      once: true, // 只動畫一次
    });
  }, []);

  return (
    <>
      {/* banner */}
      <div className="container">
        <div
          className="px-5 py-8 p-lg-8 text-white"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1670843635865-8e05b729e0fe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundPosition: "center",
            height: "420px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)", // 透明黑底
              padding: "2rem",
              width: "fit-content",
            }}
          >
            <h1 className="fs-2 mb-44">限時首購優惠</h1>
            <h2 className="fs-5 mb-2">全館 8 折 </h2>
            <h2 className="fs-5">
              只要輸入折扣碼 P2025{" "}
              <button
                onClick={() => {
                  navigator.clipboard.writeText("P2025");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="btn btn-link p-0 ms-1 mt-n2 text-decoration-none"
                title="複製折扣碼"
              >
                <i
                  className={`${
                    copied ? "bi bi-check-lg" : "bi bi-copy"
                  } text-white`}
                ></i>
              </button>
            </h2>
            <Link
              to="/products/allProducts"
              className="btn btn-pink px-4 py-2 mt-44 rounded-0 fs-5"
            >
              點我看甜點
            </Link>
          </div>
        </div>
        <hr />
      </div>

      {/* products categories */}
      <div className="container p-4">
        <h2 className="text-center text-gray">產品分類</h2>
        <div className="row row-cols-2 row-cols-lg-4 mt-4 mt-lg-44 justify-content-center gy-3">
          <div className="col d-flex justify-content-center">
            <Link
              to="/products/allProducts"
              className="text-decoration-none category-img"
            >
              <img
                src={dessert}
                alt=""
                style={{ height: "70px", width: "70px" }}
                className="mb-2"
              />
              <div className="text-pink fs-5 fw-bold ms-n1">全部產品</div>
            </Link>
          </div>
          <div className="col d-flex justify-content-center">
            <Link className="mt-1 text-decoration-none category-img">
              <img
                src={cake}
                alt=""
                style={{ height: "65px", width: "65px" }}
                className="mb-2"
              />
              <div className="text-pink fs-5 fw-bold ms-n1">經典蛋糕</div>
            </Link>
          </div>
          <div className="col d-flex justify-content-center">
            <Link
              to="/products/pies"
              className="text-decoration-none category-img"
            >
              <img
                src={pie}
                alt=""
                className="mb-2"
                style={{ height: "80px", width: "80px" }}
              />
              <div
                className="text-pink fs-5 fw-bold"
                style={{ marginTop: "-11px" }}
              >
                特色派類
              </div>
            </Link>
          </div>
          <div className="col d-flex justify-content-center">
            <Link
              to="/products/doughnuts"
              className="text-decoration-none category-img"
            >
              <img
                src={doughnut}
                alt=""
                style={{ height: "68px", width: "68px" }}
                className="mt-2 mb-2"
              />
              <div className="text-pink fs-5 fw-bold mt-n2">甜甜圈類</div>
            </Link>
          </div>
        </div>
      </div>

      {/* introduce */}
      <div className="container bg-white mb-3">
        {/* 介紹圖一 */}
        <div className="row justify-content-center mt-3 px-5 pt-3 pb-4 gy-4">
          <div className="col-md-5" data-aos="fade-right">
            <img
              className="w-100 h-auto"
              src="https://plus.unsplash.com/premium_photo-1730150340972-3288f06e1403?q=80&w=1466&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div
            className="col-md-5 d-flex justify-content-center align-items-center"
            data-aos="fade-left"
          >
            <div className="text-center">
              <h2 className="fs-s-20 text-pink text-nowrap mb-4">
                用心復刻經典美味
              </h2>
              <p>派派工房希望顧客們都能品嘗到經典美味</p>
              <p>選用新鮮食材、道地香料製成</p>
              <p>復刻人們心中懷念的滋味</p>
              <img
                src={pie}
                alt=""
                style={{ width: "25px", height: "25px" }}
                className="me-1"
              />
              <img
                src={pie}
                alt=""
                style={{ width: "25px", height: "25px" }}
                className="me-1"
              />
              <img src={pie} alt="" style={{ width: "25px", height: "25px" }} />
            </div>
          </div>
        </div>
        {/* 介紹圖二 */}
        <div className="row justify-content-center flex-md-row-reverse px-5 py-3 gy-4">
          <div className="col-md-5" data-aos="fade-left" data-aos-delay="300">
            <img
              className="w-100 h-auto"
              src="https://images.unsplash.com/photo-1543876604-b8ac0e7ded00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div
            className="col-md-5 d-flex justify-content-center align-items-center"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="text-center">
              <h2 className="fs-s-20 text-pink text-nowrap mb-4">
                堅持手工創造童年回憶
              </h2>
              <p>最棒的甜點是永遠忘不了的滋味</p>
              <p>用簡單的甜點為節慶增添風味</p>
              <p>打造夢幻點心日記</p>
              <img
                src={pie}
                alt=""
                style={{ width: "25px", height: "25px" }}
                className="me-1"
              />
              <img
                src={pie}
                alt=""
                style={{ width: "25px", height: "25px" }}
                className="me-1"
              />
              <img src={pie} alt="" style={{ width: "25px", height: "25px" }} />
            </div>
          </div>
        </div>
        <hr />
      </div>

      {/* recommendation */}
      <div className="container">
        <div className="p-4 pb-0 text-center text-gray ">
          <h2 className="mb-2">熱門推薦</h2>
          <p className="mb-0">不知道要吃什麼嗎? 來看看大家評論吧 ~</p>
        </div>
        <div className="mb-lg-4 bg-white p-4 pb-0 d-flex justify-content-center">
          <div className="row bg-white justify-content-center p-4 pb-0 gy-2">
            {/* customer's comments */}
            <div className="col-12 col-lg-4 d-flex align-items-center">
              <Swiper
                direction="vertical"
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Autoplay]}
                spaceBetween={20}
                breakpoints={{
                  0: { slidesPerView: 1 }, // 手機顯示 1 則
                  768: { slidesPerView: 2 }, // 平板顯示 2 則
                }}
                className="comments-swiper"
              >
                {comments.map((comment, index) => (
                  <SwiperSlide key={index}>
                    <div className="d-flex mb-1 justify-content-center">
                      <img
                        src={comment.avatar}
                        alt=""
                        style={{ width: "70px", height: "70px" }}
                        className="me-2 mt-3 object-fit-cover rounded-circle"
                      />
                      <div className="ms-2 chat-bubble text-secondary">
                        <p className="mb-0 fw-bold">{comment.text}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* hot products */}
            <div className="col-lg-8">
              <div className="row">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={10}
                  loop={true}
                  autoplay={{ delay: 5000 }}
                  modules={[Autoplay]}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                  }}
                  className="product-swiper"
                >
                  {comments.map((comment, index) => {
                    const product = products.find((product) =>
                      product.title.includes(comment.title)
                    );
                    return (
                      <SwiperSlide key={index} className="px-lg-2">
                        {product && (
                          <div className="card border-0 mb-lg-2 h-100 card-special-hover">
                            <div className="card-img-wrapper position-relative overflow-hidden">
                              <Link to={`/product/${product.id}`}>
                                <img
                                  src={product.imageUrl[0]}
                                  className="card-img-top rounded-0 img-fixed-height"
                                  alt={product.title}
                                />
                                <div className="overlay d-flex justify-content-center align-items-center">
                                  <span className="text-white fs-5">
                                    查看內容
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <div className="card-body p-2 pb-0 text-center">
                              <h4 className="mt-1 fw-bold mb-0 text-gray fs-s-20">
                                {product.title}
                              </h4>
                              <p className="text-pink fs-s-20 fw-bold mb-2">
                                NT$ {product.price.toLocaleString()}
                              </p>
                              <button
                                type="button"
                                className="btn btn-pink w-100 rounded-0"
                                onClick={() => {
                                  addToCart(product.id);
                                }}
                              >
                                加入購物車
                              </button>
                            </div>
                          </div>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subscribe */}

      <div className="container mb-4">
        <hr />
        <div
          style={{
            backgroundImage: `url(${subscribe})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "80px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#333" }}>
              想及時掌握最新優惠嗎？
            </h3>
            <p style={{ marginBottom: "20px", color: "#666" }}>
              訂閱我們的電子報吧！
            </p>
            <div className="input-group">
              <input
                type="email"
                placeholder="請輸入 Email ..."
                className="form-control"
              />
              <button
                type="button"
                className="btn text-white"
                style={{
                  backgroundColor: "#F1916D",
                  padding: "10px 20px",
                }}
              >
                訂閱
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
