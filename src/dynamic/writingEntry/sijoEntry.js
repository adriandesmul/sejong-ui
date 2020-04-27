import React from "react";
import EntryArea from "./entryArea";
import API from "../api/api";
import Loader from "../common/loader";
import EducationSelect from "../educationSelect/educationSelect";
import "./writingEntry.scss";

const classNames = require("classnames");

class SijoEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      school: null,
      teacher: null,
      msg: null,
      unsavedChanges: false,
      haveData: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleEducationChange = this.handleEducationChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }

  componentDidMount() {
    API.get("/writing?type=sijo", (err, data) => {
      !this.isCancelled &&
        this.setState({
          title: data ? data.title : "",
          body: data ? data.body : "",
          school: data ? data.school : null,
          teacher: data ? data.teacher : null,
          unsavedChanges: false,
          haveData: true,
        });
    });
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
      unsavedChanges: true,
    });
  }

  handleBodyChange(content) {
    if (content === this.state.body) {
      return;
    }
    this.setState({
      body: content,
      unsavedChanges: true,
    });
  }

  handleEducationChange(school, teacher) {
    this.setState({ school, teacher });
  }

  handleSave() {
    var payload = {
      title: this.state.title,
      body: this.state.body,
      entry_type: "sijo",
      school_id: this.state.school ? this.state.school.school_id : null,
      teacher_id: this.state.teacher ? this.state.teacher.teacher_id : null,
    };

    API.post("/writing", payload, (status) => {
      if (status !== 200) {
        this.setState({
          msg: {
            body: "Save error",
            type: "error",
          },
        });
      } else {
        this.setState({
          msg: {
            body: "Save successful",
            type: "success",
          },
          unsavedChanges: false,
        });
      }
    });
  }

  handlePreview() {
    API.get("/writing/export?type=sijo", (error, data) => {
      var newBlob = new Blob([data], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const url = window.URL.createObjectURL(newBlob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "preview.pdf";
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    });
  }

  render() {
    let msg = this.state.msg;
    let msgClass;
    if (msg) {
      msgClass = classNames(["scs-message", msg.type]);
    }

    let complete = this.state.body && this.state.school && this.state.teacher;

    if (!localStorage.getItem("loginToken")) {
      return <div>Please login to edit Sijo entry</div>;
    }

    return (
      <div className="scs-module sijo">
        <div className="scs-header">
          <p>Sijo Entry</p>
          {this.state.haveData && !complete && (
            <div className="scs-missing-data">
              <i
                className="fas fa-exclamation-circle"
                style={{ color: "#ff9999" }}
              ></i>
              <div className="scs-missing-data-notes">
                You are missing the following data:
                <ul>
                  {!this.state.body && <li>A sijo</li>}
                  {!this.state.school_id && <li>A school</li>}
                  {!this.state.teacher_id && <li>A teacher</li>}
                </ul>
              </div>
            </div>
          )}
          {this.state.haveData && complete && (
            <i className="fas fa-check-circle" style={{ color: "#5fdc5f" }}></i>
          )}
          {!this.state.haveData && <Loader />}
          {this.state.unsavedChanges && (
            <p className="unsaved">Unsaved changes</p>
          )}
        </div>
        {msg && <div className={msgClass}>{msg.body}</div>}
        {this.state.haveData && (
          <div className="scs-module-element">
            <label>Title: </label>
            <input
              type="text"
              name="title"
              placeholder="Sijo title optional"
              className="scs-input"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
        )}
        {this.state.haveData && (
          <div className="scs-entry-area sijo">
            <EntryArea
              initialValue={this.state.body}
              onChange={this.handleBodyChange}
              type="sijo"
            />
          </div>
        )}
        <EducationSelect
          school={this.state.school}
          teacher={this.state.teacher}
          handleEducationChange={this.handleEducationChange}
        />
        {this.state.haveData && (
          <a className="scs-button save" onClick={this.handleSave}>
            Save
          </a>
        )}
        {this.state.haveData && (
          <a className="scs-button preview" onClick={this.handlePreview}>
            Preview
          </a>
        )}
      </div>
    );
  }
}

export default SijoEntry;
