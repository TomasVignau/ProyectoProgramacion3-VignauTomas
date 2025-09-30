import "../../styles/formulario.css";
import { useState } from "react";
import { Form, Select, InputNumber, Button, Input, Flex, Progress } from "antd";
import { FormValues } from "../../types/FormValues";

const { Option } = Select;

export const Formulario = () => {
  const [progress, setProgress] = useState(0);

  const fields: (keyof FormValues)[] = ["nombre", "dni", "telefono", "sexo", "peso"];

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

  return (
    <div className="divStyle">
      <Form
        layout="vertical"
        style={{ maxWidth: 300 }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Ingrese su nombre" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="DNI"
          name="dni"
          rules={[{ required: true, message: "Ingrese su dni" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Telefono"
          name="telefono"
          rules={[{ required: true, message: "Ingrese su telefono" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Sexo"
          name="sexo"
          rules={[{ required: true, message: "Seleccione el sexo" }]}
        >
          <Select placeholder="Seleccione...">
            <Option value="MASCULINO">MASCULINO</Option>
            <Option value="FEMENINO">FEMENINO</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Peso (kg)"
          name="peso"
          rules={[{ required: true, message: "Ingrese el peso" }]}
        >
          <InputNumber min={1} step={0.1} style={{ width: "100%" }} />
        </Form.Item>
        <Button type="primary" htmlType="submit" block onClick={progress==100 ? () => alert("Lógica para enviar datos") : () => alert("Completa todos los datos antes de enviar")}>
          Enviar
        </Button>
      </Form>

      <Flex vertical gap="small" style={{ width: 300 }}>
        <Progress percent={progress} size={[300, 20]} />
      </Flex>
    </div>
  );
};
