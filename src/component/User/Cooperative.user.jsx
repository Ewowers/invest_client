import React, { useState, useRef } from "react";
import { Layout, Row, Col, Menu, Form, Input, Modal, Typography, Button } from "antd";
import { StarOutlined, EyeOutlined, LogoutOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "../../util/xml";
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
        get();
        handleCancel();
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
          <Text strong>Партнерство с проектами</Text>
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
export class Cooperative extends React.Component {
  componentDidMount() {
    axios.post("/api/auth/getMy").then((res) => this.setState({ info: res.data }));
    axios.get("/api/users/roles").then((res) => this.setState({ roles: res.data }));
  }
  state = {
    collapsed: false,
    tab: 1,
    info: { roles: [] },
    roles: [],
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  tabClick(i) {
    this.setState({ tab: i });
  }
  out() {
    localStorage.clear("access-token");
    window.location.pathname = "/";
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
          <div className="logo" />
          <Menu defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="home" icon={<UserOutlined />} onClick={() => this.tabClick(1)}>
              Моя страница
            </Menu.Item>
            <Menu.Item key="favorite" icon={<StarOutlined />} onClick={() => this.tabClick(2)}>
              Избранное
            </Menu.Item>
            <Menu.Item key="eye" icon={<EyeOutlined />} onClick={() => this.tabClick(3)}>
              Заявки
            </Menu.Item>
            <Menu.Item key="company" icon={<UserSwitchOutlined />} onClick={() => this.tabClick(3)}>
              Сотруднечество
            </Menu.Item>
            {list}
            <Menu.Item key="out" icon={<LogoutOutlined />} onClick={this.out}>
              Выход
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {tab === 1 ? <Personal info={info} get={get} /> : null}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
