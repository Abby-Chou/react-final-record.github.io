import Progress from "../../components/Progress";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputCredit, Input, InputExp } from "../../components/FormElements";
import { useContext, useState, useRef, useEffect } from "react";
import { Modal } from "bootstrap";
import { OrderContext } from "../../store/messageStore";
import SuccessModal from "../../components/SuccessModal";
import axios from "axios";

const currentStep = 3;
const width = "50%";

export default function Payments() {
  const [messageData, setMessageData] = useState("");
  const successModal = useRef(null);
  const { cartData, stepItems } = useOutletContext();

  const navigate = useNavigate();

  const { orderInfo, setOrderId, orderId } = useContext(OrderContext); //  取得配送資料 & 設定 orderId

  const year = new Date().getFullYear(); // 2025
  const shortYear = year % 100;

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const paySubmit = async (paymentData) => {
    try {
      if (!orderInfo) {
        alert("找不到配送資料，請回上一步重新填寫");
        navigate("/checkout");
        return;
      }

      // 建立訂單資料：把配送資料包在 order 內
      const orderData = {
        data: orderInfo,
      };

      const orderRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        orderData
      );

      const orderId = orderRes?.data?.orderId;
      setOrderId(orderId); // 儲存 orderId 到 context

      //  再進行付款請求
      const payRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/pay/${orderId}`
      );

      setMessageData(payRes.data);
      openSuccessModal();
    } catch (error) {
      alert("付款失敗，請稍後再試！");
    }
  };

  useEffect(() => {
    successModal.current = new Modal("#successModal", {
      backdrop: "static",
    });
  }, []);

  useEffect(() => {
    if (cartData.carts.length === 0) {
      navigate("/");
    }
  }, [cartData, navigate]);

  const openSuccessModal = () => {
    successModal.current.show();
  };

  const closeSuccessModal = () => {
    successModal.current.hide();
  };

  return (
    <>
      <SuccessModal
        messageData={messageData}
        orderId={orderId}
        closeSuccessModal={closeSuccessModal}
      />

      <div className="container px-4">
        <div className="row justify-content-center">
          <div className="col-md-6 pt-2">
            <Progress
              stepItems={stepItems}
              currentStep={currentStep}
              width={width}
            />
          </div>
          <div className="row justify-content-center flex-md-row flex-column-reverse px-2">
            <div className="col-md-6 bg-white">
              <h4 className="fw-bold">付款資訊</h4>
              <form className="mb-2" onSubmit={handleSubmit(paySubmit)}>
                <div className="pt-2 input-group">
                  <InputCredit
                    id="creditNumber"
                    labelText="信用卡卡號"
                    type="tel"
                    inputmode="numeric"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "卡號為必填",
                      minLength: {
                        value: 16,
                        message: "卡號不少於 16 碼",
                      },
                      maxLength: {
                        value: 16,
                        message: "卡號不超過 16 碼",
                      },
                    }}
                  />
                </div>
                <div className="pt-2">
                  <Input
                    id="name"
                    type="text"
                    errors={errors}
                    labelText="持卡人姓名"
                    register={register}
                    rules={{
                      required: "姓名為必填",
                    }}
                  />
                </div>

                <div className="pt-2">
                  <InputExp
                    id="creditExp"
                    type="tel"
                    errors={errors}
                    labelText="有效期"
                    inputmode="numeric"
                    register={register}
                    placeholder1="MM"
                    placeholder2="YY"
                    setValue={setValue}
                    trigger={trigger}
                    rules1={{
                      required: "月份為必填",
                      pattern: {
                        value: /[0-9]{2}/,
                        message: "請輸入月份",
                      },
                      max: {
                        value: 12,
                        message: "請輸入正確月份",
                      },
                    }}
                    rules2={{
                      required: "年份為必填",
                      pattern: {
                        value: /[0-9]{2}/,
                        message: "請輸入年份",
                      },
                      min: {
                        value: shortYear,
                        message: "請輸入正確年份",
                      },
                    }}
                  />
                </div>
                <div className="pt-2">
                  <Input
                    id="securityNumber"
                    labelText="安全碼"
                    type="tel"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "安全碼為必填",
                      minLength: {
                        value: 3,
                        message: "安全碼不少於 3 碼",
                      },
                      maxLength: {
                        value: 3,
                        message: "安全碼不超過 3 碼",
                      },
                    }}
                  />
                </div>
                <div className="d-flex justify-content-end mt-2">
                  <button
                    className="btn btn-pink fs-5 py-3 px-5 my-3 rounded-0"
                    type="submit"
                  >
                    完成
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
