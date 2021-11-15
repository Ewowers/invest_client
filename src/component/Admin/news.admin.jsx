import { Row, Col, Form, Input, Button, Card } from "antd";
import React from "react";
import feths from "../../util/xml";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
const AdminNews = () => {
  const [post, setPost] = useState({ title: null, description: null });
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const onFinish = (values) => {
    console.log("Success:", values);
    feths.post("/api/news", values).then((res) => {
      if (res.data?.error) return setError(res.data.error);
      else get();
    });
  };
  const handlePost = (e) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const get = () => {
    axios.get("/api/news").then((res) => setPosts(res.data));
  };
  useEffect(get, []);
  return (
    <Row>
      <Col span={12}>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1>{error}</h1>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input id="title" onChange={handlePost} />
          </Form.Item>
          <Form.Item
            label="description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input.TextArea rows={10} id="description" onChange={handlePost} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          <Card title={post.title}>
            <p>{post.description}</p>
          </Card>
        </div>
      </Col>
      <Col span={12}>
        {posts.map((item, i) => {
          return (
            <Card key={i} title={item.title} style={{ marginBottom: 25 }}>
              <p>{item.description}</p>
            </Card>
          );
        })}
      </Col>
    </Row>
  );
};
export default AdminNews;
