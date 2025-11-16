import "../../../styles/formulario.css";
import { Input, Empty, Spin, Row, Col } from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import { useState, useMemo, useEffect } from "react";
import { DesafioFormValues } from "../../../types/desafioFormValues";
import { DesafioCard } from "../../../components/desafioCard";


export const DesafiosPublicados = () => {
  const [busqueda, setBusqueda] = useState("");
  const [desafios, setDesafios] = useState<DesafioFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/challenges", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
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

  const desafiosFiltrados = useMemo(() => {
    const term = busqueda.toLowerCase().trim();
    if (!term) return desafios;
    return desafios.filter(
      (d) =>
        d.title.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term)
    );
  }, [busqueda, desafios]);

  return (
    <div className="divDesafios" style={{ display: "grid", gap: 24 }}>
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

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Spin size="large" tip="Cargando desafíos..." />
        </div>
      ) : desafiosFiltrados.length > 0 ? (
        <Row gutter={[24, 24]}>
          {" "}
          {desafiosFiltrados.map((desafio) => (
            <Col xs={24} sm={12} key={desafio._id}>
              <DesafioCard desafio={desafio} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="No se encontraron desafíos que coincidan con tu búsqueda"
          style={{ marginTop: 40 }}
        />
      )}
    </div>
  );
};
