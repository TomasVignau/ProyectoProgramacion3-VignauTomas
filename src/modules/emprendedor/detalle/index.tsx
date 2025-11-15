import { useParams } from "react-router-dom";
import { Card, Typography, Button, Space, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../styles/detalle.css";
import { useState, useEffect } from "react";
import UserFormValues from "../../../types/userFormValues";

const { Title, Paragraph } = Typography;

export default function EmprendedorDetalle() {

  const navigate = useNavigate();
  const { idUser } = useParams<{ idUser: string }>();
  const token = localStorage.getItem("token");  
  const [emprendedor, setEmprendedor] = useState<UserFormValues>();

  console.log("ID Emprendedor:", idUser);

  useEffect(() => {
    fetch(`http://localhost:4000/proposals/users/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización");
        const data = await res.json();
        console.log("Tipo de role.name:", typeof data.role?.name, "valor:", data.role?.name);
        setEmprendedor(data);
      })
      .catch((err) => {
        console.error("Error al obtener desafíos:", err);
      })
  }, [idUser]);

  if (!emprendedor) {
    return (
      <div className="emprendedorNotFound">
        <Title level={3} style={{ color: "#b23a48" }}>
          Emprendedor no encontrado
        </Title>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="emprendedorContainer">
      <div className="emprendedorHeader">
        <Title level={2} className="emprendedorTitulo">
          {emprendedor.name}
        </Title>
        <Tag color="#463F3A">{emprendedor.email}</Tag>
      </div>

      <Card bordered={false} className="emprendedorCard" hoverable>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Paragraph style={{ textAlign: "center"}} className="emprendedorDescripcion">
            {emprendedor.description}
          </Paragraph>

          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="volverBtn"
          >
            Volver
          </Button>
        </Space>
      </Card>
    </div>
  );
}
