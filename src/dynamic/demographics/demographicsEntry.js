import React from "react";
import EducationSelect from "../educationSelect/educationSelect";
import PersonalDataEntry from "./personalDataEntry";

class DemographicsEntry extends React.Component {
  render() {
    return (
      <div className="scs-module">
        <div className="scs-header">
          <p>Personal and School information</p>
          <p className="unsaved">Unsaved changes</p>
        </div>
        <PersonalDataEntry />
        <EducationSelect />
      </div>
    );
  }
}

export default DemographicsEntry;
