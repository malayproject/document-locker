import { format } from "date-fns";
import ColumnFilter from "../components/ColumnFilter";
import eraseSvg from "../assets/erase.svg";

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
    width: 180,
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
    width: 220,
    Cell: (props) => {
      console.log("cell props 65", props.testing);
      //   console.log("29 Cell props", props.row.id);
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
      const { setShowFileSoftDeleteConfModal, setSelectedFileInfo, row } =
        props;
      return (
        <>
          <div
            className="deleteIcon"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={(e) => {
              console.log("86", e);
              setSelectedFileInfo(row?.original);
              setShowFileSoftDeleteConfModal(true);

              e.stopPropagation();
            }}
          >
            <img src={eraseSvg} alt="delete" />
          </div>
        </>
      );
    },
  },
];

export default COLUMNS;
