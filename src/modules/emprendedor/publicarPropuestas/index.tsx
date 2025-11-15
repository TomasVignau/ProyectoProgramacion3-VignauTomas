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
import { useLocation } from "react-router-dom";

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
  const { desafio } = location.state || {}; // desafío que viene del estado

  const fields: (keyof PropuestaFormValues)[] = ["title", "description"];

  const onFinish = async (values: PropuestaFormValues): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
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

      const response = await fetch("http://localhost:4000/proposals/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || `Error HTTP ${response.status}`);
      }

      const createdForm = await response.json();
      console.log("Propuesta creada correctamente:", createdForm);
      alert("Propuesta publicada correctamente");

      // ------------------------------------------
      // 👉 AGREGADO: Enviar UNA notificación solo a la empresa
      await fetch("http://localhost:4000/notification/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          idEmprendedor: usuario._id,
          idCompany: desafio?.idCompany._id,
          typeNotification: "propuestaRecibida",
          idChallenge: desafio?._id,
        }),
      });
      /*console.log("IdEmprendedor: ", usuario._id);
      console.log("IdCompany: ", desafio?.idCompany._id,);
      console.log("TypeNotification: ", "propuestaRecibida");
      console.log("IdChallengue: ", createdForm._id);*/
      alert("Propuesta y notificación enviada");

      // ------------------------------------------

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

  return (
    <div className="divStyle">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Título principal */}
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
            >
              PUBLICAR PROPUESTA
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};
