import "../../styles/registrar.css";
import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RolesFormValues } from "../../types/rolesFormValues";

const { Option } = Select;

interface GovernmentId {
  type?: "cuil" | "cuit" | "dni" | "lc" | "le" | "pas";
  number?: string;
}
interface UserFormValues {
  email: string;
  password: string;
  role: string;
  name: string;
  phone?: string;
  description?: string;
  governmentId?: GovernmentId;
  isActive: boolean;
}
interface UserFormProps {
  initialValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
}

export const Registrar = ({ initialValues, onSubmit }: UserFormProps) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState<RolesFormValues[]>([]);

  const governmentIdTypes = ["cuil", "cuit", "dni", "lc", "le", "pas"];

  const onFinish = (values: UserFormValues) => {
    onSubmit(values);
  };

  useEffect(() => {
    //const token = localStorage.getItem("token") // 👈 o donde lo tengas guardado
    fetch("http://localhost:4000/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjEwMDg1OTcsImlzcyI6ImJhc2UtYXBpLWV4cHJlc3MtZ2VuZXJhdG9yIiwic3ViIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn0.p4MOoTviDgqfnueyXNnBt-EByQ4wJ__Xz9L9SrsDaPU"}`, // 👈 así se envía el token
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización");
        const data = await res.json();
        console.log("📦 Datos recibidos desde API:", data);
        setRoles(data);
      })
      .catch((err) => {
        //setError(err.message || "Error al conectar con la API");
        console.error("Error fetching challenges:", err);
      });
  }, []);

  return (
    <div className="registrarContainer">
      <div className="registrarFormWrapper">
        <h2>Registro de Usuario</h2>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item label="Nombre" name="name">
            <Input placeholder="Nombre completo" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="usuario@mail.com" />
          </Form.Item>

          <Form.Item label="Contraseña" name="password">
            <Input.Password placeholder="Contraseña" />
          </Form.Item>

          <Form.Item label="Rol" name="role">
            <Select placeholder="Seleccione un rol">
              {roles.map((role) => (
                <Option key={role._id} value={role.name}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Teléfono" name="phone">
            <Input placeholder="Opcional" />
          </Form.Item>

          <Form.Item label="Descripción" name="description">
            <Input.TextArea placeholder="Descripción opcional" rows={3} />
          </Form.Item>

          <Form.Item label="Tipo de documento" name={["governmentId", "type"]}>
            <Select placeholder="Seleccione tipo de documento">
              {governmentIdTypes.map((type) => (
                <Option key={type} value={type}>
                  {type.toUpperCase()}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Número de documento"
            name={["governmentId", "number"]}
          >
            <Input placeholder="Número de documento" />
          </Form.Item>

          <Form.Item>
            <Link to="/">
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
