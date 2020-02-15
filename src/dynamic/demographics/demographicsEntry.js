import React from "react";
import EducationSelect from "../educationSelect/educationSelect";
import PersonalDataEntry from "./personalDataEntry";

export default function DemographicsEntry() {
  return (
    <div className="scs-module">
      <div className="scs-header">
        <p>Education information</p>
        <p className="unsaved">Unsaved changes</p>
      </div>
      <EducationSelect />
    </div>
  );
}
