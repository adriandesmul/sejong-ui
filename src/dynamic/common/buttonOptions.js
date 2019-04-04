import React from 'react';
const classNames = require('classnames');
import './common.scss'

class ButtonOptions extends React.Component {
  constructor(props) {
    super(props);

    this.isSelected = this.isSelected.bind(this);
    this.select = this.select.bind(this);
  }

  isSelected(item) {
    return (item === this.props.value)
  }

  select(value) {
    if (value === this.props.value) {
      this.props.onUpdate(null)
    } else {
      this.props.onUpdate(value)
    }
  }

  render() {
    const options = this.props.options.map(item => {
      return (
        <div className={classNames(["scs-selection-option", {"selected": this.isSelected(item)}])}
             key={item}
             onClick={() => this.select(item)}>{item}</div>
      )
    })

    return (
      <div className="scs-selection-options">
        {options}
      </div>
    )
  }

}

export default ButtonOptions;
