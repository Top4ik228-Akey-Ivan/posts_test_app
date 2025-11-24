import { Form, Input, Button, Card, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type Post } from "../services/postsApi";
import { addPost } from "../app/postsSlice";

export const CreatePostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values: { title: string; body: string }) => {
    const newPost: Post = {
      id: Date.now(),
      userId: 1,
      title: values.title,
      body: values.body,
      liked: false,
    };

    dispatch(addPost(newPost));
    message.success("Пост успешно создан!");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto" }}>
      <Card title="Создать новый пост">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Заголовок"
            name="title"
            rules={[
              { required: true, message: "Введите заголовок" },
              { min: 5, message: "Минимум 5 символов" },
            ]}
          >
            <Input placeholder="Заголовок поста" />
          </Form.Item>

          <Form.Item
            label="Содержание"
            name="body"
            rules={[
              { required: true, message: "Введите содержание" },
              { min: 10, message: "Минимум 10 символов" },
            ]}
          >
            <Input.TextArea rows={6} placeholder="Текст поста" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать пост
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => navigate(-1)}
            >
              Отмена
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
