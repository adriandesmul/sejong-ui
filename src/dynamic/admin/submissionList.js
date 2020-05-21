import React, { useState, useEffect } from "react";
import { Table, Tooltip, message, Modal } from "antd";
import {
  InfoCircleOutlined,
  DownloadOutlined,
  UserAddOutlined,
  EditOutlined,
} from "@ant-design/icons";
import API from "../api/api";
import Demographics from "../writing/demographics";
import Writing from "../writing/writing";

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

export default function SubmissionList(props) {
  const [entries, setEntries] = useState([]);
  const [student, setStudent] = useState();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    API.get("/admin/submissions", (err, data) => {
      setEntries(
        data.map((i) => {
          return {
            ...i,
            name: i.personal_first_name + " " + i.personal_last_name,
            teacher: {
              name: i.teacher_name,
              email: i.teacher_email,
            },
            school: i.school_name + ", " + i.school_state,
          };
        })
      );
      console.log(data);
    });
  }, []);

  const columns = [
    {
      title: "User",
      dataIndex: "user_id",
      key: "user_id",
      render: (value) => (
        <Tooltip title={value}>
          {value.indexOf("mock-") === -1 && <InfoCircleOutlined />}
          {value.indexOf("mock-") !== -1 && <UserAddOutlined />}
        </Tooltip>
      ),
    },
    {
      title: "First",
      dataIndex: "personal_first_name",
      key: "first_name",
    },
    {
      title: "Last",
      dataIndex: "personal_last_name",
      key: "last_name",
    },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Division", dataIndex: "division", key: "division" },
    { title: "Folktale", dataIndex: "folktale", key: "folktale" },
    {
      title: "Teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (value) => <Tooltip title={value.email}>{value.name}</Tooltip>,
    },
    { title: "School", dataIndex: "school", key: "school" },
    {
      title: "Actions",
      dataIndex: "user_id",
      key: "pdf",
      render: (value, item) => (
        <>
          <DownloadOutlined
            style={{ marginRight: "10px" }}
            onClick={() =>
              getPreview(
                value,
                item.type,
                item.personal_first_name,
                item.personal_last_name
              )
            }
          />
          <EditOutlined
            onClick={() => {
              console.log(item);
              setStudent(item);
              setModal(true);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={entries} size="small"></Table>
      <Modal
        visible={modal}
        onCancel={() => setModal(false)}
        width={800}
        title="Edit Entry"
      >
        <Demographics initialValues={student} />
        <Writing initialValues={student} />
      </Modal>
    </>
  );
}
