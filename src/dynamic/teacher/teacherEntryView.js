import React, { useState } from "react";
import { Button, Divider, Form, Input, Radio, Select } from "antd";
import API from "../api/api";
import EntryArea from "../writingEntry/entryArea";

export default function TeacherEntryView(props) {
  const [type, setType] = useState(props.student.type);
  const [division, setDivision] = useState(props.student.division);
  const [body, setBody] = useState(props.student.body);
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 10 },
  };

  const onFinish = (values) => {
    if (props.student) values.user_id = props.student.user_id;

    API.post("/teacher/addStudent", { ...values, body }, (status) => {
      if (status === 200) {
        form.resetFields();
        props.changeTab();
      }
    });
  };

  const onChange = (changedField) => {
    if (
      !changedField[0] ||
      !(
        changedField[0].name[0] === "type" ||
        changedField[0].name[0] === "division"
      )
    )
      return;
    if (changedField[0].name[0] === "type") setType(changedField[0].value);
    if (changedField[0].name[0] === "division")
      setDivision(changedField[0].value);
  };

  const onBodyChange = (content) => {
    setBody(content);
  };

  return (
    <>
      <h2>Add new entry</h2>

      <Divider orientation="left">Student information</Divider>
      <Form
        {...layout}
        name="demographics"
        onFinish={onFinish}
        onFieldsChange={onChange}
        form={form}
        initialValues={props.student}
      >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: "true", message: "First name required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: "true", message: "Last name required" }]}
        >
          <Input />
        </Form.Item>

        <Divider orientation="left">Entry information</Divider>

        <Form.Item
          label="Entry Type"
          name="type"
          rules={[{ required: "true", message: "Type required" }]}
        >
          <Radio.Group>
            <Radio.Button value="essay">Essay</Radio.Button>
            <Radio.Button value="sijo">Sijo</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {type === "essay" && (
          <Form.Item
            label="Division"
            name="division"
            rules={[{ required: "true", message: "Division required" }]}
          >
            <Radio.Group>
              <Radio.Button value="Junior">Junior</Radio.Button>
              <Radio.Button value="Senior">Senior</Radio.Button>
              <Radio.Button value="Adult">Adult</Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}

        {type === "sijo" && (
          <Form.Item
            label="Division"
            name="division"
            rules={[{ required: "true", message: "Division required" }]}
          >
            <Radio.Group>
              <Radio.Button value="Student">Student</Radio.Button>
              <Radio.Button value="Adult">Adult</Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}

        {type === "essay" && division === "Junior" && (
          <Form.Item
            label="Folktale"
            name="folktale"
            rules={[{ required: "true", message: "Folktale required" }]}
          >
            <Select>
              <Select.Option value="Folktale A">Folktale A</Select.Option>
              <Select.Option value="Folktale B">Folktale B</Select.Option>
              <Select.Option value="Folktale C">Folktale C</Select.Option>
              <Select.Option value="Folktale D">Folktale D</Select.Option>
              <Select.Option value="Folktale E">Folktale E</Select.Option>
              <Select.Option value="Folktale F">Folktale F</Select.Option>
              <Select.Option value="Folktale G">Folktale G</Select.Option>
              <Select.Option value="Folktale H">Folktale H</Select.Option>
            </Select>
          </Form.Item>
        )}

        {type && (
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
        )}

        {type === "essay" && (
          <div id="essay">
            <EntryArea
              type="essay"
              onChange={onBodyChange}
              initialValue={props.student.body}
            />
          </div>
        )}
        {type === "sijo" && (
          <EntryArea
            type="sijo"
            onChange={onBodyChange}
            initialValue={props.student.body}
          />
        )}

        <Form.Item {...tailLayout} style={{ marginTop: "24px" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
