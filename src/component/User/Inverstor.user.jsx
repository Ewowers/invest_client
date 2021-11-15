import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Image, Typography, Modal, Form, Input, Button, Layout, Menu } from "antd";
import { StarOutlined, EyeOutlined, FileTextOutlined, InboxOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import axios from "../../util/xml";
import "./project.user.css";
import { Link } from "react-router-dom";
if (window.location.pathname.indexOf("admin") === -1) {
  import("../../style/user/investor.css");
}
const { Content, Sider } = Layout;
const EditPersonal = ({ info, get }) => {
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
    axios.put("/api/auth/" + info.id + "/" + info.username, values).then((res) => {
      if (res.data.status) {
        handleCancel();
        get();
      }
    });
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <>
      <Button style={{ background: "#EDF2F7", borderRadius: 10 }} onClick={showModal}>
        Редактировать профиль
      </Button>
      <Modal title="Редактировать профиль" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ ...info }}>
          <Row>
            <Col md={24}>
              <Form.Item label="Ваше ФИО" name="fullName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Наименование организации" name="nameOrganization" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Телефон" name="phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ display: "none" }}>
            <Button ref={submit} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const Personal = ({ info, get }) => {
  const { Text } = Typography;
  return (
    <div style={{ border: "1px solid #EDF2F7", padding: 10, borderRadius: 10 }}>
      <Row>
        <Col span={12} md={6} style={{ borderRight: "1px solid #EDF2F7", padding: 10 }}>
          <Text strong>ФИО</Text>
          <p>{info?.fullName}</p>
          <Text strong>Наименование организации:</Text>
          <p>{info?.nameOrganization}</p>
          <Text strong>Контактные данные</Text>
          <p style={{ margin: 0 }}>
            <Text strong>email:</Text> {info?.email}
          </p>
          <p>
            <Text strong>телефон:</Text> {info?.phone}
          </p>
          <Text strong>Уровень ивестиции проектов</Text>
          <p style={{ margin: 0 }}>Наименование организации:</p>
          <p style={{ margin: 0 }}>Наименование организации:</p>
        </Col>

        <Col span={12} md={6} style={{ borderRight: "1px solid #EDF2F7", padding: 10 }}>
          <Text strong>Инвестировали в проекты</Text>
          {info?.investment.map((item, i) => {
            return (
              <p key={i}>
                <Link to={"/project/" + item.project.id} style={{ color: "#000" }}>
                  Проект: <span style={{ color: "blue" }}>{item.project.title}</span> сумма: {item.money}
                </Link>
              </p>
            );
          })}
        </Col>
        <Col span={12} md={6} style={{ borderRight: "1px solid #EDF2F7", padding: 10 }}>
          <Text strong>Документы потверждения</Text>
          <p>
            <Link to="/project/1">1</Link>
          </p>
          <p>
            <Link to="/project/1">1</Link>
          </p>
          <p>
            <Link to="/project/1">1</Link>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={24} style={{ display: "flex", justifyContent: "flex-end" }}>
          <EditPersonal info={info} get={get} />
          {/*<Button style={{ background: "#5E4C5A", color: "#ffffff", borderRadius: 10, margin: "0 10px" }}>Купить доп. услуги</Button>
          <Button style={{ background: "#5E4C5A", color: "#ffffff", borderRadius: 10 }}>Загрузить документы</Button>*/}
        </Col>
      </Row>
    </div>
  );
};

const Null = ({ title }) => {
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>
        <InboxOutlined style={{ fontSize: "5rem" }} /> <br /> К сожалению {title}
      </h1>
    </div>
  );
};

