import { useEffect, useState, useMemo, memo } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import axios from "axios";
import COLUMNS from "./columns";
import GlobalFilter from "../components/GlobalFilter";

const GlobalFilteringTable = ({ uploadSuccessful }) => {
  const [filesData, setFilesData] = useState([]);
  const fetchFilesData = async () => {
    try {
      const data = await axios.get("http://localhost:5100/api/files");
      console.log("data 11", data.data.files);
      setFilesData(data.data?.files || []);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchFilesData();
  }, []);

  useEffect(() => {
    if (uploadSuccessful) fetchFilesData();
  }, [uploadSuccessful]);

  const data = useMemo(() => filesData, [filesData]);
  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // footerGroups,
    page,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const handleFetchData = async () => {
    try {
      const response = await axios.get("/api/files");
      console.log("handleFetgchData", response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="filesTableContainer">
      <button onClick={handleFetchData}>Load Data</button>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table className="filesTable" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {column.canFilter ? column.render("Filter") : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div>
        <span>Page :</span>
        <strong>{`${pageIndex + 1} of ${pageOptions.length}`}</strong>
        {/* {`Page : ${pageIndex + 1} of ${pageOptions.length}`} */}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default memo(GlobalFilteringTable);
