import { useForm } from "react-hook-form";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { Input, InputDate } from "../../components/FormElements";
import Progress from "../../components/Progress";
import { OrderContext } from "../../store/messageStore";
import { useContext, useEffect } from "react";

const currentStep = 2;
const width = "25%";

export default function Checkout() {
  const { cartData, stepItems, shippingFee } = useOutletContext();

  const { setOrderInfo } = useContext(OrderContext); // 使用 setOrderInfo 暫存表單資料
  const navigate = useNavigate();

  const minWishDate = new Date();
  minWishDate.setDate(minWishDate.getDate() + 7);
  const minWishDateStr = minWishDate.toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // 改為暫存資料並導頁
  const handleCheckoutSubmit = (data) => {
    const orderPayload = {
      user: {
        name: data.name,
        email: data.email,
        tel: data.tel,
        address: data.address,
        wishDate: data.wishDate,
      },
      message: "未發貨",
    };
    setOrderInfo(orderPayload);
    navigate("/payments");
  };

  useEffect(() => {
    if (cartData.carts.length === 0) {
      navigate("/");
    }
  }, [cartData, navigate]);

  return (
    <>
      <div className="container px-4">
        <div className="row justify-content-center">
          <div className="col-md-6 pt-2">
            <Progress
              stepItems={stepItems}
              currentStep={currentStep}
              width={width}
            />
          </div>
          <div className="row justify-content-center flex-md-row flex-column-reverse bg-light py-5 mb-5">
            <form
              className="col-md-6"
              onSubmit={handleSubmit(handleCheckoutSubmit)}
            >
              <div className="bg-white p-4">
                <h4 className="fw-bold mb-4">外送資料</h4>

                <div className="mb-2">
                  <Input
                    id="email"
                    labelText="信箱"
                    type="email"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "信箱為必填",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "信箱格式不正確",
                      },
                    }}
                  />
                </div>

                <div className="mb-2">
                  <Input
                    id="name"
                    type="text"
                    errors={errors}
                    labelText="姓名"
                    register={register}
                    rules={{
                      required: "姓名為必填",
                      maxLength: {
                        value: 10,
                        message: "使用者名稱長度不超過 10",
                      },
                    }}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    id="tel"
                    labelText="電話"
                    type="tel"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "電話為必填",
                      minLength: {
                        value: 6,
                        message: "電話不少於 6 碼",
                      },
                      maxLength: {
                        value: 12,
                        message: "電話不超過 12 碼",
                      },
                    }}
                  />
                </div>
                <div className="mb-2">
                  <Input
                    id="address"
                    labelText="送貨地址"
                    type="address"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "送貨地址為必填",
                    }}
                  />
                </div>
                <div className="mb-2 pb-3">
                  <InputDate
                    id="wishDate"
                    type="date"
                    labelText="希望配送日期"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "希望配送日期為必填",
                      validate: (value) => {
                        return (
                          value >= minWishDateStr ||
                          `日期不可早於 ${minWishDateStr}`
                        );
                      },
                    }}
                    placeholder=""
                    defaultValue={minWishDateStr}
                    min={minWishDateStr}
                  />
                </div>
              </div>

              <div className="d-flex my-4 justify-content-between align-items-md-center w-100">
                <Link
                  to="/products"
                  className="link-dark mt-md-0 mt-3 text-decoration-none fw-bold fs-5"
                >
                  <i className="bi bi-caret-left-fill"></i> 繼續點餐
                </Link>
                <button
                  type="submit"
                  className="btn btn-pink py-3 px-5 rounded-0 fs-5"
                >
                  前往結帳
                </button>
              </div>
            </form>

            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="mb-4">選購餐點</h4>
                {cartData?.carts?.map((item) => (
                  <div className="d-flex mb-2" key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="me-2"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{item.product.title}</p>
                        <p className="mb-0">x{item.qty}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          <small>
                            NT$ {item.product.price.toLocaleString()}
                          </small>
                        </p>
                        <p className="mb-0">
                          NT$ {item.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <table className="table mt-3 text-muted table-light">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-0 font-weight-normal"
                      >
                        小計
                      </th>
                      <td className="text-end border-0 px-0 pt-0">
                        NT$ {cartData.total.toLocaleString()}
                      </td>
                    </tr>
                    <tr
                      className={
                        cartData.final_total !== cartData.total
                          ? "d-table-row"
                          : "d-none"
                      }
                    >
                      <th
                        scope="row"
                        className="border-0 px-0 pt-3 font-weight-normal me-auto"
                      >
                        折抵後金額<span className="text-success">(已折抵)</span>
                      </th>
                      <td className="text-end border-0 px-0 pt-3 text-success">
                        NT$ {cartData.final_total.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-0 font-weight-normal"
                      >
                        宅配運費
                      </th>
                      <td className="text-end border-0 px-0 pt-0">
                        NT$ {shippingFee.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-3">
                  <p className="mb-0 h4 fw-bold">總金額</p>
                  <p className="mb-0 h4 fw-bold">
                    NT$ {(cartData.final_total + shippingFee).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
