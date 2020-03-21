import React from "react";
const classnames = require("classnames");

class SelectionTable extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.updateField = this.updateField.bind(this);
    this.createItem = this.createItem.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  selectItem(id) {
    this.props.onUpdate(id);
  }

  updateField(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  createItem() {
    let haveAllFields = true;
    let data = {};

    this.props.labels.forEach(label => {
      if (this.state[label]) {
        data[label] = this.state[label];
      } else {
        haveAllFields = false;
      }
    });

    if (haveAllFields) {
      this.props.onCreate(data);
    }
  }

  isActive() {
    let haveAllFields = true;
    console.log(this.props.labels, this.state);

    if (!this.state) {
      return "scs-selectionTable-select";
    }

    this.props.labels.forEach(label => {
      if (!this.state[label]) {
        haveAllFields = false;
      }
    });

    return classnames("scs-selectionTable-select", { active: haveAllFields });
  }

  render() {
    const labels = this.props.labels.map(d => (
      <div key={d} className="scs-selectionTable-cell">
        {d}
      </div>
    ));
    const rows = this.props.options.map(item => {
      const data = item.data.map((d, i) => (
        <div
          key={item.id.toString() + "-" + i.toString()}
          className="scs-selectionTable-cell"
        >
          {d}
        </div>
      ));

      return (
        <div key={item.id.toString()} className="scs-selectionTable-row">
          <div className="scs-selectionTable-cell cell-sm">
            <div
              className="scs-selectionTable-select active"
              onClick={() => this.selectItem(item.id)}
            >
              Select
            </div>
          </div>
          {data}
        </div>
      );
    });
    const createRow = this.props.labels.map(label => {
      return (
        <div key={"create-" + label} className="scs-selectionTable-cell">
          <input
            name={label}
            className="scs-selectionTable-create"
            placeholder={label}
            onChange={this.updateField}
          />
        </div>
      );
    });

    return (
      <div className="scs-selectionTable">
        <div className="scs-selectionTable-header">
          <div className="scs-selectionTable-cell cell-sm"></div>
          {labels}
        </div>
        {rows}
        <div className="scs-selectionTable-row">
          <div className="scs-selectionTable-cell cell-sm">
            <div className={this.isActive()} onClick={() => this.createItem()}>
              Create
            </div>
          </div>
          {createRow}
        </div>
      </div>
    );
  }
}

export default SelectionTable;
