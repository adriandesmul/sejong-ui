import React from 'react'

import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

class MyDropdown extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <SlideDown className="my-dropdown-slidedown">
        {this.props.open ? this.props.children : null}
        <p>Hello world</p>
      </SlideDown>
    )
  }

}

export default MyDropdown
