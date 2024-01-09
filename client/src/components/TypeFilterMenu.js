import React from "react";
import { TYPEFILTER, TYPEFILTER_VS_FILTER_DISPLAYTEXT } from "../constants";
import pdfsPng from "../assets/pdf2.png";
import othersPng from "../assets/icon_1_drawing_x64.png";
import spreadsheetsPng from "../assets/icon_1_spreadsheet_x64.png";
import videosPng from "../assets/video.png";
import audiosSvg from "../assets/headphone.svg";
import { useDispatch } from "react-redux";
import { fetchFilesData } from "../redux/actionCreators";

const TypeFilterMenu = () => {
  const dispatch = useDispatch();
  return (
    <div className="typeFilterMenu">
      <div
        className="typeFilterOption"
        onClick={() => {
          dispatch({
            type: "SET_TYPE_FILTER",
            payload: TYPEFILTER.PDFS,
          });
          dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
          dispatch(fetchFilesData());
        }}
      >
        <div className="typeFilterIconContainer">
          <img
            src={pdfsPng}
            alt="pdfs"
            className="typeFilterOptionIcon"
            width="29"
            height="28"
          />
        </div>
        <div className="typeFilterOptionText">
          {TYPEFILTER_VS_FILTER_DISPLAYTEXT[TYPEFILTER.PDFS]}
        </div>
      </div>
      <div
        className="typeFilterOption"
        onClick={() => {
          dispatch({
            type: "SET_TYPE_FILTER",
            payload: TYPEFILTER.SPREADSHEETS,
          });
          dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
          dispatch(fetchFilesData());
        }}
      >
        <div className="typeFilterIconContainer">
          <img
            src={spreadsheetsPng}
            alt="spreadsheets"
            className="typeFilterOptionIcon"
            width="22"
            height="26"
          />
        </div>
        <div className="typeFilterOptionText">
          {TYPEFILTER_VS_FILTER_DISPLAYTEXT[TYPEFILTER.SPREADSHEETS]}
        </div>
      </div>
      <div
        className="typeFilterOption"
        onClick={() => {
          dispatch({
            type: "SET_TYPE_FILTER",
            payload: TYPEFILTER.IMAGES,
          });
          dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
          dispatch(fetchFilesData());
        }}
      >
        <div className="typeFilterIconContainer">
          <img
            src={othersPng}
            alt="images"
            className="typeFilterOptionIcon"
            width="22"
            height="26"
          />
        </div>
        <div className="typeFilterOptionText">
          {TYPEFILTER_VS_FILTER_DISPLAYTEXT[TYPEFILTER.IMAGES]}
        </div>
      </div>
      <div
        className="typeFilterOption"
        onClick={() => {
          dispatch({
            type: "SET_TYPE_FILTER",
            payload: TYPEFILTER.VIDEOS,
          });
          dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
          dispatch(fetchFilesData());
        }}
      >
        <div className="typeFilterIconContainer">
          <img
            src={videosPng}
            alt="videos"
            className="typeFilterOptionIcon"
            width="26"
            height="26"
          />
        </div>
        <div className="typeFilterOptionText">
          {TYPEFILTER_VS_FILTER_DISPLAYTEXT[TYPEFILTER.VIDEOS]}
        </div>
      </div>
      <div
        className="typeFilterOption"
        onClick={() => {
          dispatch({
            type: "SET_TYPE_FILTER",
            payload: TYPEFILTER.AUDIOS,
          });
          dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
          dispatch(fetchFilesData());
        }}
      >
        <div className="typeFilterIconContainer">
          <img
            src={audiosSvg}
            alt=""
            className="typeFilterOptionIcon"
            width="28"
            // height="30"
          />
        </div>
        <div className="typeFilterOptionText">
          {TYPEFILTER_VS_FILTER_DISPLAYTEXT[TYPEFILTER.AUDIOS]}
        </div>
      </div>
      <div
        className="typeFilterOption"
        onClick={() => {
          dispatch({
            type: "SET_TYPE_FILTER",
            payload: TYPEFILTER.OTHERS,
          });
          dispatch({ type: "CURRENT_PAGE_UPDATE", payload: 1 });
          dispatch(fetchFilesData());
        }}
      >
        <div className="typeFilterIconContainer">
          <img
            src={othersPng}
            alt=""
            className="typeFilterOptionIcon"
            width="22"
            height="26"
          />
        </div>
        <div className="typeFilterOptionText">
          {TYPEFILTER_VS_FILTER_DISPLAYTEXT[TYPEFILTER.OTHERS]}
        </div>
      </div>
    </div>
  );
};

export default TypeFilterMenu;
