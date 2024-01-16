import { useMemo, memo } from "react";
import { useRowSelect, useTable } from "react-table";
import COLUMNS from "./columns";
import Checkbox from "../components/Checkbox";
import { useDispatch, useSelector } from "react-redux";

const BaseTable = ({ setIsFileUpdating, isFileUpdating }) => {
  const dispatch = useDispatch();

  const selectedFile = useSelector((state) => state.selectFile.selectedFile);
  const isFilesFetching = useSelector(
    (state) => state.tableData.isFilesFetching
  );
  console.log("isFilesFetching 14", isFilesFetching);

  const { showFileInfoModal, showFileSoftDeleteConfirmationModal } =
    useSelector((state) => state.showModals);

  const filesData = useSelector((state) => state.tableData.files);

  const data = useMemo(() => filesData, [filesData]);
  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    // footerGroups,
  } = useTable(
    {
      columns: columns,
      data: data,
      noDataText: "No Data",
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => {
              return <Checkbox {...getToggleAllRowsSelectedProps()} />;
            },
            width: 60,
            Cell: ({ row }) => {
              return <Checkbox {...row.getToggleRowSelectedProps()} />;
            },
          },
          ...columns,
        ];
      });
    }
  );

  const handleRowClick = (e, row) => {
    if (e.target.tagName === "INPUT") return;
    console.log("handleRowClick 44", e);
    console.log("handleRowClick 45", row);
    dispatch({ type: "SELECT_FILE", payload: row.original });
    dispatch({ type: "FILE_INFO_MODAL", payload: true });
  };

  console.log("getTableBodyProps 21", getTableBodyProps());

  return (
    <table className="filesTable" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps({ style: { width: column.width } })}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* {isFilesFetching ? (
        <div className="loadingtable">
          <h1>Loading...</h1>
        </div> */}
      {/* ) : ( */}
      <tbody
        {...getTableBodyProps(
          isFilesFetching ? { style: { filter: "blur(3px)" } } : {}
        )}
      >
        {rows.map((row) => {
          prepareRow(row);
          console.log("columns 94", columns);
          return (
            <tr
              {...row.getRowProps({
                style: { marginTop: 2, marginBottom: 2 },
                onClick: (e) => handleRowClick(e, row),
              })}
            >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell", {
                      dispatch,
                    })}
                  </td>
                );
              })}
            </tr>
          );
        })}
        {rows.length === 0 && (
          <tr>
            <td
              colSpan={columns.length + 1}
              style={{
                textAlign: "center",
                fontWeight: "500",
                border: "none",
              }}
            >
              No data found
            </td>
          </tr>
        )}
      </tbody>
      {/* )} */}
      {/* <pre>
        <code>
          {JSON.stringify(
            { selectedRows: selectedFlatRows.map((row) => row.original) },
            null,
            2
          )}
        </code>
      </pre> */}
    </table>
  );
};

export default memo(BaseTable);
