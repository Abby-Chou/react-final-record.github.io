export default function DeleteModal({
  closeDeleteModal,
  text,
  handleDelete,
  id,
}) {
  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        id="deleteOrderModal"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger">
              <h1
                className="modal-title text-white fs-5"
                id="exampleModalLabel"
              >
                刪除確認
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeDeleteModal}
              />
            </div>
            <div className="modal-body">
              <p className="mb-0">是否刪除訂單 {text}</p>
              <p className="mb-0 text-red">(刪除後無法復原!)</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeDeleteModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
