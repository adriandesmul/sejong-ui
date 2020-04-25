import React, { useState } from "react";
import { Avatar, List, Tag } from "antd";
import { CheckOutlined, ExclamationOutlined } from "@ant-design/icons";
import API from "../api/api";
import "./teacherListView.scss";

const mockData = [
  {
    id: 1,
    first_name: "Adrian",
    last_name: "De Smul",
    email: "adriandesmul@gmail.com",
    demographics_complete: true,
    essay_complete: true,
    sijo_complete: false,
  },
  {
    id: 2,
    first_name: "Adrian",
    last_name: "De Smul",
    email: "adriandesmul@gmail.com",
  },
  {
    id: 3,
    first_name: "Adrian",
    last_name: "De Smul",
    email: "adriandesmul@gmail.com",
  },
];

function renderStudent(student) {
  return (
    <List.Item
      actions={[
        <a key="list-view">View Entry</a>,
        <a key="list-pdf">Export as PDF</a>,
      ]}
    >
      <List.Item.Meta
        avatar={
          student.demographics_complete &&
          (student.sijo_complete || student.essay_complete) ? (
            <Avatar
              style={{ backgroundColor: "green", verticalAlign: "middle" }}
              icon={<CheckOutlined />}
            />
          ) : (
            <Avatar
              style={{
                backgroundColor: "red",
                verticalAlign: "middle",
              }}
              icon={<ExclamationOutlined />}
            />
          )
        }
        title={student.first_name + " " + student.last_name}
        description={student.email}
      />
      <Tag color={student.demographics_complete ? "green" : "red"}>
        Personal Info
      </Tag>
      <Tag color={student.essay_complete ? "green" : "red"}>Essay</Tag>
      <Tag color={student.sijo_complete ? "green" : "red"}>Sijo</Tag>
    </List.Item>
  );
}

export default function TeacherListView(props) {
  return <List dataSource={mockData} renderItem={renderStudent}></List>;
}
