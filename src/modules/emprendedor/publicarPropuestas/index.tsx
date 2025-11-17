import "../../../styles/formulario.css";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Progress,
  message,
  Card,
  Space,
  Typography,
} from "antd";
import { MinusCircleOutlined, SendOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import api from "../../../api.ts";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface PropuestaFormValues {
  title: string;
  description: string;
  archivo?: string;
}

export const PublicarPropuesta = () => {
  const [progress, setProgress] = useState(0);
  const [form] = Form.useForm();

  const location = useLocation();
  const { desafio } = location.state || {}; // Desafío que viene del estado

  const fields: (keyof PropuestaFormValues)[] = ["title", "description"];

  // Cuando finaliza el formulario, envia la propuesta a la base de datos
  const onFinish = async (values: PropuestaFormValues): Promise<void> => {
    try {
      const userStorage = localStorage.getItem("user");
      const usuario = userStorage
        ? JSON.parse(userStorage)
        : { _id: "", idCompany: "" };

      console.log("Usuario desde localStorage:", usuario);

      const payload = {
        ...values,
        idCompany: desafio?.idCompany._id,
        idUser: usuario._id,
        idChallenge: desafio?._id,
        publicationDate: new Date().toISOString(),
      };

      console.log("Payload a enviar:", payload);

      // POST propuesta
      const response = await api.post(`/proposals/`, payload);
      const createdForm = response.data;

      console.log("Propuesta creada correctamente:", createdForm);
      alert("Propuesta publicada correctamente");

      // POST notificación
      await api.post(`/notification/`, {
        idEmprendedor: usuario._id,
        idCompany: desafio?.idCompany._id,
        typeNotification: "propuestaRecibida",
        idChallenge: desafio?._id,
      });

      alert("Propuesta y notificación enviada");

      // Limpiar formulario
      form.resetFields();
      setProgress(0);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear la propuesta:", error.message);
        message.error(error.message);
      } else {
        console.error("Error desconocido al crear la propuesta:", error);
        message.error("Error desconocido al crear la propuesta");
      }
    }
  };

  // Actualiza el valor de la barra de progreso
  const handleValuesChange = (
    _changedValues: Partial<PropuestaFormValues>,
    allValues: PropuestaFormValues
  ) => {
    const filled = fields.filter((field) => !!allValues[field]).length;
    const percent = Math.round((filled / fields.length) * 100);
    setProgress(percent);
  };

  return (
    <div className="divStyle">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Título */}
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ color: "#463F3A", marginBottom: 8 }}>
            Publicar Nueva Propuesta
          </Title>
          <Text type="secondary">
            {"Completá el formulario para enviar tu propuesta para " +
              (desafio?.title || "")}
          </Text>
        </div>

        {/* Barra de progreso */}
        <Card bordered={false} style={{ background: "#f9f9f9" }}>
          <Progress
            percent={progress}
            strokeColor={{
              "0%": "#463F3A",
              "100%": "#6B6356",
            }}
            size={["100%", 24]}
            format={(percent) => (
              <span style={{ color: "#463F3A", fontWeight: 600 }}>
                {percent}%
              </span>
            )}
          />
        </Card>

        {/* Formulario */}
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            label="Título de la propuesta"
            name="title"
            rules={[{ required: true, message: "Ingresá un título" }]}
          >
            <Input placeholder="Ej: Solución innovadora para energía solar" />
          </Form.Item>

          <Form.Item
            label="Categoría de la propuesta"
            name="category"
            initialValue={desafio?.category}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true, message: "Ingresá una descripción" }]}
          >
            <TextArea
              rows={4}
              placeholder="Describe brevemente tu propuesta, enfoque y objetivos..."
            />
          </Form.Item>

          <Form.List name="links">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Form.Item
                    label={field.name === 0 ? "Links" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      noStyle
                    >
                      <Input
                        placeholder="https://example.com"
                        style={{ width: "80%", marginRight: 8 }}
                      />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      style={{ color: "red" }}
                    />
                  </Form.Item>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Agregar Link
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#463F3A",
                borderColor: "#463F3A",
              }}
              block
              size="large"
              icon={<SendOutlined />}
            >
              PUBLICAR PROPUESTA
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};
