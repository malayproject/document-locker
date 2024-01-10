import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
const PaginationComponent = () => {
  const dispatch = useDispatch();

  const { currentPage, rowsPerPage, totalFileCount } = useSelector(
    (state) => state.tableData
  );

  const handleChange = useCallback(
    (e) => {
      console.log(e);
      dispatch({
        type: "ROWS_PER_PAGE_UPDATE",
        payload: Number.parseInt(e.target.value),
      });
      dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
    },
    [dispatch]
  );

  const totalPages = useMemo(
    () => Math.ceil(totalFileCount / rowsPerPage),
    [totalFileCount, rowsPerPage]
  );
  const getPagesJsx = () => {
    const totalPages = Math.ceil(totalFileCount / rowsPerPage);
    let i = totalPages < 5 || currentPage < 3 ? 1 : currentPage - 2;
    const pages = [];
    while (
      i <=
      (totalPages < 5 || currentPage > totalPages - 2
        ? totalPages
        : currentPage + 2)
    ) {
      pages.push(i);
      i++;
    }
    return pages.map((page) => (
      <div
        key={page * page}
        onClick={() => dispatch({ type: "CURRENT_PAGE_UPDATE", payload: page })}
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
        <select
          id="rowsPerPageSelect"
          value={rowsPerPage}
          onChange={handleChange}
          style={{
            width: "2.8rem",
            border: "none",
            borderRadius: "0.5rem",
            height: "1.2rem",
            padding: "0 0.5rem",
            fontWeight: 700,
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <label htmlFor="rowsPerPageSelect" style={{ marginLeft: "0.5rem" }}>
          {" "}
          items per page
        </label>
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
              borderRadius: "0.5rem",
            }}
            onClick={() =>
              dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 })
            }
            disabled={currentPage === 1}
          >
            <strong>{"<<"}</strong>
          </button>
          <button
            style={{
              width: "5rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.5rem",
            }}
            onClick={() =>
              dispatch({
                type: "CURRENT_PAGE_UPDATE",
                payload: currentPage - 1,
              })
            }
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="pages">{getPagesJsx()}</div>
          <button
            style={{
              width: "5rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.5rem",
            }}
            onClick={() =>
              dispatch({
                type: "CURRENT_PAGE_UPDATE",
                payload: currentPage + 1,
              })
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            style={{
              width: "5rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "0.5rem",
            }}
            onClick={() =>
              dispatch({ type: "CURRENT_PAGE_UPDATE", payload: totalPages })
            }
            disabled={currentPage === totalPages}
          >
            <strong>{">>"}</strong>
          </button>
        </div>
      </div>
    </div>
  );
};
export default PaginationComponent;
