import React, { useState } from "react";
import {
  Form,
  Radio,
  Select,
  Button,
  Table,
  Modal,
  Input,
  message,
} from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import constants from "../common/constants";
import API from "../api/api";

const usaOptions = constants.states.USA.map((item) => (
  <Select.Option key={item} value={item}>
    {item}
  </Select.Option>
));

const canadaOptions = constants.states.Canada.map((item) => (
  <Select.Option key={item} value={item}>
    {item}
  </Select.Option>
));

const otherOptions = constants.states.Other.map((item) => (
  <Select.Option key={item} value={item}>
    {item}
  </Select.Option>
));

export default function TeacherLink(props) {
  const [country, setCountry] = useState("");
  const [data, setData] = useState([]);
  const [teacher, setTeacher] = useState();
  const [userId, setUserId] = useState();

  const columns = [
    { title: "School Name", key: "school_name", dataIndex: "school_name" },
    { title: "Teacher Name", key: "teacher_name", dataIndex: "teacher_name" },
    {
      title: "Teacher Email",
      key: "teacher_email",
      dataIndex: "teacher_email",
    },
    {
      title: "Association",
      key: "user_id",
      dataIndex: "user_id",
      render: (value, record) => {
        if (value) {
          return (
            <Button
              onClick={() => {
                setUserId(record.user_id);
                setTeacher(record);
              }}
            >
              {value}
            </Button>
          );
        } else {
          return (
            <Button onClick={() => setTeacher(record)}>
              <UsergroupAddOutlined />
            </Button>
          );
        }
      },
    },
  ];

  function modalHeader() {
    return (
      <>
        <p>
          <span className="bold">School Name: </span>
          {teacher.school_name}
          <br />
          <span className="bold">Teacher Name: </span>
          {teacher.teacher_name}
          <br />
          <span className="bold">Teacher Email: </span>
          {teacher.teacher_email}
        </p>
        <Input value={userId} onChange={(e) => setUserId(e.target.value)} />
      </>
    );
  }

  function associateTeacher(teacher_id, user_id) {
    API.post("/admin/teacherSearch", { teacher_id, user_id }, (status) => {
      if (status === 200) {
        message.success("Saved");
      } else {
        message.error("Failed!");
      }
      setTeacher();
      setUserId();
    });
  }

  function onFinish(values) {
    console.log(values);
    API.get(
      `/admin/teacherSearch?country=${values.country}&state=${values.state}`,
      (err, data) => {
        setData(
          data.map((item) => {
            return { ...item, key: item.teacher_id };
          })
        );
      }
    );
  }

  return (
    <>
      <Form
        name="search"
        layout="inline"
        onFinish={onFinish}
        style={{ marginBottom: "10px" }}
      >
        <Form.Item name="country">
          <Radio.Group onChange={(e) => setCountry(e.target.value)}>
            <Radio.Button value="USA">USA</Radio.Button>
            <Radio.Button value="Canada">Canada</Radio.Button>
            <Radio.Button value="Other">Other</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="state">
          <Select name="state">
            {country === "USA" && usaOptions}
            {country === "Canada" && canadaOptions}
            {country === "Other" && otherOptions}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Teacher Association"
        visible={!!teacher}
        onCancel={() => setTeacher()}
        onOk={() => associateTeacher(teacher.teacher_id, userId)}
      >
        {teacher && modalHeader()}
      </Modal>
    </>
  );
}
