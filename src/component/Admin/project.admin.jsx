import React, { useState, useEffect } from "react";
import { Modal, message, Button, Form, Input, InputNumber, Select, DatePicker, Upload, Row, Col, Image, Tabs, Table, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Resizer from "react-image-file-resizer";
import moment from "moment";
import axios from "../../util/xml";
const { Option } = Select;
const { TabPane } = Tabs;
const CreateType = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" initialValues={{ modifier: "public" }}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title!" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const CreateProject = ({ visible, onCreate, onCancel, types, states, questions }) => {
  const [errorImage, setErrorImage] = useState(false);
  const [regions, setRegions] = useState([]);
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    axios.get("/api/users").then((res) => {
      setUsers(res.data);
    });
    axios.get("/api/util/region").then((res) => setRegions(res.data));
  }, []);

  const change = async (e) => {
    if (!e.target.files[0]) return;
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        e.target.files[0],
        1200,
        600,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        1200,
        600
      );
    }).then((res) => setImage(res));
  };
  return (
    <Modal
      visible={visible}
      width={1400}
      title="???????????????? ??????????????"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (!image) {
              setErrorImage(true);
              throw new Error();
            } else {
              values.image = image;
              console.log(values);
              onCreate(values);
            }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item name="title" label="????????????????" rules={[{ required: true, message: "Please input the title!" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="capital" label="?????????????????? ??????????" rules={[{ required: true, message: "Please input the title!" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="date" label="????????" rules={[{ required: true, message: "Please input the title!" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="type" label="?????????????????? ??????????????" rules={[{ required: true, message: "Please input the title!" }]}>
              <Select>
                {types.map((item) => (
                  <Option value={item.title} key={item.title}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="descriptionMin" label="?????????????? ????????????????" rules={[{ required: true, message: "Please input the title!" }]}>
              <Input.TextArea rows={3} maxLength={1500}></Input.TextArea>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label="????????????????" rules={[{ required: true, message: "Please input the title!" }]}>
              <Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item name="user" label="??????????" rules={[{ required: true, message: "Please input the title!" }]}>
              <Select>
                {users.map((user) => (
                  <Option value={JSON.stringify(user)} key={user.id}>
                    {user.username} | {user.email}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="region" label="Region" rules={[{ required: true, message: "Please input the title!" }]}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {regions.map((item) => (
                  <Option value={item.region} key={item.region}>
                    {item.region}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="state" label="????????????" rules={[{ required: true, message: "Please input the title!" }]}>
              <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {states.map((item) => (
                  <Option value={item.value} key={item.value}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <input type="file" onChange={change} />
            <div style={{ color: errorImage ? "red" : "white" }}>Please input the title!</div>
          </Col>
          <Col span={24}>
            <Image src={image} alt="alt" />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const EditModal = ({ visible, onCreate, onCancel, info, types }) => {
  const [image, setImage] = useState(info.image);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    setImage(e.file.thumbUrl);
    return e && e.fileList;
  };
  const test = (i) => {
    let file = new FileReader();
    file.readAsDataURL(i.file);
    file.onload = (a) => setImage(a.currentTarget.result);
  };
  useEffect(() => {
    axios.get("/api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);
  const handleChange = (img) => {
    // console.log(img.file.thumbUrl);
  };
  return (
    <Modal
      width={1200}
      visible={visible}
      title={info.title}
      okText="save"
      cancelText="cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" initialValues={{ modifier: "public" }}>
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item name="title" label="????????????????">
              <Input defaultValue={info.title} />
            </Form.Item>
            <Form.Item name="capital" label="?????????????????? ??????????">
              <InputNumber defaultValue={info.capital} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="date" label="????????">
              <DatePicker style={{ width: "100%" }} defaultValue={moment(info.date)} />
            </Form.Item>
            <Form.Item name="type" label="?????????????????? ??????????????">
              <Select defaultValue={info.type}>
                {types.map((item) => (
                  <Option value={item.title} key={item.title}>
                    {item.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="status" label="????????????">
              <Select defaultValue={info.status}>
                <Option value={true}>??????????????</Option>
                <Option value={false}>???? ??????????????</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label="????????????????">
              <Input.TextArea rows={5} defaultValue={info.description} />
            </Form.Item>
            <Form.Item name="user" label="??????????">
              <Select defaultValue={info.user}>
                {users.map((user) => (
                  <Option value={JSON.stringify(user)} key={user.id}>
                    {user.username} | {user.email}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="image" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload customRequest={test} name="logo" listType="picture" maxCount={1} onChange={handleChange}>
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  Click to upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Image src={image} alt="alt" width="100%" height={400} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
const Project = () => {
  // ???????????????? ??????????????????
  const [createType, setCreateType] = useState(false);
  const onFinishType = (values) => {
    axios.post("/api/project/type", values).then((res) => getTypes());
    setCreateType(false);
    success("?????????????????? ??????????????");
  };
  const showType = () => {
    setCreateType(true);
  };

  //???????????????? ??????????????????
  const [state, setState] = useState([]);
  const getState = () => {
    axios.get("/api/util/state").then((res) => setState(res.data));
  };

  //????????????-??????????
  const [question, setQuestion] = useState([]);
  const getQuestion = () => {
    axios.get("/api/util/question").then((res) => setQuestion(res.data));
  };

  //???????????????? ???????????? ??????????????
  const [createProject, setCreateProject] = useState(false);
  const [types, setTypes] = useState([]);
  const getTypes = () => {
    axios.get("/api/project/type").then((res) => setTypes(res.data));
  };
  const onFinishProject = (values) => {
    axios.post("/api/project/", values).then((res) => {
      getProject();
      setCreateProject(false);
    });
  };
  const showProject = () => {
    setCreateProject(true);
  };
  //?????????????????? ??????????????
  const [edit, setEdit] = useState(false);
  const [editInfo, setEditInfo] = useState({});
  const onEdit = (values) => {
    if (values.image) values.image = values.image[0].thumbUrl;
    console.log(values);
    axios.put("/api/project/" + editInfo.id, values).then(() => getProject());
    setEdit(false);
  };
  const showEdit = (item) => {
    new Promise((resolve, reject) => {
      setEditInfo(item);
      resolve("result");
    }).then((res) => setEdit(true));
  };
  const statusTru = (id) => {
    console.log(id);
    axios.put("/api/project/complite/" + id).then((res) => {
      getProject();
    });
  };
  // ??????????????
  const [projects, setProjects] = useState([]);
  const getProject = () => {
    axios.get("/api/project").then((res) =>
      setProjects(
        res.data.map((item, i) => {
          return { ...item, key: i };
        })
      )
    );
  };
  const remove = (id) => {
    axios.remove("/api/project/" + id).then((res) => getProject());
  };

  const success = (msg) => {
    message.success(msg);
  };
  useEffect(() => {
    getTypes();
    getProject();

    getQuestion();
    getState();
  }, []);
  const columns = [
    { title: "????????????????", dataIndex: "title", key: "key" },
    { title: "?????????????????? ??????????", dataIndex: "capital", key: "key" },
    { title: "?????????????????? ??????????????", dataIndex: "type", key: "key" },
    { title: "???????????????? ??????????????", key: "description", dataIndex: "key" },
    { title: "????????????", dataIndex: "type", key: "key", render: () => "[??????????????, ????????????????]" },
    { title: "??????????", dataIndex: "region", key: "key" },
    { title: "??????????", dataIndex: "username", key: "username" },
    { title: "????????????", dataIndex: "status", key: "key", render: (item) => (item ? "??????????????" : "???? ??????????????") },
    {
      title: "Action",
      key: "action",
      render: (item) => {
        return (
          <Space size="middle">
            <Button type="primary" href={"/project/" + item.id}>
              ?????????????? ?? ????????????
            </Button>
            <Button type="primary" onClick={() => showEdit(item)}>
              ???????????????????????????? ??????????????
            </Button>
            <Button danger type="primary" onClick={() => remove(item.id)}>
              ??????????????
            </Button>

            {item.status ? null : (
              <Button type="primary" onClick={() => statusTru(item.id)}>
                ????????????????
              </Button>
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <header style={{ marginBottom: 25 }}>
        <Button type="primary" onClick={showType} style={{ marginRight: 25 }}>
          ?????????????? ??????????????????
        </Button>
        <Button type="primary" onClick={showProject}>
          ?????????????? ????????????
        </Button>
        <CreateType
          visible={createType}
          onCreate={onFinishType}
          onCancel={() => {
            setCreateType(false);
          }}
        />
        <CreateProject
          visible={createProject}
          onCreate={onFinishProject}
          onCancel={() => {
            setCreateProject(false);
          }}
          types={types}
          states={state}
          questions={question}
        />
        <EditModal
          visible={edit}
          onCreate={onEdit}
          info={editInfo}
          onCancel={() => {
            setEdit(false);
          }}
          types={types}
        />
      </header>
      <Tabs defaultActiveKey="1">
        <TabPane tab="?????? ??????????????" key="1">
          <Table columns={columns} dataSource={projects} />
        </TabPane>
        <TabPane tab="?????????????????????????? ??????????????" key="2">
          <Table columns={columns} dataSource={projects.filter((item) => (item.status ? item : false))} />
        </TabPane>
        <TabPane tab="?????????????????? ????????????????????????" key="3">
          <Table columns={columns} dataSource={projects.filter((item) => (item.status ? false : item))} />
        </TabPane>
      </Tabs>
    </>
  );
};
export default Project;
