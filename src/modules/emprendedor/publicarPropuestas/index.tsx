/*import { Form, Input, Button } from "antd";

const { TextArea } = Input;

export const PublicarPropuesta = () => {

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Publicar Desafío</h1>

      <Form layout="vertical">
        <Form.Item
          label="Título"
          name="titulo"
          rules={[{ required: true, message: "Ingresá un título" }]}
        >
          <Input placeholder="Ejemplo: Desafío de innovación" />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[{ required: true, message: "Ingresá una descripción" }]}
        >
          <TextArea rows={4} placeholder="Describí brevemente el desafío..." />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#463F3A"}}
            block
            onClick={() => alert("Propuesta Publicada")}
          >
            Publicar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};*/

import "../../../styles/formulario.css";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Progress,
  Upload,
  message,
  Card,
  Space,
  Typography,
} from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface PropuestaFormValues {
  titulo: string;
  descripcion: string;
  archivo?: string;
}

export const PublicarPropuesta = () => {
  const [progress, setProgress] = useState(0);
  const [form] = Form.useForm();

  const fields: (keyof PropuestaFormValues)[] = ["titulo", "descripcion"];

  const handleValuesChange = (
    _changedValues: Partial<PropuestaFormValues>,
    allValues: PropuestaFormValues
  ) => {
    const filled = fields.filter((field) => !!allValues[field]).length;
    const percent = Math.round((filled / fields.length) * 100);
    setProgress(percent);
  };

  const uploadProps: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} subido exitosamente`);
      } else if (info.file.status === "error") {
        message.error(`Error al subir ${info.file.name}`);
      }
    },
  };

  const handleSubmit = () => {
    if (progress === 100) {
      message.success("Propuesta publicada exitosamente");
      form.resetFields();
      setProgress(0);
    } else {
      message.warning("Por favor completá todos los campos requeridos");
    }
  };

  return (
    <div className="divStyle">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Título principal */}
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ color: "#463F3A", marginBottom: 8 }}>
            Publicar Nueva Propuesta
          </Title>
          <Text type="secondary">
            Completá el formulario para enviar tu propuesta a un desafío
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
          size="large"
        >
          <Form.Item
            label="Título de la propuesta"
            name="titulo"
            rules={[{ required: true, message: "Ingresá un título" }]}
          >
            <Input placeholder="Ej: Solución innovadora para energía solar" />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: "Ingresá una descripción" }]}
          >
            <TextArea
              rows={4}
              placeholder="Describe brevemente tu propuesta, enfoque y objetivos..."
            />
          </Form.Item>

          <Form.Item label="Archivos adjuntos (opcional)" name="archivo">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} block>
                Adjuntar documentos o recursos
              </Button>
            </Upload>
          </Form.Item>

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
              onClick={handleSubmit}
            >
              PUBLICAR PROPUESTA
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};
