import React, { useState, useEffect } from "react";
import { Avatar, List, message, Tag, Modal, Divider } from "antd";
import {
  CheckOutlined,
  ExclamationOutlined,
  EditOutlined,
} from "@ant-design/icons";
import API from "../api/api";
import "./teacherListView.scss";

function showModal(student) {
  let sijo, essay;
  if (student.sijo) {
    sijo = (
      <>
        <h2>Sijo</h2>
        <p>
          <span className="bold">Title: </span>
          {student.sijo.title}
        </p>
        <div
          className="scs-sijo-preview"
          dangerouslySetInnerHTML={{ __html: student.sijo.body }}
        ></div>
      </>
    );
  }
  if (student.essay) {
    essay = (
      <>
        <h2>Essay</h2>
        <p>
          <span className="bold">Title: </span>
          {student.essay.title}
        </p>
        <div dangerouslySetInnerHTML={{ __html: student.essay.body }}></div>
      </>
    );
  }

  Modal.info({
    title:
      "Entry information for " + student.first_name + " " + student.last_name,
    content: (
      <>
        {sijo}
        {essay}
      </>
    ),
  });
}

function getPreview(user_id, type, first_name, last_name) {
  API.get(
    "/teacher/export?type=" + type + "&user_id=" + user_id,
    (error, data) => {
      if (!data) {
        message.error("Cannot export file");
        return;
      }
      var newBlob = new Blob([data], { type: "application/pdf" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const url = window.URL.createObjectURL(newBlob);
      var link = document.createElement("a");
      link.href = url;
      link.download = first_name + " " + last_name + " - " + type + ".pdf";
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      message.success("Downloading PDF for " + first_name + " " + last_name);
    }
  );
}

export default function TeacherListView(props) {
  const [metadata, setMetadata] = useState({
    teacher_name: "",
    school_name: "",
  });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    API.get("/teacher/students", (err, data) => {
      if (data.msg) {
        setError(
          "User not associated with a teacher. Please contact Sejong Team"
        );
      }
      setMetadata({
        teacher_name: data.teacher_name,
        school_name: data.school_name,
      });
      setStudents(data.students);
    });
  }, []);

  function renderStudent(student) {
    const teacher_submitted = student.user_id.indexOf("mock-") !== -1;

    return (
      <List.Item
        actions={[
          <a key="list-view" onClick={() => showModal(student)}>
            View Entry
          </a>,
          <a
            key="list-pdf-sijo"
            onClick={() =>
              getPreview(
                student.user_id,
                "sijo",
                student.first_name,
                student.last_name
              )
            }
          >
            Export Sijo
          </a>,
          <a
            key="list-pdf-essay"
            onClick={() =>
              getPreview(
                student.user_id,
                "essay",
                student.first_name,
                student.last_name
              )
            }
          >
            Export Essay
          </a>,
        ]}
      >
        <List.Item.Meta
          avatar={
            student.demographics_complete &&
            (student.sijo_complete || student.essay_complete) ? (
              <Avatar
                style={{ backgroundColor: "green", paddingTop: "3px" }}
                icon={<CheckOutlined />}
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: "red",
                  paddingTop: "3px",
                }}
                icon={<ExclamationOutlined />}
              />
            )
          }
          title={
            <>
              {student.first_name + " " + student.last_name}
              {teacher_submitted && (
                <>
                  <Divider type="vertical" />
                  <a onClick={() => props.editEntry(student)}>
                    <EditOutlined />
                  </a>
                </>
              )}
            </>
          }
          description={
            teacher_submitted ? "Teacher submitted" : "Student submitted"
          }
        />
        <Tag color={student.demographics_complete ? "green" : "red"}>
          Personal Info
        </Tag>
        <Tag color={student.sijo_complete ? "green" : ""}>Sijo</Tag>
        <Tag color={student.essay_complete ? "green" : ""}>Essay</Tag>
      </List.Item>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>
        Students for {metadata.teacher_name} at {metadata.school_name}.
      </h2>
      <List
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          //border: "1px solid #9e9e9e",
        }}
        dataSource={students}
        renderItem={renderStudent}
      ></List>
    </>
  );
}
