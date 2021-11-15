import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Select, DatePicker, Button, Modal } from "antd";
import {} from "@ant-design/icons";
import fetchs from "../../util/xml";
import "./project.user.css";
const { Option } = Select;

const Create = ({ state, setState }) => {
  const [image, setImage] = useState(null); // картинка
  const [errorImage, setErrorImage] = useState(false); //ошибка
  const handleOk = () => {
    setState(false);
  };
  const handleCancel = () => {
    setState(false);
  };
  const onFinish = (values) => {
    // создание нового проекта
    if (!image) return setErrorImage(true);
    values.image = image;
    fetchs.post("/api/project", values).then((resault) => console.log(resault.data));
  };

  const onFinishFailed = (errorInfo) => {
    if (!image) return setErrorImage(true);
    console.log("Failed:", errorInfo);
  };
  const upload = (e) => {
    //картинка
    const width = 1200;
    const height = 630;
    const fileName = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement("canvas");
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          (blob) => {
            const file = new File([blob], fileName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setImage(reader.result);
          },
          "image/jpeg",
          1
        );
      };
      reader.onerror = (error) => console.log(error);
    };
  };
  return (
    <Modal title="Basic Modal" width={1000} visible={state} onOk={handleOk} onCancel={handleCancel}>
      <Form name="basic" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={15}>
          <Col md={12}>
            <Form.Item
              name="title"
              label="Название"
              rules={[{ required: true, message: "Пожалуйста заполните название!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Категория проекта"
              rules={[{ required: true, message: "Пожалуйста выберите категорию проекта!" }]}
            >
              <Select>
                <Option value="it">it</Option>
                <Option value="сharity">Благотворительность</Option>
                <Option value="innovative">Инновационный</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              name="capital"
              label="Требуемая сумма"
              rules={[{ required: true, message: "Пожалуйста заполните требуемую сумму!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Срок" rules={[{ required: true, message: "Пожалуйста заполните название!" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Срок"
              rules={[{ required: true, message: "Пожалуйста заполните название!" }]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
            <div>
              <p style={{ color: "red" }}>*Пердупреждение картинка изменить разрешение на 1200*630</p>
              <input type="file" onChange={upload} style={{ border: errorImage ? "1px solid red" : "none" }} />
              <p style={{ color: "red", opacity: errorImage ? 1 : 0 }}>Пожалуйста загрузите картинку</p>
            </div>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
const Project = ({ item }) => {
  const date = new Date(item.date);

  return (
    <Row
      style={{
        width: 1200,
        height: 630,
        position: "relative",
        backgroundImage: "url('" + item.image + "')",
        color: "#fff",
      }}
      justify="center"
      align="middle"
      className="block"
    >
      <Col span={6}>
        <p>{item.type}</p>
        <p style={{ fontSize: 24 }}>{item.title}</p>
        <p style={{ fontSize: 18 }}>{item.description}</p>
      </Col>
      <Col span={6}>
        <p>Количество инвестров</p>
        <p style={{ fontSize: 36 }}>{item.investors || 0}</p>
        <p>Собранно денег</p>
        <p style={{ fontSize: 36 }}>{item.money}</p>
        <p>Срок</p>
        <p style={{ fontSize: 36 }}>{date.toLocaleDateString()}</p>
      </Col>
    </Row>
  );
};
const UserProject = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const get = () => {
    //Получение всех проекто пользователя, если есть
    fetchs.get("/api/project/my").then((resault) => {
      setProjects(resault.data);
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  useEffect(() => get(), []);
  return (
    <>
      <Row>
        <Button onClick={showModal}>Создать проект</Button>
        <Create state={isModalVisible} setState={setIsModalVisible} />
      </Row>
      {projects.map((item, i) => (
        <Project item={item} key={i} />
      ))}
    </>
  );
};

export default UserProject;
