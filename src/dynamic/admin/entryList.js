import React from "react";
import { Table, Button, Tag, Tooltip, message, Popover } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import "./entryList.scss";

const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: value => (
      <Tooltip title="Click to spoof">
        <a>{value}</a>
      </Tooltip>
    )
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "Demographics",
    dataIndex: "demographics",
    key: "demographics",
    render: value => {
      if (!value) {
        return <Tag color="red">Incomplete</Tag>;
      }

      const popoverContent = (
        <div className="scs-popover">
          <p>
            {value.personal_first_name}&nbsp;{value.personal_last_name}
          </p>
          <p>
            <span className="bold">DOB: </span>{" "}
            {value.personal_date_of_birth_month}/
            {value.personal_date_of_birth_day}/
            {value.personal_date_of_birth_year}
          </p>
          <p>
            <span className="bold">Address: </span>
          </p>
          <p>{value.address_line_1}</p>
          <p>{value.address_line_2}</p>
          <p>
            {value.address_town}, {value.address_state} {value.address_zip}
          </p>
          <p>{value.address_country}</p>
        </div>
      );

      return (
        <Popover
          title={<span className="bold">Demographics</span>}
          content={popoverContent}
        >
          <Tag color={value.complete ? "green" : "red"}>
            {value.personal_first_name || value.personal_last_name
              ? value.personal_first_name + " " + value.personal_last_name
              : "Incomplete"}
            &nbsp;&nbsp;
            <InfoCircleFilled></InfoCircleFilled>
          </Tag>
        </Popover>
      );
    }
  },
  {
    title: "Sijo",
    dataIndex: "sijo",
    key: "sijo",
    render: value => {
      if (!value) {
        return <Tag>Not started</Tag>;
      }

      const popoverContent = (
        <div className="scs-popover">
          <p>
            <span className="bold">Title: </span> {value.title}
          </p>
          <p>
            <span className="bold">Word Count: </span>{" "}
            {value.body ? value.body.split(" ").length : 0} words
          </p>
          <br />
          <p>
            <span className="bold">School: </span> {value.schoolName}
          </p>
          <p>
            <span className="bold">Teacher: </span> {value.teacherName}
          </p>
          <p>
            <span className="bold">Email: </span> {value.teacherEmail}
          </p>
        </div>
      );

      return (
        <Popover
          title={<span className="bold">Sijo</span>}
          content={popoverContent}
        >
          <Tag color={value.complete ? "green" : "red"}>
            {value.complete ? "Complete" : "Incomplete"}&nbsp;&nbsp;
            <InfoCircleFilled></InfoCircleFilled>
          </Tag>
        </Popover>
      );
    }
  },
  {
    title: "Essay",
    dataIndex: "essay",
    key: "essay",
    render: value => {
      if (!value) {
        return <Tag>Not started</Tag>;
      }

      const popoverContent = (
        <div className="scs-popover">
          <p>
            <span className="bold">Title: </span> {value.title}
          </p>
          <p>
            <span className="bold">Word Count: </span>{" "}
            {value.body ? value.body.split(" ").length : 0} words
          </p>
          <p>
            <span className="bold">Division: </span> {value.division}
          </p>
          <p>
            <span className="bold">Folktale: </span> {value.folktale}
          </p>
          <br />
          <p>
            <span className="bold">School: </span> {value.schoolName}
          </p>
          <p>
            <span className="bold">Teacher: </span> {value.teacherName}
          </p>
          <p>
            <span className="bold">Email: </span> {value.teacherEmail}
          </p>
        </div>
      );

      return (
        <Popover
          title={<span className="bold">Essay</span>}
          content={popoverContent}
        >
          <Tag color={value.complete ? "green" : "red"}>
            {value.complete ? "Complete" : "Incomplete"}&nbsp;&nbsp;
            <InfoCircleFilled></InfoCircleFilled>
          </Tag>
        </Popover>
      );
    }
  }
];

const data = [
  {
    key: 1,
    user: "xxx-xxx-xx1",
    email: "adriandesmul@gmail.com",
    demographics: {
      complete: false,
      personal_first_name: "Adrian",
      personal_last_name: "De Smul",
      personal_date_of_birth_day: 10,
      personal_date_of_birth_month: 12,
      personal_date_of_birth_year: 1991
    },
    sijo: {
      complete: true,
      title: "My sijo",
      body: "This is my sijo",
      schoolName: "Highcrest Middle School",
      teacherName: "Mr. Kim",
      teacherEmail: "kim@example.com"
    },
    essay: null
  },
  {
    key: 2,
    user: "xxx-xxx-xx2",
    email: "neildesmul@gmail.com",
    demographics: null,
    sijo: {
      complete: false,
      title: "My title",
      body: null,
      schoolName: null,
      teacherName: null,
      teacherEmail: null
    },
    essay: {
      complete: true,
      title: "Essay title",
      body: null,
      division: "Senior",
      folktale: "Folktale A: Snakes!",
      schoolName: "New Trier",
      teacherName: "Mr. Kim",
      teacherEmail: "kim@example.com"
    }
  },
  {
    key: 3,
    user: "xxx-xxx-xx3",
    email: "herahkim@gmail.com",
    demographics: {
      complete: true,
      personal_first_name: "Herah",
      personal_last_name: "Kim",
      personal_date_of_birth_day: 10,
      personal_date_of_birth_month: 12,
      personal_date_of_birth_year: 1991,
      address_line_1: "606 Forest Rd.",
      address_line_2: "Apt. 123",
      address_town: "Glenview",
      address_state: "IL",
      address_zip: "60091",
      address_country: "USA"
    },
    sijo: null,
    essay: null
  }
];

export default function AdminEntryList(props) {
  const msg = () => {
    message.success("Hello!");
    console.log("Did it!");
  };

  return <Table columns={columns} dataSource={data} size="small"></Table>;
}
