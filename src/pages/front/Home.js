import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Link, useOutletContext } from "react-router-dom";
import { useLoading } from "../../components/LoadingContext";
import { CouponContext } from "../../components/CouponProvider";
import pie from "../../assets/apple-pie.png";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import axios from "axios";

export default function Home() {
  const comments = [
    {
      avatar:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "喜歡義式提拉米蘇的人一定要試試看！酒味不會太濃也不會太淡，吃起來非常剛好～",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "南瓜派真的很好吃！是經典的美式口味，感恩節必吃甜點。",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhdHxlbnwwfDB8MHx8fDA%3D",
      text: "很常吃派派工房的甜派，某次吃了他家肉派就回不去了！已經變成家中必備冷凍食品。",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "芋頭奶油派超療癒！綿密的口感和奶香太搭了～",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "最近愛上檸檬塔，酸甜平衡得很好，超推薦！",
    },
  ];

  const { products, getCart } = useOutletContext();
  // console.log("產品", products);

  const { appliedCoupon } = useContext(CouponContext);
  const { setIsLoading } = useLoading();

  const addToCart = async (id) => {
    const data = {
      data: {
        product_id: id,
        qty: 1,
      },
    };
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      // console.log("加入購物車成功");

      await getCart(); // 第一次更新購物車

      if (appliedCoupon) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
          {
            data: { code: appliedCoupon },
          }
        );
        // console.log("自動重新套用優惠碼成功");
        await getCart(); // 第二次更新購物車（拿到 final_total）
      }
    } catch (error) {
      console.error("加入購物車或套用優惠碼失敗", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    Aos.init({
      duration: 2000, // 動畫時間（毫秒）
      once: true, // 只動畫一次
    });
  }, []);

  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        effect="fade"
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1650917331384-1fd06afa3230?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 object-fit-cover"
              style={{ height: "660px" }}
              alt=""
            />
            <div
              className="carousel-caption text-white d-flex align-items-start justify-content-end gap-3"
              style={{ position: "absolute", top: "10%", right: "20px" }}
            >
              <h1 className="vertical-text mt-8">為佳節增添風味</h1>
              <h1 className="vertical-text mt-5">就在派派工房</h1>
              <h1 className="vertical-text">經典派皮甜點, </h1>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1613574471680-02c1f7c31056?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 object-fit-cover"
              style={{ height: "660px" }}
              alt=""
            />
            <div
              className="carousel-caption text-white d-flex align-items-start justify-content-end gap-3"
              style={{ position: "absolute", top: "10%", right: "20px" }}
            >
              <h1 className="vertical-text mt-8">為佳節增添風味</h1>
              <h1 className="vertical-text mt-5">就在派派工房</h1>
              <h1 className="vertical-text">經典派皮甜點, </h1>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={{ position: "relative" }}>
            <img
              src="https://plus.unsplash.com/premium_photo-1695920424093-841f4357a2f2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 object-fit-cover"
              style={{ height: "660px" }}
              alt=""
            />
            <div
              className="carousel-caption text-dark d-flex align-items-start justify-content-end gap-3"
              style={{ position: "absolute", top: "10%", right: "20px" }}
            >
              <h1 className="vertical-text mt-8">為佳節增添風味</h1>
              <h1 className="vertical-text mt-5">就在派派工房</h1>
              <h1 className="vertical-text">經典派皮甜點, </h1>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1615837197154-2e801f4bd294?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 object-fit-cover"
              style={{ height: "660px" }}
              alt=""
            />
            <div
              className="carousel-caption text-white d-flex align-items-start justify-content-end gap-3"
              style={{ position: "absolute", top: "10%", right: "20px" }}
            >
              <h1 className="vertical-text mt-8">為佳節增添風味</h1>
              <h1 className="vertical-text mt-5">就在派派工房</h1>
              <h1 className="vertical-text">經典派皮甜點, </h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="container bg-white mb-4">
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
              <h2 className="fs-s-20 text-secondary text-nowrap">
                ‘‘用心復刻經典美味’’
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
        <div className="row justify-content-center flex-md-row-reverse  px-5 pt-3 pb-2 gy-4">
          <div className="col-md-5" data-aos="fade-left" data-aos-delay="300">
            <img
              className="w-100 h-auto"
              src="https://images.unsplash.com/photo-1426869884541-df7117556757?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div
            className="col-md-5 d-flex justify-content-center align-items-center"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="text-center">
              <h2 className="fs-s-20 text-secondary text-nowrap">
                ‘‘堅持手工創造童年回憶’’
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
      </div>

      <div
        className="arrow-section p-3"
        data-aos="fade-right"
        data-aos-delay="500"
      >
        <h2 className="text-center mb-0">熱門推薦</h2>
      </div>
      <div className="mb-lg-4 bg-white p-4 pb-0 d-flex justify-content-center">
        <div className="row bg-white justify-content-center p-4 pb-0 gy-3">
          <div className="col-12 col-lg-4">
            <Swiper
              direction="vertical"
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              modules={[Autoplay]}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 }, // 手機顯示 1 則
                768: { slidesPerView: 2 }, // 平板顯示 2 則
                992: { slidesPerView: 3 }, // 桌機顯示 3 則
              }}
              className="commets-swiper"
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
                  992: { slidesPerView: 3 },
                }}
                className="product-swiper"
              >
                {[
                  products[4],
                  products[6],
                  products[10],
                  products[13],
                  products[7],
                ].map((product, index) => (
                  <SwiperSlide key={index} className="px-lg-2">
                    <div className="card border-0 mb-lg-2 h-100 card-special-hover">
                      <div className="card-img-wrapper position-relative overflow-hidden">
                        <Link to={`/product/${product?.id}`}>
                          <img
                            src={product?.imageUrl}
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
                          NT$ {product?.price}
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
    </>
  );
}
