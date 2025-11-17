import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Typography, Spin, Tag, Space, message } from "antd";
import { PropuestaFormValues } from "../../../types/propuestaFormValues";
import api from "../../../api.ts";

const { Title, Text, Paragraph } = Typography;

export const PropuestaDetalle = () => {
  const { idPropuesta } = useParams<{ idPropuesta: string }>();
  //const token = localStorage.getItem("token"); Lo agrega automáticamente el interceptor de api
  const [propuesta, setPropuesta] = useState<PropuestaFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("ID de la propuesta:", idPropuesta);

  useEffect(() => {
    setIsLoading(true);

    api
      .get(`/proposals/${idPropuesta}`)
      .then((res) => setPropuesta(res.data))
      .catch((err) => {
        console.error(err);
        message.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [idPropuesta]);

  if (isLoading || !propuesta) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <Spin size="large" tip="Cargando detalle de la propuesta..." />
      </div>
    );
  }

  return (
    <Card
      bordered={false}
      style={{
        maxWidth: 800,
        margin: "40px auto",
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        padding: "30px",
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Title level={2} style={{ color: "#463F3A" }}>
          {propuesta.title}
        </Title>

        <Tag
          color={
            propuesta?.state === "aceptada"
              ? "success"
              : propuesta?.state === "rechazada"
                ? "error"
                : "processing"
          }
        >
          {(propuesta?.state ?? "pendiente").toUpperCase()}
        </Tag>

        <Paragraph>
          <Text strong>Descripción:</Text> <br />
          {propuesta?.description ?? "Sin descripción"}
        </Paragraph>

        <Paragraph>
          <Text strong>Categoría:</Text>{" "}
          {propuesta?.category ?? "Sin categoría"}
        </Paragraph>

        <Paragraph>
          <Text strong>Links:</Text>{" "}
          {propuesta?.links && propuesta.links.length > 0
            ? propuesta.links.map((link, index) => (
                <div key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </div>
              ))
            : "Sin links"}
        </Paragraph>

        <Paragraph>
          <Text strong>Fecha de publicación:</Text>{" "}
          {propuesta?.publicationDate
            ? new Date(propuesta.publicationDate).toLocaleDateString()
            : "No disponible"}
        </Paragraph>

        <Paragraph>
          <Text strong>Emprendedor:</Text>{" "}
          {typeof propuesta?.idUser === "object"
            ? (propuesta?.idUser?.name ?? "Sin nombre")
            : (propuesta?.idUser ?? "Sin datos")}
        </Paragraph>
      </Space>
    </Card>
  );
};
