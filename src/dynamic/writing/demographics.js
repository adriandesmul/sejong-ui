import React from "react";
import { Form, Input, DatePicker, Select, Radio, Button } from "antd";
import constants from "../common/constants";
import moment from "moment";

const layout = {
  labelCol: { offset: 3, span: 6 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 9, span: 12 },
};

export default function Demographics(props) {
  if (props.initialValues && props.initialValues.personal_date_of_birth) {
    props.initialValues.personal_date_of_birth = moment(
      `${props.initialValues.personal_date_of_birth_year}-${props.initialValues.personal_date_of_birth_month}-${props.initialValues.personal_date_of_birth_day}`
    );
  }

  function save(values) {
    console.log({
      ...values,
      personal_date_of_birth_month: values.personal_date_of_birth.month() + 1,
      personal_date_of_birth_day: values.personal_date_of_birth.date(),
      personal_date_of_birth_year: values.personal_date_of_birth.year(),
    });
  }

  return (
    <>
      <h2>Demographics</h2>
      <Form
        name="demographics"
        {...layout}
        onFinish={save}
        initialValues={props.initialValues}
      >
        <Form.Item
          label="First Name"
          name="personal_first_name"
          rules={[{ message: "First name is required", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="personal_last_name"
          rules={[{ message: "Last name is required", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="personal_date_of_birth"
          rules={[{ message: "Date of Birth is required", required: true }]}
        >
          <DatePicker format="MM/DD/YYYY" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address_line_1"
          rules={[{ message: "Address is required", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address 2" name="address_line_2">
          <Input />
        </Form.Item>
        <Form.Item
          label="Town"
          name="address_town"
          rules={[{ message: "Town is required", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="State"
          name="address_state"
          rules={[{ message: "State is required", required: true }]}
        >
          <Select
            options={constants.allStates.map((i) => {
              return { label: i, value: i };
            })}
            showSearch
          ></Select>
        </Form.Item>
        <Form.Item
          label="Country"
          name="address_country"
          rules={[{ message: "Country is required", required: true }]}
        >
          <Select
            options={constants.countries.map((i) => {
              return { label: i, value: i };
            })}
          ></Select>
        </Form.Item>
        <Form.Item
          label="Zip"
          name="address_zip"
          rules={[{ message: "Zip is required", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
