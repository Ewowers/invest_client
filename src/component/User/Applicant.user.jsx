import React, { useState, useRef } from "react";
import axios from "../../util/xml";
import { Grid, Row, Col, Modal, Form, Input, Select, DatePicker, Button, Typography, Image, Layout, Menu } from "antd";
import { MessageOutlined, ProjectOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Alert } from "./Alert";
import defaultImage from "../../image/default-image.png";
import moment from "moment";
const { Option } = Select;
const { Content, Sider } = Layout;
const Personal = ({ info, get }) => {
  //персональные данные
  const { Text } = Typography;
  return (
    <div style={{ border: "1px solid #EDF2F7", padding: 10, borderRadius: 10 }}>
      <Row>
        <Col span={12} md={6} style={{ borderRight: "1px solid #EDF2F7", padding: 10 }}>
          <Text strong>ФИО</Text>
          <p>{info.fullName}</p>
          <Text strong>Наименование организации:</Text>
          <p>{info.nameOrganization}</p>
          <Text strong>Контактные данные</Text>
          <p style={{ margin: 0 }}>
            <Text strong>email:</Text> {info.email}
          </p>
          <p>
            <Text strong>телефон:</Text> {info.phone}
          </p>
        </Col>

        <Col span={12} md={6} style={{ borderRight: "1px solid #EDF2F7", padding: 10 }}>
          <Text strong>Банковские реквизиты</Text>
          <br />
          <Text>bin: 100000</Text>
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
const EditPersonal = ({ info, get }) => {
  //редактирование персональных данных
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

const EditProject = ({ info, type, region, get }) => {
  //редактирование проекта
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(info.image);
  const [imageEr, setImageEr] = useState(false);
  const { md } = Grid.useBreakpoint();
  const ref = useRef(null);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    ref.current.click();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    if (!image) return setImageEr(true);
    values.image = image;
    axios
      .put("/api/project/" + info.id, values)
      .then((res) => get())
      .then((res) => handleCancel());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    if (!image) return setImageEr(true);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageEr(false);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
  };
  const style = {
    button: {
      color: "#ffffff",
      backgroundColor: "#5E4C5A",
      borderRadius: 10,
    },
    modal: {
      width: md ? "90%" : 540,
    },
    none: { display: "none" },
  };
  return (
    <>
      <Button type="primary" onClick={showModal} style={{ backgroundColor: "#5E4C5A", borderRadius: 10, color: "#fff", marginRight: 10 }}>
        Редактировать проект
      </Button>
      <Modal title={info.title} width={style.modal.width} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ ...info, date: moment(info.date, "DD-MM-YYYY") }}>
          <Row gutter={50}>
            <Col md={12} span={24}>
              <Form.Item label="Название" name="title">
                <Input />
              </Form.Item>
              <Form.Item label="Требуемая сумма" name="capital">
                <Input />
              </Form.Item>
              <Form.Item label="Дата" name="date">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Город" name="region">
                <Select>
                  {region.map((item) => (
                    <Option value={item.region} key={item.region}>
                      {item.region}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Категория проекта" name="type" rules={[{ required: true, message: "Please input your username!" }]}>
                <Select>
                  {type.map((item) => (
                    <Option value={item.title} key={item.title}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Короткое описание" name="descriptionMin" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input.TextArea row={20} />
              </Form.Item>
              <Form.Item label="Полное описание" name="description" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input.TextArea row={20} />
              </Form.Item>
              <input type="file" onChange={handleImage} />
              <div style={{ opacity: imageEr ? 1 : 0, color: "red" }}>Пожалуйста загрузитеу картинку!</div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Image src={image || defaultImage} alt="image" width={"100%"} />
            </Col>
          </Row>
          <Form.Item style={style.none}>
            <Button type="primary" ref={ref} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
const ProjectItem = ({ info, region, type, get }) => {
  //проект
  const { Title, Text } = Typography;
  const date = new Date(info.date);
  const days = (date - new Date()) / 1000 / 60 / 60 / 24;
  const destroy = () => {
    axios.remove("/api/project/" + info.id).then(() => get());
  };
  return (
    <Row gutter={25} style={{ marginBottom: 25 }}>
      <Col span={4}>
        <Image src={info.image} height="100%" width="100%" />
      </Col>
      <Col span={24} md={20} style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Title>{info.title}</Title>
            <Text strong style={{ backgroundColor: "#000", color: "#fff", borderRadius: 10, padding: 5 }}>
              {info.type}
            </Text>
          </div>
          <div style={{ textAlign: "right", display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: 15 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong>{Math.round(days)} дней</Text>
              <Text>осталось дней</Text>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text strong>{info.capital}</Text>
              <Text>Требуется инвестиций</Text>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Text strong>Описание проекта</Text> <br />
            <Text>{info.descriptionMin}</Text> <br />
            {info.status ? null : (
              <Text style={{ backgroundColor: "red", color: "#fff", padding: 5, borderRadius: 10, marginTop: 15, display: "block" }}>На расмотрений</Text>
            )}
          </div>
          <div>
            <EditProject info={info} region={region} type={type} get={get} />
            <Button type="primary" danger style={{ borderRadius: 10, color: "#fff" }} onClick={destroy}>
              Удалить проект
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};
const Projects = ({ info, region, type, get }) => {
  //проекты
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageEr, setImageEr] = useState(false);
  const [image, setImage] = useState(null);
  const ref = useRef(null);
  const { md } = Grid.useBreakpoint();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    ref.current.click();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    if (!image) return setImageEr(true);
    values.image = image;
    axios
      .post("/api/project/applicant", values)
      .then((res) => get())
      .then((res) => handleCancel());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    if (!image) return setImageEr(true);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageEr(false);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
  };
  const style = {
    button: {
      color: "#ffffff",
      backgroundColor: "#5E4C5A",
      borderRadius: 10,
    },
    modal: {
      width: md ? "70%" : 540,
    },
    none: { display: "none" },
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={style.button}>
        Создать проект
      </Button>
      <Modal width={style.modal} title="Создать проект" okText="Создать" cancelText="Отмена" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Row gutter={50}>
            <Col md={12} span={24}>
              <Form.Item label="Название" name="title" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Требуемая сумма" name="capital" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Дата" name="date" rules={[{ required: true, message: "Please input your username!" }]}>
                <DatePicker style={{ width: "100%" }} placeholder="Дата окончание проекта" />
              </Form.Item>
              <Form.Item label="Город" name="region" rules={[{ required: true, message: "Please input your username!" }]}>
                <Select>
                  {region.map((item) => (
                    <Option value={item.region} key={item.region}>
                      {item.region}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Категория проекта" name="type" rules={[{ required: true, message: "Please input your username!" }]}>
                <Select>
                  {type.map((item) => (
                    <Option value={item.title} key={item.title}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Короткое описание" name="descriptionMin" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input.TextArea row={20} />
              </Form.Item>
              <Form.Item label="Полное описание" name="description" rules={[{ required: true, message: "Please input your username!" }]}>
                <Input.TextArea row={20} />
              </Form.Item>
              <input type="file" onChange={handleImage} />
              <div style={{ opacity: imageEr ? 1 : 0, color: "red" }}>Пожалуйста загрузитеу картинку!</div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Image src={image || defaultImage} alt="image" width={"100%"} />
            </Col>
          </Row>
          <Form.Item style={style.none}>
            <Button type="primary" ref={ref} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ marginBottom: 45 }}></div>
      {info.map((item) => (
        <ProjectItem key={item.id} info={item} region={region} type={type} get={get} />
      ))}
    </>
  );
};

export class Applicant extends React.Component {
  //интерфейс
  state = {
    //стейты
    collapsed: false,
    tab: 1,
    info: { role: [] },
    region: [],
    proj: [],
    roles: [],
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  tabClick(i) {
    this.setState({ tab: i });
  }
  getProj() {
    axios.get("/api/project/my").then((res) => this.setState({ proj: res.data }));
  }

  out() {
    localStorage.clear("access-token");
    window.location.pathname = "/";
  }

  componentDidMount() {
    axios.post("/api/auth/getMy").then((res) => this.setState({ info: res.data }));
    axios.get("/api/util/region").then((res) => this.setState({ region: res.data }));
    axios.get("/api/project/type").then((res) => this.setState({ type: res.data }));
    axios.get("/api/project/my").then((res) => this.setState({ proj: res.data }));
    axios.get("/api/users/roles").then((res) => this.setState({ roles: res.data }));
  }

  render() {
    const { collapsed, tab, info, region, proj, type, roles } = this.state;
    let list = roles.filter((item) => {
      if (info.role.indexOf(item.value) !== -1) return item;
      else return null;
    });
    const get = () => {
      axios.post("/api/auth/getMy").then((res) => this.setState({ info: res.data }));
    };
    const getProj = () => {
      axios.get("/api/project/my").then((res) => this.setState({ proj: res.data }));
    };
    list = list.map((item, i) => {
      let url = item.value === "admin" ? "/admin" : "/user/" + item.value;
      if (window.location.pathname === url) return null;
      return (
        <Menu.Item key={i} icon={<i className="fas fa-users"></i>}>
          <Link to={url}>{item?.description}</Link>
        </Menu.Item>
      );
    });
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="home" icon={<UserOutlined />} onClick={() => this.tabClick(1)}>
              Моя страница
            </Menu.Item>
            <Menu.Item key="alert" icon={<MessageOutlined />} onClick={() => this.tabClick(2)}>
              Уведомления
            </Menu.Item>
            <Menu.Item key="projects" icon={<ProjectOutlined />} onClick={() => this.tabClick(3)}>
              Мой проекты
            </Menu.Item>
            {list}
            <Menu.Item onClick={this.out} key="out" icon={<LogoutOutlined />}>
              Выход
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>{tab === 1 ? <Personal info={info} get={get} /> : null}</div>
              <div>{tab === 2 ? <Alert alert={info.alert} /> : null}</div>
              <div>{tab === 3 ? <Projects get={this.getProj} region={region} type={type} info={proj} get={getProj} /> : null}</div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
