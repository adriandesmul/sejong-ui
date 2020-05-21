import React from "react";
import ReactQuill from "react-quill";

class EntryArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.modules = {
      toolbar: [["bold", "italic", "underline"], ["clean"]],
    };
    this.formats = ["bold", "italic", "underline"];

    if (this.props.type === "sijo") {
      this.modules.toolbar[0].push({ indent: "-1" });
      this.modules.toolbar[0].push({ indent: "+1" });
      this.formats.push("indent");
    }
  }

  componentDidMount() {
    this.setState({ text: this.props.initialValue || "" });
  }

  handleChange(value) {
    this.setState({ text: value });
    this.props.onChange(value);
  }

  render() {
    return (
      <ReactQuill
        value={this.state.text}
        onChange={this.handleChange}
        modules={this.modules}
        formats={this.formats}
      />
    );
  }
}

export default EntryArea;
