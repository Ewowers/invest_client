import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  MailOutlined,
  FormOutlined,
  PicLeftOutlined,
  DollarCircleOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import UserAdmin from "./Admin/users.admintwo";
import AdminMail from "./Admin/mail.admin";
import AdminNews from "./Admin/news.admin";
import AdminProject from "./Admin/project.admin";
import AdminPage from "./Admin/page.admin";
import AdminRequest from "./Admin/requestInvest";
import { AdminFeedBack } from "./Admin/feedback.admin";
import fethcs from "../util/xml";
const { Content, Sider } = Layout;

class Admin extends React.Component {
  state = {
    collapsed: true,
    load: false,
  };

  onCollapse = (collapsed) => {
    //сворачивание меню
    this.setState({ collapsed });
  };
  onRedirect = () => {
    // редирекст при отсутвие роли админа
    this.setState({ load: true });
  };
  onLoad = () => {
    // проверка на админа
    fethcs.post("/api/users/load").then((res) => {
      if (res.data.role.indexOf("admin")) this.onRedirect();
    });
  };
  out = () => {
    //выход
    localStorage.clear("acces-token");
    window.location.pathname = "/";
  };
  render() {
    const { collapsed, load } = this.state;
    window.onload = () => this.onLoad();
    //панель админа
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {load ? <Redirect to="/" /> : null}
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/admin">Дом</Link>
            </Menu.Item>
            <Menu.Item key="users" icon={<UserOutlined />}>
              <Link to="/admin/users">Пользователи</Link>
            </Menu.Item>
            <Menu.Item key="projects" icon={<UnorderedListOutlined />}>
              <Link to="/admin/projects">Проекты</Link>
            </Menu.Item>
            <Menu.Item key="request" icon={<DollarCircleOutlined />}>
              <Link to="/admin/request">Заявки на инвестиций</Link>
            </Menu.Item>
            <Menu.Item key="mail" icon={<MailOutlined />}>
              <Link to="/admin/mail">Рассылка</Link>
            </Menu.Item>
            <Menu.Item key="news" icon={<FormOutlined />}>
              <Link to="/admin/news">Новость</Link>
            </Menu.Item>
            <Menu.Item key="page" icon={<PicLeftOutlined />}>
              <Link to="/admin/page">Страницы</Link>
            </Menu.Item>
            <Menu.Item key="feedback" icon={<MessageOutlined />}>
              <Link to="/admin/feedback">Обратная связь</Link>
            </Menu.Item>
            <Menu.Item key="out" icon={<LogoutOutlined />} onClick={this.out}>
              Выход
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                {/* роуты */}
                <Route path="/admin/news" component={AdminNews} />
                <Route path="/admin/mail" component={AdminMail} />
                <Route path="/admin/users" component={UserAdmin} />
                <Route path="/admin/projects" component={AdminProject} />
                <Route path="/admin/page" component={AdminPage} />
                <Route path="/admin/request" component={AdminRequest} />
                <Route path="/admin/feedback" component={AdminFeedBack} />
                <Route path="/admin" component={() => <h1>Admin</h1>} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Admin;
