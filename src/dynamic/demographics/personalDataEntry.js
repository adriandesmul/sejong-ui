import React, { useState, useEffect } from "react";
import API from "../api/api";
import Loader from "../common/loader";

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
  const [haveData, setHaveData] = useState(false);

  useEffect(() => {
    API.get("/demographics", (err, data) => {
      if (!data) return;
      let combinedData = {};
      for (const key in demographics) {
        combinedData[key] = data[key] || demographics[key];
      }
      setDemographics(combinedData);
      setHaveData(true);
    });
  }, []);

  function handleInputChange(event) {
    const target = event.target;
    setDemographics({
      ...demographics,
      [target.name]: target.value
    });
    setUnsavedChanges(true);
  }

  function handleSave() {
    API.post("/demographics", demographics, status => {
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

  const monthOptions = () => {
    let months = [
      "01 - Jan",
      "02 - Feb",
      "03 - Mar",
      "04 - Apr",
      "05 - May",
      "06 - Jun",
      "07 - Jul",
      "08 - Aug",
      "09 - Sep",
      "10 - Oct",
      "11 - Nov",
      "12 - Dec"
    ];
    return months.map((month, idx) => (
      <option value={idx + 1} key={month}>
        {month}
      </option>
    ));
  };

  const dayOptions = () => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <option value={i} key={"day_" + i}>
          {i}
        </option>
      );
    }
    return days;
  };

  const yearOptions = () => {
    let years = [];
    for (let i = 1920; i <= 2020; i++) {
      years.push(
        <option value={i} key={"year_" + i}>
          {i}
        </option>
      );
    }
    return years;
  };

  const stateOptions = () => {
    let states = [
      { key: "AK", value: "AK - Alaska" },
      { key: "AL", value: "AL - Alabama" },
      { key: "AR", value: "AR - Arkansas" },
      { key: "AZ", value: "AZ - Arizona" },
      { key: "CA", value: "CA - California" },
      { key: "CO", value: "CO - Colorado" },
      { key: "CT", value: "CT - Connecticut" },
      { key: "DC", value: "DC - District Of Columbia" },
      { key: "DE", value: "DE - Delaware" },
      { key: "FL", value: "FL - Florida" },
      { key: "GA", value: "GA - Georgia" },
      { key: "HI", value: "HI - Hawaii" },
      { key: "IA", value: "IA - Iowa" },
      { key: "ID", value: "ID - Idaho" },
      { key: "IL", value: "IL - Illinois" },
      { key: "IN", value: "IN - Indiana" },
      { key: "KS", value: "KS - Kansas" },
      { key: "KY", value: "KY - Kentucky" },
      { key: "LA", value: "LA - Louisiana" },
      { key: "MA", value: "MA - Massachusetts" },
      { key: "MD", value: "MD - Maryland" },
      { key: "ME", value: "ME - Maine" },
      { key: "MI", value: "MI - Michigan" },
      { key: "MN", value: "MN - Minnesota" },
      { key: "MO", value: "MO - Missouri" },
      { key: "MS", value: "MS - Mississippi" },
      { key: "MT", value: "MT - Montana" },
      { key: "NC", value: "NC - North Carolina" },
      { key: "ND", value: "ND - North Dakota" },
      { key: "NE", value: "NE - Nebraska" },
      { key: "NH", value: "NH - New Hampshire" },
      { key: "NJ", value: "NJ - New Jersey" },
      { key: "NM", value: "NM - New Mexico" },
      { key: "NV", value: "NV - Nevada" },
      { key: "NY", value: "NY - New York" },
      { key: "OH", value: "OH - Ohio" },
      { key: "OK", value: "OK - Oklahoma" },
      { key: "OR", value: "OR - Oregon" },
      { key: "PA", value: "PA - Pennsylvania" },
      { key: "RI", value: "RI - Rhode Island" },
      { key: "SC", value: "SC - South Carolina" },
      { key: "SD", value: "SD - South Dakota" },
      { key: "TN", value: "TN - Tennessee" },
      { key: "TX", value: "TX - Texas" },
      { key: "UT", value: "UT - Utah" },
      { key: "VA", value: "VA - Virginia" },
      { key: "VT", value: "VT - Vermont" },
      { key: "WA", value: "WA - Washington" },
      { key: "WI", value: "WI - Wisconsin" },
      { key: "WV", value: "WV - West Virginia" },
      { key: "WY", value: "WY - Wyoming" },
      { key: "AB", value: "AB - Alberta" },
      { key: "BC", value: "BC - British Columbia" },
      { key: "MB", value: "MB - Manitoba" },
      { key: "NB", value: "NB - New Brunswick" },
      { key: "NL", value: "NL - Newfoundland" },
      { key: "NS", value: "NS - Nova Scotia" },
      { key: "NT", value: "NT - Northwest Territories" },
      { key: "NU", value: "NU - Nunavut" },
      { key: "ON", value: "ON - Ontario" },
      { key: "PE", value: "PE - Prince Edward Island" },
      { key: "QC", value: "QC - Quebec" },
      { key: "SK", value: "SK - Saskatchewan" },
      { key: "YT", value: "YT - Yukon" }
    ];
    return states.map(state => (
      <option value={state.key} key={state.key}>
        {state.value}
      </option>
    ));
  };

  if (!localStorage.getItem("loginToken")) {
    return <div>Please login to edit Personal Information</div>;
  }

  return (
    <div className="scs-module">
      <div className="scs-header">
        <p>Personal information</p>
        {!haveData && <Loader />}
        {unsavedChanges && <p className="unsaved">Unsaved changes</p>}
      </div>
      {msg.body && (
        <div className={classNames(["scs-message", msg.type])}>{msg.body}</div>
      )}
      {haveData && (
        <>
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
            <select
              type="number"
              name="personal_date_of_birth_month"
              value={demographics.personal_date_of_birth_month}
              className="scs-input"
              onChange={handleInputChange}
            >
              <option value="">MM</option>
              {monthOptions()}
            </select>
            &nbsp;/&nbsp;
            <select
              type="number"
              name="personal_date_of_birth_day"
              value={demographics.personal_date_of_birth_day}
              className="scs-input"
              onChange={handleInputChange}
            >
              <option value="">DD</option>
              {dayOptions()}
            </select>
            &nbsp;/&nbsp;
            <select
              type="number"
              name="personal_date_of_birth_year"
              value={demographics.personal_date_of_birth_year}
              className="scs-input"
              onChange={handleInputChange}
            >
              <option value="">YYYY</option>
              {yearOptions()}
            </select>
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
            <select
              type="number"
              name="address_state"
              value={demographics.address_state}
              className="scs-input"
              onChange={handleInputChange}
            >
              <option value="">State</option>
              {stateOptions()}
            </select>
            <select
              type="number"
              name="address_country"
              value={demographics.address_country}
              className="scs-input"
              onChange={handleInputChange}
            >
              <option value="">Country</option>
              <option value="USA">USA</option>
              <option value="CAD">Canada</option>
              <option value="Other">Other</option>
            </select>
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
            style={{ marginTop: "1rem" }}
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </a>
        </>
      )}
    </div>
  );
}
