import React from "react";
import TypeFilter from "./TypeFilter";
import FileNameSearchFilter from "./FileNameSearchFilter";
import { useDispatch, useSelector } from "react-redux";
import TagFilter from "./TagFilter";
import { fetchFilesData } from "../redux/actionCreators";
const FilterComponent = (props) => {
  const dispatch = useDispatch();
  const selectedTagIds = useSelector((state) => state.filters.selectedTagIds);
  const userTags = useSelector((state) => state.userTagsData.userTags);
  const selectedTags = userTags.filter((userTag) =>
    selectedTagIds.includes(userTag._id)
  );

  const handleClearTags = () => {
    dispatch({ type: "RESET_USER_SELECTED_TAGS" });
    dispatch(fetchFilesData());
  };
  return (
    <div className="filterComponent">
      <div className="filterContainer">
        <div className="topFilterContainer">
          <TypeFilter />
          <FileNameSearchFilter />
        </div>
        {selectedTagIds.length !== 0 && (
          <div className="bottomFilterContainer">
            {selectedTags.map((selectedTag) => (
              <TagFilter tag={selectedTag} key={selectedTag._id} />
            ))}
            <div className="clearTagFilter" onClick={handleClearTags}>
              Clear tags
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
