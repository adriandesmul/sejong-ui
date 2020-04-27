import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { UserOutlined, FileTextOutlined } from "@ant-design/icons";
const { Content } = Layout;
import UserList from "./userList";
import SubmissionList from "./submissionList";

export default function AdminView(props) {
  const [tab, setTab] = useState("submissions");

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
        <Menu.Item key="users">
          <UserOutlined />
          Users
        </Menu.Item>
        <Menu.Item key="submissions">
          <FileTextOutlined />
          Submissions
        </Menu.Item>
      </Menu>
      <Content
        style={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        {tab === "users" && <UserList />}
        {tab === "submissions" && <SubmissionList />}
      </Content>
    </div>
  );
}
