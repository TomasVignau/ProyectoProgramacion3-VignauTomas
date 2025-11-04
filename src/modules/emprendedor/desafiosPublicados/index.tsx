import "../../../styles/formulario.css";
import { Button, Card, Typography, Space, Tag, Input, Empty, Spin } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  BulbOutlined,
  ApartmentOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState, useMemo, useEffect } from "react";
import { DesafioFormValues } from "../../../types/desafioFormValues";

const { Title, Text } = Typography;

export const DesafiosPublicados = () => {
  const [busqueda, setBusqueda] = useState("");
  const [desafios, setDesafios] = useState<DesafioFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Cargar desafíos desde la API
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/challenges", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjEwMDg1OTcsImlzcyI6ImJhc2UtYXBpLWV4cHJlc3MtZ2VuZXJhdG9yIiwic3ViIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn0.p4MOoTviDgqfnueyXNnBt-EByQ4wJ__Xz9L9SrsDaPU'}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización");
        const data = await res.json();
        console.log("📦 Datos recibidos desde API:", data);

        setDesafios(data);
      })
      .catch((err) => {
        console.error("Error al obtener desafíos:", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // 🔹 Filtrado local
  const desafiosFiltrados = useMemo(() => {
    const term = busqueda.toLowerCase().trim();
    if (!term) return desafios;
    return desafios.filter(
      (d) =>
        d.title.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term)
    );
  }, [busqueda, desafios]);

  // 🔹 Renderizado
  return (
    <div className="divDesafios" style={{ display: "grid", gap: 24 }}>
      {/* Campo de búsqueda */}
      <Input
        size="large"
        placeholder="Buscar desafío por nombre o descripción..."
        prefix={<SearchOutlined style={{ color: "#463F3A" }} />}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          borderRadius: 10,
          border: "2px solid #cebdafff",
          marginBottom: 12,
          maxWidth: 500,
          backgroundColor: "#fff",
        }}
        allowClear
      />

      {/* Loader */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Spin size="large" tip="Cargando desafíos..." />
        </div>
      ) : desafiosFiltrados.length > 0 ? (
        desafiosFiltrados.map((desafio) => (
          <Card
            key={desafio._id}
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
            title={
              <Space align="center">
                <BulbOutlined style={{ color: "#463F3A", fontSize: 20 }} />
                <Title level={4} style={{ margin: 0, color: "#463F3A" }}>
                  {desafio.title}
                </Title>
              </Space>
            }
            extra={
              <Link
                to={`/emprendedor/empresa/${encodeURIComponent(
                  desafio.idCompany
                )}`}
                style={{
                  color: "#BC6C25",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <ApartmentOutlined /> {desafio.idCompany.name.toUpperCase()}
              </Link>
            }
          >
            <Text style={{ display: "block", marginBottom: 12 }}>
              {desafio.description}
            </Text>
            <Tag
              icon={<CalendarOutlined />}
              color="default"
              style={{
                fontSize: 13,
                borderRadius: 6,
                marginBottom: 12,
              }}
            >
              Fecha límite:{" "}
              {dayjs(desafio.expirationDate).format("DD/MM/YYYY")}
            </Tag>

            <Link to="/emprendedor/publicarPropuesta">
              <Button
                type="primary"
                size="large"
                block
                style={{
                  backgroundColor: "#463F3A",
                  border: "none",
                  fontWeight: 600,
                  borderRadius: 8,
                }}
              >
                PUBLICAR PROPUESTA
              </Button>
            </Link>
          </Card>
        ))
      ) : (
        <Empty
          description="No se encontraron desafíos que coincidan con tu búsqueda"
          style={{ marginTop: 40 }}
        />
      )}
    </div>
  );
};
