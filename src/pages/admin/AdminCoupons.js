import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CouponModal from "../../components/CouponModal";
import { Modal } from "bootstrap";
import DeleteModal from "../../components/DeleteModal";
import AdminPagination from "../../components/AdminPagination";
import { useLoading } from "../../components/LoadingContext";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const { setIsLoading } = useLoading();

  // type: 決定 modal 展開的用途
  const [type, setType] = useState("create"); // edit
  const [tempCoupon, setTempCoupon] = useState({});

  const couponModal = useRef(null);
  const deleteModal = useRef(null);

  const getCoupons = async (page = 1) => {
    setIsLoading(true);
    const couponRes = await axios.get(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );

    setCoupons(couponRes.data.coupons);
    setPagination(couponRes.data.pagination);
    setIsLoading(false);
  };

  const handleSubmit = async (data, date) => {
    setIsLoading(true);
    let api = `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
    let method = "post";
    if (type === "edit") {
      api = `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
      method = "put";
    }
    await axios[method](api, {
      data: {
        ...data,
        due_date: date.getTime(),
      },
    });
    closeCouponModal();
    getCoupons();
    setIsLoading(false);
  };

  const openDeleteModal = (thisCoupon) => {
    setTempCoupon(thisCoupon);
    deleteModal.current.show();
  };

  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  const openCouponModal = (openCouponType, openCoupon) => {
    setType(openCouponType);
    setTempCoupon(openCoupon);
    couponModal.current.show();
  };

  const closeCouponModal = () => {
    couponModal.current.hide();
  };

  const deleteCoupon = async (id) => {
    setIsLoading(true);

    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
    );

    if (res.data.success) {
      getCoupons();
      closeDeleteModal();
    }
    setIsLoading(false);
  };

  const formatDate = (date) => {
    return `${date.getFullYear().toString()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
  };

  useEffect(() => {
    // 取出之前登入過的 Token
    couponModal.current = new Modal("#couponModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });

    getCoupons();
  }, []);
  return (
    <>
      <div className="p-3">
        <CouponModal
          closeCouponModal={closeCouponModal}
          tempCoupon={tempCoupon}
          type={type}
          formatDate={formatDate}
          onSubmit={handleSubmit}
        />
        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          text={tempCoupon.title}
          handleDelete={deleteCoupon}
          id={tempCoupon.id}
        />
        <h3>優惠券列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => openCouponModal("create", {})}
          >
            建立新優惠券
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">標題</th>
              <th scope="col">折扣 %</th>
              <th scope="col">到期日</th>
              <th scope="col">優惠碼</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => {
              return (
                <tr key={coupon.id}>
                  <td>{coupon.title}</td>
                  <td> {coupon.percent} %</td>
                  <td>{formatDate(new Date(coupon.due_date))}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.is_enabled ? "啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-pink btn-sm"
                      onClick={() => openCouponModal("edit", coupon)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-red fw-bold btn-sm ms-2"
                      onClick={() => openDeleteModal(coupon)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <AdminPagination pagination={pagination} changePage={getCoupons} />
      </div>
    </>
  );
}
