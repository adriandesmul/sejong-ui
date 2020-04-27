import React, { useState } from "react";
import { Menu, Layout } from "antd";
const { Content } = Layout;
import { EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import TeacherListView from "./teacherListView";
import TeacherEntryView from "./teacherEntryView";

export default function TeacherView(props) {
  const [tab, setTab] = useState("view");
  const [student, setStudent] = useState();

  const editEntry = (student) => {
    const edit = {
      first_name: student.first_name,
      last_name: student.last_name,
      user_id: student.user_id,
    };

    if (student.sijo) {
      edit.title = student.sijo.title;
      edit.body = student.sijo.body;
      edit.division = student.sijo.division;
      edit.type = "sijo";
    }

    if (student.essay) {
      edit.title = student.essay.title;
      edit.body = student.essay.body;
      edit.division = student.essay.division;
      edit.folktale = student.essay.folktale;
      edit.type = "essay";
    }

    setStudent(edit);
    setTab("add");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Menu
        style={{
          borderRadius: "5px 5px 0px 0px",
          paddingBottom: "10px",
          border: "none",
        }}
        mode="horizontal"
        onClick={(e) => setTab(e.key)}
        selectedKeys={[tab]}
      >
        <Menu.Item key="view">
          <EyeOutlined />
          View students
        </Menu.Item>
        <Menu.Item key="add">
          <PlusCircleOutlined />
          Add new entries
        </Menu.Item>
      </Menu>
      <Content
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        {tab === "view" && <TeacherListView editEntry={editEntry} />}
        {tab === "add" && (
          <TeacherEntryView
            changeTab={() => {
              setTab("view");
              setStudent();
            }}
            student={student}
          />
        )}
      </Content>
    </div>
  );
}
