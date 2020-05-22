import React, { useState } from "react";
import { Form, Radio, Button, Input, Select } from "antd";
import EntryArea from "../writingEntry/entryArea";
import EducationSelect from "../educationSelect/educationSelect";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 10 },
};

export default function Writing(props) {
  const [type, setType] = useState(
    props.initialValues ? props.initialValues.type : null
  );
  const [division, setDivision] = useState(
    props.initialValues ? props.initialValues.division : null
  );
  const [body, setBody] = useState(
    props.initialValues ? props.initialValues.body : null
  );
  const [school, setSchool] = useState(
    props.initialValues
      ? {
          school_id: props.initialValues.school_id,
          school_name: props.initialValues.school_name,
          school_city: props.initialValues.school_city,
          school_state: props.initialValues.school_state,
          school_country: props.initialValues.school_country,
        }
      : null
  );
  const [teacher, setTeacher] = useState(
    props.initialValues
      ? {
          teacher_id: props.initialValues.teacher_id,
          teacher_email: props.initialValues.teacher_email,
          teacher_name: props.initialValues.teacher_name,
        }
      : null
  );
  const [form] = Form.useForm();

  const onFinish = (values) => {
    props.save({ ...values, body, school, teacher });
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

  const handleEducationChange = (s, t) => {
    setSchool(s);
    setTeacher(t);
  };

  return (
    <>
      <h2>Writing Entry</h2>{" "}
      <Form
        {...layout}
        name="demographics"
        onFinish={onFinish}
        onFieldsChange={onChange}
        form={form}
        initialValues={props.initialValues}
      >
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

        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>

        {type === "sijo" && (
          <EntryArea
            type="sijo"
            onChange={onBodyChange}
            initialValue={props.initialValues.body}
          />
        )}

        {type === "essay" && (
          <div className="scs-entry-area essay">
            <EntryArea
              type="essay"
              onChange={onBodyChange}
              initialValue={props.initialValues.body}
            />
          </div>
        )}

        <EducationSelect
          school={school}
          teacher={teacher}
          handleEducationChange={handleEducationChange}
        />

        <Form.Item {...tailLayout} style={{ marginTop: "24px" }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
