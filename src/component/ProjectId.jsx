import React, { useState, useEffect, useRef } from "react";
import { Grid, Row, Col, Modal, Progress, Typography, Form, InputNumber, Button, message } from "antd";
import { useParams } from "react-router-dom";
import Header from "./Header2";
import axios from "../util/xml";
const Question = ({ quest, answer }) => {
  //Вопрос-ответ
  return (
    <>
      <strong style={{ fontSize: 18 }}>{quest}</strong>
      <p style={{ fontSize: 18 }}>{answer}</p>
    </>
  );
};
const Applicant = ({ info, percent }) => {
  console.log(percent);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const submit = useRef(null);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    submit.current.click();
    //setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    //заявка на инвестций
    values.project = { title: info.title, id: info.id };
    axios.post("/api/request/applicant", values).then((res) => {
      if (res.data?.error) {
        error();
      } else {
        success();
        handleCancel();
      }
    });
  };
  const error = () => {
    message.error("Авторизуйтесь пожалуйста");
    //если пользователь не авторизован
  };
  const success = () => {
    //заявка на инвестицию принята
    message.success("Ваша заявка отправлена");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {percent >= 100 ? null : (
        <Button style={{ backgroundColor: "#5E4C5A", color: "#ffffff", borderRadius: 10 }} onClick={showModal}>
          Инвестировать
        </Button>
      )}

      <Modal okText="Инвестировать" cancelText="Отмена" title="Инвестировать" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item label="Пожалуйста введите сумму инвестиций" name="money" rules={[{ required: true, message: "Пожалуйста введите сумму" }]}>
            <InputNumber style={{ width: "100%" }} type="number" />
          </Form.Item>
          <Form.Item style={{ display: "none" }}>
            <Button type="primary" htmlType="submit" ref={submit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
const Project = () => {
  //проект
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();
  let [state, setState] = useState({});
  let [day, setDay] = useState(1000);
  let { id } = useParams();
  let { Title } = Typography;
  let percent = state?.money === 0 ? 0 : (state.money * 100) / state.capital; //шкала инвестиций
  percent = Math.round(percent);
  let get = () => {
    axios.get("/api/project/" + id).then((res) => {
      setState(res.data); //информацию о проекте
      setDay(Math.round((new Date(res.data.date) - new Date()) / 1000 / 60 / 60 / 24)); //сколько дней осталось
    });
  };
  useEffect(get, []);
  return (
    <div>
      <div style={{ padding: "10px 25px" }}>
        <Header />
      </div>
      <Row>
        <Col md={6}>
          <img src={state.image} alt={state.title} width="100%" height="100%" />
        </Col>
        <Col md={18}>
          <div style={{ padding: "25px 50px" }}>
            <p>
              <span style={{ color: "#fff", backgroundColor: "#0500FF", padding: "5px 10px", borderRadius: 10 }}>{state.type}</span>
            </p>
            <p>Проект №{state.id}</p>
            <Title>{state.title}</Title>
            <p>{state.descriptionMin}</p>
            <div style={{ display: "flex", justifyContent: "space-between", width: 400 }}>
              <div>
                <strong>Стадия проекта</strong>
                <p style={{ color: "#2DA771" }}>Стадия {state.state}</p>
              </div>
              <div>
                <strong>Дней осталось</strong>
                <p style={{ color: "#2DA771" }}>{day}</p>
              </div>
            </div>
            <p>
              Требуется инвестиций: {state.money}/{state.capital}
            </p>
            <Progress percent={percent} />
            <div>
              <Applicant info={state} percent={percent} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div style={{ padding: md ? "50px 100px" : 10 }}>
            <Title>Вопрос-ответ по проекту</Title>
            <Question quest="Вопрос" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cras facilisis at sagittis scelerisque eget." />
            <Question quest="Вопрос" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cras facilisis at sagittis scelerisque eget." />
            <Question quest="Вопрос" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cras facilisis at sagittis scelerisque eget." />
            <Question quest="Вопрос" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cras facilisis at sagittis scelerisque eget." />
            <Question quest="Вопрос" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cras facilisis at sagittis scelerisque eget." />
            <Question quest="Вопрос" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cras facilisis at sagittis scelerisque eget." />
          </div>
        </Col>
        <Col md={12}>
          <div style={{ padding: md ? "50px 100px" : 10 }}>
            <Title>Процесс развития проекта</Title>
            <p style={{ fontSize: 18 }}>{state.description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Project;
