import discount from "../assets/discount.png";
import discountRight from "../assets/discount-right.png";
import { useRef, useEffect } from "react";
import { Modal } from "bootstrap";

export default function DiscountModal() {
  const discountModal = useRef(null);

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
              <p className="mb-0 fw-bold text-pink">
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
                <div className="fs-5">
                  全館 8 折 ! 結帳時輸入折扣碼 P2025{" "}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("P2025");
                    }}
                    className="btn btn-link p-0 ms-1 mt-n3 text-decoration-none"
                    title="複製折扣碼"
                  >
                    <i className="bi bi-copy text-pink"></i>
                  </button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
