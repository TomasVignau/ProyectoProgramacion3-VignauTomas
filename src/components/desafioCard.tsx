import { Card, Typography, Space, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  BulbOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DesafioFormValues } from "../types/desafioFormValues";

const { Title, Text } = Typography;

interface DesafioCardProps {
  desafio: DesafioFormValues;
}

export const DesafioCard = ({ desafio }: DesafioCardProps) => {
  return (
    <Card
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
          to={`/emprendedor/empresa/${desafio.idCompany._id}`}
          style={{
            color: "#BC6C25",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <ApartmentOutlined />{" "}
          {" | " + desafio.idCompany.name.toUpperCase()}
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
        Fecha límite: {dayjs(desafio.expirationDate).format("DD/MM/YYYY")}
      </Tag>

      <Link to={`/emprendedor/publicarPropuesta/${desafio._id}`} state={{ desafio }}>
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
  );
};
