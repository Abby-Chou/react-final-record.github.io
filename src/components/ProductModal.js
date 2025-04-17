import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  MessageContext,
  handleFailMessage,
  handleSuccessMessage,
} from "../store/messageStore";

export default function ProductModal({
  closeProductModal,
  getProducts,
  tempProduct,
  type,
}) {
  const [tempData, setTempData] = useState({
    title: "",
    category: "",
    origin_price: 100,
    price: 300,
    unit: "",
    weight: "",
    allergin: "",
    content: "",
    is_enabled: 0,
    imageUrl: "",
  });

  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    if (type === "create") {
      setTempData({
        title: "",
        category: "",
        origin_price: 100,
        price: 300,
        unit: "",
        weight: "",
        allergin: "",
        content: "",
        is_enabled: 0,
        imageUrl: "",
      });
    } else if (type === "edit") {
      setTempData(tempProduct);
    }
  }, [type, tempProduct]);

  const resetData = () => {
    if (type === "edit") {
      setTempData(tempProduct);
    }
  };

  const handleChange = (e) => {
    // console.log(e);
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

  const submit = async () => {
    try {
      // 送出資料為物件時, 必須帶上 data
      let api = `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = "post"; // 預設是走新增 sumbit
      if (type === "edit") {
        // 當 tpye = edit 時, 變成修改編輯的 sumbit
        api = `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
        method = "put";
      }
      const res = await axios[method](api, {
        data: tempData,
      });
      // console.log(res);
      if (res.data.success) {
        handleSuccessMessage(dispatch, res);
      } else {
        handleFailMessage(dispatch, res);
      }

      closeProductModal(); // 關掉 Modal
      getProducts(); // 重新發出 API request
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async (file) => {
    console.log(file);
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file-to-upload", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData
      );
      // console.log(res);
      const { imageUrl } = res.data;

      setTempData({ ...tempData, imageUrl: imageUrl });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        id="productModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {type === "create"
                  ? "建立新商品"
                  : `編輯產品 - ${tempData.title}`}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeProductModal}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="image">
                      輸入圖片網址
                      <input
                        type="text"
                        name="imageUrl"
                        id="image"
                        placeholder="請輸入圖片連結"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.imageUrl}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="customFile">
                      或 上傳圖片
                      <input
                        type="file"
                        id="customFile"
                        className="form-control"
                        name="imageUrl"
                        onChange={(e) => {
                          uploadFile(e.target.files[0]);
                        }}
                        value=""
                      />
                    </label>
                  </div>

                  <img
                    src={tempData.imageUrl || null}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col-sm-8">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="title">
                      標題
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="請輸入標題"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.title}
                      />
                    </label>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="category">
                        分類
                        <input
                          type="text"
                          id="category"
                          name="category"
                          placeholder="請輸入分類"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.category}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="unit">
                        單位
                        <input
                          type="unit"
                          id="unit"
                          name="unit"
                          placeholder="請輸入單位"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.unit}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="origin_price">
                        原價
                        <input
                          type="number"
                          id="origin_price"
                          name="origin_price"
                          placeholder="請輸入原價"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.origin_price}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="price">
                        售價
                        <input
                          type="number"
                          id="price"
                          name="price"
                          placeholder="請輸入售價"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.price}
                        />
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="weight">
                      產品重量
                      <textarea
                        type="text"
                        id="weight"
                        name="weight"
                        placeholder="請輸入產品重量"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.weight}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="allergin">
                      過敏原資料
                      <textarea
                        type="text"
                        id="allergin"
                        name="allergin"
                        placeholder="請輸入產品描述"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.allergin}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="content">
                      說明內容
                      <textarea
                        type="text"
                        id="content"
                        name="content"
                        placeholder="請輸入產品說明內容"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.content}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <div className="form-check">
                      <label
                        className="w-100 form-check-label"
                        htmlFor="is_enabled"
                      >
                        是否啟用
                        <input
                          type="checkbox"
                          id="is_enabled"
                          name="is_enabled"
                          placeholder="請輸入產品說明內容"
                          className="form-check-input"
                          onChange={handleChange}
                          checked={!!tempData.is_enabled}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  closeProductModal();
                  resetData();
                }}
              >
                關閉
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submit}
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
