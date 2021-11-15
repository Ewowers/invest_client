import React, { useEffect, useState } from "react";
import { Button, Space, Table, Modal, Form, Input, Select, Radio } from "antd";
import axios from "../../util/xml";
const { Option } = Select;
const Edit = ({ roles, form, visible, onCreate, onCancel, info }) => {
  return (
    <Modal
      visible={visible}
      title={info?.username}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="username" label="username">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="email">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="password">
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="role">
          <Select mode="multiple">
            {roles.map((item, i) => (
              <Option key={i} value={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="active" label="active">
          <Radio.Group>
            <Radio value={true}>Активирован</Radio>
            <Radio value={false}>Не активирован</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="ban" label="ban">
          <Radio.Group>
            <Radio value={true}>Забанен</Radio>
            <Radio value={false}>Не забанен</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const CreateUser = ({ error, roles, visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Создание пользователя"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" initialValues={{ modifier: "public" }}>
        <h1 style={{ color: "red", textAlign: "center" }}>{error}</h1>
        <Form.Item name="username" label="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="email" rules={[{ required: true, message: "Please input your email!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item name="role" label="role" rules={[{ required: true, message: "Please input your role!" }]}>
          <Select mode="multiple">
            {roles.map((item, i) => (
              <Option key={i} value={item.value}>
                {item.description}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="active" label="active" rules={[{ required: true, message: "Please input your active!" }]}>
          <Radio.Group>
            <Radio value={true}>Активирован</Radio>
            <Radio value={false}>Не активирован</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="ban" label="ban" rules={[{ required: true, message: "Please input your ban!" }]}>
          <Radio.Group>
            <Radio value={true}>Забанен</Radio>
            <Radio value={false}>Не забанен</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const User = () => {
  //пользователи
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    get();
  }, []);
  const get = () => {
    axios.get("/api/users").then((res) => {
      let arr = res.data.map((item, i) => {
        return { ...item, key: i };
      });
      setUsers(arr);
    });
    axios.get("/api/users/roles").then((res) => setRoles(res.data.map((item) => item)));
  };
  //создание нового пользователя
  const [createUser, setCreateUser] = useState(false);
  const [createUserError, setCreateUserError] = useState(null);
  const onCreate = (values) => {
    axios.post("/api/users/create", values).then((res) => {
      if (res.data?.error) return setCreateUserError(res.data.error);
      else {
        setCreateUser(false);
        get();
      }
    });
  };
  const showUser = () => setCreateUser(true);
  //редактирование пользователя
  const [editModal, setEditModal] = useState(false);
  const [user, setUser] = useState({});
  const [editForm] = Form.useForm();
  const onEdit = (values) => {
    axios.put("/api/users/" + user.id, values).then((res) => get());
    setEditModal(false);
  };
  const showEdit = (user) => {
    setUser(user);
    editForm.setFieldsValue({ ...user });
    setEditModal(true);
  };
  const cancelEdit = () => setEditModal(false);
  //удаление
  const remove = (id) => axios.remove("/api/users/" + id).then(() => get());
  //Бан
  const banned = (id, ban) => axios.put("/api/users/" + id, { ban: ban }).then(() => get());
  //таблица
  const banStatus = (a) => (a ? "Забанен" : "Не забанен");
  const activeStatus = (a) => (a ? "Активирован" : "Не активирован");
  const columns = [
    { title: "username", dataIndex: "username", key: "key" },
    { title: "email", dataIndex: "email", key: "key" },
    { title: "password", dataIndex: "password", key: "key" },
    { title: "role", dataIndex: "role", key: "key", render: (role) => role.join(", ") },
    { title: "ip", dataIndex: "ip", key: "key" },
    { title: "ban", dataIndex: "ban", key: "key", render: (ban) => banStatus(ban) },
    { title: "active", dataIndex: "active", key: "key", render: (active) => activeStatus(active) },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showEdit(item)}>
            Редактировать
          </Button>
          <Button danger type="primary" onClick={() => remove(item.id)}>
            Удалить
          </Button>
          {item.ban ? (
            <Button danger type="primary" onClick={() => banned(item.id, false)}>
              Разбанить
            </Button>
          ) : (
            <Button danger type="primary" onClick={() => banned(item.id, true)}>
              Забанить
            </Button>
          )}
        </Space>
      ),
    },
  ];
  return (
    <>
      <header style={{ marginBottom: 25 }}>
        <Button onClick={showUser} type="primary">
          новый юзер
        </Button>
      </header>
      <Table columns={columns} dataSource={users} />
      <Edit roles={roles} visible={editModal} onCreate={onEdit} onCancel={cancelEdit} info={user} form={editForm} />
      <CreateUser error={createUserError} roles={roles} visible={createUser} onCreate={onCreate} onCancel={() => setCreateUser(false)} />
    </>
  );
};
export default User;
