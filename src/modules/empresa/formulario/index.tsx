/*import "../../../styles/formulario.css";
import { useState } from "react";
import {
  Form,
  Button,
  Input,
  Flex,
  Progress,
  DatePicker,
  UploadProps,
  message,
  Upload,
} from "antd";
import { DesafioFormValues } from "../../../types/desafioFormValues";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";

export const FormularioEmpresa = () => {
  const [progress, setProgress] = useState(0);

  const fields: (keyof DesafioFormValues)[] = ["nombre", "descripcion", "fechaTope"];

  const handleValuesChange = (
    changedValues: Partial<DesafioFormValues>,
    allValues: DesafioFormValues
  ) => {
    // contar cuántos campos ya tienen un valor
    /*onValuesChange de Ant Design ejecuta esta función cada vez que un campo cambia.
      changedValues → contiene solo el campo que cambió.
      allValues → contiene todos los valores del formulario hasta ese momento.
      !!allValues[field] → convierte a booleano (true si tiene valor, false si está vacío/undefined).
      filter(...).length → cuenta cuántos campos están completos.
      percent → porcentaje = (completados / total) * 100.
      setProgress(percent) → actualiza el estado → la barra se redibuja.*/
    /*const filled = fields.filter((field) => !!allValues[field]).length;
    const percent = Math.round((filled / fields.length) * 100);
    setProgress(percent);
  };

  //No deja seleccionar una fecha anterior a la actual.
  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf("day");
  };

  const props: UploadProps = {
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
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="divStyle">
      <Form
        layout="vertical"
        style={{ maxWidth: '100%' }} 
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Nombre del desafío"
          name="nombre"
          rules={[{ required: true, message: "Ingrese el nombre del desafío" }]}
        >
          <Input ></Input>
        </Form.Item>
        <Form.Item
          label="Descripción del desafío"
          name="descripcion"
          rules={[
            {
              required: true,
              message: "Ingrese una breve descripción del desafio",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Fecha tope de envío"
          name="fechaTope"
          rules={[{ required: true, message: "Ingrese una fecha válida." }]}
        >
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>

        <Form.Item
          name="archivo"
          rules={[{ required: false }]}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Cargar Archivo</Button>
          </Upload>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ backgroundColor : "#463F3A"}}
          block
          onClick={
            progress == 100
              ? () => alert("Lógica para enviar datos")
              : () => alert("Completa todos los datos antes de enviar")
          }
        >
          PUBLICAR
        </Button>
      </Form>

      <Flex vertical gap="small" style={{ width: '100%' }}>
        <Progress percent={progress} size={['100%', 20]} />
      </Flex>
    </div>
  );
};*/


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
    "nombre",
    "descripcion",
    "fechaTope",
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

  const handleSubmit = () => {
    if (progress === 100) {
      message.success("Desafío publicado exitosamente");
      form.resetFields();
      setProgress(0);
    } else {
      message.warning("Por favor completa todos los campos requeridos");
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
        >
          <Form.Item
            label="Nombre del desafío"
            name="nombre"
            rules={[
              { required: true, message: "Ingrese el nombre del desafío" },
            ]}
          >
            <Input placeholder="Ej: Innovación en energías renovables" />
          </Form.Item>

          <Form.Item
            label="Descripción del desafío"
            name="descripcion"
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
            name="fechaTope"
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
              onClick={handleSubmit}
            >
              PUBLICAR DESAFÍO
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

