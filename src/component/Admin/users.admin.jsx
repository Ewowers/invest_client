import React, { useEffect, useState } from "react";
import { Row, Col, Select, Button, Modal, Form, Input } from "antd";
import fetchs from "../../util/xml";
const { Option } = Select;
const UpdateUser = ({ user, modal, setModal, hideModal }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    fetchs.put("/api/users/" + user.id, values).then((resault) => hideModal());
  };
  form.setFieldsValue({
    username: user.username,
    password: user.password,
    email: user.email,
    role: user.role,
    ban: user.ban,
  });
  const hide = () => setModal(false);
  return (
    <Modal visible={modal} onOk={hide} onCancel={hide} getContainer={false}>
      <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="username" label="username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="password">
          <Input />
        </Form.Item>
        <Form.Item name="role" label="role">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="email">
          <Input />
        </Form.Item>
        <Form.Item name="ban" label="ban">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const NewUser = ({ isModalVisible, setIsModalVisible, roles, getUser }) => {
  const [error, setError] = useState(null);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    fetchs.post("/api/users/create", values).then((res) => {
      if (res.data?.error) setError(res.data.error);
      else {
        getUser();
        handleCancel();
      }
    });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal title="Создать пользователя" footer={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form name="basic" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <p style={{ color: "red", textAlign: "center", fontSize: 24 }}>
            <strong>{error}</strong>
          </p>
          <Form.Item
            label="username"
            name="username"
            rules={[
              {
                required: true,
                message: "Пожалуйста заполните логин",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "Пожалуйста заполните email",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Пожалуйста заполните пороль",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="role" name="role" rules={[{ required: true, message: "Пожалуйста выберите роль" }]}>
            <Select>
              {roles.map((item, i) => (
                <Option value={item.value} key={i}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
const CreateRole = ({ setIsModalVisible, isModalVisible, getRoles }) => {
  const [error, setError] = useState(null);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    fetchs.post("/api/users/createRole", values).then((res) => {
      if (res.data?.error) return setError(res.data.error);
      else {
        handleCancel();
        getRoles();
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal title="Создать Роли" footer={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form
        name="basic"
        layout="horizontal"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <p>{error}</p>
        <Form.Item
          label="Role"
          name="value"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <span>важность от 0 до 5, 0 пользователь не активирован или забанен, 5 админ</span>
        <Form.Item
          label="важность"
          name="import"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const UserAdmin = () => {
  const [state, setState] = useState([]);
  const [users, setUsers] = useState([...state]);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [newUserModal, setNewUserModal] = useState(false);
  const [rolesModal, setRolesModal] = useState(false);
  const handleRoles = (value) => {
    //сортировака пользователей по ролям
    let array = [...state];
    if (value !== "all") array = array.filter((item) => item.role === value);
    setUsers(array);
  };
  const getUsers = () => {
    //получение всех пользователей
    fetchs.get("/api/users").then((resault) => {
      setState(resault.data);
      setUsers(resault.data);
    });
  };
  const getRoles = () => {
    fetchs.get("/api/users/roles").then((resault) => setRoles(resault.data));
  };
  const edit = (id) => {
    //изменение пользователя
    const user = users.find((item) => item.id === id);
    setUser(user);
    setUpdate(true);
  };
  const remove = (id) => {
    //удаление пользователя
    fetchs.remove("/api/users/" + id).then((resault) => getUsers());
  };

  const handleModal = () => {
    setUpdate(false);
    getUsers();
  };
  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  const Td = ({ item, title, index, show }) => {
    const style = {
      row: {
        fontSize: 18,
        background: index % 2 === 0 ? "#fff" : "none",
        padding: 5,
      },
      col: {
        padding: 5,
      },
    };
    return (
      <Row style={style.row} gutter={5}>
        <Col span={1} style={{ ...style.col }}>
          {item.id}
        </Col>
        <Col span={2} style={style.col}>
          {item.username}
        </Col>
        <Col span={2} style={style.col}>
          {item.password}
        </Col>
        <Col span={2} style={style.col}>
          {item.role}
        </Col>
        <Col span={2} style={style.col}>
          {item.ip}
        </Col>
        <Col span={4} style={style.col}>
          {item.email === null ? "Отсутсвует" : item.email}
        </Col>
        <Col span={2} style={style.col}>
          {String(item.ban)}
        </Col>
        <Col span={2}>{String(item.active)}</Col>
        <Col span={4} style={style.col}>
          {title ? (
            "func"
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={() => edit(item.id)}>Изменить</Button>
              <Button onClick={() => remove(item.id)}>Удалить</Button>
            </div>
          )}
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <Select onChange={handleRoles} style={{ width: "100%", marginBottom: 25 }} defaultValue="all">
            <Option value="all">Все</Option>
            {roles.map((item, i) => (
              <Option key={i} value={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={2} style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => setRolesModal(true)}>Создать роль</Button>
          <Button onClick={() => setNewUserModal(true)}>Создать пользователя</Button>
        </Col>
      </Row>
      <Td
        item={{
          id: "id",
          username: "username",
          password: "password",
          role: "role",
          email: "email",
          ip: "ip",
          ban: "banned",
          active: "Активирован",
        }}
        title
      ></Td>
      {users.map((item, i) => (
        <Td item={item} key={i} index={i} />
      ))}
      <CreateRole setIsModalVisible={setRolesModal} isModalVisible={rolesModal} getRoles={getRoles} />
      <NewUser isModalVisible={newUserModal} setIsModalVisible={setNewUserModal} roles={roles} getUser={getUsers} />
      <UpdateUser modal={update} setModal={setUpdate} user={user} hideModal={handleModal} />
    </>
  );
};
export default UserAdmin;
