import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import fetchs from "../util/xml";
const Header = () => {
  //header для все проекты личный кабинет и тд
  return (
    <Row justify="center" align="middle">
      <Col span={12} style={{ display: "flex", alignItems: "center" }}>
        <p style={{ margin: 0, padding: 10, fontSize: 16 }}>
          <Link to="/" style={{ color: "#000" }}>
            <strong>Инвест</strong>
          </Link>
        </p>
        <nav>
          <ul style={{ margin: 0, padding: 0, display: "flex" }}>
            <li style={{ listStyle: "none", padding: 10 }}>
              <Link to="/applicant" style={{ color: "#000" }}>
                Для соискателей
              </Link>
            </li>
            <li style={{ listStyle: "none", padding: 10 }}>
              <Link to="/investor" style={{ color: "#000" }}>
                Для инвесторов
              </Link>
            </li>
            <li style={{ listStyle: "none", padding: 10 }}>
              <Link to="/projects" style={{ color: "#000" }}>
                Все проекты
              </Link>
            </li>
          </ul>
        </nav>
      </Col>
      <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button style={{ marginRight: 10, background: "#5E4C5A", color: "#fff", borderRadius: 10 }}>Обратный звонок</Button>
        <Auth />
      </Col>
    </Row>
  );
};
const Auth = () => {
  //авторизация
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(false);
  const [error, setError] = useState(null);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    //авторизация
    axios.post("/api/auth", values).then((resault) => {
      const { error, token } = resault.data;
      if (token) {
        localStorage.setItem("access-token", token);
        setUser(true);
        window.location.pathname = resault.data.uri === "admin" ? "/admin" : "/user/" + resault.data.uri;
      } else setError(error);
    });
  };
  useEffect(() => {
    //провека токена
    fetchs.post("/api/auth/onload").then((resault) => {
      const { data } = resault;
      const { error, uri } = data;
      if (error) setUser(false);
      if (uri) setUser(uri);
    });
  }, []);
  return (
    <>
      {user ? (
        //если есть токен
        <Button style={{ background: "#EDF2F7", borderRadius: 10 }} href={user === "admin" ? "/admin" : "/user/" + user}>
          Личный кабинет
        </Button>
      ) : (
        //если нету токена
        <Button style={{ background: "#EDF2F7", borderRadius: 10 }} onClick={showModal}>
          Войти
        </Button>
      )}
      {/* модаьлное */}
      <Modal footer={false} title="Авторизация" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form onFinish={onFinish} layout="vertical">
          <h1 style={{ textAlign: "center", color: "red" }}>{error}</h1>
          <Form.Item label="Ваш логин" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ваш пороль" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel} style={{ marginRight: 25 }}>
                Отмена
              </Button>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Header;
