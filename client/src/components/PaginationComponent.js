import { useMemo, useCallback } from "react";
const PaginationComponent = ({
  currentPage,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
  totalFileCount,
}) => {
  const handleChange = (e) => {
    console.log(e);
    setRowsPerPage(Number.parseInt(e.target.value));
    setCurrentPage(1);
  };
  const totalPages = useMemo(
    () => Math.ceil(totalFileCount / rowsPerPage),
    [totalFileCount, rowsPerPage]
  );
  const getPagesJsx = () => {
    const totalPages = Math.ceil(totalFileCount / rowsPerPage);
    let i = 1;
    const jsx = [];
    while (i <= totalPages) {
      jsx.push(i);
      i++;
    }
    return jsx.map((page) => (
      <div
        key={page * page}
        onClick={() => setCurrentPage(page)}
        style={{
          cursor: "pointer",
          fontWeight: page === currentPage ? 700 : 100,
        }}
      >
        {page}
      </div>
    ));
  };
  return (
    <div className="paginationComponent">
      <div className="rowsPerPageContainer">
        <label htmlFor="rowsPerPageSelect">Items per page: </label>
        <select
          id="rowsPerPageSelect"
          value={rowsPerPage}
          onChange={handleChange}
          style={{
            width: "5rem",
            border: "none",
            borderRadius: "0.3rem",
            height: "1.6rem",
            marginLeft: "0.5rem",
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="pageController">
        <div className="left">
          {`Page `}
          <strong>{`${currentPage} of ${totalPages}`}</strong>
        </div>
        <div className="right">
          <button
            style={{
              width: "5rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.3rem",
            }}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            style={{
              width: "5rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.3rem",
            }}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <strong>{"<<"}</strong>
          </button>
          <div className="pages">{getPagesJsx()}</div>
          <button
            style={{
              width: "5rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.3rem",
            }}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <strong>{">>"}</strong>
          </button>
          <button
            style={{
              width: "5rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.3rem",
            }}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaginationComponent;
