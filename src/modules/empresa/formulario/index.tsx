import "../../../styles/formulario.css";
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
import { FormValues } from "../../../types/FormValues";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";

export const FormularioEmpresa = () => {
  const [progress, setProgress] = useState(0);

  const fields: (keyof FormValues)[] = ["nombre", "descripcion", "fechaTope"];

  const handleValuesChange = (
    changedValues: Partial<FormValues>,
    allValues: FormValues
  ) => {
    // contar cuántos campos ya tienen un valor
    /*onValuesChange de Ant Design ejecuta esta función cada vez que un campo cambia.
      changedValues → contiene solo el campo que cambió.
      allValues → contiene todos los valores del formulario hasta ese momento.
      !!allValues[field] → convierte a booleano (true si tiene valor, false si está vacío/undefined).
      filter(...).length → cuenta cuántos campos están completos.
      percent → porcentaje = (completados / total) * 100.
      setProgress(percent) → actualiza el estado → la barra se redibuja.*/
    const filled = fields.filter((field) => !!allValues[field]).length;
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
        style={{ maxWidth: 300 }}
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

      <Flex vertical gap="small" style={{ width: 300 }}>
        <Progress percent={progress} size={[300, 20]} />
      </Flex>
    </div>
  );
};
