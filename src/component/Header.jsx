import React, { useEffect, useState } from "react";
import { Row, Col, Grid, Button, Drawer, Modal, Tabs, Form, Input, Select } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../style/Header.css";
import axios from "axios";
import fetchs from "../util/xml";
import { FeedBackHeader } from "./ComponentMin/feedback";
const { Option } = Select;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;
const Authorization = ({ state, setState, setUser }) => {
  //авторизация
  const handleOk = () => {
    setState(false);
  };
  const handleCancel = () => {
    setState(false);
  };

  const Auth = () => {
    const [error, setError] = useState(false); //ошибка
    const onFinish = (values) => {
      //post авторизация
      axios.post("/api/auth", values).then((resault) => {
        const { error, token } = resault.data;
        if (token) {
          localStorage.setItem("access-token", token); //сахранение токена
          setUser(true);
          window.location.pathname = resault.data.uri.indexOf("admin") !== -1 ? "/admin" : "/user/" + resault.data.uri[0];
        } else setError(error);
      });
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <Form name="basic" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <p>{error}</p>
        <Form.Item
          label="Ваш логин"
          name="username"
          rules={[
            {
              required: true,
              message: "Пожалуйста заполните имя",
            },
          ]}
        >
          <Input />
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    );
  };
  function success() {
    //все прошло хорошо
    Modal.success({
      content: "На почту отправленно сообщение с потверждением",
    });
  }
  const Reg = () => {
    //регистрация
    const [error, setError] = useState(null);
    const onFinish = (values) => {
      //Post регистрация
      axios.post("/api/auth/registr", values).then((resault) => {
        const { data } = resault;
        if (data?.token) {
          localStorage.setItem("access-token", data.token); //пост регистрация
          success();
        }
        if (data?.error) setError(data.error);
      });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <Form name="basic" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <p style={{ color: "red", textAlign: "center", fontSize: 24 }}>
          <strong>{error}</strong>
        </p>
        <Form.Item
          label="Ваша логин"
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
          label="Ваш email"
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
        <Form.Item label="Вы" name="role" rules={[{ required: true, message: "Пожалуйста выберите роль" }]}>
          <Select mode="multiple">
            <Option value="investor">Инвестор</Option>
            <Option value="applicant">Соискатель</Option>
            <Option value="cooperative">Партнер</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <>
      <Modal footer={false} visible={state} onOk={handleOk} header={false} onCancel={handleCancel}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Регистрация" key="Регистрация">
            <Reg setUser={setUser} />
          </TabPane>
          <TabPane tab="Авторизация" key="Авторизация">
            <Auth setUser={setUser} />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

const Nav = ({ ul = {}, li = {}, a = {} }) => {
  //навбар
  return (
    <ul className="nav" style={{ ...ul }}>
      <li style={{ ...li }}>
        <Link to="/projects" style={{ ...a }}>
          Все проекты
        </Link>
      </li>
      <li style={{ ...li }}>
        <Link to="/faq" style={{ ...a }}>
          Кто мы?
        </Link>
      </li>
      <li style={{ ...li }}>
        <Link to="/start" style={{ ...a }}>
          Как начать?
        </Link>
      </li>
      <li style={{ ...li }}>
        <Link to="/advantages" style={{ ...a }}>
          Наши преимущества
        </Link>
      </li>
      <li style={{ ...li }}>
        <Link to="/a5" style={{ ...a }}>
          Поиск по номеру проекта
        </Link>
      </li>
      <li style={{ ...li }}>
        <Link to="/contact" style={{ ...a }}>
          Контакты
        </Link>
      </li>
      <li style={{ ...li }}>
        <FeedBackHeader />
      </li>
    </ul>
  );
};
const Headers = () => {
  //компонент хедер
  const { md } = useBreakpoint();
  const [user, setUser] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    fetchs.post("/api/auth/onload").then((resault) => {
      const { data } = resault;
      const { error, uri } = data;
      if (error) setUser(false);
      if (uri) setUser(uri[0]);
    });
  }, []);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  let homeUser = (
    //если есть токен
    <>
      <Link to={user !== "admin" ? "/user/" + user : "/" + user} style={{ color: "#000" }}>
        Личный кабинет
      </Link>
    </>
  );
  let homeNoUser = (
    //токена нету
    <>
      <p
        style={{
          fontSize: md ? 14 : 24,
          display: "block",
          marginRight: 15,
          marginBottom: 0,
          cursor: "pointer",
          backgroundColor: "#2baf4a",
          color: "#fff",
          padding: 5,
          borderRadius: 10,
        }}
        onClick={showModal}
      >
        Регистрация
      </p>
      <p
        style={{ fontSize: md ? 14 : 24, margin: 0, cursor: "pointer", backgroundColor: "#01579b", color: "#fff", padding: 5, borderRadius: 10 }}
        onClick={showModal}
      >
        Войти
      </p>
    </>
  );

  return (
    <Col span={23} style={{ margin: "auto" }}>
      <Row align="middle" justify="center" style={{ position: "relative", paddingTop: 20, marginBottom: 50 }}>
        <Col span={24}>
          <header>
            <div className="nav-logo">
              <Button className="btn-menu" onClick={showDrawer}>
                <MenuOutlined />
              </Button>
              <span>
                <Link to="/" style={{ color: "black" }}>
                  INVESTMENTS
                </Link>
              </span>
            </div>
            <div style={{ flex: 2, backgroundColor: "#fff" }}>
              <Nav />
              <Drawer title="Меню" placement="left" onClose={onClose} visible={visible}>
                <Nav ul={{ margin: 0, padding: 0 }} li={{ color: "#000", listStyle: "none" }} a={{ color: "#000", textDecoration: "none", fontSize: 24 }} />
                <hr />
                {user ? homeUser : homeNoUser}
              </Drawer>
            </div>
            <div className="auth">{user ? homeUser : homeNoUser}</div>
          </header>
        </Col>
        <Authorization state={isModalVisible} setState={setIsModalVisible} setUser={setUser} />
      </Row>
    </Col>
  );
};
export default Headers;
