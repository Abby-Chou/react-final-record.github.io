import discount from "../assets/discount.png";
import discountRight from "../assets/discount-right.png";
import { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";

export default function DiscountModal() {
  const discountModal = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    discountModal.current = new Modal("#discountModal", {
      backdrop: "true",
      keyboard: true,
    });
    discountModal.current.show();
  }, []);
  return (
    <>
      <div
        className="modal fade discount-modal"
        tabIndex="-1"
        id="discountModal"
        aria-labelledby="discountModal"
      >
        <div className="modal-dialog modal-dialog-centered  mx-auto">
          <div className="modal-content">
            <div className="modal-body bg-white text-center">
              <div className="mb-0 fw-bold text-pink">
                <img
                  src={discount}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                  className="me-2"
                />
                <span className="fs-3">現時首購優惠</span>
                <img
                  src={discountRight}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                  className="ms-2"
                />
                <div className="fs-5 p-3">
                  全館 8 折 ! 結帳時輸入折扣碼 P2025{" "}
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
                      } text-pink`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
