import { Card, Space, Typography, Button } from "antd";
import { ApartmentOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

interface EmpresaCardProps {
  empresa: {
    _id: string;
    name: string;
    description?: string;
    phone?: string;
    email?: string;
  };
  onUnfollow?: (id: string) => void; // opcional
  showUnfollowButton?: boolean; // opcional
  showLink?: boolean; // opcional
}

export default function EmpresaCard({
  empresa,
  onUnfollow,
  showUnfollowButton = true,
  showLink = true,
}: EmpresaCardProps) {
  return (
    <Card
      key={empresa._id}
      style={{
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        background: "#fff",
      }}
      title={
        <Space align="center">
          <ApartmentOutlined style={{ color: "#463F3A", fontSize: 20 }} />
          <Title level={4} style={{ margin: 0, color: "#463F3A" }}>
            {empresa.name}
          </Title>
        </Space>
      }
      extra={
        showLink && (
          <Link
            to={`/emprendedor/empresa/${empresa._id}`} 
            style={{
              color: "#BC6C25",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Ver perfil
          </Link>
        )
      }
    >
      <Text style={{ display: "block", marginBottom: 12 }}>
        {empresa.description}
      </Text>

      <Space direction="vertical" size={4}>
        <Space>
          <Text strong style={{ color: "#463F3A" }}>
            Teléfono:
          </Text>
          <Text>{empresa.phone ?? "Sin especificar"}</Text>
        </Space>

        <Space>
          <MailOutlined style={{ color: "#463F3A" }} />
          <Text>{empresa.email ?? "-"}</Text>
        </Space>
      </Space>

      {showUnfollowButton && onUnfollow && (
        <Button
          type="primary"
          size="large"
          block
          onClick={() => onUnfollow(empresa._id)}
          style={{
            marginTop: 16,
            backgroundColor: "#463F3A",
            border: "none",
            fontWeight: 600,
            borderRadius: 8,
          }}
        >
          Dejar de seguir
        </Button>
      )}
    </Card>
  );
}
