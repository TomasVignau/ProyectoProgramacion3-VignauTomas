import "../../styles/registrar.css";
import { Form, Input, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RolesFormValues } from "../../types/rolesFormValues";
import UserFormValues from "../../types/userFormValues";

const { Option } = Select;

interface UserFormProps {
  initialValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
}

export const Registrar = ({ initialValues }: UserFormProps) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [roles, setRoles] = useState<RolesFormValues[]>([]);

  const governmentIdTypes = ["cuil", "cuit", "dni", "lc", "le", "pas"];

  const onFinish = async (values: UserFormValues): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          ...values,
          company: null,
        }),
      });

      if (!response.ok) {
        // Intentamos leer el mensaje del backend
        const errorMessage = await response.text();
        throw new Error(errorMessage || `Error HTTP ${response.status}`);
      }

      const createdUser: UserFormValues = await response.json();
      console.log("Usuario creado correctamente:", createdUser);
      alert("Usuario creado correctamente");

      form.resetFields();
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el usuario:", error.message);
        alert(error.message);
      } else {
        console.error("Error desconocido al crear el usuario:", error);
        alert("Error desconocido al crear el usuario");
      }
    }
  };

  useEffect(() => {
    //const token = localStorage.getItem("token") // 👈 o donde lo tengas guardado
    fetch("http://localhost:4000/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token ?? ""}`, // 👈 si tu API lo requiere
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
          onFinish={(values) => {
            console.log("onFinish ejecutado con:", values);
            onFinish(values);
          }}
        >
          <Form.Item label="Nombre" name="name" required={true}>
            <Input placeholder="Nombre completo" />
          </Form.Item>

          <Form.Item label="Email" name="email" required={true}>
            <Input placeholder="usuario@mail.com" />
          </Form.Item>

          <Form.Item label="Contraseña" name="password" required={true}>
            <Input.Password placeholder="Contraseña" />
          </Form.Item>

          <Form.Item label="Rol" name="role" required={true}>
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

          <Form.Item
            label="Tipo de documento"
            name={["governmentId", "type"]}
            required={true}
          >
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
            required={true}
          >
            <Input placeholder="Número de documento" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
