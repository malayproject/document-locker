import React from "react";
import Check from "../assets/check-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { TYPEFILTER_VS_FILTER_DISPLAYTEXT } from "../constants";
import Caret_down from "../assets/caret-down-solid.svg";
import Xmark from "../assets/xmark-solid.svg";
import TypeFilterMenu from "./TypeFilterMenu";
import { fetchFilesData } from "../redux/actionCreators";

const TypeFilter = () => {
  const dispatch = useDispatch();
  const { typeFilter, typeFilterMenuExpanded } = useSelector(
    (state) => state.filters
  );
  return (
    <div className="typeFilter">
      <div
        className={`filterTextContainer${" " + typeFilter}`}
        onClick={() => dispatch({ type: "TOGGLE_TYPE_FILTER_MENU" })}
      >
        {typeFilter !== "TYPE" && (
          <img className="tickContainer" src={Check} alt="OK" width="16" />
        )}
        <div
          className="filterText"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 17,
            marginLeft: 6,
            fontWeight: 500,
            width: "max-content",
          }}
        >
          {TYPEFILTER_VS_FILTER_DISPLAYTEXT[typeFilter]}
        </div>
        <img src={Caret_down} alt="down" className="downArrowIcon" width="10" />
      </div>
      {typeFilter !== "TYPE" && (
        <img
          className="crossIconContainer"
          src={Xmark}
          alt="cross"
          width="39"
          onClick={() => {
            dispatch({ type: "RESET_TYPE_FILTER" });
            dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
            dispatch(fetchFilesData());
          }}
        />
      )}
      {typeFilterMenuExpanded && <TypeFilterMenu />}
    </div>
  );
};

export default TypeFilter;
