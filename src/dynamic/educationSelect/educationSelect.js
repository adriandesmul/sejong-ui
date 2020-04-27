import React from "react";
import TeacherSelect from "./teacherSelect";
import SchoolSelect from "./schoolSelect";

class EductionSelect extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   school: null,
    //   teacher: null
    // };

    this.updateSchool = this.updateSchool.bind(this);
    this.updateTeacher = this.updateTeacher.bind(this);
    // this.handleEducationChange = this.props.handleEducationChange;
  }

  updateSchool(school) {
    if (school === null) {
      this.props.handleEducationChange(null, null);
    } else {
      this.props.handleEducationChange(school, null);
    }
  }

  updateTeacher(teacher) {
    this.props.handleEducationChange(this.props.school, teacher);
  }

  render() {
    const school = this.props.school;
    const teacher = this.props.teacher;

    return (
      <div style={{ paddingBottom: "1rem" }}>
        {school && (
          <div className="scs-module-element">
            <span className="bold">School:</span>&nbsp;
            {school.school_name}, {school.school_city}, {school.school_state}
            <div
              className="scs-inline-button"
              onClick={() => this.updateSchool(null)}
            >
              &nbsp;<i className="fas fa-pencil-alt"></i>
            </div>
          </div>
        )}
        {!school && <SchoolSelect onUpdate={this.updateSchool} />}
        {school && !teacher && (
          <TeacherSelect
            onUpdate={this.updateTeacher}
            school_id={school.school_id}
          />
        )}
        {teacher && (
          <div className="scs-module-element">
            <span className="bold">Teacher:</span>&nbsp;
            {teacher.teacher_name}
            <div
              className="scs-inline-button"
              onClick={() => this.updateTeacher(null)}
            >
              {" "}
              &nbsp;<i className="fas fa-pencil-alt"></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EductionSelect;
