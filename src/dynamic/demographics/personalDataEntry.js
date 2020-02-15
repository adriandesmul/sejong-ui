import React, { useState, useEffect } from "react";
import API from "../api/api";

const classNames = require("classnames");

export default function PersonalDataEntry() {
  const [demographics, setDemographics] = useState({
    personal_first_name: "",
    personal_last_name: "",
    personal_date_of_birth_month: "",
    personal_date_of_birth_day: "",
    personal_date_of_birth_year: "",
    address_line_1: "",
    address_line_2: "",
    address_town: "",
    address_state: "",
    address_country: "",
    address_zip: ""
  });
  const [msg, setMsg] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    API.get("/demographics", (err, data) => {
      console.log(data);
      for (const key in data) {
        data[key] = data[key] || "";
      }
      setDemographics(data);
    });
  }, []);

  function handleInputChange(event) {
    const target = event.target;
    setDemographics({
      ...demographics,
      [target.name]: target.value
    });
    setUnsavedChanges(true);
    console.log(target.name, target.value, demographics);
  }

  function handleSave() {
    console.log("Saving:", demographics);
    API.post("/demographics", demographics, status => {
      console.log(status);
      if (status !== 200) {
        setMsg({
          body: "Save error",
          type: "error"
        });
      } else {
        setMsg({
          body: "Save successful",
          type: "success"
        });
        setUnsavedChanges(false);
      }
    });
  }

  return (
    <div>
      {unsavedChanges && <p className="unsaved">Unsaved changes</p>}
      {msg.body && (
        <div className={classNames(["scs-message", msg.type])}>{msg.body}</div>
      )}
      <div className="scs-module-element">
        <label>First Name:</label>
        <input
          type="text"
          name="personal_first_name"
          value={demographics.personal_first_name}
          placeholder="First name"
          className="scs-input"
          onChange={handleInputChange}
        />
      </div>
      <div className="scs-module-element">
        <label>Last Name:</label>
        <input
          type="text"
          name="personal_last_name"
          value={demographics.personal_last_name}
          placeholder="Last name"
          className="scs-input"
          onChange={handleInputChange}
        />
      </div>
      <div className="scs-module-element">
        <label>Date of Birth:</label>
        <input
          type="number"
          name="personal_date_of_birth_month"
          value={demographics.personal_date_of_birth_month}
          placeholder="MM"
          className="scs-input"
          onChange={handleInputChange}
        />
        &nbsp;/&nbsp;
        <input
          type="number"
          name="personal_date_of_birth_day"
          value={demographics.personal_date_of_birth_day}
          placeholder="DD"
          className="scs-input"
          onChange={handleInputChange}
        />
        &nbsp;/&nbsp;
        <input
          type="number"
          name="personal_date_of_birth_year"
          value={demographics.personal_date_of_birth_year}
          placeholder="YYYY"
          className="scs-input"
          onChange={handleInputChange}
        />
      </div>
      <div className="scs-module-element">
        <label>Address:</label>
        <input
          type="text"
          name="address_line_1"
          value={demographics.address_line_1}
          placeholder="Address 1"
          className="scs-input"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address_line_2"
          value={demographics.address_line_2}
          placeholder="Address 2"
          className="scs-input"
          onChange={handleInputChange}
        />
      </div>
      <div className="scs-module-element">
        <label>Address:</label>
        <input
          type="text"
          name="address_town"
          value={demographics.address_town}
          placeholder="Town"
          className="scs-input"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address_state"
          value={demographics.address_state}
          placeholder="State"
          className="scs-input"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address_country"
          value={demographics.address_country}
          placeholder="Country"
          className="scs-input"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address_zip"
          value={demographics.address_zip}
          placeholder="Zip Code"
          className="scs-input"
          onChange={handleInputChange}
        />
      </div>
      <a
        className="scs-button save"
        onClick={() => {
          handleSave();
        }}
      >
        Save
      </a>
    </div>
  );
}
