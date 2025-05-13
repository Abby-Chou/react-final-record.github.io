export default function Problems() {
  return (
    <>
      <div className="min-vh-100 mb-5">
        <div
          className="p-5 mb-5"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1573050329989-9c2509328687?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            height: "500px",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="container px-3 px-md-6">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h3 className="mb-4">
                <i className="bi bi-pin-angle-fill me-2"></i>常見問題
              </h3>
              <div className="accordion" id="accordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="accordion1">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-collapseOne"
                      aria-expanded="true"
                      aria-controls="accordion-collapseOne"
                    >
                      Q: 保存期限
                    </button>
                  </h2>
                  <div
                    id="accordion-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="accordion1"
                  >
                    <div className="accordion-body">
                      <p className="d-flex">
                        <span className="me-2">A: </span>
                        <span>
                          以下為建議賞用期限, 若超過此期限恐風味變質,
                          請勿超過期限食用
                        </span>
                      </p>
                      <ul>
                        <li>鹹派冷藏保存 5 日、冷凍保存 2 週</li>
                        <li>其餘類別皆冷藏保存 2 日、冷凍保存 1 週</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="accordion2">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-collapseTwo"
                      aria-expanded="true"
                      aria-controls="accordion-collapseTwo"
                    >
                      Q: 訂購方法
                    </button>
                  </h2>
                  <div
                    id="accordion-collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="accordion2"
                  >
                    <div className="accordion-body">
                      <ul className="list-unstyled lh-lg">
                        <li>
                          <i className="bi bi-1-circle me-2"></i>
                          <span>選擇想要訂購的商品, 點選加入購物車</span>{" "}
                        </li>
                        <li className="d-flex align-items-start">
                          <i className="bi bi-2-circle me-2"></i>
                          <span>
                            確認購物車品項後若有折扣碼請確實套用，選擇送貨日期
                          </span>
                        </li>
                        <li className="d-flex align-items-start">
                          <i className="bi bi-3-circle me-2"></i>
                          可備註要求提供生日插卡、刀子、叉盤、問號蠟燭，會於出貨時一併附上
                        </li>
                        <li className="d-flex align-items-start">
                          <i className="bi bi-4-circle me-2"></i>線上成功付款後,
                          派派工房會於送貨日期前一天出貨給物流
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="accordion3">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-collapseThree"
                      aria-expanded="true"
                      aria-controls="accordion-collapseThree"
                    >
                      Q: 配送辦法
                    </button>
                  </h2>
                  <div
                    id="accordion-collapseThree"
                    className="accordion-collapse collapse show"
                    aria-labelledby="accordion3"
                  >
                    <div className="accordion-body">
                      <div className="row flex-column-reverse flex-md-row gy-4">
                        <div className="col-md-8">
                          <p>
                            A: 全店一律採用
                            <a
                              href="https://www.t-cat.com.tw/"
                              className="text-decoration-none link-secondary"
                              target="_blank"
                              rel="noreferrer"
                            >
                              黑貓宅急便
                            </a>
                            送貨
                          </p>
                          <ul className="list-unstyled">
                            <li className="d-flex">
                              <span className="text-nowrap me-2">
                                希望送貨日 :
                              </span>
                              <span>
                                只能從下單日後一周開始選擇日期, 無法指定時段
                              </span>
                            </li>
                            <li className="d-flex">
                              <span className="text-nowrap me-2">
                                配送進度 :
                              </span>
                              <span>
                                出貨後將以電子郵件通知託運單號,
                                可致電黑貓宅急便查詢
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-4">
                          <img
                            src="https://www.t-cat.com.tw/images/logo.svg"
                            alt=""
                            className="ms-auto me-2 w-100 h-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="accordion4">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion-collapseFour"
                      aria-expanded="true"
                      aria-controls="accordion-collapseFour"
                    >
                      Q: 退貨須知
                    </button>
                  </h2>
                  <div
                    id="accordion-collapseFour"
                    className="accordion-collapse collapse show"
                    aria-labelledby="accordion4"
                  >
                    <div className="accordion-body">
                      <p className="d-flex">
                        <span className="me-2">A: </span>
                        <span>
                          生鮮食品不適用消費者保護法第 19 條,
                          若無重大瑕疵不予退貨
                        </span>
                      </p>
                      <ul className="list-unstyled lh-lg">
                        <li className="d-flex">
                          <i className="bi bi-pin-angle-fill me-2"></i>
                          <span>重大瑕疵為缺件、口味錯誤、內容毀損等等</span>
                        </li>
                        <li className="d-flex">
                          <i className="bi bi-pin-angle-fill me-2"></i>
                          請於開封時錄影存證, 並且保留完整商品，不接受部分退貨
                        </li>
                        <li className="d-flex">
                          <i className="bi bi-pin-angle-fill me-2"></i>
                          <div>
                            請聯繫
                            <a
                              href="https://www.facebook.com/"
                              className="text-decoration-none link-secondary"
                              target="_blank"
                              rel="noreferrer"
                            >
                              粉絲專頁
                            </a>
                            ，提供上述內容後予以協調退貨事宜
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
