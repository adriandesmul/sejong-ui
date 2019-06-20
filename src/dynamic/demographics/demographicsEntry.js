import React from 'react';
import EducationSelect from '../educationSelect/educationSelect'

class DemographicsEntry extends React.Component {
  render() {
    return(
      <div className="scs-module">
        <div className="scs-header">
          <p>School information</p>
          <p class="unsaved">Unsaved changes</p>
        </div>
        <EducationSelect />
      </div>
    )
  }
}

export default DemographicsEntry;
