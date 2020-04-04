import React, { useState } from "react";
import API from "../api/api";
import { Table, Tag, Tooltip, Popover, Input } from "antd";
const { Search } = Input;
import { InfoCircleFilled, EyeTwoTone } from "@ant-design/icons";
import "./entryList.scss";
import { useEffect } from "react";
import styled from "styled-components";

const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: value => (
      <>
        <Tooltip title="Click to spoof">
          <a>{value.user}</a>
        </Tooltip>
        {value.search && (
          <EyeTwoTone twoToneColor="#fa8c16" style={{ marginLeft: "10px" }} />
        )}
      </>
    )
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: value => (
      <>
        {value.email}
        {value.search && (
          <EyeTwoTone twoToneColor="#fa8c16" style={{ marginLeft: "10px" }} />
        )}
      </>
    )
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
          {value.search && (
            <EyeTwoTone twoToneColor="#fa8c16" style={{ marginLeft: "10px" }} />
          )}
        </Popover>
      );
    }
  },
  {
    title: "Sijo",
    dataIndex: "sijo",
    key: "sijo",
    render: value => {
      if (!value || !value.body) {
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
            <span className="bold">School: </span> {value.school_name}
          </p>
          <p>
            <span className="bold">Teacher: </span> {value.teacher_name}
          </p>
          <p>
            <span className="bold">Email: </span> {value.teacher_email}
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
          {value.search && (
            <EyeTwoTone twoToneColor="#fa8c16" style={{ marginLeft: "10px" }} />
          )}
        </Popover>
      );
    }
  },
  {
    title: "Essay",
    dataIndex: "essay",
    key: "essay",
    render: value => {
      if (!value || !value.body) {
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
            <span className="bold">School: </span> {value.school_name}
          </p>
          <p>
            <span className="bold">Teacher: </span> {value.teacher_name}
          </p>
          <p>
            <span className="bold">Email: </span> {value.teacher_email}
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
          {value.search && (
            <EyeTwoTone twoToneColor="#fa8c16" style={{ marginLeft: "10px" }} />
          )}
        </Popover>
      );
    }
  }
];

function includes(value, term) {
  if (!value) return false;
  return value.toLowerCase().indexOf(term.toLowerCase()) !== -1;
}

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: row-reverse;
`;

export default function AdminEntryList(props) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/admin/users", (err, data) => {
      setUsers(data);
      console.log(data);
    });
  }, []);

  let displayUsers = users.map(user => {
    return {
      key: user.key,
      user: { user: user.user, search: false },
      email: { email: user.email, search: false },
      demographics: user.demographics,
      sijo: user.sijo,
      essay: user.essay
    };
  });

  if (search.length > 1) {
    displayUsers = displayUsers
      .filter(
        user =>
          includes(user.user.user, search) ||
          includes(user.email.email, search) ||
          (user.demographics &&
            includes(user.demographics.personal_first_name, search)) ||
          (user.demographics &&
            includes(user.demographics.personal_last_name, search)) ||
          (user.essay && includes(user.essay.school_name, search)) ||
          (user.essay && includes(user.essay.teacher_name, search)) ||
          (user.sijo && includes(user.sijo.school_name, search)) ||
          (user.sijo && includes(user.sijo.teacher_name, search))
      )
      .map(user => {
        return {
          key: user.key,
          user: { ...user.user, search: includes(user.user.user, search) },
          email: { ...user.email, search: includes(user.email.email, search) },
          demographics: {
            ...user.demographics,
            search:
              (user.demographics &&
                includes(user.demographics.personal_first_name, search)) ||
              (user.demographics &&
                includes(user.demographics.personal_last_name, search))
          },
          sijo: {
            ...user.sijo,
            search:
              (user.sijo && includes(user.sijo.school_name, search)) ||
              (user.sijo && includes(user.sijo.teacher_name, search))
          },
          essay: {
            ...user.essay,
            search:
              (user.essay && includes(user.essay.school_name, search)) ||
              (user.essay && includes(user.essay.teacher_name, search))
          }
        };
      });
  }

  console.log(displayUsers);

  return (
    <>
      <SearchBar>
        <Search
          style={{ width: "200px" }}
          onSearch={value => setSearch(value)}
        ></Search>
        <div style={{ lineHeight: "32px" }}>
          Currently showing: <Tag>{search.length > 1 ? search : "All"}</Tag>
        </div>
      </SearchBar>
      <Table columns={columns} dataSource={displayUsers} size="small"></Table>
    </>
  );
}
