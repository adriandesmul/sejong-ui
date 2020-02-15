import React, { useState } from "react";

export default function PersonalDataEntry() {
  const [demographics, setDemographics] = useState({});

  function handleInputChange(event) {
    const target = event.target;
    setDemographics({
      ...demographics,
      [target.name]: target.value,
      unsavedChanges: true
    });
    console.log(target.name, target.value, demographics);
  }

  return (
    <div>
      {JSON.stringify(demographics)}
      <div className="scs-module-element">
        <label>First Name:</label>
        <input
          type="text"
          name="personal_first_name"
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
          placeholder="MM"
          className="scs-input"
          onChange={handleInputChange}
        />
        &nbsp;/&nbsp;
        <input
          type="number"
          name="personal_date_of_birth_day"
          placeholder="DD"
          className="scs-input"
          onChange={handleInputChange}
        />
        &nbsp;/&nbsp;
        <input
          type="number"
          name="personal_date_of_birth_year"
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
          placeholder="Address 1"
          className="scs-input"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address_line_2"
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
          placeholder="Town"
          className="scs-input"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address_state"
          placeholder="State"
          className="scs-input"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address_country"
          placeholder="Country"
          className="scs-input"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address_zip"
          placeholder="Zip Code"
          className="scs-input"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
