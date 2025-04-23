export default function SearchBar({
  search,
  setSearch,
  setAppliedSearch,
  onSearchSuccess,
  hideAfterSearch,
  autoFocus = false,
}) {
  const handleInput = (e) => {
    const { code, key } = e;
    if (code === "Enter" || key === "Enter") {
      handleSearch();
    } else {
      setSearch(e.target.value);
    }
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      setAppliedSearch(search);
      if (onSearchSuccess) onSearchSuccess(); // 導頁
      if (hideAfterSearch) hideAfterSearch(); // 關閉輸入欄
    }
    setSearch("");
  };

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleInput}
        placeholder="請輸入產品名"
        autoFocus={autoFocus}
      />
      <button className="btn btn-danger" onClick={handleSearch}>
        搜尋
      </button>
    </div>
  );
}
