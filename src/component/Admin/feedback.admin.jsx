import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import axios from "../../util/xml";
const Use = (id, get) => {
  axios.put("/api/feedback/" + id).then((res) => get());
};
export const AdminFeedBack = () => {
  const [state, setState] = useState();
  const get = () => {
    axios.get("/api/feedback").then((res) =>
      setState(
        res.data.map((item, i) => {
          return { ...item, key: i };
        })
      )
    );
  };
  useEffect(() => {
    axios.get("/api/feedback").then((res) =>
      setState(
        res.data.map((item, i) => {
          return { ...item, key: i };
        })
      )
    );
  }, []);
  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: "key",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "key",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "key",
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "key",
    },
    {
      title: "Сообщение",
      dataIndex: "message",
      key: "key",
    },
    {
      title: "Ответ",
      dataIndex: "use",
      key: "key",
      render: (use, obj) =>
        use ? (
          "Да"
        ) : (
          <Button type="primary" onClick={() => Use(obj.id, get)}>
            Ответить
          </Button>
        ),
    },
  ];

  return <Table dataSource={state} columns={columns} />;
};
