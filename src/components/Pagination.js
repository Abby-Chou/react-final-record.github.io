export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  changePage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // console.log(currentPage);
  if (totalPages <= 1) return null;

  return (
    <nav>
      <ul className="list-inline">
        <li
          className={`list-inline-item ${currentPage === 1 ? "disabled" : ""}`}
        >
          <button
            className="btn btn-link p-0 border-0"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            <i className="bi bi-caret-left-fill text-dark"></i>
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            className={`list-inline-item ${
              currentPage === i + 1 ? "link-dark" : "link-secondary"
            }`}
          >
            <a type="button" onClick={() => changePage(i + 1)}>
              {i + 1}
            </a>
          </li>
        ))}
        <li
          className={`list-inline-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="btn btn-link p-0 border-0"
            onClick={() => changePage(currentPage + 1)}
          >
            <i className="bi bi-caret-right-fill text-dark"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
