import React, { useState } from "react";
import Header from "./Header";
import { Row, Col, Grid, Typography, Button, Form, Input, Modal, message } from "antd";
import { Link } from "react-router-dom";
import axios from "../util/xml";
import "../style/Investor.css";
const { useBreakpoint } = Grid;
const Reg = ({ isModalVisible, setIsModalVisible }) => {
  //регистрация с встроенной ролью кооператива
  const success = () => {
    message.success("На вашу почту отправленна письмо с активаций аккаунта");
  };
  const [error, setError] = useState(null); //если ответ пришел с ошибкой
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    values.role = "cooperative";
    //отправка на сервер
    axios.post("/api/auth/registr", values).then((resault) => {
      const { data } = resault;
      if (data?.token) {
        //если пришел токен
        localStorage.setItem("access-token", data.token);
        handleOk();
        success();
      }
      //если ошибка пример логин занят
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
const Cooperative = () => {
  // информация
  const { Title } = Typography;
  const [modal, setModal] = useState(false);
  const { md } = useBreakpoint();
  return (
    <>
      <Header />
      <Title style={{ margin: 40, marginBottom: 10 }}>Раздел для cотрудничество</Title>
      <p style={{ margin: 40, marginTop: 0 }}>
        Раздел предназначен для воплощения совместных идей на согласованных всеми участниками условиях, с использованием имеющихся в наличии ресурсов как
        материальных, так и умственных, будь то юридическое или физическое лицо.
      </p>
      <Row justify="center">
        <Col span={23}>
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch", height: "100%", gridGap: 25 }}>
              <Title level={4} className="tit" onClick={() => (window.location.href = "/company")}>
                Поиск по списку компаний
              </Title>
              <Reg isModalVisible={modal} setIsModalVisible={setModal} onClick={() => setModal(true)} />
              <Title level={4} className="tit">
                Регистрация в качестве участника портала
              </Title>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row justify="center">
        <Col md={23} span={24}>
          <Title>Как начать</Title>
          <p>
            заполнение регистрационной формы (физ. Лицо/ юр. Лицо) заполнение чек листа участвуй в предлагаемых партнерских проектах/создай свой партнерский
            проект жди обратной связи
          </p>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>Да</Title>
          <p>Вы будете отображаться как Партнер, который готов участвовать в Партнерском проекте только при использовании инструментов Платформы</p>
        </Col>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10, background: "#5E4C5A", color: "#fff" }}>
          <Title style={{ color: "#fff" }}>Да</Title>
          <p>
            Вы будете отображаться как Партнер, который готов участвовать в Партнерском проекте без использования инструментов Платформы. В данном случае,
            Платформа не несет какой либо ответственности за дальнейшую деятельность, осуществляемой в рамках Партнерского проекта.
          </p>
        </Col>
        <Col md={8} span={24} style={{ padding: md ? 50 : 10 }}>
          <Title>Да</Title>
          <p>Вы будете отображаться как Партнер, который готов участвовать в Партнерском проекте в зависимости от проекта и запроса потенциального Партнера.</p>
        </Col>
      </Row>
      <Row justify="center">
        <Col md={8} style={{ margin: "50px 0" }}>
          {/*ссылка на все проекты*/}
          <Link
            to="/company"
            style={{ background: "#5E4C5A", width: "100%", display: "block", textAlign: "center", color: "#fff", padding: 20, fontSize: 24, borderRadius: 10 }}
          >
            Посмотреть партнерство
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default Cooperative;
