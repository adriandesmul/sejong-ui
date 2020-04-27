import React from "react";
import ButtonOptions from "../common/buttonOptions";
import DropdownOptions from "../common/dropdownOptions";
import SelectionTable from "../common/selectionTable";
import API from "../api/api";
import constants from "../common/constants";

class SchoolSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      state: null,
      schools: null,
      schoolsTable: null,
    };

    this.selectCountry = this.selectCountry.bind(this);
    this.selectState = this.selectState.bind(this);
    this.selectSchool = this.selectSchool.bind(this);
    this.getSchools = this.getSchools.bind(this);
    this.createSchool = this.createSchool.bind(this);
  }

  selectCountry(country) {
    if (country === "Other") {
      this.getSchools(country, country);
      this.setState({
        country: country,
        state: country,
      });
    } else {
      this.setState({
        country: country,
        state: null,
        schools: null,
      });
    }
  }

  selectState(state) {
    if (state) {
      this.getSchools(this.state.country, state);
      this.setState({
        state: state,
      });
    } else {
      this.setState({
        state: state,
        schools: null,
      });
    }
  }

  selectSchool(school_id) {
    const school = this.state.schools.find(
      (item) => item.school_id === school_id
    );
    if (school) {
      this.props.onUpdate(school);
    }
  }

  getSchools(country, state) {
    API.get("/schools?state=" + state, (error, data) => {
      const schools = data.map((item) => {
        return {
          id: item.school_id,
          data: [item.school_name, item.school_city],
        };
      });
      this.setState({ schools: data, schoolsTable: schools });
    });
  }

  createSchool(data) {
    API.post(
      "/schools",
      {
        school_name: data.School,
        school_city: data.City,
        school_state: this.state.state,
        school_country: this.state.country,
      },
      (status, data) => {
        if (status === 200) {
          this.props.onUpdate(JSON.parse(data));
        }
      }
    );
  }

  render() {
    return (
      <div>
        <div className="scs-module-element">
          <p>
            <b>Select your school</b>
          </p>
        </div>
        <div className="scs-module-element">
          <label>Country: </label>
          <ButtonOptions
            options={constants.countries}
            onUpdate={this.selectCountry}
            value={this.state.country}
          />
        </div>
        {this.state.country && constants.states[this.state.country] && (
          <div className="scs-module-element">
            <label>State: </label>
            <DropdownOptions
              options={constants.states[this.state.country]}
              onUpdate={this.selectState}
              value={this.state.state}
            />
          </div>
        )}
        {this.state.schools && (
          <SelectionTable
            options={this.state.schoolsTable}
            labels={["School", "City"]}
            onUpdate={this.selectSchool}
            onCreate={this.createSchool}
          />
        )}
      </div>
    );
  }
}

export default SchoolSelect;
