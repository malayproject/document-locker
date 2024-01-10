import React, { memo } from "react";
import PropTypes from "prop-types";
import xmark from "../assets/xmark-solid.svg";
import { useDispatch } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";

const TagFilter = (props) => {
  const { tag } = props;
  const dispatch = useDispatch();

  const handleRemoveSelectedTag = () => {
    dispatch({ type: "USER_SELECTED_TAG_REMOVE", payload: tag._id });
    dispatch(fetchFilesData());
  };
  return (
    <div className="tagFilter" onClick={() => handleRemoveSelectedTag()}>
      <div className="tagNameText">{tag.tagName}</div>
      <img className="removeTagCross" src={xmark} alt="cross" />
    </div>
  );
};

TagFilter.protoTypes = {
  tag: PropTypes.object,
};

export default memo(TagFilter);
