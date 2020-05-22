import React, { useState } from "react";
import { Radio, Form, Select } from "antd";
import SelectionTable from "../common/selectionTable";
import API from "../api/api";
import constants from "../common/constants";

export default function SchoolSelect(props) {
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [schools, setSchools] = useState();
  const [schoolsTable, setSchoolsTable] = useState();

  function getSchools(s) {
    API.get("/schools?state=" + s, (error, data) => {
      const schools = data.map((item) => {
        return {
          id: item.school_id,
          data: [item.school_name, item.school_city],
        };
      });
      setSchools(data);
      setSchoolsTable(schools);
    });
  }

  function selectSchool(school_id) {
    const school = schools.find((item) => item.school_id === school_id);
    if (school) {
      props.onUpdate(school);
    }
  }

  function createSchool(data) {
    API.post(
      "/schools",
      {
        school_name: data.School,
        school_city: data.City,
        school_state: state,
        school_country: country,
      },
      (status, data) => {
        if (status === 200) {
          props.onUpdate(JSON.parse(data));
        }
      }
    );
  }

  return (
    <>
      <div className="scs-module-element">
        <p className="bold">Select your school</p>
      </div>
      <Form.Item label="Country" className="scs-module-element">
        <Radio.Group
          onChange={(e) => setCountry(e.target.value)}
          options={constants.countries.map((i) => {
            return { label: i, value: i };
          })}
        ></Radio.Group>
      </Form.Item>
      {country && (
        <Form.Item label="State" className="scs-module-element">
          <Select
            onChange={(v) => {
              setState(v);
              getSchools(v);
            }}
            options={constants.states[country].map((i) => {
              return { label: i, value: i };
            })}
          ></Select>
        </Form.Item>
      )}
      {schoolsTable && (
        <SelectionTable
          options={schoolsTable}
          labels={["School", "City"]}
          onUpdate={selectSchool}
          onCreate={createSchool}
        />
      )}
    </>
  );
}
