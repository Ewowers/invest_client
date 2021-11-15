import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Input, Select, Button, List, Typography } from "antd";
import { useState } from "react/cjs/react.development";
import fetchs from "../../util/xml";
const { Option } = Select;
const AdminMail = () => {
  const [rols, setRols] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(null);
  const [values, setValues] = useState([]);
  const address = useRef(null);
  const [form] = Form.useForm();
  const getRols = () => {
    fetchs.get("/api/users/roles").then((res) => {
      setRols(res.data);
    });
  };
  const sort = (value) => {
    setFilters(value);
  };
  const getUsers = () => {
    fetchs.get("/api/users").then((res) => {
      setUsers(res.data);
    });
  };
  const addEmail = (id) => {
    const user = users.find((item) => item.id === id);
    setValues([...values, user.email]);
  };
  const addEmailAll = () => {
    const user = users.filter((item) => (filters === null || filters === undefined ? true : item.role === filters));
    setValues([...user.map((item) => item.email)]);
  };
  const clearEmail = () => {
    setValues([]);
  };
  useEffect(() => {
    getRols();
    getUsers();
  }, []);
  form.setFieldsValue({
    address: values,
  });
  const onFinish = (values) => {
    //начать рассылку
    console.log("Success:", values);
    fetchs.post("/api/mail/spam", values).then((res) => console.log(res.data));
  };
  return (
    <Row gutter={25}>
      <Col span={12}>
        <Form form={form} name="mail" layout="vertical" onFinish={onFinish}>
          <Form.Item name="address" label="Адресс" rules={[{ required: true, message: "Please select your country!" }]}>
            <Select
              mode="multiple"
              placeholder="Inserted are removed"
              style={{ width: "100%" }}
              ref={address}
              allowClear
            >
              {users
                .filter((item) => (filters === null || filters === undefined ? true : item.role === filters))
                .map((item, i) => (
                  <Option value={item.email} key={i}>
                    {item.email}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="subject"
            label="Загаловок"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Отправить</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <label htmlFor="sort" style={{ marginBottom: 8, display: "block" }}>
          Сортировка по ролям
        </label>
        <Select id="sort" style={{ width: 100 + "%" }} onChange={sort}>
          <Option value={null}>all</Option>
          {rols.map((item, i) => (
            <Option value={item.value} key={i}>
              {item.value}
            </Option>
          ))}
        </Select>
        <Button style={{ margin: "25px 0" }} onClick={addEmailAll}>
          Добавить всех из списка
        </Button>
        <Button style={{ marginLeft: 25 }} onClick={clearEmail}>
          Убрать из списка
        </Button>
        <List
          style={{ margin: "15px 0" }}
          header={<div>Пользователи</div>}
          bordered
          dataSource={users.filter((item) =>
            filters === null || filters === undefined ? true : item.role === filters
          )}
          renderItem={(item) => (
            <List.Item style={{ justifyContent: "flex-start" }}>
              <Typography.Text code style={{ width: 100 }}>
                {item.role}
              </Typography.Text>
              <Typography.Text mark style={{ minWidth: 200 }}>
                {item.email}
              </Typography.Text>
              <Typography.Text style={{ minWidth: 200 }}>{item.username}</Typography.Text>
              <Button onClick={() => addEmail(item.id)}>Добавить</Button>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};
export default AdminMail;
