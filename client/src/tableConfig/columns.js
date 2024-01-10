import { format } from "date-fns";
import ColumnFilter from "../components/ColumnFilter";
import eraseSvg from "../assets/erase.svg";
import addATag from "../assets/add-a-tag.png";
import disabledEraseSvg from "../assets/disabledErase.svg";
import undoTrashSvg from "../assets/undo-trash.svg";
import axios from "axios";
import { fetchFilesData } from "../redux/actionCreators";
import hollowStar from "../assets/star-outline.svg";
import star from "../assets/star-icon.svg";

const COLUMNS = [
  {
    Header: "Id",
    Filter: ColumnFilter,
    Footer: "Id",
    accessor: "_id",
    width: 200,
  },
  {
    Header: "File name",
    Filter: ColumnFilter,
    Footer: "File name",
    accessor: "fileName",
    width: 500,
  },
  {
    Header: "Type",
    Filter: ColumnFilter,
    Footer: "Type",
    accessor: "mimeType",
    width: 200,
    // minWidth: 160,
    // maxWidth: 240,
    Cell: ({ value }) => {
      let val = null;
      switch (value) {
        case "application/pdf":
          val = "pdf";
          break;
        case "image/jpeg":
        case "image/png":
          val = "image";
          break;
        case "audio/mpeg":
          val = "audio";
          break;
        default:
          val = value;
      }
      return val;
    },
  },
  {
    Header: "Size",
    Filter: ColumnFilter,
    Footer: "Size",
    accessor: "fileSize",
    width: 150,
    Cell: ({ value }) => {
      const kBs = (value / 1024).toFixed(2);
      return `${kBs} kB`;
    },
  },
  {
    Header: "Date",
    Filter: ColumnFilter,
    Footer: "Date",
    accessor: "createdAt",
    width: 150,
    Cell: (props) => {
      console.log("cell props 65", props.testing);
      const { value } = props;
      return format(value, "dd/MM/yyyy");
    },
  },
  {
    id: "actions",
    Header: "Actions",
    width: 30,
    Cell: (props) => {
      console.log(props);
      const { dispatch, row } = props;
      return (
        <div
          className="actionsCell"
          style={{ display: "flex", justifyContent: "space-around" }}
          onClick={(e) => console.log("eqr actionsCell")}
        >
          <button
            className="addTagIcon"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
            onClick={async (e) => {
              e.stopPropagation();
              if (row.original) {
                try {
                  dispatch({
                    type: "FILE_UPDATE_PENDING",
                    payload: row.original,
                  });
                  await axios.put(
                    `http://localhost:5100/api/file/${
                      row.original._id
                    }/update-star?starred=${!row.original.starred}`
                  );
                  dispatch({
                    type: "FILE_UPDATE_FULFILLED",
                    payload: row.original,
                  });
                  dispatch(fetchFilesData());
                } catch (err) {
                  dispatch({
                    type: "FILE_UPDATE_REJECTED",
                    error: err.message,
                  });
                }
              }
            }}
          >
            <img
              src={row.original.starred ? star : hollowStar}
              alt="delete"
              width="16px"
              height="auto"
              // style={{ cursor: "pointer" }}
            />
          </button>
          <button
            className="deleteIcon"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              cursor: "pointer",
              width: "30%",
              height: "100%",
              backgroundColor: "transparent",
            }}
            onClick={async (e) => {
              e.stopPropagation();
              if (row.original && !row.original.markedDeleted) {
                dispatch({ type: "SELECT_FILE", payload: row?.original });
                dispatch({
                  type: "FILE_SOFT_DELETE_CONFIRMATION_MODAL",
                  payload: true,
                });
              }
              if (row.original && row.original.markedDeleted) {
                dispatch({
                  type: "FILE_UPDATE_PENDING",
                  payload: row?.original,
                });
                try {
                  const res = await axios.delete(
                    `http://localhost:5100/api/file/${row.original._id}?restore=true`
                  );
                  dispatch({ type: "FILE_UPDATE_FULFILLED" });
                  dispatch(fetchFilesData());
                } catch (err) {
                  dispatch({
                    type: "FILE_UPDATE_REJECTED",
                    payload: err.message,
                  });
                  console.log(err.message);
                }
              }
            }}
          >
            <img
              src={row?.original?.markedDeleted ? undoTrashSvg : eraseSvg}
              alt="delete"
              width="20px"
              height="auto"
            />
          </button>
        </div>
      );
    },
  },
];

export default COLUMNS;
