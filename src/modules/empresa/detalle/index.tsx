import { useParams } from "react-router-dom";
import { Card, Typography, Button, Space, Tag } from "antd";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../styles/detalle.css";
import { useEffect, useState } from "react";
import UserFormValues from "../../../types/userFormValues";

const { Title, Paragraph } = Typography;

export default function EmpresaDetalle() {
  const { idUser } = useParams<{ idUser: string }>();
  const token = localStorage.getItem("token");  
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState<UserFormValues>();

  useEffect(() => {
    fetch(`http://localhost:4000/proposals/challenge/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización");
        const data = await res.json();
        console.log("📦 Datos recibidos desde API:", data);

        setEmpresa(data);
      })
      .catch((err) => {
        console.error("Error al obtener desafíos:", err);
      })
  }, [idUser]);

  if (!empresa) {
    return (
      <div className="empresaNotFound">
        <Title level={3} style={{ color: "#b23a48" }}>
          Empresa no encontrada
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
    <div className="empresaContainer">
      <div className="empresaHeader">
        <Title level={2} className="empresaTitulo">
          {empresa.name}
        </Title>
        <Tag color="#463F3A">{empresa.email}</Tag>
      </div>

      <Card bordered={false} className="empresaCard" hoverable>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Paragraph className="empresaDescripcion">
            {empresa.description}
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
