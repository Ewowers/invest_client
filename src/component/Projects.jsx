import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Input, InputNumber, DatePicker, Checkbox, Select, Button } from "antd";
import { StarOutlined, EyeOutlined, StarFilled, FileTextOutlined } from "@ant-design/icons";
import Header from "./Header2";
import moment from "moment";
import axios from "../util/xml";
import Auth from "./authModal";
import "../style/Projects.css";
const { Option } = Select;

const Menu = ({ state, setState, region, types }) => {
  //филтры
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const filters = (values) => {
    let arr = [...state];
    //категорий проекта
    if (values.type !== undefined && values.type.length !== 0) {
      arr = arr.filter((item) => values.type.indexOf(item.type) !== -1);
    }
    //города проектов
    if (values.region !== undefined && values.region.length !== 0) {
      arr = arr.filter((item) => values.region.indexOf(item.region) !== -1);
    }
    //сколько уже есть денег
    if (values.moneyStart !== undefined) {
      arr = arr.filter((item) => item.money >= values.moneyStart);
    }
    //сколько нужно
    if (values.moneyEnd !== undefined) {
      arr = arr.filter((item) => item.money <= values.moneyEnd);
    }
    //дата публикаций
    if (values.dateStart !== undefined) {
      let date = new Date(values.dateStart);
      date = moment(date).format("DD/MM/YYYY");
      arr = arr.filter((item) => date === moment(new Date(item.dateStart)).format("DD/MM/YYYY"));
    }
    //дата окончания
    if (values.dateEnd !== undefined) {
      let date = new Date(values.dateEnd);
      date = moment(date).format("DD/MM/YYYY");
      arr = arr.filter((item) => date === moment(new Date(item.date)).format("DD/MM/YYYY"));
    }
    //поиск
    //if (values.search !== null || values.search.length >= 2) {
    //  arr = arr.filter((item) => {
    //    return item.title.toLocaleLowerCase().indexOf(values.search.toLocaleLowerCase()) !== -1;
    //  });
    //}
    setState(arr);
  };
  const reset = () => {
    form.resetFields();
    setState(state);
  };
  return (
    <div style={{ marginBottom: 25, padding: 10, borderRadius: 10, backgroundColor: "#fff" }}>
      <Form form={form} onFinish={filters} onFinishFailed={onFinishFailed} layout="vertical" style={{ width: "100%" }}>
        <Row>
          <Col span={22}>
            <Form.Item name="search">
              <Input />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button style={{ width: "100%", borderRadius: 10, backgroundColor: "rgb(94, 76, 90)", color: "#fff" }}>Найти</Button>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col span={6}>
            <Form.Item name="type" valuePropName="checked">
              <Checkbox.Group options={types.map((item) => item.title)} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Сумма инвестиций от" name="moneyStart">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Дата публикаций" name="dateStart">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Сумма инвестиций до" name="moneyEnd">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Дата окончания" name="dateEnd">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Город" name="region">
              <Select mode="multiple">
                {region.map((item) => (
                  <Option value={item.region} key={item.region}>
                    {item.region}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <p style={{ marginBottom: 8, color: "#fff" }}>1</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: 25 }}>
                <Button style={{ backgroundColor: "#EDF2F7" }} onClick={reset}>
                  Сбросить
                </Button>
                <Button htmlType="submit" style={{ backgroundColor: "#5E4C5A", color: "#fff" }}>
                  Применить
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const Project = ({ item, hasUser, show, get, favorite = [] }) => {
  const date = new Date(item.date);
  const days = (date - new Date()) / 1000 / 60 / 60 / 24;
  const Has = () => {
    if (hasUser) {
      return (
        <Button href={"/project/" + item.id} style={{ background: "rgb(94, 76, 90)", borderRadius: 10, color: "#fff" }}>
          Узнать больше
        </Button>
      );
    } else {
      return (
        <Button onClick={show} style={{ background: "rgb(94, 76, 90)", borderRadius: 10, color: "#fff" }}>
          Узнать больше
        </Button>
      );
    }
  };
  const handleFavorite = () => axios.post("/api/project/favorite/" + item.id).then((res) => get());
  return (
    <Row
      gutter={10}
      align="start"
      style={{ alignItems: "stretch", marginBottom: 25, border: "1px solid #fff", backgroundColor: "#fff", borderRadius: 10, padding: 10 }}
    >
      <Col md={4}>
        <Image alt={item.title} src={item.image} width="100%" height="100%" />
      </Col>
      <Col md={20}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid", paddingBottom: 5 }}>
          <div>
            <strong style={{ fontSize: 18 }}>{item.title}</strong>
            <p>Категория проекта: {item.type}</p>
          </div>
          <div style={{ display: "grid", gridGap: 5, gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ textAlign: "right", borderRight: "0.0001px solid", paddingRight: 10 }}>
              <strong style={{ fontSize: 18 }}>{Math.round(days)}</strong>
              <p>(Осталось дней)</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong style={{ fontSize: 18 }}>{item.capital} ₸</strong>
              <p>Требуется инвестиции</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 5 }}>
          <p>{item.description}</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Button style={{ border: "none" }} onClick={handleFavorite}>
              {favorite.indexOf(item.id) !== -1 ? <StarFilled /> : <StarOutlined />}
            </Button>
            <Button style={{ border: "none" }}>
              <EyeOutlined />
            </Button>
            <Button style={{ border: "none" }}>
              <FileTextOutlined />
            </Button>
            <Has />
          </div>
        </div>
      </Col>
    </Row>
  );
};

const Projects = () => {
  const [state, setState] = useState([]); //проекты
  const [search, setSearch] = useState([]); //копия проектов для фильтраций

  const [regions, setRegion] = useState([]); //города
  const [types, setTypes] = useState([]); //категорий проектов

  //проверка на аворизацию
  const [user, setUser] = useState(false);
  //модальное окно
  const [modalUser, setModalUser] = useState(false);
  const get = () => {
    axios.get("/api/project").then((result) => {
      setState(result.data);
      setSearch(result.data);
    });
    axios.post("/api/auth/getMy").then((res) => setFavorite(res.data.favorite.map((item) => parseInt(item))));
  };

  //избранные проекты пользователя
  const [favorite, setFavorite] = useState();
  useEffect(() => {
    get();
    axios.get("/api/util/region").then((res) => setRegion(res.data)); //получение городов
    axios.get("/api/project/type").then((res) => setTypes(res.data)); //получение категорий проектов
    axios.post("/api/auth/onload").then((res) => (res.data?.uri ? setUser(true) : setUser(false))); //провека на токен
  }, []);
  return (
    <div style={{ padding: 30 }}>
      <Header />
      <Menu state={state} setState={setSearch} region={regions} types={types} />
      {search.map((item) => (
        <Project key={item.id} item={item} hasUser={user} show={() => setModalUser(true)} favorite={favorite} get={get} />
      ))}
      <Auth setUser={setUser} modal={modalUser} setModal={setModalUser} onload />
    </div>
  );
};

export default Projects;
