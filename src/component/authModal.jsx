import React, { useState, useRef } from "react";
import { Modal, Form, Input, Button } from "antd";
import axios from "axios";
export default function AuthModal({ setUser, modal, setModal, getToken, save = true, width = 520 }) {
  //компонент авторизаций
  const [error, setError] = useState(null); //ошибка
  const submit = useRef(null);
  const handleOk = () => {
    submit.current.click();
    //действие на кнопке войти
  };
  const handleCancel = () => {
    //действие кнопки отмена
    setModal(false);
  };
  const onFinish = (values) => {
    //Post авторизация
    axios
      .post("/api/auth", values)
      .then((res) => {
        if (res.data?.token) {
          if (save) localStorage.setItem("access-token", res.data.token);
          if (setUser) setUser(res.data);
          if (getToken) getToken(res.data);
        }
        if (res.data?.error) setError(res.data.error);
      })
      .then((res) => setModal(false));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const option = {
    okText: "Войти", //кнопка войти событие handleOk
    cancelText: "Отмена", //кнопка отмена событие handleCancel
    width: width ? width : 520, //размер модального окна
    visible: modal, //стейт модалки
    onOk: handleOk, //действие при нажатий ок
    onCancel: handleCancel, //действие при нажатий canlce
  };

  return (
    <Modal title="Пожалуйста авторизуйтесь" {...option}>
      <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <h1 style={{ color: "red", textAlign: "center" }}>{error}</h1>
        <Form.Item
          label="Ваш логин"
          name="username"
          rules={[
            {
              required: true,
              message: "Пожалуйста заполните ваш логин",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ваш пороль"
          name="password"
          rules={[
            {
              required: true,
              message: "Пожалуйста заполните ваш пороль",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ display: "none" }}>
          <Button type="primary" htmlType="submit" ref={submit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
