import { useEffect, useState, useMemo, memo } from "react";
import { useRowSelect, useTable } from "react-table";
import axios from "axios";
import COLUMNS from "./columns";
import Checkbox from "../components/Checkbox";

const BaseTable = ({
  filesData,
  setShowFileInfoModal,
  setSelectedFileInfo,
  setShowFileSoftDeleteConfModal,
  setIsFileUpdating,
  isFileUpdating,
}) => {
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
    setSelectedFileInfo(row.original);
    setShowFileInfoModal(true);
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
      <tbody
        {
          ...getTableBodyProps(/*{ style: { height: 700, overflow: "auto" } }*/)
        }
      >
        {rows.map((row) => {
          prepareRow(row);
          // console.log("row 66", row);
          return (
            <tr
              {...row.getRowProps({
                style: { marginTop: 2, marginBottom: 2 },
                onClick: (e) => handleRowClick(e, row),
              })}
            >
              {row.cells.map((cell) => {
                // console.log("90", cell);
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell", {
                      setShowFileSoftDeleteConfModal,
                      setSelectedFileInfo,
                    })}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <pre>
        <code>
          {JSON.stringify(
            { selectedRows: selectedFlatRows.map((row) => row.original) },
            null,
            2
          )}
        </code>
      </pre>
    </table>
  );
};

export default memo(BaseTable);