const ProjectItem = ({ projectInfo }) => {
  const date = new Date(projectInfo.date);
  const days = (date - new Date()) / 1000 / 60 / 60 / 24;

  return (
    <Row
      gutter={10}
      align="start"
      style={{ alignItems: "stretch", marginBottom: 25, border: "1px solid #fff", backgroundColor: "#fff", borderRadius: 10, padding: 10 }}
    >
      <Col md={4}>
        <Image alt={projectInfo.title} src={projectInfo.image} width="100%" height="100%" />
      </Col>
      <Col md={20}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid", paddingBottom: 5 }}>
          <div>
            <strong style={{ fontSize: 18 }}>{projectInfo.title}</strong>
            <p>Категория проекта: {projectInfo.type}</p>
          </div>
          <div style={{ display: "grid", gridGap: 5, gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ textAlign: "right", borderRight: "0.0001px solid", paddingRight: 10 }}>
              <strong style={{ fontSize: 18 }}>{Math.round(days)}</strong>
              <p>(Осталось дней)</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <strong style={{ fontSize: 18 }}>{projectInfo.capital} ₸</strong>
              <p>Требуется инвестиции</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 5 }}>
          <p>{projectInfo.description}</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <Button style={{ border: "none" }}>
              <StarOutlined />
            </Button>
            <Button style={{ border: "none" }}>
              <EyeOutlined />
            </Button>
            <Button style={{ border: "none" }}>
              <FileTextOutlined />
            </Button>
            <Button href={"/project/" + projectInfo.id} style={{ background: "rgb(94, 76, 90)", borderRadius: 10, color: "#fff" }}>
              Узнать больше
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};
const Projects = ({ info }) => {
  const [projects, setProjects] = useState([]);
  let arr = info.map((item) => {
    return item.project.id;
  });
  //const get = () => axios.get("/api/project/ids=" + arr.join(",")).then((res) => setProjects(res.data));
  useEffect(() => {
    if (arr.length !== 0 && arr) {
      axios.get("/api/project/ids=" + arr.join(",")).then((res) => setProjects(res.data));
    }
  }, [arr]);
  if (projects.length === 0) return <Null title="нету избранных проектов" />;
  return (
    <>
      {projects.map((item) => (
        <ProjectItem projectInfo={item} key={item.id} />
      ))}
    </>
  );
};
const Favorite = () => {
  const [arr] = useState([]);
  //const get = () => axios.get("/api/project/favorite").then((res) => setArr(res.data));

  if (arr.length === 0) return <Null title="нету избранных проектов" />;
  return (
    <>
      {arr.map((item) => (
        <ProjectItem projectInfo={item} key={item.id} />
      ))}
    </>
  );
};
export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    info: { investment: [], role: [] },
    tab: 1,
    roles: [],
  };
  componentDidMount() {
    axios.post("/api/auth/getMy").then((res) => this.setState({ info: res.data }));
    axios.get("/api/users/roles").then((res) => this.setState({ roles: res.data }));
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  out = () => {
    localStorage.clear("access-token");
    window.location.pathname = "/";
  };
  tabClick(i) {
    this.setState({ tab: i });
  }
  render() {
    const { collapsed, tab, info, roles } = this.state;
    let list = roles.filter((item) => {
      if (info.role.indexOf(item.value) !== -1) return item;
      else return null;
    });
    list = list.map((item, i) => {
      let url = item.value === "admin" ? "/admin" : "/user/" + item.value;
      if (window.location.pathname === url) return null;
      return (
        <Menu.Item key={i} icon={<i className="fas fa-users"></i>}>
          <Link to={url}>{item?.description}</Link>
        </Menu.Item>
      );
    });
    const get = () => {
      axios.post("/api/auth/getMy").then((res) => this.setState({ info: res.data }));
    };
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu defaultSelectedKeys={["home"]} mode="inline">
            <Menu.Item key="home" icon={<UserOutlined />} onClick={() => this.tabClick(1)}>
              Моя страница
            </Menu.Item>
            <Menu.Item key="favorite" icon={<StarOutlined />} onClick={() => this.tabClick(2)}>
              Избранное
            </Menu.Item>
            <Menu.Item key="eye" icon={<EyeOutlined />} onClick={() => this.tabClick(3)}>
              Отслеживаемые
            </Menu.Item>
            {list}
            <Menu.Item key="out" icon={<LogoutOutlined />} onClick={this.out}>
              Выход
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div>{tab === 1 ? <Personal info={info} get={get} /> : null}</div>
            <div>{tab === 2 ? <Favorite info={info?.favorite} /> : null}</div>
            <div>{tab === 3 ? <Projects info={info?.investment} /> : null}</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
