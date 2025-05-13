import { useEffect, useState } from "react";

export default function CouponModal({
  closeCouponModal,
  onSubmit,
  tempCoupon,
  type,
  formatDate,
}) {
  const [tempData, setTempData] = useState({
    title: "",
    is_enabled: 1,
    percent: 80,
    due_date: 1555459200,
    code: "testCode",
  });

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (type === "create") {
      setTempData({
        title: "",
        is_enabled: 1,
        percent: 80,
        due_date: 1555459200,
        code: "testCode",
      });
      setDate(new Date());
    } else if (type === "edit") {
      setTempData(tempCoupon);
      setDate(new Date(tempCoupon.due_date));
    }
  }, [type, tempCoupon]);

  const handleChange = (e) => {
    const { value, name, checked } = e.target;
    if (["price", "origin_price"].includes(name)) {
      // 若 name 為 price、origin_price 就要把 value 轉成數字
      setTempData({ ...tempData, [name]: Number(value) });
    } else if (name === "is_enabled") {
      // 若 name 為 is_enabled 執行下列, + 為把 checked boolean 值轉成 0,1
      setTempData({ ...tempData, [name]: +checked });
    } else {
      setTempData({ ...tempData, [name]: value });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        id="couponModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {type === "create" ? "建立新優惠券" : `編輯 ${tempData.title}`}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeCouponModal}
              />
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label className="w-100" htmlFor="title">
                  標題 <span className="text-danger">*</span>
                  <input
                    type="text"
                    id="title"
                    placeholder="請輸入標題"
                    name="title"
                    className="form-control mt-1"
                    onChange={handleChange}
                    value={tempData.title}
                  />
                </label>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="w-100" htmlFor="percent">
                    折扣 % <span className="text-danger">*</span>
                    <input
                      type="number"
                      name="percent"
                      id="percent"
                      placeholder="請輸入折扣（%）"
                      className="form-control mt-1"
                      onChange={handleChange}
                      value={tempData.percent}
                    />
                  </label>
                </div>
                <div className="col-md-6 mb-2">
                  <label className="w-100" htmlFor="due_date">
                    到期日 <span className="text-danger">*</span>
                    <input
                      type="date"
                      id="due_date"
                      name="due_date"
                      placeholder="請輸入到期日"
                      className="form-control mt-1"
                      onChange={(e) => {
                        setDate(new Date(e.target.value));
                      }}
                      value={formatDate(date)}
                      min={formatDate(new Date())}
                    />
                  </label>
                </div>
                <div className="col-md-6 mb-2">
                  <label className="w-100" htmlFor="code">
                    優惠碼
                    <input
                      type="text"
                      id="code"
                      name="code"
                      placeholder="請輸入優惠碼"
                      className="form-control mt-1"
                      onChange={handleChange}
                      value={tempData.code}
                    />
                  </label>
                </div>
              </div>
              <label className="form-check-label" htmlFor="is_enabled">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="is_enabled"
                  name="is_enabled"
                  onChange={handleChange}
                  checked={!!tempData.is_enabled}
                />
                是否啟用
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeCouponModal}
              >
                關閉
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onSubmit(tempData, date)}
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
