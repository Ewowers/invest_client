import React, { Component } from "react";
import { Modal, Tabs, Form, Input, Typography, Button, message } from "antd";
import axios from "axios";
const { TabPane } = Tabs;
export class FeedBackHeader extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  state = {
    visible: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.submit();
    //this.setState({ visible: false });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  onFinish = (values) => {
    console.log("Success:", values);
    axios
      .post("/api/feedback", values)
      .then((res) => this.handleCancel())
      .then((res) => this.message());
  };
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  submit() {
    this.ref.current.click();
  }
  message() {
    message.success("Ваш запрос отправлен");
  }
  render() {
    const { visible } = this.state;
    const { Text } = Typography;
    return (
      <>
        <span style={{ cursor: "pointer" }} type="primary" onClick={this.showModal}>
          Связатся с нами
        </span>
        <Modal visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} okText="Отправить" cancelText="Отмена">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Почта" key="1">
              <Form layout="vertical" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                <Form.Item label="Ваше имя" name="name" rules={[{ required: true, message: "Пожалуйста заполните ваше имя" }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Ваш номер телефона" name="phone" rules={[{ required: true, message: "Пожалуйста заполните ваш телефон" }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Ваш e-mail " name="email" rules={[{ required: true, message: "Пожалуйста заполните вашу почту" }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Сообщение" name="message" rules={[{ required: true, message: "Пожалуйста опишите ваш вопрос" }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item style={{ display: "none" }}>
                  <Button ref={this.ref} htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Мессенджеры" key="2">
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="fab fa-whatsapp" style={{ fontSize: 18, marginRight: 10 }}></i>
                <Text strong>Наш whatsApp</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
                <i className="fab fa-telegram" style={{ fontSize: 18, marginRight: 10 }}></i>
                <Text strong>Наш телеграм</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
                <i className="fab fa-viber" style={{ fontSize: 18, marginRight: 10 }}></i>
                <Text strong>Наш вайбер</Text>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
                <i className="fas fa-phone-alt" style={{ fontSize: 18, marginRight: 10 }}></i>
                <Text strong>+7(777)777-77-77 Тех поддержка</Text>
              </div>
            </TabPane>
          </Tabs>
        </Modal>
      </>
    );
  }
}
