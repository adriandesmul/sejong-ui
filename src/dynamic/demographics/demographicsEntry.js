import React from 'react';
import EducationSelect from '../educationSelect/educationSelect'

class DemographicsEntry extends React.Component {
  render() {
    return(
      <div className="scs-module">
        <div className="scs-header">
          <span>Personal information</span>
          <span>Unsaved changes</span>
        </div>
        <EducationSelect />
      </div>
    )
  }
}

export default DemographicsEntry;
