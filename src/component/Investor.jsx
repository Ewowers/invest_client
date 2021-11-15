import React, { useState } from "react";
import Header from "./Header";
import { Row, Col, Grid, Typography, Button, Modal, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import "../style/Investor.css";
import axios from "../util/xml";
const { useBreakpoint } = Grid;
const Reg = ({ isModalVisible, setIsModalVisible, success }) => {
  //Регистрация как инвестор
  const [error, setError] = useState(null);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    //регистрация с ролью инвестор
    values.role = "investor";
    axios.post("/api/auth/registr", values).then((resault) => {
      const { data } = resault;
      if (data?.token) {
        localStorage.setItem("access-token", data.token);
        handleOk();
        success();
      }
      if (data?.error) setError(data.error);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal title="Регистрация" footer={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <h1>{error}</h1>
          <Form.Item label="Ваша Почта" name="email" rules={[{ required: true, message: "Пожалуйста, введите вашу почту!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ваш логин" name="username" rules={[{ required: true, message: "Пожалуйста, введите ваш логин!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ваш пороль" name="password" rules={[{ required: true, message: "Пожалуйста, введите ваш пороль" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleOk}>Отмена</Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
                Ок
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Investor = () => {
  const { Title } = Typography;
  const [modal, setModal] = useState(false);
  const { md } = useBreakpoint();
  const success = () => {
    //оповещение о получение заявки на регистрацию
    message.success("На вашу почту отправленна письмо с активаций аккаунта");
  };
  return (
    <>
      <Header />
      <Title style={{ margin: 40, marginBottom: 25 }}>Раздел для партнеров</Title>
      <p style={{ margin: 40, marginTop: 0 }}>
        Раздел предназначен для тех людей, кто готов вложить свои средства в интересующий проект. Инвестор получает назначенную Соискателем долю в уставном
        капитале взамен на инвестиции. Средства Инвестора хранятся в депозитном счете, пока не наберется пул необходимых средств для воплощения проекта.
      </p>
      <Row justify="center">
        <Col span={23}>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch", height: "100%", gridGap: 25 }}>
              <Title level={4} className="tit" onClick={() => setModal(true)}>
                Зарегистрироваться как инвестор
              </Title>
              <Reg isModalVisible={modal} setIsModalVisible={setModal} success={success} />
              <Title level={4} className="tit">
                Заявка на оказание <br /> услуг по сопровождению сделки
              </Title>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row justify="center">
        <Col md={23}>
          <Title>Как начать</Title>
          <p>
            Заполнение регистрационной формы (Проверенный/не проверенный/ продвинутый) приступай к поиску интересующих проектов. *Вы готовы инвестировать в
            заинтересовавший Вас проект только при использовании инструментов предоставляемых Платформой?
          </p>
        </Col>
        <Col md={23} span={24}>
          <Title level={4}>Инвестор делится на несколько категории</Title>
          <p style={{ display: "flex", alignItems: "center" }}>
            <span style={{ background: "#5E4C5A", color: "#fff", borderRadius: 10, padding: 5, marginRight: 5, width: 100, display: "block" }}>проверенны</span>{" "}
            предоставил всю необходимую документацию, согласно требованиям Платформы
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <span style={{ background: "#5E4C5A", color: "#fff", borderRadius: 10, padding: 5, marginRight: 5, width: 100, display: "block" }}>инкогнито</span>{" "}
            не прошел определенную проверку на Платформе
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <span style={{ background: "#5E4C5A", color: "#fff", borderRadius: 10, padding: 5, marginRight: 5, width: 100, display: "block" }}>
              продвинутый
            </span>
            зарекомендовавший себя как активный участник
          </p>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>Да</Title>
          <p>Вы будете отображаться как Инвестор, который готов вложить свои средства только при использовании инструментов Платформы</p>
        </Col>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10, background: "#5E4C5A", color: "#fff" }}>
          <Title style={{ color: "#fff" }}>Нет</Title>
          <p>
            Вы будете отображаться как Инвестор, который готов вложить свои средства без использования инструментов Платформы. В данном случае, Платформа не
            несет какой либо ответственности за сохранность Ваших инвестиций
          </p>
        </Col>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>По договоренности</Title>
          <p>Вы будете отображаться как Инвестор, который готов вложить свои средства в зависимости от проекта и запроса Соискателя.</p>
        </Col>
      </Row>
      <Row justify="center">
        <Col md={8} style={{ margin: "50px 0" }}>
          <Link
            to="/projects"
            style={{ background: "#5E4C5A", width: "100%", display: "block", textAlign: "center", color: "#fff", padding: 20, fontSize: 24, borderRadius: 10 }}
          >
            Все проекты
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default Investor;
