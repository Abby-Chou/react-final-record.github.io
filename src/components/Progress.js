export default function Progress({ stepItems, currentStep, width }) {
  return (
    <>
      <div className="position-relative my-5">
        {/* 橫線：放在背景，穿過圓形中間 */}
        <div
          className="position-absolute bg-light"
          style={{
            top: "1.1rem",
            left: "12.5%", // 第一顆與第二顆之間
            width: "75%", // 扣掉最左與最右的 12.5%
            height: "2px",
            zIndex: 0,
          }}
        ></div>
        <div
          className="position-absolute bg-warning"
          style={{
            top: "1.1rem",
            left: "12.5%", // 對齊起點
            width: width, // 例如 "12%", "40%", "65%" 等從外部傳入
            height: "2px",
            zIndex: 1,
            transition: "width 0.3s",
          }}
        ></div>
        {/* 進度條本體（用 flex 平均分配） */}
        <div
          className="d-flex justify-content-between position-relative"
          style={{ zIndex: 1 }}
        >
          {stepItems.map((item) => {
            return (
              <div
                className="d-flex flex-column align-items-center"
                style={{ width: "25%" }}
                key={item.step}
              >
                <button
                  type="button"
                  className={`btn btn-sm ${
                    item.step <= currentStep ? "btn-warning" : "btn-secondary"
                  } rounded-pill pe-none`}
                  style={{ width: "2rem", height: "2rem" }}
                >
                  {item.step}
                </button>
                <span
                  className={`mt-1 small text-nowrap ${
                    item.step <= currentStep ? "" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
