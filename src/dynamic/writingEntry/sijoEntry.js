import React from "react";
import EntryArea from "./entryArea";
import API from "../api/api";
import Loader from "../common/loader";
import "./writingEntry.scss";

const classNames = require("classnames");

class SijoEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      msg: null,
      unsavedChanges: false,
      haveData: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }

  componentDidMount() {
    API.get("/writing?type=sijo", (err, data) => {
      !this.isCancelled &&
        this.setState({
          title: data ? data.title : "",
          body: data ? data.body : "",
          unsavedChanges: false,
          haveData: true
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
      unsavedChanges: true
    });
  }

  handleBodyChange(content) {
    if (content === this.state.body) {
      return;
    }
    this.setState({
      body: content,
      unsavedChanges: true
    });
  }

  handleSave() {
    var payload = {
      title: this.state.title,
      body: this.state.body,
      entry_type: "sijo"
    };

    API.post("/writing", payload, status => {
      console.log(status);
      if (status !== 200) {
        this.setState({
          msg: {
            body: "Save error",
            type: "error"
          }
        });
      } else {
        this.setState({
          msg: {
            body: "Save successful",
            type: "success"
          },
          unsavedChanges: false
        });
      }
    });
  }

  handlePreview() {
    API.get("/writing/generate/sijo", (error, data) => {
      console.log(data);
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

    return (
      <div className="scs-module sijo">
        <div className="scs-header">
          <p>Sijo Entry</p>
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
