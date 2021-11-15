import React from "react";
import { Card, Image, Row, Col, Typography } from "antd";
import Header from "./Header";
const { Title } = Typography;

const Contact = () => {
  //Контакты
  return (
    <>
      <Header />
      <Row justify="center" align="middle" style={{ padding: 10 }}>
        <Col md={12} style={{ marginRight: 50, display: "flex" }}>
          <Card style={{ width: "100%", padding: 0 }}>
            <Image alt="contact" height={300} src="https://tengrinews.kz/userdata/news/2019/news_365516/thumb_m/photo_275590.jpeg" />
            <Title style={{ textAlign: "center" }}>г. Нур-Султан</Title>
            <p style={{ margin: 0, textAlign: "center" }}>Invest@info.kz</p>
            <p style={{ margin: 0, textAlign: "center" }}>у. Пушкина 35</p>
          </Card>
          <Card style={{ width: "100%", padding: 0 }}>
            <Image alt="contact" height={300} src="https://bigasia.ru/upload/iblock/bf3/bf3aa7f4dfeefb4dff074d87ae5d3f39.jpg" />
            <Title style={{ textAlign: "center" }}>г. Алма-аты</Title>
            <p style={{ margin: 0, textAlign: "center" }}>Invest@info.kz</p>
            <p style={{ margin: 0, textAlign: "center" }}>у. Пушкина 35</p>
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col md={4}>
          <p>Наш номер телефона +7 777 777 77 77</p>
          <p>Наш номер телефона +7 777 777 77 77</p>
          <p>График работы с 8:00 до 20:00</p>
        </Col>
      </Row>
    </>
  );
};
export default Contact;
