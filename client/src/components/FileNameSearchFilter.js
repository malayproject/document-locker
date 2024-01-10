import React from "react";
import SearchSvg from "../assets/search-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";

const FileNameSearchFilter = () => {
  const dispatch = useDispatch();
  const searchFilterText = useSelector(
    (state) => state.filters.searchFilterText
  );
  const handleSearchTextChange = (e) => {
    dispatch({ type: "SET_SEARCH_FILTER_TEXT", payload: e.target.value });
    dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
    dispatch(fetchFilesData());
  };
  return (
    <div className="fileNameSearchFilter">
      <div className="searchIconContainer">
        <img src={SearchSvg} alt="search" width="20px" />
      </div>
      <div className="searchTextContainer">
        <input
          type="text"
          className="searchText"
          onChange={handleSearchTextChange}
          value={searchFilterText}
          placeholder="search in drive"
        />
      </div>
    </div>
  );
};

export default FileNameSearchFilter;
