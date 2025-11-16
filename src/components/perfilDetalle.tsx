import { useEffect, useState } from "react";
import { Card, Typography, Button, Space, Tag, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserFormValues from "../types/userFormValues";
import "../styles/detalle.css";

const { Title, Paragraph } = Typography;

interface PerfilDetalleProps {
  id: string | undefined;
  endpoint: string; // URL a consultar
  colorTag?: string; // Color del tag (email)
  esEmpresa?: boolean;
  extra?: React.ReactNode; // Botones u otra acción extra
  emptyLabel?: string; // Texto si no se encuentra
}

export default function PerfilDetalle({
  id,
  endpoint,
  colorTag = "#463F3A",
  extra,
  emptyLabel = "Elemento no encontrado",
  esEmpresa,
}: PerfilDetalleProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [data, setData] = useState<UserFormValues>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización");
        const result = await res.json();
        setData(result);
      })
      .catch((err) => console.error("Error al obtener datos:", err))
      .finally(() => setLoading(false));
  }, [id, endpoint, token]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Title level={3} className="detalleTitulo">
          {emptyLabel}
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
    <div className="detalleContainer">
      <div className="detalleHeader">
        <Title level={2} className="detalleTitulo">
          {data.name}
        </Title>
        <Tag color={colorTag}>{data.email}</Tag>

        {esEmpresa && extra && <div style={{ marginTop: 15 }}>{extra}</div>}
      </div>

      <Card bordered={false} className="detalleCard" hoverable>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Paragraph
            style={{ textAlign: "center" }}
            className="detalleDescripcion"
          >
            {data.description}
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
