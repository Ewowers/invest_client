import React, { useEffect, useState } from "react";
import Header from "./Header2";
import axios from "../util/xml";
import { Row, Col, Image, Typography, Button } from "antd";
const ProjectItem = ({ info }) => {
  //компонент проекты для партнеров
  const { Title, Text } = Typography; //Стилизованный h1
  const { image, title, capital, date, descriptionMin } = info; //разбор для удобства
  const left = Math.round((new Date(date) - new Date()) / 1000 / 60 / 60 / 24); //сколько дней осталось
  return (
    <Row justify="space-between">
      <Col span={4}>
        <Image src={image} alt={title} />
      </Col>
      <Col span={20} style={{ paddingLeft: 25, paddingRight: 25, textAlign: "right", display: "flex", justifyContent: "space-between" }}>
        <div>
          <Title>{title}</Title>
          <Text>{descriptionMin}</Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignContent: "flex-end", justifyContent: "flex-end", textAlign: "" }}>
          <div>
            <Text strong>{capital} Т</Text>
            <br />
            <Text>Требуется инвестиций</Text>
          </div>
          <div>
            <Text strong>{left}</Text>
            <br />
            <Text>Осталось дней</Text>
          </div>
          <Button style={{ background: "rgb(94, 76, 90)", color: "#fff", borderRadius: 10, marginTop: 10 }}>Подать заявку</Button>
        </div>
      </Col>
    </Row>
  );
};
export const Company = () => {
  const [project, setProject] = useState([]); //проекты
  const get = () => axios.get("/api/project").then((res) => setProject(res.data)); //запрос проектов

  const list = project.map((item) => <ProjectItem info={item} key={item.id} />); //проекты
  useEffect(get, []);
  return (
    <div>
      <Header />
      {list}
    </div>
  );
};
