import React from 'react';

class DropdownOptions extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.props.onUpdate(event.target.value)
  }

  render() {
    const options = this.props.options.map(item => {
      return <option value={item} key={item}>{item}</option>
    })

    return (
      <select className="scs-dropdown" name="state" onChange={this.onChange}>
        <option default value={null}>--</option>
        {options}
      </select>
    )
  }
}

export default DropdownOptions;
