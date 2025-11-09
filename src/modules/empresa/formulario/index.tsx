import "../../../styles/formulario.css";
import { useState } from "react";
import {
  Form,
  Button,
  Input,
  Progress,
  DatePicker,
  Upload,
  message,
  Card,
  Space,
  Typography,
} from "antd";
import { UploadOutlined, RocketOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import dayjs from "dayjs";
import { DesafioFormValues } from "../../../types/desafioFormValues";

const { Title, Text } = Typography;

export const FormularioEmpresa = () => {
  const [progress, setProgress] = useState(0);
  const [form] = Form.useForm();

  const fields: (keyof DesafioFormValues)[] = [
    "title",
    "category",
    "description",
    "expirationDate",
  ];

  const handleValuesChange = (
    _changedValues: Partial<DesafioFormValues>,
    allValues: DesafioFormValues
  ) => {
    const filled = fields.filter((field) => !!allValues[field]).length;
    const percent = Math.round((filled / fields.length) * 100);
    setProgress(percent);
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf("day");
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

  const onFinish = async (values: DesafioFormValues): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      const userStorage = localStorage.getItem("user");

      const usuario = userStorage ? JSON.parse(userStorage) : { id: "" };

      console.log("Usuario desde localStorage:", usuario);

      console.log("Payload a enviar:", { ...values, idCompany: usuario.id });

      const response = await fetch("http://localhost:4000/challenges/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          ...values,
          idCompany: usuario._id,
          publicationDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        // Intentamos leer el mensaje del backend
        const errorMessage = await response.text();
        throw new Error(errorMessage || `Error HTTP ${response.status}`);
      }

      const createdForm: DesafioFormValues = await response.json();
      console.log("Desafío creado correctamente:", createdForm);
      alert("Desafío creado correctamente");

      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el desafío:", error.message);
        alert(error.message);
      } else {
        console.error("Error desconocido al crear el desafío:", error);
        alert("Error desconocido al crear el desafío");
      }
    }
  };

  return (
    <div className="divStyle">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ color: "#463F3A", marginBottom: 8 }}>
            Publicar Nuevo Desafío
          </Title>
          <Text type="secondary">
            Completa el formulario para publicar un desafío para emprendedores
          </Text>
        </div>

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

        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          size="large"
          onFinish={async (values: DesafioFormValues) => {
            await onFinish(values);
            if (progress === 100) {
              message.success("Desafío publicado exitosamente");
              form.resetFields();
              setProgress(0);
            } else {
              message.warning("Por favor completa todos los campos requeridos");
            }
          }}
        >
          <Form.Item
            label="Nombre del desafío"
            name="title"
            rules={[
              { required: true, message: "Ingrese el nombre del desafío" },
            ]}
          >
            <Input placeholder="Ej: Innovación en energías renovables" />
          </Form.Item>

          <Form.Item
            label="Categoría del desafío"
            name="category"
            rules={[
              { required: true, message: "Ingrese la categoría del desafío" },
            ]}
          >
            <Input placeholder="Ej: Programación" />
          </Form.Item>

          <Form.Item
            label="Descripción del desafío"
            name="description"
            rules={[
              {
                required: true,
                message: "Ingrese una descripción del desafío",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Describe el desafío, objetivos y lo que buscas en una propuesta..."
            />
          </Form.Item>

          <Form.Item
            label="Fecha tope de envío"
            name="expirationDate"
            rules={[{ required: true, message: "Seleccione una fecha" }]}
          >
            <DatePicker
              disabledDate={disabledDate}
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder="Selecciona la fecha límite"
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
              icon={<RocketOutlined />}
            >
              PUBLICAR DESAFÍO
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};
