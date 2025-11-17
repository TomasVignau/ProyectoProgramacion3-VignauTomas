import { Card, Typography, Tag, Space } from "antd";
import { PropuestaFormValues } from "../types/propuestaFormValues";

const { Title, Text, Paragraph } = Typography;

interface PropuestaCardProps {
  propuesta: PropuestaFormValues;
}

export const PropuestaCard = ({ propuesta }: PropuestaCardProps) => {
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
        {/* Título */}
        <Title level={2} style={{ color: "#463F3A" }}>
          {propuesta.title}
        </Title>

        {/* Estado */}
        <Tag
          color={
            propuesta.state === "aceptada"
              ? "success"
              : propuesta.state === "rechazada"
              ? "error"
              : "processing"
          }
        >
          {propuesta.state.toUpperCase()}
        </Tag>

        {/* Descripción */}
        <Paragraph>
          <Text strong>Descripción:</Text>
          <br />
          {propuesta.description ?? "Sin descripción"}
        </Paragraph>

        {/* Categoría */}
        <Paragraph>
          <Text strong>Categoría:</Text> {propuesta.category ?? "Sin categoría"}
        </Paragraph>

        {/* Links */}
        <Paragraph>
          <Text strong>Links:</Text>{" "}
          {propuesta.links?.length ? (
            propuesta.links.map((link, index) => (
              <div key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </div>
            ))
          ) : (
            "Sin links"
          )}
        </Paragraph>

        {/* Fecha */}
        <Paragraph>
          <Text strong>Fecha de publicación:</Text>{" "}
          {propuesta.publicationDate
            ? new Date(propuesta.publicationDate).toLocaleDateString()
            : "No disponible"}
        </Paragraph>

        {/* Emprendedor */}
        <Paragraph>
          <Text strong>Emprendedor:</Text>{" "}
          {typeof propuesta.idUser === "object"
            ? propuesta.idUser?.name
            : propuesta.idUser}
        </Paragraph>
      </Space>
    </Card>
  );
};
