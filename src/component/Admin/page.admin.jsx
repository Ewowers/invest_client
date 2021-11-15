import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Tag, Space, Table, Image, message, Row, Col } from "antd";
import { EyeOutlined, LinkOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import fetchs from "../../util/xml";
const { Option } = Select;
const CreatePage = ({ ok, get }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [image, setImage] = useState(null);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchs.get("/api/users/roles").then((res) => setRoles(res.data));
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    if (!image) return setErrorImage(true);
    values.image = image;
    fetchs.post("/api/page", values).then((res) => {
      if (res?.data?.error) setError(res.error);
      else {
        handleOk();
        ok();
        get();
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    if (!image) setErrorImage(true);
    else setErrorImage(false);
    console.log("Failed:", errorInfo);
  };
  const upload = (e) => {
    if (!e.target.files[0]) return;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setImage(reader.result);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create
      </Button>
      <Modal footer={false} title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form name="basic" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <h1 style={{ textAlign: "center", color: "red" }}>{error}</h1>
          <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Uri" name="uri" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Roles" name="role" rules={[{ required: true, message: "Please input your username!" }]}>
            <Select mode="tags">
              {roles.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <input type="file" onChange={upload} />
          <div style={{ opacity: errorImage ? 1 : 0, color: "red" }}>Please input your image!</div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              save
            </Button>
            <Button type="primary" danger onClick={handleOk}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
const Show = ({ item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    console.log(item);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <EyeOutlined /> Show
      </Button>
      <Modal title={item.title} width={1000} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Row gutter={25}>
          <Col span={12}>
            <p style={{ fontSize: 24 }}>Title</p>
            <p>{item.title}</p>
            <hr />
            <p style={{ fontSize: 24 }}>Uri</p>
            <p>{item.uri}</p>
            <hr />
            <p style={{ fontSize: 24 }}>Role</p>
            <p>
              {item.role.map((tag) => {
                return (
                  <Tag color="blue" key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </p>
          </Col>
          <Col span={12}>
            <p style={{ fontSize: 24 }}>Description</p>
            <p>{item.description}</p>
            <hr />
            <p>Image</p>
            <Image width="100%" src={item.image} alt={item.title} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
const Edit = ({ ok, get, item }) => {
  const [errorImage, setErrorImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(item.image);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchs.get("/api/users/roles").then((res) => setRoles(res.data));
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    if (!image) return setErrorImage(true);
    values.image = image;
    fetchs.put("/api/page/" + item.id, values).then((res) => {
      if (res?.data?.error) setError(res.error);
      else {
        handleOk();
        ok();
        get();
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    if (!image) setErrorImage(true);
    else setErrorImage(false);
    console.log("Failed:", errorInfo);
  };
  const upload = (e) => {
    if (!e.target.files[0]) return;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => setImage(reader.result);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        <EditOutlined /> edit
      </Button>
      <Modal footer={false} title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form name="basic" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <h1 style={{ textAlign: "center", color: "red" }}>{error}</h1>
          <Form.Item label="Title" name="title">
            <Input defaultValue={item.title} />
          </Form.Item>
          <Form.Item label="Uri" name="uri">
            <Input defaultValue={item.uri} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input defaultValue={item.description} />
          </Form.Item>
          <Form.Item label="Roles" name="role">
            <Select mode="tags" defaultValue={item.role}>
              {roles.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <input type="file" onChange={upload} />
          <div style={{ opacity: errorImage ? 1 : 0, color: "red" }}>Please input your image!</div>
          <Image width="100%" src={image} alt={item.title} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              save
            </Button>
            <Button type="primary" danger onClick={handleOk}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
const AdminPage = () => {
  const [page, setPage] = useState([]);
  const get = () => {
    fetchs.get("/api/page").then((res) => {
      setPage(
        res.data.map((item, i) => {
          return { ...item, key: i };
        })
      );
    });
  };
  const remove = (id) => {
    fetchs.remove("/api/page/" + id).then((res) => get());
  };
  useEffect(get, []);
  const success = () => {
    message.success("This is a success message");
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "key",
    },
    {
      title: "Uri",
      dataIndex: "uri",
      key: "key",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "key",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "key",
      render: (createAt) => {
        let date = new Date(createAt);
        return date.toLocaleString();
      },
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "key",
      render: (createAt) => {
        let date = new Date(createAt);
        return date.toLocaleString();
      },
    },
    {
      title: "Role",
      key: "key",
      dataIndex: "role",
      render: (role) => {
        return (
          <>
            {role.map((tag) => {
              return (
                <Tag color="blue" key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "image",
      dataIndex: "image",
      key: "key",
      render: (image) => {
        return <Image src={image} alt="1" width={100} height={100} />;
      },
    },
    {
      title: "Action",
      key: "key",
      render: (id) => {
        return (
          <Space size="small">
            <Button>
              <Link to={"/home/" + id.uri}>
                <LinkOutlined /> link
              </Link>
            </Button>
            <Show item={id} />
            <Edit item={id} get={get} ok={success} />
            <Button onClick={() => remove(id.id)}>
              <DeleteOutlined /> delete
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <header>
        <CreatePage ok={success} get={get} />
      </header>
      <Table columns={columns} dataSource={page} />
    </>
  );
};
export default AdminPage;
