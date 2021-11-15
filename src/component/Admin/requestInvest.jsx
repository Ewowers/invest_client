import React, { useState, useEffect } from "react";
import { Table, Tabs, Space, Button } from "antd";
import axios from "../../util/xml";
const { TabPane } = Tabs;

export const Request = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Проект",
      dataIndex: "project",
      key: "key",
      render: (project) => {
        return project.title;
      },
    },
    {
      title: "Сумма инвестиций",
      dataIndex: "money",
      key: "key",
    },
    {
      title: "Пользователь",
      dataIndex: "user",
      key: "key",
      render: (user) => {
        return user.username;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <Space size="middle">
            <Button onClick={() => update(item.id)} type="primary">
              Одобрить
            </Button>
          </Space>
        );
      },
    },
  ];
  const [applicantSource, setApplicantSource] = useState([]);
  const [processedSource, setProcessedSource] = useState([]);
  const [allSource, setAllSource] = useState([]);
  const get = () => {
    axios.get("/api/request").then((res) => {
      setApplicantSource(
        res.data
          .map((item, i) => {
            return { ...item, key: i };
          })
          .filter((item) => (item.status ? null : item))
      );
      setProcessedSource(
        res.data
          .map((item, i) => {
            return { ...item, key: i };
          })
          .filter((item) => (item.status ? item : null))
      );
      setAllSource(res.data);
    });
  };

  const update = (id) => {
    axios.put("/api/request/" + id).then((res) => {
      get();
    });
  };
  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Заяки" key="1">
          <Table dataSource={applicantSource} columns={columns} />
        </TabPane>
        <TabPane tab="Одобренные" key="2">
          <Table dataSource={processedSource} columns={columns} />
        </TabPane>
        <TabPane tab="Все" key="3">
          <Table dataSource={allSource} columns={columns} />
        </TabPane>
      </Tabs>
    </>
  );
};
export default Request;
