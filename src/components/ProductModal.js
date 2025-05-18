import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductModal({
  closeProductModal,
  onSubmit,
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
    imageUrl: [],
  });

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
        imageUrl: [],
      });
    } else if (type === "edit") {
      setTempData({
        ...tempProduct,
        imageUrl: Array.isArray(tempProduct.imageUrl)
          ? tempProduct.imageUrl
          : [tempProduct.imageUrl], // 如果不是陣列，就轉成陣列
      });
    }
  }, [type, tempProduct]);

  const resetData = () => {
    if (type === "edit") {
      setTempData(tempProduct);
    }
  };

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

  const uploadFile = async (files) => {
    if (!files.length) {
      return;
    }
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file-to-upload", file);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData
      );

      return res.data.imageUrl;
    });

    const imageUrls = await Promise.all(uploadPromises);

    // 把新的圖片加到原本的 imageUrl 陣列裡
    setTempData((prevData) => ({
      ...prevData,
      imageUrl: [...prevData.imageUrl, ...imageUrls],
    }));
  };

  const removeImage = (indexToRemove) => {
    setTempData((prevData) => ({
      ...prevData,
      imageUrl: prevData.imageUrl.filter((_, index) => index !== indexToRemove),
    }));
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
                      輸入圖片網址 <span className="text-danger">*</span>
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
                        multiple
                        onChange={(e) => {
                          uploadFile(e.target.files);
                          e.target.value = "";
                        }}
                        value=""
                      />
                    </label>
                  </div>

                  <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center">
                    {tempData.imageUrl.map((url, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          width: "100px",
                          height: "100px",
                          overflow: "hidden",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                        }}
                      >
                        <img
                          src={url}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover", // 讓圖片不變形，填滿區塊
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            background: "rgba(0,0,0,0.6)",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            lineHeight: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="title">
                      標題 <span className="text-danger">*</span>
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
                        分類 <span className="text-danger">*</span>
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
                          value={tempData.origin_price.toLocaleString()}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="price">
                        售價 <span className="text-danger">*</span>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          placeholder="請輸入售價"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.price.toLocaleString()}
                        />
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="weight">
                      產品重量 <span className="text-danger">*</span>
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
                      過敏原資料 <span className="text-danger">*</span>
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
                      說明內容 <span className="text-danger">*</span>
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
                        是否啟用 <span className="text-danger">*</span>
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
                onClick={() => {
                  onSubmit(tempData);
                }}
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
