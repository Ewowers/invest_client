import React, { useState } from "react";
import Header from "./Header";
import { Row, Col, Grid, Typography, Button, Modal, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import "../style/Investor.css";
import axios from "../util/xml";
const { useBreakpoint } = Grid;
const Reg = ({ isModalVisible, setIsModalVisible }) => {
  const success = () => {
    //оповещеие о получение заявки
    message.success("На вашу почту отправленна письмо с активаций аккаунта");
  };
  const [error, setError] = useState(null); //ошибка
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    //отмена
  };
  const onFinish = (values) => {
    //регистрация как соискатель
    values.role = "applicant";
    axios.post("/api/auth/registr", values).then((resault) => {
      const { data } = resault;
      console.log(resault);
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
  //html
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

export default function Applicant() {
  const { md } = useBreakpoint();
  const { Title } = Typography;
  const [modal, setModal] = useState(false);
  //страниа для соискателя
  return (
    <>
      <Header />
      <Title style={{ margin: 50 }}>Раздел для соискателям</Title>
      <Row justify="center" style={{ marginBottom: 50 }}>
        <Col span={23}>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch", height: "100%", gridGap: 25 }}>
              <Title level={4} className="tit" onClick={() => setModal(true)}>
                Регистрация в качестве соискателя
              </Title>
              <Reg isModalVisible={modal} setIsModalVisible={setModal} />
              <Title level={4} className="tit">
                Заявка на оказание услуг по ведению сделки
              </Title>
            </div>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col md={23}>
          <Title>Как начать?</Title>
          <p>
            Заполнение регистрационной формы (Проверенный/не проверенный/индивидуальный) Заполнение чек листа согласно форме (Примечание* - от полноты
            заполнения зависит успешность привлечения инвестиций) Жди обратной связи от инвесторов
          </p>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>Да</Title>
          <p>Ваш проект будет отображен как проект, который готов работать с Инвесторами только при использовании инструментов Платформы</p>
        </Col>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10, background: "#5E4C5A", color: "#fff" }}>
          <Title style={{ color: "#fff" }}>Нет</Title>
          <p>
            Ваш проект будет отображен как проект, который готов работать только с Инвесторами, готовых вложить свои средства без использования инструментов
            Платформы
          </p>
        </Col>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>По договоренности</Title>
          <p>Ваш проект будет отображен как проект, где Вы готовы обсуждать условия реализации с Инвесторами дополнительно.</p>
        </Col>
      </Row>

      <Title level={2} style={{ margin: 40, marginBottom: 0 }}>
        Соискатель делится на несколько категории
      </Title>
      <Row justify="center">
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>Проверенный </Title>
          <p>предоставил всю необходимую документацию, согласно требованиям Платформы</p>
        </Col>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>Инкогнито</Title>
          <p>не прошел определенную проверку на Платформе</p>
        </Col>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>Индивидуальный </Title>
          <p> инновационная идея, которая требует определенной защиты и подхода в реализации. В данном случае Платформа работает в закрытом доступе</p>
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
}
