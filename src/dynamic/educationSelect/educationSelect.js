import React from "react";
import TeacherSelect from "./teacherSelect";
import SchoolSelect from "./schoolSelect";
import { EditOutlined } from "@ant-design/icons";

export default function EductionSelect(props) {
  const { school, teacher } = props;

  function updateSchool(school) {
    if (school === null) {
      props.handleEducationChange(null, null);
    } else {
      props.handleEducationChange(school, null);
    }
  }

  function updateTeacher(teacher) {
    props.handleEducationChange(props.school, teacher);
  }

  return (
    <div style={{ marginTop: "10px", paddingBottom: "1rem" }}>
      {school && (
        <div className="scs-module-element">
          <span className="bold">School:</span>&nbsp;
          {school.school_name}, {school.school_city}, {school.school_state}
          <div className="scs-inline-button" onClick={() => updateSchool(null)}>
            &nbsp;
            <EditOutlined />
          </div>
        </div>
      )}
      {!school && <SchoolSelect onUpdate={updateSchool} />}
      {school && !teacher && (
        <TeacherSelect onUpdate={updateTeacher} school_id={school.school_id} />
      )}
      {teacher && (
        <div className="scs-module-element">
          <span className="bold">Teacher:</span>&nbsp;
          {teacher.teacher_name}
          <div
            className="scs-inline-button"
            onClick={() => updateTeacher(null)}
          >
            {" "}
            &nbsp;
            <EditOutlined />
          </div>
        </div>
      )}
    </div>
  );
}
