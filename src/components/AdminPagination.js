// 因為 admin API 有些沒有全部的資料, 而是只有分頁資料, 因此另做一個 AdminPagination

export default function AdminPagination({ pagination, changePage }) {
  return (
    <>
      <nav aria-label="Page navigation">
        <ul
          className={`list-inline ${pagination.total_pages === 1 && "d-none"}`}
        >
          <li className="list-inline-item">
            <a
              className={`page-link ${pagination.has_pre ? "" : "disabled"}`}
              href="#"
              aria-label="Previous"
              onClick={(e) => {
                e.preventDefault();
                changePage(pagination.current_page - 1);
              }}
            >
              <i className="bi bi-caret-left-fill text-dark"></i>
            </a>
          </li>
          {[...new Array(pagination.total_pages)].map((_, i) => {
            return (
              <li className="list-inline-item" key={i}>
                <a
                  className={`page-link ${
                    i + 1 === pagination.current_page && "active"
                  }`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    changePage(i + 1);
                  }}
                >
                  {i + 1}
                </a>
              </li>
            );
          })}

          <li className="list-inline-item">
            <a
              className={`page-link ${pagination.has_next ? "" : "disabled"}`}
              href="#"
              aria-label="Next"
              onClick={(e) => {
                e.preventDefault();
                changePage(pagination.current_page + 1);
              }}
            >
              <i className="bi bi-caret-right-fill text-dark"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
