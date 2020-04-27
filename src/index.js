import "antd/dist/antd.css";
import "./style.scss";
import "react-quill/dist/quill.snow.css";
// import "antd/dist/antd.js";

import React from "react";
import ReactDOM from "react-dom";

import Auth from "./dynamic/auth/auth";
import PersonalDataEntry from "./dynamic/demographics/personalDataEntry";
import SijoEntry from "./dynamic/writingEntry/sijoEntry";
import EssayEntry from "./dynamic/writingEntry/essayEntry";
import WritingPM from "./dynamic/videos/writingPM";
import AdminEntryList from "./dynamic/admin/entryList";
import TeacherView from "./dynamic/teacher/teacherView";
import MyDropdown from "./dynamic/videos/test";
import WinnersWritingTable from "./dynamic/past/winnersWriting";

// EXTRA IMAGES
import "./library/logo_white_nourl.gif";

if (document.getElementById("auth"))
  ReactDOM.render(<Auth />, document.getElementById("auth"));
if (document.getElementById("demographics"))
  ReactDOM.render(
    <PersonalDataEntry />,
    document.getElementById("demographics")
  );
if (document.getElementById("sijo"))
  ReactDOM.render(<SijoEntry />, document.getElementById("sijo"));
if (document.getElementById("essay"))
  ReactDOM.render(<EssayEntry />, document.getElementById("essay"));
if (document.getElementById("writingPM"))
  ReactDOM.render(<WritingPM />, document.getElementById("writingPM"));
if (document.getElementById("adminEntryList"))
  ReactDOM.render(
    <AdminEntryList />,
    document.getElementById("adminEntryList")
  );
if (document.getElementById("userDetailPanel"))
  ReactDOM.render(
    <UserDetailPanel />,
    document.getElementById("userDetailPanel")
  );
if (document.getElementById("teacher-view"))
  ReactDOM.render(<TeacherView />, document.getElementById("teacher-view"));
if (document.getElementById("my-dropdown-slidedown"))
  ReactDOM.render(
    <MyDropdown />,
    document.getElementById("my-dropdown-slidedown")
  );
if (document.getElementById("winnersWritingTable"))
  ReactDOM.render(
    <WinnersWritingTable />,
    document.getElementById("winnersWritingTable")
  );
