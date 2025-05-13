import { useNavigate } from "react-router-dom";

export default function SuccessModal({
  messageData,
  orderId,
  closeSuccessModal,
}) {
  const navigate = useNavigate();
  const { success } = messageData;
  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        id="successModal"
        aria-labelledby="successModal"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm mx-auto"
          style={{ width: "200px" }}
        >
          <div className="modal-content">
            <div className="modal-body bg-white text-center">
              <p className="mb-0 fw-bold fs-1 text-success">
                <i className="bi bi-check-circle me-2"></i>
              </p>
              <div>{success ? "付款成功" : "付款失敗, 請重新確認"}</div>
              <button
                type="button"
                className="btn btn-pink p-3 my-3 rounded-0"
                onClick={() => {
                  closeSuccessModal();
                  if (success) {
                    navigate(`/orderSuccess/${orderId}`);
                  }
                }}
              >
                確認完成訂單
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
