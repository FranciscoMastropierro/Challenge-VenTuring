import { Button, InputNumber, Form, Input } from "antd";
import { useEffect } from "react";
const { TextArea   } = Input;

const FormMovie = ({ fetcher, data, closeModal }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish = (values) => {
    if (data) values.id = data.id;
    fetcher(values);
    form.resetFields();
    closeModal();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Titulo de pelicula"
        name="title"
        rules={[
          {
            required: true,
            message: "Por favor selecione un titulo!",
          },
        ]}
      >
        <Input maxLength={100} placeholder="Ingrese nombre de pelicula" />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
        rules={[
          {
            required: true,
            message: "Por favor ingrese una descripción!",
          },
        ]}
      >
        <TextArea rows={5} placeholder="Descripción" />
      </Form.Item>

      <Form.Item
        label="Año"
        name="year"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el año de la pelicula!",
          },
        ]}
      >
        <InputNumber min={1888} placeholder="Ingrese año de la pelicula" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormMovie;
