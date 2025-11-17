import "../../styles/registrar.css";
import { Form, Input, Select, Button, Carousel, Card } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RolesFormValues } from "../../types/rolesFormValues";
import UserFormValues from "../../types/userFormValues";
import api from "../../api.ts";
import axios from "axios";

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

  // Crear usuario
  const onFinish = async (values: UserFormValues): Promise<void> => {
    try {
      const createdUser = await api.post<UserFormValues>("/users/", {
        ...values,
        company: null,
      });

      console.log("Usuario creado correctamente:", createdUser.data);
      alert("Usuario creado correctamente");

      form.resetFields();
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error al crear el usuario:", err.response.data);
        alert(err.response.data || `Error HTTP ${err.response.status}`);
      } else if (err instanceof Error) {
        console.error("Error al crear el usuario:", err.message);
        alert(err.message);
      } else {
        console.error("Error desconocido al crear el usuario:", err);
        alert("Error desconocido al crear el usuario");
      }
    }
  };

  // Obtener roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        setRoles(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          console.error("Error al obtener roles:", err.response.data);
        } else {
          console.error("Error desconocido al obtener roles:", err);
        }
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="registrarPage">
      {/* Fondo: Carousel */}
      <Carousel autoplay autoplaySpeed={3000} className="myCarousel">
        <div className="slide">
          <img
            src="https://fotos.perfil.com/2025/02/12/trim/987/555/tecnicos-1966270.jpg"
            alt="Empresa"
          />
        </div>
        <div className="slide">
          <img
            src="https://www.elepoch.com/_next/image?url=https%3A%2F%2Fimages.elepoch.com%2Fassets%2Fuploads%2F2025%2F09%2Fid31202-shutterstock_2068912751-1080x720-1.webp&w=1920&q=75"
            alt="Trabajo"
          />
        </div>
        <div className="slide">
          <img
            src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/02/lenguaje-programacion-1859691.jpg?tf=3840x"
            alt="Programación"
          />
        </div>
      </Carousel>

      {/* Formulario encima */}
      <div className="registrarOverlay">
        <div className="registrarFormWrapper">
          <Card bordered={false} style={{ background: "#b6aba3ff" }}>
            <h1 style={{ color: "#463F3A", textAlign: "center" }}>
              Plataforma de Innovación y Propuesta Empresariales
            </h1>
          </Card>
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
            <Form.Item label="Nombre" name="name" required>
              <Input placeholder="Nombre completo" />
            </Form.Item>

            <Form.Item label="Email" name="email" required>
              <Input placeholder="usuario@mail.com" />
            </Form.Item>

            <Form.Item label="Contraseña" name="password" required>
              <Input.Password placeholder="Contraseña" />
            </Form.Item>

            <Form.Item label="Rol" name="role" required>
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
              required
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
              required
            >
              <Input placeholder="Número de documento" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#463F3A", borderColor: "#463F3A" }}
              >
                Guardar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
