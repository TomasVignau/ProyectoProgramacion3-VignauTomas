import { useEffect, useState } from "react";
import { Card, Typography, Button, Space, Tag, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import UserFormValues from "../types/userFormValues";
import "../styles/detalle.css";
import api from "../api.ts";

const { Title, Paragraph } = Typography;

interface PerfilDetalleProps {
  id: string | undefined;
  endpoint: string; // URL a consultar
  colorTag?: string; // Color del tag (email)
  extra?: React.ReactNode; // Botones u otra acción extra
  emptyLabel?: string; // Texto si no se encuentra
}

export default function PerfilDetalle({
  id,
  endpoint,
  colorTag = "#463F3A",
  extra,
  emptyLabel = "Elemento no encontrado",
}: PerfilDetalleProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: string };

  //const token = localStorage.getItem("token"); Con la configuración, axios lo agrega automaticamente

  const [data, setData] = useState<UserFormValues>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    api
      .get(endpoint)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error al obtener datos:", err))
      .finally(() => setLoading(false));
  }, [id, endpoint]);

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
          onClick={() => navigate(state?.from || "")}
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
        <br></br>
        <br></br>

        <div className="extraWrapper">{extra ?? null}</div>
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
            onClick={() => navigate(state?.from || "")}
          >
            Volver
          </Button>
        </Space>
      </Card>
    </div>
  );
}
